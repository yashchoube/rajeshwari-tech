'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Trophy, 
  BookOpen, 
  Lightbulb, 
  Award,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { SITE_CONFIG, getFeatureDescription, getStatsData } from '@/data/siteConfig';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Industry Experts',
      description: getFeatureDescription('INDUSTRY_EXPERTS'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Project-Based Learning',
      description: getFeatureDescription('PROJECT_BASED_LEARNING'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Placement Assistance',
      description: getFeatureDescription('PLACEMENT_ASSISTANCE'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Lifetime Access',
      description: 'Get lifetime access to course materials, updates, and our exclusive community of learners and mentors.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Lightbulb,
      title: 'Live Sessions',
      description: 'Interactive live classes with doubt clearing sessions, code reviews, and personalized feedback.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Earn industry-recognized certificates that validate your skills and boost your professional profile.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = getStatsData().map((stat, index) => ({
    ...stat,
    icon: [Users, Trophy, Shield, Award, Clock, CheckCircle][index]
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              RajeshwariTech?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-aligned curriculum, expert instructors, and hands-on learning approach designed for your success
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Top Border Animation */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4">Our Success in Numbers</h3>
              <p className="text-white/90 text-lg">Trusted by thousands of students and industry professionals</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-yellow-400">{stat.number}</div>
                    <div className="text-white/90 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;
