import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all users (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      role, 
      status, 
      deleted = false, 
      limit = 50, 
      offset = 0,
      sort_by = 'last_name',
      sort_order = 'ASC'
    } = req.query;

    let query = `
      SELECT 
        id,
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
        email,
        phone,
        role,
        permissions,
        department,
        title,
        address,
        address2,
        city,
        state,
        zipcode,
        country,
        notes,
        frequently_contacted,
        starred
      FROM users 
      WHERE deleted = $1
    `;
    
    const queryParams = [deleted];
    let paramCount = 1;

    // Add search filter
    if (search) {
      paramCount++;
      query += ` AND (
        first_name ILIKE $${paramCount} OR 
        last_name ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR
        department ILIKE $${paramCount} OR
        role ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
    }

    // Add role filter
    if (role) {
      paramCount++;
      query += ` AND role = $${paramCount}`;
      queryParams.push(role);
    }

    // Add status filter
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      queryParams.push(status);
    }

    // Add sorting
    const allowedSortFields = [
      'first_name', 'last_name', 'email', 'role', 'department', 
      'created_on', 'updated_on', 'frequently_contacted', 'starred'
    ];
    const sortField = allowedSortFields.includes(sort_by) ? sort_by : 'last_name';
    const sortDirection = sort_order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    
    query += ` ORDER BY ${sortField} ${sortDirection}`;

    // Add pagination
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    queryParams.push(parseInt(limit));

    paramCount++;
    query += ` OFFSET $${paramCount}`;
    queryParams.push(parseInt(offset));

    const { rows } = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM users WHERE deleted = $1`;
    const countParams = [deleted];
    let countParamCount = 1;

    if (search) {
      countParamCount++;
      countQuery += ` AND (
        first_name ILIKE $${countParamCount} OR 
        last_name ILIKE $${countParamCount} OR 
        email ILIKE $${countParamCount} OR
        department ILIKE $${countParamCount} OR
        role ILIKE $${countParamCount}
      )`;
      countParams.push(`%${search}%`);
    }

    if (role) {
      countParamCount++;
      countQuery += ` AND role = $${countParamCount}`;
      countParams.push(role);
    }

    if (status) {
      countParamCount++;
      countQuery += ` AND status = $${countParamCount}`;
      countParams.push(status);
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
        hasMore: totalCount > parseInt(offset) + parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch users',
      details: error.message 
    });
  }
});

// GET archived users
router.get('/archived', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE deleted = true ORDER BY deleted_on DESC"
    );
    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        id,
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
        email,
        phone,
        role,
        permissions,
        department,
        title,
        address,
        address2,
        city,
        state,
        zipcode,
        country,
        notes,
        frequently_contacted,
        starred
      FROM users 
      WHERE id = $1
    `;
    
    const { rows } = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: rows[0] 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user',
      details: error.message 
    });
  }
});

// POST create new user
router.post('/', async (req, res) => {
  try {
    const {
      first_name,
      middle_initial,
      last_name,
      email,
      phone,
      role,
      permissions,
      department,
      title,
      address,
      address2,
      city,
      state,
      zipcode,
      country,
      notes,
      frequently_contacted,
      starred,
      status
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !role) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, email, and role are required'
      });
    }

    const query = `
      INSERT INTO users (
        first_name, middle_initial, last_name, email, phone, role, permissions, department, title,
        address, address2, city, state, zipcode, country, notes, frequently_contacted, starred, status,
        created_by, updated_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *
    `;

    const values = [
      first_name, middle_initial, last_name, email, phone, role, permissions, department, title,
      address, address2, city, state, zipcode, country, notes, frequently_contacted, starred, status,
      req.user?.id || 1, // Default to user ID 1 if not authenticated
      req.user?.id || 1
    ];

    const { rows } = await pool.query(query, values);
    
    res.status(201).json({ 
      success: true, 
      data: rows[0],
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create user',
        details: error.message 
      });
    }
  }
});

// PUT update user
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
    updates.updated_by = req.user?.id || 1; // TODO: Get from auth
    
    // Build the update query dynamically
    const keys = Object.keys(updates);
    if (keys.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "No valid fields to update" 
      });
    }

    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [id, ...keys.map(key => updates[key])];
    
    const updateQuery = `
      UPDATE users 
      SET ${setClause}
      WHERE id = $1 AND deleted = false
      RETURNING *;
    `;
    
    const result = await pool.query(updateQuery, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ 
        success: false, 
        error: "Email already exists" 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: "Server error",
        details: error.message 
      });
    }
  }
});

// DELETE user (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE users 
       SET deleted = true,
           deleted_on = now(),
           deleted_by = $1,
           updated_on = now(),
           updated_by = $1
       WHERE id = $2 AND deleted = false
       RETURNING *;`,
      [req.user?.id || 1, id] // TODO: Get user from auth
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found or already deleted" 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'User archived successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
});

// RESTORE archived user
router.post('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE users 
       SET deleted = false,
           deleted_on = null,
           deleted_by = null,
           updated_on = now(),
           updated_by = $1
       WHERE id = $2 AND deleted = true
       RETURNING *;`,
      [req.user?.id || 1, id] // TODO: Get user from auth
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found or already active" 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'User restored successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      error: "Server error" 
    });
  }
});

// POST /api/users/register (legacy endpoint for backward compatibility)
router.post('/register', async (req, res) => {
  const { uuid, first_name, last_name, email, phone, role } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (uuid, first_name, last_name, email, phone, role, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, 1, 1)
       RETURNING *`,
      [uuid, first_name, last_name, email, phone, role]
    );
    
    res.status(201).json({ 
      success: true, 
      status: "OK", 
      user: result.rows[0] 
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ 
      success: false, 
      status: "ERROR", 
      message: "Unable to create user" 
    });
  }
});

export default router;