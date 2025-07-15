import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Speaker {
  name: string;
  title: string;
  justification: string;
}

interface Panel {
  title: string;
  speakers: Speaker[];
}

interface EventAgendaProps {
  eventName?: string;
  mainTopic?: string;
  panels?: Panel[];
}

const EventAgenda: React.FC<EventAgendaProps> = ({
  eventName = "Seminário Energia Renovável",
  mainTopic = "As oportunidades do Brasil como protagonista global em energia renovável",
  panels = [
    {
      title: "Novas tecnologias para produção de energia",
      speakers: [
        {
          name: "Dra. Maria Nouveau",
          title: "CEO da ExaEnergies",
          justification: "A ExaEnergies é líder em desenvolvimento de novas tecnologias para energia renovável."
        },
        {
          name: "Pedro Santos",
          title: "CEO da Eletrobras",
          justification: "A Eletrobras é a maior empresa de geração e distribuição de energia elétrica no Brasil."
        },
        {
          name: "José Fernandes",
          title: "Presidente da Copasa",
          justification: "José Fernandes atua na área de energia renovável há mais de duas décadas sendo destaque em diversas iniciativas de avanços ao setor."
        }
      ]
    },
    {
      title: "A oportunidade para o Brasil liderar este setor globalmente",
      speakers: [
        {
          name: "Alexandre Rocha",
          title: "Ministro de Minas e Energia",
          justification: "O Ministério de Minas e Energia é o órgão responsável pelo desenvolvimento do setor de minas e energia no Brasil."
        },
        {
          name: "Bianca Barbosa",
          title: "CEO da Eólicas",
          justification: "Engies é a líder em produção de energia eólica na américa latina."
        },
        {
          name: "Regina Diamante",
          title: "Vice-Presidente da Ampibar",
          justification: "A Ambipar é líder global em soluções ambientais e desenvolve projetos para empresas do setor elétrico."
        }
      ]
    }
  ]
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {eventName}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {mainTopic}
        </p>
      </div>

      <div className="space-y-8">
        {panels.map((panel, panelIndex) => (
          <Card key={panelIndex} className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-foreground">
                Painel {panelIndex + 1}: {panel.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {panel.speakers.map((speaker, speakerIndex) => (
                  <div key={speakerIndex}>
                    <div className="mb-3">
                      <h3 className="font-semibold text-foreground text-lg">
                        {speaker.name}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {speaker.title}
                      </p>
                    </div>
                    <div className="pl-4 border-l-2 border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium">Justificativa:</span> {speaker.justification}
                      </p>
                    </div>
                    {speakerIndex < panel.speakers.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventAgenda;
