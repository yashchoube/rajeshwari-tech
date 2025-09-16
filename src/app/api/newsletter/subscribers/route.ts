import { NextRequest, NextResponse } from 'next/server';
import { getAllNewsletterSubscriptions } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const subscriptions = getAllNewsletterSubscriptions();
    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}
