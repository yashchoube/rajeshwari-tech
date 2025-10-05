import { NextRequest, NextResponse } from 'next/server';
import { createResponse } from '@/lib/response';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'company', 'service'];
    for (const field of requiredFields) {
      if (!body[field]) {
        const response = createResponse().error(`Missing required field: ${field}`);
        return NextResponse.json(response, { status: 400 });
      }
    }

    // Log the enquiry
    logger.info('New enquiry received', {
      service: body.service,
      company: body.company,
      participants: body.participants,
      budget: body.budget,
      email: body.email
    });

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    const enquiryData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...body
    };

    // TODO: Save to database
    // await saveEnquiryToDatabase(enquiryData);

    logger.info('Enquiry processed successfully', {
      enquiryId: enquiryData.id,
      service: body.service
    });

    const response = createResponse().success({
      message: 'Enquiry submitted successfully',
      enquiryId: enquiryData.id
    });
    return NextResponse.json(response);

  } catch (error) {
    logger.error('Error processing enquiry', { error: error instanceof Error ? error.message : 'Unknown error' });
    const response = createResponse().internalError('Failed to process enquiry');
    return NextResponse.json(response, { status: 500 });
  }
}
