import { test, expect } from '@jest/globals';

const BASE_URL = 'http://localhost:3001';

describe('Enrollment API Endpoints', () => {
  test('should create a new enrollment', async () => {
    const enrollmentData = {
      name: 'Test Student',
      email: 'test@example.com',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner',
      goals: 'Learn new skills',
      referral: 'Website'
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.enrollmentId).toBeDefined();
  });

  test('should reject enrollment with missing required fields', async () => {
    const invalidEnrollmentData = {
      name: '', // Empty name
      email: 'invalid-email', // Invalid email format
      phone: '', // Empty phone
      courseId: '', // Empty course ID
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidEnrollmentData),
    });

    expect(response.status).toBe(400);
  });

  test('should validate email format', async () => {
    const enrollmentData = {
      name: 'Test Student',
      email: 'invalid-email-format',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner'
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response.status).toBe(400);
  });

  test('should validate phone number format', async () => {
    const enrollmentData = {
      name: 'Test Student',
      email: 'test@example.com',
      phone: 'invalid-phone',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner'
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response.status).toBe(400);
  });

  test('should handle different experience levels', async () => {
    const experienceLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
    
    for (const level of experienceLevels) {
      const enrollmentData = {
        name: 'Test Student',
        email: 'test@example.com',
        phone: '+1234567890',
        courseId: 'test-course',
        courseName: 'Test Course',
        experience: level
      };

      const response = await fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    }
  });

  test('should handle long goals text', async () => {
    const longGoals = 'I want to learn programming and become a software developer. '.repeat(50);
    
    const enrollmentData = {
      name: 'Test Student',
      email: 'test@example.com',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner',
      goals: longGoals
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle special characters in name', async () => {
    const enrollmentData = {
      name: 'José María O\'Connor-Smith',
      email: 'test@example.com',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner'
    };

    const response = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle international phone numbers', async () => {
    const internationalPhones = [
      '+1234567890', // US
      '+44123456789', // UK
      '+33123456789', // France
      '+86123456789', // China
      '+91123456789' // India
    ];
    
    for (const phone of internationalPhones) {
      const enrollmentData = {
        name: 'Test Student',
        email: 'test@example.com',
        phone: phone,
        courseId: 'test-course',
        courseName: 'Test Course',
        experience: 'beginner'
      };

      const response = await fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      });

      expect(response.status).toBe(200);
      const result = await response.json();
      expect(result.success).toBe(true);
    }
  });

  test('should handle duplicate enrollments', async () => {
    const enrollmentData = {
      name: 'Test Student',
      email: 'duplicate@example.com',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner'
    };

    // First enrollment
    const response1 = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    expect(response1.status).toBe(200);

    // Second enrollment with same data
    const response2 = await fetch(`${BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrollmentData),
    });

    // Should still succeed (duplicate enrollments allowed)
    expect(response2.status).toBe(200);
  });

  test('should handle concurrent enrollments', async () => {
    const enrollmentData = {
      name: 'Concurrent Test Student',
      email: 'concurrent@example.com',
      phone: '+1234567890',
      courseId: 'test-course',
      courseName: 'Test Course',
      experience: 'beginner'
    };

    // Create multiple concurrent requests
    const promises = Array(5).fill().map(() => 
      fetch(`${BASE_URL}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrollmentData),
      })
    );

    const responses = await Promise.all(promises);
    
    // All should succeed
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });
});
