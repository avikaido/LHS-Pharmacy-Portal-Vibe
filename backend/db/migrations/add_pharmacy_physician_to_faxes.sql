-- Add pharmacy and physician associations to faxes table
-- This allows tracking which pharmacy sent/received the fax and which doctor it's associated with

-- Add pharmacy_id column (foreign key to pharmacies table)
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS pharmacy_id INTEGER;

-- Add physician_npi column (foreign key to medicare_physicians table)
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS physician_npi VARCHAR(10);

-- Add foreign key constraints (drop first if they exist)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_faxes_pharmacy') THEN
        ALTER TABLE faxes DROP CONSTRAINT fk_faxes_pharmacy;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_faxes_physician') THEN
        ALTER TABLE faxes DROP CONSTRAINT fk_faxes_physician;
    END IF;
END $$;

ALTER TABLE faxes 
ADD CONSTRAINT fk_faxes_pharmacy 
FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id) ON DELETE SET NULL;

ALTER TABLE faxes 
ADD CONSTRAINT fk_faxes_physician 
FOREIGN KEY (physician_npi) REFERENCES medicare_physicians(npi) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faxes_pharmacy_id ON faxes(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_faxes_physician_npi ON faxes(physician_npi);

-- Add comments for documentation
COMMENT ON COLUMN faxes.pharmacy_id IS 'Associated pharmacy ID (for outgoing faxes or if fax number matches pharmacy)';
COMMENT ON COLUMN faxes.physician_npi IS 'Associated physician NPI (for outgoing faxes to doctors or if fax number matches physician)'; 