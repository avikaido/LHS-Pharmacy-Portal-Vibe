import express from 'express';
import pool from '../db.js';
import { eventBus } from '../services/events/eventBus.js';
import { DomainEvent } from '../services/events/eventBus.js';
import { buildPhysicianPayload } from '../services/events/payloadBuilders.js';

const router = express.Router();

// GET all physicians (with optional filtering)
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      specialty, 
      state, 
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
        suffix,
        title,
        specialty,
        sub_specialty,
        practice_type,
        phone,
        fax,
        email,
        website,
        address,
        address2,
        city,
        state,
        zipcode,
        country,
        npi_number,
        dea_number,
        license_number,
        license_expiration,
        board_certifications,
        languages_spoken,
        years_of_experience,
        practice_name,
        practice_address,
        practice_city,
        practice_state,
        practice_zipcode,
        practice_phone,
        practice_fax,
        practice_website,
        insurance_accepted,
        accepting_new_patients,
        appointment_required,
        notes,
        frequently_contacted,
        starred,
        affiliated_hospitals,
        affiliated_pharmacies
      FROM physicians 
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
        specialty ILIKE $${paramCount} OR
        practice_name ILIKE $${paramCount} OR
        npi_number ILIKE $${paramCount} OR
        license_number ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
    }

    // Add specialty filter
    if (specialty) {
      paramCount++;
      query += ` AND specialty = $${paramCount}`;
      queryParams.push(specialty);
    }

    // Add state filter
    if (state) {
      paramCount++;
      query += ` AND state = $${paramCount}`;
      queryParams.push(state);
    }

    // Add status filter
    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      queryParams.push(status);
    }

    // Add sorting
    const allowedSortFields = [
      'first_name', 'last_name', 'specialty', 'city', 'state', 
      'created_on', 'updated_on', 'license_expiration', 'years_of_experience'
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
    let countQuery = `SELECT COUNT(*) FROM physicians WHERE deleted = $1`;
    const countParams = [deleted];
    let countParamCount = 1;

    if (search) {
      countParamCount++;
      countQuery += ` AND (
        first_name ILIKE $${countParamCount} OR 
        last_name ILIKE $${countParamCount} OR 
        specialty ILIKE $${countParamCount} OR
        practice_name ILIKE $${countParamCount} OR
        npi_number ILIKE $${countParamCount} OR
        license_number ILIKE $${countParamCount}
      )`;
      countParams.push(`%${search}%`);
    }

    if (specialty) {
      countParamCount++;
      countQuery += ` AND specialty = $${countParamCount}`;
      countParams.push(specialty);
    }

    if (state) {
      countParamCount++;
      countQuery += ` AND state = $${countParamCount}`;
      countParams.push(state);
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
    console.error('Error fetching physicians:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch physicians',
      details: error.message 
    });
  }
});

