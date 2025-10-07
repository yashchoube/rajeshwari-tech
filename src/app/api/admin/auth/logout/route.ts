import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await import('next/headers').then(m => m.cookies());
    const sessionId = cookieStore.get('admin-session')?.value;
    
    if (sessionId) {
      AuthService.destroySession(sessionId);
      console.log('Admin logout', { sessionId });
    }
    
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });
    
    // Clear the session cookie
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    console.error('Logout error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
