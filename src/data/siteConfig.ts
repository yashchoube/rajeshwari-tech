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
  },

  // Corporate Training Configuration
  CORPORATE_TRAINING: {
    PROGRAMS: [
      {
        title: 'Java Enterprise Development',
        duration: '3 months',
        participants: '20-50',
        level: 'Intermediate to Advanced',
        price: '₹2,50,000',
        features: ['Spring Framework', 'Microservices', 'Database Integration', 'Cloud Deployment']
      },
      {
        title: 'Python for Data Science',
        duration: '2 months',
        participants: '15-30',
        level: 'Beginner to Intermediate',
        price: '₹2,00,000',
        features: ['Pandas & NumPy', 'Machine Learning', 'Data Visualization', 'Big Data Tools']
      },
      {
        title: 'Full Stack Web Development',
        duration: '4 months',
        participants: '25-40',
        level: 'Beginner to Advanced',
        price: '₹3,00,000',
        features: ['React.js', 'Node.js', 'Database Design', 'DevOps & Deployment']
      },
      {
        title: 'DevOps & Cloud Computing',
        duration: '2 months',
        participants: '15-25',
        level: 'Intermediate',
        price: '₹2,20,000',
        features: ['Docker & Kubernetes', 'AWS/Azure', 'CI/CD Pipelines', 'Infrastructure as Code']
      },
      {
        title: 'Automation Testing & QA',
        duration: '2 months',
        participants: '20-30',
        level: 'Beginner to Intermediate',
        price: '₹1,80,000',
        features: ['Selenium WebDriver', 'API Testing', 'Test Frameworks', 'CI/CD Integration']
      },
      {
        title: 'Performance Testing',
        duration: '1.5 months',
        participants: '15-25',
        level: 'Intermediate',
        price: '₹1,50,000',
        features: ['Load Testing', 'JMeter', 'Performance Monitoring', 'Optimization Strategies']
      }
    ],
    SUCCESS_METRICS: {
      COMPANIES_TRAINED: '500+',
      SUCCESS_RATE: '95%',
      CLIENT_SATISFACTION: '4.9★'
    }
  },

  // Freelance Development Configuration
  FREELANCE_DEVELOPMENT: {
    SERVICES: [
      {
        title: 'Web Development',
        price: 'Starting from ₹25,000',
        duration: '2-8 weeks',
        technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js']
      },
      {
        title: 'Mobile App Development',
        price: 'Starting from ₹35,000',
        duration: '3-12 weeks',
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
      },
      {
        title: 'Backend Development',
        price: 'Starting from ₹20,000',
        duration: '2-6 weeks',
        technologies: ['Python', 'Java', 'Node.js', 'PostgreSQL']
      },
      {
        title: 'Cloud Solutions',
        price: 'Starting from ₹30,000',
        duration: '1-4 weeks',
        technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes']
      },
      {
        title: 'Automation Testing',
        price: 'Starting from ₹25,000',
        duration: '2-6 weeks',
        technologies: ['Selenium', 'Cypress', 'Playwright', 'Jest']
      },
      {
        title: 'QA & Testing Services',
        price: 'Starting from ₹20,000',
        duration: '1-4 weeks',
        technologies: ['Manual Testing', 'API Testing', 'Performance Testing', 'Security Testing']
      }
    ],
    SUCCESS_METRICS: {
      PROJECTS_DELIVERED: '100+',
      HAPPY_CLIENTS: '50+',
      DELIVERY_TIME: 'Fast'
    }
  },

  // Interview Preparation Configuration
  INTERVIEW_PREPARATION: {
    PROGRAMS: [
      {
        title: 'Technical Interview Prep',
        duration: '4-8 weeks',
        format: '1-on-1 Sessions',
        price: '₹15,000',
        features: ['Coding Practice', 'Problem Solving', 'System Design', 'Mock Interviews']
      },
      {
        title: 'Behavioral Interview Prep',
        duration: '2-4 weeks',
        format: 'Group Sessions',
        price: '₹8,000',
        features: ['STAR Method', 'Leadership Stories', 'Conflict Resolution', 'Teamwork Examples']
      },
      {
        title: 'System Design Interview',
        duration: '6-10 weeks',
        format: '1-on-1 Sessions',
        price: '₹25,000',
        features: ['System Architecture', 'Scalability Patterns', 'Database Design', 'Real-world Examples']
      },
      {
        title: 'Executive Interview Prep',
        duration: '3-6 weeks',
        format: '1-on-1 Sessions',
        price: '₹20,000',
        features: ['Strategic Thinking', 'Leadership Scenarios', 'Business Acumen', 'Vision Communication']
      }
    ],
    SUCCESS_METRICS: {
      STUDENTS_PLACED: '500+',
      SUCCESS_RATE: '95%',
      COMPANIES: 'FAANG Companies'
    }
  },

  // Mentorship Configuration
  MENTORSHIP: {
    PROGRAMS: [
      {
        title: 'Career Guidance',
        duration: '3-6 months',
        sessions: '12-24 sessions',
        price: '₹25,000',
        features: ['Career Assessment', 'Goal Setting', 'Skill Development', 'Network Building']
      },
      {
        title: 'Technical Mentorship',
        duration: '2-4 months',
        sessions: '8-16 sessions',
        price: '₹20,000',
        features: ['Code Reviews', 'Technical Projects', 'Best Practices', 'Problem Solving']
      },
      {
        title: 'Leadership Development',
        duration: '4-8 months',
        sessions: '16-32 sessions',
        price: '₹35,000',
        features: ['Leadership Skills', 'Team Management', 'Strategic Thinking', 'Communication']
      },
      {
        title: 'Interview Preparation',
        duration: '1-3 months',
        sessions: '4-12 sessions',
        price: '₹15,000',
        features: ['Mock Interviews', 'Technical Prep', 'Behavioral Prep', 'Negotiation Skills']
      }
    ],
    SUCCESS_METRICS: {
      MENTEES_GUIDED: '200+',
      SUCCESS_RATE: '95%',
      CAREER_GROWTH: 'Career Growth'
    }
  }
};

// Helper functions for dynamic content generation
export const getFeatureDescription = (featureType: keyof typeof SITE_CONFIG.FEATURES) => {
  switch (featureType) {
    case 'INDUSTRY_EXPERTS':
      const industryConfig = SITE_CONFIG.FEATURES.INDUSTRY_EXPERTS;
      return `Learn from professionals with ${industryConfig.EXPERIENCE_YEARS} years of experience in top tech companies like ${industryConfig.COMPANIES.join(', ')}.`;
    
    case 'PROJECT_BASED_LEARNING':
      const projectConfig = SITE_CONFIG.FEATURES.PROJECT_BASED_LEARNING;
      return `Build ${projectConfig.PROJECT_COUNT} real-world projects that you can showcase in your portfolio to impress recruiters.`;
    
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
