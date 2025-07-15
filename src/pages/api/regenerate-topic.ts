import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { panelId } = req.body;

    if (!panelId) {
      return res.status(400).json({ error: 'panelId is required' });
    }

    // TODO: Later implement real OpenRouter + parse logic:
    // 1. Load panel data from request or DB based on panelId
    // 2. Rebuild prompt with context about the event and other panels
    // 3. Call OpenRouter/LLM to generate a new topic
    // 4. Parse the single topic response
    
    // For now, return mock data
    const mockTopics = [
      {
        suggestedTopic: 'The Future of AI in Enterprise: Practical Applications and ROI',
        justification: 'This topic addresses current enterprise concerns about AI implementation and provides concrete examples of successful deployments with measurable returns.'
      },
      {
        suggestedTopic: 'Building Resilient Teams in a Remote-First World',
        justification: 'Remote work is now permanent for many organizations. This panel explores strategies for maintaining team cohesion and productivity across distributed environments.'
      },
      {
        suggestedTopic: 'Sustainable Technology: Balancing Innovation with Environmental Responsibility',
        justification: 'As climate concerns grow, this topic examines how tech companies can innovate while reducing their environmental footprint and contributing to sustainability goals.'
      }
    ];

    // Return a random mock topic
    const randomIndex = Math.floor(Math.random() * mockTopics.length);
    const selectedTopic = mockTopics[randomIndex];

    res.status(200).json({ 
      topic: {
        suggestedTopic: selectedTopic.suggestedTopic,
        justification: selectedTopic.justification
      }
    });
  } catch (error) {
    console.error('Error regenerating topic:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to regenerate topic' 
    });
  }
}