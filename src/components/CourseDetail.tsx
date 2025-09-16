'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/data/courses';
import Header from './Header';
import Footer from './Footer';
import EnrollModal from './EnrollModal';
import { 
  Clock, 
  Users, 
  Star, 
  Check, 
  Play, 
  Target,
  BookOpen,
  Download,
  Share2
} from 'lucide-react';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Course Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getBadgeColor(course.badge)}`}>
                  {course.badge}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {course.subtitle}
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Start Learning</span>
                </motion.button>
                <motion.button
                  onClick={handleDownloadSyllabus}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Syllabus</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Course Pricing</h3>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    {course.originalPrice && (
                      <span className="text-lg text-white/60 line-through">{course.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-yellow-400">{course.price}</span>
                  </div>
                  <p className="text-white/80">One-time payment, lifetime access</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white">Lifetime access to all materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white">Live doubt clearing sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white">Industry mentorship</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-white">Placement assistance</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enroll Now
                </motion.button>

                <div className="text-center mt-4">
                  <button className="text-white/80 hover:text-white transition-colors flex items-center justify-center space-x-2 mx-auto">
                    <Share2 className="w-4 h-4" />
                    <span>Share this course</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Modules */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-8">What You&apos;ll Learn</h2>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-semibold mb-3 text-indigo-600">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-8">Course Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8">Learning Outcomes</h2>
                <div className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <Target className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Course Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">Course Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Instructor</span>
                    <span className="font-semibold">{course.instructor}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.category.map((cat) => (
                      <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enroll Now
                </motion.button>
              </motion.div>

              {/* Ideal For */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-6"
              >
                <h3 className="text-xl font-bold mb-4">Ideal For</h3>
                <ul className="space-y-2">
                  {course.idealFor.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <BookOpen className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enrollment Modal */}
      <EnrollModal 
        isOpen={isEnrollModalOpen} 
        onClose={() => setIsEnrollModalOpen(false)} 
        course={course}
      />
    </div>
  );
};

export default CourseDetail;
