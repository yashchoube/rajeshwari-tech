import { NextRequest, NextResponse } from 'next/server';
import { updateDemoBookingStatus } from '@/lib/neon-database';
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
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled' },
        { status: 400 }
      );
    }

    const result = await updateDemoBookingStatus(id, status);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Demo booking status updated successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Error updating demo booking status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
