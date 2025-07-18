-- Physicians Schema
-- Modern standards with snake_case naming, audit fields, and comprehensive data structure

-- Drop table if exists (for development)
DROP TABLE IF EXISTS physicians CASCADE;

-- Create physicians table
CREATE TABLE physicians (
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
    suffix VARCHAR(20),
    title VARCHAR(100),
    specialty VARCHAR(255),
    sub_specialty VARCHAR(255),
    practice_type VARCHAR(100),
    
    -- Contact Information
    phone VARCHAR(20),
    fax VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Address Information
    address VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zipcode VARCHAR(10),
    country VARCHAR(100) DEFAULT 'USA',
    
    -- Professional Information
    npi_number VARCHAR(10) UNIQUE,
    dea_number VARCHAR(20),
    license_number VARCHAR(50),
    license_expiration DATE,
    board_certifications TEXT[],
    languages_spoken TEXT[],
    years_of_experience INTEGER,
    
    -- Practice Information
    practice_name VARCHAR(255),
    practice_address VARCHAR(255),
    practice_city VARCHAR(100),
    practice_state VARCHAR(2),
    practice_zipcode VARCHAR(10),
    practice_phone VARCHAR(20),
    practice_fax VARCHAR(20),
    practice_website VARCHAR(255),
    
    -- Insurance & Billing
    insurance_accepted TEXT[],
    accepting_new_patients BOOLEAN DEFAULT TRUE,
    appointment_required BOOLEAN DEFAULT TRUE,
    
    -- Additional Information
    notes TEXT,
    frequently_contacted BOOLEAN DEFAULT FALSE,
    starred BOOLEAN DEFAULT FALSE,
    
    -- Relationships (for future use)
    affiliated_hospitals TEXT[],
    affiliated_pharmacies INTEGER[],
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (phone ~* '^[\d\s\-\(\)\+]+$'),
    CONSTRAINT valid_npi CHECK (npi_number ~* '^\d{10}$'),
    CONSTRAINT valid_zipcode CHECK (zipcode ~* '^\d{5}(-\d{4})?$'),
    CONSTRAINT valid_state CHECK (state ~* '^[A-Z]{2}$'),
    CONSTRAINT years_experience_positive CHECK (years_of_experience >= 0)
);

-- Create indexes for performance
CREATE INDEX idx_physicians_last_name ON physicians(last_name);
CREATE INDEX idx_physicians_first_name ON physicians(first_name);
CREATE INDEX idx_physicians_npi_number ON physicians(npi_number);
CREATE INDEX idx_physicians_specialty ON physicians(specialty);
CREATE INDEX idx_physicians_city ON physicians(city);
CREATE INDEX idx_physicians_state ON physicians(state);
CREATE INDEX idx_physicians_deleted ON physicians(deleted);
CREATE INDEX idx_physicians_status ON physicians(status);
CREATE INDEX idx_physicians_frequently_contacted ON physicians(frequently_contacted);
CREATE INDEX idx_physicians_starred ON physicians(starred);
CREATE INDEX idx_physicians_created_on ON physicians(created_on);
CREATE INDEX idx_physicians_updated_on ON physicians(updated_on);

