import { NextRequest, NextResponse } from 'next/server'
import { createReview, getReviews, updateReview, deleteReview } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sortBy = (searchParams.get('sortBy') as 'rating' | 'date') || 'date'
    const reviews = await getReviews(undefined, sortBy)
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating review with data:', body)
    const review = await createReview(body)
    console.log('Review created successfully:', review)
    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    console.error('Error creating review:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { 
        error: error?.message || error?.details?.message || 'Failed to create review', 
        details: process.env.NODE_ENV === 'development' ? error : undefined 
      },
      { status: 500 }
    )
  }
}

