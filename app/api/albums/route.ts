import { NextRequest, NextResponse } from 'next/server'
import { upsertAlbum } from '@/lib/db'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

