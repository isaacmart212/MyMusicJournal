import { getReviews } from '@/lib/db'
import { supabase } from '@/lib/supabase'

export default async function TestPage() {
  // Test direct database queries
  const [reviewsResult, albumsResult, reviewsWithAlbums] = await Promise.all([
    supabase.from('reviews').select('*').limit(10),
    supabase.from('albums').select('*').limit(10),
    getReviews(),
  ])

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Database Test Page</h1>

      <div className="space-y-8">
        {/* Raw Reviews Query */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw Reviews Query</h2>
          {reviewsResult.error ? (
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded">
              <p className="font-bold">Error:</p>
              <pre className="mt-2 text-sm overflow-auto">
                {JSON.stringify(reviewsResult.error, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <p className="mb-2">Count: {reviewsResult.data?.length || 0}</p>
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded text-sm overflow-auto">
                {JSON.stringify(reviewsResult.data, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* Raw Albums Query */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw Albums Query</h2>
          {albumsResult.error ? (
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded">
              <p className="font-bold">Error:</p>
              <pre className="mt-2 text-sm overflow-auto">
                {JSON.stringify(albumsResult.error, null, 2)}
              </pre>
            </div>
          ) : (
            <div>
              <p className="mb-2">Count: {albumsResult.data?.length || 0}</p>
              <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded text-sm overflow-auto">
                {JSON.stringify(albumsResult.data, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* getReviews Function Result */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">getReviews() Function Result</h2>
          <div>
            <p className="mb-2">Count: {reviewsWithAlbums.length}</p>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(reviewsWithAlbums, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </main>
  )
}

