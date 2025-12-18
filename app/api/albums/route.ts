import { NextRequest, NextResponse } from 'next/server'
import { upsertAlbum } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const album = await upsertAlbum(body)
    return NextResponse.json(album, { status: 201 })
  } catch (error: any) {
    console.error('Error creating album:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create album' },
      { status: 500 }
    )
  }
}

