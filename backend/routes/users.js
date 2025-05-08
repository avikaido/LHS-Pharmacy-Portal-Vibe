import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  // Expecting these fields in the request body:
  // uuid (from Supertokens), first_name, last_name, email, phone, role
  const { uuid, first_name, last_name, email, phone, role } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (uuid, first_name, last_name, email, phone, role, created_on, updated_on)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [uuid, first_name, last_name, email, phone, role]
    );
    
    res.status(201).json({ status: "OK", user: result.rows[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ status: "ERROR", message: "Unable to create user" });
  }
});

export default router;