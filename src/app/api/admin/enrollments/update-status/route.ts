import { NextRequest, NextResponse } from 'next/server';
import { updateEnrollmentStatus } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';

// Create secure API handler for admin only
const secureAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_ONLY);

export const PUT = secureAPI(async function(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id and status' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'enrolled', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, enrolled, completed, cancelled' },
        { status: 400 }
      );
    }

    const result = await updateEnrollmentStatus(id, status);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enrollment status updated successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Error updating enrollment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
