import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

// ----------------------
// Update Type: Changed
// Description: Updated Auth Check Route to use AuthService
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

export async function GET(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser(request);

    if (!user) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      response.cookies.delete('admin-session');
      return response;
    }

    return NextResponse.json({
      success: true,
      message: 'Authenticated',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    );
  }
}
