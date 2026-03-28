'use client';

import { motion } from 'framer-motion';
import { Briefcase, Target, Users, Clock, CheckCircle, TrendingUp, Shield, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ProjectDevelopmentPage() {
  const projectTypes = [
    {
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built from scratch to meet your specific business requirements',
      features: ['Requirement Analysis', 'Custom Architecture', 'Scalable Design', 'Quality Assurance'],
      duration: '2-6 months',
      complexity: 'High'
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      title: 'MVP Development',
      description: 'Rapid development of Minimum Viable Products to validate your business idea quickly',
      features: ['Rapid Prototyping', 'Core Features Only', 'Quick Market Validation', 'Iterative Development'],
      duration: '4-12 weeks',
      complexity: 'Medium'
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Team Augmentation',
      description: 'Enhance your existing team with our skilled developers for specific project needs',
      features: ['Flexible Engagement', 'Skill Matching', 'Seamless Integration', 'Knowledge Transfer'],
      duration: '1-12 months',
      complexity: 'Variable'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: 'Legacy System Modernization',
      description: 'Upgrade and modernize your existing systems with latest technologies',
      features: ['System Analysis', 'Migration Planning', 'Data Migration', 'Performance Optimization'],
      duration: '3-9 months',
      complexity: 'High'
    }
  ];

  const methodology = [
    {
      phase: 'Discovery',
      duration: '1-2 weeks',
      description: 'Deep dive into your business requirements, technical constraints, and project goals',
      deliverables: ['Requirements Document', 'Technical Architecture', 'Project Timeline', 'Resource Plan']
    },
    {
      phase: 'Design',
      duration: '2-3 weeks',
      description: 'Create detailed system design, user experience flows, and technical specifications',
      deliverables: ['System Design', 'UI/UX Mockups', 'Database Schema', 'API Specifications']
    },
    {
      phase: 'Development',
      duration: '4-16 weeks',
      description: 'Agile development with regular sprints, testing, and continuous integration',
      deliverables: ['Working Software', 'Test Reports', 'Documentation', 'Deployment Scripts']
    },
    {
      phase: 'Deployment',
      duration: '1-2 weeks',
      description: 'Production deployment, monitoring setup, and knowledge transfer to your team',
      deliverables: ['Live Application', 'Deployment Guide', 'Monitoring Setup', 'Training Materials']
    }
  ];

  const technologies = [
    {
      category: 'Frontend',
      tools: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      tools: ['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Go']
    },
    {
      category: 'Database',
      tools: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase']
    },
    {
      category: 'Cloud & DevOps',
      tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring']
    }
  ];

  const successMetrics = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: '100% On-Time Delivery',
      description: 'We deliver projects on schedule with quality assurance'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'Zero Security Breaches',
      description: 'Security-first approach with comprehensive testing'
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: '95% Client Satisfaction',
      description: 'Consistent high ratings from our project clients'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: '40% Performance Improvement',
      description: 'Average performance boost for our delivered projects'
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
              Project <span className="text-yellow-300">Development</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              End-to-end software project development from concept to deployment. 
              We turn your ideas into powerful, scalable solutions that drive business growth.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">200+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">100% On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">95% Client Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Project Development Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive project development solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {project.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{project.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Complexity</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.complexity === 'High' ? 'bg-red-100 text-red-800' :
                      project.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.complexity}
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center block"
                >
                  Contact Us
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Methodology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven approach that ensures successful project delivery
            </p>
          </motion.div>

          <div className="space-y-8">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                        <p className="text-indigo-600 font-semibold">{phase.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{phase.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Deliverables:</h4>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-16 h-16 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern, proven technologies for robust and scalable solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.tools.map((tool, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">{tool}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Success Metrics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proven track record of delivering exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{metric.title}</h3>
                <p className="text-gray-600">{metric.description}</p>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a development plan that delivers results.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
