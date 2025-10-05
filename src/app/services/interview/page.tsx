'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Clock, CheckCircle, TrendingUp, Award, BookOpen, Video, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { SITE_CONFIG } from '@/data/siteConfig';
import Link from 'next/link';

export default function InterviewPreparationPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const programs = SITE_CONFIG.INTERVIEW_PREPARATION.PROGRAMS.map((program, index) => ({
    icon: index === 0 ? <Brain className="w-8 h-8 text-indigo-600" /> :
          index === 1 ? <Target className="w-8 h-8 text-indigo-600" /> :
          index === 2 ? <Users className="w-8 h-8 text-indigo-600" /> :
          <Award className="w-8 h-8 text-indigo-600" />,
    ...program,
    description: program.title === 'Technical Interview Prep' ? 'Comprehensive preparation for coding interviews with data structures and algorithms' :
                program.title === 'Behavioral Interview Prep' ? 'Master the art of answering behavioral questions with the STAR method' :
                program.title === 'System Design Interview' ? 'Learn to design scalable systems for senior-level technical interviews' :
                'Preparation for leadership and executive-level interviews'
  }));

  const process = [
    {
      step: 'Assessment',
      title: 'Initial Assessment',
      description: 'We evaluate your current skills and identify areas for improvement',
      duration: '1 week',
      deliverables: ['Skill Gap Analysis', 'Personalized Learning Plan', 'Interview Readiness Score']
    },
    {
      step: 'Training',
      title: 'Intensive Training',
      description: 'Focused training sessions covering all aspects of technical and behavioral interviews',
      duration: '4-8 weeks',
      deliverables: ['Live Training Sessions', 'Practice Materials', 'Progress Tracking']
    },
    {
      step: 'Practice',
      title: 'Mock Interviews',
      description: 'Regular mock interviews with industry experts to build confidence',
      duration: '2-4 weeks',
      deliverables: ['Mock Interview Sessions', 'Detailed Feedback', 'Improvement Areas']
    },
    {
      step: 'Support',
      title: 'Interview Support',
      description: 'Ongoing support during your actual interview process',
      duration: 'Ongoing',
      deliverables: ['Pre-Interview Prep', 'Post-Interview Analysis', 'Negotiation Guidance']
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      story: 'The technical interview prep was exceptional. I went from failing coding interviews to getting offers from 3 FAANG companies.',
      rating: 5,
      program: 'Technical Interview Prep'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Senior Manager at Microsoft',
      story: 'The behavioral interview preparation helped me articulate my leadership experience effectively. Landed my dream role!',
      rating: 5,
      program: 'Behavioral Interview Prep'
    },
    {
      name: 'Sarah Johnson',
      role: 'Principal Engineer at Amazon',
      story: 'System design training was game-changing. I could confidently discuss complex architectures in interviews.',
      rating: 5,
      program: 'System Design Interview'
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: 'Comprehensive Study Material',
      description: 'Curated resources covering all interview topics with real examples'
    },
    {
      icon: <Video className="w-6 h-6 text-green-600" />,
      title: 'Live Training Sessions',
      description: 'Interactive sessions with industry experts and experienced interviewers'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      title: 'Mock Interview Practice',
      description: 'Regular practice sessions with detailed feedback and improvement suggestions'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and performance metrics'
    }
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb',
    'Spotify', 'Twitter', 'LinkedIn', 'Salesforce', 'Adobe', 'Oracle', 'IBM'
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
              Interview <span className="text-yellow-300">Preparation</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Master technical and behavioral interviews with our comprehensive preparation programs. 
              Get ready to land your dream job at top tech companies.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">500+ Students Placed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">FAANG Companies</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Interview Preparation Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive programs designed to help you ace any technical or behavioral interview
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {program.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{program.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{program.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Format</p>
                    <p className="font-semibold text-gray-900">{program.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold text-gray-900">{program.price}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Enroll Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Preparation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach that ensures you're fully prepared for any interview
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                <p className="text-gray-600 mb-4">{phase.description}</p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Duration: {phase.duration}</p>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Deliverables:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {phase.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Interview Prep?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation with proven results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from students who landed their dream jobs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{story.name}</p>
                  <p className="text-sm text-gray-500">{story.role}</p>
                  <p className="text-xs text-indigo-600 mt-1">{story.program}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Students Work At
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Top tech companies where our students have successfully landed jobs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition-colors duration-300"
              >
                <span className="font-semibold text-gray-700">{company}</span>
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
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful students who landed their dream jobs with our interview preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Start Your Preparation
              </Link>
              <Link
                href="/services/mentorship"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Get Free Consultation
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
        serviceType="Interview Preparation"
        title="Interview Preparation Enquiry"
      />
    </div>
  );
}
