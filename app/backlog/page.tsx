import Navigation from '@/components/Navigation'

export default function BacklogPage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">VinylLog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track, rate, and review your music collection
        </p>
      </header>

      <Navigation />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Spotify Backlog</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Import your saved albums from Spotify
        </p>
      </div>

      <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Spotify integration coming soon!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          This feature will allow you to import your saved albums from Spotify and log them easily.
        </p>
      </div>
    </main>
  )
}

