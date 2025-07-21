import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all requests (optionally include archived)
router.get('/', async (req, res) => {
    try {
        const { include_archived } = req.query;
        let query = 'SELECT * FROM requests';
        if (include_archived !== 'true') {
            query += ' WHERE deleted = false';
        }
        query += ' ORDER BY created_on DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET single request by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM requests WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// CREATE new request
router.post('/', async (req, res) => {
    try {
        const {
            pharmacy_id,
            patient_id,
            physician_id,
            item_id,
            notes,
            status = 'pending',
            requested_date,
            completed_date,
            change_log,
            visibility = 'public',
        } = req.body;
        // Validate required fields
        if (!pharmacy_id || !patient_id || !physician_id || !item_id) {
            return res.status(400).json({ error: 'pharmacy_id, patient_id, physician_id, and item_id are required' });
        }
        const result = await pool.query(
            `INSERT INTO requests (
                pharmacy_id, patient_id, physician_id, item_id, notes, status, requested_date, completed_date, change_log, visibility,
                created_on, created_by, updated_on, updated_by, version, deleted
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                now(), $11, now(), $11, 1, false
            ) RETURNING *`,
            [
                pharmacy_id, patient_id, physician_id, item_id, notes, status, requested_date, completed_date, change_log, visibility,
                req.user?.id || 1
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// EDIT request (update fields)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        // Don't allow updating certain fields
        delete updates.id;
        delete updates.created_on;
        delete updates.created_by;
        delete updates.deleted;
        delete updates.deleted_on;
        delete updates.deleted_by;
        // Add audit fields
        updates.updated_on = new Date();
        updates.updated_by = req.user?.id || 1;
        updates.version = updates.version ? updates.version + 1 : 1;
        // Build the update query dynamically
        const keys = Object.keys(updates);
        if (keys.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        if (updates.item_id === undefined) {
            return res.status(400).json({ error: 'item_id is required' });
        }
        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = [id, ...keys.map(key => updates[key])];
        const updateQuery = `
            UPDATE requests 
            SET ${setClause}
            WHERE id = $1 AND deleted = false
            RETURNING *;
        `;
        const result = await pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// SOFT DELETE (Archive) request
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE requests 
             SET deleted = true,
                 deleted_on = now(),
                 deleted_by = $1,
                 updated_on = now(),
                 updated_by = $1
             WHERE id = $2 AND deleted = false
             RETURNING *;`,
            [req.user?.id || 1, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.json({ message: 'Request archived successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// RESTORE archived request
router.post('/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE requests 
             SET deleted = false,
                 deleted_on = null,
                 deleted_by = null,
                 updated_on = now(),
                 updated_by = $1
             WHERE id = $2 AND deleted = true
             RETURNING *;`,
            [req.user?.id || 1, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Request not found or already active' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;