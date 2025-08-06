import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all requests (optionally include archived, filter by pharmacy_id, and paginate)
router.get('/', async (req, res) => {
    try {
        const {
            pharmacy_id,
            include_archived,
            limit = 10,
            offset = 0
        } = req.query;

        let query = `
            SELECT 
                r.*, 
                -- Patient fields
                p.first_name AS patient_first_name, p.middle_initial AS patient_middle_initial, p.last_name AS patient_last_name,
                p.phone AS patient_phone, p.email AS patient_email, p.address AS patient_address, p.address2 AS patient_address2,
                p.city AS patient_city, p.state AS patient_state, p.zipcode AS patient_zipcode, p.dob AS patient_dob, p.gender AS patient_gender,
                p.insurance1 AS patient_insurance1, p.insurance1_id AS patient_insurance1_id, p.insurance2 AS patient_insurance2, p.insurance2_id AS patient_insurance2_id,
                p.notes AS patient_notes,
                -- Physician fields
                ph.first_name AS doctor_first_name, ph.middle_initial AS doctor_middle_initial, ph.last_name AS doctor_last_name,
                ph.phone AS doctor_phone, ph.fax AS doctor_fax, ph.email AS doctor_email, ph.address AS doctor_address, ph.address2 AS doctor_address2,
                ph.city AS doctor_city, ph.state AS doctor_state, ph.zipcode AS doctor_zipcode, ph.npi_number AS doctor_npi_number, ph.dea_number AS doctor_dea_number,
                ph.specialty AS doctor_specialty, ph.practice_name AS doctor_practice_name, ph.notes AS doctor_notes,
                -- Pharmacy and item fields
                pa.pharmacy_name AS pharmacy_name,
                i.generic_name AS item_generic_name, i.brand_name AS item_brand_name
            FROM requests r
            LEFT JOIN patients p ON r.patient_id = p.id
            LEFT JOIN physicians ph ON r.physician_id = ph.id
            LEFT JOIN pharmacies pa ON r.pharmacy_id = pa.id
            LEFT JOIN items i ON r.item_id = i.id
            WHERE 1=1
        `;
        const params = [];
        let paramCount = 1;
        if (include_archived !== 'true') {
            query += ` AND r.deleted = false`;
        }
        if (pharmacy_id) {
            query += ` AND r.pharmacy_id = $${paramCount++}`;
            params.push(pharmacy_id);
        }
        query += ` ORDER BY r.created_on DESC LIMIT $${paramCount++} OFFSET $${paramCount++}`;
        params.push(parseInt(limit));
        params.push(parseInt(offset));
        // Get paginated results
        const { rows } = await pool.query(query, params);
        // Get total count for pagination
        let countQuery = `SELECT COUNT(*) FROM requests r WHERE 1=1`;
        const countParams = [];
        let countParamCount = 1;
        if (include_archived !== 'true') {
            countQuery += ` AND r.deleted = false`;
        }
        if (pharmacy_id) {
            countQuery += ` AND r.pharmacy_id = $${countParamCount++}`;
            countParams.push(pharmacy_id);
        }
        const { rows: countRows } = await pool.query(countQuery, countParams);
        const totalCount = parseInt(countRows[0].count);
        res.json({
            success: true,
            data: rows,
            pagination: {
                total: totalCount,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: (parseInt(offset) + parseInt(limit)) < totalCount
            }
        });
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
            llm_conversation,
        } = req.body;
        // Validate required fields - only pharmacy_id is required initially
        if (!pharmacy_id) {
            return res.status(400).json({ error: 'pharmacy_id is required' });
        }
        const result = await pool.query(
            `INSERT INTO requests (
                pharmacy_id, patient_id, physician_id, item_id, notes, status, requested_date, completed_date, change_log, visibility, llm_conversation,
                created_on, created_by, updated_on, updated_by, version, deleted
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
                now(), $12, now(), $12, 1, false
            ) RETURNING *`,
            [
                pharmacy_id, patient_id, physician_id, item_id, notes, status, requested_date, completed_date, change_log, visibility, llm_conversation,
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
        // Remove the item_id requirement for updates
        // if (updates.item_id === undefined) {
        //     return res.status(400).json({ error: 'item_id is required' });
        // }
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