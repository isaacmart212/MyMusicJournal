'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type SortOption = 'date' | 'rating'

export default function SortControls() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = (searchParams.get('sortBy') as SortOption) || 'date'

  const handleSortChange = (sortBy: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sortBy', sortBy)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleSortChange('date')}
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
          currentSort === 'date'
            ? 'text-[#1a1a1a] border-b border-[#1a1a1a]'
            : 'text-[#737373] hover:text-[#1a1a1a]'
        }`}
      >
        Date
      </button>
      <button
        onClick={() => handleSortChange('rating')}
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
          currentSort === 'rating'
            ? 'text-[#1a1a1a] border-b border-[#1a1a1a]'
            : 'text-[#737373] hover:text-[#1a1a1a]'
        }`}
      >
        Rating
      </button>
    </div>
  )
}

