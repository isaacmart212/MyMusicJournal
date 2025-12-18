'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StarRating from './StarRating'
import { format } from 'date-fns'

export default function LogAlbumForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    release_year: '',
    image_url: '',
    rating: 0,
    review_text: '',
    listened_at: format(new Date(), 'yyyy-MM-dd'),
    favorite: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.title || !formData.artist) {
      setError('Title and Artist are required')
      setLoading(false)
      return
    }

    if (formData.rating === 0) {
      setError('Please provide a rating')
      setLoading(false)
      return
    }

    try {
      // Generate a unique ID for the album (simple timestamp-based for manual entries)
      const albumId = `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // First, create/update the album
      const albumResponse = await fetch('/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: albumId,
          title: formData.title,
          artist: formData.artist,
          release_year: formData.release_year || null,
          image_url: formData.image_url || null,
          spotify_id: null,
        }),
      })

      const albumData = await albumResponse.json()

      if (!albumResponse.ok) {
        const errorMsg = albumData?.error || albumData?.message || 'Failed to save album'
        console.error('Album creation failed:', errorMsg, albumData)
        setError(errorMsg)
        setLoading(false)
        return
      }

      // Then, create the review
      const reviewResponse = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          album_id: albumId,
          rating: formData.rating,
          review_text: formData.review_text || null,
          listened_at: formData.listened_at,
          favorite: formData.favorite,
        }),
      })

      const reviewData = await reviewResponse.json()

      if (!reviewResponse.ok) {
        const errorMsg = reviewData?.error || reviewData?.message || 'Failed to save review'
        console.error('Review creation failed:', errorMsg, reviewData)
        setError(errorMsg)
        setLoading(false)
        return
      }

      // Redirect to home page with cache busting
      router.push('/?t=' + Date.now())
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Album Info */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Album Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="Enter album title"
            />
          </div>

          <div>
            <label htmlFor="artist" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Artist *
            </label>
            <input
              type="text"
              id="artist"
              required
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label htmlFor="release_year" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Release Year
            </label>
            <input
              type="text"
              id="release_year"
              value={formData.release_year}
              onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="e.g., 2023"
            />
          </div>

          <div>
            <label htmlFor="image_url" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Album Cover URL
            </label>
            <input
              type="url"
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="https://example.com/album-cover.jpg"
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Album preview"
                className="mt-3 w-24 h-24 object-cover rounded-sm border border-[#e5e5e5]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column - Review Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium mb-3 text-[#737373] uppercase tracking-wide">
              Rating *
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => setFormData({ ...formData, rating })}
            />
          </div>

          <div>
            <label htmlFor="listened_at" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Date Listened *
            </label>
            <input
              type="date"
              id="listened_at"
              required
              value={formData.listened_at}
              onChange={(e) => setFormData({ ...formData, listened_at: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="review_text" className="block text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">
              Review / Notes
            </label>
            <textarea
              id="review_text"
              rows={6}
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              className="w-full px-3 py-2 border border-[#e5e5e5] rounded-sm bg-white text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
              placeholder="Write your thoughts about this album..."
            />
          </div>

          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.favorite}
              onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
              className="w-4 h-4 mr-2 text-[#1a1a1a] border-[#e5e5e5] rounded-sm focus:ring-[#1a1a1a]"
            />
            <label htmlFor="favorite" className="text-sm text-[#1a1a1a]">
              Mark as favorite
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-[#e5e5e5]">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-sm font-medium text-[#1a1a1a] border border-[#1a1a1a] rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Review'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-2 text-sm font-medium text-[#737373] border border-[#e5e5e5] rounded-sm hover:bg-[#f5f5f5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

