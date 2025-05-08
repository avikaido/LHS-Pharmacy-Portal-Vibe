CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE,

    -- Metadata & Auditing
    created_on TIMESTAMP DEFAULT now() NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    updated_on TIMESTAMP DEFAULT now() NOT NULL,  -- Remove ON UPDATE
    updated_by VARCHAR(100),
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    deleted_on TIMESTAMP,
    deleted_by VARCHAR(100),
    visibility VARCHAR(50) DEFAULT 'public' NOT NULL,  -- Public/Private/Restricted
    version INTEGER DEFAULT 1 NOT NULL,
    previous_id INTEGER REFERENCES patients(id) ON DELETE SET NULL, -- Track previous versions
    change_log TEXT,  -- Stores change history
    status VARCHAR(50) DEFAULT 'active' NOT NULL,  -- Active/Inactive/Pending/etc.

    -- Patient Details
    first_name VARCHAR(50) NOT NULL,
    middle_initial CHAR(1),
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    address2 VARCHAR(255), -- Optional
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    notes TEXT, -- Optional
    dob DATE NOT NULL,  -- Essential for age calculations
    gender VARCHAR(10) NOT NULL,

    -- Insurance Details
    insurance1 VARCHAR(50) NOT NULL,
    insurance1_id VARCHAR(50) NOT NULL,
    insurance2 VARCHAR(50),  -- Optional (some patients may not have a secondary insurance)
    insurance2_id VARCHAR(50), -- Optional

    -- Foreign Key References
    users INTEGER REFERENCES users(id) ON DELETE SET NULL,  -- User who manages this patient
    requests INTEGER REFERENCES requests(id) ON DELETE SET NULL, -- Related prescription requests
    faxes INTEGER REFERENCES faxes(id) ON DELETE SET NULL -- Related fax transactions
);

-- ✅ **Trigger Function to Auto-Update `updated_on`**
CREATE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_on = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ✅ **Trigger to Run the Function on Update**
CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON patients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

INSERT INTO patients (
    uuid, slug, created_by, updated_by, deleted, deleted_on, deleted_by, 
    visibility, version, previous_id, change_log, status, first_name, 
    middle_initial, last_name, phone, email, address, address2, city, 
    state, zipcode, notes, dob, gender, insurance1, insurance1_id, 
    insurance2, insurance2_id, users, requests, faxes
) VALUES 
(
    gen_random_uuid(), 'patient-1', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Georgeanna', 
    'A', 'Ramero', '456-485-5623', 'qq739v47ggn@claimab.com', '19214 110th Rd', '', 
    'Saint Albans', 'NY', '11412', 'Devolved Tangible Projection', 
    '1986-08-23', 'female', 'Aetna', '57588857', 'Humana', '33356654', 
    1, (SELECT id FROM requests WHERE medication = 'Lisinopril' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-2', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Cami', 
    'B', 'Macha', '999-895-9652', 'Camisad@claimab.com', '76 Hamilton Ave', '', 
    'Yonkers', 'NY', '10705', 'Horizontal Bi-Directional Capability', 
    '1986-08-23', 'female', 'Blue Cross', '57588857', 'Kaiser', '33356654', 
    2, (SELECT id FROM requests WHERE medication = 'Metformin' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-3', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Alda', 
    'C', 'Ziemer', '789-854-8950', 'Ziemer234@claimab.com', '930 Fruit Ave', '', 
    'Farrell', 'PA', '16121', 'Switchable Multimedia Hub', 
    '1986-08-23', 'female', 'Care Plus', '57588857', 'Tricare', '33356654', 
    3, (SELECT id FROM requests WHERE medication = 'Atorvastatin' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-4', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Luciano', 
    'D', 'Macpherson', '452-652-5230', 'Macpherson34@claimab.com', '19103 Stefani Ave', '', 
    'Cerritos', 'CA', '90703', 'Versatile Web-Enabled Groupware', 
    '1986-08-23', 'male', 'Medicare', '57588857', 'Optimum', '33356654', 
    4, (SELECT id FROM requests WHERE medication = 'Amlodipine' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-5', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Dalton', 
    'E', 'Paden', '985-985-7850', 'Dalton321@claimab.com', '3059 Edgewood Park Ct', 'Apt 4B', 
    'Commerce Township', 'MI', '48382', 'Cloned 6th-Generation Access', 
    '1986-08-23', 'male', 'Anthem (BCBS)', '57588857', 'Wellcare', '33356654', 
    5, (SELECT id FROM requests WHERE medication = 'Simvastatin' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-6', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Juan', 
    'F', 'Granado', '230-541-5231', 'Granado567@claimab.com', '1330 N Douglas Ave', '', 
    'Arlington Heights', 'IL', '60004', 'Multi-Tiered Coherent Workforce', 
    '1986-08-23', 'male', 'Medicare (Advantage Plan)', '57588857', 'AARP', '33356654', 
    6, (SELECT id FROM requests WHERE medication = 'Hydrochlorothiazide' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-7', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Reva', 
    'G', 'Allen', '478-582-6520', 'Allen326@claimab.com', '180 Topp Ln', '', 
    'Tupelo', 'MS', '38801', 'Upgradable 6th-Generation Pricing Structure', 
    '1986-08-23', 'female', 'Emblem', '57588857', 'Care Source', '33356654', 
    7, (SELECT id FROM requests WHERE medication = 'Omeprazole' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-8', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Jule', 
    'H', 'Huseman', '123-652-2301', 'Huseman458@claimab.com', '33 Caraway Rd', '', 
    'Reisterstown', 'MD', '21136', 'Optimized Dedicated Toolset', 
    '1986-08-23', 'female', 'Cigna', '57588857', 'Freedom Health', '33356654', 
    8, (SELECT id FROM requests WHERE medication = 'Losartan' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-9', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'Bridgette', 
    'I', 'Phung', '652-452-6521', 'Bridgette890@claimab.com', '#RR', '', 
    'Bruceton Mills', 'WV', '26525', 'Right-Sized Tertiary Success', 
    '1986-08-23', 'female', 'Health Net', '57588857', 'United Healthcare', '33356654', 
    9, (SELECT id FROM requests WHERE medication = 'Gabapentin' LIMIT 1), NULL
),
(
    gen_random_uuid(), 'patient-10', 1, 1, FALSE, NULL, NULL, 
    'public', 1, NULL, 'Initial entry', 'active', 'James', 
    'J', 'Doe', '321-654-7890', 'JamesDoe@claimab.com', '456 Main St', '', 
    'Orlando', 'FL', '32801', 'Scalable User-Centric Productivity', 
    '1986-08-23', 'male', 'Cigna', '57588857', 'United Healthcare', '33356654', 
    10, (SELECT id FROM requests WHERE medication = 'Levothyroxine' LIMIT 1), NULL
);