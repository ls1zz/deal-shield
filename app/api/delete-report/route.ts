import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get report ID from request
    const { reportId } = await request.json()

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      )
    }

    // Verify the report belongs to the user before deleting
    const { data: report, error: fetchError } = await supabase
      .from('reports')
      .select('user_id')
      .eq('id', reportId)
      .single()

    if (fetchError || !report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    if (report.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this report' },
        { status: 403 }
      )
    }

    // Delete the report
    const { error: deleteError } = await supabase
      .from('reports')
      .delete()
      .eq('id', reportId)

    if (deleteError) {
      console.error('Error deleting report:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete report' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Report deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in delete-report API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}