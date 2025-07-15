import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch panels with their confirmed speakers
    const { data: panels, error: panelsError } = await supabase
      .from('panels')
      .select(`
        *,
        speakers!inner(*)
      `)
      .eq('speakers.confirmed', true)
      .order('panel_number');

    if (panelsError) {
      throw new Error(`Failed to fetch panels: ${panelsError.message}`);
    }

    // Transform the data to match frontend interface
    const transformedPanels = panels?.map(panel => ({
      id: panel.id,
      panelNumber: panel.panel_number,
      suggestedTopic: panel.suggested_topic,
      justification: panel.justification,
      isConfirmed: panel.is_confirmed,
      isRegenerating: panel.is_regenerating,
      speakers: panel.speakers?.map((speaker: any) => ({
        id: speaker.id,
        name: speaker.name,
        title: speaker.title,
        expertise: speaker.expertise || [],
        bio: speaker.bio,
        imageUrl: speaker.image_url,
        linkedIn: speaker.linked_in,
        twitter: speaker.twitter,
        isConfirmed: speaker.confirmed,
      })) || [],
    })) || [];

    res.status(200).json({ panels: transformedPanels });
  } catch (error) {
    console.error('Error fetching final agenda:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch final agenda' 
    });
  }
}