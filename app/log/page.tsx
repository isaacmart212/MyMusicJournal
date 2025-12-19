import LogAlbumForm from '@/components/LogAlbumForm'
import Navigation from '@/components/Navigation'
import { requireAuth } from '@/lib/auth-helpers'

export default async function LogAlbumPage() {
  // Require authentication
  await requireAuth()

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-light mb-2 text-[#1a1a1a]">VinylLog</h1>
        <p className="text-sm text-[#737373]">
          Track and review your music collection
        </p>
      </header>

      <Navigation />

      <LogAlbumForm />
    </main>
  )
}

