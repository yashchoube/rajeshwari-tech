import { NextRequest, NextResponse } from 'next/server';
import { updateEnrollmentStatus } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ 
        error: 'ID and status are required' 
      }, { status: 400 });
    }

    if (!['pending', 'paid', 'cancelled'].includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be pending, paid, or cancelled' 
      }, { status: 400 });
    }

    updateEnrollmentStatus(id, status);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Enrollment status updated successfully' 
    });
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    return NextResponse.json({ 
      error: 'Failed to update enrollment status' 
    }, { status: 500 });
  }
}
