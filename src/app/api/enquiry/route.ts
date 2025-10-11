import { NextRequest, NextResponse } from 'next/server';
import { createResponse } from '@/lib/response';
import { logger } from '@/lib/logger';
import { saveEnquiry } from '@/lib/neon-database';
import { sendEnquiryNotification, sendWelcomeEmail } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'service'];
    for (const field of requiredFields) {
      if (!body[field]) {
        const response = createResponse().error(`Missing required field: ${field}`);
        return NextResponse.json(response, { status: 400 });
      }
    }

    // Save enquiry to database
    const enquiryData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      message: body.message
    };

    const savedEnquiry = await saveEnquiry(enquiryData);

    // Send email notifications (non-blocking)
    try {
      // Send notification to your team
      await sendEnquiryNotification({
        ...enquiryData,
        enquiryId: savedEnquiry.id
      });

      // Send welcome email to customer
      await sendWelcomeEmail({
        name: enquiryData.name,
        email: enquiryData.email,
        service: enquiryData.service
      });

      logger.info('Email notifications sent successfully', {
        enquiryId: savedEnquiry.id,
        customerEmail: enquiryData.email
      });
    } catch (emailError) {
      // Don't fail the enquiry if email fails
      logger.error('Email notification failed (enquiry still saved)', {
        enquiryId: savedEnquiry.id,
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      });
    }

    // Log the enquiry
    logger.info('New enquiry received and saved', {
      enquiryId: savedEnquiry.id,
      service: body.service,
      company: body.company,
      email: body.email
    });

    const response = createResponse().success({
      message: 'Enquiry submitted successfully',
      enquiryId: savedEnquiry.id
    });
    return NextResponse.json(response);

  } catch (error) {
    logger.error('Error processing enquiry', { error: error instanceof Error ? error.message : 'Unknown error' });
    const response = createResponse().internalError('Failed to process enquiry');
    return NextResponse.json(response, { status: 500 });
  }
}
