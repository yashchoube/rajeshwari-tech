import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Serverless-compatible authentication system
// Uses secure cookies for session management

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

// JWT-like session token (simplified for serverless)
const SESSION_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export class AuthService {
  private static generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private static createSessionToken(user: AdminUser): string {
    const sessionData = {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    // Simple base64 encoding with HMAC signature
    const payload = Buffer.from(JSON.stringify(sessionData)).toString('base64');
    const signature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('hex');
    
    return `${payload}.${signature}`;
  }

  private static verifySessionToken(token: string): AdminUser | null {
    try {
      const [payload, signature] = token.split('.');
      if (!payload || !signature) return null;

      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update(payload)
        .digest('hex');
      
      if (signature !== expectedSignature) return null;

      // Decode payload
      const sessionData = JSON.parse(Buffer.from(payload, 'base64').toString());
      
      // Check expiration
      if (Date.now() / 1000 > sessionData.exp) return null;

      return {
        id: sessionData.userId,
        username: sessionData.username,
        email: sessionData.email,
        role: sessionData.role,
        lastLogin: new Date(sessionData.iat * 1000).toISOString()
      };
    } catch (error) {
      console.error('Session verification failed:', error);
      return null;
    }
  }

  static createSession(user: AdminUser): string {
    const sessionId = this.generateSessionId();
    const sessionToken = this.createSessionToken(user);
    
    console.log('AuthService.createSession - created session:', sessionId);
    return sessionToken;
  }

  static getSession(sessionToken: string): AdminUser | null {
    try {
      console.log('AuthService.getSession - sessionToken length:', sessionToken?.length || 0);
      
      if (!sessionToken) {
        console.log('AuthService.getSession - no session token');
        return null;
      }

      const user = this.verifySessionToken(sessionToken);
      if (!user) {
        console.log('AuthService.getSession - invalid session token');
        return null;
      }

      console.log('AuthService.getSession - session found and valid');
      return user;
    } catch (error) {
      console.error('Session verification failed:', error);
      return null;
    }
  }

  static destroySession(): void {
    console.log('AuthService.destroySession - session will be cleared by cookie expiration');
  }

  static cleanupExpiredSessions(): void {
    console.log('AuthService.cleanupExpiredSessions - no cleanup needed for stateless sessions');
  }

  static async validateAdminCredentials(username: string, password: string): Promise<AdminUser | null> {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return {
        id: 'admin-1',
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        lastLogin: new Date().toISOString()
      };
    }
    return null;
  }

  static async getCurrentUser(request: NextRequest): Promise<AdminUser | null> {
    const sessionToken = request.cookies.get('admin-session')?.value;
    if (!sessionToken) {
      return null;
    }
    return AuthService.getSession(sessionToken);
  }
}
