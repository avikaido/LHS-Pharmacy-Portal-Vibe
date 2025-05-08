import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all patients
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patients");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET single patient by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM patients WHERE id = $1 AND deleted = false",
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// CREATE new patient
router.post('/', async (req, res) => {
    try {
        const {
            first_name,
            middle_initial,
            last_name,
            phone,
            email,
            address,
            address2,
            city,
            state,
            zipcode,
            notes,
            dob,
            gender,
            insurance1,
            insurance1_id,
            insurance2,
            insurance2_id,
        } = req.body;

        // For now, set these fields to default values
        const created_by = '1';
        const updated_by = '1';
        const deleted = false;
        const visibility = 'public';
        const version = 1;
        const change_log = 'Initial entry';
        const status = 'active';

        const insertQuery = `
            INSERT INTO patients (
                uuid,
                slug,
                created_on,
                created_by,
                updated_on,
                updated_by,
                deleted,
                deleted_on,
                deleted_by,
                visibility,
                version,
                previous_id,
                change_log,
                status,
                first_name,
                middle_initial,
                last_name,
                phone,
                email,
                address,
                address2,
                city,
                state,
                zipcode,
                notes,
                dob,
                gender,
                insurance1,
                insurance1_id,
                insurance2,
                insurance2_id
            )
            VALUES (
                gen_random_uuid(),
                CONCAT('patient-', EXTRACT(EPOCH FROM now())),
                now(),
                $1,
                now(),
                $2,
                $3,
                null,
                null,
                $4,
                $5,
                null,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12,
                $13,
                $14,
                $15,
                $16,
                $17,
                $18,
                $19,
                $20,
                $21,
                $22,
                $23,
                $24
            )
            RETURNING *;
        `;

        const values = [
            created_by,
            updated_by,
            deleted,
            visibility,
            version,
            change_log,
            status,
            first_name,
            middle_initial,
            last_name,
            phone,
            email,
            address,
            address2,
            city,
            state,
            zipcode,
            notes,
            dob,
            gender,
            insurance1,
            insurance1_id,
            insurance2,
            insurance2_id
        ];

        const result = await pool.query(insertQuery, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') { // Unique violation
            res.status(400).json({ error: "Email already exists" });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
});

// UPDATE patient
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // Don't allow updating certain fields
        delete updates.id;
        delete updates.uuid;
        delete updates.slug;
        delete updates.created_on;
        delete updates.created_by;
        delete updates.deleted;
        delete updates.deleted_on;
        delete updates.deleted_by;

        // Add audit fields
        updates.updated_on = new Date();
        updates.updated_by = '1'; // TODO: Get from auth
        updates.version = updates.version ? updates.version + 1 : 1;
        
        // Build the update query dynamically
        const keys = Object.keys(updates);
        if (keys.length === 0) {
            return res.status(400).json({ error: "No valid fields to update" });
        }

        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = [id, ...keys.map(key => updates[key])];
        
        const updateQuery = `
            UPDATE patients 
            SET ${setClause}
            WHERE id = $1 AND deleted = false
            RETURNING *;
        `;
        
        const result = await pool.query(updateQuery, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') { // Unique violation
            res.status(400).json({ error: "Email already exists" });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
});

// SOFT DELETE (Archive) patient
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE patients 
             SET deleted = true,
                 deleted_on = now(),
                 deleted_by = $1,
                 updated_on = now(),
                 updated_by = $1
             WHERE id = $2 AND deleted = false
             RETURNING *;`,
            ['1', id] // TODO: Get user from auth
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }
        
        res.json({ message: "Patient archived successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// RESTORE archived patient
router.post('/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE patients 
             SET deleted = false,
                 deleted_on = null,
                 deleted_by = null,
                 updated_on = now(),
                 updated_by = $1
             WHERE id = $2 AND deleted = true
             RETURNING *;`,
            ['1', id] // TODO: Get user from auth
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Patient not found or already active" });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET archived patients
router.get('/archived', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM patients WHERE deleted = true ORDER BY deleted_on DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;