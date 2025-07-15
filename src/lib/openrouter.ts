// OpenRouter API wrapper

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithOpenRouter(prompt: string, model?: string): Promise<string> {
  const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
  
  if (!OPENROUTER_KEY) {
    throw new Error('OPENROUTER_KEY is not configured');
  }

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
    const errorText = await response.text();
    throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorText}`);
  }

  const data: OpenRouterResponse = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    throw new Error('Invalid response structure from OpenRouter API');
  }

  return data.choices[0].message.content;
}