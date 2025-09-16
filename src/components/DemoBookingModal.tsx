'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Video, Users, CheckCircle, Star } from 'lucide-react';

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

      if (!response.ok) {
        throw new Error('Failed to submit demo booking');
      }

      const result = await response.json();
      console.log('Demo booking submitted:', result);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setStep(3);
    } catch (error) {
      console.error('Error submitting demo booking:', error);
      setIsSubmitting(false);
      // You could add error handling UI here
      alert('Failed to submit demo booking. Please try again.');
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isSuccess ? '🎉 Demo Booked Successfully!' : 'Book Your Free Demo'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isSuccess ? 'See you at the demo session!' : 'Experience our teaching style firsthand'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Progress Steps */}
              {!isSuccess && (
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      1
                    </div>
                    <div className={`w-16 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      2
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Demo Benefits */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Free 30-Minute Demo Session
                    </h3>
                    <p className="text-gray-600">
                      Get a taste of our teaching style and course content
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Live Teaching Demo</h4>
                        <p className="text-sm text-green-600">Experience our interactive teaching style</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">1-on-1 Interaction</h4>
                        <p className="text-sm text-blue-600">Ask questions and get personalized guidance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-purple-800">Flexible Timing</h4>
                        <p className="text-sm text-purple-600">Choose a time that works for you</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                      <Star className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Course Guidance</h4>
                        <p className="text-sm text-orange-600">Get personalized course recommendations</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-indigo-900 mb-3">What You&apos;ll Get:</h4>
                    <ul className="space-y-2 text-sm text-indigo-700">
                      <li>✅ Live coding demonstration</li>
                      <li>✅ Q&A session with instructor</li>
                      <li>✅ Course curriculum overview</li>
                      <li>✅ Career guidance and roadmap</li>
                      <li>✅ Special demo-only discount</li>
                    </ul>
                  </div>

                  <motion.button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book My Free Demo
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Booking Form */}
              {step === 2 && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course of Interest *
                    </label>
                    <select
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Programming Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="advanced">Advanced (3+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Any specific questions or topics you&apos;d like to discuss?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Tell us about your learning goals or any specific topics you&apos;d like to explore..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? 'Booking...' : 'Book Demo'}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* Step 3: Success */}
              {step === 3 && isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Demo Session Booked!
                    </h3>
                    <p className="text-gray-600">
                      We&apos;ll send you the meeting link and details via email shortly.
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What Happens Next?</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>📧 Meeting details sent to your email</div>
                      <div>📱 SMS reminder 1 hour before session</div>
                      <div>🎥 Join via Google Meet link</div>
                      <div>💬 Interactive Q&A session</div>
                      <div>🎁 Special demo discount offered</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">Demo Special Offer!</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Get 20% off on any course if you enroll within 48 hours of the demo
                    </p>
                  </div>

                  <motion.button
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Looking Forward to Meeting You!
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoBookingModal;
