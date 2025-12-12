import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Check if tables exist and can be queried
    const [albumsResult, reviewsResult] = await Promise.all([
      supabase.from('albums').select('count', { count: 'exact', head: true }),
      supabase.from('reviews').select('count', { count: 'exact', head: true }),
    ])

    // Try to get a few reviews with albums
    const reviewsWithAlbums = await supabase
      .from('reviews')
      .select(`
        *,
        albums (*)
      `)
      .limit(5)

    return NextResponse.json({
      success: true,
      albums: {
        count: albumsResult.count,
        error: albumsResult.error,
      },
      reviews: {
        count: reviewsResult.count,
        error: reviewsResult.error,
      },
      sampleReviews: {
        data: reviewsWithAlbums.data,
        error: reviewsWithAlbums.error,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error,
      },
      { status: 500 }
    )
  }
}

