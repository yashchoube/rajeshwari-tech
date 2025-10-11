import { NextRequest, NextResponse } from 'next/server';
import { approveBlog, deleteBlog, getBlogById, getAllNewsletterSubscriptions } from '@/lib/neon-database';
import { sendNewsletterToAllSubscribers } from '@/lib/newsletterEmailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body as { id?: number };
    
    console.log('Approving blog with ID:', id);
    
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    
    await approveBlog(id);
    console.log('Blog approved successfully');
    
    // Get the approved blog details
    const blog = await getBlogById(id);
    
    if (blog && blog.status === 'published') {
      try {
        // Get all active subscribers
        const subscribers = await getAllNewsletterSubscriptions();
        const activeSubscribers = subscribers.filter(sub => sub.status === 'subscribed');
        
        if (activeSubscribers.length > 0) {
          // Parse interests for each subscriber
          const subscribersWithInterests = activeSubscribers.map(sub => ({
            email: sub.email,
            name: sub.name,
            interests: typeof sub.interests === 'string' ? JSON.parse(sub.interests) : sub.interests
          }));
          
          // Send newsletter to all subscribers
          const newsletterResults = await sendNewsletterToAllSubscribers({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt || '',
            author: blog.author || 'RajeshwariTech Team',
            category: blog.category || 'Technology',
            featured_image: blog.featured_image
          }, subscribersWithInterests);
          
          const successCount = newsletterResults.filter(r => r.success).length;
          console.log(`📧 Newsletter sent to ${successCount} subscribers for blog: ${blog.title}`);
        }
      } catch (newsletterError) {
        console.error('❌ Error sending newsletter (blog still approved):', newsletterError);
        // Don't fail the blog approval if newsletter fails
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog approved and published successfully',
      blogId: id
    });
  } catch (error) {
    console.error('Error approving blog:', error);
    return NextResponse.json({ 
      error: 'Failed to approve blog',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    if (!id) {
      return NextResponse.json({ error: 'Blog id is required' }, { status: 400 });
    }
    await deleteBlog(id);
    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}


