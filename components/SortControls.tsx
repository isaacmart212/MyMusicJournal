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
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
      <button
        onClick={() => handleSortChange('date')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentSort === 'date'
            ? 'bg-black dark:bg-white text-white dark:text-black'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
      >
        Date
      </button>
      <button
        onClick={() => handleSortChange('rating')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentSort === 'rating'
            ? 'bg-black dark:bg-white text-white dark:text-black'
            : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
        }`}
      >
        Rating
      </button>
    </div>
  )
}

