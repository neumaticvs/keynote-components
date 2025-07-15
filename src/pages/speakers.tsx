import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SuggestSpeakers from '@/components/SuggestSpeakers';
import { PanelTopic } from '@/lib/parse';
import { Speaker } from '@/lib/people';

interface PanelWithSpeakers extends PanelTopic {
  speakers?: Array<Speaker & { id: string; isConfirmed?: boolean }>;
}

const SpeakersPage = () => {
  const router = useRouter();
  const [panels, setPanels] = useState<PanelWithSpeakers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query.panels) {
      try {
        const parsedPanels = JSON.parse(router.query.panels as string);
        setPanels(parsedPanels);
        
        // Generate speakers for each panel on mount
        generateSpeakersForPanels(parsedPanels);
      } catch (error) {
        console.error('Failed to parse panels:', error);
        alert('Invalid panel data. Redirecting to home...');
        router.push('/');
      }
    }
  }, [router.query.panels]);

  const generateSpeakersForPanels = async (panelList: PanelWithSpeakers[]) => {
    setIsLoading(true);
    
    try {
      const speakerPromises = panelList.map(async (panel) => {
        const response = await fetch('/api/generate-speakers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            topic: panel.suggestedTopic,
            panelId: panel.id 
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate speakers for panel ${panel.id}`);
        }

        const data = await response.json();
        return { panelId: panel.id, speakers: data.speakers };
      });

      const results = await Promise.all(speakerPromises);
      
      // Update panels with speakers
      setPanels(prevPanels => 
        prevPanels.map(panel => {
          const result = results.find(r => r.panelId === panel.id);
          if (result) {
            // Add unique IDs and confirmation status to speakers
            const speakersWithIds = result.speakers.map((speaker: Speaker, index: number) => ({
              ...speaker,
              id: `${panel.id}-speaker-${index + 1}`,
              isConfirmed: false,
            }));
            return { ...panel, speakers: speakersWithIds };
          }
          return panel;
        })
      );
    } catch (error) {
      console.error('Error generating speakers:', error);
      alert('Failed to generate speakers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirm = (panelId: string, speakerId: string) => {
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? {
              ...panel,
              speakers: panel.speakers?.map(speaker =>
                speaker.id === speakerId
                  ? { ...speaker, isConfirmed: true }
                  : speaker
              ),
            }
          : panel
      )
    );
  };

  const onRegenerate = async (panelId: string, speakerId: string) => {
    try {
      const response = await fetch('/api/regenerate-speaker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ panelId, speakerId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { speaker } = await response.json();

      setPanels(prevPanels =>
        prevPanels.map(panel =>
          panel.id === panelId
            ? {
                ...panel,
                speakers: panel.speakers?.map(s =>
                  s.id === speakerId
                    ? { 
                        ...s, 
                        ...speaker, 
                        id: speakerId,
                        isConfirmed: false 
                      }
                    : s
                ),
              }
            : panel
        )
      );
    } catch (error) {
      console.error('Error regenerating speaker:', error);
      alert(error instanceof Error ? error.message : 'Failed to regenerate speaker. Please try again.');
    }
  };

  const onRemove = (panelId: string, speakerId: string) => {
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? {
              ...panel,
              speakers: panel.speakers?.filter(speaker => speaker.id !== speakerId),
            }
          : panel
      )
    );
  };

  const handleProceed = () => {
    // Check if at least one speaker is confirmed per panel
    const allPanelsHaveConfirmedSpeakers = panels.every(panel => 
      panel.speakers?.some(speaker => speaker.isConfirmed)
    );

    if (!allPanelsHaveConfirmedSpeakers) {
      alert('Please confirm at least one speaker for each panel before proceeding.');
      return;
    }

    router.push({
      pathname: '/final',
      query: {
        panels: JSON.stringify(panels),
        eventName: router.query.eventName,
        mainTopic: router.query.mainTopic,
      },
    });
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Generating speaker recommendations...</h2>
        <p>This may take a moment.</p>
      </div>
    );
  }

  return (
    <div>
      <SuggestSpeakers
        panels={panels}
        onConfirm={onConfirm}
        onRegenerate={onRegenerate}
        onRemove={onRemove}
      />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <button
          onClick={handleProceed}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Proceed to Final Agenda
        </button>
      </div>
    </div>
  );
};

export default SpeakersPage;