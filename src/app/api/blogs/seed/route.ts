import { NextResponse } from 'next/server';
import { createBlog } from '@/lib/database';

export async function POST() {
  try {
    const sampleBlogs = [
      {
        title: 'Getting Started with React: A Complete Beginner\'s Guide',
        slug: 'getting-started-with-react-beginners-guide',
        excerpt: 'Learn the fundamentals of React development with this comprehensive guide. Perfect for beginners who want to start building modern web applications.',
        content: `# Getting Started with React: A Complete Beginner's Guide

React has become one of the most popular JavaScript libraries for building user interfaces. In this comprehensive guide, we'll walk you through everything you need to know to get started with React development.

## What is React?

React is a JavaScript library created by Facebook for building user interfaces, particularly web applications. It allows developers to create reusable UI components and manage application state efficiently.

## Why Choose React?

1. **Component-Based Architecture**: Break down your UI into reusable components
2. **Virtual DOM**: Improved performance through efficient DOM updates
3. **Large Community**: Extensive ecosystem and community support
4. **Job Market**: High demand for React developers

## Setting Up Your Development Environment

Before you start coding, you'll need to set up your development environment:

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- A code editor (VS Code recommended)

### Installation Steps

1. **Install Node.js**: Download and install Node.js from nodejs.org
2. **Create a New React App**:
   \`\`\`bash
   npx create-react-app my-first-app
   cd my-first-app
   npm start
   \`\`\`

## Your First React Component

Let's create your first React component:

\`\`\`jsx
import React from 'react';

function Welcome() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to your first React application.</p>
    </div>
  );
}

export default Welcome;
\`\`\`

## Key React Concepts

### 1. Components
Components are the building blocks of React applications. They are like JavaScript functions that return HTML elements.

### 2. JSX
JSX is a syntax extension that allows you to write HTML-like code in JavaScript.

### 3. Props
Props are arguments passed into React components, similar to function parameters.

### 4. State
State allows components to manage and update their own data.

## Best Practices for React Development

1. **Keep Components Small**: Break down large components into smaller, reusable ones
2. **Use Functional Components**: Prefer functional components over class components
3. **Follow Naming Conventions**: Use PascalCase for component names
4. **Use PropTypes**: Add type checking for props
5. **Implement Error Boundaries**: Handle errors gracefully

## Next Steps

Now that you understand the basics of React, here are some next steps:

1. Learn about React Hooks (useState, useEffect)
2. Explore React Router for navigation
3. Learn about state management (Redux, Context API)
4. Build a real-world project
5. Deploy your application

## Conclusion

React is a powerful tool for building modern web applications. With its component-based architecture and large ecosystem, it's an excellent choice for both beginners and experienced developers.

Start building today and join the millions of developers who have chosen React for their projects!`,
        author: 'Rajeshwari Tech Team',
        category: 'Programming',
        tags: 'React, JavaScript, Frontend, Web Development, Tutorial',
        featured: true
      },
      {
        title: 'Python for Data Science: Essential Libraries You Need to Know',
        slug: 'python-data-science-essential-libraries',
        excerpt: 'Discover the most important Python libraries for data science and learn how to use them effectively in your projects.',
        content: `# Python for Data Science: Essential Libraries You Need to Know

Data science has become one of the most in-demand fields in technology, and Python is the go-to language for data scientists worldwide. In this article, we'll explore the essential Python libraries that every data scientist should master.

## Why Python for Data Science?

Python's simplicity, readability, and extensive ecosystem make it perfect for data science. Here are some key advantages:

- **Easy to Learn**: Simple syntax that's beginner-friendly
- **Rich Ecosystem**: Thousands of specialized libraries
- **Community Support**: Large, active community
- **Integration**: Works well with other technologies

## Essential Python Libraries for Data Science

### 1. NumPy - Numerical Computing Foundation

NumPy is the foundation of the Python data science stack. It provides:

- N-dimensional arrays
- Mathematical functions
- Linear algebra operations
- Random number generation

\`\`\`python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Mathematical operations
result = np.sum(arr)
mean_value = np.mean(arr)
\`\`\`

### 2. Pandas - Data Manipulation and Analysis

Pandas is essential for data manipulation and analysis:

- DataFrames and Series
- Data cleaning and preprocessing
- Data aggregation and grouping
- Time series analysis

\`\`\`python
import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Tokyo']
})

# Basic operations
print(df.head())
print(df.describe())
\`\`\`

### 3. Matplotlib - Data Visualization

Matplotlib is the foundation for data visualization in Python:

- Static plots and charts
- Customizable styling
- Publication-quality figures
- Integration with other libraries

\`\`\`python
import matplotlib.pyplot as plt

# Create a simple plot
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Simple Plot')
plt.show()
\`\`\`

### 4. Seaborn - Statistical Data Visualization

Seaborn builds on Matplotlib and provides:

- Beautiful statistical plots
- Built-in themes and color palettes
- Easy-to-use high-level functions
- Integration with Pandas DataFrames

### 5. Scikit-learn - Machine Learning

Scikit-learn is the most popular machine learning library:

- Supervised and unsupervised learning
- Model evaluation and selection
- Data preprocessing
- Feature engineering

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
\`\`\`

## Getting Started with Data Science

### 1. Set Up Your Environment

\`\`\`bash
# Install Anaconda (recommended)
# Or install packages individually
pip install numpy pandas matplotlib seaborn scikit-learn
\`\`\`

### 2. Choose Your IDE

Popular options include:
- Jupyter Notebook
- VS Code
- PyCharm
- Google Colab

### 3. Start with a Project

Begin with a simple project like:
- Analyzing sales data
- Predicting house prices
- Sentiment analysis of social media posts

## Best Practices

1. **Start Small**: Begin with basic operations before complex analyses
2. **Document Your Work**: Use comments and markdown cells
3. **Version Control**: Use Git to track your projects
4. **Practice Regularly**: Work on different datasets
5. **Join Communities**: Engage with the data science community

## Career Opportunities

Data science offers numerous career paths:

- Data Analyst
- Data Scientist
- Machine Learning Engineer
- Business Intelligence Analyst
- Research Scientist

## Conclusion

Python's data science ecosystem is powerful and constantly evolving. By mastering these essential libraries, you'll be well-equipped to tackle real-world data science challenges and advance your career in this exciting field.

Start your data science journey today with these fundamental tools!`,
        author: 'Dr. Sarah Johnson',
        category: 'Data Science',
        tags: 'Python, Data Science, NumPy, Pandas, Machine Learning, Analytics',
        featured: true
      },
      {
        title: 'Career Tips: How to Land Your First Tech Job in 2024',
        slug: 'career-tips-land-first-tech-job-2024',
        excerpt: 'Practical advice and strategies to help you secure your first technology job, from building your portfolio to acing interviews.',
        content: `# Career Tips: How to Land Your First Tech Job in 2024

Breaking into the tech industry can seem daunting, but with the right strategy and preparation, you can land your first tech job successfully. Here's your comprehensive guide to getting started in tech.

## The Current Tech Job Market

The tech industry continues to grow rapidly, with new opportunities emerging constantly. Key trends in 2024 include:

- **Remote Work**: Many companies now offer remote or hybrid positions
- **AI and Machine Learning**: High demand for AI-related skills
- **Cybersecurity**: Growing need for security professionals
- **Full-Stack Development**: Versatile developers are highly valued

## Essential Skills for Tech Jobs

### 1. Technical Skills

**Programming Languages** (choose 1-2 to master):
- JavaScript/TypeScript
- Python
- Java
- C#/.NET
- Go or Rust

**Web Development**:
- HTML/CSS
- React, Vue, or Angular
- Node.js or Python frameworks
- Database knowledge (SQL/NoSQL)

**Tools and Technologies**:
- Git version control
- Cloud platforms (AWS, Azure, GCP)
- Docker and containerization
- Testing frameworks

### 2. Soft Skills

- **Communication**: Explain technical concepts clearly
- **Problem-Solving**: Break down complex problems
- **Collaboration**: Work effectively in teams
- **Continuous Learning**: Stay updated with technology trends

## Building Your Portfolio

### 1. Personal Projects

Create projects that demonstrate your skills:

\`\`\`javascript
// Example: Simple Task Manager
const taskManager = {
  tasks: [],
  
  addTask(title, description) {
    this.tasks.push({
      id: Date.now(),
      title,
      description,
      completed: false
    });
  },
  
  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = true;
  }
};
\`\`\`

### 2. Open Source Contributions

- Start with small contributions to existing projects
- Fix bugs or add documentation
- Build relationships with the developer community

### 3. Online Presence

- **GitHub**: Showcase your code and projects
- **LinkedIn**: Professional networking and job search
- **Personal Website**: Portfolio and blog
- **Technical Blog**: Share your learning journey

## Resume and Application Tips

### 1. Tailor Your Resume

- Customize for each job application
- Use keywords from the job description
- Quantify your achievements
- Keep it concise (1-2 pages)

### 2. Cover Letter

- Research the company thoroughly
- Explain why you're interested in the role
- Highlight relevant experience
- Show enthusiasm and cultural fit

### 3. Application Strategy

- Apply to 10-20 jobs per week
- Focus on quality over quantity
- Follow up appropriately
- Network with industry professionals

## Interview Preparation

### 1. Technical Interviews

**Common Topics**:
- Data structures and algorithms
- System design basics
- Language-specific questions
- Problem-solving scenarios

**Practice Resources**:
- LeetCode
- HackerRank
- CodeSignal
- Cracking the Coding Interview

### 2. Behavioral Interviews

Prepare stories using the STAR method:
- **Situation**: Set the context
- **Task**: Explain your responsibility
- **Action**: Describe what you did
- **Result**: Share the outcome

### 3. Company Research

- Understand the company's mission and values
- Research recent news and developments
- Prepare thoughtful questions to ask
- Learn about their technology stack

## Networking Strategies

### 1. Online Networking

- Join tech communities on Discord, Slack
- Participate in Twitter/X tech discussions
- Engage with LinkedIn content
- Attend virtual meetups and webinars

### 2. In-Person Events

- Local tech meetups
- Conferences and workshops
- Hackathons and coding competitions
- Career fairs and networking events

### 3. Building Relationships

- Offer help before asking for favors
- Share knowledge and resources
- Maintain regular contact
- Be genuine and authentic

## Alternative Paths to Tech

### 1. Bootcamps

- Intensive, focused learning
- Career support and job placement
- Industry connections
- Faster time to employment

### 2. Self-Taught Route

- Online courses and tutorials
- Free resources and documentation
- Personal projects and practice
- Community support

### 3. Traditional Education

- Computer Science degree
- Related technical degrees
- Certifications and courses
- University career services

## Common Mistakes to Avoid

1. **Applying Too Broadly**: Focus on specific roles and skills
2. **Poor Online Presence**: Clean up social media and create professional profiles
3. **Neglecting Soft Skills**: Develop communication and teamwork abilities
4. **Giving Up Too Early**: Job search takes time and persistence
5. **Not Practicing**: Regular coding practice is essential

## Success Stories

### Sarah's Journey: From Marketing to Frontend Developer

Sarah transitioned from marketing to frontend development in 6 months:
- Completed online courses in HTML, CSS, and JavaScript
- Built 5 portfolio projects
- Contributed to open source projects
- Networked at local meetups
- Landed a junior developer position

### Mike's Path: Bootcamp Graduate

Mike attended a coding bootcamp and secured a job within 3 months:
- 12-week intensive program
- Built full-stack applications
- Received career coaching
- Connected with hiring partners
- Started as a junior full-stack developer

## Action Plan for Success

### Month 1-2: Foundation
- Choose your tech stack
- Complete beginner courses
- Start building projects
- Create online profiles

### Month 3-4: Development
- Build 3-5 portfolio projects
- Contribute to open source
- Start networking
- Prepare resume and portfolio

### Month 5-6: Job Search
- Apply to relevant positions
- Practice technical interviews
- Attend networking events
- Seek feedback and improve

## Resources and Tools

### Learning Platforms
- freeCodeCamp
- Codecademy
- Udemy
- Coursera
- edX

### Practice Sites
- LeetCode
- HackerRank
- Codewars
- Project Euler

### Job Boards
- Indeed
- LinkedIn Jobs
- AngelList
- Stack Overflow Jobs
- GitHub Jobs

## Conclusion

Landing your first tech job requires dedication, strategy, and persistence. By developing the right skills, building a strong portfolio, and networking effectively, you can successfully transition into a rewarding tech career.

Remember: Every expert was once a beginner. Start your journey today and don't give up on your dreams of working in tech!`,
        author: 'Career Coach Maria Rodriguez',
        category: 'Career',
        tags: 'Career, Job Search, Tech Jobs, Interview Tips, Portfolio, Networking',
        featured: false
      }
    ];

    // Create sample blogs
    for (const blog of sampleBlogs) {
      await createBlog({ ...blog, status: 'published' });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sample blogs created successfully',
      count: sampleBlogs.length
    });
  } catch (error) {
    console.error('Error creating sample blogs:', error);
    return NextResponse.json({ 
      error: 'Failed to create sample blogs' 
    }, { status: 500 });
  }
}
