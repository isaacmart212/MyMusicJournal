import { NextRequest, NextResponse } from 'next/server'
import { upsertAlbum } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating album with data:', body)
    const album = await upsertAlbum(body)
    console.log('Album created successfully:', album)
    return NextResponse.json(album, { status: 201 })
  } catch (error: any) {
    console.error('Error creating album:', error)
    const errorMessage = error?.message || error?.details?.message || 'Failed to create album'
    const errorDetails = error?.details || error
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined 
      },
      { status: 500 }
    )
  }
}

