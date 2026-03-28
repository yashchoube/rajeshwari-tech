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
      color: 'from-blue-600 to-indigo-600',
      iconBg: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Target,
      title: 'Project-Based Learning',
      description: getFeatureDescription('PROJECT_BASED_LEARNING'),
      color: 'from-purple-600 to-pink-600',
      iconBg: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Trophy,
      title: 'Placement Assistance',
      description: getFeatureDescription('PLACEMENT_ASSISTANCE'),
      color: 'from-green-600 to-emerald-600',
      iconBg: 'bg-green-100 text-green-600'
    },
    {
      icon: BookOpen,
      title: 'Lifetime Access',
      description: 'Get lifetime access to course materials, updates, and our exclusive community of learners and mentors.',
      color: 'from-orange-600 to-red-600',
      iconBg: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Lightbulb,
      title: 'Live Sessions',
      description: 'Interactive live classes with doubt clearing sessions, code reviews, and personalized feedback.',
      color: 'from-yellow-600 to-orange-600',
      iconBg: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Earn industry-recognized certificates that validate your skills and boost your professional profile.',
      color: 'from-indigo-600 to-purple-600',
      iconBg: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const stats = getStatsData().map((stat, index) => ({
    ...stat,
    icon: [Users, Trophy, Shield, Award, Clock, CheckCircle][index]
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full mb-6 border border-indigo-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Pure Excellence</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-indigo-950 tracking-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              RajeshwariTech?
            </span>
          </h2>
          <p className="text-xl text-indigo-700/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Industry-aligned curriculum, expert instructors, and hands-on learning approach designed for your success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group bg-white rounded-[2rem] p-10 shadow-xl shadow-indigo-50/50 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 border border-indigo-50 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-indigo-950 group-hover:text-indigo-600 transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-800/70 mb-0 leading-relaxed font-medium text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>

          <div className="relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-4 tracking-tight">Our Success in Numbers</h3>
              <p className="text-indigo-100 text-lg font-medium opacity-90">Trusted by thousands of students and industry professionals worldwide.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10 group-hover:bg-white/20 transition-all duration-300 transform group-hover:-translate-y-1">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-yellow-400 font-mono tracking-tighter">{stat.number}</div>
                    <div className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</div>
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
