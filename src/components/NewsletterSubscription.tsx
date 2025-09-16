'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, X } from 'lucide-react';

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
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Subscribed Successfully!</h3>
        <p className="text-green-600 mb-4">
          Thank you for subscribing to our newsletter. You&apos;ll receive updates on your selected topics.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-green-600 hover:text-green-700 font-semibold"
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
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl p-8 text-white"
    >
      <div className="text-center mb-8">
        <Mail className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Stay Updated!</h2>
        <p className="text-white/90 text-lg">
          Subscribe to our newsletter and get the latest articles delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email and Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Your Name"
            />
          </div>
        </div>

        {/* Interests Selection */}
        <div>
          <label className="block text-sm font-semibold mb-3">
            Select Topics You&apos;re Interested In *
          </label>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedInterests.includes(interest)
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="text-white/70 text-xs mt-2">
            Selected: {selectedInterests.length} topic{selectedInterests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-3 flex items-center space-x-2">
            <X className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-100 text-sm">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || selectedInterests.length === 0}
          className="w-full bg-yellow-400 text-gray-900 px-6 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>

        <p className="text-white/70 text-xs text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </motion.div>
  );
};

export default NewsletterSubscription;