-- Fix faxes.physician_npi foreign key to reference main physicians table

-- Remove old constraint if it exists
ALTER TABLE faxes DROP CONSTRAINT IF EXISTS fk_faxes_physician;

-- Add new constraint to main physicians table
ALTER TABLE faxes
  ADD CONSTRAINT fk_faxes_physician
  FOREIGN KEY (physician_npi) REFERENCES physicians(npi_number) ON DELETE SET NULL; 