-- Migration: Add CRUD and archive/restore support to faxes table

-- Add deleted, deleted_on, deleted_by if not present
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS deleted_on TIMESTAMP;
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS deleted_by VARCHAR(50);

-- Add audit fields if not present
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS updated_on TIMESTAMP DEFAULT now();
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS updated_by VARCHAR(50);
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS created_on TIMESTAMP DEFAULT now();
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS created_by VARCHAR(50);
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1;
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS change_log TEXT;
ALTER TABLE faxes ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Add index for deleted
CREATE INDEX IF NOT EXISTS idx_faxes_deleted ON faxes(deleted);

-- No destructive changes. This migration is safe to run multiple times. 