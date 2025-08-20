import telnyx from 'telnyx';
import crypto from 'crypto';

// Lazy init to avoid errors if key missing during build
let client;
function getClient() {
  if (!client) {
    const apiKey = process.env.TELNYX_API_KEY;
    if (!apiKey) throw new Error('TELNYX_API_KEY missing');
    client = telnyx(apiKey);
  }
  return client;
}

function toE164(number) {
  if (!number) return number;
  const digits = String(number).replace(/\D/g, '');
  if (!digits) return number;
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

export async function sendFax({
  base64Pdf,
  to,
  from,
  connectionId = process.env.TELNYX_CONNECTION_ID || process.env.TELNYX_APP_ID,
  webhookUrl = process.env.TELNYX_WEBHOOK_URL,
  webhookFailoverUrl = process.env.TELNYX_FAILOVER_URL,
  mediaName = 'document.pdf',
  quality = 'high',
}) {
  const faxParams = {
    connection_id: connectionId,
    contents: base64Pdf,
    media_name: mediaName,
    to: toE164(to),
    from: toE164(from || process.env.TELNYX_FAX_FROM || process.env.TELNYX_TEST_FAX_NUMBER),
    quality,
    webhook_url: webhookUrl,
    webhook_failover_url: webhookFailoverUrl,
  };
  const tx = await getClient().faxes.create(faxParams);
  return tx; // includes id
}

// Basic signature verification placeholder (Telnyx provides Ed25519 header & timestamp)
export function verifyWebhook(req) {
  try {
    const publicKey = process.env.TELNYX_PUBLIC_KEY;
    if (!publicKey) return true; // skip if not set
    const signature = req.header('Telnyx-Signature-Ed25519');
    const timestamp = req.header('Telnyx-Timestamp');
    if (!signature || !timestamp) return false;
    const message = `${timestamp}|${req.body.toString('utf8')}`;
    // Verify Ed25519 signature
    const key = crypto.createPublicKey({ key: Buffer.from(publicKey, 'base64'), format: 'der', type: 'spki' });
    const ok = crypto.verify(null, Buffer.from(message), key, Buffer.from(signature, 'base64'));
    return !!ok;
  } catch {
    return false;
  }
}


