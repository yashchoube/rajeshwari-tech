import { NextRequest, NextResponse } from 'next/server';
import { approveBlog, deleteBlog } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body as { id?: number };
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    approveBlog(id);
    return NextResponse.json({ success: true, message: 'Blog approved' });
  } catch (error) {
    console.error('Error approving blog:', error);
    return NextResponse.json({ error: 'Failed to approve blog' }, { status: 500 });
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


