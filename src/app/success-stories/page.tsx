'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export default function SuccessStoriesPage() {
  const stats = [
    { icon: <GraduationCap className="w-8 h-8 text-indigo-400" />, label: 'Students Placed', value: '5000+' },
    { icon: <TrendingUp className="w-8 h-8 text-green-400" />, label: 'Success Rate', value: '95%' },
    { icon: <Briefcase className="w-8 h-8 text-purple-400" />, label: 'Partner Companies', value: '50+' },
    { icon: <Award className="w-8 h-8 text-orange-400" />, label: 'Average Package', value: '₹15L+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Our Student <span className="text-indigo-400">Success Stories</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join the thousands of successful tech professionals who transformed their careers with RajeshwariTech.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-indigo-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonials Section (Reuse existing component) */}
      <Testimonials />

      {/* Bottom CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Start Your Own Success Story Today</h2>
            <p className="text-xl mb-12 text-indigo-100">
                Don&apos;t wait for opportunities. Create them with our expert-led tech courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/courses" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105 transform">
                    View Courses
                </a>
                <a href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all shadow-xl hover:scale-105 transform">
                    Contact Us
                </a>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
