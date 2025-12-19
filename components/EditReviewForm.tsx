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
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/login')
          return
        }
        throw new Error('Failed to update review')
      }

      setIsEditing(false)
      setLoading(false)
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
        if (response.status === 401) {
          // Redirect to login if unauthorized
          router.push('/login')
          return
        }
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
      <div className="space-y-8">
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-[#1a1a1a] border border-[#1a1a1a] rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-[#737373] border border-[#e5e5e5] rounded-sm hover:bg-[#f5f5f5] disabled:opacity-50 transition-colors"
          >
            Delete
          </button>
        </div>

        <div>
          <p className="text-xs font-medium mb-3 text-[#737373] uppercase tracking-wide">Rating</p>
          <StarRating rating={review.rating} onRatingChange={() => {}} readOnly />
        </div>

        <div>
          <p className="text-xs font-medium mb-2 text-[#737373] uppercase tracking-wide">Date Listened</p>
          <p className="text-sm text-[#1a1a1a]">
            {format(new Date(review.listened_at), 'MMMM d, yyyy')}
          </p>
        </div>

        {review.favorite && (
          <div className="flex items-center gap-2 pt-2">
            <span className="text-sm">❤️</span>
            <span className="text-sm text-[#1a1a1a]">Favorite</span>
          </div>
        )}

        {review.review_text && (
          <div>
            <p className="text-xs font-medium mb-3 text-[#737373] uppercase tracking-wide">Review</p>
            <p className="text-sm text-[#1a1a1a] whitespace-pre-wrap leading-relaxed">
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
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium mb-3 text-[#737373] uppercase tracking-wide">Rating *</label>
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

      <div className="flex gap-3 pt-4 border-t border-[#e5e5e5]">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-sm font-medium text-[#1a1a1a] border border-[#1a1a1a] rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="px-6 py-2 text-sm font-medium text-[#737373] border border-[#e5e5e5] rounded-sm hover:bg-[#f5f5f5] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

