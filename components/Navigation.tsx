import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="mb-12 flex items-center gap-6">
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
    </nav>
  )
}

