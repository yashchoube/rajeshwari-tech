'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, ChevronRight, MessageSquare, Info } from 'lucide-react';
import { useToast } from './ui/ToastContext';
import { enquirySchema } from '@/lib/schemas';

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  title: string;
}

const EnquiryForm = ({ isOpen, onClose, serviceType, title }: EnquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceType,
    participants: '',
    duration: '',
    budget: '',
    requirements: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

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
      const validation = enquirySchema.safeParse(formData);

      if (!validation.success) {
        showErrorToast(validation.error.issues[0].message);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      showSuccessToast('Enquiry received successfully!');
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '', email: '', phone: '', company: '',
          service: serviceType, participants: '', duration: '',
          budget: '', requirements: '', timeline: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setIsSubmitting(false);
      showErrorToast(error instanceof Error ? error.message : 'Network error, please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-indigo-950/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-indigo-100/50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{isSuccess ? 'Response Recorded!' : title}</h2>
                <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest opacity-80 mt-1">Proposal Request</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all border border-white/10"><X className="w-6 h-6" /></button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto flex-grow bg-white">
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-green-100 shadow-xl shadow-green-100">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-black text-indigo-950 mb-4 tracking-tight">Proposal Coming Soon!</h3>
              <p className="text-indigo-800/70 font-bold mb-8 max-w-sm mx-auto leading-relaxed">Our solution architect is reviewing your requirements. Expect a detailed custom proposal within 24 business hours.</p>
              <div className="flex items-center justify-center space-x-3 text-indigo-400 font-black text-[10px] uppercase tracking-widest italic">
                <Info className="w-4 h-4" />
                <span>Closing window automatically...</span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Contact Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold" placeholder="Ex: Rajesh Singh" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Work Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold" placeholder="raj@company.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Phone Number *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold" placeholder="+91 12345 67890" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Entity / Institution *</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold" placeholder="E.g. IIT Delhi" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Team Size</label>
                    <select name="participants" value={formData.participants} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-black uppercase tracking-widest text-[11px] appearance-none cursor-pointer">
                      <option value="">Select Scope</option>
                      <option value="1-10">1-10 participants</option>
                      <option value="11-25">11-25 participants</option>
                      <option value="26-50">26-50 participants</option>
                      <option value="50+">50+ participants</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Target Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-black uppercase tracking-widest text-[11px] appearance-none cursor-pointer">
                      <option value="">Select Phase</option>
                      <option value="ASAP">Critical - ASAP</option>
                      <option value="Within 1 month">High - Within 30 Days</option>
                      <option value="1-3 months">Medium - 90 Days</option>
                      <option value="3+ months">Planning Phase</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-950 ml-1">Technical Briefing</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} rows={4} className="w-full px-6 py-4 rounded-2xl bg-indigo-50/20 border-2 border-indigo-100 text-indigo-950 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold resize-none" placeholder="Elaborate on tech stack, goals, or specific outcomes required..." />
                </div>
              </div>

              <div className="flex space-x-6 pt-6 border-t border-indigo-50">
                <button type="button" onClick={onClose} className="flex-1 px-8 py-5 text-indigo-600 font-black uppercase tracking-widest text-xs hover:bg-indigo-50 rounded-2xl transition-all">Cancel</button>
                <motion.button type="submit" disabled={isSubmitting} className="flex-[2] bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center space-x-3" whileHover={{ scale: 1.02 }}>
                  {isSubmitting ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <><Send className="w-4 h-4" /><span>Request Proposal</span></>}
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;
