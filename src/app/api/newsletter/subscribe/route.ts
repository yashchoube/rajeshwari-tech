import { NextRequest, NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, interests } = body;
    
    if (!email || !interests || !Array.isArray(interests) || interests.length === 0) {
      return NextResponse.json({ 
        error: 'Email and at least one interest are required' 
      }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }
    
    const subscriptionId = subscribeNewsletter({
      email,
      name,
      interests
    });
    
    return NextResponse.json({ 
      success: true,
      subscriptionId,
      message: 'Successfully subscribed to newsletter!' 
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({ 
      error: 'Failed to subscribe to newsletter' 
    }, { status: 500 });
  }
}
