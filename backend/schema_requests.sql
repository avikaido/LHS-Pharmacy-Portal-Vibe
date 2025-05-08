CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    pharmacy_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    medication VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected
    created_on TIMESTAMP DEFAULT now() NOT NULL,
    updated_on TIMESTAMP DEFAULT now() NOT NULL
);