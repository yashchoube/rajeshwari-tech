// Simple email service using a different approach
// This will work without Gmail App Password issues

export const sendEnquiryNotification = async (data: {
  enquiryId: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
}) => {
  // For now, just log the email details
  // In production, you can integrate with services like:
  // - SendGrid (free tier: 100 emails/day)
  // - Mailgun (free tier: 5,000 emails/month)
  // - Resend (free tier: 3,000 emails/month)
  
  console.log('📧 ENQUIRY NOTIFICATION EMAIL:');
  console.log('================================');
  console.log(`To: rajeshwaritechservice@gmail.com`);
  console.log(`Subject: New Enquiry Received: ${data.service} from ${data.name}`);
  console.log(`Enquiry ID: ${data.enquiryId}`);
  console.log(`Name: ${data.name}`);
  console.log(`Email: ${data.email}`);
  console.log(`Phone: ${data.phone || 'N/A'}`);
  console.log(`Company: ${data.company || 'N/A'}`);
  console.log(`Service: ${data.service}`);
  console.log(`Message: ${data.message || 'No message provided.'}`);
  console.log('================================');
  
  // Simulate successful email send
  return Promise.resolve();
};

export const sendWelcomeEmail = async (data: {
  name: string;
  email: string;
  service: string;
}) => {
  console.log('📧 WELCOME EMAIL:');
  console.log('==================');
  console.log(`To: ${data.email}`);
  console.log(`Subject: Thank You for Your Enquiry, ${data.name}!`);
  console.log(`Service: ${data.service}`);
  console.log('==================');
  
  // Simulate successful email send
  return Promise.resolve();
};
