import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VinylLog - Track Your Music',
  description: 'A personal music album tracking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className="antialiased bg-[#fafafa] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  )
}

