import nodemailer from 'nodemailer';

// Email configuration using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'rajeshwaritechservice@gmail.com',
      pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD, // App password, not regular password
    },
  });
};

// Send newsletter email to subscribers when a new blog is published
export const sendNewsletterEmail = async (blogData: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image?: string;
}, subscriberData: {
  email: string;
  name?: string;
  interests: string[];
}) => {
  try {
    const transporter = createTransporter();
    
    const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}/blogs/${blogData.slug}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'rajeshwaritechservice@gmail.com',
      to: subscriberData.email,
      subject: `📚 New Blog Post: ${blogData.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 RajeshwariTech Newsletter</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Latest insights and updates</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">${blogData.title}</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #475569; line-height: 1.6; margin: 0; font-size: 16px;">${blogData.excerpt}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${blogUrl}" 
                 style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                📖 Read Full Article
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <div>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">
                    <strong>Author:</strong> ${blogData.author}
                  </p>
                  <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">
                    <strong>Category:</strong> ${blogData.category}
                  </p>
                </div>
                <div style="text-align: right;">
                  <p style="color: #64748b; margin: 0; font-size: 12px;">
                    Published: ${new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div style="background: #f1f5f9; padding: 20px; text-align: center;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0;">🚀 More Resources</h3>
            <p style="color: #475569; margin: 0 0 15px 0;">Explore our latest courses and services:</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}/courses" 
                 style="color: #3b82f6; text-decoration: none; font-size: 14px;">📚 Courses</a>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}/services" 
                 style="color: #3b82f6; text-decoration: none; font-size: 14px;">🛠️ Services</a>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}/contact" 
                 style="color: #3b82f6; text-decoration: none; font-size: 14px;">📞 Contact</a>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">You're receiving this because you subscribed to our newsletter.</p>
            <p style="margin: 5px 0 0 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}/unsubscribe?email=${subscriberData.email}" 
                 style="color: #3b82f6; text-decoration: none;">Unsubscribe</a> | 
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://rajeshwaritech.com'}" 
                 style="color: #3b82f6; text-decoration: none;">Visit Website</a>
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Newsletter email sent to subscriber:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Error sending newsletter email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Send newsletter to all subscribers
export const sendNewsletterToAllSubscribers = async (blogData: {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image?: string;
}, subscribers: Array<{
  email: string;
  name?: string;
  interests: string[];
}>) => {
  const results = [];
  
  for (const subscriber of subscribers) {
    try {
      const result = await sendNewsletterEmail(blogData, subscriber);
      results.push({
        email: subscriber.email,
        success: result.success,
        messageId: result.messageId,
        error: result.error
      });
      
      // Add a small delay to avoid overwhelming the email service
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      results.push({
        email: subscriber.email,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return results;
};
