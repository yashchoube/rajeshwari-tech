import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Simple session-based authentication system
// Uses secure session IDs stored in memory

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super-admin';
  lastLogin: string;
}

// Secure admin credentials from environment
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123!',
  email: process.env.ADMIN_EMAIL || 'admin@rajeshwaritech.com'
};

// In-memory session storage for serverless environment
// Sessions will reset on cold start, but that's acceptable for admin sessions
let sessions = new Map<string, { user: AdminUser; expiresAt: number }>();

export class AuthService {
  static generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static createSession(user: AdminUser): string {
    // Generate secure session ID
    const sessionId = this.generateSessionId();
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    // Store session in memory (serverless-compatible)
    sessions.set(sessionId, { user, expiresAt });
    
    console.log('AuthService.createSession - created session:', sessionId);
    return sessionId;
  }

  static getSession(sessionId: string): AdminUser | null {
    try {
      console.log('AuthService.getSession - sessionId length:', sessionId?.length || 0);
      
      const session = sessions.get(sessionId);
      if (!session) {
        console.log('AuthService.getSession - session not found');
        return null;
      }
      
      // Check if session has expired
      if (Date.now() > session.expiresAt) {
        console.log('AuthService.getSession - session expired');
        sessions.delete(sessionId);
        return null;
      }
      
      console.log('AuthService.getSession - session found and valid');
      return session.user;
    } catch (error) {
      console.error('Session verification failed:', error);
      return null;
    }
  }

  static destroySession(sessionId: string): void {
    // Remove session from memory
    sessions.delete(sessionId);
    console.log('AuthService.destroySession - session removed');
  }

  static cleanupExpiredSessions(): void {
    // Clean up expired sessions
    const now = Date.now();
    for (const [sessionId, session] of sessions.entries()) {
      if (now > session.expiresAt) {
        sessions.delete(sessionId);
      }
    }
    console.log('AuthService.cleanupExpiredSessions - cleaned up expired sessions');
  }

  static validateCredentials(username: string, password: string): boolean {
    return username === ADMIN_CREDENTIALS.username && 
           password === ADMIN_CREDENTIALS.password;
  }

  static async getCurrentUser(request: NextRequest): Promise<AdminUser | null> {
    try {
      // Get session ID from request cookies
      const sessionId = request.cookies.get('admin-session')?.value;
      
      console.log('AuthService.getCurrentUser - sessionId:', sessionId);
      
      if (!sessionId) {
        console.log('AuthService.getCurrentUser - no session ID found');
        return null;
      }
      
      const user = this.getSession(sessionId);
      console.log('AuthService.getCurrentUser - user found:', user ? 'yes' : 'no');
      return user;
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
