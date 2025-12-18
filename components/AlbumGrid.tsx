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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {reviews.map((review) => {
        const album = review.albums
        if (!album) return null

        return (
          <Link
            key={review.id}
            href={`/review/${review.id}`}
            className="group relative aspect-square overflow-hidden rounded-sm hover:opacity-80 transition-opacity"
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
              <div className="w-full h-full bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-xs font-medium text-[#1a1a1a]">{album.title}</p>
                  <p className="text-xs text-[#737373] mt-1">{album.artist}</p>
                </div>
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center p-4">
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < review.rating ? 'text-white' : 'text-white/40'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs font-medium">{album.title}</p>
                <p className="text-xs text-white/80 mt-0.5">{album.artist}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

