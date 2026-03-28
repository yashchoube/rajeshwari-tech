import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  // Course syllabi mapping
  const syllabi = {
    'core-java-advanced': {
      filename: 'Core-Java-Advanced-Syllabus.pdf',
      content: generateJavaSyllabus()
    },
    'python-fullstack': {
      filename: 'Python-Fullstack-Syllabus.pdf',
      content: generatePythonSyllabus()
    },
    'rust-programming': {
      filename: 'Rust-Programming-Syllabus.pdf',
      content: generateRustSyllabus()
    },
    'data-structures-algorithms': {
      filename: 'DSA-Syllabus.pdf',
      content: generateDSASyllabus()
    },
    'sdet-java': {
      filename: 'SDET-Java-Syllabus.pdf',
      content: generateSDETJavaSyllabus()
    },
    'sdet-python': {
      filename: 'SDET-Python-Syllabus.pdf',
      content: generateSDETPythonSyllabus()
    },
    'sdet-javascript': {
      filename: 'SDET-JavaScript-Syllabus.pdf',
      content: generateSDETJavaScriptSyllabus()
    },
    'backend-java': {
      filename: 'Backend-Java-Syllabus.pdf',
      content: generateBackendJavaSyllabus()
    },
    'frontend-react': {
      filename: 'Frontend-React-Syllabus.pdf',
      content: generateFrontendReactSyllabus()
    },
    'placement-prep': {
      filename: 'Placement-Prep-Syllabus.pdf',
      content: generatePlacementPrepSyllabus()
    },
    'devops-mastery': {
      filename: 'DevOps-Mastery-Syllabus.pdf',
      content: generateDevOpsSyllabus()
    }
  };

  const syllabus = syllabi[courseId as keyof typeof syllabi];

  if (!syllabus) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  // Create a simple text-based syllabus
  const syllabusText = syllabus.content;

  return new NextResponse(syllabusText, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${syllabus.filename}"`,
    },
  });
}

