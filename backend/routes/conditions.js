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

    const systemPrompt = `You are a helpful medical assistant. Your role is to analyze patient conditions and provide medication recommendations based on the available medications in our database. 

IMPORTANT RULES:
1. Always prioritize patient safety
2. Only recommend medications that are in the provided medications list
3. If you need more information to make a safe recommendation, ask for it
4. Keep recommendations to 3 or fewer medications
5. Always provide reasoning for your recommendations
6. If the condition is serious or unclear, recommend consulting a healthcare provider
7. Be concise but thorough in your analysis

Available medications: ${JSON.stringify(medications, null, 2)}

Previous conversation context: ${conversationContext}`;

    const userPrompt = `Please analyze this condition: "${condition}"

Provide your response in this exact JSON format:
{
  "diagnosis": "Your analysis of the condition",
  "recommendedMedications": [
    {
      "name": "Medication Name (Generic Name)",
      "reason": "Why this medication is recommended"
    }
  ],
  "considerations": "Any important considerations or warnings",
  "needsMoreInfo": true/false,
  "followUpQuestion": "Specific question to ask if more info is needed (or empty string if not needed)"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
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