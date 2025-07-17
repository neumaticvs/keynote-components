// OpenRouter API wrapper

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface OpenRouterOptions {
  model?: string;
  messages?: Array<{
    role: string;
    content: string;
  }>;
  response_format?: any;
}

export async function generateWithOpenRouter(prompt: string, options?: OpenRouterOptions): Promise<string> {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2:free';
  
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  // Build the request body
  const requestBody: any = {
    model: options?.model || DEFAULT_MODEL,
    messages: options?.messages || [{ role: 'user', content: prompt }],
  };

  // Add response_format if provided (for structured output)
  if (options?.response_format) {
    requestBody.response_format = options.response_format;
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
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