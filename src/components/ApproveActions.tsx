'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface ApproveActionsProps {
  blogId: number;
  isPublished: boolean;
}

const ApproveActions = ({ blogId, isPublished }: ApproveActionsProps) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(isPublished);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    if (isApproved || isApproving) return;

    setIsApproving(true);
    setError(null);

    try {
      const response = await fetch('/api/blogs/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: blogId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsApproved(true);
        // Show success message
        alert('✅ Blog approved and published successfully!');
      } else {
        setError(result.error || 'Failed to approve blog');
        alert(`❌ Failed to approve blog: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error approving blog:', error);
      setError('Network error occurred');
      alert('❌ Failed to approve blog. Please try again.');
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="mt-8 flex items-center justify-end gap-3">
      <Link 
        href="/admin/blogs" 
        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Back
      </Link>
      
      {isApproved ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded bg-green-100 text-green-700">
          <CheckCircle2 className="w-4 h-4" />
          <span>Already Published</span>
        </div>
      ) : (
        <button
          onClick={handleApprove}
          disabled={isApproving}
          className={`px-4 py-2 rounded font-medium transition-all duration-200 flex items-center gap-2 ${
            isApproving
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : error
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isApproving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publishing...</span>
            </>
          ) : error ? (
            <>
              <span>Retry Approval</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve and Publish</span>
            </>
          )}
        </button>
      )}

      {error && (
        <div className="text-sm text-red-600 mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default ApproveActions;
