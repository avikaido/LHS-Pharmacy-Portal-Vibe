const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:5174';

export function buildRequestPayload(details) {
  const request = {
    id: details.id,
    uuid: details.uuid || null,
    status: details.status,
    notes: details.notes,
    requested_date: details.requested_date,
    completed_date: details.completed_date,
    pharmacy_id: details.pharmacy_id,
    patient_id: details.patient_id,
    physician_id: details.physician_id,
    item_id: details.item_id,
    created_on: details.created_on,
    updated_on: details.updated_on,
  };

  const item = details.item_id ? {
    id: details.item_id,
    brand_name: details.item_brand_name || details.item_brand || details.brand_name || null,
    generic_name: details.item_generic_name || details.generic_name || null,
  } : null;

  const pharmacy = details.pharmacy_id ? {
    id: details.pharmacy_id,
    name: details.pharmacy_name || null,
  } : null;

  const links = {
    request_admin_url: `${APP_BASE_URL}/admin/requests/${details.id}`,
    request_pharmacy_url: `${APP_BASE_URL}/requests/${details.id}`,
  };

  const patient = details.patient_id ? {
    id: details.patient_id,
    first_name: details.patient_first_name || null,
    last_name: details.patient_last_name || null,
    email: details.patient_email || null,
  } : null;

  const physician = details.physician_id ? {
    id: details.physician_id,
    first_name: details.physician_first_name || null,
    last_name: details.physician_last_name || null,
    fax: details.physician_fax || null,
    npi_number: details.physician_npi || null,
  } : null;

  return { request, pharmacy, item, patient, physician, links, schema_version: 1 };
}


