import { NextRequest, NextResponse } from 'next/server';
import { AuthService, checkRateLimit, recordLoginAttempt } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limiting
    if (!checkRateLimit(ip)) {
      console.warn('Login attempt blocked due to rate limiting', { ip, username });
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }
    
    // Validate credentials
    if (!AuthService.validateCredentials(username, password)) {
      recordLoginAttempt(ip, false);
      console.warn('Invalid login attempt', { ip, username });
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Create session
    const user = {
      id: 'admin-1',
      username,
      email: process.env.ADMIN_EMAIL || 'admin@rajeshwaritech.com',
      role: 'admin' as const,
      lastLogin: new Date().toISOString()
    };
    
    const sessionId = AuthService.createSession(user);
    
    // Set secure cookie with production-ready settings
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: { user: { id: user.id, username: user.username, email: user.email, role: user.role } }
    });
    
    response.cookies.set('admin-session', sessionId, {
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/', // Available site-wide
      domain: process.env.NODE_ENV === 'production' ? '.rajeshwaritech.com' : undefined // Production domain
    });
    
    recordLoginAttempt(ip, true);
    console.log('Admin login successful', { ip, username });
    
    return response;
    
  } catch (error) {
    console.error('Login error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
