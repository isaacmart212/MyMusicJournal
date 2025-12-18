import { supabase, type Album, type Review } from './supabase'

// Get all reviews with album data
export async function getReviews(userId?: string, sortBy: 'rating' | 'date' = 'date') {
  // First, get reviews
  let reviewsQuery = supabase
    .from('reviews')
    .select('*')

  if (userId) {
    reviewsQuery = reviewsQuery.eq('user_id', userId)
  }

  // Sort by rating (desc) or date (desc)
  if (sortBy === 'rating') {
    reviewsQuery = reviewsQuery.order('rating', { ascending: false })
  } else {
    reviewsQuery = reviewsQuery.order('listened_at', { ascending: false })
  }

  const { data: reviews, error: reviewsError } = await reviewsQuery

  if (reviewsError) {
    console.error('Error fetching reviews:', reviewsError)
    return []
  }

  if (!reviews || reviews.length === 0) {
    console.log('No reviews found in database')
    return []
  }

  console.log(`Found ${reviews.length} reviews in database`)

  // Get unique album IDs
  const albumIds = [...new Set(reviews.map(r => r.album_id))]
  
  if (albumIds.length === 0) {
    return []
  }

  // Fetch albums separately
  const { data: albums, error: albumsError } = await supabase
    .from('albums')
    .select('*')
    .in('id', albumIds)

  if (albumsError) {
    console.error('Error fetching albums:', albumsError)
    // Return reviews without album data rather than failing completely
  }

  // Create a map of albums by ID for quick lookup
  const albumsMap = new Map((albums || []).map(album => [album.id, album]))

  console.log(`Found ${albums?.length || 0} albums for ${reviews.length} reviews`)
  console.log('Album IDs from reviews:', albumIds)
  console.log('Album IDs found:', albums?.map(a => a.id) || [])

  // Combine reviews with their albums
  const reviewsWithAlbums = reviews.map(review => ({
    ...review,
    albums: albumsMap.get(review.album_id) || null
  }))

  const reviewsWithValidAlbums = reviewsWithAlbums.filter(r => r.albums !== null)
  console.log(`Returning ${reviewsWithValidAlbums.length} reviews with valid albums`)

  return reviewsWithValidAlbums as Review[]
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

