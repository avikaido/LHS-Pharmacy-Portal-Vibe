import express from 'express';
import dotenv from 'dotenv';
import pool from '../db.js';
import fs from 'fs';
import { sendFax, verifyWebhook } from '../services/fax/telnyxFaxService.js';
import { DomainEvent, eventBus } from '../services/events/eventBus.js';
import { buildFaxPayload } from '../services/events/payloadBuilders.js';

dotenv.config();

const router = express.Router();

// Telnyx client handled inside service (lazy init)

// GET archived faxes (must come before /:id route)
router.get('/archived', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM faxes WHERE deleted = true ORDER BY deleted_on DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET all faxes (with optional include_archived parameter)
router.get('/', async (req, res) => {
    try {
        const { include_archived } = req.query;
        let query = `
            SELECT f.*, 
                   p.pharmacy_name AS pharmacy_name, 
                   p.fax AS pharmacy_fax, 
                   p.id AS pharmacy_id,
                   mp.first_name AS physician_first_name, 
                   mp.last_name AS physician_last_name, 
                   mp.npi AS physician_npi
            FROM faxes f
            LEFT JOIN pharmacies p ON f.pharmacy_id = p.id
            LEFT JOIN medicare_physicians mp ON f.physician_npi = mp.npi
        `;
        if (include_archived !== 'true') {
            query += ' WHERE f.deleted = false';
        }
        query += ' ORDER BY f.created_on DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST send a new fax
router.post('/send', async (req, res) => {
    try {
        if (!req.files || !req.files.faxFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const faxFile = req.files.faxFile;
        const { requestId, faxNumber, userId, pharmacyId, physicianNpi } = req.body;
        
        // Validate required fields
        if (!requestId || !faxNumber || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate file type
        if (!faxFile.mimetype.includes('pdf')) {
            return res.status(400).json({ error: 'Only PDF files are allowed' });
        }

        console.log('Debug - File object:', {
            name: faxFile.name,
            size: faxFile.size,
            mimetype: faxFile.mimetype,
            tempFilePath: faxFile.tempFilePath,
            truncated: faxFile.truncated,
            mv: typeof faxFile.mv
        });

        // Read the file from temp path
        const fileData = await fs.promises.readFile(faxFile.tempFilePath);
        console.log('Debug - File data:', {
            buffer_length: fileData.length,
            first_bytes: fileData.slice(0, 4).toString('hex')
        });

        // Convert to base64
        const base64Data = fileData.toString('base64');
        console.log('Debug - Base64 data:', {
            length: base64Data.length,
            prefix: base64Data.substring(0, 20)
        });
        
        // Format phone numbers to E.164 format
        const formatPhoneNumber = (number) => {
          // Remove all non-digit characters
          const digits = number.replace(/\D/g, '');
          // Add +1 prefix if it's a US number
          return digits.length === 10 ? `+1${digits}` : `+${digits}`;
        };

        // Prepare fax parameters
        const faxParams = {
            connection_id: process.env.TELNYX_APP_ID,
            contents: base64Data,
            media_name: 'prescription.pdf',
            to: formatPhoneNumber(faxNumber),
            from: formatPhoneNumber(process.env.TELNYX_TEST_FAX_NUMBER),
            quality: 'high',
            webhook_url: process.env.TELNYX_WEBHOOK_URL,
            webhook_failover_url: process.env.TELNYX_FAILOVER_URL
        };

        console.log('Debug - Fax parameters:', {
            ...faxParams,
            contents_length: base64Data.length
        });

        // Send fax using Telnyx service (unified place)
        const faxMedia = await sendFax({
          base64Pdf: base64Data,
          to: faxNumber,
          from: process.env.TELNYX_TEST_FAX_NUMBER,
          connectionId: process.env.TELNYX_APP_ID,
          mediaName: 'prescription.pdf',
          quality: 'high',
        });

        // Store fax record in database
        const newFax = await pool.query(
            `INSERT INTO faxes (request_id, sent_to, sent_by, status, telnyx_fax_id, pharmacy_id, physician_npi) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [requestId, faxNumber, userId, 'pending', faxMedia.id, pharmacyId || null, physicianNpi || null]
        );

        // Emit FaxQueued
        eventBus.publish(new DomainEvent({
          eventType: 'FaxQueued',
          aggregate: { requestId: requestId },
          payload: buildFaxPayload(newFax.rows[0]),
        }));

        res.json({
            message: 'Fax queued for sending',
            faxId: newFax.rows[0].id,
            telnyxFaxId: faxMedia.id
        });

    } catch (err) {
        console.error('Fax sending error:', err);
        
        // Create a clean error object without circular references
        const cleanError = {
            type: err.type,
            statusCode: err.statusCode,
            requestId: err.requestId,
            errors: err.raw?.errors || []
        };
        
        // Log the clean error object
        console.error('Clean error object:', JSON.stringify(cleanError, null, 2));
        
        if (cleanError.errors && cleanError.errors.length > 0) {
            // Extract error messages
            const errorMessages = cleanError.errors.map(e => {
                const field = e.field || 'unknown';
                const message = e.message || 'Unknown error';
                return `${field}: ${message}`;
            }).join(', ');

            res.status(cleanError.statusCode || 500).json({ 
                error: `Failed to send fax: ${errorMessages}`,
                details: cleanError.errors
            });
        } else {
            console.error('Unexpected error:', cleanError);
            res.status(cleanError.statusCode || 500).json({ 
                error: "Failed to send fax",
                details: cleanError
            });
        }
    }
});

// CREATE new fax (DB only, not Telnyx send)
router.post('/', async (req, res) => {
    try {
        const {
            fax_number,
            type = 'outgoing',
            code,
            doc_link,
            users,
            patients,
            requests,
            pharmacy_id,
            physician_npi,
            status = 'active',
            change_log
        } = req.body;

        // Validate required fields
        if (!fax_number) {
            return res.status(400).json({ error: 'fax_number is required' });
        }

        const result = await pool.query(
            `INSERT INTO faxes (
                fax_number, type, code, doc_link, users, patients, requests, pharmacy_id, physician_npi,
                created_on, created_by, updated_on, updated_by, version, change_log, status, deleted
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9,
                now(), $10, now(), $10, 1, $11, $12, false
            ) RETURNING *`,
            [
                fax_number, type, code, doc_link, users, patients, requests, pharmacy_id, physician_npi,
                req.user?.id || '1', // created_by, updated_by
                change_log || null,
                status
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// EDIT fax (update fields)
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
        updates.updated_by = req.user?.id || '1';
        updates.version = updates.version ? updates.version + 1 : 1;

        // Build the update query dynamically
        const keys = Object.keys(updates);
        if (keys.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = [id, ...keys.map(key => updates[key])];

        const updateQuery = `
            UPDATE faxes 
            SET ${setClause}
            WHERE id = $1 AND deleted = false
            RETURNING *;
        `;
        const result = await pool.query(updateQuery, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Fax not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET single fax by ID (with pharmacy/physician info)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT f.*, 
                    p.pharmacy_name AS pharmacy_name, 
                    p.fax AS pharmacy_fax, 
                    p.id AS pharmacy_id,
                    mp.first_name AS physician_first_name, 
                    mp.last_name AS physician_last_name, 
                    mp.npi AS physician_npi
             FROM faxes f
             LEFT JOIN pharmacies p ON f.pharmacy_id = p.id
             LEFT JOIN medicare_physicians mp ON f.physician_npi = mp.npi
             WHERE f.id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fax not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET fax status
router.get('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM faxes WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Fax not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Webhook endpoint for fax status updates (outbound + inbound)
router.post('/webhook', async (req, res) => {
    try {
        const event = req.body;
        if (!verifyWebhook(req)) return res.sendStatus(401);

        // Telnyx sends many event types: fax.queued, fax.delivered, fax.failed, fax.received
        const type = event?.data?.event_type || event?.data?.record_type || event?.type;

        // Outbound status updates include a Fax id
        if (event.data?.payload?.fax_id && event.data?.payload?.status) {
          const { rows } = await pool.query(
            'UPDATE faxes SET status = $1, updated_on = now() WHERE telnyx_fax_id = $2 RETURNING *',
            [event.data.payload.status, event.data.payload.fax_id]
          );
          if (rows[0]) {
            const evtType = event.data.payload.status === 'delivered' ? 'FaxDelivered' : (event.data.payload.status === 'failed' ? 'FaxFailed' : 'FaxUpdated');
            eventBus.publish(new DomainEvent({
              eventType: evtType,
              aggregate: { requestId: rows[0].request_id || rows[0].requests },
              payload: buildFaxPayload(rows[0]),
            }));
          }
        }

        // Inbound fax received — event contains media info
        if (type && String(type).includes('fax.received')) {
          const mediaUrl = event.data?.payload?.media_url || event.data?.payload?.original_media_url;
          const from = event.data?.payload?.from;
          const to = event.data?.payload?.to;
          // Store basic inbound fax row for later OCR pipeline
          const { rows } = await pool.query(
            `INSERT INTO faxes (fax_number, type, status, direction, doc_link, created_on, created_by, updated_on, updated_by, deleted)
             VALUES ($1, 'incoming', 'received', 'incoming', $2, now(), 1, now(), 1, false) RETURNING *`,
            [from || null, mediaUrl || null]
          );
          if (rows[0]) {
            eventBus.publish(new DomainEvent({
              eventType: 'FaxReceived',
              aggregate: { requestId: rows[0].request_id || rows[0].requests },
              payload: buildFaxPayload(rows[0]),
            }));
          }
        }

        res.sendStatus(200);
    } catch (err) {
        console.error('Webhook error:', err);
        res.sendStatus(500);
    }
});

// SOFT DELETE (Archive) fax
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE faxes 
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
            return res.status(404).json({ error: "Fax not found" });
        }
        
        res.json({ message: "Fax archived successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// RESTORE archived fax
router.post('/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `UPDATE faxes 
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
            return res.status(404).json({ error: "Fax not found or already active" });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;