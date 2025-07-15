// SerpAPI helper functions

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export async function searchGoogle(query: string) {
  if (!SERPAPI_KEY) {
    throw new Error('SERPAPI_KEY is not configured');
  }

  // TODO: Implement SerpAPI search functionality
  const params = new URLSearchParams({
    api_key: SERPAPI_KEY,
    q: query,
    engine: 'google',
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to search with SerpAPI');
  }

  return response.json();
}