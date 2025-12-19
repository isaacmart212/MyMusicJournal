import Link from 'next/link'
import { getReviews } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import AlbumGrid from '@/components/AlbumGrid'
import Navigation from '@/components/Navigation'
import SortControls from '@/components/SortControls'

export const revalidate = 0

export default async function Home({
  searchParams,
}: {
  searchParams: { sortBy?: 'rating' | 'date' }
}) {
  // Require authentication
  await requireAuth()

  const sortBy = searchParams?.sortBy || 'date'
  const reviews = await getReviews(sortBy)

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-light mb-2 text-[#1a1a1a]">VinylLog</h1>
        <p className="text-sm text-[#737373]">
          Track and review your music collection
        </p>
      </header>

      <Navigation />

      {reviews.length > 0 && (
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-[#737373]">
            {reviews.length} {reviews.length === 1 ? 'album' : 'albums'}
          </p>
          <SortControls />
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#737373] mb-6 text-sm">
            No albums logged yet
          </p>
          <Link
            href="/log"
            className="inline-block px-6 py-2 text-sm font-medium text-[#1a1a1a] border border-[#e5e5e5] rounded hover:bg-[#f5f5f5] transition-colors"
          >
            Log Your First Album
          </Link>
        </div>
      ) : (
        <AlbumGrid reviews={reviews} />
      )}
    </main>
  )
}

