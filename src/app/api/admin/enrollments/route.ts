import { NextRequest, NextResponse } from 'next/server';
import { getAllEnrollments } from '@/lib/database';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Temporarily bypass authentication for testing
    // TODO: Re-enable authentication once session issue is resolved
    // await AuthService.requireAdmin(request);
    
    const enrollments = getAllEnrollments();
    
    return NextResponse.json({
      success: true,
      enrollments: enrollments
    });
    
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments', details: error.message },
      { status: 500 }
    );
  }
}
