import { NextRequest, NextResponse } from 'next/server';
import { saveDemoBooking } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';
import { Validator } from '@/lib/validation';

// Create secure API handler
const secureAPI = createSecureAPI(SECURITY_CONFIGS.PUBLIC_FORM);

export const POST = secureAPI(async function(request: NextRequest) {
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
      .required('course', body.course)
      .required('experience', body.experience)
      .required('preferredTime', body.preferredTime)
      .maxLength('message', body.message, 1000)
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

    const { name, email, phone, course, experience, preferredTime, message } = body;

    // Save to Neon PostgreSQL database
    const bookingId = await saveDemoBooking({
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
});
