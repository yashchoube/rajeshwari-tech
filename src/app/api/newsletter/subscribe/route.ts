import { NextRequest, NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/neon-database';
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
      .required('email', body.email)
      .email('email', body.email)
      .maxLength('name', body.name, 100)
      .custom('interests', Array.isArray(body.interests) && body.interests.length > 0, 'At least one interest is required')
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

    const { email, name, interests } = body;
    
    const subscriptionId = await subscribeNewsletter({
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
});
