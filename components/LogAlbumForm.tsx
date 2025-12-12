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

      console.log('Creating album with ID:', albumId)
      console.log('Album data:', {
        id: albumId,
        title: formData.title,
        artist: formData.artist,
        release_year: formData.release_year || null,
        image_url: formData.image_url || null,
        spotify_id: null,
      })

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
      console.log('Album response status:', albumResponse.status)
      console.log('Album response data:', albumData)

      if (!albumResponse.ok) {
        const errorMsg = albumData?.error || albumData?.message || `HTTP ${albumResponse.status}: Failed to save album`
        console.error('Album creation failed:', errorMsg, albumData)
        setError(`Album Error: ${errorMsg}`)
        setLoading(false)
        return
      }

      console.log('Album created successfully, now creating review...')

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
      console.log('Review response status:', reviewResponse.status)
      console.log('Review response data:', reviewData)

      if (!reviewResponse.ok) {
        const errorMsg = reviewData?.error || reviewData?.message || `HTTP ${reviewResponse.status}: Failed to save review`
        console.error('Review creation failed:', errorMsg, reviewData)
        setError(`Review Error: ${errorMsg}`)
        setLoading(false)
        return
      }

      console.log('Both album and review created successfully! Redirecting...')

      // Redirect to home page
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Unexpected error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Album Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Album Information</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Album Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
              placeholder="Enter album title"
            />
          </div>

          <div>
            <label htmlFor="artist" className="block text-sm font-medium mb-2">
              Artist *
            </label>
            <input
              type="text"
              id="artist"
              required
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label htmlFor="release_year" className="block text-sm font-medium mb-2">
              Release Year
            </label>
            <input
              type="text"
              id="release_year"
              value={formData.release_year}
              onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
              placeholder="e.g., 2023"
            />
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium mb-2">
              Album Cover URL
            </label>
            <input
              type="url"
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
              placeholder="https://example.com/album-cover.jpg"
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Album preview"
                className="mt-2 w-32 h-32 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column - Review Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Review</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Rating *
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => setFormData({ ...formData, rating })}
            />
          </div>

          <div>
            <label htmlFor="listened_at" className="block text-sm font-medium mb-2">
              Date Listened *
            </label>
            <input
              type="date"
              id="listened_at"
              required
              value={formData.listened_at}
              onChange={(e) => setFormData({ ...formData, listened_at: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="review_text" className="block text-sm font-medium mb-2">
              Review / Notes
            </label>
            <textarea
              id="review_text"
              rows={6}
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white"
              placeholder="Write your thoughts about this album..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.favorite}
              onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="favorite" className="text-sm font-medium">
              Mark as favorite ❤️
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Review'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

