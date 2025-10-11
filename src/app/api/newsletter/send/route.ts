import { NextRequest, NextResponse } from 'next/server';
import { getAllNewsletterSubscriptions } from '@/lib/neon-database';
import { sendNewsletterToAllSubscribers } from '@/lib/newsletterEmailService';
import { createSecureAPI, SECURITY_CONFIGS } from '@/lib/apiSecurity';
import { Validator } from '@/lib/validation';

// Create secure API handler
const secureAPI = createSecureAPI(SECURITY_CONFIGS.ADMIN_ONLY);

export const POST = secureAPI(async function(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Enhanced validation with security
    const validator = new Validator();
    const validationResult = validator
      .required('title', body.title)
      .required('slug', body.slug)
      .required('excerpt', body.excerpt)
      .required('author', body.author)
      .required('category', body.category)
      .getResult();

    if (!validationResult.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.errors 
        },
        { status: 400 }
      );
    }

    const { title, slug, excerpt, author, category, featured_image } = body;
    
    // Get all active subscribers
    const subscribers = await getAllNewsletterSubscriptions();
    const activeSubscribers = subscribers.filter(sub => sub.status === 'subscribed');
    
    if (activeSubscribers.length === 0) {
      return NextResponse.json({ 
        success: true,
        message: 'No active subscribers found',
        sent: 0,
        total: 0
      });
    }
    
    // Parse interests for each subscriber
    const subscribersWithInterests = activeSubscribers.map(sub => ({
      email: sub.email,
      name: sub.name,
      interests: typeof sub.interests === 'string' ? JSON.parse(sub.interests) : sub.interests
    }));
    
    // Send newsletter to all subscribers
    const results = await sendNewsletterToAllSubscribers({
      title,
      slug,
      excerpt,
      author,
      category,
      featured_image
    }, subscribersWithInterests);
    
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;
    
    return NextResponse.json({ 
      success: true,
      message: `Newsletter sent to ${successCount} subscribers`,
      sent: successCount,
      failed: failureCount,
      total: activeSubscribers.length,
      results: results
    });
    
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json({ 
      error: 'Failed to send newsletter',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
});
