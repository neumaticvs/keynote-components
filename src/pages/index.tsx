import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EventCreator from '@/components/CreateEvent';

interface FormData {
  eventName: string;
  mainTopic: string;
  additionalInfo: string;
  numberOfPanels: number;
}

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/generate-topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { panels } = await response.json();

      await router.push({
        pathname: '/topics',
        query: {
          panels: JSON.stringify(panels),
          eventName: formData.eventName,
          mainTopic: formData.mainTopic,
        },
      });
    } catch (error) {
      console.error('Error generating topics:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate topics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventCreator onSubmit={handleCreate} isLoading={loading} />
  );
};

export default HomePage;