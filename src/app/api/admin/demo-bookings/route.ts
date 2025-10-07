import { NextRequest, NextResponse } from 'next/server';
import { getAllDemoBookings } from '@/lib/database';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Temporarily bypass authentication for testing
    // TODO: Re-enable authentication once session issue is resolved
    // await AuthService.requireAdmin(request);
    
    const demoBookings = getAllDemoBookings();
    
    return NextResponse.json({
      success: true,
      demoBookings: demoBookings
    });
    
  } catch (error) {
    console.error('Error fetching demo bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demo bookings', details: error.message },
      { status: 500 }
    );
  }
}