-- Create full-text search index
CREATE INDEX idx_physicians_search ON physicians USING gin(
    to_tsvector('english', 
        COALESCE(first_name, '') || ' ' || 
        COALESCE(last_name, '') || ' ' || 
        COALESCE(specialty, '') || ' ' || 
        COALESCE(practice_name, '') || ' ' || 
        COALESCE(npi_number, '')
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

CREATE TRIGGER update_physicians_updated_on 
    BEFORE UPDATE ON physicians 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_on_column();

-- Insert sample data
INSERT INTO physicians (
    first_name, middle_initial, last_name, suffix, title, specialty, sub_specialty, practice_type,
    phone, fax, email, website,
    address, address2, city, state, zipcode,
    npi_number, dea_number, license_number, license_expiration, board_certifications, languages_spoken, years_of_experience,
    practice_name, practice_address, practice_city, practice_state, practice_zipcode, practice_phone, practice_fax, practice_website,
    insurance_accepted, accepting_new_patients, appointment_required,
    notes, frequently_contacted, starred,
    affiliated_hospitals, affiliated_pharmacies
) VALUES 
(
    'John', 'A', 'Doe', 'MD', 'Dr.', 'Internal Medicine', 'Cardiology', 'Private Practice',
    '555-123-4567', '555-123-4568', 'john.doe@example.com', 'https://drjohndoe.com',
    '123 Main St', 'Suite 100', 'New York', 'NY', '10001',
    '1234567890', 'AB1234567', 'MD12345', '2025-12-31', ARRAY['American Board of Internal Medicine', 'American Board of Cardiovascular Disease'], ARRAY['English', 'Spanish'], 15,
    'Manhattan Medical Associates', '123 Main St', 'New York', 'NY', '10001', '555-123-4567', '555-123-4568', 'https://manhattanmedical.com',
    ARRAY['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealth'], true, true,
    'Specializes in preventive cardiology and heart disease management. Experienced in treating complex cardiovascular conditions.',
    true, true,
    ARRAY['Mount Sinai Hospital', 'NYU Langone Medical Center'], ARRAY[1, 2]
),
(
    'Jane', 'B', 'Smith', 'MD', 'Dr.', 'Pediatrics', 'Neonatology', 'Hospital Practice',
    '555-234-5678', '555-234-5679', 'jane.smith@example.com', 'https://drjanesmith.com',
    '456 Oak Ave', 'Suite 200', 'Los Angeles', 'CA', '90210',
    '2345678901', 'BC2345678', 'MD23456', '2026-06-30', ARRAY['American Board of Pediatrics', 'American Board of Pediatrics - Neonatal-Perinatal Medicine'], ARRAY['English', 'French'], 12,
    'Children''s Hospital LA', '456 Oak Ave', 'Los Angeles', 'CA', '90210', '555-234-5678', '555-234-5679', 'https://childrenshospitalla.com',
    ARRAY['Blue Cross Blue Shield', 'Kaiser Permanente', 'Anthem'], true, true,
    'Neonatologist with expertise in caring for premature infants and newborns with complex medical conditions.',
    false, false,
    ARRAY['Children''s Hospital LA', 'UCLA Medical Center'], ARRAY[1, 3]
),
(
    'Michael', 'C', 'Johnson', 'DO', 'Dr.', 'Family Medicine', 'Sports Medicine', 'Private Practice',
    '555-345-6789', '555-345-6790', 'michael.johnson@example.com', 'https://drmichaeljohnson.com',
    '789 Pine St', 'Suite 300', 'Chicago', 'IL', '60601',
    '3456789012', 'CD3456789', 'DO34567', '2024-09-15', ARRAY['American Osteopathic Board of Family Physicians', 'American Osteopathic Board of Sports Medicine'], ARRAY['English', 'German'], 8,
    'Chicago Family Care', '789 Pine St', 'Chicago', 'IL', '60601', '555-345-6789', '555-345-6790', 'https://chicagofamilycare.com',
    ARRAY['Blue Cross Blue Shield', 'Aetna', 'Humana'], true, false,
    'Family physician with sports medicine certification. Provides comprehensive care for patients of all ages.',
    true, false,
    ARRAY['Northwestern Memorial Hospital'], ARRAY[2, 4]
),
(
    'Sarah', 'D', 'Williams', 'MD', 'Dr.', 'Obstetrics and Gynecology', 'Maternal-Fetal Medicine', 'Academic Practice',
    '555-456-7890', '555-456-7891', 'sarah.williams@example.com', 'https://drsarahwilliams.com',
    '321 Elm St', 'Suite 400', 'Boston', 'MA', '02101',
    '4567890123', 'DE4567890', 'MD45678', '2027-03-20', ARRAY['American Board of Obstetrics and Gynecology', 'American Board of Obstetrics and Gynecology - Maternal-Fetal Medicine'], ARRAY['English', 'Portuguese'], 18,
    'Boston Women''s Health', '321 Elm St', 'Boston', 'MA', '02101', '555-456-7890', '555-456-7891', 'https://bostonwomenshealth.com',
    ARRAY['Blue Cross Blue Shield', 'Tufts Health Plan', 'Harvard Pilgrim'], true, true,
    'Maternal-fetal medicine specialist with expertise in high-risk pregnancies and prenatal diagnosis.',
    false, true,
    ARRAY['Massachusetts General Hospital', 'Brigham and Women''s Hospital'], ARRAY[1, 5]
),
(
    'David', 'E', 'Brown', 'MD', 'Dr.', 'Psychiatry', 'Child and Adolescent Psychiatry', 'Private Practice',
    '555-567-8901', '555-567-8902', 'david.brown@example.com', 'https://drdavidbrown.com',
    '654 Maple Dr', 'Suite 500', 'Seattle', 'WA', '98101',
    '5678901234', 'EF5678901', 'MD56789', '2025-08-10', ARRAY['American Board of Psychiatry and Neurology', 'American Board of Psychiatry and Neurology - Child and Adolescent Psychiatry'], ARRAY['English', 'Mandarin'], 14,
    'Seattle Mental Health Associates', '654 Maple Dr', 'Seattle', 'WA', '98101', '555-567-8901', '555-567-8902', 'https://seattlementalhealth.com',
    ARRAY['Premera Blue Cross', 'Regence BlueShield', 'Kaiser Permanente'], true, true,
    'Child and adolescent psychiatrist specializing in developmental disorders and family therapy.',
    true, false,
    ARRAY['Seattle Children''s Hospital', 'University of Washington Medical Center'], ARRAY[3, 6]
),
(
    'Emily', 'F', 'Davis', 'MD', 'Dr.', 'Dermatology', 'Mohs Surgery', 'Private Practice',
    '555-678-9012', '555-678-9013', 'emily.davis@example.com', 'https://dremilydavis.com',
    '987 Cedar Ln', 'Suite 600', 'Miami', 'FL', '33101',
    '6789012345', 'FG6789012', 'MD67890', '2026-11-25', ARRAY['American Board of Dermatology', 'American College of Mohs Surgery'], ARRAY['English', 'Spanish'], 11,
    'Miami Dermatology Center', '987 Cedar Ln', 'Miami', 'FL', '33101', '555-678-9012', '555-678-9013', 'https://miamidermatology.com',
    ARRAY['Florida Blue', 'Aetna', 'Cigna'], true, false,
    'Dermatologist with expertise in skin cancer treatment and Mohs micrographic surgery.',
    false, true,
    ARRAY['Jackson Memorial Hospital', 'University of Miami Hospital'], ARRAY[2, 4]
),
(
    'Robert', 'G', 'Miller', 'MD', 'Dr.', 'Orthopedic Surgery', 'Joint Replacement', 'Hospital Practice',
    '555-789-0123', '555-789-0124', 'robert.miller@example.com', 'https://drrobertmiller.com',
    '147 Birch Rd', 'Suite 700', 'Denver', 'CO', '80201',
    '7890123456', 'GH7890123', 'MD78901', '2024-12-05', ARRAY['American Board of Orthopaedic Surgery'], ARRAY['English', 'Russian'], 16,
    'Denver Orthopedic Institute', '147 Birch Rd', 'Denver', 'CO', '80201', '555-789-0123', '555-789-0124', 'https://denverorthopedic.com',
    ARRAY['Anthem Blue Cross', 'Kaiser Permanente', 'UnitedHealth'], true, true,
    'Orthopedic surgeon specializing in joint replacement and sports medicine procedures.',
    true, false,
    ARRAY['Denver Health Medical Center', 'UCHealth University of Colorado Hospital'], ARRAY[1, 5]
),
(
    'Lisa', 'H', 'Garcia', 'MD', 'Dr.', 'Neurology', 'Epilepsy', 'Academic Practice',
    '555-890-1234', '555-890-1235', 'lisa.garcia@example.com', 'https://drlisagarcia.com',
    '258 Willow Way', 'Suite 800', 'San Francisco', 'CA', '94101',
    '8901234567', 'HI8901234', 'MD89012', '2027-01-15', ARRAY['American Board of Psychiatry and Neurology', 'American Board of Clinical Neurophysiology'], ARRAY['English', 'Spanish'], 13,
    'UCSF Neurology Clinic', '258 Willow Way', 'San Francisco', 'CA', '94101', '555-890-1234', '555-890-1235', 'https://ucsfneurology.com',
    ARRAY['Blue Cross Blue Shield', 'Kaiser Permanente', 'Anthem'], true, true,
    'Neurologist specializing in epilepsy and seizure disorders. Provides comprehensive care for patients with complex neurological conditions.',
    false, true,
    ARRAY['UCSF Medical Center', 'California Pacific Medical Center'], ARRAY[3, 6]
);

-- Create view for active physicians
CREATE VIEW active_physicians AS
SELECT * FROM physicians 
WHERE deleted = FALSE AND status = 'active';

-- Create view for frequently contacted physicians
CREATE VIEW frequently_contacted_physicians AS
SELECT * FROM physicians 
WHERE frequently_contacted = TRUE AND deleted = FALSE;

-- Create view for starred physicians
CREATE VIEW starred_physicians AS
SELECT * FROM physicians 
WHERE starred = TRUE AND deleted = FALSE;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON TABLE physicians TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user; 