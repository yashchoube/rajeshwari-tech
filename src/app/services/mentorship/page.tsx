'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Target, BookOpen, Clock, CheckCircle, TrendingUp, Award, MessageSquare, Video, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { courses } from '@/data/courses';
import { SITE_CONFIG } from '@/data/siteConfig';
import Link from 'next/link';

export default function MentorshipPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const mentorshipPrograms = SITE_CONFIG.MENTORSHIP.PROGRAMS.map((program, index) => ({
    icon: index === 0 ? <User className="w-8 h-8 text-indigo-600" /> :
          index === 1 ? <Target className="w-8 h-8 text-indigo-600" /> :
          index === 2 ? <Award className="w-8 h-8 text-indigo-600" /> :
          <BookOpen className="w-8 h-8 text-indigo-600" />,
    ...program,
    description: program.title === 'Career Guidance' ? 'Personalized career planning and development guidance from industry experts' :
                program.title === 'Technical Mentorship' ? 'Deep dive into specific technologies and technical skills with hands-on guidance' :
                program.title === 'Leadership Development' ? 'Develop leadership skills and management capabilities for career advancement' :
                'Comprehensive interview preparation with mock sessions and feedback'
  }));


  const process = [
    {
      step: 'Matching',
      title: 'Mentor Matching',
      description: 'We carefully match you with the right mentor based on your goals and background',
      duration: '1 week',
      deliverables: ['Mentor Profile', 'Compatibility Assessment', 'Initial Meeting']
    },
    {
      step: 'Planning',
      title: 'Goal Setting',
      description: 'Define clear objectives and create a personalized development plan',
      duration: '1 week',
      deliverables: ['Development Plan', 'Milestone Tracking', 'Success Metrics']
    },
    {
      step: 'Mentoring',
      title: 'Regular Sessions',
      description: 'Weekly or bi-weekly sessions with your mentor for guidance and feedback',
      duration: '2-8 months',
      deliverables: ['Session Notes', 'Progress Reports', 'Action Items']
    },
    {
      step: 'Growth',
      title: 'Continuous Development',
      description: 'Ongoing support and guidance as you progress in your career',
      duration: 'Ongoing',
      deliverables: ['Career Guidance', 'Network Access', 'Opportunity Alerts']
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      story: 'The mentorship program transformed my career. My mentor helped me transition from a junior developer to a senior role at Google within 18 months.',
      rating: 5,
      program: 'Career Guidance',
      mentor: 'Dr. Sarah Johnson'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Lead at Microsoft',
      story: 'The technical mentorship was exceptional. I learned advanced system design concepts and landed my dream role as a tech lead.',
      rating: 5,
      program: 'Technical Mentorship',
      mentor: 'Rajesh Kumar'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Engineering Manager at Amazon',
      story: 'The leadership development program prepared me for management roles. I now lead a team of 15 engineers and love every day of it.',
      rating: 5,
      program: 'Leadership Development',
      mentor: 'Emily Chen'
    }
  ];

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      title: 'Personalized Guidance',
      description: 'One-on-one sessions tailored to your specific needs and career goals'
    },
    {
      icon: <Video className="w-6 h-6 text-green-600" />,
      title: 'Flexible Sessions',
      description: 'Schedule sessions at your convenience with video, phone, or in-person meetings'
    },
    {
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      title: 'Ongoing Support',
      description: 'Continuous support between sessions with email and chat access to your mentor'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Proven Results',
      description: '95% of mentees report significant career advancement within 12 months'
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
              1-on-1 <span className="text-yellow-300">Mentorship</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Accelerate your career with personalized guidance from industry experts. 
              Get the support, knowledge, and network you need to reach your professional goals.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <User className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">200+ Mentees Guided</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">Career Growth</span>
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
              Our Mentorship Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personalized mentorship programs designed to accelerate your career growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentorshipPrograms.map((program, index) => (
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
                    <p className="text-sm text-gray-500">Sessions</p>
                    <p className="font-semibold text-gray-900">{program.sessions}</p>
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
                  Start Mentorship
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Courses for 1-on-1 Training
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized 1-on-1 mentorship for any of our comprehensive courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 9).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Don't see the course you're looking for? We offer custom 1-on-1 training for any technology or skill.
            </p>
            <button 
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Get Custom Training Quote
            </button>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Mentorship Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach to maximize your learning and growth
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
                <div className="bg-gray-50 rounded-lg p-4">
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Mentorship?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personalized guidance that delivers real results
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
      <section className="py-16 bg-white">
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
              Real stories from mentees who transformed their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
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
                  <div className="mt-2">
                    <p className="text-xs text-indigo-600">{story.program}</p>
                    <p className="text-xs text-gray-500">Mentor: {story.mentor}</p>
                  </div>
                </div>
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
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of professionals who have transformed their careers with our mentorship programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Start Your Mentorship
              </Link>
              <Link
                href="/services/consulting"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Learn More
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
        serviceType="1-on-1 Mentorship"
        title="Mentorship Enquiry"
      />
    </div>
  );
}
