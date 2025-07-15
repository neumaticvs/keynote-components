import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { RefreshCw, Check, X } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  company: string;
  role: string;
  justification: string;
  confirmed: boolean;
}

interface Panel {
  id: string;
  topic: string;
  speakers: Speaker[];
}

const initialPanels: Panel[] = [
  {
    id: 'panel-1',
    topic: 'The Future of Artificial Intelligence in Healthcare',
    speakers: [
      {
        id: 'speaker-1-1',
        name: 'Dr. Sarah Chen',
        company: 'Google Health',
        role: 'Head of AI Research',
        justification: 'Leading expert in medical AI with 15+ years experience developing diagnostic algorithms and deep learning models for healthcare applications.',
        confirmed: false
      },
      {
        id: 'speaker-1-2',
        name: 'Prof. Michael Rodriguez',
        company: 'Stanford Medicine',
        role: 'Director of Digital Health Innovation',
        justification: 'Pioneer in AI-driven personalized medicine and author of 100+ publications on machine learning applications in clinical settings.',
        confirmed: false
      },
      {
        id: 'speaker-1-3',
        name: 'Lisa Park',
        company: 'IBM Watson Health',
        role: 'VP of AI Strategy',
        justification: 'Instrumental in deploying AI solutions across major healthcare systems with proven track record in scaling medical AI technologies.',
        confirmed: false
      },
      {
        id: 'speaker-1-4',
        name: 'Dr. James Wilson',
        company: 'Mayo Clinic',
        role: 'Chief AI Officer',
        justification: 'Transformative leader implementing AI across clinical workflows with focus on ethical AI deployment and patient safety.',
        confirmed: false
      }
    ]
  },
  {
    id: 'panel-2',
    topic: 'Sustainable Technology Solutions for Climate Change',
    speakers: [
      {
        id: 'speaker-2-1',
        name: 'Elena Kostova',
        company: 'Tesla Energy',
        role: 'VP of Renewable Solutions',
        justification: 'Visionary engineer leading next-generation battery technology and grid-scale energy storage systems for sustainable infrastructure.',
        confirmed: false
      },
      {
        id: 'speaker-2-2',
        name: 'Dr. Ahmed Hassan',
        company: 'MIT Climate Portal',
        role: 'Senior Research Scientist',
        justification: 'Climate tech researcher specializing in carbon capture technologies and AI-driven environmental monitoring systems.',
        confirmed: false
      },
      {
        id: 'speaker-2-3',
        name: 'Maria Santos',
        company: 'Breakthrough Energy',
        role: 'Investment Director',
        justification: 'Expert in scaling climate solutions with deep knowledge of emerging technologies and sustainable business models.',
        confirmed: false
      },
      {
        id: 'speaker-2-4',
        name: 'Robert Kim',
        company: 'Patagonia',
        role: 'Chief Sustainability Officer',
        justification: 'Industry leader in sustainable business practices with proven impact in implementing circular economy principles at scale.',
        confirmed: false
      }
    ]
  }
];

function App() {
  const [panels, setPanels] = useState<Panel[]>(initialPanels);

  const handleConfirmSpeaker = (panelId: string, speakerId: string) => {
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? {
              ...panel,
              speakers: panel.speakers.map(speaker =>
                speaker.id === speakerId
                  ? { ...speaker, confirmed: true }
                  : speaker
              )
            }
          : panel
      )
    );
  };

  const handleRegenerateSpeaker = (panelId: string, speakerId: string) => {
    // Simulate AI regeneration with placeholder data
    const newSpeakerNames = [
      'Dr. Jennifer Liu', 'Prof. David Thompson', 'Rachel Martinez', 'Dr. Kevin Patel',
      'Amanda Foster', 'Dr. Benjamin Lee', 'Sofia Andersson', 'Prof. Carlos Mendez'
    ];
    
    const companies = [
      'Microsoft Research', 'Alphabet X', 'OpenAI', 'DeepMind', 'NVIDIA',
      'Siemens', 'GE Research', 'Accenture', 'BCG Digital Ventures'
    ];
    
    const randomName = newSpeakerNames[Math.floor(Math.random() * newSpeakerNames.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? {
              ...panel,
              speakers: panel.speakers.map(speaker =>
                speaker.id === speakerId
                  ? {
                      ...speaker,
                      name: randomName,
                      company: randomCompany,
                      role: 'Senior Technology Leader',
                      justification: 'Regenerated suggestion based on latest research and industry expertise matching panel requirements.',
                      confirmed: false
                    }
                  : speaker
              )
            }
          : panel
      )
    );
  };

  const handleRemoveSpeaker = (panelId: string, speakerId: string) => {
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? {
              ...panel,
              speakers: panel.speakers.filter(speaker => speaker.id !== speakerId)
            }
          : panel
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Speaker Recommendations</h1>
          <p className="text-gray-600">AI-generated speaker suggestions for your event panels</p>
        </div>

        <div className="space-y-8">
          {panels.map((panel) => (
            <Card key={panel.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Panel {panel.id.split('-')[1]}
                </CardTitle>
                <p className="text-lg text-gray-700 font-medium">{panel.topic}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {panel.speakers.map((speaker) => (
                    <div key={speaker.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
                            {speaker.confirmed && (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                <Check className="w-3 h-3 mr-1" />
                                Confirmed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            <span className="font-medium">{speaker.role}</span> at <span className="font-medium">{speaker.company}</span>
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">{speaker.justification}</p>
                        </div>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex gap-2">
                        {!speaker.confirmed ? (
                          <Button
                            onClick={() => handleConfirmSpeaker(panel.id, speaker.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirm
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleConfirmSpeaker(panel.id, speaker.id)}
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Confirmed
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => handleRegenerateSpeaker(panel.id, speaker.id)}
                          variant="outline"
                          size="sm"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                        
                        <Button
                          onClick={() => handleRemoveSpeaker(panel.id, speaker.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
