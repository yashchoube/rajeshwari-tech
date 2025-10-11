import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    // Revalidate the blogs page to clear cache
    revalidatePath('/blogs');
    revalidatePath('/api/blogs');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json({ 
      error: 'Failed to clear cache' 
    }, { status: 500 });
  }
}
