import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractIntentFromChat(messages: { sender: string; content: string }[]) {
  const chatHistory = messages.map(m => `${m.sender}: ${m.content}`).join('\n');
  const prompt = `Analyze the following chat history. Extract: 1. Subject of interest. 2. Specific topics of struggle. 3. Proposed date/time. Return only JSON.\n${chatHistory}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that extracts scheduling intent from chat.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 256,
    temperature: 0.2,
  });

  // Extract JSON from the response
  const text = response.choices[0].message?.content || '';
  try {
    return JSON.parse(text);
  } catch {
    // fallback: try to extract JSON substring
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse AI response as JSON');
  }
}
