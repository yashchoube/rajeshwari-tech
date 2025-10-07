import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
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
