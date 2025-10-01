'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, Check, Download, Play } from 'lucide-react';
import { Course } from '@/data/courses';
import EnrollModal from './EnrollModal';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrolled, setEnrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const key = `enrolled:${course.id}`;
    return localStorage.getItem(key) === 'true';
  });

  const handleDownloadSyllabus = async () => {
    try {
      const response = await fetch(`/api/download-syllabus?courseId=${course.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${course.title.replace(/\s+/g, '-')}-Syllabus.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download syllabus');
      }
    } catch (error) {
      console.error('Error downloading syllabus:', error);
    }
  };
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-green-500 text-white';
      case 'Popular':
        return 'bg-blue-500 text-white';
      case 'New':
        return 'bg-purple-500 text-white';
      case 'Top Rated':
        return 'bg-yellow-500 text-white';
      case 'Industry Ready':
        return 'bg-red-500 text-white';
      case 'Python Focus':
        return 'bg-green-600 text-white';
      case 'Modern Stack':
        return 'bg-indigo-500 text-white';
      case 'Enterprise Ready':
        return 'bg-gray-700 text-white';
      case 'Modern UI':
        return 'bg-pink-500 text-white';
      case 'Placement Ready':
        return 'bg-orange-500 text-white';
      case 'Industry Standard':
        return 'bg-teal-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      case 'Expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Course Header */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 text-white">
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(course.badge)}`}>
            {course.badge}
          </span>
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>

        <div className="pt-8">
          <h3 className="text-xl font-bold mb-2 leading-tight">{course.title}</h3>
          <p className="text-white/90 text-sm mb-4">{course.subtitle}</p>
          
          {/* Rating and Students */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students} students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Body */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">What you&apos;ll learn:</h4>
          <div className="space-y-2">
            {course.features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
            {course.features.length > 4 && (
              <div className="text-sm text-gray-500">
                +{course.features.length - 4} more features
              </div>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {cat}
            </span>
          ))}
          {course.category.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{course.category.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Course Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
            )}
            <span className="text-2xl font-bold text-indigo-600">{course.price}</span>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Link
                href={`/courses/${course.id}`}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {!enrolled && (
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Enroll Now</span>
                </button>
              )}
            </div>
            <button
              onClick={handleDownloadSyllabus}
              className="w-full bg-green-50 text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 flex items-center justify-center space-x-2 text-sm border border-green-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollModal 
        isOpen={isEnrollModalOpen} 
        onClose={() => setIsEnrollModalOpen(false)} 
        course={course}
      />
    </motion.div>
  );
};

export default CourseCard;
