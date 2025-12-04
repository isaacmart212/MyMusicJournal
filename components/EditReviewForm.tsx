'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StarRating from './StarRating'
import { format } from 'date-fns'
import { type Review } from '@/lib/supabase'

type EditReviewFormProps = {
  review: Review
}

export default function EditReviewForm({ review }: EditReviewFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    rating: review.rating,
    review_text: review.review_text || '',
    listened_at: format(new Date(review.listened_at), 'yyyy-MM-dd'),
    favorite: review.favorite,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.rating === 0) {
      setError('Please provide a rating')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: formData.rating,
          review_text: formData.review_text || null,
          listened_at: formData.listened_at,
          favorite: formData.favorite,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update review')
      }

      setIsEditing(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete review')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80"
          >
            Edit Review
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50"
          >
            Delete
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Your Rating</h2>
          <StarRating rating={review.rating} onRatingChange={() => {}} readOnly />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Date Listened</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {format(new Date(review.listened_at), 'MMMM d, yyyy')}
          </p>
        </div>

        {review.favorite && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <span className="text-sm font-medium">Marked as favorite</span>
          </div>
        )}

        {review.review_text && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Review</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {review.review_text}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Rating *</label>
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

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false)
            setFormData({
              rating: review.rating,
              review_text: review.review_text || '',
              listened_at: format(new Date(review.listened_at), 'yyyy-MM-dd'),
              favorite: review.favorite,
            })
            setError(null)
          }}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

