-- Create faxes table with comprehensive audit fields
CREATE TABLE IF NOT EXISTS faxes (
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
    
    -- Fax specific fields
    fax_number VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'outgoing', -- incoming, outgoing
    code VARCHAR(50), -- success, busy_signal, no_answer, etc.
    doc_link TEXT, -- Link to stored document/PDF
    users INTEGER, -- Associated user ID
    patients INTEGER, -- Associated patient ID (if applicable)
    requests INTEGER, -- Associated request ID (if applicable)
    
    -- Legacy fields for backward compatibility
    request_id INTEGER,
    sent_to VARCHAR(100),
    sent_by INTEGER,
    telnyx_fax_id VARCHAR(100)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faxes_fax_number ON faxes(fax_number);
CREATE INDEX IF NOT EXISTS idx_faxes_type ON faxes(type);
CREATE INDEX IF NOT EXISTS idx_faxes_status ON faxes(status);
CREATE INDEX IF NOT EXISTS idx_faxes_code ON faxes(code);
CREATE INDEX IF NOT EXISTS idx_faxes_deleted ON faxes(deleted);
CREATE INDEX IF NOT EXISTS idx_faxes_created_on ON faxes(created_on);
CREATE INDEX IF NOT EXISTS idx_faxes_users ON faxes(users);
CREATE INDEX IF NOT EXISTS idx_faxes_requests ON faxes(requests);

-- Add comments for documentation
COMMENT ON TABLE faxes IS 'Fax communications table';
COMMENT ON COLUMN faxes.fax_number IS 'Fax number (to or from)';
COMMENT ON COLUMN faxes.type IS 'Type of fax: incoming or outgoing';
COMMENT ON COLUMN faxes.code IS 'Status code: success, busy_signal, no_answer, etc.';
COMMENT ON COLUMN faxes.doc_link IS 'Link to stored document/PDF';
COMMENT ON COLUMN faxes.users IS 'Associated user ID';
COMMENT ON COLUMN faxes.patients IS 'Associated patient ID';
COMMENT ON COLUMN faxes.requests IS 'Associated request ID'; 