// GET single physician by ID
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
        suffix,
        title,
        specialty,
        sub_specialty,
        practice_type,
        phone,
        fax,
        email,
        website,
        address,
        address2,
        city,
        state,
        zipcode,
        country,
        npi_number,
        dea_number,
        license_number,
        license_expiration,
        board_certifications,
        languages_spoken,
        years_of_experience,
        practice_name,
        practice_address,
        practice_city,
        practice_state,
        practice_zipcode,
        practice_phone,
        practice_fax,
        practice_website,
        insurance_accepted,
        accepting_new_patients,
        appointment_required,
        notes,
        frequently_contacted,
        starred,
        affiliated_hospitals,
        affiliated_pharmacies
      FROM physicians 
      WHERE id = $1
    `;
    
    const { rows } = await pool.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Physician not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: rows[0] 
    });
  } catch (error) {
    console.error('Error fetching physician:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch physician',
      details: error.message 
    });
  }
});

// POST create new physician
router.post('/', async (req, res) => {
  try {
    const {
      first_name,
      middle_initial,
      last_name,
      suffix,
      title,
      specialty,
      sub_specialty,
      practice_type,
      phone,
      fax,
      email,
      website,
      address,
      address2,
      city,
      state,
      zipcode,
      country,
      npi_number,
      dea_number,
      license_number,
      license_expiration,
      board_certifications,
      languages_spoken,
      years_of_experience,
      practice_name,
      practice_address,
      practice_city,
      practice_state,
      practice_zipcode,
      practice_phone,
      practice_fax,
      practice_website,
      insurance_accepted,
      accepting_new_patients,
      appointment_required,
      notes,
      frequently_contacted,
      starred,
      affiliated_hospitals,
      affiliated_pharmacies,
      status
    } = req.body;

    const query = `
      INSERT INTO physicians (
        first_name, middle_initial, last_name, suffix, title, specialty, sub_specialty, practice_type,
        phone, fax, email, website,
        address, address2, city, state, zipcode, country,
        npi_number, dea_number, license_number, license_expiration, board_certifications, languages_spoken, years_of_experience,
        practice_name, practice_address, practice_city, practice_state, practice_zipcode, practice_phone, practice_fax, practice_website,
        insurance_accepted, accepting_new_patients, appointment_required,
        notes, frequently_contacted, starred,
        affiliated_hospitals, affiliated_pharmacies, status,
        created_by, updated_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44
      ) RETURNING *
    `;

    const values = [
      first_name, middle_initial, last_name, suffix, title, specialty, sub_specialty, practice_type,
      phone, fax, email, website,
      address, address2, city, state, zipcode, country,
      npi_number, dea_number, license_number, license_expiration, board_certifications, languages_spoken, years_of_experience,
      practice_name, practice_address, practice_city, practice_state, practice_zipcode, practice_phone, practice_fax, practice_website,
      insurance_accepted, accepting_new_patients, appointment_required,
      notes, frequently_contacted, starred,
      affiliated_hospitals, affiliated_pharmacies, status,
      req.user?.id || 1, // Default to user ID 1 if not authenticated
      req.user?.id || 1
    ];

    const { rows } = await pool.query(query, values);
    const created = rows[0];
    
    // Emit PhysicianCreated event to integration system
    const event = new DomainEvent({
      eventType: 'PhysicianCreated',
      aggregate: { physicianId: created.id },
      payload: buildPhysicianPayload(created),
    });
    eventBus.publish(event);
    
    res.status(201).json({ 
      success: true, 
      data: created,
      message: 'Physician created successfully'
    });
  } catch (error) {
    console.error('Error creating physician:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create physician',
      details: error.message 
    });
  }
});

// PUT update physician
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      middle_initial,
      last_name,
      suffix,
      title,
      specialty,
      sub_specialty,
      practice_type,
      phone,
      fax,
      email,
      website,
      address,
      address2,
      city,
      state,
      zipcode,
      country,
      npi_number,
      dea_number,
      license_number,
      license_expiration,
      board_certifications,
      languages_spoken,
      years_of_experience,
      practice_name,
      practice_address,
      practice_city,
      practice_state,
      practice_zipcode,
      practice_phone,
      practice_fax,
      practice_website,
      insurance_accepted,
      accepting_new_patients,
      appointment_required,
      notes,
      frequently_contacted,
      starred,
      affiliated_hospitals,
      affiliated_pharmacies,
      status
    } = req.body;

    // Check if physician exists
    const checkQuery = 'SELECT id FROM physicians WHERE id = $1 AND deleted = false';
    const { rows: checkRows } = await pool.query(checkQuery, [id]);
    
    if (checkRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Physician not found' 
      });
    }

    const query = `
      UPDATE physicians SET
        first_name = COALESCE($1, first_name),
        middle_initial = $2,
        last_name = COALESCE($3, last_name),
        suffix = $4,
        title = $5,
        specialty = $6,
        sub_specialty = $7,
        practice_type = $8,
        phone = $9,
        fax = $10,
        email = $11,
        website = $12,
        address = $13,
        address2 = $14,
        city = $15,
        state = $16,
        zipcode = $17,
        country = $18,
        npi_number = $19,
        dea_number = $20,
        license_number = $21,
        license_expiration = $22,
        board_certifications = $23,
        languages_spoken = $24,
        years_of_experience = $25,
        practice_name = $26,
        practice_address = $27,
        practice_city = $28,
        practice_state = $29,
        practice_zipcode = $30,
        practice_phone = $31,
        practice_fax = $32,
        practice_website = $33,
        insurance_accepted = $34,
        accepting_new_patients = $35,
        appointment_required = $36,
        notes = $37,
        frequently_contacted = $38,
        starred = $39,
        affiliated_hospitals = $40,
        affiliated_pharmacies = $41,
        status = COALESCE($42, status),
        updated_on = CURRENT_TIMESTAMP,
        updated_by = $43
      WHERE id = $44 AND deleted = false
      RETURNING *
    `;

    const values = [
      first_name, middle_initial, last_name, suffix, title, specialty, sub_specialty, practice_type,
      phone, fax, email, website,
      address, address2, city, state, zipcode, country,
      npi_number, dea_number, license_number, license_expiration, board_certifications, languages_spoken, years_of_experience,
      practice_name, practice_address, practice_city, practice_state, practice_zipcode, practice_phone, practice_fax, practice_website,
      insurance_accepted, accepting_new_patients, appointment_required,
      notes, frequently_contacted, starred,
      affiliated_hospitals, affiliated_pharmacies, status,
      req.user?.id || 1,
      id
    ];

    const { rows } = await pool.query(query, values);
    
    res.json({ 
      success: true, 
      data: rows[0],
      message: 'Physician updated successfully'
    });
  } catch (error) {
    console.error('Error updating physician:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update physician',
      details: error.message 
    });
  }
});

// DELETE physician (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE physicians SET
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
        error: 'Physician not found or already deleted' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Physician deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting physician:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete physician',
      details: error.message 
    });
  }
});

// PATCH restore physician (soft restore)
router.patch('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      UPDATE physicians SET
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
        error: 'Physician not found or not deleted' 
      });
    }
    
    res.json({ 
      success: true, 
      data: rows[0],
      message: 'Physician restored successfully' 
    });
  } catch (error) {
    console.error('Error restoring physician:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to restore physician',
      details: error.message 
    });
  }
});

// GET physician specialties (for dropdowns)
router.get('/specialties/list', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT specialty 
      FROM physicians 
      WHERE deleted = false AND specialty IS NOT NULL
      ORDER BY specialty
    `;
    
    const { rows } = await pool.query(query);
    
    res.json({ 
      success: true, 
      data: rows.map(row => row.specialty)
    });
  } catch (error) {
    console.error('Error fetching physician specialties:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch physician specialties',
      details: error.message 
    });
  }
});

// GET frequently contacted physicians
router.get('/frequently-contacted/list', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, first_name, last_name, specialty, practice_name, phone, email, npi_number
      FROM physicians 
      WHERE frequently_contacted = true AND deleted = false
      ORDER BY last_name, first_name
    `;
    
    const { rows } = await pool.query(query);
    
    res.json({ 
      success: true, 
      data: rows
    });
  } catch (error) {
    console.error('Error fetching frequently contacted physicians:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch frequently contacted physicians',
      details: error.message 
    });
  }
});

// GET starred physicians
router.get('/starred/list', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, first_name, last_name, specialty, practice_name, phone, email, npi_number
      FROM physicians 
      WHERE starred = true AND deleted = false
      ORDER BY last_name, first_name
    `;
    
    const { rows } = await pool.query(query);
    
    res.json({ 
      success: true, 
      data: rows
    });
  } catch (error) {
    console.error('Error fetching starred physicians:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch starred physicians',
      details: error.message 
    });
  }
});

export default router;