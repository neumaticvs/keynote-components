import { NextApiRequest, NextApiResponse } from 'next';
import { generateWithOpenRouter } from '@/lib/openrouter';
import { parseSpeakers } from '@/lib/parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { panelId, speakerId } = req.body;

    if (!panelId || !speakerId) {
      return res.status(400).json({ error: 'panelId and speakerId are required' });
    }

    // Build regeneration prompt for a single speaker
    // In a real implementation, you might want to include context about:
    // - The panel topic
    // - Other speakers already selected for this panel
    // - Any specific requirements
    const prompt = `You are an expert event curator. Generate ONE new speaker recommendation for a panel discussion.

Please provide a diverse and high-quality speaker with the following format:

Speaker 1: [Full Name] – [Professional Title and Company]
Bio: [2-3 sentence compelling bio highlighting their expertise and why they're perfect for this panel]
Expertise: [comma-separated list of relevant expertise areas]

Requirements:
- Must be a recognized expert in their field
- Should bring a unique perspective to the discussion
- Include specific achievements or notable work
- Professional title should include company/organization
- Bio should be compelling and speaker-focused
- Expertise should be specific and relevant

Generate a speaker that would be valuable for a high-level industry panel discussion.`;

    // Generate new speaker using OpenRouter
    const rawText = await generateWithOpenRouter(prompt);

    if (!rawText) {
      throw new Error('No content generated from OpenRouter');
    }

    // Parse the speaker response
    const speakers = parseSpeakers(rawText);

    if (!speakers || speakers.length === 0) {
      throw new Error('Failed to parse speaker from generated content');
    }

    // Return the first (and should be only) speaker
    const newSpeaker = speakers[0];

    res.status(200).json({ 
      speaker: newSpeaker
    });
  } catch (error) {
    console.error('Error regenerating speaker:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to regenerate speaker' 
    });
  }
}