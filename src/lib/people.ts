// People/Speaker related utilities

import { searchGoogle } from './serp';
import { generateWithOpenRouter } from './openrouter';

export interface Speaker {
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  imageUrl?: string;
  linkedIn?: string;
  twitter?: string;
}

export async function findSpeakers(topic: string): Promise<Partial<Speaker>[]> {
  const searchQuery = `${topic} expert speaker bio`;
  const searchResults = await searchGoogle(searchQuery);
  
  // Take top 6 results and map to partial speaker objects
  const speakers: Partial<Speaker>[] = searchResults.slice(0, 6).map(result => {
    // Try to extract name from title (assuming format like "Name – Title/Company")
    const nameParts = result.title.split('–');
    const name = nameParts[0]?.trim() || result.title;
    
    return {
      name,
      title: result.link,
      linkedIn: result.link.includes('linkedin.com') ? result.link : undefined,
    };
  });
  
  return speakers;
}

export async function enrichSpeakerInfo(speaker: Partial<Speaker>): Promise<Speaker> {
  const prompt = `Given the following information about a speaker, generate a complete speaker profile in JSON format:

Name: ${speaker.name || 'Unknown'}
URL/Title: ${speaker.title || 'N/A'}
LinkedIn: ${speaker.linkedIn || 'N/A'}

Please generate a realistic and professional speaker profile with the following JSON structure:
{
  "name": "Full name of the speaker",
  "title": "Professional title and company",
  "expertise": ["area1", "area2", "area3"],
  "bio": "A compelling 2-3 sentence bio highlighting their experience and achievements"
}

Important:
- If you cannot determine the actual name, use the provided name
- Generate a professional title based on context
- List 3-5 relevant areas of expertise
- Create a bio that sounds authoritative and relevant to speaking engagements
- Return ONLY the JSON object, no additional text`;

  try {
    const response = await generateWithOpenRouter(prompt);
    const enrichedData = JSON.parse(response);
    
    // Merge the enriched data with existing speaker data
    return {
      ...speaker,
      name: enrichedData.name || speaker.name || 'Unknown Speaker',
      title: enrichedData.title || speaker.title || 'Industry Expert',
      expertise: enrichedData.expertise || [],
      bio: enrichedData.bio || 'Experienced professional and thought leader.',
      linkedIn: speaker.linkedIn,
      imageUrl: speaker.imageUrl,
      twitter: speaker.twitter,
    } as Speaker;
  } catch (error) {
    console.error('Error enriching speaker info:', error);
    
    // Return a default speaker object if enrichment fails
    return {
      name: speaker.name || 'Unknown Speaker',
      title: speaker.title || 'Industry Expert',
      expertise: [],
      bio: 'Experienced professional and thought leader in their field.',
      linkedIn: speaker.linkedIn,
      imageUrl: speaker.imageUrl,
      twitter: speaker.twitter,
    };
  }
}