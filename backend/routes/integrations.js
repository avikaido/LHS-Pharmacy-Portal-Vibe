import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Admin: requeue a failed outbox entry by id
router.post('/outbox/:id/requeue', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('UPDATE integration_outbox SET status = $1, next_attempt_at = now() WHERE id = $2 RETURNING *', ['pending', id]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: 'Outbox entry not found' });
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Admin: list outbox entries (optional filters)
router.get('/outbox', async (req, res) => {
  try {
    const { status = 'pending', limit = 50, offset = 0 } = req.query;
    const { rows } = await pool.query(
      `SELECT id, event_type, status, attempts, next_attempt_at, created_on, last_error
       FROM integration_outbox
       WHERE ($1::text IS NULL OR status = $1)
       ORDER BY created_on DESC
       LIMIT $2 OFFSET $3`,
      [status, Number(limit), Number(offset)]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;

