'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Star, ArrowRight, Check, Download, Play } from 'lucide-react';
import { Course } from '@/data/courses';
import EnrollModal from './EnrollModal';

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrolled, setEnrolled] = useState<boolean>(false);

  useEffect(() => {
    const key = `enrolled:${course.id}`;
    const isEnrolled = localStorage.getItem(key) === 'true';
    setEnrolled(isEnrolled);
  }, [course.id]);

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
      case 'Popular': return 'bg-blue-500 text-white';
      case 'New': return 'bg-purple-500 text-white';
      case 'Top Rated': return 'bg-yellow-500 text-white';
      case 'Industry Ready': return 'bg-red-500 text-white';
      default: return 'bg-indigo-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-100/20 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 flex flex-col h-full overflow-hidden group">
      {/* Course Header */}
      <div className="relative h-56 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 flex flex-col justify-end overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-[9px] font-black uppercase tracking-widest text-white border border-white/20 backdrop-blur-sm">
              {course.level}
            </span>
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${getBadgeColor(course.badge)}`}>
              {course.badge}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-300">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Course Body */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex-grow space-y-6">
          <p className="text-indigo-800/70 text-sm font-medium leading-relaxed line-clamp-2">
            {course.subtitle}
          </p>

          <div className="grid grid-cols-3 gap-4 text-[10px] font-black uppercase tracking-widest text-indigo-400/80">
            <div className="flex flex-col items-center p-3 bg-indigo-50/50 rounded-2xl border border-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <Star className="w-4 h-4 text-yellow-400 fill-current mb-2" />
              <span className="text-indigo-950">{course.rating}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-indigo-50/50 rounded-2xl border border-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <Users className="w-4 h-4 text-blue-500 mb-2" />
              <span className="text-indigo-950">{course.students}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-indigo-50/50 rounded-2xl border border-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <Clock className="w-4 h-4 text-purple-500 mb-2" />
              <span className="text-indigo-950">{course.duration}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {course.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 group/feat">
                <div className="w-5 h-5 bg-indigo-50 rounded-lg flex items-center justify-center group-hover/feat:bg-indigo-600 transition-colors">
                  <Check className="w-3 h-3 text-indigo-600 group-hover/feat:text-white transition-colors" />
                </div>
                <span className="text-xs text-indigo-800/80 font-bold">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-10 pt-8 border-t border-indigo-50">
          <div className="flex items-end justify-between mb-8">
            <div className="flex flex-col">
              {course.originalPrice && (
                <span className="text-xs text-indigo-400 font-bold line-through mb-1 opacity-60 tracking-tighter">{course.originalPrice}</span>
              )}
              <span className="text-3xl font-black text-indigo-600 tracking-tighter">{course.price}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-end max-w-[120px]">
              {course.category.slice(0, 2).map((cat) => (
                <span key={cat} className="px-2 py-1 bg-indigo-50 text-[8px] font-black uppercase tracking-widest text-indigo-500 border border-indigo-100 rounded-lg">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-100 transition-all border border-indigo-100"
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            {!enrolled ? (
              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Enroll</span>
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 border-green-100">
                <Check className="w-4 h-4" />
                <span>Enrolled</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleDownloadSyllabus}
            className="w-full mt-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-600 transition-all border-2 border-dashed border-indigo-100 rounded-2xl flex items-center justify-center space-x-2 group/syllabus"
          >
            <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Syllabus</span>
          </button>
        </div>
      </div>

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

export default CourseCard;
