'use client';

import { motion } from 'framer-motion';
import { Users, Award, Target, BookOpen, CheckCircle, Star, TrendingUp, Globe, Heart, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function AboutPage() {
  const { ABOUT } = SITE_CONFIG;
  
  const stats = [
    { number: ABOUT.STATS.STUDENTS_TRAINED, label: 'Students Trained', icon: <Users className="w-8 h-8 text-indigo-600" /> },
    { number: ABOUT.STATS.PLACEMENT_SUCCESS, label: 'Placement Success', icon: <Award className="w-8 h-8 text-indigo-600" /> },
    { number: ABOUT.STATS.YEARS_EXPERIENCE, label: 'Years Experience', icon: <Target className="w-8 h-8 text-indigo-600" /> },
    { number: ABOUT.STATS.EXPERT_INSTRUCTORS, label: 'Expert Instructors', icon: <BookOpen className="w-8 h-8 text-indigo-600" /> }
  ];

  // Icon mapping for dynamic icons
  const iconMap = {
    Heart: <Heart className="w-8 h-8 text-indigo-600" />,
    Lightbulb: <Lightbulb className="w-8 h-8 text-indigo-600" />,
    Globe: <Globe className="w-8 h-8 text-indigo-600" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-indigo-600" />
  };

  const values = ABOUT.VALUES.map(value => ({
    icon: iconMap[value.icon as keyof typeof iconMap],
    title: value.title,
    description: value.description
  }));

  // Team section removed as per requirements

  const achievements = ABOUT.TIMELINE;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-yellow-400">{ABOUT.COMPANY_NAME}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Empowering the next generation of tech professionals with industry-leading courses, 
              expert mentorship, and comprehensive placement support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Started in {ABOUT.FOUNDED_YEAR}, {ABOUT.COMPANY_NAME} began with a simple yet powerful vision: to bridge the gap 
                  between academic learning and real-world industry requirements. We recognized that traditional 
                  education often falls short in preparing students for the dynamic tech industry.
                </p>
                <p>
                  Our journey started with passionate teaching and a deep understanding of the challenges students 
                  face when transitioning from academic learning to professional development. We've always focused 
                  on practical, hands-on learning that prepares students for real-world success.
                </p>
                <p>
                  Today, we've grown into a comprehensive technology education platform that has successfully 
                  trained over {ABOUT.STATS.STUDENTS_TRAINED} students, with a {ABOUT.STATS.PLACEMENT_SUCCESS} placement success rate. Our alumni work at top tech 
                  companies worldwide, from startups to Fortune 500 companies.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-indigo-100 rounded-lg p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                {ABOUT.MISSION}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                {ABOUT.VISION}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at RajeshwariTech
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform technology education
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200"></div>
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative mb-8 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
              >
                <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-indigo-600 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2"></div>
                    <span className="text-indigo-600 font-bold text-lg">{achievement.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of successful graduates who have transformed their careers with RajeshwariTech
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                Explore Courses
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
