-- VinylLog Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for future multi-user support, but single user for now)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spotify_id TEXT UNIQUE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Albums table (cache of album metadata)
CREATE TABLE IF NOT EXISTS albums (
  id TEXT PRIMARY KEY, -- Spotify Album ID or manual ID
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  image_url TEXT,
  release_year TEXT,
  spotify_id TEXT, -- Null if manually added
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table (your logged entries)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  album_id TEXT REFERENCES albums(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  listened_at DATE NOT NULL,
  favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, album_id, listened_at) -- Prevent duplicate logs for same album on same date
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_album_id ON reviews(album_id);
CREATE INDEX IF NOT EXISTS idx_reviews_listened_at ON reviews(listened_at);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

