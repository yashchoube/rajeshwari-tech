import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs, createBlog, getAllBlogsAdmin } from '@/lib/database';

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
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, featuredImage, category, tags, featured } = body;
    
    if (!title || !slug || !excerpt || !content || !author || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const blogId = createBlog({
      title,
      slug,
      excerpt,
      content,
      author,
      featuredImage,
      category,
      tags,
      featured,
      status: 'pending'
    });
    
    return NextResponse.json({ 
      success: true, 
      blogId,
      message: 'Blog submitted for approval' 
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
