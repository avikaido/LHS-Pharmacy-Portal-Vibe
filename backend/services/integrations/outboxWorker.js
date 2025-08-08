import pool from '../../db.js';
import { dispatchIntegration } from './integrationRouter.js';

const INTERVAL = parseInt(process.env.OUTBOX_POLL_INTERVAL_MS || '5000', 10);
const MAX_ATTEMPTS = parseInt(process.env.OUTBOX_MAX_ATTEMPTS || '8', 10);
const BACKOFF = (process.env.OUTBOX_BACKOFF_SCHEDULE_MS || '60000,300000,1800000,7200000,43200000')
  .split(',')
  .map((s) => parseInt(s, 10))
  .filter((n) => !Number.isNaN(n));

function nextRun(attempts) {
  const idx = Math.min(attempts, BACKOFF.length - 1);
  return new Date(Date.now() + BACKOFF[idx]);
}

export function startOutboxWorker() {
  async function tick() {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM integration_outbox
         WHERE status = 'pending' AND next_attempt_at <= now()
         ORDER BY created_on ASC
         LIMIT 10`
      );
      for (const row of rows) {
        try {
          await dispatchIntegration(row.payload);
          await pool.query('UPDATE integration_outbox SET status = $1 WHERE id = $2', ['sent', row.id]);
        } catch (err) {
          const attempts = row.attempts + 1;
          const status = attempts >= MAX_ATTEMPTS ? 'failed' : 'pending';
          const nextAt = status === 'pending' ? nextRun(attempts) : new Date();
          // eslint-disable-next-line no-await-in-loop
          await pool.query(
            `UPDATE integration_outbox 
             SET attempts = $1, status = $2, next_attempt_at = $3, last_error = $4
             WHERE id = $5`,
            [attempts, status, nextAt, String(err?.message || err), row.id]
          );
        }
      }
    } catch (e) {
      // swallow to keep worker alive
    }
  }

  setInterval(tick, INTERVAL);
}

