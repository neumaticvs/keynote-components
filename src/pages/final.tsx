import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventAgenda from '@/components/FinalOutput';
import { PanelTopic } from '@/lib/parse';
import { Speaker } from '@/lib/people';

interface PanelWithSpeakers extends PanelTopic {
  speakers?: Array<Speaker & { id: string; isConfirmed?: boolean }>;
}

const FinalPage = () => {
  const router = useRouter();
  const [panels, setPanels] = useState<PanelWithSpeakers[]>([]);
  const [eventName, setEventName] = useState<string>('');
  const [mainTopic, setMainTopic] = useState<string>('');

  useEffect(() => {
    if (router.query.panels) {
      try {
        const parsedPanels = JSON.parse(router.query.panels as string);
        setPanels(parsedPanels);
      } catch (error) {
        console.error('Failed to parse panels:', error);
        alert('Invalid panel data. Redirecting to home...');
        router.push('/');
      }
    }

    if (router.query.eventName) {
      setEventName(router.query.eventName as string);
    }

    if (router.query.mainTopic) {
      setMainTopic(router.query.mainTopic as string);
    }
  }, [router.query]);

  const downloadCSV = () => {
    // Create CSV headers
    const headers = [
      'Panel ID',
      'Panel Number',
      'Panel Topic',
      'Justification',
      'Speaker Name',
      'Speaker Title',
      'Speaker Bio',
      'Speaker Expertise',
      'Speaker LinkedIn',
      'Speaker Confirmed'
    ];

    // Create CSV rows
    const rows: string[][] = [];
    
    panels.forEach(panel => {
      const confirmedSpeakers = panel.speakers?.filter(speaker => speaker.isConfirmed) || [];
      
      if (confirmedSpeakers.length === 0) {
        // If no confirmed speakers, still add panel info
        rows.push([
          panel.id,
          panel.panelNumber.toString(),
          panel.suggestedTopic,
          panel.justification,
          '',
          '',
          '',
          '',
          '',
          ''
        ]);
      } else {
        // Add a row for each confirmed speaker
        confirmedSpeakers.forEach(speaker => {
          rows.push([
            panel.id,
            panel.panelNumber.toString(),
            panel.suggestedTopic,
            panel.justification,
            speaker.name,
            speaker.title,
            speaker.bio,
            speaker.expertise.join('; '),
            speaker.linkedIn || '',
            'Yes'
          ]);
        });
      }
    });

    // Convert to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(field => 
          // Escape commas and quotes in CSV fields
          `"${field.toString().replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventName || 'event'}-agenda.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <EventAgenda
        eventName={eventName}
        mainTopic={mainTopic}
        panels={panels}
      />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <button
          onClick={downloadCSV}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Download CSV
        </button>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default FinalPage;