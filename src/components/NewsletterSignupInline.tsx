'use client';

import { useState } from 'react';

export default function NewsletterSignupInline() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interests: ['General'] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to subscribe');
      } else {
        setSuccess(true);
        setEmail('');
      }
    } catch {
      setError('Network error, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        <div className="text-green-400 font-semibold">Thanks! You are subscribed.</div>
        <button className="text-sm text-white/70 hover:text-white" onClick={() => setSuccess(false)}>Subscribe another</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-gray-400"
      />
      <button
        onClick={handleSubscribe}
        disabled={isSubmitting}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <div className="text-red-400 text-sm sm:ml-2">{error}</div>}
    </div>
  );
}


