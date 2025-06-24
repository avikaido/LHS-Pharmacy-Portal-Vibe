import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the mock data file
const mockDataPath = path.join(__dirname, '../../src/_mockApis/fax/FaxData.js');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Extract the FaxData array using regex
const faxDataMatch = mockDataContent.match(/const FaxData = (\[[\s\S]*?\]);/);
if (!faxDataMatch) {
  console.error('Could not find FaxData array in the file');
  process.exit(1);
}

// Evaluate the array to get the actual data
const faxDataString = faxDataMatch[1];
const faxData = eval(faxDataString);

console.log(`Found ${faxData.length} faxes in mock data`);

// Helper function to safely escape and handle null values
const safeString = (value) => {
  if (value === null || value === undefined || value === 'NaN') {
    return 'NULL';
  }
  return `'${String(value).replace(/'/g, "''")}'`;
};

// Generate SQL INSERT statements
let sqlContent = `-- Complete faxes migration with all ${faxData.length} faxes from mock data
-- This migration populates the faxes table with all fax communication data

INSERT INTO faxes (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    fax,
    type,
    code,
    doc_link,
    users,
    requests,
    fax_number,
    patients
) VALUES 
`;

const values = faxData.map((fax, index) => {
  // Convert the mock data fields to our database fields
  const createdOn = new Date(fax.created_on).toISOString();
  const status = fax.status === 'successful' ? 'sent' : fax.status;
  
  return `(gen_random_uuid(), 'fax-${Date.now()}-${index}', '${createdOn}', 1, '${createdOn}', 1, ${fax.deleted}, NULL, NULL, 'public', 1, NULL, 'Complete migration from mock data', '${status}', ${safeString(fax.fax)}, ${safeString(fax.type)}, ${safeString(fax.code)}, ${safeString(fax.doc_link)}, ${safeString(fax.users)}, NULL, ${safeString(fax.fax)}, ${safeString(fax.patients)})`;
});

sqlContent += values.join(',\n') + ';';

// Write the SQL file
const outputPath = path.join(__dirname, '../db/migrations/seed_all_faxes.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`Generated complete migration file: ${outputPath}`);
console.log(`Total faxes: ${faxData.length}`); 