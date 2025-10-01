import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs, createBlog, getAllBlogsAdmin } from '@/lib/database';
import { Validator } from '@/lib/validation';
import { createResponse } from '@/lib/response';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const scope = searchParams.get('scope');
    
    if (category) {
      const { getBlogsByCategory } = await import('@/lib/database');
      const blogs = getBlogsByCategory(category);
      return NextResponse.json({ blogs });
    }
    
    if (scope === 'admin') {
      const blogs = getAllBlogsAdmin();
      return NextResponse.json({ blogs });
    }
    
    const blogs = getAllBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const body = await request.json();
    logger.info('Creating new blog post', { requestId, body: { ...body, content: '[REDACTED]' } });

    // Enterprise validation
    const validation = Validator.validateBlog(body);
    if (!validation.isValid) {
      logger.warn('Blog validation failed', { requestId, errors: validation.errors });
      const response = createResponse().validationError(validation.errors.map(e => e.message));
      return NextResponse.json(response, { status: 400 });
    }

    const blogId = createBlog({
      title: body.title.trim(),
      slug: body.slug?.trim() || undefined, // Auto-generate if not provided
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author.trim(),
      featuredImage: body.featuredImage?.trim() || undefined,
      category: body.category.trim(),
      tags: body.tags?.trim() || undefined,
      featured: Boolean(body.featured),
      status: 'pending'
    });

    logger.info('Blog created successfully', { requestId, blogId });
    const response = createResponse().success({ blogId }, 'Blog submitted for approval successfully');
    return NextResponse.json(response);
    
  } catch (error) {
    logger.error('Error creating blog', { 
      requestId, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    const response = createResponse().internalError('Failed to create blog');
    return NextResponse.json(response, { status: 500 });
  }
}
