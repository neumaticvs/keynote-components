import { NextApiRequest, NextApiResponse } from 'next';
import { findSpeakers } from '@/lib/people';
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
    const { topic, panelId } = req.body;

    if (!topic || !panelId) {
      return res.status(400).json({ error: 'topic and panelId are required' });
    }

    // Find raw speaker candidates
    const rawCandidates = await findSpeakers(topic);

    // Build prompt for LLM
    const candidatesList = rawCandidates.map((candidate, index) => 
      `${index + 1}. ${candidate.name} - ${candidate.title || 'Link: ' + candidate.linkedIn || 'No additional info'}`
    ).join('\n');

    const prompt = `You are an expert event curator. Given the following topic and speaker candidates, select the TOP 4 most relevant and impressive speakers for a panel discussion.

Topic: ${topic}

Available Candidates:
${candidatesList}

Please select the 4 best speakers for this topic and provide:
1. Their name
2. Professional title and company
3. A compelling 2-3 sentence bio highlighting why they're perfect for this panel
4. Key areas of expertise relevant to the topic

Format your response as:
Speaker 1: [Name] – [Title at Company]
Bio: [2-3 sentence bio]
Expertise: [comma-separated list]

Speaker 2: [Name] – [Title at Company]
Bio: [2-3 sentence bio]
Expertise: [comma-separated list]

(Continue for all 4 speakers)

Focus on diversity of perspectives, credibility, and relevance to the topic.`;

    // Generate speaker recommendations
    const rawText = await generateWithOpenRouter(prompt);

    if (!rawText) {
      throw new Error('No content generated from OpenRouter');
    }

    // Parse the speakers
    const speakers = parseSpeakers(rawText);

    // Return structured response
    res.status(200).json({ 
      panelId,
      speakers 
    });
  } catch (error) {
    console.error('Error generating speakers:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate speakers' 
    });
  }
}