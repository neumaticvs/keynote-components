import { NextApiRequest, NextApiResponse } from 'next';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { generateWithOpenRouter } from '@/lib/openrouter';

const PanelSchema = z.object({
  titulo: z.string(),
  justificativa: z.string(),
});
const PanelsSchema = z.object({ paineis: z.array(PanelSchema) });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventName, mainTopic, additionalInfo, numberOfPanels } = req.body;

    const prompt = `
Você é um especialista em criação de agendas relevantes e atuais para conferências de liderança empresarial no Brasil.
Data de hoje: ${new Date().toLocaleDateString('pt-BR')}
Tema macro: ${mainTopic}

Crie ${numberOfPanels} tópicos de painéis relevantes para executivos C-level no Brasil, considerando as tendências mais atuais até hoje.
Cada painel deve:
- Ser altamente relevante para líderes empresariais brasileiros
- Abordar tendências atuais e futuras
- Ter título atrativo e profissional
- Incluir justificativa de por que é importante hoje
`;

    // Generate topics using OpenRouter with structured output
    const rawText = await generateWithOpenRouter(prompt, {
      model: 'moonshotai/kimi-k2:free',
      messages: [
        { role: 'system', content: `Hoje é ${new Date().toLocaleDateString('pt-BR')}. Use informações atualizadas.` },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(PanelsSchema, 'paineis_conferencia'),
    });
    
    if (!rawText) {
      throw new Error('No content generated from OpenRouter');
    }

    const json = JSON.parse(rawText);
    const panels = json.paineis.map((p: any, idx: number) => ({
      id: crypto.randomUUID(),
      panelNumber: idx + 1,
      suggestedTopic: p.titulo,
      justification: p.justificativa,
      isConfirmed: false,
      isRegenerating: false,
    }));

    // Respond with parsed topics
    res.status(200).json({ panels });
  } catch (error) {
    console.error('Error generating topics:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate topics' 
    });
  }
}