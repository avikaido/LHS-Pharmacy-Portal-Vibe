import express from 'express';
import { generateBarcode } from '../utils/barcodeUtil.js';

const router = express.Router();

// POST or GET /api/barcode/generate
router.all('/generate', async (req, res) => {
  try {
    // Accept params from query or body
    const params = {
      ...req.query,
      ...req.body,
    };
    const { type, text, format, size, level, ...extra } = params;
    if (!type || !text) {
      return res.status(400).json({ error: 'type and text are required' });
    }
    const svg = await generateBarcode({ type, text, format, size: size ? Number(size) : undefined, level, extra });
    if (format === 'svg' || !format) {
      res.set('Content-Type', 'image/svg+xml');
      return res.send(svg);
    }
    // For other formats, implement as needed
    res.status(501).json({ error: 'Only SVG output is currently supported.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/barcode/fax - generate a barcode for fax cover sheets
router.post('/fax', async (req, res) => {
  try {
    const { pharmacy, item, patient, physician, request, type = 'qr', format = 'svg', size = 256, ...extra } = req.body;
    if (!pharmacy || !item || !patient || !physician || !request) {
      return res.status(400).json({ error: 'pharmacy, item, patient, physician, and request are required' });
    }
    // Encode all details as a JSON string (or you could use a delimited string)
    const payload = JSON.stringify({ pharmacy, item, patient, physician, request });
    const svg = await generateBarcode({ type, text: payload, format, size, extra });
    if (format === 'svg' || !format) {
      res.set('Content-Type', 'image/svg+xml');
      return res.send(svg);
    }
    res.status(501).json({ error: 'Only SVG output is currently supported.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 