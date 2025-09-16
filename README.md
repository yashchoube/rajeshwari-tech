# RajeshwariTech - Modern EdTech Platform

A comprehensive Next.js-based educational technology platform designed to transform careers with industry-ready tech skills.

## 🚀 Features

### Modern Tech Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Course Management
- 11 comprehensive courses covering:
  - Core Java with Advanced Concepts + Competitive Programming
  - Python Full Stack Development
  - Rust Programming Language
  - Data Structures & Algorithms
  - Full Stack SDET (Java, Python, JavaScript)
  - Backend Development with Java
  - Frontend Development with ReactJS
  - Pre-Campus Placement Program
  - DevOps Mastery

### Interactive Features
- **Dynamic Course Filtering** by category
- **Responsive Design** for all devices
- **Smooth Animations** and transitions
- **Course Detail Pages** with comprehensive information
- **Modern UI/UX** with gradient designs

### Course Information
Each course includes:
- Detailed module breakdown
- Learning outcomes
- Course features and benefits
- Pricing information
- Student ratings and enrollment numbers
- Instructor information
- Category classification

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rajeshwari-tech
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
rajeshwari-tech/
├── src/
│   ├── app/
│   │   ├── courses/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Dynamic course pages
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── CourseCard.tsx            # Course card component
│   │   ├── CourseDetail.tsx          # Course detail page
│   │   ├── Courses.tsx               # Courses listing
│   │   ├── Features.tsx              # Features section
│   │   ├── Footer.tsx                # Footer component
│   │   ├── Header.tsx                # Header navigation
│   │   └── Hero.tsx                  # Hero section
│   └── data/
│       └── courses.ts                # Course data and types
├── public/                           # Static assets
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎨 Design Features

### Color Scheme
- Primary: Indigo to Purple gradients
- Secondary: Cyan accents
- Success: Green tones
- Warning: Yellow/Orange tones

### Typography
- System font stack for optimal performance
- Responsive text sizing
- Gradient text effects for headings

### Animations
- Framer Motion for smooth transitions
- Hover effects and micro-interactions
- Scroll-triggered animations
- Loading states and transitions

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application is ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📊 Course Data Structure

Each course includes:
```typescript
interface Course {
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
```

## 🎯 Future Enhancements

- User authentication and profiles
- Course enrollment and progress tracking
- Payment integration
- Video streaming integration
- Discussion forums
- Assignment submissions
- Instructor dashboard
- Admin panel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact:
- Email: info@rajeshwaritech.com
- Phone: +91 98765 43210

---

Built with ❤️ by RajeshwariTech Team