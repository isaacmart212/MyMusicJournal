import LogAlbumForm from '@/components/LogAlbumForm'
import Navigation from '@/components/Navigation'

export default function LogAlbumPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">VinylLog</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track, rate, and review your music collection
        </p>
      </header>

      <Navigation />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Log Album</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new album to your collection
        </p>
      </div>

      <LogAlbumForm />
    </main>
  )
}

