-- Pharmacies Schema and Data Migration
-- Generated on 2025-01-24T00:00:00.000Z
-- Total records: 10

-- Create pharmacies table
CREATE TABLE IF NOT EXISTS pharmacies (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by INTEGER DEFAULT 1,
    updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by INTEGER DEFAULT 1,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    deleted_on TIMESTAMP WITH TIME ZONE,
    deleted_by INTEGER,
    visibility VARCHAR(50) DEFAULT 'public' NOT NULL,
    version INTEGER DEFAULT 1 NOT NULL,
    previous_id INTEGER,
    change_log TEXT,
    status VARCHAR(50) DEFAULT 'active' NOT NULL,
    
    -- Pharmacy specific fields
    pharmacy_name VARCHAR(255) NOT NULL,
    pharmacy_type VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    fax VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    address TEXT,
    business_hours VARCHAR(100),
    license_number VARCHAR(50),
    license_expiration DATE,
    npi_number VARCHAR(20),
    insurance_accepted TEXT[], -- Array of insurance providers
    services_offered TEXT[], -- Array of services
    pharmacy_chain VARCHAR(255),
    manager_name VARCHAR(255),
    frequently_contacted BOOLEAN DEFAULT FALSE,
    starred BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pharmacies_pharmacy_name ON pharmacies(pharmacy_name);
CREATE INDEX IF NOT EXISTS idx_pharmacies_pharmacy_type ON pharmacies(pharmacy_type);
CREATE INDEX IF NOT EXISTS idx_pharmacies_status ON pharmacies(status);
CREATE INDEX IF NOT EXISTS idx_pharmacies_deleted ON pharmacies(deleted);
CREATE INDEX IF NOT EXISTS idx_pharmacies_created_on ON pharmacies(created_on);
CREATE INDEX IF NOT EXISTS idx_pharmacies_license_number ON pharmacies(license_number);
CREATE INDEX IF NOT EXISTS idx_pharmacies_npi_number ON pharmacies(npi_number);

-- Add comments for documentation
COMMENT ON TABLE pharmacies IS 'Stores pharmacy information including contact details, licensing, and services';
COMMENT ON COLUMN pharmacies.pharmacy_name IS 'Name of the pharmacy';
COMMENT ON COLUMN pharmacies.pharmacy_type IS 'Type of pharmacy (Retail, Independent, Hospital, Compounding)';
COMMENT ON COLUMN pharmacies.insurance_accepted IS 'Array of accepted insurance providers';
COMMENT ON COLUMN pharmacies.services_offered IS 'Array of services offered by the pharmacy';

-- Begin data migration
BEGIN;

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM pharmacies;

-- Pharmacy 1: CVS Pharmacy #123
INSERT INTO pharmacies (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    pharmacy_name,
    pharmacy_type,
    phone,
    fax,
    email,
    website,
    address,
    business_hours,
    license_number,
    license_expiration,
    npi_number,
    insurance_accepted,
    services_offered,
    pharmacy_chain,
    manager_name,
    frequently_contacted,
    starred
) VALUES (
    gen_random_uuid(),
    'pharmacy-1-1750740133134',
    now(),
    1,
    now(),
    1,
    false,
    null,
    null,
    'public',
    1,
    null,
    'Initial migration from mock data',
    'active',
    'CVS Pharmacy #123',
    'Retail',
    '800-123-4567',
    '800-123-7654',
    'contact@cvs123.com',
    'www.cvs123.com',
    '19214 110th Rd, Saint Albans, NY, 11412',
    '9 AM - 9 PM',
    'PH87654',
    '2026-03-15',
    '1234567890',
    ARRAY['Medicare', 'Medicaid', 'BlueCross BlueShield'],
    ARRAY['Vaccinations', 'Delivery', 'Compounding'],
    'CVS Health',
    'John Doe',
    true,
    true
);

-- Pharmacy 2: Walgreens #456
INSERT INTO pharmacies (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    pharmacy_name,
    pharmacy_type,
    phone,
    fax,
    email,
    website,
    address,
    business_hours,
    license_number,
    license_expiration,
    npi_number,
    insurance_accepted,
    services_offered,
    pharmacy_chain,
    manager_name,
    frequently_contacted,
    starred
) VALUES (
    gen_random_uuid(),
    'pharmacy-2-1750740133134',
    now(),
    1,
    now(),
    1,
    false,
    null,
    null,
    'public',
    1,
    null,
    'Initial migration from mock data',
    'active',
    'Walgreens #456',
    'Retail',
    '888-456-7890',
    '888-456-7891',
    'support@walgreens456.com',
    'www.walgreens456.com',
    '76 Hamilton Ave, Yonkers, NY, 10705',
    '8 AM - 8 PM',
    'PH54321',
    '2025-07-11',
    '0987654321',
    ARRAY['Aetna', 'Cigna', 'Medicare'],
    ARRAY['Vaccinations', 'Clinical Consultations', 'Home Delivery'],
    'Walgreens',
    'Jane Smith',
    false,
    false
);

-- Pharmacy 3: Good Health Pharmacy
INSERT INTO pharmacies (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    pharmacy_name,
    pharmacy_type,
    phone,
    fax,
    email,
    website,
    address,
    business_hours,
    license_number,
    license_expiration,
    npi_number,
    insurance_accepted,
    services_offered,
    pharmacy_chain,
    manager_name,
    frequently_contacted,
    starred
) VALUES (
    gen_random_uuid(),
    'pharmacy-3-1750740133134',
    now(),
    1,
    now(),
    1,
    false,
    null,
    null,
    'public',
    1,
    null,
    'Initial migration from mock data',
    'active',
    'Good Health Pharmacy',
    'Independent',
    '789-854-8950',
    '789-854-8951',
    'info@goodhealthpharmacy.com',
    'www.goodhealthpharmacy.com',
    '930 Fruit Ave, Farrell, PA, 16121',
    '9 AM - 7 PM',
    'PH32109',
    '2024-10-22',
    '5678901234',
    ARRAY['Medicaid', 'Humana', 'United Healthcare'],
    ARRAY['Vaccinations', 'Specialty Medications'],
    'Independent',
    'Michael Johnson',
    true,
    false
);

-- Pharmacy 4: Rite Aid #789
INSERT INTO pharmacies (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    pharmacy_name,
    pharmacy_type,
    phone,
    fax,
    email,
    website,
    address,
    business_hours,
    license_number,
    license_expiration,
    npi_number,
    insurance_accepted,
    services_offered,
    pharmacy_chain,
    manager_name,
    frequently_contacted,
    starred
) VALUES (
    gen_random_uuid(),
    'pharmacy-4-1750740133134',
    now(),
    1,
    now(),
    1,
    true,
    now(),
    1,
    'public',
    1,
    null,
    'Initial migration from mock data',
    'active',
    'Rite Aid #789',
    'Retail',
    '452-652-5230',
    '452-652-5231',
    'riteaid789@riteaid.com',
    'www.riteaid789.com',
    '19103 Stefani Ave, Cerritos, CA, 90703',
    '8 AM - 9 PM',
    'PH98765',
    '2027-01-05',
    '7654321098',
    ARRAY['Kaiser Permanente', 'Medicare', 'Aetna'],
    ARRAY['Vaccinations', 'Compounding', 'Prescription Refill Reminders'],
    'Rite Aid',
    'Emily Davis',
    false,
    true
);

-- Pharmacy 5: HealthFirst Specialty Pharmacy
INSERT INTO pharmacies (
    uuid,
    slug,
    created_on,
    created_by,
    updated_on,
    updated_by,
    deleted,
    deleted_on,
    deleted_by,
    visibility,
    version,
    previous_id,
    change_log,
    status,
    pharmacy_name,
    pharmacy_type,
    phone,
    fax,
    email,
    website,
    address,
    business_hours,
    license_number,
    license_expiration,
    npi_number,
    insurance_accepted,
    services_offered,
    pharmacy_chain,
    manager_name,
    frequently_contacted,
    starred
) VALUES (
    gen_random_uuid(),
    'pharmacy-5-1750740133134',
    now(),
    1,
    now(),
    1,
    false,
    null,
    null,
    'public',
    1,
    null,
    'Initial migration from mock data',
    'active',
    'HealthFirst Specialty Pharmacy',
    'Compounding',
    '985-985-7850',
    '985-985-7851',
    'info@healthfirstspecialty.com',
    'www.healthfirstspecialty.com',
    '3059 Edgewood Park Ct, Commerce Township, MI',
    '9 AM - 5 PM',
    'PH65432',
    '2026-11-19',
    '6543210987',
    ARRAY['BlueCross BlueShield', 'Cigna'],
    ARRAY['Sterile Compounding', 'Hormone Replacement Therapy'],
    'Independent',
    'Sophia Lopez',
    false,
    false
);

-- Continue with remaining pharmacies...
-- Pharmacy 6: Wellness Pharmacy
INSERT INTO pharmacies (
    uuid, slug, created_on, created_by, updated_on, updated_by, deleted, deleted_on, deleted_by,
    visibility, version, previous_id, change_log, status, pharmacy_name, pharmacy_type,
    phone, fax, email, website, address, business_hours, license_number, license_expiration,
    npi_number, insurance_accepted, services_offered, pharmacy_chain, manager_name,
    frequently_contacted, starred
) VALUES (
    gen_random_uuid(), 'pharmacy-6-1750740133134', now(), 1, now(), 1, false, null, null,
    'public', 1, null, 'Initial migration from mock data', 'active', 'Wellness Pharmacy', 'Independent',
    '456-789-1234', '456-789-4321', 'contact@wellnesspharmacy.com', 'www.wellnesspharmacy.com',
    '5023 Maple St, Springfield, IL', '8 AM - 6 PM', 'PH87643', '2025-12-12',
    '8765432190', ARRAY['Aetna', 'Cigna', 'Medicaid'],
    ARRAY['Vaccinations', 'Medication Therapy Management', 'Delivery'],
    'Independent', 'James Taylor', true, false
);

-- Pharmacy 7: Happy Health Pharmacy
INSERT INTO pharmacies (
    uuid, slug, created_on, created_by, updated_on, updated_by, deleted, deleted_on, deleted_by,
    visibility, version, previous_id, change_log, status, pharmacy_name, pharmacy_type,
    phone, fax, email, website, address, business_hours, license_number, license_expiration,
    npi_number, insurance_accepted, services_offered, pharmacy_chain, manager_name,
    frequently_contacted, starred
) VALUES (
    gen_random_uuid(), 'pharmacy-7-1750740133134', now(), 1, now(), 1, false, null, null,
    'public', 1, null, 'Initial migration from mock data', 'active', 'Happy Health Pharmacy', 'Retail',
    '321-654-9870', '321-654-9871', 'info@happyhealth.com', 'www.happyhealth.com',
    '1109 Cedar Rd, Kansas City, MO', '9 AM - 7 PM', 'PH54321', '2024-09-15',
    '7654321098', ARRAY['BlueCross BlueShield', 'Medicare', 'Humana'],
    ARRAY['Compounding', 'Vaccinations', 'Prescription Delivery'],
    'Independent', 'Laura White', false, true
);

-- Pharmacy 8: LifeCare Pharmacy
INSERT INTO pharmacies (
    uuid, slug, created_on, created_by, updated_on, updated_by, deleted, deleted_on, deleted_by,
    visibility, version, previous_id, change_log, status, pharmacy_name, pharmacy_type,
    phone, fax, email, website, address, business_hours, license_number, license_expiration,
    npi_number, insurance_accepted, services_offered, pharmacy_chain, manager_name,
    frequently_contacted, starred
) VALUES (
    gen_random_uuid(), 'pharmacy-8-1750740133134', now(), 1, now(), 1, false, null, null,
    'public', 1, null, 'Initial migration from mock data', 'active', 'LifeCare Pharmacy', 'Hospital Pharmacy',
    '212-654-7890', '212-654-7891', 'lcare@lifecarepharmacy.com', 'www.lifecarepharmacy.com',
    '8903 Oak St, New York, NY', 'Open 24 hours', 'PH65478', '2026-05-28',
    '9876543210', ARRAY['Aetna', 'Kaiser Permanente', 'Medicare'],
    ARRAY['Inpatient Services', 'Emergency Medications', 'Clinical Support'],
    'LifeCare Health', 'Eleanor Davis', true, false
);

-- Pharmacy 9: MedStar Pharmacy
INSERT INTO pharmacies (
    uuid, slug, created_on, created_by, updated_on, updated_by, deleted, deleted_on, deleted_by,
    visibility, version, previous_id, change_log, status, pharmacy_name, pharmacy_type,
    phone, fax, email, website, address, business_hours, license_number, license_expiration,
    npi_number, insurance_accepted, services_offered, pharmacy_chain, manager_name,
    frequently_contacted, starred
) VALUES (
    gen_random_uuid(), 'pharmacy-9-1750740133134', now(), 1, now(), 1, true, now(), 1,
    'public', 1, null, 'Initial migration from mock data', 'active', 'MedStar Pharmacy', 'Hospital Pharmacy',
    '202-654-0987', '202-654-9876', 'medstar@medstar.com', 'www.medstarpharmacy.com',
    '1458 Monroe St NW, Washington, DC', '7 AM - 8 PM', 'PH23489', '2024-12-01',
    '2345678901', ARRAY['BlueCross BlueShield', 'Humana', 'United Healthcare'],
    ARRAY['Inpatient Services', 'Specialty Medications'],
    'MedStar Health', 'John Clarkson', false, false
);

-- Pharmacy 10: Grand Rx
INSERT INTO pharmacies (
    uuid, slug, created_on, created_by, updated_on, updated_by, deleted, deleted_on, deleted_by,
    visibility, version, previous_id, change_log, status, pharmacy_name, pharmacy_type,
    phone, fax, email, website, address, business_hours, license_number, license_expiration,
    npi_number, insurance_accepted, services_offered, pharmacy_chain, manager_name,
    frequently_contacted, starred
) VALUES (
    gen_random_uuid(), 'pharmacy-10-1750740133134', now(), 1, now(), 1, false, null, null,
    'public', 1, null, 'Initial migration from mock data', 'active', 'Grand Rx', 'Independent',
    '987-321-6543', '987-321-6542', 'contact@grandrx.com', 'www.grandrx.com',
    '3207 Birch Ln, San Diego, CA', '8 AM - 6 PM', 'PH34876', '2025-10-20',
    '1098765432', ARRAY['Medicaid', 'Medicare', 'Cigna'],
    ARRAY['Prescription Refill', 'Vaccinations', 'Clinical Services'],
    'Independent', 'Linda Roberts', true, true
);

COMMIT;

-- Verify the migration
SELECT COUNT(*) as total_pharmacies FROM pharmacies;
SELECT COUNT(*) as active_pharmacies FROM pharmacies WHERE deleted = false;
SELECT COUNT(*) as archived_pharmacies FROM pharmacies WHERE deleted = true;

-- Show sample of administrative data
SELECT 
    id,
    pharmacy_name,
    pharmacy_type,
    created_by,
    created_on,
    updated_by,
    updated_on,
    status,
    version
FROM pharmacies 
LIMIT 5; 