import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { getBlogBySlug, getBlogCategories } from '@/lib/neon-database';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BlogActions from '@/components/BlogActions';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface BlogRecord {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image?: string;
  category: string;
  tags?: string;
  views: number;
  created_at: string;
}

export async function generateMetadata({ params, searchParams }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = (await (searchParams || Promise.resolve({}))) as Record<string, any>;
  const preview = sp?.preview === 'true';
  const blog = await (preview ? (await import('@/lib/neon-database')).getBlogBySlugAdmin(slug) : getBlogBySlug(slug)) as
    | BlogRecord
    | undefined;
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} - RajeshwariTech Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { slug } = await params;
  const sp = (await (searchParams || Promise.resolve({}))) as Record<string, any>;
  const preview = sp?.preview === 'true';
  const blog = await (preview ? (await import('@/lib/neon-database')).getBlogBySlugAdmin(slug) : getBlogBySlug(slug)) as
    | BlogRecord
    | undefined;
  const categories = await getBlogCategories();

  if (!blog) {
    notFound();
  }

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
    <div className="min-h-screen bg-gray-50">
      <AnalyticsTracker page={`/blogs/${blog.slug}`} />
      <Header />
      
      {/* Back Button */}
      <div className="pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blogs"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <article className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Blog Header */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-indigo-500 to-purple-600">
              {blog.featured_image ? (
                <img 
                  src={blog.featured_image} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="text-xl opacity-90">Blog Article</div>
                  </div>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(blog.category)}`}>
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Blog Info */}
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between text-gray-600 mb-8">
                <div className="flex flex-wrap items-center space-x-6 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="font-semibold">{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views} views</span>
                  </div>
                </div>
                
                <BlogActions />
              </div>

              {/* Tags */}
              {blog.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.split(',').map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Blog Content (stored as HTML) */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <p className="text-gray-600">
              Continue reading with these related articles
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(await categories).slice(0, 3).map((category: any, index: number) => (
              <div key={category.category} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.category}</h3>
                <p className="text-gray-600 mb-4">
                  Explore more articles in this category
                </p>
                <Link 
                  href={`/blogs?category=${encodeURIComponent(category.category)}`}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  View Articles →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
