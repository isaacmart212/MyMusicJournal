import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="mb-8 flex gap-4">
      <Link
        href="/"
        className="px-4 py-2 bg-[#ECBBE5] dark:bg-[#ECBBE5] text-white dark:text-black rounded hover:opacity-80"
      >
        My Collection
      </Link>
      <Link
        href="/log"
        className="px-4 py-2 border border-[#ECBBE5] dark:border-[#ECBBE5] rounded hover:bg-gray-100 dark:hover:bg-gray-900 text-white"
      >
        Log Album
      </Link>
      <Link
        href="/backlog"
        className="px-4 py-2 border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        Backlog (Coming Soon)
      </Link>
    </nav>
  )
}

