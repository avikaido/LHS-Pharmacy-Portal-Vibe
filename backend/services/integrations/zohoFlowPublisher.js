import crypto from 'crypto';
import axios from 'axios';

const webhookUrl = process.env.ZOHOFLOW_WEBHOOK_URL;
const signingSecret = process.env.ZOHOFLOW_SIGNING_SECRET || '';
const timeout = parseInt(process.env.ZOHOFLOW_TIMEOUT_MS || '10000', 10);

const HDR_SIGNATURE = process.env.INTEGRATIONS_SIGNATURE_HEADER || 'X-Signature';
const HDR_EVENT_ID = process.env.INTEGRATIONS_EVENT_ID_HEADER || 'X-Event-Id';
const HDR_EVENT_TYPE = process.env.INTEGRATIONS_EVENT_TYPE_HEADER || 'X-Event-Type';
const HDR_IDEMPOTENCY = process.env.INTEGRATIONS_IDEMPOTENCY_HEADER || 'X-Idempotency-Key';

function hmacSign(body) {
  if (!signingSecret) return '';
  return crypto.createHmac('sha256', signingSecret).update(body).digest('hex');
}

export async function publishToZohoFlow(event) {
  if (!webhookUrl) throw new Error('ZOHOFLOW_WEBHOOK_URL is not set');
  const body = JSON.stringify(event);
  const signature = hmacSign(body);
  await axios.post(webhookUrl, body, {
    headers: {
      'Content-Type': 'application/json',
      [HDR_SIGNATURE]: signature,
      [HDR_EVENT_ID]: event.eventId,
      [HDR_EVENT_TYPE]: event.eventType,
      [HDR_IDEMPOTENCY]: event.idempotencyKey,
    },
    timeout,
    validateStatus: (s) => s >= 200 && s < 300,
  });
}

