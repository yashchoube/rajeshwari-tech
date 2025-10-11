import { NextRequest, NextResponse } from 'next/server';
import { getAllDemoBookings } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';

// Create secure API handler for admin only
const secureAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_ONLY);

export const GET = secureAPI(async function(request: NextRequest) {
  try {
    const demoBookings = await getAllDemoBookings();
    
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
});
