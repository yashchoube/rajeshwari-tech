'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Bell,
  Eye,
  TrendingUp,
  MessageSquare,
  Tag,
  UserPlus,
  Grid3x3,
  List,
  FileText,
  XCircle,
  Users
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import BlogTableRow from '@/components/admin/BlogTableRow';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageManager from '@/components/admin/ImageManager';
import { handleImageError } from '@/lib/imageUtils';

// ----------------------
// Update Type: Changed
// Description: Updated Admin Blogs Page with responsive layout, new components, and enhanced filtering
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured_image?: string;
  category: string;
  tags?: string;
  status: 'pending' | 'published' | 'draft';
  featured: boolean | number;
  views: number;
  created_at: string;
  updated_at: string;
}

interface AnalyticsData {
  page: string;
  visits: number;
  unique_referrers: number;
  last_visit: string;
}

interface Stats {
  viewsLast30Days: number;
  newSubscribers: number;
  avgEngagementRate: number;
  postInterests: string;
  pendingComments: number;
  pendingBlogs: number;
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  popularCategories: Array<{
    category: string;
    post_count: number;
    total_views: number;
  }>;
  analyticsData: AnalyticsData[];
  trends?: {
    views: { value: number; trend: number };
    bookings: { value: number; trend: number };
    enquiries: { value: number; trend: number };
    blogs: { value: number; trend: number };
  };
  analyticsHistory?: { date: string; views: number }[];
}

