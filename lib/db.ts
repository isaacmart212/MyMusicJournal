import { supabase, type Album, type Review } from './supabase'

// Get all reviews with album data
export async function getReviews(userId?: string, sortBy: 'rating' | 'date' = 'date') {
  let query = supabase
    .from('reviews')
    .select(`
      *,
      albums (*)
    `)

  if (userId) {
    query = query.eq('user_id', userId)
  }

  // Sort by rating (desc) or date (desc)
  if (sortBy === 'rating') {
    query = query.order('rating', { ascending: false })
  } else {
    query = query.order('listened_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return data as Review[]
}

// Get a single review by ID
export async function getReviewById(id: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      albums (*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching review:', error)
    return null
  }

  return data as Review
}

// Create or update an album
export async function upsertAlbum(album: {
  id: string
  title: string
  artist: string
  image_url?: string | null
  release_year?: string | null
  spotify_id?: string | null
}) {
  const { data, error } = await supabase
    .from('albums')
    .upsert(album, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    console.error('Error upserting album:', error)
    throw error
  }

  return data as Album
}

// Create a review
export async function createReview(review: {
  user_id?: string | null
  album_id: string
  rating: number
  review_text?: string | null
  listened_at: string
  favorite?: boolean
}) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select(`
      *,
      albums (*)
    `)
    .single()

  if (error) {
    console.error('Error creating review:', error)
    throw error
  }

  return data as Review
}

// Update a review
export async function updateReview(
  id: string,
  updates: {
    rating?: number
    review_text?: string | null
    listened_at?: string
    favorite?: boolean
  }
) {
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      albums (*)
    `)
    .single()

  if (error) {
    console.error('Error updating review:', error)
    throw error
  }

  return data as Review
}

// Delete a review
export async function deleteReview(id: string) {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}

