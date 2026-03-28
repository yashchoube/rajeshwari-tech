'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center py-12 px-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-100 active:scale-95"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
