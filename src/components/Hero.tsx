'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Users, Award, Star, Play } from 'lucide-react';
import DemoBookingModal from './DemoBookingModal';
import AnimatedBackground from './AnimatedBackground';

const Hero = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  const stats = [
    { number: '5000+', label: 'Students Trained', icon: Users },
    { number: '95%', label: 'Placement Rate', icon: Award },
    { number: '50+', label: 'Corporate Clients', icon: Users },
    { number: '4.9★', label: 'Student Rating', icon: Star },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-vh-screen py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-black leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform Your Career with{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Industry-Ready
              </span>{' '}
              Tech Skills
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-indigo-100 mb-10 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Master programming, crack interviews, and build real-world projects with expert guidance from industry professionals.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="#courses"
                className="group bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="group bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Free Demo</span>
              </button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap items-center gap-6 text-indigo-100 font-bold uppercase tracking-widest text-[10px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                <span>Live Classes</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
                <span>Industry Experts</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-sm shadow-purple-400/50"></div>
                <span>Placement Support</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <motion.div 
                className="text-center mb-10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Our Success Metrics</h3>
                <p className="text-indigo-100 font-medium">Trusted by thousands of students worldwide</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/10 hover:bg-white/15 transition-all duration-500 group/item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover/item:rotate-12 transition-transform">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-yellow-400 mb-1 drop-shadow-sm font-mono">{stat.number}</div>
                      <div className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-white/70 rounded-full"></div>
        </motion.div>
      </motion.div>

      <DemoBookingModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
