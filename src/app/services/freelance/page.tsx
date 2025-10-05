'use client';

import { motion } from 'framer-motion';
import { Code, Laptop, Smartphone, Database, Cloud, Zap, Users, DollarSign, Clock, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG } from '@/data/siteConfig';
import Link from 'next/link';

export default function FreelanceDevelopmentPage() {
  const services = SITE_CONFIG.FREELANCE_DEVELOPMENT.SERVICES.map((service, index) => ({
    icon: index === 0 ? <Laptop className="w-8 h-8 text-indigo-600" /> :
          index === 1 ? <Smartphone className="w-8 h-8 text-indigo-600" /> :
          index === 2 ? <Database className="w-8 h-8 text-indigo-600" /> :
          index === 3 ? <Cloud className="w-8 h-8 text-indigo-600" /> :
          index === 4 ? <CheckCircle className="w-8 h-8 text-indigo-600" /> :
          <Shield className="w-8 h-8 text-indigo-600" />,
    title: service.title,
    description: service.title === 'Web Development' ? 'Full-stack web applications with modern frameworks' :
                service.title === 'Mobile App Development' ? 'Cross-platform mobile applications for iOS and Android' :
                service.title === 'Backend Development' ? 'Robust server-side applications and APIs' :
                service.title === 'Cloud Solutions' ? 'Scalable cloud infrastructure and deployment' :
                service.title === 'Automation Testing' ? 'Comprehensive test automation solutions for web and mobile applications' :
                'Quality assurance and testing services for software applications',
    technologies: service.technologies,
    price: service.price,
    duration: service.duration
  }));

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We understand your requirements, analyze the scope, and create a detailed project plan with timelines and milestones.'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Our team designs the system architecture, creates wireframes, and establishes the technical foundation for your project.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using best practices, with continuous testing and regular updates on progress.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing support to ensure everything runs smoothly.'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-green-600" />,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising quality'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      title: 'Cost Effective',
      description: 'Competitive pricing with transparent billing'
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'Expert Team',
      description: 'Experienced developers with proven track records'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'Quality Assurance',
      description: 'Thorough testing and code reviews for bug-free delivery'
    }
  ];

  const portfolio = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Healthcare Management System',
      description: 'Patient management system with appointment scheduling',
      technologies: ['React.js', 'Python', 'PostgreSQL', 'AWS'],
      image: '/api/placeholder/400/300'
    },
    {
      title: 'Real Estate Portal',
      description: 'Property listing platform with advanced search',
      technologies: ['Next.js', 'Node.js', 'MySQL', 'Cloudinary'],
      image: '/api/placeholder/400/300'
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
              Freelance <span className="text-yellow-300">Development</span>
            </h1>
            <p className="text-lg text-indigo-100 max-w-3xl mx-auto mb-8">
              Professional software development services tailored to your business needs. 
              From web apps to mobile solutions, we bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">100+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">50+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-semibold">Fast Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Development Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive software development solutions for businesses of all sizes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Starting Price</p>
                    <p className="font-semibold text-gray-900">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{service.duration}</p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center block"
                >
                  Get Quote
                </Link>
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
              Our Development Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Development Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional results that drive your business forward
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

      {/* Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcasing our expertise through successful project deliveries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Code className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
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
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a solution that exceeds your expectations.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
