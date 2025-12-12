-- Check current RLS policies
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
