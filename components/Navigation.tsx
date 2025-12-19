'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-[#1a1a1a] hover:text-[#737373] transition-colors"
        >
          Collection
        </Link>
        <Link
          href="/log"
          className="text-sm font-medium text-[#1a1a1a] hover:text-[#737373] transition-colors"
        >
          Log Album
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#737373]">
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-[#737373] hover:text-[#1a1a1a] transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

