export interface CourseModule {
  title: string;
  description: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  price: string;
  originalPrice?: string;
  category: string[];
  features: string[];
  modules: CourseModule[];
  outcomes: string[];
  idealFor: string[];
  tagline: string;
  badge: string;
  image: string;
  instructor: string;
  rating: number;
  students: number;
}

export const courses: Course[] = [
  {
    id: 'core-java-advanced',
    title: 'Core Java with Advanced Concepts',
    subtitle: '+ Competitive Programming',
    description: 'Master Java from fundamentals to advanced concepts including OOP, Collections, Multithreading, and competitive programming skills.',
    level: 'Beginner',
    duration: '2 months',
    price: '₹2,500',
    originalPrice: '₹5,000',
    category: ['Programming', 'Java', 'Competitive Programming'],
    features: [
      'Java Fundamentals to Advanced',
      'Object-Oriented Programming',
      'Collections Framework',
      'Multithreading & Concurrency',
      'Competitive Programming',
      'Real-world Projects',
      'Interview Preparation',
      'Lifetime Access'
    ],
    modules: [
      {
        title: 'Beginner / Core Java Fundamentals',
        description: 'Start your Java journey with fundamentals',
        topics: [
          'Java Introduction & Environment Setup',
          'Basic Syntax & Data Types',
          'Control Flow (if/else, loops)',
          'Functions & Methods',
          'Object-Oriented Programming Basics',
          'Exception Handling',
          'Java Collections Framework',
          'File I/O Operations',
          'Basic Multithreading'
        ]
      },
      {
        title: 'Intermediate / Advanced Java Concepts',
        description: 'Deep dive into advanced Java concepts',
        topics: [
          'Advanced Collections & Generics',
          'Java Memory Model & Garbage Collection',
          'Java Concurrency in Depth',
          'Java Streams and Functional Programming',
          'Java 8+ Features',
          'Annotations & Reflection',
          'JDBC and Database Interaction',
          'Networking & Sockets',
          'Design Patterns'
        ]
      },
      {
        title: 'Competitive Programming with Java',
        description: 'Master competitive programming techniques',
        topics: [
          'Time & Space Complexity Analysis',
          'Data Structures for CP',
          'Algorithm Design Patterns',
          'Problem Solving Strategies',
          'Contest Preparation',
          'Top 20 Popular Programs'
        ]
      }
    ],
    outcomes: [
      'Master Java programming from scratch',
      'Build scalable enterprise applications',
      'Excel in coding interviews',
      'Compete in programming contests',
      'Land jobs in top tech companies'
    ],
    idealFor: [
      'Beginners wanting to learn Java',
      'Students preparing for placements',
      'Developers switching to Java',
      'Competitive programming enthusiasts'
    ],
    tagline: 'Master Java from Zero to Hero with Competitive Programming',
    badge: 'Best Seller',
    image: '/courses/java-course.jpg',
    instructor: 'Rajeshwari Tech Team',
    rating: 4.9,
    students: 1250
  },
  {
    id: 'python-fullstack',
    title: 'Python Full Stack Development',
    subtitle: 'Web, Automation, Data Science & CP',
    description: 'Master Python for web development, automation, data science, and competitive programming with real-world projects.',
    level: 'Beginner',
    duration: '2 months',
    price: '₹3,500',
    originalPrice: '₹7,000',
    category: ['Programming', 'Python', 'Full Stack', 'Data Science'],
    features: [
      'Python Fundamentals to Advanced',
      'Web Development with Django/Flask',
      'Data Science & Analytics',
      'Automation & Scripting',
      'Competitive Programming',
      'Real-world Projects',
      'Industry Mentorship',
      'Job Placement Assistance'
    ],
    modules: [
      {
        title: 'Python Foundations',
        description: 'Build strong Python fundamentals',
        topics: [
          'Python Setup & Virtual Environments',
          'Core Python Syntax & Data Structures',
          'Control Flow & Functions',
          'Modules & Packages',
          'File Handling & I/O',
          'Object-Oriented Programming',
          'Error Handling & Testing'
        ]
      },
      {
        title: 'Web Development & APIs',
        description: 'Build web applications and APIs',
        topics: [
          'Django/Flask Framework',
          'REST API Development',
          'Database Integration',
          'Authentication & Security',
          'Frontend Integration',
          'Deployment & DevOps'
        ]
      },
      {
        title: 'Data Science & Automation',
        description: 'Data analysis and automation skills',
        topics: [
          'Pandas & NumPy',
          'Data Visualization',
          'Machine Learning Basics',
          'Web Scraping',
          'Automation Scripts',
          'Competitive Programming'
        ]
      }
    ],
    outcomes: [
      'Build full-stack web applications',
      'Analyze and visualize data',
      'Create automation scripts',
      'Excel in Python interviews',
      'Start a career in Python development'
    ],
    idealFor: [
      'Beginners wanting to learn Python',
      'Backend developers',
      'Data science aspirants',
      'Automation engineers'
    ],
    tagline: 'From Zero to Hero: Python for Web, Data & Automation',
    badge: 'Popular',
    image: '/courses/python-course.jpg',
    instructor: 'Python Experts',
    rating: 4.8,
    students: 980
  },
  {
    id: 'rust-programming',
    title: 'Rust Programming Language',
    subtitle: 'Safe, Fast, System-Level Programming',
    description: 'Master Rust for systems programming, backend development, and building high-performance applications.',
    level: 'Intermediate',
    duration: '3 months',
    price: '₹5,000',
    originalPrice: '₹10,000',
    category: ['Programming', 'Rust', 'Systems Programming'],
    features: [
      'Rust Fundamentals',
      'Memory Safety & Ownership',
      'Concurrency & Async Programming',
      'Systems Programming',
      'Web Development with Actix',
      'Performance Optimization',
      'Real-world Projects',
      'Industry Best Practices'
    ],
    modules: [
      {
        title: 'Rust Foundations',
        description: 'Learn Rust basics and ownership model',
        topics: [
          'Environment & Tooling Setup',
          'Basic Syntax & Data Types',
          'Ownership & Borrowing',
          'Control Flow & Pattern Matching',
          'Structs & Enums',
          'Collections & Error Handling'
        ]
      },
      {
        title: 'Intermediate Rust',
        description: 'Advanced Rust concepts',
        topics: [
          'Generics & Traits',
          'Modules & Crates',
          'Closures & Iterators',
          'Ownership Deep Dive',
          'Smart Pointers',
          'Memory Safety'
        ]
      },
      {
        title: 'Async & Performance',
        description: 'Concurrency and performance optimization',
        topics: [
          'Threads & Concurrency',
          'Async Programming',
          'Unsafe Rust',
          'Performance Tools',
          'Web APIs with Actix',
          'System Utilities'
        ]
      }
    ],
    outcomes: [
      'Write safe, fast system programs',
      'Build high-performance web APIs',
      'Master memory management',
      'Understand concurrency patterns',
      'Land roles in systems programming'
    ],
    idealFor: [
      'Systems programming enthusiasts',
      'Backend developers',
      'Performance-critical application developers',
      'Open source contributors'
    ],
    tagline: 'Safe, Fast, System-Level Programming for Modern World',
    badge: 'New',
    image: '/courses/rust-course.jpg',
    instructor: 'Rust Experts',
    rating: 4.7,
    students: 320
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    subtitle: 'Master DSA for Interviews & Competitions',
    description: 'Comprehensive DSA course covering everything from basic data structures to advanced algorithms for cracking top tech interviews.',
    level: 'Beginner',
    duration: '2 months',
    price: '₹4,000',
    originalPrice: '₹6,000',
    category: ['Programming', 'Algorithms', 'Interview Prep'],
    features: [
      'Complete DSA Coverage',
      'Interview Preparation',
      'Competitive Programming',
      'Mock Interviews',
      'Problem Solving Strategies',
      'Time & Space Complexity',
      'Real Interview Questions',
      'FAANG Preparation'
    ],
    modules: [
      {
        title: 'Foundations of Algorithmic Thinking',
        description: 'Build strong algorithmic foundation',
        topics: [
          'Time & Space Complexity Analysis',
          'Basic Data Structures',
          'Arrays & Strings',
          'Linked Lists',
          'Stacks & Queues',
          'Recursion Basics'
        ]
      },
      {
        title: 'Intermediate Data Structures',
        description: 'Advanced data structures and techniques',
        topics: [
          'Trees & Binary Trees',
          'Hashing Techniques',
          'Greedy Algorithms',
          'Sorting & Searching',
          'Dynamic Programming',
          'Graph Algorithms'
        ]
      },
      {
        title: 'Advanced Algorithms',
        description: 'Expert-level algorithm mastery',
        topics: [
          'Advanced DP Problems',
          'Graph Algorithms',
          'String Algorithms',
          'Bit Manipulation',
          'Mathematics for Programming',
          'Contest Strategies'
        ]
      }
    ],
    outcomes: [
      'Crack coding interviews at top companies',
      'Master competitive programming',
      'Build strong problem-solving skills',
      'Understand algorithm design patterns',
      'Excel in technical interviews'
    ],
    idealFor: [
      'Students preparing for placements',
      'Job seekers targeting FAANG',
      'Competitive programming enthusiasts',
      'Developers wanting to improve problem-solving'
    ],
    tagline: 'Master DSA for Interviews, Competitions & Real Projects',
    badge: 'Top Rated',
    image: '/courses/dsa-course.jpg',
    instructor: 'Algorithm Experts',
    rating: 4.9,
    students: 2100
  },
  {
    id: 'sdet-java',
    title: 'Full Stack SDET(Testing) - Java',
    subtitle: 'UI, API, Performance & CI/CD',
    description: 'Become a complete Full-Stack Test Automation Engineer with Java covering UI, API, Performance testing and CI/CD.',
    level: 'Intermediate',
    duration: '2 months',
    price: '₹4,000',
    originalPrice: '₹8,000',
    category: ['Testing', 'Java', 'Automation', 'SDET'],
    features: [
      'Selenium & Playwright',
      'API Testing with Rest Assured',
      'Performance Testing (JMeter, k6)',
      'CI/CD with Jenkins',
      'Framework Development',
      'Design Patterns',
      'Multithreading',
      'Real Industry Projects'
    ],
    modules: [
      {
        title: 'UI Automation - Selenium & Playwright',
        description: 'Master web UI automation',
        topics: [
          'Selenium WebDriver',
          'Element Identification',
          'Page Object Model',
          'TestNG Integration',
          'Playwright for Modern Testing',
          'Cross-browser Testing',
          'Test Reports'
        ]
      },
      {
        title: 'API Testing - Rest Assured',
        description: 'Complete API testing suite',
        topics: [
          'REST API Basics',
          'Rest Assured Framework',
          'Authentication & Headers',
          'JSON Validation',
          'API Chaining',
          'TestNG Integration'
        ]
      },
      {
        title: 'Performance & CI/CD',
        description: 'Performance testing and automation',
        topics: [
          'JMeter Load Testing',
          'k6 Performance Testing',
          'Jenkins Pipelines',
          'Docker Integration',
          'Multithreading',
          'Framework Architecture'
        ]
      }
    ],
    outcomes: [
      'Build enterprise-grade test frameworks',
      'Master UI, API, and Performance testing',
      'Implement CI/CD pipelines',
      'Land SDET roles in top companies',
      'Lead test automation teams'
    ],
    idealFor: [
      'Manual testers transitioning to automation',
      'Test automation engineers',
      'QA professionals',
      'Developers interested in testing'
    ],
    tagline: 'Become a Real Full-Stack Test Automation Engineer',
    badge: 'Industry Ready',
    image: '/courses/sdet-java-course.jpg',
    instructor: 'QA Automation Experts',
    rating: 4.8,
    students: 750
  },
  {
    id: 'sdet-python',
    title: 'Full Stack Testing - Python',
    subtitle: 'UI, API, Performance & CI/CD',
    description: 'Master Python-based test automation covering UI, API, Performance testing with modern tools and frameworks.',
    level: 'Intermediate',
    duration: '2 months',
    price: '₹4,000',
    originalPrice: '₹8,000',
    category: ['Testing', 'Python', 'Automation'],
    features: [
      'Selenium & Playwright with Python',
      'API Testing with Pytest',
      'Performance Testing',
      'CI/CD Integration',
      'Framework Development',
      'Design Patterns',
      'Parallel Execution',
      'Industry Projects'
    ],
    modules: [
      {
        title: 'UI Automation with Python',
        description: 'Python-based UI testing',
        topics: [
          'Selenium with Python',
          'Playwright for Python',
          'Pytest Framework',
          'Page Object Model',
          'Parallel Test Execution',
          'Test Reports'
        ]
      },
      {
        title: 'API Testing & Performance',
        description: 'API and performance testing',
        topics: [
          'API Testing with Pytest',
          'Authentication Handling',
          'JMeter & k6',
          'Performance Metrics',
          'Load Testing Strategies'
        ]
      },
      {
        title: 'Framework & CI/CD',
        description: 'Complete automation framework',
        topics: [
          'Framework Architecture',
          'Design Patterns',
          'Jenkins Integration',
          'Docker & Parallel Execution',
          'Test Data Management'
        ]
      }
    ],
    outcomes: [
      'Build scalable Python test frameworks',
      'Master modern testing tools',
      'Implement CI/CD with Python',
      'Excel in Python automation roles',
      'Lead test automation initiatives'
    ],
    idealFor: [
      'Python developers',
      'Test automation engineers',
      'QA professionals',
      'Backend developers interested in testing'
    ],
    tagline: 'Complete Python Test Automation Engineer',
    badge: 'Python Focus',
    image: '/courses/sdet-python-course.jpg',
    instructor: 'Python QA Experts',
    rating: 4.7,
    students: 650
  },
  {
    id: 'sdet-javascript',
    title: 'Full Stack Testing - JavaScript',
    subtitle: 'UI, API, Performance & CI/CD',
    description: 'Master JavaScript-based test automation with Cypress, Playwright, and modern testing frameworks.',
    level: 'Intermediate',
    duration: '2 months',
    price: '₹6,000',
    originalPrice: '₹10,000',
    category: ['Testing', 'JavaScript', 'Automation'],
    features: [
      'Cypress & Playwright',
      'API Testing with Jest',
      'Performance Testing',
      'CI/CD with Jenkins',
      'Framework Development',
      'Modern JS Tools',
      'Parallel Execution',
      'Industry Projects'
    ],
    modules: [
      {
        title: 'UI Automation with JavaScript',
        description: 'Modern JavaScript testing',
        topics: [
          'Cypress Framework',
          'Playwright for JavaScript',
          'Jest Testing Framework',
          'Page Object Model',
          'Cross-browser Testing'
        ]
      },
      {
        title: 'API Testing & Performance',
        description: 'API and performance testing',
        topics: [
          'API Testing with Jest',
          'Postman & Newman',
          'k6 Load Testing',
          'Performance Metrics',
          'Automated Reporting'
        ]
      },
      {
        title: 'Framework & CI/CD',
        description: 'Complete JavaScript framework',
        topics: [
          'Framework Architecture',
          'Jenkins Pipelines',
          'Docker Integration',
          'Parallel Execution',
          'Modern DevOps'
        ]
      }
    ],
    outcomes: [
      'Master modern JavaScript testing',
      'Build scalable test frameworks',
      'Implement CI/CD with JS',
      'Excel in frontend automation',
      'Lead modern test automation'
    ],
    idealFor: [
      'JavaScript developers',
      'Frontend developers',
      'Test automation engineers',
      'Full-stack developers'
    ],
    tagline: 'Unlock JavaScript Test Automation Power',
    badge: 'Modern Stack',
    image: '/courses/sdet-js-course.jpg',
    instructor: 'JavaScript QA Experts',
    rating: 4.6,
    students: 580
  },
  {
    id: 'backend-java',
    title: 'Backend Development - Java',
    subtitle: 'Spring Boot, Hibernate & Microservices',
    description: 'Master backend development with Java Spring Boot, build RESTful APIs, microservices, and scalable applications.',
    level: 'Intermediate',
    duration: '3 months',
    price: '₹6,000',
    originalPrice: '₹15,000',
    category: ['Backend', 'Java', 'Spring Boot', 'Microservices'],
    features: [
      'Spring Boot Framework',
      'RESTful API Development',
      'Database Integration',
      'Microservices Architecture',
      'Security & Authentication',
      'Cloud Deployment',
      'Real-world Projects',
      'Industry Best Practices'
    ],
    modules: [
      {
        title: 'Spring Boot Fundamentals',
        description: 'Master Spring Boot basics',
        topics: [
          'Spring Framework Overview',
          'Spring Boot Setup',
          'REST API Development',
          'Error Handling',
          'Data Validation',
          'Testing APIs'
        ]
      },
      {
        title: 'Database & Persistence',
        description: 'Database integration and management',
        topics: [
          'JDBC & JPA',
          'Hibernate ORM',
          'Spring Data JPA',
          'Database Transactions',
          'Query Optimization',
          'Database Security'
        ]
      },
      {
        title: 'Microservices & Cloud',
        description: 'Advanced backend architecture',
        topics: [
          'Microservices Architecture',
          'Spring Cloud',
          'Service Discovery',
          'API Gateway',
          'Cloud Deployment',
          'Monitoring & Logging'
        ]
      }
    ],
    outcomes: [
      'Build scalable backend applications',
      'Master Spring Boot ecosystem',
      'Design microservices architecture',
      'Deploy to cloud platforms',
      'Land backend developer roles'
    ],
    idealFor: [
      'Java developers',
      'Backend development aspirants',
      'Full-stack developers',
      'System architects'
    ],
    tagline: 'Become Backend Development Expert with Java',
    badge: 'Enterprise Ready',
    image: '/courses/backend-java-course.jpg',
    instructor: 'Backend Experts',
    rating: 4.8,
    students: 890
  },
  {
    id: 'frontend-react',
    title: 'Frontend Development - ReactJS',
    subtitle: 'Modern Web Development',
    description: 'Master frontend development with ReactJS, build responsive web applications, and create amazing user experiences.',
    level: 'Beginner',
    duration: '3 months',
    price: '6,000',
    originalPrice: '₹10,000',
    category: ['Frontend', 'React', 'JavaScript', 'Web Development'],
    features: [
      'ReactJS Fundamentals',
      'Modern JavaScript (ES6+)',
      'State Management (Redux)',
      'Responsive Design',
      'API Integration',
      'Testing & Deployment',
      'Real-world Projects',
      'Industry Best Practices'
    ],
    modules: [
      {
        title: 'Web Development Fundamentals',
        description: 'Build strong web development foundation',
        topics: [
          'HTML5 & CSS3',
          'JavaScript ES6+',
          'Responsive Design',
          'Bootstrap & CSS Grid',
          'Version Control (Git)',
          'Web Development Tools'
        ]
      },
      {
        title: 'ReactJS Core Concepts',
        description: 'Master React fundamentals',
        topics: [
          'React Components',
          'Props & State',
          'Lifecycle Methods',
          'Hooks (useState, useEffect)',
          'Event Handling',
          'Conditional Rendering'
        ]
      },
      {
        title: 'Advanced React & Deployment',
        description: 'Advanced React and production deployment',
        topics: [
          'State Management with Redux',
          'React Router',
          'API Integration',
          'Performance Optimization',
          'Testing React Apps',
          'Deployment & CI/CD'
        ]
      }
    ],
    outcomes: [
      'Build modern web applications',
      'Master React ecosystem',
      'Create responsive UIs',
      'Integrate with backend APIs',
      'Land frontend developer roles'
    ],
    idealFor: [
      'Frontend development beginners',
      'Web developers',
      'UI/UX designers',
      'Full-stack aspirants'
    ],
    tagline: 'Become Frontend Development Expert with ReactJS',
    badge: 'Modern UI',
    image: '/courses/frontend-react-course.jpg',
    instructor: 'Frontend Experts',
    rating: 4.7,
    students: 1100
  },
  {
    id: 'placement-prep',
    title: 'Pre-Campus Placement Program',
    subtitle: 'Ace Interviews & Land Dream Job',
    description: 'Comprehensive placement preparation covering aptitude tests, coding interviews, HR preparation, and soft skills.',
    level: 'Beginner',
    duration: '2 months',
    price: '₹6,000',
    originalPrice: '₹20,000',
    category: ['Interview Prep', 'Placement', 'Soft Skills', 'Aptitude'],
    features: [
      'Aptitude Test Mastery',
      'Coding Interview Prep',
      'HR Interview Preparation',
      'Resume Building',
      'Soft Skills Development',
      'Mock Interviews',
      'Company-specific Prep',
      'Placement Guarantee'
    ],
    modules: [
      {
        title: 'Aptitude & Logical Reasoning',
        description: 'Master quantitative and logical reasoning',
        topics: [
          'Quantitative Aptitude',
          'Logical Reasoning',
          'Verbal Ability',
          'Time Management',
          'Mock Tests',
          'Strategy Development'
        ]
      },
      {
        title: 'Technical Interview Prep',
        description: 'Coding and technical interview preparation',
        topics: [
          'Data Structures & Algorithms',
          'System Design Basics',
          'Problem Solving Strategies',
          'Coding Best Practices',
          'Mock Technical Interviews',
          'Company-specific Questions'
        ]
      },
      {
        title: 'HR & Soft Skills',
        description: 'HR interview and soft skills development',
        topics: [
          'HR Interview Preparation',
          'Resume Building',
          'Communication Skills',
          'Leadership & Teamwork',
          'Mock HR Interviews',
          'Negotiation Skills'
        ]
      }
    ],
    outcomes: [
      'Crack aptitude tests with confidence',
      'Excel in coding interviews',
      'Master HR interview skills',
      'Build impressive resume',
      'Land dream job at top companies'
    ],
    idealFor: [
      'Final year students',
      'Job seekers',
      'Career switchers',
      'Placement aspirants'
    ],
    tagline: 'Master Aptitude, Coding & HR - Land Your Dream Job',
    badge: 'Placement Ready',
    image: '/courses/placement-course.jpg',
    instructor: 'HR & Technical Experts',
    rating: 4.9,
    students: 1800
  },
  {
    id: 'devops-mastery',
    title: 'DevOps Mastery',
    subtitle: 'CI/CD, Infrastructure & Monitoring',
    description: 'Master DevOps practices with Docker, Kubernetes, Jenkins, Terraform, and build complete CI/CD pipelines.',
    level: 'Intermediate',
    duration: '2 months',
    price: '₹8,000',
    originalPrice: '₹15,000',
    category: ['DevOps', 'CI/CD', 'Cloud', 'Infrastructure'],
    features: [
      'Docker & Containerization',
      'Kubernetes Orchestration',
      'CI/CD with Jenkins',
      'Infrastructure as Code',
      'Cloud Platforms (AWS/Azure)',
      'Monitoring & Logging',
      'Security Best Practices',
      'Real-world Projects'
    ],
    modules: [
      {
        title: 'DevOps Fundamentals',
        description: 'Build DevOps foundation',
        topics: [
          'DevOps Culture & Practices',
          'Version Control (Git)',
          'CI/CD Concepts',
          'Containerization Basics',
          'Cloud Platforms Overview',
          'Monitoring Introduction'
        ]
      },
      {
        title: 'Containerization & Orchestration',
        description: 'Master containers and orchestration',
        topics: [
          'Docker Deep Dive',
          'Docker Compose',
          'Kubernetes Fundamentals',
          'Pods, Services, Deployments',
          'Helm Package Manager',
          'Container Security'
        ]
      },
      {
        title: 'Infrastructure & Monitoring',
        description: 'Infrastructure automation and monitoring',
        topics: [
          'Infrastructure as Code (Terraform)',
          'Configuration Management',
          'CI/CD Pipelines',
          'Monitoring with Prometheus',
          'Logging with ELK Stack',
          'Security & Compliance'
        ]
      }
    ],
    outcomes: [
      'Master DevOps tools and practices',
      'Build automated CI/CD pipelines',
      'Deploy and manage cloud infrastructure',
      'Implement monitoring and logging',
      'Land DevOps engineer roles'
    ],
    idealFor: [
      'System administrators',
      'Developers transitioning to DevOps',
      'Infrastructure engineers',
      'Cloud engineers'
    ],
    tagline: 'Master DevOps with CI/CD, Infrastructure & Monitoring',
    badge: 'Industry Standard',
    image: '/courses/devops-course.jpg',
    instructor: 'DevOps Experts',
    rating: 4.8,
    students: 720
  }
];

export const courseCategories = [
  'All Courses',
  'Programming',
  'Testing',
  'Full Stack',
  'Backend',
  'Frontend',
  'DevOps',
  'Interview Prep',
  'Java',
  'Python',
  'JavaScript',
  'Rust'
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'All Courses') {
    return courses;
  }
  return courses.filter(course => course.category.includes(category));
};
