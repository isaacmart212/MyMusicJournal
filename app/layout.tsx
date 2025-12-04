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
    <html lang="en">
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white">
        {children}
      </body>
    </html>
  )
}

