-- Update all requests to reference real pharmacy, item, physician, and patient IDs
-- Populate request_faxes to associate each request with at least one fax

-- 1. Find valid IDs
WITH first_pharmacy AS (SELECT id FROM pharmacies WHERE deleted = false LIMIT 1),
     first_item AS (SELECT id FROM items WHERE deleted = false LIMIT 1),
     first_physician AS (SELECT id FROM physicians WHERE deleted = false LIMIT 1),
     first_patient AS (SELECT id FROM patients WHERE deleted = false LIMIT 1)

-- 2. Update all requests to reference these IDs if null
UPDATE requests SET
    pharmacy_id = (SELECT id FROM first_pharmacy),
    item_id = (SELECT id FROM first_item),
    physician_id = (SELECT id FROM first_physician),
    patient_id = (SELECT id FROM first_patient)
WHERE (pharmacy_id IS NULL OR item_id IS NULL OR physician_id IS NULL OR patient_id IS NULL);

-- 3. For each request, associate at least one fax (matching physician if possible)
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