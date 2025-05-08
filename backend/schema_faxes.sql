CREATE TABLE faxes (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES requests(id) ON DELETE CASCADE,
    sent_to VARCHAR(100) NOT NULL,  -- Doctor's fax number
    sent_by INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Pharmacy user
    status VARCHAR(50) DEFAULT 'pending', -- pending, sent, failed
    created_on TIMESTAMP DEFAULT now() NOT NULL
);