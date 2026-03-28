'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import FloatingElements from './FloatingElements';
import { courses, courseCategories } from '@/data/courses';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');

  const filteredCourses = selectedCategory === 'All Courses' 
    ? courses 
    : courses.filter(course => course.category.includes(selectedCategory));

  return (
    <section id="courses" className="relative py-24 bg-white overflow-hidden">
      <FloatingElements />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full mb-6 border border-indigo-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Our Curriculum</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 text-indigo-950 tracking-tight">
            Our{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Premium Courses
            </span>
          </h2>
          <p className="text-xl text-indigo-700/80 max-w-3xl mx-auto font-medium">
            Choose from our comprehensive range of IT courses designed for beginners to advanced learners.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {courseCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 text-sm shadow-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-indigo-200 transform scale-105'
                  : 'bg-indigo-50/50 text-indigo-900 hover:bg-indigo-100 hover:scale-105 border border-indigo-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CourseCard course={course} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-indigo-300 text-xl font-bold uppercase tracking-widest">
              No courses found for &quot;{selectedCategory}&quot;
            </div>
          </motion.div>
        )}

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl shadow-indigo-100">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
                Ready to Transform Your Career?
              </h3>
              <p className="text-xl text-indigo-50 mb-10 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
                Join thousands of students who have already started their journey to success with our industry-leading courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-indigo-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse All Courses
                </motion.button>
                <motion.button
                  className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Free Consultation
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
