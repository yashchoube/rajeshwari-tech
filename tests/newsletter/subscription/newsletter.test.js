import { test, expect } from '@jest/globals';

const BASE_URL = 'http://localhost:3001';

describe('Newsletter Subscription Tests', () => {
  test('should subscribe to newsletter with valid data', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      name: 'Test Subscriber',
      interests: ['Technology', 'Programming', 'Web Development']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.subscriptionId).toBeDefined();
    expect(result.message).toContain('Successfully subscribed');
  });

  test('should reject subscription with invalid email format', async () => {
    const subscriptionData = {
      email: 'invalid-email-format',
      name: 'Test Subscriber',
      interests: ['Technology']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(400);
  });

  test('should reject subscription with missing email', async () => {
    const subscriptionData = {
      name: 'Test Subscriber',
      interests: ['Technology']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(400);
  });

  test('should reject subscription with empty interests array', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      name: 'Test Subscriber',
      interests: []
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(400);
  });

  test('should handle subscription with multiple interests', async () => {
    const subscriptionData = {
      email: 'multi-interests@example.com',
      name: 'Multi Interest Subscriber',
      interests: ['Technology', 'Programming', 'Web Development', 'Mobile Development', 'Data Science']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle subscription without name (optional field)', async () => {
    const subscriptionData = {
      email: 'no-name@example.com',
      interests: ['Technology']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle duplicate email subscriptions', async () => {
    const subscriptionData = {
      email: 'duplicate@example.com',
      name: 'Duplicate Subscriber',
      interests: ['Technology']
    };

    // First subscription
    const response1 = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response1.status).toBe(200);

    // Second subscription with same email
    const response2 = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    // Should succeed (update existing subscription)
    expect(response2.status).toBe(200);
  });

  test('should retrieve all newsletter subscriptions', async () => {
    const response = await fetch(`${BASE_URL}/api/newsletter/subscribers`);
    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.subscriptions).toBeDefined();
    expect(Array.isArray(result.subscriptions)).toBe(true);
  });

  test('should handle international email addresses', async () => {
    const internationalEmails = [
      'test@example.com',
      'test@example.co.uk',
      'test@example.fr',
      'test@example.de',
      'test@example.jp',
      'test@example.cn'
    ];

    for (const email of internationalEmails) {
      const subscriptionData = {
        email: email,
        name: 'International Subscriber',
        interests: ['Technology']
      };

      const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      expect(response.status).toBe(200);
    }
  });

  test('should handle special characters in name', async () => {
    const subscriptionData = {
      email: 'special-chars@example.com',
      name: 'José María O\'Connor-Smith',
      interests: ['Technology']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle case-insensitive email addresses', async () => {
    const subscriptionData = {
      email: 'CASE.INSENSITIVE@EXAMPLE.COM',
      name: 'Case Test Subscriber',
      interests: ['Technology']
    };

    const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle concurrent subscriptions', async () => {
    const subscriptionData = {
      email: 'concurrent@example.com',
      name: 'Concurrent Subscriber',
      interests: ['Technology']
    };

    // Create multiple concurrent requests
    const promises = Array(5).fill().map(() => 
      fetch(`${BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      })
    );

    const responses = await Promise.all(promises);
    
    // All should succeed
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  test('should validate interest categories', async () => {
    const validInterests = [
      'Technology',
      'Programming',
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Cybersecurity',
      'Cloud Computing',
      'DevOps'
    ];

    for (const interest of validInterests) {
      const subscriptionData = {
        email: `test-${interest.toLowerCase().replace(/\s+/g, '-')}@example.com`,
        name: 'Interest Test Subscriber',
        interests: [interest]
      };

      const response = await fetch(`${BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      expect(response.status).toBe(200);
    }
  });
});