function generateJavaSyllabus(): string {
  return `CORE JAVA + COMPETITIVE PROGRAMMING SYLLABUS
===============================================

COURSE OVERVIEW:
- Duration: 6 months
- Level: Beginner to Advanced
- Projects: 15+ Real-world projects

MODULE 1: JAVA FUNDAMENTALS
===========================
• Java Introduction & Environment Setup
• Variables, Data Types, Operators
• Control Flow (if/else, loops)
• Methods & Functions
• Arrays & Strings
• Exception Handling Basics

MODULE 2: OBJECT-ORIENTED PROGRAMMING
=====================================
• Classes & Objects
• Inheritance & Polymorphism
• Encapsulation & Abstraction
• Interfaces & Abstract Classes
• Packages & Access Modifiers
• Method Overloading & Overriding

MODULE 3: ADVANCED JAVA CONCEPTS
===============================
• Collections Framework (List, Set, Map)
• Generics & Wildcards
• Streams API & Lambda Expressions
• Multithreading & Concurrency
• I/O Operations & File Handling
• JDBC & Database Connectivity

MODULE 4: COMPETITIVE PROGRAMMING
=================================
• Time & Space Complexity Analysis
• Data Structures for CP
• Algorithm Design Patterns
• Problem Solving Strategies
• Contest Preparation
• Top 50 Popular Problems

PROJECTS:
=========
1. Library Management System
2. Online Banking Application
3. E-commerce Platform
4. Chat Application
5. Task Management System

CAREER OUTCOMES:
================
• Software Developer
• Backend Developer
• Competitive Programmer
• Technical Lead
• System Architect

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generatePythonSyllabus(): string {
  return `PYTHON FULL STACK DEVELOPMENT SYLLABUS
=========================================

COURSE OVERVIEW:
- Duration: 8 months
- Level: Beginner to Advanced
- Projects: 20+ Real-world projects

MODULE 1: PYTHON FUNDAMENTALS
=============================
• Python Setup & Virtual Environments
• Variables, Data Types, Operators
• Control Flow & Functions
• Object-Oriented Programming
• File Handling & I/O
• Error Handling & Testing

MODULE 2: WEB DEVELOPMENT
=========================
• Django Framework
• Flask Framework
• REST API Development
• Database Integration (SQLite, PostgreSQL)
• Authentication & Security
• Frontend Integration

MODULE 3: DATA SCIENCE & ANALYTICS
==================================
• NumPy & Pandas
• Data Visualization (Matplotlib, Seaborn)
• Machine Learning Basics
• Web Scraping (BeautifulSoup, Scrapy)
• Data Processing & Analysis

MODULE 4: AUTOMATION & DEVOPS
=============================
• Scripting & Automation
• Docker & Containerization
• CI/CD Pipelines
• Cloud Deployment (AWS, Heroku)
• Performance Optimization

PROJECTS:
=========
1. E-commerce Website
2. Data Analysis Dashboard
3. Blog Platform
4. Stock Price Tracker
5. Social Media Analytics Tool

CAREER OUTCOMES:
================
• Python Developer
• Full Stack Developer
• Data Scientist
• DevOps Engineer
• Automation Engineer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateRustSyllabus(): string {
  return `RUST PROGRAMMING LANGUAGE SYLLABUS
======================================

COURSE OVERVIEW:
- Duration: 4 months
- Level: Intermediate to Advanced
- Projects: 10+ System-level projects

MODULE 1: RUST FUNDAMENTALS
===========================
• Environment & Tooling Setup
• Variables, Data Types, Ownership
• Control Flow & Pattern Matching
• Structs, Enums & Methods
• Collections & Error Handling
• Memory Safety Concepts

MODULE 2: INTERMEDIATE RUST
===========================
• Generics & Traits
• Modules & Crates
• Closures & Iterators
• Ownership Deep Dive
• Smart Pointers (Box, Rc, Arc)
• Interior Mutability

MODULE 3: CONCURRENCY & PERFORMANCE
===================================
• Threads & Message Passing
• Async Programming (tokio)
• Unsafe Rust & FFI
• Performance Optimization
• Web APIs with Actix
• System Programming

PROJECTS:
=========
1. Command Line Tool
2. Web Server
3. File System Utility
4. Network Application
5. Embedded System Project

CAREER OUTCOMES:
================
• Systems Programmer
• Backend Developer
• Blockchain Developer
• Game Developer
• Embedded Developer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateDSASyllabus(): string {
  return `DATA STRUCTURES & ALGORITHMS SYLLABUS
============================================

COURSE OVERVIEW:
- Duration: 5 months
- Level: Beginner to Expert
- Problems: 200+ Coding problems

MODULE 1: FOUNDATIONS
=====================
• Time & Space Complexity Analysis
• Basic Data Structures (Arrays, Strings)
• Linked Lists & Operations
• Stacks & Queues
• Recursion & Backtracking

MODULE 2: INTERMEDIATE CONCEPTS
===============================
• Trees & Binary Trees
• Binary Search Trees
• Hashing & Hash Tables
• Greedy Algorithms
• Dynamic Programming Basics

MODULE 3: ADVANCED ALGORITHMS
=============================
• Graph Algorithms (BFS, DFS)
• Shortest Path Algorithms
• Sorting & Searching
• Advanced DP Problems
• String Algorithms

MODULE 4: COMPETITIVE PROGRAMMING
=================================
• Contest Strategies
• Problem Solving Patterns
• Mathematical Algorithms
• Bit Manipulation
• Advanced Data Structures

PROJECTS:
=========
1. Algorithm Visualizer
2. Pathfinding Application
3. Sorting Algorithm Comparison
4. Graph Analysis Tool
5. Competitive Programming Platform

CAREER OUTCOMES:
================
• Software Engineer
• Algorithm Engineer
• Competitive Programmer
• Technical Interviewer
• Research Scientist

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateSDETJavaSyllabus(): string {
  return `FULL STACK SDET - JAVA SYLLABUS
=====================================

COURSE OVERVIEW:
- Duration: 6 months
- Level: Intermediate to Advanced
- Projects: 15+ Automation projects

MODULE 1: UI AUTOMATION
=======================
• Selenium WebDriver
• Element Identification Strategies
• Page Object Model (POM)
• TestNG Framework
• Cross-browser Testing
• Advanced Selenium Features

MODULE 2: API TESTING
=====================
• REST API Concepts
• Rest Assured Framework
• Authentication & Headers
• JSON Validation
• API Test Automation
• Postman Integration

MODULE 3: PERFORMANCE TESTING
=============================
• JMeter Fundamentals
• Load Testing Strategies
• Performance Metrics
• k6 Load Testing
• Performance Optimization

MODULE 4: FRAMEWORK DEVELOPMENT
===============================
• Test Framework Architecture
• Design Patterns in Testing
• CI/CD Integration
• Docker for Testing
• Reporting & Analytics

PROJECTS:
=========
1. E-commerce Test Framework
2. API Testing Suite
3. Performance Testing Platform
4. Mobile App Testing
5. End-to-End Automation

CAREER OUTCOMES:
================
• SDET Engineer
• Test Automation Engineer
• QA Lead
• DevOps Engineer
• Performance Engineer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateSDETPythonSyllabus(): string {
  return `FULL STACK SDET - PYTHON SYLLABUS
======================================

COURSE OVERVIEW:
- Duration: 5 months
- Level: Intermediate to Advanced
- Projects: 12+ Python automation projects

MODULE 1: PYTHON TESTING FUNDAMENTALS
=====================================
• Python Testing Concepts
• pytest Framework
• Unit Testing & Integration Testing
• Mocking & Test Doubles
• Test Data Management
• Test Reporting

MODULE 2: UI AUTOMATION WITH PYTHON
===================================
• Selenium with Python
• Playwright for Python
• Page Object Model
• Test Framework Design
• Cross-browser Testing
• Mobile Testing

MODULE 3: API TESTING & PERFORMANCE
===================================
• requests Library
• API Testing with pytest
• Performance Testing
• Load Testing Tools
• API Documentation Testing

MODULE 4: CI/CD & DEVOPS
========================
• GitHub Actions
• Jenkins Integration
• Docker for Testing
• Cloud Testing
• Test Automation Pipeline

PROJECTS:
=========
1. Web Application Test Suite
2. API Testing Framework
3. Performance Testing Tool
4. Mobile App Testing
5. Cloud Testing Platform

CAREER OUTCOMES:
================
• Python Test Engineer
• SDET Engineer
• DevOps Engineer
• Automation Engineer
• QA Lead

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateSDETJavaScriptSyllabus(): string {
  return `FULL STACK SDET - JAVASCRIPT SYLLABUS
===========================================

COURSE OVERVIEW:
- Duration: 5 months
- Level: Intermediate to Advanced
- Projects: 10+ Modern JS testing projects

MODULE 1: JAVASCRIPT TESTING FUNDAMENTALS
=========================================
• JavaScript Testing Concepts
• Jest Framework
• Unit Testing & Mocking
• Test-Driven Development
• Async Testing
• Test Coverage

MODULE 2: UI AUTOMATION
=======================
• Cypress Framework
• Playwright for JavaScript
• Selenium with JavaScript
• Page Object Model
• Cross-browser Testing
• Visual Testing

MODULE 3: API TESTING
=====================
• Supertest Library
• API Testing with Jest
• GraphQL Testing
• WebSocket Testing
• API Documentation Testing

MODULE 4: MODERN TESTING TOOLS
=============================
• Test Automation Pipeline
• CI/CD with GitHub Actions
• Docker Integration
• Cloud Testing Platforms
• Performance Testing

PROJECTS:
=========
1. Modern Web App Testing
2. API Testing Suite
3. E2E Testing Framework
4. Performance Testing Tool
5. Mobile Web Testing

CAREER OUTCOMES:
================
• JavaScript Test Engineer
• Frontend QA Engineer
• SDET Engineer
• Automation Engineer
• DevOps Engineer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateBackendJavaSyllabus(): string {
  return `BACKEND DEVELOPMENT - JAVA SYLLABUS
========================================

COURSE OVERVIEW:
- Duration: 7 months
- Level: Intermediate to Advanced
- Projects: 12+ Enterprise projects

MODULE 1: SPRING FRAMEWORK
==========================
• Spring Core & IoC
• Spring Boot Fundamentals
• REST API Development
• Spring Data JPA
• Spring Security
• Error Handling

MODULE 2: DATABASE INTEGRATION
==============================
• JDBC & JPA
• Hibernate ORM
• Database Design
• Query Optimization
• Transactions
• Database Security

MODULE 3: MICROSERVICES
=======================
• Microservices Architecture
• Spring Cloud
• Service Discovery
• API Gateway
• Circuit Breakers
• Distributed Systems

MODULE 4: DEVOPS & DEPLOYMENT
=============================
• Docker & Containerization
• Kubernetes
• CI/CD Pipelines
• Cloud Deployment
• Monitoring & Logging

PROJECTS:
=========
1. E-commerce Backend
2. Banking System
3. Social Media API
4. Inventory Management
5. Real-time Chat System

CAREER OUTCOMES:
================
• Backend Developer
• Java Developer
• Software Architect
• DevOps Engineer
• Technical Lead

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateFrontendReactSyllabus(): string {
  return `FRONTEND DEVELOPMENT - REACTJS SYLLABUS
=============================================

COURSE OVERVIEW:
- Duration: 6 months
- Level: Beginner to Advanced
- Projects: 15+ Modern web applications

MODULE 1: WEB FUNDAMENTALS
===========================
• HTML5 & CSS3
• JavaScript ES6+
• Responsive Design
• Bootstrap & CSS Grid
• Version Control (Git)
• Web Development Tools

MODULE 2: REACT FUNDAMENTALS
=============================
• React Components
• JSX & Props
• State Management
• Lifecycle Methods
• Event Handling
• Conditional Rendering

MODULE 3: ADVANCED REACT
========================
• React Hooks
• Context API
• Redux State Management
• React Router
• Performance Optimization
• Testing React Apps

MODULE 4: MODERN DEVELOPMENT
============================
• Next.js Framework
• API Integration
• Authentication
• Deployment
• Progressive Web Apps
• Performance Optimization

PROJECTS:
=========
1. E-commerce Website
2. Social Media App
3. Task Management System
4. Weather Dashboard
5. Portfolio Website

CAREER OUTCOMES:
================
• Frontend Developer
• React Developer
• UI/UX Developer
• Full Stack Developer
• Web Developer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generatePlacementPrepSyllabus(): string {
  return `PRE-CAMPUS PLACEMENT PROGRAM SYLLABUS
==========================================

COURSE OVERVIEW:
- Duration: 4 months
- Level: All Levels
- Mock Interviews: 50+ sessions

MODULE 1: APTITUDE TEST PREPARATION
===================================
• Quantitative Aptitude
• Logical Reasoning
• Verbal Ability
• Time Management
• Mock Tests & Practice
• Strategy Development

MODULE 2: TECHNICAL INTERVIEW PREP
===================================
• Data Structures & Algorithms
• System Design Basics
• Problem Solving Strategies
• Coding Best Practices
• Mock Technical Interviews
• Company-specific Preparation

MODULE 3: HR INTERVIEW PREPARATION
===================================
• HR Interview Questions
• Behavioral Questions
• STAR Method
• Communication Skills
• Mock HR Interviews
• Confidence Building

MODULE 4: SOFT SKILLS & CAREER GUIDANCE
=======================================
• Resume Building
• LinkedIn Optimization
• Networking Skills
• Leadership & Teamwork
• Time Management
• Career Planning

PROJECTS:
=========
1. Personal Portfolio
2. Mock Interview Sessions
3. Resume Optimization
4. Coding Challenge Practice
5. Group Discussion Sessions

CAREER OUTCOMES:
================
• Software Engineer
• Data Analyst
• Business Analyst
• Product Manager
• Consultant

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}

function generateDevOpsSyllabus(): string {
  return `DEVOPS MASTERY SYLLABUS
==========================

COURSE OVERVIEW:
- Duration: 6 months
- Level: Intermediate to Advanced
- Projects: 10+ Infrastructure projects

MODULE 1: DEVOPS FUNDAMENTALS
=============================
• DevOps Culture & Practices
• Version Control (Git)
• CI/CD Concepts
• Containerization Basics
• Cloud Platforms Overview
• Infrastructure as Code

MODULE 2: CONTAINERIZATION
==========================
• Docker Deep Dive
• Docker Compose
• Container Orchestration
• Kubernetes Fundamentals
• Helm Package Manager
• Container Security

MODULE 3: INFRASTRUCTURE AUTOMATION
===================================
• Terraform
• CloudFormation
• Configuration Management
• Infrastructure Monitoring
• Logging & Analytics
• Security & Compliance

MODULE 4: CI/CD & MONITORING
============================
• Jenkins Pipelines
• GitLab CI/CD
• Monitoring with Prometheus
• Grafana Dashboards
• ELK Stack
• Alerting Systems

PROJECTS:
=========
1. Cloud Infrastructure Setup
2. CI/CD Pipeline
3. Monitoring Dashboard
4. Container Orchestration
5. Security Implementation

CAREER OUTCOMES:
================
• DevOps Engineer
• Site Reliability Engineer
• Cloud Engineer
• Infrastructure Engineer
• Platform Engineer

CONTACT:
========
Email: info@rajeshwaritech.com
Phone: +91 98765 43210
Website: www.rajeshwaritech.com
`;
}
