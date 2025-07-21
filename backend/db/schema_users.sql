-- Users Schema - Modern standards with audit fields and comprehensive data structure
-- Drop table if exists (for development)
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE,
    
    -- Audit fields
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER DEFAULT 1,
    updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER DEFAULT 1,
    deleted BOOLEAN DEFAULT FALSE,
    deleted_on TIMESTAMP WITH TIME ZONE,
    deleted_by INTEGER,
    visibility VARCHAR(50) DEFAULT 'public',
    version INTEGER DEFAULT 1,
    previous_id INTEGER,
    change_log JSONB,
    status VARCHAR(50) DEFAULT 'active',
    
    -- Basic Information
    first_name VARCHAR(100) NOT NULL,
    middle_initial VARCHAR(10),
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    
    -- User Management
    role VARCHAR(50) DEFAULT 'user', -- admin, pharmacist, doctor, user, etc.
    permissions TEXT[], -- Array of specific permissions
    department VARCHAR(100),
    title VARCHAR(100),
    
    -- Contact Information
    address VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zipcode VARCHAR(10),
    country VARCHAR(100) DEFAULT 'USA',
    
    -- Additional Information
    notes TEXT,
    frequently_contacted BOOLEAN DEFAULT FALSE,
    starred BOOLEAN DEFAULT FALSE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone ~* '^[\d\s\-\(\)\+]+$'),
    CONSTRAINT valid_zipcode CHECK (zipcode ~* '^\d{5}(-\d{4})?$'),
    CONSTRAINT valid_state CHECK (state ~* '^[A-Z]{2}$')
);

-- Create indexes for performance
CREATE INDEX idx_users_last_name ON users(last_name);
CREATE INDEX idx_users_first_name ON users(first_name);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_deleted ON users(deleted);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_frequently_contacted ON users(frequently_contacted);
CREATE INDEX idx_users_starred ON users(starred);
CREATE INDEX idx_users_created_on ON users(created_on);
CREATE INDEX idx_users_updated_on ON users(updated_on);

-- Create full-text search index
CREATE INDEX idx_users_search ON users USING gin(
    to_tsvector('english', 
        COALESCE(first_name, '') || ' ' || 
        COALESCE(last_name, '') || ' ' || 
        COALESCE(email, '') || ' ' || 
        COALESCE(role, '') || ' ' || 
        COALESCE(department, '')
    )
);

-- Create trigger to update updated_on timestamp
CREATE OR REPLACE FUNCTION update_updated_on_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = CURRENT_TIMESTAMP;
    NEW.version = OLD.version + 1;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_on 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_on_column();

-- Insert sample data
INSERT INTO users (
    first_name, middle_initial, last_name, email, phone, role, department, title,
    address, address2, city, state, zipcode, notes, frequently_contacted, starred
) VALUES 
(
    'John', 'A', 'Admin', 'admin@lhs.com', '555-123-4567', 'admin', 'Administration', 'System Administrator',
    '123 Main St', 'Suite 100', 'New York', 'NY', '10001', 'Primary system administrator with full access rights.',
    true, true
),
(
    'Sarah', 'B', 'Pharmacist', 'sarah.pharmacist@lhs.com', '555-234-5678', 'pharmacist', 'Pharmacy', 'Senior Pharmacist',
    '456 Oak Ave', 'Suite 200', 'Los Angeles', 'CA', '90210', 'Experienced pharmacist specializing in oncology medications.',
    true, false
),
(
    'Michael', 'C', 'Doctor', 'michael.doctor@lhs.com', '555-345-6789', 'doctor', 'Medical', 'Attending Physician',
    '789 Pine St', 'Suite 300', 'Chicago', 'IL', '60601', 'Board-certified internal medicine physician.',
    false, true
),
(
    'Emily', 'D', 'User', 'emily.user@lhs.com', '555-456-7890', 'user', 'Support', 'Customer Service Representative',
    '321 Elm St', 'Suite 400', 'Boston', 'MA', '02101', 'Customer service representative handling patient inquiries.',
    false, false
),
(
    'David', 'E', 'Manager', 'david.manager@lhs.com', '555-567-8901', 'manager', 'Operations', 'Operations Manager',
    '654 Maple Dr', 'Suite 500', 'Houston', 'TX', '77001', 'Operations manager overseeing daily pharmacy operations.',
    true, false
);

-- Create view for active users
CREATE VIEW active_users AS
SELECT * FROM users 
WHERE deleted = FALSE AND status = 'active';

-- Create view for frequently contacted users
CREATE VIEW frequently_contacted_users AS
SELECT * FROM users 
WHERE frequently_contacted = TRUE AND deleted = FALSE;

-- Create view for starred users
CREATE VIEW starred_users AS
SELECT * FROM users 
WHERE starred = TRUE AND deleted = FALSE;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON TABLE users TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;