CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user', -- Admin, Pharmacist, Doctor, etc.
    created_on TIMESTAMP DEFAULT now() NOT NULL,
    updated_on TIMESTAMP DEFAULT now() NOT NULL
);