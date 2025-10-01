// FILE: admin/blogs.tsx   (or wherever your admin page is located)

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Calendar, User, CheckCircle2, XCircle } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import ImageManager from '@/components/ImageManager';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags?: string;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
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
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?scope=admin'); 
      const data = await response.json();
      // Make sure your API returns { blogs: [...] }
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
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
      await fetchBlogs();
      alert('✅ Blog submitted for approval successfully!');
    } catch (e) {
      console.error(e);
      alert('❌ Failed to submit blog. Please try again.');
    }
  };

  const approve = async (id: number) => {
    try {
      const res = await fetch('/api/blogs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        await fetchBlogs();
        alert('✅ Blog approved and published successfully!');
      } else {
        alert(`❌ Failed to approve blog: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error approving blog:', error);
      alert('❌ Failed to approve blog. Please try again.');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }
    
    try {
      const res = await fetch(`/api/blogs/approve?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      
      if (res.ok) {
        await fetchBlogs();
        alert('✅ Blog deleted successfully!');
      } else {
        alert(`❌ Failed to delete blog: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('❌ Failed to delete blog. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts and articles</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Blog</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{blogs.length}</div>
            <div className="text-gray-600">Total Blogs</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter(blog => blog.status === 'published').length}
            </div>
            <div className="text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {blogs.filter(blog => blog.status === 'draft').length}
            </div>
            <div className="text-gray-600">Drafts</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {blogs.reduce((total, blog) => total + blog.views, 0)}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Blogs</h2>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
              <p className="text-gray-600 mb-6">Create your first blog post to get started</p>
              <button
                onClick={() => {
                  setShowCreateForm(true);
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Create First Blog
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blog
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {blog.excerpt}
                            </div>
                            {blog.featured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{blog.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{blog.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-900">{blog.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{formatDate(blog.created_at)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              const url = blog.status === 'published'
                                ? `/blogs/${blog.slug}`
                                : `/admin/blogs/preview/${blog.slug}`;
                              window.open(url, '_blank');
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title={blog.status === 'published' ? 'View' : 'Preview'}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {blog.status !== 'published' ? (
                            <>
                              <button
                                onClick={() => approve(blog.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => remove(blog.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Reject/Delete"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => remove(blog.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Blog"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
              <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
                    <p className="text-gray-600 mt-1">Write and format your content with our rich editor</p>
                  </div>
                  <button 
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title *</label>
                    <input 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                      placeholder="Enter a compelling title..." 
                      value={form.title} 
                      onChange={e=>setForm({...form,title:e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                    <input 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                      placeholder="auto-generated-from-title" 
                      value={form.slug} 
                      onChange={e=>setForm({...form,slug:e.target.value})} 
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from title</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="Write a brief description of your blog post..."
                    rows={3}
                    value={form.excerpt} 
                    onChange={e=>setForm({...form,excerpt:e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                    <input 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                      placeholder="Author name" 
                      value={form.author} 
                      onChange={e=>setForm({...form,author:e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                      value={form.category} 
                      onChange={e=>setForm({...form,category:e.target.value})}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="react, javascript, web-development (comma separated)" 
                    value={form.tags} 
                    onChange={e=>setForm({...form,tags:e.target.value})} 
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas for better discoverability</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
                  <ImageManager 
                    onImageSelect={(url, filename) => setForm({...form, featuredImage: url})}
                    onImageRemove={() => setForm({...form, featuredImage: ''})}
                    className="mb-4"
                  />
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="Or enter image URL manually" 
                    value={form.featuredImage} 
                    onChange={e=>setForm({...form,featuredImage:e.target.value})} 
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload an image or paste an image URL for the cover image</p>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm font-medium">
                    <input 
                      type="checkbox" 
                      checked={form.featured} 
                      onChange={e=>setForm({...form,featured:e.target.checked})}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span>Mark as featured post</span>
                  </label>
                </div>

                {/* Rich Text Editor */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                  <div className="text-sm text-gray-600 mb-3">
                    Use the toolbar below to format your content. You can paste from other documents, insert images, add links, and use emojis.
                  </div>
                  <RichTextEditor value={form.content} onChange={(html)=>setForm({...form, content: html})} />
                </div>
              </div>
              
              <div className="p-6 border-t bg-gray-50 flex items-center justify-between sticky bottom-0">
                <button 
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
                  onClick={createBlog}
                >
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}