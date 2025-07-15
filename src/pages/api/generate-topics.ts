import { NextApiRequest, NextApiResponse } from 'next';
import { searchGoogle } from '@/lib/serp';
import { generateWithOpenRouter } from '@/lib/openrouter';
import { parseTopics } from '@/lib/parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventName, mainTopic, additionalInfo, numberOfPanels } = req.body;

    // Search for relevant content
    const searchQuery = `${mainTopic} ${additionalInfo}`;
    const searchResults = await searchGoogle(searchQuery);
    
    // Extract top 5 article titles
    const topArticles = searchResults.map(result => result.title);

    // Build the prompt
    const prompt = `You are an expert event planner. Create ${numberOfPanels} engaging panel topics for an event called "${eventName}".

Main topic: ${mainTopic}
Additional context: ${additionalInfo}

Here are some relevant article titles for inspiration:
${topArticles.map((title: string, i: number) => `${i + 1}. ${title}`).join('\n')}

Generate ${numberOfPanels} panel topics that are:
- Diverse and complementary
- Engaging for the audience
- Actionable and insightful
- Well-structured with clear focus

For each panel, provide:
- Title
- Description (2-3 sentences)
- Duration (in minutes)
- Type (keynote, panel, workshop, or breakout)

Format your response as a numbered list with clear structure.`;

    // Generate topics using OpenRouter
    const rawText = await generateWithOpenRouter(prompt);
    
    if (!rawText) {
      throw new Error('No content generated from OpenRouter');
    }

    // Parse the topics
    const topics = parseTopics(rawText);

    // Respond with parsed topics
    res.status(200).json({ panels: topics });
  } catch (error) {
    console.error('Error generating topics:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate topics' 
    });
  }
}