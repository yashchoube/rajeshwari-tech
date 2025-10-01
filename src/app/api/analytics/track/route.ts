import { NextRequest, NextResponse } from 'next/server';
import { trackPageVisit } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer, userAgent } = body;
    
    if (!page) {
      return NextResponse.json({ 
        error: 'Page is required' 
      }, { status: 400 });
    }

    trackPageVisit(page, referrer, userAgent);
    
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
}
