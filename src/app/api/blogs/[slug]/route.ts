import { NextRequest, NextResponse } from 'next/server';
import { getBlogBySlug, getBlogBySlugAdmin, incrementBlogViews, deleteBlog } from '@/lib/database';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';
import { validateBlogSlug } from '@/lib/urlProtection';

// ----------------------
// Update Type: Changed
// Description: Updated Blog Slug Route to use secure API handler and validation
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

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

// Create secure API handler for admin operations
const secureAdminAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_API);

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const secureHandler = secureAdminAPI(async (req: NextRequest) => {
    try {
      const { slug } = await params;

      if (!slug) {
        return NextResponse.json({ error: 'Blog identifier is required' }, { status: 400 });
      }

      // Check if slug is actually an ID (numeric)
      const isId = /^\d+$/.test(slug);
      let blogId: number;

      if (isId) {
        blogId = parseInt(slug, 10);
      } else {
        // If it's a slug, find the blog to get its ID
        const blog = await getBlogBySlugAdmin(slug);
        if (!blog) {
          return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        blogId = blog.id;
      }

      // Perform deletion
      const result = await deleteBlog(blogId);

      if (result.changes === 0) {
        return NextResponse.json({ error: 'Blog not found or already deleted' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
  });

  return secureHandler(request);
}
