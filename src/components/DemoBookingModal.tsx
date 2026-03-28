'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Video, Users, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/ToastContext';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoBookingModal = ({ isOpen, onClose }: DemoBookingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: 'beginner',
    preferredTime: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const courses = [
    'Core Java + Competitive Programming',
    'Python Full Stack Development',
    'Rust Programming Language',
    'Data Structures & Algorithms',
    'Full Stack SDET - Java',
    'Full Stack SDET - Python',
    'Full Stack SDET - JavaScript',
    'Backend Development - Java',
    'Frontend Development - ReactJS',
    'Pre-Campus Placement Program',
    'DevOps Mastery'
  ];

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '6:00 PM - 7:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit demo booking');
      }

      showSuccessToast('Demo session booked successfully!');
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(3);
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      setIsSubmitting(false);
      showErrorToast(error instanceof Error ? error.message : 'Network error, please try again.');
    }
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      experience: 'beginner',
      preferredTime: '',
      message: ''
    });
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-indigo-950/80 backdrop-blur-md"
        onClick={handleClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-indigo-100/50 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                {isSuccess ? 'Demo Booked!' : 'Free Live Demo'}
              </h2>
              <p className="text-indigo-100 font-medium mt-1 opacity-90">
                {isSuccess ? 'Meeting link sent to your email' : 'Experience our expert teaching style'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-grow">
          {!isSuccess && (
            <div className="flex items-center justify-center mb-10">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center justify-center w-10 h-10 rounded-2xl font-black shadow-lg transition-all ${
                  step >= 1 ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-300'
                }`}>
                  1
                </div>
                <div className={`w-20 h-1 rounded-full transition-all ${step >= 2 ? 'bg-indigo-600' : 'bg-indigo-50'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-2xl font-black shadow-lg transition-all ${
                  step >= 2 ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-indigo-50 text-indigo-300'
                }`}>
                  2
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Video, title: 'Live Teaching', desc: 'Real-time coding session', color: 'green' },
                  { icon: Users, title: 'Expert Mentors', desc: 'Learn from industry leads', color: 'blue' },
                  { icon: Calendar, title: 'Flexible Slots', desc: 'Choose your own time', color: 'purple' },
                  { icon: Star, title: 'Career Path', desc: 'Get personal roadmap', color: 'orange' }
                ].map((item, i) => (
                  <div key={i} className={`flex items-start space-x-4 p-5 bg-${item.color}-50 rounded-3xl border border-${item.color}-100/50 group hover:bg-white hover:shadow-xl transition-all`}>
                    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-black text-${item.color}-900 text-sm`}>{item.title}</h4>
                      <p className={`text-[10px] font-bold text-${item.color}-600 uppercase tracking-widest mt-1`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50/50 rounded-3xl p-8 border border-indigo-100">
                <h4 className="font-black text-indigo-950 mb-6 text-sm uppercase tracking-widest">Demo Essentials:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Curriculum Deep-dive', 'Doubt Clearing', 'Interactive Q&A', 'Placement Stats'].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm font-bold text-indigo-800/80">
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-200 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <span>Select Your Slot</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-indigo-950 ml-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium"
                    placeholder="Ex: John Wick"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-indigo-950 ml-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium"
                    placeholder="wick@tech.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-indigo-950 ml-1">Course *</label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100 text-indigo-950 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="">Choose Course</option>
                    {courses.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-indigo-950 ml-1">Time Slot *</label>
                  <select
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100 text-indigo-950 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="">Select Slot</option>
                    {timeSlots.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-indigo-950 ml-1">Specific Questions</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-6 py-4 rounded-2xl bg-indigo-50/30 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-medium resize-none"
                  placeholder="Ask any doubts..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-8 py-5 border-2 border-indigo-100 text-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 transform hover:-translate-y-1"
                >
                  {isSubmitting ? 'Confirming...' : 'Book Free Demo'}
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && isSuccess && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-black text-indigo-950 mb-4 tracking-tight">Demo Confirmed!</h3>
              <p className="text-indigo-800/70 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                Check your inbox for the Google Meet link. Our instructor will see you at {formData.preferredTime}.
              </p>
              <div className="bg-indigo-50/50 rounded-3xl p-8 text-left mb-10 border border-indigo-100">
                <h4 className="font-black text-indigo-950 mb-6 text-sm uppercase tracking-widest flex items-center">
                  <Video className="w-5 h-5 mr-3 text-indigo-600" />
                  Meeting Protocol
                </h4>
                <div className="space-y-4">
                  {['Ensure stable internet connection', 'Bring your questions & doubts', 'Be on time to avoid missing info', 'Laptop preferred for coding demo'].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 text-sm font-bold text-indigo-800/80">
                      <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-200"
              >
                Done
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DemoBookingModal;
