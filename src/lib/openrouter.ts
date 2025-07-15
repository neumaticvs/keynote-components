// OpenRouter API wrapper

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

export async function generateWithOpenRouter(prompt: string, model?: string) {
  if (!OPENROUTER_KEY) {
    throw new Error('OPENROUTER_KEY is not configured');
  }

  // TODO: Implement OpenRouter API call
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'anthropic/claude-3-opus',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate with OpenRouter');
  }

  return response.json();
}