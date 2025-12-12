-- Complete fix for RLS issues
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Drop ALL existing policies on albums and reviews
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE tablename IN ('albums', 'reviews')) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- Step 2: Disable RLS temporarily to reset
ALTER TABLE albums DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Step 4: Create new policies that allow ALL operations
-- For albums table
CREATE POLICY "albums_all_access" ON albums
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- For reviews table  
CREATE POLICY "reviews_all_access" ON reviews
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Step 5: Verify policies were created
SELECT 
  tablename, 
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename IN ('albums', 'reviews')
ORDER BY tablename;

-- Step 6: Test insert (optional - uncomment to test)
-- INSERT INTO albums (id, title, artist) 
-- VALUES ('test_' || extract(epoch from now())::text, 'Test Album', 'Test Artist')
-- ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;
-- 
-- SELECT * FROM albums WHERE id LIKE 'test_%';
-- DELETE FROM albums WHERE id LIKE 'test_%';

