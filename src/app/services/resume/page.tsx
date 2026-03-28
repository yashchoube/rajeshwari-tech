'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FileText, Search, Star, Target, Zap, CheckCircle } from 'lucide-react';

export default function ResumeBuildingPage() {
  const highlights = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'ATS Optimization',
      description: 'We ensure your resume passes through Applicant Tracking Systems with high scores using industry-relevant keywords.'
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-400" />,
      title: 'Targeted Branding',
      description: 'Your resume will be tailored to specific roles like SDE, SDET, DevOps, or Data Science to highlight your best assets.'
    },
    {
      icon: <Star className="w-8 h-8 text-purple-400" />,
      title: 'Project Showcasing',
      description: 'Expert guidance on how to describe your technical projects to demonstrate problem-solving and technical depth.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-700 via-indigo-900 to-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Stand Out with a <span className="text-indigo-400">Professional Resume</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your resume is your first impression. Let our experts craft a high-impact, ATS-optimized resume that gets you through the door at top tech companies.
              </p>
              <div className="flex flex-wrap gap-4">
                  <a href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl">
                      Get Your Resume Audit
                  </a>
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>95% Interview Selection Rate</span>
                  </div>
              </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-6 border-b border-white/10 pb-6">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold">JD</div>
                        <div>
                            <div className="text-white font-bold text-lg">John Doe</div>
                            <div className="text-gray-400 text-sm italic">Lead Software Engineer at Google</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
                        <div className="h-4 bg-white/10 rounded-full w-full"></div>
                        <div className="h-4 bg-white/10 rounded-full w-5/6"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
                            <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
                            <div className="h-20 bg-white/5 rounded-xl border border-white/10"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                  >
                      <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                          Why Experts Choose Our Resume Building Services?
                      </h2>
                      <div className="space-y-6">
                            {[
                                'Expert Review by Senior Tech Recruiters',
                                'Quantifiable Achievement Phrases',
                                'Portfolio & GitHub Integration',
                                'Modern, Clean, Professional Templates',
                                'Career Storytelling Approach',
                                'Unlimited Revisions for 30 Days'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-green-100 flex items-center justify-center rounded-full flex-shrink-0">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 text-lg font-medium">{feature}</span>
                                </div>
                            ))}
                      </div>
                  </motion.div>
                  <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                  >
                      <div className="bg-indigo-600 rounded-3xl p-1 shadow-2xl transform rotate-3 scale-95 opacity-50 absolute inset-0"></div>
                      <div className="bg-white rounded-3xl p-8 shadow-2xl relative z-10 border border-gray-100">
                          <div className="text-center">
                              <Search className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                              <h3 className="text-2xl font-bold mb-4 italic">"Before RajeshwariTech, I applied to 50 jobs with 0 responses. After their resume audit, I got 5 interview calls in one week."</h3>
                              <p className="text-gray-500 font-bold">- Sangeeta Patil, SDET at Microsoft</p>
                          </div>
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
}
