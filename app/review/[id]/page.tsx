import { notFound } from 'next/navigation'
import { getReviewById } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'
import Image from 'next/image'
import Link from 'next/link'
import EditReviewForm from '@/components/EditReviewForm'
import Navigation from '@/components/Navigation'

export default async function ReviewPage({ params }: { params: { id: string } }) {
  // Require authentication
  await requireAuth()

  const review = await getReviewById(params.id)

  if (!review || !review.albums) {
    notFound()
  }

  const album = review.albums

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">VinylLog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track, rate, and review your music collection
        </p>
      </header>

      <Navigation />

      <Link
        href="/"
        className="inline-block mb-6 text-gray-600 dark:text-gray-400 hover:underline"
      >
        ← Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Album Cover */}
        <div className="relative aspect-square">
          {album.image_url ? (
            <Image
              src={album.image_url}
              alt={`${album.title} by ${album.artist}`}
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-xl font-semibold">{album.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{album.artist}</p>
              </div>
            </div>
          )}
        </div>

        {/* Review Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">{album.artist}</p>
            {album.release_year && (
              <p className="text-sm text-gray-500 dark:text-gray-500">{album.release_year}</p>
            )}
          </div>

          <EditReviewForm review={review} />
        </div>
      </div>
    </main>
  )
}

