import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventPanelTopics from '@/components/PanelTopics';
import { PanelTopic } from '@/lib/parse';
import { supabase } from '@/lib/supabaseClient';

const TopicsPage = () => {
  const router = useRouter();
  const [panels, setPanels] = useState<PanelTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const { data: panels } = await supabase.from('panels').select('*');
        if (panels) {
          setPanels(panels.map(p => ({ 
            ...p, 
            id: p.id,
            panelNumber: p.panel_number,
            suggestedTopic: p.suggested_topic,
            justification: p.justification,
            isConfirmed: false, 
            isRegenerating: false 
          })));
        }
      } catch (error) {
        console.error('Failed to fetch panels:', error);
        alert('Failed to load panels. Redirecting to home...');
        router.push('/');
      }
    };

    fetchPanels();
  }, [router]);

  const onTopicConfirm = (panelId: string) => {
    setPanels(prevPanels => 
      prevPanels.map(panel => 
        panel.id === panelId 
          ? { ...panel, isConfirmed: true }
          : panel
      )
    );
  };

  const onTopicRegenerate = async (panelId: string) => {
    setIsLoading(true);
    setPanels(prevPanels =>
      prevPanels.map(panel =>
        panel.id === panelId
          ? { ...panel, isRegenerating: true }
          : panel
      )
    );

    try {
      const response = await fetch('/api/regenerate-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ panelId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { topic } = await response.json();

      setPanels(prevPanels =>
        prevPanels.map(panel =>
          panel.id === panelId
            ? {
                ...panel,
                suggestedTopic: topic.suggestedTopic,
                justification: topic.justification,
                isConfirmed: false,
                isRegenerating: false,
              }
            : panel
        )
      );
    } catch (error) {
      console.error('Error regenerating topic:', error);
      alert(error instanceof Error ? error.message : 'Failed to regenerate topic. Please try again.');
      
      setPanels(prevPanels =>
        prevPanels.map(panel =>
          panel.id === panelId
            ? { ...panel, isRegenerating: false }
            : panel
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onNextStep = () => {
    const confirmedPanels = panels.filter(panel => panel.isConfirmed);
    
    if (confirmedPanels.length === 0) {
      alert('Please confirm at least one topic before proceeding.');
      return;
    }

    router.push({
      pathname: '/speakers',
      query: {
        panels: JSON.stringify(confirmedPanels),
        eventName: router.query.eventName,
        mainTopic: router.query.mainTopic,
      },
    });
  };

  return (
    <EventPanelTopics
      panels={panels}
      onTopicConfirm={onTopicConfirm}
      onTopicRegenerate={onTopicRegenerate}
      onNextStep={onNextStep}
    />
  );
};

export default TopicsPage;