/**
 * Centralized configuration for all numerical data and site constants
 * This file makes it easy to update values without searching through multiple components
 */

export const SITE_CONFIG = {
  // Statistics
  STATS: {
    STUDENTS_TRAINED: '5000+',
    COURSES_OFFERED: '50+',
    SUCCESS_RATE: '95%',
    YEARS_EXPERIENCE: '10+'
  },

  // Feature descriptions with numerical data
  FEATURES: {
    INDUSTRY_EXPERTS: {
      EXPERIENCE_YEARS: '10+',
      COMPANIES: ['Google', 'Amazon', 'Microsoft']
    },
    PROJECT_BASED_LEARNING: {
      PROJECT_COUNT: '15+'
    },
    PLACEMENT_ASSISTANCE: {
      SUCCESS_RATE: '95%'
    }
  },

  // Course data
  COURSES: {
    DEFAULT_RATING: 4.8,
    DEFAULT_STUDENTS: 1250,
    DEFAULT_DURATION: '12 weeks',
    FEATURES_LIMIT: 4 // How many features to show before "more features"
  },

  // Blog data
  BLOG: {
    EXCERPT_LENGTH: 150,
    CONTENT_PREVIEW_LENGTH: 300
  },

  // UI Constants
  UI: {
    ANIMATION_DURATION: 0.3,
    HOVER_SCALE: 1.1,
    CARD_SHADOW: '0 10px 25px rgba(0, 0, 0, 0.1)',
    GRADIENT_OPACITY: 0.1
  },

  // Contact information
  CONTACT: {
    PHONE: '+91 9876543210',
    EMAIL: 'info@rajeshwaritech.com',
    ADDRESS: '123 Tech Street, Bangalore, India'
  },

  // Social media
  SOCIAL: {
    LINKEDIN: 'https://linkedin.com/company/rajeshwaritech',
    TWITTER: 'https://twitter.com/rajeshwaritech',
    INSTAGRAM: 'https://instagram.com/rajeshwaritech',
    YOUTUBE: 'https://youtube.com/rajeshwaritech'
  },

  // API endpoints
  API: {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://rajeshwaritech.com/api' 
      : 'http://localhost:3001/api',
    UPLOAD_ENDPOINT: '/upload/image',
    BLOGS_ENDPOINT: '/blogs'
  },

  // Pagination
  PAGINATION: {
    BLOGS_PER_PAGE: 6,
    COURSES_PER_PAGE: 9
  },

  // File upload limits
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    MAX_IMAGES_PER_BLOG: 10
  }
};

// Helper functions for dynamic content generation
export const getFeatureDescription = (featureType: keyof typeof SITE_CONFIG.FEATURES) => {
  const config = SITE_CONFIG.FEATURES[featureType];
  
  switch (featureType) {
    case 'INDUSTRY_EXPERTS':
      return `Learn from professionals with ${config.EXPERIENCE_YEARS} years of experience in top tech companies like ${config.COMPANIES.join(', ')}.`;
    
    case 'PROJECT_BASED_LEARNING':
      return `Build ${config.PROJECT_COUNT} real-world projects that you can showcase in your portfolio to impress recruiters.`;
    
    case 'PLACEMENT_ASSISTANCE':
      return `Get dedicated placement support with resume building, mock interviews, and direct referrals to partner companies.`;
    
    default:
      return '';
  }
};

// Course data with dynamic values
export const getCourseData = () => ({
  rating: SITE_CONFIG.COURSES.DEFAULT_RATING,
  students: SITE_CONFIG.COURSES.DEFAULT_STUDENTS,
  duration: SITE_CONFIG.COURSES.DEFAULT_DURATION,
  featuresLimit: SITE_CONFIG.COURSES.FEATURES_LIMIT
});

// Stats data with dynamic values
export const getStatsData = () => [
  { 
    number: SITE_CONFIG.STATS.STUDENTS_TRAINED, 
    label: 'Students Trained' 
  },
  { 
    number: SITE_CONFIG.STATS.COURSES_OFFERED, 
    label: 'Courses Offered' 
  },
  { 
    number: SITE_CONFIG.STATS.SUCCESS_RATE, 
    label: 'Success Rate' 
  },
  { 
    number: SITE_CONFIG.STATS.YEARS_EXPERIENCE, 
    label: 'Years Experience' 
  }
];
