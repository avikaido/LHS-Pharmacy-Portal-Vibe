-- Add LLM conversation data to requests table
-- This will store the conversation transcript when LLM helped suggest medications/devices

-- Add LLM conversation field
ALTER TABLE requests ADD COLUMN IF NOT EXISTS llm_conversation JSONB;

-- Add index for LLM conversation queries
CREATE INDEX IF NOT EXISTS idx_requests_llm_conversation ON requests USING GIN (llm_conversation);

-- Add comment for documentation
COMMENT ON COLUMN requests.llm_conversation IS 'JSONB field storing LLM conversation transcript and metadata for medication/device suggestions'; 