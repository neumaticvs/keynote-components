import { NextApiRequest, NextApiResponse } from 'next';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { generateWithOpenRouter } from '@/lib/openrouter';
import { supabase } from '@/lib/supabaseClient';

const SpeakerSchema = z.object({
  nome: z.string(),
  cargo: z.string(),
  bio: z.string(),
});
const SpeakersSchema = z.object({ palestrantes: z.array(SpeakerSchema) });

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

    const prompt = `
Você é um especialista em identificar líderes empresariais brasileiros.
Tópico do painel: ${topic}

Encontre 4 executivos brasileiros (C-level, VP, Diretores) que seriam palestrantes ideais para este painel.
Critérios:
- Posições atuais (confirmado em ${new Date().getFullYear()})
- Diversidade de gênero e setores
- Especialistas reconhecidos no tema

Retorne nome, cargo atual e bio profissional (2-3 frases).
`;

    // Generate speaker recommendations using OpenRouter with structured output
    const rawText = await generateWithOpenRouter(prompt, {
      model: 'moonshotai/kimi-k2:free',
      messages: [
        { role: 'system', content: `Hoje é ${new Date().toLocaleDateString('pt-BR')}. Priorize dados atuais.` },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(SpeakersSchema, 'palestrantes_brasileiros'),
    });

    if (!rawText) {
      throw new Error('No content generated from OpenRouter');
    }

    const json = JSON.parse(rawText);
    const speakers = json.palestrantes.map((s: any) => ({
      name: s.nome,
      title: s.cargo,
      bio: s.bio,
      expertise: [],
      panel_id: panelId,
    }));

    // Insert speakers into Supabase
    const { data: insertedSpeakers, error } = await supabase
      .from('speakers')
      .insert(speakers)
      .select();

    if (error) {
      throw new Error(`Failed to save speakers: ${error.message}`);
    }

    // Return structured response with mapped speakers for frontend
    const mappedSpeakers = insertedSpeakers?.map((s: any) => ({
      id: s.id,
      name: s.name,
      company_role: s.title,
      mini_bio: s.bio,
      reason: s.bio,
    })) || [];

    res.status(200).json({ 
      panelId,
      speakers: mappedSpeakers 
    });
  } catch (error) {
    console.error('Error generating speakers:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate speakers' 
    });
  }
}