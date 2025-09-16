'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

  const courses = [
    { name: 'Core Java + Competitive Programming', href: '/courses/core-java-advanced' },
    { name: 'Python Full Stack', href: '/courses/python-fullstack' },
    { name: 'Rust Programming', href: '/courses/rust-programming' },
    { name: 'Data Structures & Algorithms', href: '/courses/data-structures-algorithms' },
    { name: 'Full Stack SDET (Testing) - Java', href: '/courses/sdet-java' },
    { name: 'Full Stack SDET (Testing) - Python', href: '/courses/sdet-python' },
    { name: 'Full Stack SDET (Testing) - JavaScript', href: '/courses/sdet-javascript' },
    { name: 'Backend Development - Java', href: '/courses/backend-java' },
    { name: 'Frontend - ReactJS', href: '/courses/frontend-react' },
    { name: 'Pre-Campus Placement', href: '/courses/placement-prep' },
    { name: 'DevOps Mastery', href: '/courses/devops-mastery' },
  ];

  const services = [
    { name: 'Corporate Trainings', href: '/services/corporate' },
    { name: 'Freelance Development', href: '/services/freelance' },
    { name: 'Project Development', href: '/services/project' },
    { name: 'Interview Preparation', href: '/services/interview' },
    { name: 'IT Consulting', href: '/services/consulting' },
    { name: '1-on-1 Mentorship', href: '/services/mentorship' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚀</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-400 bg-clip-text text-transparent">
              RajeshwariTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            
            {/* Courses Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setActiveDropdown('courses');
                setIsHoveringDropdown(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!isHoveringDropdown) {
                    setActiveDropdown(null);
                  }
                }, 100);
              }}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                <span>Courses</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'courses' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => setIsHoveringDropdown(true)}
                  onMouseLeave={() => {
                    setIsHoveringDropdown(false);
                    setActiveDropdown(null);
                  }}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {courses.map((course) => (
                      <Link
                        key={course.name}
                        href={course.href}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors block"
                      >
                        {course.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setActiveDropdown('services');
                setIsHoveringDropdown(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (!isHoveringDropdown) {
                    setActiveDropdown(null);
                  }
                }, 100);
              }}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'services' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => setIsHoveringDropdown(true)}
                  onMouseLeave={() => {
                    setIsHoveringDropdown(false);
                    setActiveDropdown(null);
                  }}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors block"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blogs" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Contact
            </Link>
            <button 
              onClick={() => {
                // Scroll to courses section
                const coursesSection = document.getElementById('courses');
                if (coursesSection) {
                  coursesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-full font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">
                Home
              </Link>
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2">Courses</div>
                <div className="ml-4 space-y-1">
                  {courses.slice(0, 6).map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600"
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2">Services</div>
                <div className="ml-4 space-y-1">
                  {services.slice(0, 4).map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-600"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/blogs" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">
                Blog
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium">
                Contact
              </Link>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  // Scroll to courses section
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="block mx-3 mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-full font-semibold text-center w-full"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
