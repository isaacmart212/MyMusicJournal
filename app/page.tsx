import Link from 'next/link'
import { getReviews } from '@/lib/db'
import AlbumGrid from '@/components/AlbumGrid'
import RecentListens from '@/components/RecentListens'
import Navigation from '@/components/Navigation'
import SortControls from '@/components/SortControls'

export default async function Home({
  searchParams,
}: {
  searchParams: { sortBy?: 'rating' | 'date' }
}) {
  // For now, we'll fetch without user_id (single user mode)
  // In production, you'd get this from auth
  const sortBy = searchParams?.sortBy || 'date'
  const reviews = await getReviews(undefined, sortBy)

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">VinylLog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track, rate, and review your music collection
        </p>
      </header>

      <Navigation />

      {reviews.length > 0 && <RecentListens reviews={reviews} />}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Your Collection</h2>
            {reviews.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {reviews.length} {reviews.length === 1 ? 'album' : 'albums'} logged
              </p>
            )}
          </div>
          {reviews.length > 0 && <SortControls />}
        </div>
        {reviews.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No albums logged yet. Start by logging your first album!
            </p>
            <Link
              href="/log"
              className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80"
            >
              Log Your First Album
            </Link>
          </div>
        ) : (
          <AlbumGrid reviews={reviews} />
        )}
      </div>
    </main>
  )
}

