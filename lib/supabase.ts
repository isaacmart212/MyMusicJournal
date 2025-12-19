import { createClient as createBrowserClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Legacy client for backward compatibility
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Re-export new client utilities
export { createClient } from './supabase-client'
export { createServerSupabaseClient } from './supabase-server'

// Types for our database
export type Album = {
  id: string
  title: string
  artist: string
  image_url: string | null
  release_year: string | null
  spotify_id: string | null
  created_at: string
}

export type Review = {
  id: string
  user_id: string | null
  album_id: string
  rating: number
  review_text: string | null
  listened_at: string
  favorite: boolean
  created_at: string
  updated_at: string
  albums?: Album
}

export type User = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

