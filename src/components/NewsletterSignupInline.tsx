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
        <div className="text-green-400 font-bold tracking-tight">Thanks! You are subscribed.</div>
        <button 
          className="text-xs text-indigo-200 hover:text-white font-black uppercase tracking-widest border-b border-indigo-200/50" 
          onClick={() => setSuccess(false)}
        >
          Subscribe another
        </button>
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
        className="flex-1 px-5 py-3.5 bg-indigo-950/50 border-2 border-indigo-800 rounded-2xl focus:outline-none focus:border-yellow-400 text-white placeholder:text-indigo-300/50 font-medium transition-all"
      />
      <button
        onClick={handleSubscribe}
        disabled={isSubmitting}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 disabled:opacity-50"
      >
        {isSubmitting ? 'Joining...' : 'Subscribe'}
      </button>
      {error && <div className="text-red-400 text-xs font-bold pt-2 sm:pt-0">{error}</div>}
    </div>
  );
}
