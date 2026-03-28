'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, X, BellRing, ArrowRight } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const interests = [
    'Programming',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Mobile Development',
    'UI/UX Design',
    'Career Tips',
    'Industry News',
    'Tutorials'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (selectedInterests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          interests: selectedInterests,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        setName('');
        setSelectedInterests([]);
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-indigo-50 border border-indigo-200 rounded-[2.5rem] p-12 text-center shadow-xl shadow-indigo-100"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-black text-indigo-950 mb-3 tracking-tight">Subscribed Successfully!</h3>
        <p className="text-indigo-800/70 mb-8 max-w-sm mx-auto font-medium">
          Thank you for joining our community. We&apos;ve added your interests to our list and will send you relevant updates soon.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-indigo-600 hover:text-indigo-700 font-black uppercase tracking-widest text-xs border-b-2 border-indigo-600 pb-1"
        >
          Subscribe Another Email
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-xl">
            <BellRing className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Stay Ahead of the Curve</h2>
          <p className="text-indigo-50 text-xl font-medium opacity-90 max-w-2xl mx-auto">
            Get exclusive weekly insights, tutorials, and career tips curated by our experts delivered directly to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-black uppercase tracking-[0.2em] text-indigo-100 ml-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-indigo-300/50 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 font-medium"
                placeholder="you@awesome.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-black uppercase tracking-[0.2em] text-indigo-100 ml-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-indigo-300/50 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all duration-300 font-medium"
                placeholder="John Wick"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-indigo-100 mb-6 ml-1">
              Select Your Interests *
            </label>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
                    selectedInterests.includes(interest)
                      ? 'bg-yellow-400 text-indigo-950 border-yellow-400 transform scale-105 shadow-yellow-500/20'
                      : 'bg-white/5 text-indigo-100 border-2 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="text-indigo-200/60 text-[10px] mt-4 font-bold uppercase tracking-widest text-center italic">
              Selected: {selectedInterests.length} {selectedInterests.length === 1 ? 'topic' : 'topics'} for personalized content
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-4 flex items-center space-x-3"
            >
              <X className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-100 font-bold text-sm tracking-tight">{error}</span>
            </motion.div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || selectedInterests.length === 0}
              className="w-full bg-yellow-400 text-indigo-950 px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <span>{isSubmitting ? 'Joining the circle...' : 'Get Exclusive Access'}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <p className="text-indigo-200/50 text-[10px] text-center font-black uppercase tracking-[0.3em] pt-4">
            🔒 No Spam • Unsubscribe anytime • Privacy First
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsletterSubscription;