import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all pharmacies (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      type, 
      status, 
      deleted = false, 
      limit = 50, 
      offset = 0,
      sort_by = 'pharmacy_name',
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
        pharmacy_name,
        pharmacy_type,
        phone,
        fax,
        email,
        website,
        address,
        business_hours,
        license_number,
        license_expiration,
        npi_number,
        insurance_accepted,
        services_offered,
        chain_name,
        contact_person as manager_name,
        notes
      FROM pharmacies 
      WHERE deleted = $1
    `;
    
    const queryParams = [deleted];
    let paramCount = 1;

    // Add search filter
    if (search) {
      paramCount++;
      query += ` AND (
        pharmacy_name ILIKE $${paramCount} OR 
        chain_name ILIKE $${paramCount} OR 
        contact_person ILIKE $${paramCount} OR
        license_number ILIKE $${paramCount} OR
        npi_number ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
    }

    // Add type filter
    if (type) {
      paramCount++;
      query += ` AND pharmacy_type = $${paramCount}`;
      queryParams.push(type);
    }

    // Add status filter
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      queryParams.push(status);
    }

    // Add sorting
    const allowedSortFields = [
      'pharmacy_name', 'pharmacy_type', 'created_on', 'updated_on', 
      'license_expiration', 'contact_person'
    ];
    const sortField = allowedSortFields.includes(sort_by) ? sort_by : 'pharmacy_name';
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
    let countQuery = `SELECT COUNT(*) FROM pharmacies WHERE deleted = $1`;
    const countParams = [deleted];
    let countParamCount = 1;

    if (search) {
      countParamCount++;
      countQuery += ` AND (
        pharmacy_name ILIKE $${countParamCount} OR 
        chain_name ILIKE $${countParamCount} OR 
        contact_person ILIKE $${countParamCount} OR
        license_number ILIKE $${countParamCount} OR
        npi_number ILIKE $${countParamCount}
      )`;
      countParams.push(`%${search}%`);
    }

    if (type) {
      countParamCount++;
      countQuery += ` AND pharmacy_type = $${countParamCount}`;
      countParams.push(type);
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
        hasMore: (parseInt(offset) + parseInt(limit)) < totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pharmacies',
      details: error.message 
    });
  }
});

// GET single pharmacy by UUID
router.get('/uuid/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    
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
        pharmacy_name,
        pharmacy_type,
        phone,
        fax,
        email,
        website,
        address,
        business_hours,
        license_number,
        license_expiration,
        npi_number,
        insurance_accepted,
        services_offered,
        chain_name,
        contact_person as manager_name,
        notes
      FROM pharmacies 
      WHERE uuid = $1 AND deleted = false
    `;
    
    const { rows } = await pool.query(query, [uuid]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Pharmacy not found' 
      });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching pharmacy by UUID:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pharmacy',
      details: error.message 
    });
  }
});

// GET single pharmacy by ID
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
        pharmacy_name,
        pharmacy_type,
        phone,
        fax,
        email,
        website,
        address,
        business_hours,
        license_number,
        license_expiration,
        npi_number,
        insurance_accepted,
        services_offered,
        chain_name,
        contact_person as manager_name,
        notes
      FROM pharmacies 
      WHERE id = $1 AND deleted = false
    `;
    
    const { rows } = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Pharmacy not found' 
      });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching pharmacy:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pharmacy',
      details: error.message 
    });
  }
});

// POST create new pharmacy
router.post('/', async (req, res) => {
  try {
    const {
      pharmacy_name,
      pharmacy_type,
      phone,
      fax,
      email,
      website,
      address,
      business_hours,
      license_number,
      license_expiration,
      npi_number,
      insurance_accepted,
      services_offered,
      chain_name,
      manager_name,
      notes
    } = req.body;

    // Validate required fields
    if (!pharmacy_name || !pharmacy_type) {
      return res.status(400).json({
        success: false,
        error: 'Pharmacy name and type are required'
      });
    }

    const query = `
      INSERT INTO pharmacies (
        pharmacy_name,
        pharmacy_type,
        phone,
        fax,
        email,
        website,
        address,
        business_hours,
        license_number,
        license_expiration,
        npi_number,
        insurance_accepted,
        services_offered,
        chain_name,
        contact_person,
        notes,
        created_by,
        updated_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `;

    const values = [
      pharmacy_name,
      pharmacy_type,
      phone,
      fax,
      email,
      website,
      address,
      business_hours,
      license_number,
      license_expiration,
      npi_number,
      insurance_accepted,
      services_offered,
      chain_name,
      manager_name,
      notes,
      req.user?.id || 1, // Default to user ID 1 if not authenticated
      req.user?.id || 1
    ];

    const { rows } = await pool.query(query, values);
    
    res.status(201).json({ 
      success: true, 
      data: rows[0],
      message: 'Pharmacy created successfully'
    });
  } catch (error) {
    console.error('Error creating pharmacy:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create pharmacy',
      details: error.message 
    });
  }
});

// PUT update pharmacy
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pharmacy_name,
      pharmacy_type,
      phone,
      fax,
      email,
      website,
      address,
      business_hours,
      license_number,
      license_expiration,
      npi_number,
      insurance_accepted,
      services_offered,
      chain_name,
      manager_name,
      notes,
      status
    } = req.body;

    // Check if pharmacy exists
    const checkQuery = 'SELECT id FROM pharmacies WHERE id = $1 AND deleted = false';
    const { rows: checkRows } = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Pharmacy not found' 
      });
    }

    const query = `
      UPDATE pharmacies SET
        pharmacy_name = COALESCE($1, pharmacy_name),
        pharmacy_type = COALESCE($2, pharmacy_type),
        phone = $3,
        fax = $4,
        email = $5,
        website = $6,
        address = $7,
        business_hours = $8,
        license_number = $9,
        license_expiration = $10,
        npi_number = $11,
        insurance_accepted = $12,
        services_offered = $13,
        chain_name = $14,
        contact_person = $15,
        notes = $16,
        status = COALESCE($17, status),
        updated_on = CURRENT_TIMESTAMP,
        updated_by = $18,
        version = version + 1
      WHERE id = $19 AND deleted = false
      RETURNING *
    `;

    const values = [
      pharmacy_name,
      pharmacy_type,
      phone,
      fax,
      email,
      website,
      address,
      business_hours,
      license_number,
      license_expiration,
      npi_number,
      insurance_accepted,
      services_offered,
      chain_name,
      manager_name,
      notes,
      status,
      req.user?.id || 1,
      id
    ];

    const { rows } = await pool.query(query, values);
    
    res.json({ 
      success: true, 
      data: rows[0],
      message: 'Pharmacy updated successfully'
    });
  } catch (error) {
    console.error('Error updating pharmacy:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update pharmacy',
      details: error.message 
    });
  }
});

// DELETE pharmacy (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE pharmacies SET
        deleted = true,
        deleted_on = CURRENT_TIMESTAMP,
        deleted_by = $1,
        updated_on = CURRENT_TIMESTAMP,
        updated_by = $1
      WHERE id = $2 AND deleted = false
      RETURNING id
    `;
    
    const { rows } = await pool.query(query, [req.user?.id || 1, id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Pharmacy not found or already deleted' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Pharmacy deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting pharmacy:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete pharmacy',
      details: error.message 
    });
  }
});

// PATCH restore pharmacy (soft restore)
router.patch('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE pharmacies SET
        deleted = false,
        deleted_on = NULL,
        deleted_by = NULL,
        updated_on = CURRENT_TIMESTAMP,
        updated_by = $1
      WHERE id = $2 AND deleted = true
      RETURNING *
    `;
    
    const { rows } = await pool.query(query, [req.user?.id || 1, id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Pharmacy not found or not deleted' 
      });
    }
    
    res.json({ 
      success: true, 
      data: rows[0],
      message: 'Pharmacy restored successfully' 
    });
  } catch (error) {
    console.error('Error restoring pharmacy:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to restore pharmacy',
      details: error.message 
    });
  }
});

// GET pharmacy types (for dropdowns)
router.get('/types/list', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT pharmacy_type 
      FROM pharmacies 
      WHERE deleted = false 
      ORDER BY pharmacy_type
    `;
    
    const { rows } = await pool.query(query);
    
    res.json({ 
      success: true, 
      data: rows.map(row => row.pharmacy_type)
    });
  } catch (error) {
    console.error('Error fetching pharmacy types:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pharmacy types',
      details: error.message 
    });
  }
});

export default router;