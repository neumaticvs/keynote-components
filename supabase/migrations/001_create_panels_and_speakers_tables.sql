-- Create panels table based on PanelTopic interface
CREATE TABLE panels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_number INTEGER NOT NULL,
  suggested_topic TEXT NOT NULL,
  justification TEXT NOT NULL,
  is_confirmed BOOLEAN NOT NULL DEFAULT false,
  is_regenerating BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create speakers table based on Speaker interface
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id UUID REFERENCES panels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  expertise TEXT[] DEFAULT '{}',
  bio TEXT NOT NULL,
  image_url TEXT,
  linked_in TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_panels_panel_number ON panels(panel_number);
CREATE INDEX idx_speakers_panel_id ON speakers(panel_id);
CREATE INDEX idx_speakers_name ON speakers(name);

-- Add update trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_panels_updated_at BEFORE UPDATE ON panels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_speakers_updated_at BEFORE UPDATE ON speakers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();