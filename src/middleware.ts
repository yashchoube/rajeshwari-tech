import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * NEXT.JS MIDDLEWARE (Edge Runtime)
 * NOTE: Active session verification (DB check) is performed at the Server Component 
 * and API levels because native DB drivers like 'better-sqlite3' are incompatible 
 * with the Edge Runtime.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie) {
      // Redirect to login page if no session cookie
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
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
