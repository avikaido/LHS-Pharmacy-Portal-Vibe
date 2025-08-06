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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('OpenAI API key not configured, returning fallback response');
      return res.json({
        diagnosis: "AI analysis service is not currently available. Please search for medications directly or consult with a healthcare provider.",
        recommendedMedications: [],
        considerations: "For immediate assistance, please use the medication search feature above or consult with a healthcare provider.",
        needsMoreInfo: false,
        followUpQuestion: ""
      });
    }

    // Construct conversation context (limit to last 3 exchanges to prevent token issues)
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-3); // Only last 3 exchanges
      conversationContext = recentHistory.map(exchange => 
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

    // Limit medications to prevent token limit issues
    const limitedMedications = medications.slice(0, 50); // Only send first 50 medications
    
    const limitedSystemPrompt = `You are a helpful medical assistant. Your role is to analyze patient conditions and provide medication recommendations based on the available medications in our database. 

IMPORTANT RULES:
1. Always prioritize patient safety
2. Only recommend medications that are in the provided medications list
3. If you need more information to make a safe recommendation, ask for it
4. Keep recommendations to 3 or fewer medications
5. Always provide reasoning for your recommendations
6. If the condition is serious or unclear, recommend consulting a healthcare provider
7. Be concise but thorough in your analysis

Available medications (showing first 50 of ${medications.length} total): ${JSON.stringify(limitedMedications, null, 2)}

Previous conversation context: ${conversationContext}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: limitedSystemPrompt
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

    if (error.code === 'invalid_api_key') {
      return res.status(503).json({ 
        error: 'Service configuration error',
        message: 'The AI analysis service is not properly configured. Please contact support.',
        details: 'Invalid API key'
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a moment and try again.',
        details: 'Rate limit exceeded'
      });
    }

    if (error.code === 'context_length_exceeded') {
      return res.status(400).json({ 
        error: 'Input too long',
        message: 'The request contains too much information. Please try with a shorter description or fewer medications.',
        details: 'Token limit exceeded'
      });
    }

    // Log the full error for debugging
    console.error('Full error details:', error);

    res.status(500).json({ 
      error: 'Failed to analyze condition',
      message: 'An unexpected error occurred. Please try again later.',
      details: error.message 
    });
  }
});

export default router; 