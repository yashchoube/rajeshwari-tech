import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { updateEnrollmentStatus } from '@/lib/database';

export async function PUT(request: NextRequest) {
  try {
    // Temporarily bypass authentication for testing
    // TODO: Re-enable authentication once session issue is resolved
    // const authResult = await AuthService.validateSession(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

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

    const result = updateEnrollmentStatus(id, status);
    
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
}
