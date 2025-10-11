import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug, getBlogBySlugAdmin, incrementBlogViews } from '@/lib/neon-database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';
import { validateBlogSlug } from '@/lib/urlProtection';

// Create secure API handler
const secureAPI = createSecureAPI(SECURITY_CONFIGS.BLOG_API);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Apply security middleware manually
  const secureHandler = secureAPI(async (req: NextRequest) => {
    try {
      const { slug } = await params;
      const { searchParams } = new URL(req.url);
      const preview = searchParams.get('preview') === 'true';
      
      if (!slug) {
        return NextResponse.json({ error: 'Blog slug is required' }, { status: 400 });
      }

      // Security: Validate slug format
      if (!validateBlogSlug(slug)) {
        return NextResponse.json({ 
          error: 'Invalid blog slug format' 
        }, { status: 400 });
      }
      
      const blog = preview ? await getBlogBySlugAdmin(slug) : await getBlogBySlug(slug);
      
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      
      if (!preview) {
        // Increment view count
        await incrementBlogViews(slug);
      }
      
      return NextResponse.json({ blog });
    } catch (error) {
      console.error('Error fetching blog:', error);
      return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
  });

  return secureHandler(request);
}
