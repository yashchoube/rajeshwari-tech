'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/data/courses';
import Header from './Header';
import Footer from './Footer';
import EnrollModal from './EnrollModal';
import { 
  Clock, 
  Users, 
  Star, 
  Check, 
  Play, 
  Target,
  BookOpen,
  Download
} from 'lucide-react';

interface CourseDetailProps {
  course: Course;
}

const CourseDetail = ({ course }: CourseDetailProps) => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrolled, setEnrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const key = `enrolled:${course.id}`;
    return localStorage.getItem(key) === 'true';
  });

  const handleDownloadSyllabus = async () => {
    try {
      const response = await fetch(`/api/download-syllabus?courseId=${course.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${course.title.replace(/\s+/g, '-')}-Syllabus.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download syllabus');
      }
    } catch (error) {
      console.error('Error downloading syllabus:', error);
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'bg-green-500 text-white';
      case 'Popular': return 'bg-indigo-500 text-white';
      case 'New': return 'bg-purple-500 text-white';
      case 'Top Rated': return 'bg-yellow-400 text-indigo-950';
      case 'Industry Ready': return 'bg-red-500 text-white';
      default: return 'bg-indigo-600 text-white';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-50 text-green-700 border-green-100';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-100';
      case 'Expert': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Course Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="flex flex-wrap gap-4 mb-8">
                <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${getBadgeColor(course.badge)}`}>
                  {course.badge}
                </span>
                <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm ${getLevelColor(course.level)}`}>
                  {course.level.split(' ')[0]}
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                {course.title}
              </h1>
              <p className="text-2xl text-indigo-100 font-bold mb-8 opacity-90 leading-snug">
                {course.subtitle}
              </p>
              <p className="text-lg text-indigo-100/70 font-medium mb-10 leading-relaxed max-w-xl">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-[1.5rem] border border-white/10 backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-sm">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-[1.5rem] border border-white/10 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-sm">{course.students} Learners</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-[1.5rem] border border-white/10 backdrop-blur-sm">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-sm">{course.rating} Rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {!enrolled && (
                  <motion.button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="bg-yellow-400 text-indigo-950 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-yellow-400/20"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>Enroll Now</span>
                  </motion.button>
                )}
                <motion.button
                  onClick={handleDownloadSyllabus}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-indigo-950 transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Curriculum</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="text-center mb-10 relative z-10">
                  <h3 className="text-sm font-black text-yellow-400 uppercase tracking-[0.3em] mb-4">Investment</h3>
                  <div className="flex items-center justify-center space-x-6 mb-4">
                    {course.originalPrice && (
                      <span className="text-2xl text-white/40 font-bold line-through tracking-tighter">{course.originalPrice}</span>
                    )}
                    <span className="text-6xl font-black text-white tracking-tighter">{course.price}</span>
                  </div>
                  <p className="text-indigo-100/60 font-medium">One-time payment • Lifetime Portal Access</p>
                </div>

                <div className="space-y-5 mb-10 relative z-10">
                  {[
                    'Lifetime access to all modules',
                    '24/7 Live Doubt Support',
                    '1-on-1 Industry Mentorship',
                    'Authorized Completion Certificate',
                    'Exclusive Placement Assistance'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/20">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-white/90 font-bold text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {!enrolled && (
                  <motion.button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-950 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:from-white hover:to-white transition-all duration-500 shadow-2xl shadow-yellow-400/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Secure Admission Now
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Course Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column: Curriculum */}
            <div className="lg:col-span-2 space-y-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-black text-indigo-950 mb-10 tracking-tight flex items-center">
                  <BookOpen className="w-8 h-8 mr-4 text-indigo-600" />
                  What You&apos;ll Master
                </h2>
                <div className="space-y-8">
                  {course.modules.map((module, index) => (
                    <div key={index} className="bg-indigo-50/20 rounded-[2.5rem] p-10 border border-indigo-50 group hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-black text-indigo-600 tracking-tight">{module.title}</h3>
                        <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-indigo-50">Module {index + 1}</span>
                      </div>
                      <p className="text-indigo-900/70 font-bold mb-8 leading-relaxed">{module.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 text-sm font-bold text-indigo-950">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-black text-indigo-950 mb-10 tracking-tight flex items-center">
                  <Target className="w-8 h-8 mr-4 text-indigo-600" />
                  Learning Outcomes
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-5 bg-indigo-50/20 p-8 rounded-[2rem] border border-indigo-50 hover:bg-white transition-colors duration-500">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-indigo-50">
                        <Check className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="text-indigo-950 font-bold leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-10 lg:sticky lg:top-32">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100 border border-indigo-50">
                  <h3 className="text-2xl font-black text-indigo-950 mb-8 tracking-tight">Key Intel</h3>
                  <div className="space-y-6 mb-10">
                    {[
                      { label: 'Duration', value: course.duration, color: 'indigo' },
                      { label: 'Level', value: course.level, color: 'purple' },
                      { label: 'Enrolled', value: `${course.students}+ Students`, color: 'blue' },
                      { label: 'Rating', value: `${course.rating} / 5.0`, color: 'yellow' },
                      { label: 'Expert', value: course.instructor, color: 'green' }
                    ].map((info, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-indigo-50 pb-4">
                        <span className="text-indigo-600/60 font-black text-[10px] uppercase tracking-widest">{info.label}</span>
                        <span className={`font-black text-indigo-950 bg-${info.color}-50 px-3 py-1 rounded-lg text-xs`}>{info.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-10">
                    <h4 className="font-black text-indigo-950 mb-4 text-[10px] uppercase tracking-widest text-center">Tech Categories</h4>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {course.category.map((cat) => (
                        <span key={cat} className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-indigo-100">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-indigo-200 transition-all flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>Join Course</span>
                  </motion.button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
                  <h3 className="text-2xl font-black mb-8 tracking-tight relative z-10">Target Audience</h3>
                  <ul className="space-y-4 relative z-10">
                    {course.idealFor.map((item, index) => (
                      <li key={index} className="flex items-start space-x-4">
                        <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-indigo-100 font-bold text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <EnrollModal 
        isOpen={isEnrollModalOpen} 
        onClose={(success?: boolean) => {
          setIsEnrollModalOpen(false);
          if (success) {
            localStorage.setItem(`enrolled:${course.id}`, 'true');
            setEnrolled(true);
          }
        }} 
        course={course}
      />
    </div>
  );
};

export default CourseDetail;
