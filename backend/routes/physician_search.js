import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/llm-physician-info', async (req, res) => {
  try {
    const { lastName, firstName, city, state, npi } = req.body;
    if (!lastName || !firstName || !state) {
      return res.status(400).json({ success: false, message: 'First name, last name, and state are required.' });
    }

    const prompt = `You are a healthcare data assistant. Given the following physician information, search for the most recent and complete contact and credential data for this provider. Return the result as a JSON object with these fields: lastName, firstName, fax, phone, npi, address, city, state, zip, specialty. If you cannot find a field, leave it blank. If you find more recent or additional data than what was provided, include it. Do not include any text outside the JSON object.

Input:
Last Name: ${lastName}
First Name: ${firstName}
City: ${city || ''}
State: ${state}
NPI: ${npi || ''}

Respond ONLY with a JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a healthcare data assistant. Respond ONLY with a valid JSON object, no markdown or extra text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    let physician;
    try {
      physician = JSON.parse(response);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', response);
      throw new Error('Invalid response format from AI service');
    }

    res.json({ success: true, physician });
  } catch (error) {
    console.error('Error searching for physician info:', error);
    res.status(500).json({ success: false, message: 'Could not retrieve more recent data.' });
  }
});

export default router; 