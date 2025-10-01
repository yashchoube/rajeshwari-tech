import { NextRequest, NextResponse } from 'next/server';
import { approveBlog, deleteBlog } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body as { id?: number };
    
    console.log('Approving blog with ID:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    
    const result = approveBlog(id);
    console.log('Blog approval result:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog approved and published successfully',
      blogId: id,
      changes: result.changes
    });
  } catch (error) {
    console.error('Error approving blog:', error);
    return NextResponse.json({ 
      error: 'Failed to approve blog',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    deleteBlog(id);
    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}


