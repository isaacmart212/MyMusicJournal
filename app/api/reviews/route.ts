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
    const review = await createReview(body)
    return NextResponse.json(review, { status: 201 })
  } catch (error: any) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create review' },
      { status: 500 }
    )
  }
}

