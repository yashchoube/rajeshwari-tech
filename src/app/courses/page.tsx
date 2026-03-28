'use client';

import { courses } from '@/data/courses';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function CoursesPage() {
  return (
    <>
      <Head>
        <title>All Courses - RajeshwariTech</title>
        <meta name="description" content="Explore our comprehensive collection of programming courses designed to make you industry-ready." />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              All Courses
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Master programming, crack interviews, and build real-world projects with expert guidance from industry professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{courses.length}+</span>
                <span>Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">5000+</span>
                <span>Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">95%</span>
                <span>Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From beginner to expert level, we have courses designed to take you through every step of your programming journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CourseCard course={course} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of students who have transformed their careers with our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
              >
                Download Syllabus
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
}
