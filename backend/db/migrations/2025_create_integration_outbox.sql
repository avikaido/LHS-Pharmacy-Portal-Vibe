-- Integration Outbox for reliable external deliveries (webhooks/emails/etc.)

CREATE TABLE IF NOT EXISTS integration_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  destination TEXT NOT NULL DEFAULT 'zoho_flow',
  idempotency_key TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | sent | failed
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_on TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_integration_outbox_status_due
  ON integration_outbox(status, next_attempt_at);

COMMENT ON TABLE integration_outbox IS 'Outbox pattern table for reliable, idempotent integration deliveries';

