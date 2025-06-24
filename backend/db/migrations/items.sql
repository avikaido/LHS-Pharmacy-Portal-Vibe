-- Create items table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE,
    created_on TIMESTAMP DEFAULT now(),
    created_by VARCHAR(50),
    updated_on TIMESTAMP DEFAULT now(),
    updated_by VARCHAR(50),
    deleted BOOLEAN DEFAULT false,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(50),
    visibility VARCHAR(20) DEFAULT 'public',
    version INTEGER DEFAULT 1,
    previous_id INTEGER,
    change_log TEXT,
    status VARCHAR(20) DEFAULT 'active',
    
    -- Item specific fields
    generic_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255),
    class VARCHAR(255),
    use_description TEXT,
    delivery_mechanism VARCHAR(255),
    schedule VARCHAR(50),
    dosage VARCHAR(255),
    side_effects TEXT,
    pregnancy_category VARCHAR(10),
    label VARCHAR(50),
    date_added DATE DEFAULT CURRENT_DATE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_items_generic_name ON items(generic_name);
CREATE INDEX IF NOT EXISTS idx_items_brand_name ON items(brand_name);
CREATE INDEX IF NOT EXISTS idx_items_class ON items(class);
CREATE INDEX IF NOT EXISTS idx_items_schedule ON items(schedule);
CREATE INDEX IF NOT EXISTS idx_items_deleted ON items(deleted);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_items_created_on ON items(created_on);

-- Add comments for documentation
COMMENT ON TABLE items IS 'Pharmacy items/medications table';
COMMENT ON COLUMN items.generic_name IS 'Generic name of the medication';
COMMENT ON COLUMN items.brand_name IS 'Brand name of the medication';
COMMENT ON COLUMN items.class IS 'Drug class/category';
COMMENT ON COLUMN items.use_description IS 'Intended use of the medication';
COMMENT ON COLUMN items.delivery_mechanism IS 'How the medication is administered';
COMMENT ON COLUMN items.schedule IS 'Drug schedule (OTC, Rx, Schedule I-V)';
COMMENT ON COLUMN items.dosage IS 'Typical dosage information';
COMMENT ON COLUMN items.side_effects IS 'Common side effects';
COMMENT ON COLUMN items.pregnancy_category IS 'Pregnancy safety category';
COMMENT ON COLUMN items.label IS 'Classification label';
COMMENT ON COLUMN items.date_added IS 'Date the item was added to the system'; 