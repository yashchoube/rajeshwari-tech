import { NextRequest, NextResponse } from 'next/server';
import { trackPageVisit } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';

// Create secure API handler for analytics
const secureAPI = createSecureAPI({
  rateLimit: {
    maxRequests: 50, // Allow more requests for analytics
    windowMs: 15 * 60 * 1000
  }
});

export const POST = secureAPI(async function(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer, userAgent } = body;
    
    if (!page) {
      return NextResponse.json({ 
        error: 'Page is required' 
      }, { status: 400 });
    }

    await trackPageVisit(page, referrer, userAgent);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Page visit tracked' 
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return NextResponse.json({ 
      error: 'Failed to track page visit' 
    }, { status: 500 });
  }
});