type ViewType = 'table' | 'grid';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<ViewType>('table');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    author: '',
    category: '',
    tags: '',
    featuredImage: '',
    featured: false,
    content: '' as string,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, statsRes] = await Promise.all([
        fetch('/api/blogs?scope=admin'),
        fetch('/api/admin/stats')
      ]);

      const blogsData = await blogsRes.json();
      const statsData = await statsRes.json();

      setBlogs(blogsData.blogs || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTab = activeTab === 'all' || blog.status === activeTab;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const featuredBlogs = filteredBlogs.filter((blog) => blog.featured).slice(0, 3);

  const handleEdit = (blog: Blog) => {
    console.log('Edit blog:', blog);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch('/api/blogs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error approving blog:', error);
    }
  };

  const handleReject = (id: number) => {
    handleDelete(id);
  };

  const handleView = (slug: string) => {
    window.open(`/blogs/${slug}`, '_blank');
  };

  const handleCreateBlog = () => {
    setShowCreateForm(true);
  };

  const createBlog = async () => {
    // Client-side validation
    const errors = [];
    if (!form.title.trim()) errors.push('Title is required');
    if (!form.excerpt.trim()) errors.push('Excerpt is required');
    if (!form.author.trim()) errors.push('Author is required');
    if (!form.category.trim()) errors.push('Category is required');
    if (!form.content.trim()) errors.push('Content is required');

    if (errors.length > 0) {
      alert(`Please fix the following errors:\n• ${errors.join('\n• ')}`);
      return;
    }

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug: form.slug.trim() || undefined, // Let backend auto-generate if empty
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          alert(`Please fix the following errors:\n• ${result.errors.join('\n• ')}`);
        } else {
          alert(result.error || 'Failed to submit blog');
        }
        return;
      }

      setShowCreateForm(false);
      setForm({ title: '', slug: '', excerpt: '', author: '', category: '', tags: '', featuredImage: '', featured: false, content: '' });
      await fetchData();
      alert('✅ Blog submitted for approval successfully!');
    } catch (e) {
      console.error(e);
      alert('❌ Failed to submit blog. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Header Bar - Responsive */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">Admin / </span>
              <span className="text-gray-900 font-semibold">Blogs</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 max-w-md mx-2 sm:mx-8">
            <div className="relative flex-1">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateBlog}
              className="sticky top-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 font-semibold whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Blog</span>
            </motion.button>
          </div>
        </header>

        {/* Sub-Horizontal Navigation - Responsive */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-4 py-2">
            {/* Tabs - Scrollable on mobile */}
            <div className="flex items-center space-x-1 overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                { id: 'all', label: 'All', fullLabel: 'All Blogs', count: blogs.length },
                { id: 'published', label: 'Published', fullLabel: 'Published', count: stats?.publishedBlogs || 0 },
                { id: 'pending', label: 'Pending', fullLabel: 'Pending', count: stats?.pendingBlogs || 0 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                  <span className="sm:hidden">{tab.label}</span>
                  <span
                    className={`ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>



            {/* View Toggles */}

            <div className="flex items-center space-x-2">

              <button
                onClick={() => setViewType('table')}
                className={`p-2 rounded-lg transition-all ${viewType === 'table'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-400 hover:bg-gray-100'
                  }`}
                title="Table View"
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-lg transition-all ${viewType === 'grid'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-400 hover:bg-gray-100'
                  }`}
                title="Grid View"
              >
                <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

            </div>

          </div>
        </div>

        {/* Content Area - Responsive */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Statistics Dashboard - Responsive Grid */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
              <StatCard
                title="Total Views (30d)"
                value={stats.viewsLast30Days.toLocaleString()}
                icon={Eye}
                gradientFrom="#8b5cf6"
                gradientTo="#6366f1"
                trend={stats.trends ? { value: stats.trends.views.trend, isPositive: stats.trends.views.trend >= 0 } : undefined}
                delay={0}
              />
              <StatCard
                title="Avg. Engagement"
                value={`${stats.avgEngagementRate}%`}
                icon={TrendingUp}
                gradientFrom="#10b981"
                gradientTo="#059669"
                delay={0.1}
              />
              <StatCard
                title="Post Interests"
                value={stats.postInterests}
                icon={Tag}
                gradientFrom="#f59e0b"
                gradientTo="#d97706"
                delay={0.2}
              />
              <StatCard
                title="Pending Blogs"
                value={stats.pendingBlogs}
                icon={FileText}
                gradientFrom="#ef4444"
                gradientTo="#dc2626"
                trend={stats.trends ? { value: stats.trends.blogs.trend, isPositive: stats.trends.blogs.trend >= 0 } : undefined}
                delay={0.3}
              />
            </div>
          )}

          {/* Analytics Chart */}
          <AnalyticsChart
            data={stats?.analyticsData || []}
            categoryData={stats?.popularCategories || []}
            historyData={stats?.analyticsHistory || []}
          />

          {/* Featured Blogs Section - Responsive */}
          {featuredBlogs.length > 0 && (
            <div className="mb-6 lg:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Blogs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleView(blog.slug)}
                  >
                    <div className="h-32 sm:h-40 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                      {blog.featured_image ? (
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 group-hover:underline">
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{blog.author}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{blog.views}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Table View - Responsive */}
          {viewType === 'table' && (
            <div className="flex gap-6">
              <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Desktop Table View - Hidden on Mobile */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Thumbnail
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((blog) => (
                        <BlogTableRow
                          key={blog.id}
                          blog={blog}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onView={handleView}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View - Visible on Mobile Only */}
                <div className="md:hidden divide-y divide-gray-200">
                  {filteredBlogs.map((blog, idx) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex gap-3">
                        {/* Thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                            {blog.featured_image ? (
                              <img
                                src={blog.featured_image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-8 h-8 text-white/50" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                            {blog.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {blog.author}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {blog.views}
                            </span>
                            <span>•</span>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                              {blog.category}
                            </span>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${blog.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : blog.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                              }`}>
                              {blog.status}
                            </span>
                            {blog.featured && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleView(blog.slug)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </button>
                            {blog.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(blog.id)}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(blog.id)}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {blog.status !== 'pending' && (
                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredBlogs.length === 0 && (
                  <div className="text-center py-12 sm:py-16">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      No blogs found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Try adjusting your filters or create a new blog post
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Grid View - Responsive */}
          {viewType === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate">{blog.author}</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{blog.views}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state for grid view */}
          {viewType === 'grid' && filteredBlogs.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Try adjusting your filters or create a new blog post
              </p>
            </div>
          )}
        </main>
      </div >

      {/* Floating Action Button - Responsive */}
      {/* Mobile FAB - Only show on smaller screens when not in table view */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCreateBlog}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center group z-50"
        title="Create New Blog"
      >
        <Plus className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:rotate-90 duration-300" />
      </motion.button>

      {/* Create Blog Full Page */}
      {
        showCreateForm && (
          <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-y-auto">
            {/* Hero Header with Gradient */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <button
                        onClick={() => setShowCreateForm(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <XCircle className="w-10 h-10 text-red-500 cursor-pointer" />
                      </button>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div className="text-sm text-gray-500">
                        Admin / Blogs / <span className="text-gray-900 font-semibold">Create New</span>
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                      Create New Blog Post
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">Write and format your content with our powerful rich editor</p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-gray-600 hover:text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createBlog}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      Submit for Approval
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
              <div className="space-y-8">
                {/* Basic Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      Basic Information
                    </h2>
                    <p className="text-purple-100 mt-2">Essential details about your blog post</p>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          Blog Title <span className="text-red-500">*</span>
                          <span className="text-xs font-normal text-gray-500">(Required)</span>
                        </label>
                        <input
                          className="w-full  border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 text-gray-900 placeholder-gray-600"
                          placeholder="Enter a compelling title..."
                          value={form.title}
                          onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          URL Slug
                          <span className="text-xs font-normal text-gray-500">(Optional)</span>
                        </label>
                        <input
                          className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 text-gray-900 placeholder-gray-600"
                          placeholder="auto-generated-from-title"
                          value={form.slug}
                          onChange={e => setForm({ ...form, slug: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          Leave empty to auto-generate from title
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        Excerpt <span className="text-red-500">*</span>
                        <span className="text-xs font-normal text-gray-500">(Required)</span>
                      </label>
                      <textarea
                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 resize-none text-gray-900 placeholder-gray-600"
                        placeholder="Write a brief, engaging description of your blog post..."
                        rows={4}
                        value={form.excerpt}
                        onChange={e => setForm({ ...form, excerpt: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          Author <span className="text-red-500">*</span>
                          <span className="text-xs font-normal text-gray-500">(Required)</span>
                        </label>
                        <input
                          className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 text-gray-900 placeholder-gray-600"
                          placeholder="Author name"
                          value={form.author}
                          onChange={e => setForm({ ...form, author: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          Category <span className="text-red-500">*</span>
                          <span className="text-xs font-normal text-gray-500">(Required)</span>
                        </label>
                        <select
                          className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 bg-white text-gray-900 placeholder-gray-600"
                          value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}
                        >
                          <option value="">Select a category</option>
                          <option value="Programming">Programming</option>
                          <option value="Technology">Technology</option>
                          <option value="Career">Career</option>
                          <option value="Tutorials">Tutorials</option>
                          <option value="Industry Insights">Industry Insights</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        Tags
                        <span className="text-xs font-normal text-gray-500">(Optional)</span>
                      </label>
                      <input
                        className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 text-gray-900 placeholder-gray-600"
                        placeholder="react, javascript, web-development (comma separated)"
                        value={form.tags}
                        onChange={e => setForm({ ...form, tags: e.target.value })}
                      />
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Separate tags with commas for better discoverability
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Featured Image Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6" />
                      </div>
                      Featured Image & Options
                    </h2>
                    <p className="text-blue-100 mt-2">Add a stunning cover image for your blog post</p>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-4">Featured Image</label>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-purple-400 transition-all">
                        <ImageManager
                          onImageSelect={(url, filename) => setForm({ ...form, featuredImage: url })}
                          onImageRemove={() => setForm({ ...form, featuredImage: '' })}
                          className="mb-4"
                        />
                        <div className="relative">
                          <input
                            className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg hover:border-gray-300 text-gray-900 placeholder-gray-600"
                            placeholder="Or enter image URL manually"
                            value={form.featuredImage}
                            onChange={e => setForm({ ...form, featuredImage: e.target.value })}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          Upload an image or paste an image URL for the cover image
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={e => setForm({ ...form, featured: e.target.checked })}
                          className="w-6 h-6 text-purple-600 border-gray-300 rounded-lg focus:ring-purple-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            Mark as featured post
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Featured posts appear prominently on the blog homepage
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>

                {/* Rich Text Editor Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-pink-600 to-orange-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      Content Editor
                    </h2>
                    <p className="text-pink-100 mt-2">Craft your story with our powerful rich text editor</p>
                  </div>
                  <div className="p-8">
                    <label className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      Blog Content <span className="text-red-500">*</span>
                      <span className="text-xs font-normal text-gray-500">(Required)</span>
                    </label>
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800 font-medium">
                        💡 Pro Tip: Use the toolbar below to format your content. You can paste from other documents, insert images, add links, and use emojis.
                      </p>
                    </div>
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-all">
                      <RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} />
                    </div>
                  </div>
                </motion.div>

                {/* Sticky Bottom Action Bar - Mobile */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 text-gray-600 hover:text-gray-800 font-semibold px-6 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createBlog}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Spacer for mobile bottom bar */}
                <div className="lg:hidden h-24"></div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}