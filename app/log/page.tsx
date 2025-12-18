import LogAlbumForm from '@/components/LogAlbumForm'
import Navigation from '@/components/Navigation'

export default function LogAlbumPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-light mb-2 text-[#1a1a1a]">MyMusicJournal</h1>
        <p className="text-sm text-[#737373]">
          Track and review your music collection
        </p>
      </header>

      <Navigation />

      <LogAlbumForm />
    </main>
  )
}

