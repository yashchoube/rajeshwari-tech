import { NextRequest, NextResponse } from 'next/server';
import { saveEnrollment } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, courseId, courseName, experience, goals, referral } = body;
    
    if (!name || !email || !phone || !courseId || !courseName || !experience) {
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
    const enrollmentId = saveEnrollment({
      name,
      email,
      phone,
      courseId,
      courseName,
      experience,
      goals,
      referral
    });

    // Log the enrollment for admin reference
    console.log(`New enrollment received:`, {
      id: enrollmentId,
      name,
      email,
      courseName,
      experience
    });

    return NextResponse.json({
      success: true,
      enrollmentId,
      message: 'Enrollment submitted successfully'
    });

  } catch (error) {
    console.error('Error saving enrollment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
