import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Stateless admin sessions (Vercel / multi-instance safe). Uses JWT_SECRET from Vercel env.

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super-admin';
  lastLogin: string;
}

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123!',
  email: process.env.ADMIN_EMAIL || 'admin@rajeshwaritech.com',
};

const SESSION_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-me';

export class AuthService {
  private static createSessionToken(user: AdminUser): string {
    const sessionData = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    };
    const payload = Buffer.from(JSON.stringify(sessionData)).toString('base64');
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    return `${payload}.${signature}`;
  }

  private static verifySessionToken(token: string): AdminUser | null {
    try {
      const [payload, signature] = token.split('.');
      if (!payload || !signature) return null;
      const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
      if (signature !== expected) return null;
      const sessionData = JSON.parse(Buffer.from(payload, 'base64').toString());
      if (Date.now() / 1000 > sessionData.exp) return null;
      return {
        id: sessionData.userId,
        username: sessionData.username,
        email: sessionData.email,
        role: sessionData.role,
        lastLogin: new Date(sessionData.iat * 1000).toISOString(),
      };
    } catch {
      return null;
    }
  }

  static createSession(user: AdminUser): string {
    return this.createSessionToken(user);
  }

  static getSession(sessionToken: string): AdminUser | null {
    if (!sessionToken) return null;
    return this.verifySessionToken(sessionToken);
  }

  static destroySession(_sessionId?: string): void {
    // Cookie cleared by client / logout route; nothing stored server-side
  }

  static cleanupExpiredSessions(): void {
    // N/A for stateless tokens
  }

  static validateCredentials(username: string, password: string): boolean {
    return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
  }

  static async getCurrentUser(request: NextRequest): Promise<AdminUser | null> {
    const token = request.cookies.get('admin-session')?.value;
    if (!token) return null;
    return this.getSession(token);
  }

  static async requireAuth(request: NextRequest): Promise<AdminUser> {
    const user = await this.getCurrentUser(request);
    if (!user) throw new Error('Authentication required');
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

export function withAuth(handler: Function) {
  return async (request: NextRequest, ...args: unknown[]) => {
    try {
      await AuthService.requireAdmin(request);
      return handler(request, ...args);
    } catch {
      return new Response(
        JSON.stringify({
          error: 'Authentication required',
          message: 'Please log in to access this resource',
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
}

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000;

export function checkRateLimit(ip: string): boolean {
  const attempts = loginAttempts.get(ip);
  const now = Date.now();
  if (!attempts) return true;
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
