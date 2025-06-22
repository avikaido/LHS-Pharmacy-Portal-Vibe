import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import pool from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadMedicareData() {
  const filePath = path.join(__dirname, '../data/physician_compare.csv');
  if (!fs.existsSync(filePath)) {
    console.warn('Medicare Physician Compare CSV not found:', filePath);
    return;
  }

  // Clear existing data
  await pool.query('TRUNCATE TABLE medicare_physicians');

  // Create a promise to track when the CSV processing is complete
  return new Promise((resolve, reject) => {
    const batchSize = 1000;
    let batch = [];
    let totalProcessed = 0;
    let seenNpis = new Set(); // Track NPIs we've seen in the current batch

    const stream = fs.createReadStream(filePath)
      .pipe(csv());

    let rowCount = 0;
    stream.on('data', async (row) => {
      rowCount++;
      if (rowCount <= 5) {
        console.log('📄 Sample CSV row:', row);
      }
      
      if (row['NPI'] && !seenNpis.has(row['NPI'])) {
        seenNpis.add(row['NPI']);
        batch.push({
          npi: row['NPI'],
          last_name: row['Provider Last Name'],
          first_name: row['Provider First Name'],
          fax_number: '', // Not available in CSV
          phone_number: row['Telephone Number'],
          address_line_1: row['adr_ln_1'],
          city: row['City/Town'],
          state: row['State'],
          zip_code: row['ZIP Code'],
          primary_specialty: row['pri_spec']
        });

        if (batch.length >= batchSize) {
          // Pause the stream while we process this batch
          stream.pause();
          
          try {
            await insertBatch(batch);
            totalProcessed += batch.length;
            console.log(`Processed ${totalProcessed} records...`);
            batch = [];
            seenNpis.clear(); // Clear the set for the next batch
            stream.resume();
          } catch (error) {
            stream.destroy();
            reject(error);
          }
        }
      }
    })
    .on('end', async () => {
      // Insert any remaining records
      if (batch.length > 0) {
        try {
          await insertBatch(batch);
          totalProcessed += batch.length;
          console.log(`Completed loading Medicare data. Total records: ${totalProcessed}`);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        console.log(`Completed loading Medicare data. Total records: ${totalProcessed}`);
        resolve();
      }
    })
    .on('error', (error) => {
      reject(error);
    });
  });
}

async function insertBatch(batch) {
  const values = batch.map(record => `(
    '${record.npi}',
    '${record.last_name?.replace(/'/g, "''") || ''}',
    '${record.first_name?.replace(/'/g, "''") || ''}',
    '${record.fax_number?.replace(/'/g, "''") || ''}',
    '${record.phone_number?.replace(/'/g, "''") || ''}',
    '${record.address_line_1?.replace(/'/g, "''") || ''}',
    '${record.city?.replace(/'/g, "''") || ''}',
    '${record.state?.replace(/'/g, "''") || ''}',
    '${record.zip_code?.replace(/'/g, "''") || ''}',
    '${record.primary_specialty?.replace(/'/g, "''") || ''}'
  )`).join(',');

  const query = `
    INSERT INTO medicare_physicians (
      npi, last_name, first_name, fax_number, phone_number,
      address_line_1, city, state, zip_code, primary_specialty
    ) VALUES ${values}
    ON CONFLICT (npi) DO UPDATE SET
      last_name = EXCLUDED.last_name,
      first_name = EXCLUDED.first_name,
      fax_number = EXCLUDED.fax_number,
      phone_number = EXCLUDED.phone_number,
      address_line_1 = EXCLUDED.address_line_1,
      city = EXCLUDED.city,
      state = EXCLUDED.state,
      zip_code = EXCLUDED.zip_code,
      primary_specialty = EXCLUDED.primary_specialty,
      updated_at = CURRENT_TIMESTAMP
  `;

  await pool.query(query);
}

// Call this on server start
loadMedicareData().catch(error => {
  console.error('Error loading Medicare data:', error);
});

export async function getMedicarePhysicianByNPI(npi) {
  console.log('🔍 Searching for physician with NPI:', npi);
  try {
    const result = await pool.query(
      'SELECT * FROM medicare_physicians WHERE npi = $1',
      [npi]
    );
    console.log('📊 Query result:', {
      found: result.rows.length > 0,
      rowCount: result.rows.length,
      data: result.rows[0] || null
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('❌ Error searching for physician:', error);
    throw error;
  }
} 