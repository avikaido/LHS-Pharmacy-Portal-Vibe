-- Remove old medication and quantity fields from requests table
-- These fields are no longer needed since we now use item_id relationship

-- Drop NOT NULL constraints first
ALTER TABLE requests ALTER COLUMN medication DROP NOT NULL;
ALTER TABLE requests ALTER COLUMN quantity DROP NOT NULL;

-- Drop the old columns
ALTER TABLE requests DROP COLUMN IF EXISTS medication;
ALTER TABLE requests DROP COLUMN IF EXISTS quantity;

-- Add index for item_id if not present
CREATE INDEX IF NOT EXISTS idx_requests_item_id ON requests(item_id); 