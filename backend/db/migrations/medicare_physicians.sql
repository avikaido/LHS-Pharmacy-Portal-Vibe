CREATE TABLE IF NOT EXISTS medicare_physicians (
    npi VARCHAR(10) PRIMARY KEY,
    last_name VARCHAR(255),
    first_name VARCHAR(255),
    fax_number VARCHAR(20),
    phone_number VARCHAR(20),
    address_line_1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    primary_specialty VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_medicare_physicians_npi ON medicare_physicians(npi); 