import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type LeadScore = 'hot' | 'warm' | 'cold';

export async function classifyLead(data: {
  name: string;
  email: string;
  message: string;
  budget: string;
}): Promise<{ score: LeadScore; reasoning: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a lead qualification expert for an AI automation agency.

Analyze this lead and classify it as "hot", "warm", or "cold".

Lead data:
- Name: ${data.name}
- Email: ${data.email}
- Budget: ${data.budget || 'not specified'}
- Message: ${data.message}

Scoring criteria:
- HOT: Clear project description + budget mentioned + urgency signals + business email
- WARM: Some project clarity, vague budget, or personal email but real intent
- COLD: Vague message, no budget, student/test message, or just browsing

Respond ONLY with valid JSON:
{"score": "hot"|"warm"|"cold", "reasoning": "one sentence explanation"}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = JSON.parse(text.replace(/```json|```/g, '').trim());
    return { score: json.score as LeadScore, reasoning: json.reasoning };
  } catch (err) {
    console.error('[gemini] Classification failed:', err);
    return { score: 'warm', reasoning: 'Classification unavailable' };
  }
}
