'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Clock, Target, TrendingUp, Shield, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { SITE_CONFIG } from '@/data/siteConfig';
import Link from 'next/link';

export default function CorporateTrainingPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const trainingPrograms = SITE_CONFIG.CORPORATE_TRAINING.PROGRAMS.map(program => ({
    ...program,
    description: program.title === 'Java Enterprise Development' ? 'Comprehensive Java training for enterprise-level development' :
                program.title === 'Python for Data Science' ? 'Data science and machine learning with Python' :
                program.title === 'Full Stack Web Development' ? 'Complete web development stack training' :
                program.title === 'DevOps & Cloud Computing' ? 'Modern DevOps practices and cloud technologies' :
                program.title === 'Automation Testing & QA' ? 'Comprehensive automation testing and quality assurance training' :
                'Advanced performance testing and optimization techniques'
  }));

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Team Upskilling',
      description: 'Enhance your entire team\'s technical capabilities with structured learning paths'
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: 'Industry Recognition',
      description: 'Get certified training that adds value to your team\'s professional credentials'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'ROI Focused',
      description: 'Training programs designed to deliver immediate business value and productivity gains'
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Quality Assurance',
      description: '10+ years of training excellence with 95% client satisfaction rate'
    }
  ];


  return (
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Corporate Training <span className="text-yellow-300">Solutions</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Transform your team with industry-leading technical training programs. 
              Boost productivity, enhance skills, and drive innovation across your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">500+ Companies Trained</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">4.9★ Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive, hands-on training programs designed for corporate teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {program.level}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">{program.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">{program.participants} participants</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Request Quote
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Courses Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need a Custom Training Program?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer many more specialized courses tailored to your specific industry needs
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Custom Corporate Training Solutions
              </h3>
              <p className="text-gray-600 mb-6">
                Our expert trainers can design and deliver custom training programs for any technology, 
                framework, or business domain. From blockchain to machine learning, we've got you covered.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Popular Custom Programs:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Blockchain & Cryptocurrency Development</li>
                    <li>• Machine Learning & AI Implementation</li>
                    <li>• Cybersecurity & Ethical Hacking</li>
                    <li>• Mobile App Development (iOS/Android)</li>
                    <li>• Cloud Architecture & Migration</li>
                    <li>• Database Administration & Optimization</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-3">Industry-Specific Training:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Healthcare IT Solutions</li>
                    <li>• Fintech & Banking Systems</li>
                    <li>• E-commerce & Retail Platforms</li>
                    <li>• Manufacturing & IoT</li>
                    <li>• Government & Public Sector</li>
                    <li>• Education Technology</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => setIsEnquiryOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-lg"
              >
                Get Custom Training Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Corporate Training?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver measurable results that transform your organization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Team?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your training needs and create a customized program that delivers results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/courses"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                View All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Enquiry Form Modal */}
      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        serviceType="Corporate Training"
        title="Corporate Training Enquiry"
      />
    </div>
  );
}
