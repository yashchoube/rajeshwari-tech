import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';
import { Blog } from '@/types/blog';

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
    const cat = category.toLowerCase();
    if (cat.includes('programming')) return 'bg-blue-100 text-blue-800';
    if (cat.includes('technology')) return 'bg-purple-100 text-purple-800';
    if (cat.includes('career')) return 'bg-green-100 text-green-800';
    if (cat.includes('tutorial')) return 'bg-orange-100 text-orange-800';
    if (cat.includes('insight')) return 'bg-pink-100 text-pink-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <article
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {blog.featured_image ? (
          <Image 
            src={blog.featured_image} 
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-xs font-bold uppercase tracking-wider">Rajeshwari Tech</div>
            </div>
          </div>
        )}
        
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(blog.category)}`}>
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {blog.excerpt}
        </p>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-gray-400 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span className="uppercase">{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 capitalize">
            <Eye className="w-3 h-3" />
            <span>{blog.views} views</span>
          </div>
        </div>

        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-bold text-xs uppercase tracking-wider"
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;

