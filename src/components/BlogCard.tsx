'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image?: string;
  views: number;
  created_at: string;
  tags?: string;
}

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return 'bg-blue-100 text-blue-800';
      case 'technology':
        return 'bg-purple-100 text-purple-800';
      case 'career':
        return 'bg-green-100 text-green-800';
      case 'tutorials':
        return 'bg-orange-100 text-orange-800';
      case 'industry insights':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Blog Image */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
        {blog.featured_image ? (
          <img 
            src={blog.featured_image} 
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-sm opacity-90">Blog Post</div>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(blog.category)}`}>
            {blog.category}
          </span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Blog Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{blog.views}</span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.split(',').slice(0, 3).map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                #{tag.trim()}
              </span>
            ))}
            {blog.tags.split(',').length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{blog.tags.split(',').length - 3}
              </span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group-hover:translate-x-1 transform duration-300"
        >
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
