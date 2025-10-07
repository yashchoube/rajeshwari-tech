import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Simple session-based authentication
// In production, use proper authentication like NextAuth.js or Auth0

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super-admin';
  lastLogin: string;
}

// In production, store this in a secure database
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123!',
  email: process.env.ADMIN_EMAIL || 'admin@rajeshwaritech.com'
};

// Session storage (in production, use Redis or database)
const sessions = new Map<string, { user: AdminUser; expires: number }>();

export class AuthService {
  static generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static createSession(user: AdminUser): string {
    const sessionId = this.generateSessionId();
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    sessions.set(sessionId, { user, expires });
    
    // Clean up expired sessions
    this.cleanupExpiredSessions();
    
    return sessionId;
  }

  static getSession(sessionId: string): AdminUser | null {
    const session = sessions.get(sessionId);
    
    if (!session) {
      return null;
    }
    
    if (Date.now() > session.expires) {
      sessions.delete(sessionId);
      return null;
    }
    
    return session.user;
  }

  static destroySession(sessionId: string): void {
    sessions.delete(sessionId);
  }

  static cleanupExpiredSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of sessions.entries()) {
      if (now > session.expires) {
        sessions.delete(sessionId);
      }
    }
  }

  static validateCredentials(username: string, password: string): boolean {
    return username === ADMIN_CREDENTIALS.username && 
           password === ADMIN_CREDENTIALS.password;
  }

  static async getCurrentUser(request: NextRequest): Promise<AdminUser | null> {
    try {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get('admin-session')?.value;
      
      if (!sessionId) {
        return null;
      }
      
      return this.getSession(sessionId);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async requireAuth(request: NextRequest): Promise<AdminUser> {
    const user = await this.getCurrentUser(request);
    
    if (!user) {
      throw new Error('Authentication required');
    }
    
    return user;
  }

  static async requireAdmin(request: NextRequest): Promise<AdminUser> {
    const user = await this.requireAuth(request);
    
    if (user.role !== 'admin' && user.role !== 'super-admin') {
      throw new Error('Admin access required');
    }
    
    return user;
  }
}

// Middleware helper for protecting routes
export function withAuth(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    try {
      await AuthService.requireAdmin(request);
      return handler(request, ...args);
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: 'Authentication required',
          message: 'Please log in to access this resource'
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
  };
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): boolean {
  const attempts = loginAttempts.get(ip);
  const now = Date.now();
  
  if (!attempts) {
    return true;
  }
  
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(ip);
    return true;
  }
  
  return attempts.count < MAX_ATTEMPTS;
}

export function recordLoginAttempt(ip: string, success: boolean): void {
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  
  if (success) {
    loginAttempts.delete(ip);
  } else {
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    loginAttempts.set(ip, attempts);
  }
}
