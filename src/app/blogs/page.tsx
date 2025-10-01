import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { getAllBlogs, getFeaturedBlogs, getBlogCategories } from '@/lib/database';

export const metadata: Metadata = {
  title: 'Blog - RajeshwariTech | Latest Articles & Tech Insights',
  description: 'Read our latest articles on programming, technology, career tips, and industry insights. Stay updated with the tech world.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const featuredBlogs = getFeaturedBlogs();
  const categories = getBlogCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsTracker page="/blogs" />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Blog</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Stay updated with the latest insights, tutorials, and industry trends. 
            Learn from our experts and advance your tech career.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{blogs.length}+</div>
              <div className="text-white/80 text-sm">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{categories.length}</div>
              <div className="text-white/80 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-white/80 text-sm">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">Weekly</div>
              <div className="text-white/80 text-sm">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don&apos;t miss our most popular and trending articles
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  <a 
                    href="/blogs" 
                    className="block px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    All Categories
                  </a>
                  {categories.map((category: any) => (
                    <a 
                      key={category.category}
                      href={`/blogs?category=${encodeURIComponent(category.category)}`}
                      className="block px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      {category.category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <NewsletterSubscription />
            </div>

            {/* Blog Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">All Articles</h2>
                <div className="text-gray-600">
                  {blogs.length} article{blogs.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              {blogs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {blogs.map((blog, index) => (
                    <BlogCard key={blog.id} blog={blog} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
                  <p className="text-gray-600">
                    We&apos;re working on some amazing content. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
