// Parsing utilities for topics and speakers

import { Speaker } from './people';

export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'keynote' | 'panel' | 'workshop' | 'breakout';
}

export interface PanelTopic {
  id: string;
  panelNumber: number;
  suggestedTopic: string;
  justification: string;
  isConfirmed: boolean;
  isRegenerating: boolean;
}

export function parseTopics(rawText: string): PanelTopic[] {
  const lines = rawText.split('\n');
  const topics: PanelTopic[] = [];
  const panelRegex = /^Panel\s+(\d+):\s*(.+?)\s*–\s*(.+)$/;
  
  for (const line of lines) {
    const match = line.match(panelRegex);
    if (match) {
      const [, panelNumberStr, suggestedTopic, justification] = match;
      const panelNumber = parseInt(panelNumberStr, 10);
      
      topics.push({
        id: `panel-${panelNumber}`,
        panelNumber,
        suggestedTopic: suggestedTopic.trim(),
        justification: justification.trim(),
        isConfirmed: false,
        isRegenerating: false,
      });
    }
  }
  
  return topics;
}

export function parseSpeakers(rawText: string): Speaker[] {
  const speakers: Speaker[] = [];
  
  // First try to parse as JSON
  try {
    const jsonData = JSON.parse(rawText);
    if (Array.isArray(jsonData)) {
      return jsonData.map((speaker, index) => ({
        name: speaker.name || `Speaker ${index + 1}`,
        title: speaker.title || 'Industry Expert',
        expertise: speaker.expertise || [],
        bio: speaker.bio || speaker.justification || 'Experienced professional in their field.',
        imageUrl: speaker.imageUrl,
        linkedIn: speaker.linkedIn,
        twitter: speaker.twitter,
      }));
    }
  } catch {
    // If JSON parsing fails, parse as formatted text
  }
  
  // Parse formatted text (Speaker N: Name – Title format)
  const lines = rawText.split('\n');
  let currentSpeaker: Partial<Speaker> | null = null;
  let speakerNumber = 0;
  
  const speakerRegex = /^Speaker\s+(\d+):\s*(.+?)\s*–\s*(.+)$/i;
  const bioRegex = /^Bio:\s*(.+)$/i;
  const expertiseRegex = /^Expertise:\s*(.+)$/i;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check for speaker header
    const speakerMatch = trimmedLine.match(speakerRegex);
    if (speakerMatch) {
      // Save previous speaker if exists
      if (currentSpeaker && currentSpeaker.name) {
        speakers.push({
          name: currentSpeaker.name,
          title: currentSpeaker.title || 'Industry Expert',
          expertise: currentSpeaker.expertise || [],
          bio: currentSpeaker.bio || 'Experienced professional and thought leader.',
          imageUrl: currentSpeaker.imageUrl,
          linkedIn: currentSpeaker.linkedIn,
          twitter: currentSpeaker.twitter,
        });
      }
      
      // Start new speaker
      const [, , name, title] = speakerMatch;
      speakerNumber++;
      currentSpeaker = {
        name: name.trim(),
        title: title.trim(),
        expertise: [],
        bio: '',
      };
      continue;
    }
    
    // Check for bio line
    const bioMatch = trimmedLine.match(bioRegex);
    if (bioMatch && currentSpeaker) {
      currentSpeaker.bio = bioMatch[1].trim();
      continue;
    }
    
    // Check for expertise line
    const expertiseMatch = trimmedLine.match(expertiseRegex);
    if (expertiseMatch && currentSpeaker) {
      const expertiseList = expertiseMatch[1]
        .split(',')
        .map(exp => exp.trim())
        .filter(exp => exp.length > 0);
      currentSpeaker.expertise = expertiseList;
      continue;
    }
    
    // If we have a current speaker and the line is not empty, 
    // it might be a continuation of the bio
    if (currentSpeaker && trimmedLine && !trimmedLine.match(/^Speaker\s+\d+:/i)) {
      if (!currentSpeaker.bio) {
        currentSpeaker.bio = trimmedLine;
      } else if (!bioMatch && !expertiseMatch) {
        currentSpeaker.bio += ' ' + trimmedLine;
      }
    }
  }
  
  // Don't forget the last speaker
  if (currentSpeaker && currentSpeaker.name) {
    speakers.push({
      name: currentSpeaker.name,
      title: currentSpeaker.title || 'Industry Expert',
      expertise: currentSpeaker.expertise || [],
      bio: currentSpeaker.bio || 'Experienced professional and thought leader.',
      imageUrl: currentSpeaker.imageUrl,
      linkedIn: currentSpeaker.linkedIn,
      twitter: currentSpeaker.twitter,
    });
  }
  
  return speakers;
}