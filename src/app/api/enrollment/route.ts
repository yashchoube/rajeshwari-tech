import { NextRequest, NextResponse } from 'next/server';
import { Validator } from '@/lib/validation';
import { saveEnrollment } from '@/lib/neon-database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Enhanced validation with security
    const validator = new Validator();
    const validationResult = validator
      .required('name', body.name)
      .minLength('name', body.name, 2)
      .maxLength('name', body.name, 100)
      .required('email', body.email)
      .email('email', body.email)
      .required('phone', body.phone)
      .validatePhone('phone', body.phone)
      .required('courseId', body.courseId)
      .required('courseName', body.courseName)
      .required('experience', body.experience)
      .maxLength('goals', body.goals, 500)
      .maxLength('referral', body.referral, 200)
      .getResult();

    if (!validationResult.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, courseId, courseName, experience, goals, referral } = body;

    // Save to Neon PostgreSQL database
    const enrollmentId = await saveEnrollment({
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
