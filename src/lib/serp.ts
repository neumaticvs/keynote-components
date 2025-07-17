// SerpAPI helper functions

interface SearchResult {
  title: string;
  link: string;
}

export async function searchGoogle(query: string): Promise<SearchResult[]> {
  const SERPER_API_KEY = process.env.SERPER_API_KEY;
  
  if (!SERPER_API_KEY) {
    throw new Error('SERPER_API_KEY is not configured');
  }

  const params = new URLSearchParams({
    api_key: SERPER_API_KEY,
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