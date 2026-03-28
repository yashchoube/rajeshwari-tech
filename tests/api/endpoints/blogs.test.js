import { test, expect } from '@jest/globals';

const BASE_URL = 'http://localhost:3001';

describe('Blog API Endpoints', () => {
  let testBlogId;

  test('should create a new blog post', async () => {
    const blogData = {
      title: 'Test Blog Post',
      excerpt: 'This is a test blog excerpt that is long enough to pass validation.',
      content: '<p>This is test blog content with <strong>HTML formatting</strong>.</p>',
      author: 'Test Author',
      category: 'Technology',
      featuredImage: '/uploads/blogs/test-image.png'
    };

    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.blogId).toBeDefined();
    
    testBlogId = result.data.blogId;
  });

  test('should retrieve all published blogs', async () => {
    const response = await fetch(`${BASE_URL}/api/blogs`);
    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.blogs).toBeDefined();
    expect(Array.isArray(result.blogs)).toBe(true);
  });

  test('should retrieve admin blogs', async () => {
    const response = await fetch(`${BASE_URL}/api/blogs?scope=admin`);
    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.blogs).toBeDefined();
    expect(Array.isArray(result.blogs)).toBe(true);
  });

  test('should retrieve blogs by category', async () => {
    const response = await fetch(`${BASE_URL}/api/blogs?category=Technology`);
    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.blogs).toBeDefined();
    expect(Array.isArray(result.blogs)).toBe(true);
  });

  test('should approve a blog post', async () => {
    if (!testBlogId) {
      // Create a test blog first
      const blogData = {
        title: 'Test Blog for Approval',
        excerpt: 'This is a test blog excerpt for approval testing.',
        content: '<p>This is test blog content for approval.</p>',
        author: 'Test Author',
        category: 'Technology'
      };

      const createResponse = await fetch(`${BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const createResult = await createResponse.json();
      testBlogId = createResult.data.blogId;
    }

    const response = await fetch(`${BASE_URL}/api/blogs/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: testBlogId }),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should reject invalid blog data', async () => {
    const invalidBlogData = {
      title: '', // Empty title
      excerpt: 'Short', // Too short excerpt
      content: '', // Empty content
      author: '', // Empty author
      category: '' // Empty category
    };

    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidBlogData),
    });

    expect(response.status).toBe(400);
  });

  test('should handle blog retrieval errors gracefully', async () => {
    const response = await fetch(`${BASE_URL}/api/blogs?category=NonExistentCategory`);
    expect(response.status).toBe(200);
    
    const result = await response.json();
    expect(result.blogs).toBeDefined();
    expect(Array.isArray(result.blogs)).toBe(true);
  });

  test('should validate blog slug uniqueness', async () => {
    const blogData = {
      title: 'Duplicate Title Test',
      excerpt: 'This is a test blog excerpt for duplicate title testing.',
      content: '<p>This is test blog content for duplicate title testing.</p>',
      author: 'Test Author',
      category: 'Technology'
    };

    // Create first blog
    const response1 = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    expect(response1.status).toBe(200);

    // Create second blog with same title (should get different slug)
    const response2 = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    expect(response2.status).toBe(200);
    
    const result1 = await response1.json();
    const result2 = await response2.json();
    
    // Slugs should be different due to timestamp
    expect(result1.data.slug).not.toBe(result2.data.slug);
  });

  test('should handle large blog content', async () => {
    const largeContent = '<p>' + 'This is a very long blog content. '.repeat(1000) + '</p>';
    
    const blogData = {
      title: 'Large Content Blog',
      excerpt: 'This is a test blog excerpt for large content testing.',
      content: largeContent,
      author: 'Test Author',
      category: 'Technology'
    };

    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });

  test('should handle special characters in blog content', async () => {
    const specialContent = '<p>Special characters: &lt;&gt;&amp;&quot;&#39; &nbsp; &copy; &reg; &trade;</p>';
    
    const blogData = {
      title: 'Special Characters Blog',
      excerpt: 'This is a test blog excerpt for special characters testing.',
      content: specialContent,
      author: 'Test Author',
      category: 'Technology'
    };

    const response = await fetch(`${BASE_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result.success).toBe(true);
  });
});
