'use client'

import Image from 'next/image'
import Link from 'next/link'
import { type Review } from '@/lib/supabase'
import { format } from 'date-fns'

type AlbumGridProps = {
  reviews: Review[]
}

export default function AlbumGrid({ reviews }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {reviews.map((review) => {
        const album = review.albums
        if (!album) return null

        return (
          <Link
            key={review.id}
            href={`/review/${review.id}`}
            className="group relative aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform"
          >
            {album.image_url ? (
              <Image
                src={album.image_url}
                alt={`${album.title} by ${album.artist}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-sm font-semibold">{album.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{album.artist}</p>
                </div>
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center p-4">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-400'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold">{album.title}</p>
                <p className="text-xs">{album.artist}</p>
                {review.favorite && (
                  <span className="text-red-400 text-xl mt-2">❤️</span>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

