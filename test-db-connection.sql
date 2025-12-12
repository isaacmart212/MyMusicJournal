-- Test database connection and RLS policies
-- Run this in Supabase SQL Editor to diagnose issues

-- 1. Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('albums', 'reviews', 'users');

-- 2. Check RLS status
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('albums', 'reviews');

-- 3. Check existing policies
SELECT 
  schemaname, 
  tablename, 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename IN ('albums', 'reviews')
ORDER BY tablename, policyname;

-- 4. Test insert (this should work if RLS is configured correctly)
-- Uncomment to test:
-- INSERT INTO albums (id, title, artist) 
-- VALUES ('test_123', 'Test Album', 'Test Artist')
-- ON CONFLICT (id) DO NOTHING;

-- 5. Count existing records
SELECT 
  'albums' as table_name, 
  COUNT(*) as count 
FROM albums
UNION ALL
SELECT 
  'reviews' as table_name, 
  COUNT(*) as count 
FROM reviews;

