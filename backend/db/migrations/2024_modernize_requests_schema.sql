-- Modernize requests table for full workflow and relational integrity

-- Add audit/versioning/soft-delete fields if not present
ALTER TABLE requests ADD COLUMN IF NOT EXISTS uuid UUID DEFAULT gen_random_uuid() UNIQUE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS created_on TIMESTAMP DEFAULT now();
ALTER TABLE requests ADD COLUMN IF NOT EXISTS created_by INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS updated_on TIMESTAMP DEFAULT now();
ALTER TABLE requests ADD COLUMN IF NOT EXISTS updated_by INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS deleted_on TIMESTAMP;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS deleted_by INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS visibility VARCHAR(50) DEFAULT 'public';
ALTER TABLE requests ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS previous_id INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS change_log TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE requests ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS requested_date TIMESTAMP DEFAULT now();
ALTER TABLE requests ADD COLUMN IF NOT EXISTS completed_date TIMESTAMP;

-- Add foreign keys (if not present)
ALTER TABLE requests ADD COLUMN IF NOT EXISTS pharmacy_id INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS patient_id INTEGER;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS physician_id INTEGER;

-- Add constraints (skip if already present)
DO $$ BEGIN
  BEGIN ALTER TABLE requests ADD CONSTRAINT fk_requests_pharmacy FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN END;
  BEGIN ALTER TABLE requests ADD CONSTRAINT fk_requests_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN END;
  BEGIN ALTER TABLE requests ADD CONSTRAINT fk_requests_physician FOREIGN KEY (physician_id) REFERENCES physicians(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN END;
  BEGIN ALTER TABLE requests ADD CONSTRAINT fk_requests_previous FOREIGN KEY (previous_id) REFERENCES requests(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN END;
END $$;

-- Create join table for items in a request
CREATE TABLE IF NOT EXISTS request_items (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    instructions TEXT
);

-- Create join table for faxes associated with a request
CREATE TABLE IF NOT EXISTS request_faxes (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    fax_id INTEGER REFERENCES faxes(id) ON DELETE CASCADE
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_requests_deleted ON requests(deleted);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_pharmacy_id ON requests(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_requests_patient_id ON requests(patient_id);
CREATE INDEX IF NOT EXISTS idx_requests_physician_id ON requests(physician_id);
CREATE INDEX IF NOT EXISTS idx_request_items_request_id ON request_items(request_id);
CREATE INDEX IF NOT EXISTS idx_request_items_item_id ON request_items(item_id);
CREATE INDEX IF NOT EXISTS idx_request_faxes_request_id ON request_faxes(request_id);
CREATE INDEX IF NOT EXISTS idx_request_faxes_fax_id ON request_faxes(fax_id);

-- No destructive changes. Safe to run multiple times. 