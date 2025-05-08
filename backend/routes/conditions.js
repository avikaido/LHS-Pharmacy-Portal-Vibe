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

    const prompt = `As a medical professional, analyze the following patient condition and recommend appropriate medications from the provided list. 
    Consider medical guidelines, contraindications, and best practices.

    ${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ''}
    Current Patient Condition: ${condition}

    Available Medications:
    ${medications.map(med => `- ${med.BrandName || med.GenericName} (Generic: ${med.GenericName})`).join('\n')}

    INSTRUCTIONS:
    1. For vague symptoms (like "itchy", "pain", "discomfort"), ask ONE focused follow-up question.
    2. Structure your follow-up questions in this order:
       - First question: Ask about location (e.g., "Where exactly are you experiencing the pain?")
       - Second question: Ask about characteristics (e.g., "What type of pain is it - sharp, dull, or throbbing?")
       - Third question: Ask about duration (e.g., "How long have you been experiencing this?")
    3. After receiving answers to these questions, make your medication recommendations.
    4. If the patient provides detailed information in their initial description, you may skip to recommendations.
    5. Keep the conversation focused and avoid asking more than 3 questions.
    6. When recommending medications, always include both the brand name and generic name.

    Please provide your response in the following JSON format ONLY (no markdown, no additional text):
    {
      "originalCondition": "the original condition as provided",
      "diagnosis": "brief diagnosis based on available information",
      "recommendedMedications": [
        {
          "name": "brand name (generic name)",
          "reason": "brief explanation"
        }
      ],
      "considerations": "important notes",
      "needsMoreInfo": true/false,
      "followUpQuestion": "ONE specific question to gather more information"
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a medical professional conducting a focused patient interview. For vague symptoms, ask ONE specific question at a time following the location → characteristics → duration pattern. After receiving answers to these questions, make your medication recommendations. Be concise and clear in your questions. Respond ONLY with valid JSON, no markdown formatting or additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(response);
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