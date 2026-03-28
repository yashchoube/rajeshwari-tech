import { z } from 'zod';

/**
 * Common regex for phone validation (Relaxed for international formats but ensuring 10+ digits)
 */
export const phoneRegex = /^\+?[0-9]{10,15}$/;

/**
 * Enrollment Schema
 */
export const enrollmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  courseId: z.string().min(1, 'Course ID is required'),
  courseName: z.string().min(1, 'Course Name is required'),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  goals: z.string().max(500).optional().or(z.literal('')),
  referral: z.string().max(200).optional().or(z.literal('')),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

/**
 * Newsletter Schema
 */
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100).optional().or(z.literal('')),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/**
 * General Enquiry Schema
 */
export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
  company: z.string().max(100).optional().or(z.literal('')),
  service: z.string().min(1, 'Service is required'),
  message: z.string().max(1000).optional().or(z.literal('')),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
