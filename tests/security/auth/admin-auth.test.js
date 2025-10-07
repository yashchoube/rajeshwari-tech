import { test, expect } from '@jest/globals';

const BASE_URL = 'http://localhost:3001';

describe('Admin Authentication Security Tests', () => {
  let adminSession = null;

  test('should redirect to login when accessing admin without authentication', async () => {
    const response = await fetch(`${BASE_URL}/admin`, {
      redirect: 'manual'
    });
    
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('/admin/login');
  });

  test('should reject invalid credentials', async () => {
    const response = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'invalid',
        password: 'wrong'
      }),
    });

    expect(response.status).toBe(401);
    const result = await response.json();
    expect(result.error).toContain('Invalid username or password');
  });

  test('should accept valid credentials', async () => {
    const response = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123!'
      }),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.user).toBeDefined();
    
    // Extract session cookie
    const setCookieHeader = response.headers.get('set-cookie');
    expect(setCookieHeader).toContain('admin-session');
    
    // Store session for other tests
    adminSession = setCookieHeader;
  });

  test('should allow access to admin with valid session', async () => {
    if (!adminSession) {
      // Login first
      const loginResponse = await fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123!'
        }),
      });
      
      adminSession = loginResponse.headers.get('set-cookie');
    }

    const response = await fetch(`${BASE_URL}/api/admin/auth/check`, {
      headers: {
        'Cookie': adminSession
      }
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.user.role).toBe('admin');
  });

  test('should protect admin API endpoints', async () => {
    // Try to access admin blogs without authentication
    const response = await fetch(`${BASE_URL}/api/blogs?scope=admin`);
    
    expect(response.status).toBe(401);
    const result = await response.json();
    expect(result.error).toContain('Admin access required');
  });

  test('should allow admin API access with valid session', async () => {
    if (!adminSession) {
      // Login first
      const loginResponse = await fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123!'
        }),
      });
      
      adminSession = loginResponse.headers.get('set-cookie');
    }

    const response = await fetch(`${BASE_URL}/api/blogs?scope=admin`, {
      headers: {
        'Cookie': adminSession
      }
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.blogs).toBeDefined();
  });

  test('should implement rate limiting for login attempts', async () => {
    // Make multiple failed login attempts
    const promises = Array(6).fill().map(() => 
      fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'wrong'
        }),
      })
    );

    const responses = await Promise.all(promises);
    
    // Check if rate limiting kicks in
    const rateLimitedResponses = responses.filter(r => r.status === 429);
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
  });

  test('should handle session expiration', async () => {
    // This test would require manipulating session expiration
    // For now, just test that invalid session is rejected
    const response = await fetch(`${BASE_URL}/api/admin/auth/check`, {
      headers: {
        'Cookie': 'admin-session=invalid-session-id'
      }
    });

    expect(response.status).toBe(401);
  });

  test('should logout and clear session', async () => {
    if (!adminSession) {
      // Login first
      const loginResponse = await fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123!'
        }),
      });
      
      adminSession = loginResponse.headers.get('set-cookie');
    }

    // Logout
    const logoutResponse = await fetch(`${BASE_URL}/api/admin/auth/logout`, {
      method: 'POST',
      headers: {
        'Cookie': adminSession
      }
    });

    expect(logoutResponse.status).toBe(200);
    
    // Try to access admin with cleared session
    const checkResponse = await fetch(`${BASE_URL}/api/admin/auth/check`, {
      headers: {
        'Cookie': adminSession
      }
    });

    expect(checkResponse.status).toBe(401);
  });

  test('should prevent access to admin pages without authentication', async () => {
    const adminPages = [
      '/admin',
      '/admin/blogs',
      '/admin/users',
      '/admin/settings'
    ];

    for (const page of adminPages) {
      const response = await fetch(`${BASE_URL}${page}`, {
        redirect: 'manual'
      });
      
      expect(response.status).toBe(302);
      expect(response.headers.get('location')).toContain('/admin/login');
    }
  });

  test('should secure session cookies', async () => {
    const response = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123!'
      }),
    });

    const setCookieHeader = response.headers.get('set-cookie');
    
    // Check for secure cookie attributes
    expect(setCookieHeader).toContain('HttpOnly');
    expect(setCookieHeader).toContain('SameSite=Strict');
    expect(setCookieHeader).toContain('Path=/');
  });

  test('should handle concurrent login attempts', async () => {
    const promises = Array(5).fill().map(() => 
      fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123!'
        }),
      })
    );

    const responses = await Promise.all(promises);
    
    // All should succeed (no rate limiting for valid credentials)
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  test('should validate session on every admin request', async () => {
    if (!adminSession) {
      // Login first
      const loginResponse = await fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123!'
        }),
      });
      
      adminSession = loginResponse.headers.get('set-cookie');
    }

    // Make multiple admin requests
    const promises = Array(3).fill().map(() => 
      fetch(`${BASE_URL}/api/blogs?scope=admin`, {
        headers: {
          'Cookie': adminSession
        }
      })
    );

    const responses = await Promise.all(promises);
    
    // All should succeed with valid session
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });
});
