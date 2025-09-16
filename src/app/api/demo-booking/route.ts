import { NextRequest, NextResponse } from 'next/server';
import { saveDemoBooking } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, course, experience, preferredTime, message } = body;
    
    if (!name || !email || !phone || !course || !experience || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const bookingId = saveDemoBooking({
      name,
      email,
      phone,
      course,
      experience,
      preferredTime,
      message
    });

    // Log the booking for admin reference
    console.log(`New demo booking received:`, {
      id: bookingId,
      name,
      email,
      course,
      preferredTime
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Demo booking submitted successfully'
    });

  } catch (error) {
    console.error('Error saving demo booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
