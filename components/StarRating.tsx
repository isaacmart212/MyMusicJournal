'use client'

import { useState } from 'react'

type StarRatingProps = {
  rating: number
  onRatingChange: (rating: number) => void
  readOnly?: boolean
}

export default function StarRating({ rating, onRatingChange, readOnly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (value: number) => {
    if (!readOnly) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (!readOnly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0)
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1
        const filled = value <= displayRating

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            className={`
              text-2xl transition-colors
              ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              ${filled ? 'text-[#1a1a1a]' : 'text-[#e5e5e5]'}
            `}
            aria-label={`Rate ${value} stars`}
          >
            ★
          </button>
        )
      })}
      {!readOnly && (
        <span className="ml-3 text-xs text-[#737373]">
          {rating > 0 ? `${rating}/5` : 'Click to rate'}
        </span>
      )}
    </div>
  )
}

