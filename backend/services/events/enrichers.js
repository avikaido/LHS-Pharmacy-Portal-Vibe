import pool from '../../db.js';

export async function fetchRequestEnrichedById(requestId) {
  const { rows } = await pool.query(
    `SELECT r.*,
            pa.pharmacy_name,
            i.brand_name AS item_brand_name, i.generic_name AS item_generic_name,
            p.first_name AS patient_first_name, p.last_name AS patient_last_name, p.email AS patient_email,
            ph.first_name AS physician_first_name, ph.last_name AS physician_last_name, ph.fax AS physician_fax, ph.npi_number AS physician_npi
     FROM requests r
     LEFT JOIN pharmacies pa ON r.pharmacy_id = pa.id
     LEFT JOIN items i ON r.item_id = i.id
     LEFT JOIN patients p ON r.patient_id = p.id
     LEFT JOIN physicians ph ON r.physician_id = ph.id
     WHERE r.id = $1`,
    [requestId]
  );
  return rows[0];
}


