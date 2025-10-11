import { NextRequest, NextResponse } from 'next/server';
import { getAllEnrollments } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';

// Create secure API handler for admin only
const secureAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_ONLY);

export const GET = secureAPI(async function(request: NextRequest) {
  try {
    const enrollments = await getAllEnrollments();
    
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
});
