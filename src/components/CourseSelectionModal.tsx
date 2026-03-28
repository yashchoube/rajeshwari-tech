'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Users, Star, ArrowRight, Search, Filter } from 'lucide-react';
import { courses, Course } from '@/data/courses';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseSelectionModal = ({ isOpen, onClose }: CourseSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categories = ['All', ...Array.from(new Set(courses.flatMap(course => course.category)))];
  const levels = ['All', ...Array.from(new Set(courses.map(course => course.level)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || course.category.includes(selectedCategory);
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-50 text-green-700 border-green-100';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-100';
      case 'Expert': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-indigo-50 text-indigo-700 border-indigo-100';
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

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[999999] p-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-indigo-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-indigo-100/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Explore Our Universe</h2>
              <p className="text-indigo-100 font-medium mt-1 opacity-90">Find the perfect path to master the next-gen technologies</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all border border-white/10"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-8 border-b border-indigo-50 bg-indigo-50/20">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-indigo-950 placeholder:text-indigo-300"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-11 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:outline-none focus:border-indigo-600 transition-all font-black uppercase tracking-widest text-[10px] text-indigo-950 appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="pl-6 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:outline-none focus:border-indigo-600 transition-all font-black uppercase tracking-widest text-[10px] text-indigo-950 appearance-none cursor-pointer"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="p-8 overflow-y-auto flex-1 bg-white">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-indigo-50 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-500 h-full flex flex-col group"
              >
                {/* Course Image Header Placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-indigo-600 to-purple-700 p-6 flex flex-col justify-end overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg ${getBadgeColor(course.badge)}`}>
                        {course.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight tracking-tight">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-indigo-800/70 text-xs font-bold mb-6 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6">
                    <div className="flex items-center space-x-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      <span className="text-indigo-900">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg">
                      <Users className="w-3 h-3 text-indigo-600" />
                      <span className="text-indigo-900">{course.students}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-indigo-50 flex items-center justify-between">
                    <span className="text-2xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
                    <Link
                      href={`/courses/${course.id}`}
                      onClick={onClose}
                      className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2 transition-all group/btn"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search className="w-10 h-10 text-indigo-200" />
              </div>
              <h3 className="text-2xl font-black text-indigo-950 mb-3 tracking-tight">Nothing Found</h3>
              <p className="text-indigo-800/60 font-bold text-sm">We couldn&apos;t find any course matching your request.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All');}}
                className="mt-8 text-indigo-600 font-black uppercase tracking-widest text-xs border-b-2 border-indigo-600 pb-1"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-indigo-50/30 px-8 py-6 border-t border-indigo-50">
          <div className="flex items-center justify-between">
            <p className="text-indigo-800/50 text-[10px] font-black uppercase tracking-[0.2em]">
              Scanning {filteredCourses.length} of {courses.length} premium programs
            </p>
            <Link
              href="/courses"
              onClick={onClose}
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform hover:-translate-y-1"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CourseSelectionModal;
