'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, Clock, CheckCircle, TrendingUp, Shield, Award, BarChart, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ITConsultingPage() {
  const consultingAreas = [
    {
      icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
      title: 'Digital Transformation',
      description: 'Transform your business with modern technology solutions and digital strategies',
      duration: '3-12 months',
      complexity: 'High',
      features: ['Technology Assessment', 'Digital Strategy', 'Implementation Planning', 'Change Management']
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      title: 'Technology Strategy',
      description: 'Develop comprehensive technology roadmaps aligned with business objectives',
      duration: '2-6 months',
      complexity: 'Medium',
      features: ['Strategic Planning', 'Technology Selection', 'Architecture Design', 'ROI Analysis']
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: 'Team Augmentation',
      description: 'Enhance your development team with expert consultants and specialized skills',
      duration: '1-24 months',
      complexity: 'Variable',
      features: ['Skill Assessment', 'Team Building', 'Knowledge Transfer', 'Mentoring']
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Security Consulting',
      description: 'Strengthen your cybersecurity posture with comprehensive security assessments',
      duration: '1-4 months',
      complexity: 'High',
      features: ['Security Audit', 'Risk Assessment', 'Compliance Review', 'Security Implementation']
    }
  ];

  const methodology = [
    {
      phase: 'Discovery',
      duration: '1-2 weeks',
      description: 'Comprehensive analysis of your current technology landscape and business requirements',
      deliverables: ['Current State Analysis', 'Gap Analysis', 'Requirements Document', 'Stakeholder Interviews']
    },
    {
      phase: 'Strategy',
      duration: '2-4 weeks',
      description: 'Develop tailored technology strategies and recommendations based on industry best practices',
      deliverables: ['Technology Roadmap', 'Implementation Plan', 'Resource Requirements', 'Risk Assessment']
    },
    {
      phase: 'Implementation',
      duration: '2-12 months',
      description: 'Execute the recommended solutions with ongoing support and monitoring',
      deliverables: ['Solution Implementation', 'Progress Reports', 'Training Materials', 'Documentation']
    },
    {
      phase: 'Optimization',
      duration: 'Ongoing',
      description: 'Continuous monitoring and optimization to ensure maximum value and performance',
      deliverables: ['Performance Reports', 'Optimization Recommendations', 'Support Services', 'Future Planning']
    }
  ];

  const industries = [
    {
      name: 'Healthcare',
      description: 'HIPAA-compliant solutions and digital health platforms',
      technologies: ['FHIR', 'HIPAA', 'Cloud Security', 'Data Analytics']
    },
    {
      name: 'Finance',
      description: 'Secure financial systems and regulatory compliance solutions',
      technologies: ['PCI DSS', 'Blockchain', 'Risk Management', 'Fraud Detection']
    },
    {
      name: 'E-commerce',
      description: 'Scalable e-commerce platforms and payment processing systems',
      technologies: ['Microservices', 'Payment Gateways', 'Inventory Management', 'Analytics']
    },
    {
      name: 'Manufacturing',
      description: 'IoT solutions and supply chain optimization systems',
      technologies: ['IoT', 'Predictive Analytics', 'Supply Chain', 'Quality Control']
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'Increased Efficiency',
      description: 'Optimize your technology stack for maximum performance and productivity'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'Enhanced Security',
      description: 'Strengthen your security posture with industry best practices and compliance'
    },
    {
      icon: <BarChart className="w-6 h-6 text-green-600" />,
      title: 'Better ROI',
      description: 'Maximize your technology investments with strategic planning and optimization'
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'Expert Guidance',
      description: 'Leverage our team of experienced consultants and industry experts'
    }
  ];

  const caseStudies = [
    {
      title: 'Healthcare System Modernization',
      client: 'Regional Medical Center',
      challenge: 'Legacy system integration and HIPAA compliance',
      solution: 'Cloud migration with security-first approach',
      results: '40% cost reduction, 99.9% uptime, full HIPAA compliance',
      technologies: ['AWS', 'Docker', 'PostgreSQL', 'Security Monitoring']
    },
    {
      title: 'E-commerce Platform Scaling',
      client: 'Online Retailer',
      challenge: 'Handling 10x traffic growth during peak seasons',
      solution: 'Microservices architecture with auto-scaling',
      results: '300% performance improvement, zero downtime during peak',
      technologies: ['Kubernetes', 'Redis', 'CDN', 'Load Balancing']
    },
    {
      title: 'Financial Data Analytics',
      client: 'Investment Firm',
      challenge: 'Real-time risk analysis and compliance reporting',
      solution: 'Big data pipeline with machine learning models',
      results: 'Real-time insights, 50% faster reporting, regulatory compliance',
      technologies: ['Apache Kafka', 'Python', 'Machine Learning', 'Data Visualization']
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
              IT <span className="text-yellow-300">Consulting</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Strategic technology consulting to transform your business. 
              We help you make informed decisions, optimize your tech stack, and drive digital innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">100+ Projects Consulted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">10+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">Proven Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consulting Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Consulting Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive IT consulting solutions for businesses of all sizes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultingAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {area.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{area.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{area.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What We Deliver:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {area.features.map((feature, idx) => (
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
                    <p className="font-semibold text-gray-900">{area.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Complexity</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      area.complexity === 'High' ? 'bg-red-100 text-red-800' :
                      area.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {area.complexity}
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

      {/* Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Consulting Methodology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven approach that delivers measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((phase, index) => (
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.phase}</h3>
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

      {/* Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized consulting across various industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {industry.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Consulting?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic guidance that drives real business results
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

      {/* Case Studies */}
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
              Real results from our consulting engagements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{study.client}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-gray-600">{study.challenge}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-sm text-gray-600">{study.solution}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <p className="text-sm text-gray-600">{study.results}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
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
              Ready to Transform Your Technology?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your technology challenges and create a strategic plan for success.
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
