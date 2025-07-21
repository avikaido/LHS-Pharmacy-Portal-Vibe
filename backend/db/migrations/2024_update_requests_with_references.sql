-- 1. Assign unique status and references to each request
DO $$
DECLARE
  req RECORD;
  statuses TEXT[] := ARRAY['Processing', 'Complete', 'Created', 'Pending', 'Cancelled'];
  idx INT := 1;
  pharmacy_ids INT[];
  item_ids INT[];
  physician_ids INT[];
  patient_ids INT[];
  total_pharmacies INT;
  total_items INT;
  total_physicians INT;
  total_patients INT;
BEGIN
  SELECT array_agg(id) INTO pharmacy_ids FROM pharmacies WHERE deleted = false;
  SELECT array_agg(id) INTO item_ids FROM items WHERE deleted = false;
  SELECT array_agg(id) INTO physician_ids FROM physicians WHERE deleted = false;
  SELECT array_agg(id) INTO patient_ids FROM patients WHERE deleted = false;

  total_pharmacies := array_length(pharmacy_ids, 1);
  total_items := array_length(item_ids, 1);
  total_physicians := array_length(physician_ids, 1);
  total_patients := array_length(patient_ids, 1);

  FOR req IN SELECT * FROM requests WHERE deleted = false ORDER BY id LOOP
    UPDATE requests SET 
      pharmacy_id = pharmacy_ids[((idx-1) % total_pharmacies) + 1],
      item_id = item_ids[((idx-1) % total_items) + 1],
      physician_id = physician_ids[((idx-1) % total_physicians) + 1],
      patient_id = patient_ids[((idx-1) % total_patients) + 1],
      status = statuses[((idx-1) % array_length(statuses,1)) + 1]
    WHERE id = req.id;
    idx := idx + 1;
  END LOOP;
END $$;

-- 2. For each request, associate at least one fax (matching physician if possible)
DO $$
DECLARE
  req RECORD;
  selected_fax_id INTEGER;
BEGIN
  FOR req IN SELECT id, physician_id FROM requests WHERE deleted = false LOOP
    -- Try to find a fax with the same physician (by physician_npi)
    SELECT f.id INTO selected_fax_id
    FROM faxes f
    JOIN physicians p ON f.physician_npi = p.npi_number
    WHERE p.id = req.physician_id AND f.deleted = false
    LIMIT 1;
    -- If not found, just pick any fax
    IF selected_fax_id IS NULL THEN
      SELECT id INTO selected_fax_id FROM faxes WHERE deleted = false LIMIT 1;
    END IF;
    -- Insert association if not already present
    IF NOT EXISTS (SELECT 1 FROM request_faxes WHERE request_id = req.id AND fax_id = selected_fax_id) THEN
      INSERT INTO request_faxes (request_id, fax_id) VALUES (req.id, selected_fax_id);
    END IF;
  END LOOP;
END $$; 