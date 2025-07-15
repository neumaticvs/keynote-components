-- Add confirmed column to speakers table
ALTER TABLE speakers ADD COLUMN confirmed BOOLEAN NOT NULL DEFAULT false;