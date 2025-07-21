-- Fix requests/items relationship: each request references one item

-- Add item_id to requests (if not present)
ALTER TABLE requests ADD COLUMN IF NOT EXISTS item_id INTEGER;

-- Add foreign key constraint (if not present)
DO $$
BEGIN
  BEGIN ALTER TABLE requests ADD CONSTRAINT fk_requests_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN END;
END $$;

-- Drop request_items table if it exists (no longer needed)
DROP TABLE IF EXISTS request_items CASCADE; 