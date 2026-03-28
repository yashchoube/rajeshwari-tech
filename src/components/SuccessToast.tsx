'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const SuccessToast = ({ isVisible, message, onClose }: SuccessToastProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, x: 50, scale: 0.9 }}
          className="fixed top-8 right-8 z-[999999] bg-white rounded-[1.5rem] shadow-2xl border border-indigo-100 p-6 max-w-sm flex items-center space-x-6"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Success Action</h4>
            <p className="text-sm font-black text-indigo-950 tracking-tight leading-tight">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 bg-indigo-50 hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-all group"
          >
            <X className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
