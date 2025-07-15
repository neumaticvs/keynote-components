// SerpAPI helper functions

interface SearchResult {
  title: string;
  link: string;
}

export async function searchGoogle(query: string): Promise<SearchResult[]> {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
  
  if (!SERPAPI_KEY) {
    throw new Error('SERPAPI_KEY is not configured');
  }

  const params = new URLSearchParams({
    api_key: SERPAPI_KEY,
    q: query,
    engine: 'google',
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`SerpAPI request failed with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Extract top 5 organic results
  const organicResults = data.organic_results || [];
  const topResults: SearchResult[] = organicResults
    .slice(0, 5)
    .map((result: any) => ({
      title: result.title || '',
      link: result.link || '',
    }));

  return topResults;
}