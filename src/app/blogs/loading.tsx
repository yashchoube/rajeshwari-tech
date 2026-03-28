import React from 'react';

export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Skeleton for Header/Hero area */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 md:h-20 bg-gray-200 rounded-2xl w-3/4 mx-auto mb-6" />
          <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto" />
        </div>

        {/* Skeleton for Category Bar */}
        <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 mb-12 shadow-sm flex space-x-3 overflow-x-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-28 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
          ))}
        </div>

        {/* Skeleton for Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-pulse">
              <div className="aspect-[16/9] bg-gray-200 rounded-2xl mb-6" />
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-6" />
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="w-24 h-8 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
