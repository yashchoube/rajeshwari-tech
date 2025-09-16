import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug, getBlogBySlugAdmin, incrementBlogViews } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const preview = searchParams.get('preview') === 'true';
    
    if (!slug) {
      return NextResponse.json({ error: 'Blog slug is required' }, { status: 400 });
    }
    
    const blog = preview ? getBlogBySlugAdmin(slug) : getBlogBySlug(slug);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    if (!preview) {
      // Increment view count
      incrementBlogViews(slug);
    }
    
    return NextResponse.json({ blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
