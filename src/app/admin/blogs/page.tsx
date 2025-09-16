// FILE: admin/blogs.tsx   (or wherever your admin page is located)

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Calendar, User, CheckCircle2, XCircle } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

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
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to submit blog');
        return;
      }
      setShowCreateForm(false);
      setForm({ title: '', slug: '', excerpt: '', author: '', category: '', tags: '', featuredImage: '', featured: false, content: '' });
      await fetchBlogs();
      alert('Blog submitted for approval. wait for approval to publish.');
    } catch (e) {
      console.error(e);
      alert('Failed to submit blog');
    }
  };

  const approve = async (id: number) => {
    try {
      const res = await fetch('/api/blogs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchBlogs();
      }
    } catch {}
  };

  const remove = async (id: number) => {
    try {
      const res = await fetch(`/api/blogs/approve?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchBlogs();
      }
    } catch {}
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
                              window.open(`/blogs/${blog.slug}`, '_blank');
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Blog"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {blog.status !== 'published' ? (
                            <>
                              <button
                                onClick={() => {
                                  window.open(`/blogs/${blog.slug}?preview=true`, '_blank');
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
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
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Create New Blog</h2>
              </div>
              <div className="p-6 overflow-y-auto space-y-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Slug (unique, url-friendly)" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Excerpt" value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full border rounded px-3 py-2" placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
                  <input className="w-full border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
                </div>
                <input className="w-full border rounded px-3 py-2" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Featured image URL (optional)" value={form.featuredImage} onChange={e=>setForm({...form,featuredImage:e.target.value})} />
                <label className="flex items-center space-x-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} /><span>Mark as featured</span></label>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <div className="text-xs text-gray-500 mb-2">Format with toolbar; paste from docs; insert images/links/emojis.</div>
                  <RichTextEditor value={form.content} onChange={(html)=>setForm({...form, content: html})} />
                </div>
              </div>
              <div className="p-4 border-t flex items-center justify-between sticky bottom-0 bg-white">
                <button className="text-sm text-red-500 hover:underline" onClick={() => setShowCreateForm(false)}>Cancel</button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" onClick={createBlog}>Submit for Approval</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}