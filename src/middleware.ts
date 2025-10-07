import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Redirect from admin login if already authenticated
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (sessionCookie) {
      // Redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
