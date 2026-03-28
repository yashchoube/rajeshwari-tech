'use client';

import { Copy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogActions() {
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard');
    } catch {
      alert('Failed to copy URL');
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={copyUrl}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <Copy className="w-5 h-5" />
        <span>Copy URL</span>
      </button>
    </div>
  );
}


