// Parsing utilities for topics and speakers

export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'keynote' | 'panel' | 'workshop' | 'breakout';
}

export function parseTopics(rawText: string): Topic[] {
  // TODO: Implement topic parsing logic
  // This will parse AI-generated text into structured topics
  
  const topics: Topic[] = [];
  
  return topics;
}

export function parseSpeakers(rawText: string): any[] {
  // TODO: Implement speaker parsing logic
  // This will parse AI-generated text into structured speaker data
  
  const speakers: any[] = [];
  
  return speakers;
}