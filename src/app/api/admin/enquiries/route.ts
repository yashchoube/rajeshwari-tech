import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';

// Create secure API handler for admin only
const secureAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_ONLY);

export const GET = secureAPI(async function(request: NextRequest) {
  try {
    const enquiries = await getEnquiries();
    
    return NextResponse.json({ 
      success: true,
      enquiries,
      count: enquiries.length
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch enquiries',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
});
