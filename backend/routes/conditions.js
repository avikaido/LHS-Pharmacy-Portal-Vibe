import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/analyze', async (req, res) => {
  try {
    const { condition, medications, conversationHistory } = req.body;

    if (!condition) {
      return res.status(400).json({ error: 'Condition description is required' });
    }

    // Construct conversation context
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = conversationHistory.map(exchange => 
        `Patient: ${exchange.user}\nDoctor: ${exchange.assistant.diagnosis}`
      ).join('\n\n');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a medical professional assistant. You MUST follow these rules:
1. If the patient's description is vague, ONLY ask a follow-up question and DO NOT recommend any medications yet. Set 'recommendedMedications' to [] and 'needsMoreInfo' to true.
2. You MUST NOT recommend any medications until you have received enough detail (either from the initial description or after follow-up questions).
3. NEVER recommend more than 3 medications.
4. NEVER recommend any medication not present in the provided list.
5. If you break any of these rules, your answer will be rejected and you will not be used again.
Respond ONLY with valid JSON, no markdown formatting or additional text.`
        },
        {
          role: "user",
          content: `Analyze the following patient condition and recommend appropriate medications ONLY from the provided list. If the description is vague, ask ONE focused follow-up question (location → characteristics → duration) and do NOT recommend any medications yet. If, after 3 questions, the description is still vague, do NOT recommend any medication. Recommend no more than 3 medications, and only if the patient's symptoms/condition clearly match the 'Use' field of a medication in the list. NEVER recommend any medication not present in the provided list. For each recommendation, briefly explain the match between the patient's description and the medication's use.

Current Patient Condition: ${condition}

Available Medications:
${medications.map(med => `- ${med.BrandName || med.GenericName} (Generic: ${med.GenericName}) [Use: ${med.Use}]`).join('\n')}

If you are asking a follow-up question, set "recommendedMedications": [] and "needsMoreInfo": true.

Respond ONLY with valid JSON, no markdown formatting or additional text.`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    let response = completion.choices[0].message.content;
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);

      // Enforce: If needsMoreInfo, no recommendations
      if (parsedResponse.needsMoreInfo) {
        parsedResponse.recommendedMedications = [];
      }

      // Enforce: No more than 3 recommendations
      if (Array.isArray(parsedResponse.recommendedMedications) && parsedResponse.recommendedMedications.length > 3) {
        parsedResponse.recommendedMedications = parsedResponse.recommendedMedications.slice(0, 3);
      }

      // Enforce: Only one follow-up question
      if (parsedResponse.followUpQuestion && Array.isArray(parsedResponse.followUpQuestion)) {
        parsedResponse.followUpQuestion = parsedResponse.followUpQuestion[0];
      }

      // If conversationHistory shows >3 follow-ups, return a message instead
      if (conversationHistory && conversationHistory.length >= 3 && parsedResponse.needsMoreInfo) {
        parsedResponse.recommendedMedications = [];
        parsedResponse.needsMoreInfo = false;
        parsedResponse.followUpQuestion = '';
        parsedResponse.diagnosis = 'More detail is needed to make a safe recommendation. Please consult a healthcare provider.';
      }

    } catch (parseError) {
      console.error('Error parsing OpenAI response:', response);
      throw new Error('Invalid response format from AI service');
    }

    res.json(parsedResponse);
  } catch (error) {
    console.error('Error analyzing condition:', error);
    
    // Handle specific OpenAI API errors
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({ 
        error: 'Service temporarily unavailable',
        message: 'The AI analysis service is currently unavailable. Please try again later or contact support.',
        details: 'API quota exceeded'
      });
    }

    res.status(500).json({ 
      error: 'Failed to analyze condition',
      message: 'An unexpected error occurred. Please try again later.',
      details: error.message 
    });
  }
});

export default router; 