import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all pharmacies
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM pharmacies");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;