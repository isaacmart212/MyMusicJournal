import Image from 'next/image'
import Link from 'next/link'
import { type Review } from '@/lib/supabase'

type RecentListensProps = {
  reviews: Review[]
}

export default function RecentListens({ reviews }: RecentListensProps) {
  // Get the 5 most recent reviews
  const recentReviews = reviews
    .sort((a, b) => new Date(b.listened_at).getTime() - new Date(a.listened_at).getTime())
    .slice(0, 5)

  if (recentReviews.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Listens</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recentReviews.map((review) => {
          const album = review.albums
          if (!album) return null

          return (
            <Link
              key={review.id}
              href={`/review/${review.id}`}
              className="flex-shrink-0 group"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform">
                {album.image_url ? (
                  <Image
                    src={album.image_url}
                    alt={`${album.title} by ${album.artist}`}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-center p-2">
                      <p className="text-xs font-semibold">{album.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{album.artist}</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

