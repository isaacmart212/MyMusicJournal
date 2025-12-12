-- Quick fix for RLS (Row Level Security) issues
-- Run this in Supabase SQL Editor to fix the "row-level security policy" error

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow all operations on albums" ON albums;
DROP POLICY IF EXISTS "Allow all operations on reviews" ON reviews;

-- Make sure RLS is enabled
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (for single-user mode)
CREATE POLICY "Allow all operations on albums" ON albums
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on reviews" ON reviews
  FOR ALL USING (true) WITH CHECK (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('albums', 'reviews');

