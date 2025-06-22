import express from 'express';
import { getMedicarePhysicianByNPI } from '../utils/medicarePhysicianLookup.js';

const router = express.Router();

router.post('/physician-info', async (req, res) => {
  console.log('📥 Received physician info request:', req.body);
  try {
    const { npi } = req.body;
    
    if (!npi) {
      console.log('❌ No NPI provided in request');
      return res.status(400).json({ 
        success: false, 
        message: 'NPI is required for physician lookup.' 
      });
    }

    console.log('🔍 Looking up physician with NPI:', npi);
    const medicareDoc = await getMedicarePhysicianByNPI(npi);
    
    if (!medicareDoc) {
      console.log('❌ Physician not found in Medicare database for NPI:', npi);
      return res.status(404).json({ 
        success: false, 
        message: 'Physician not found in Medicare database.' 
      });
    }

    console.log('✅ Found physician in Medicare database:', {
      npi: medicareDoc.npi,
      name: `${medicareDoc.first_name} ${medicareDoc.last_name}`,
      specialty: medicareDoc.primary_specialty
    });

    // Format the response to match the expected structure
    const physician = {
      lastName: medicareDoc.last_name || '',
      firstName: medicareDoc.first_name || '',
      fax: medicareDoc.fax_number || '',
      phone: medicareDoc.phone_number || '',
      npi: medicareDoc.npi || '',
      address: medicareDoc.address_line_1 || '',
      city: medicareDoc.city || '',
      state: medicareDoc.state || '',
      zip: medicareDoc.zip_code || '',
      specialty: medicareDoc.primary_specialty || '',
      dataQuality: {
        overallConfidence: 100,
        sources: ['Medicare Physician Compare'],
        lastVerified: new Date().toISOString().split('T')[0],
        fieldConfidence: {
          fax: medicareDoc.fax_number ? 100 : 0,
          phone: medicareDoc.phone_number ? 100 : 0,
          address: medicareDoc.address_line_1 ? 100 : 0,
          npi: 100,
          specialty: medicareDoc.primary_specialty ? 100 : 0
        }
      }
    };

    console.log('📤 Sending response with physician data');
    res.json({ success: true, physician });
  } catch (error) {
    console.error('❌ Error searching for physician info:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Could not retrieve physician data.',
      details: error.stack
    });
  }
});

export default router; 