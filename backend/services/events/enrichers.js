import pool from '../../db.js';

export async function fetchRequestEnrichedById(requestId) {
  const { rows } = await pool.query(
    `SELECT r.*,
            -- Pharmacy details
            pa.uuid AS pharmacy_uuid, pa.pharmacy_name, pa.pharmacy_type, pa.phone AS pharmacy_phone, 
            pa.fax AS pharmacy_fax, pa.email AS pharmacy_email, pa.website AS pharmacy_website, 
            pa.address AS pharmacy_address, pa.business_hours AS pharmacy_business_hours, 
            pa.license_number AS pharmacy_license_number, pa.license_expiration AS pharmacy_license_expiration, 
            pa.npi_number AS pharmacy_npi_number, pa.insurance_accepted AS pharmacy_insurance_accepted, 
            pa.services_offered AS pharmacy_services_offered, pa.chain_name AS pharmacy_chain, pa.contact_person AS pharmacy_manager_name, 
            pa.status AS pharmacy_status,
            
            -- Item details
            i.uuid AS item_uuid, i.brand_name AS item_brand_name, i.generic_name AS item_generic_name,
            i.class AS item_class, i.use_description AS item_use_description, i.delivery_mechanism AS item_delivery_mechanism,
            i.schedule AS item_schedule, i.dosage AS item_dosage, i.side_effects AS item_side_effects,
            i.pregnancy_category AS item_pregnancy_category, i.label AS item_label, i.date_added AS item_date_added,
            i.status AS item_status,
            
            -- Patient details
            p.uuid AS patient_uuid, p.first_name AS patient_first_name, p.middle_initial AS patient_middle_initial, 
            p.last_name AS patient_last_name, p.email AS patient_email, p.phone AS patient_phone, p.dob AS patient_dob,
            p.gender AS patient_gender, p.address AS patient_address, p.address2 AS patient_address2, 
            p.city AS patient_city, p.state AS patient_state, p.zipcode AS patient_zipcode, 
            p.insurance1 AS patient_insurance1, p.insurance1_id AS patient_insurance1_id,
            p.insurance2 AS patient_insurance2, p.insurance2_id AS patient_insurance2_id, p.notes AS patient_notes,
            p.status AS patient_status,
            
            -- Physician details
            ph.uuid AS physician_uuid, ph.first_name AS physician_first_name, ph.middle_initial AS physician_middle_initial, 
            ph.last_name AS physician_last_name, ph.suffix AS physician_suffix, ph.title AS physician_title,
            ph.specialty AS physician_specialty, ph.sub_specialty AS physician_sub_specialty, 
            ph.practice_type AS physician_practice_type, ph.phone AS physician_phone, ph.fax AS physician_fax, 
            ph.email AS physician_email, ph.website AS physician_website, ph.address AS physician_address, 
            ph.address2 AS physician_address2, ph.city AS physician_city, ph.state AS physician_state, 
            ph.zipcode AS physician_zipcode, ph.country AS physician_country, ph.npi_number AS physician_npi, 
            ph.dea_number AS physician_dea_number, ph.license_number AS physician_license_number, 
            ph.license_expiration AS physician_license_expiration, ph.board_certifications AS physician_board_certifications,
            ph.languages_spoken AS physician_languages_spoken, ph.years_of_experience AS physician_years_of_experience,
            ph.practice_name AS physician_practice_name, ph.practice_address AS physician_practice_address,
            ph.practice_city AS physician_practice_city, ph.practice_state AS physician_practice_state,
            ph.practice_zipcode AS physician_practice_zipcode, ph.practice_phone AS physician_practice_phone,
            ph.practice_fax AS physician_practice_fax, ph.practice_website AS physician_practice_website,
            ph.insurance_accepted AS physician_insurance_accepted, ph.accepting_new_patients AS physician_accepting_new_patients,
            ph.appointment_required AS physician_appointment_required, ph.notes AS physician_notes,
            ph.frequently_contacted AS physician_frequently_contacted, ph.starred AS physician_starred,
            ph.affiliated_hospitals AS physician_affiliated_hospitals, ph.affiliated_pharmacies AS physician_affiliated_pharmacies,
            ph.status AS physician_status
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


