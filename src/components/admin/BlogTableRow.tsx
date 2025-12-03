'use client';

import { useState } from 'react';
import { Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

// ----------------------
// Update Type: Added
// Description: Created new BlogTableRow component for managing blogs in a table view
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

interface BlogTableRowProps {
    blog: Blog;
    onEdit: (blog: Blog) => void;
    onDelete: (id: number) => void;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    onView: (slug: string) => void;
}

export default function BlogTableRow({
    blog,
    onEdit,
    onDelete,
    onApprove,
    onReject,
    onView
}: BlogTableRowProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'draft':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
            {/* Thumbnail */}
            <td className="px-6 py-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                    {blog.featured_image ? (
                        <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white font-bold text-sm">
                            {blog.title.charAt(0)}
                        </span>
                    )}
                </div>
            </td>

            {/* Title & Excerpt */}
            <td className="px-6 py-4 max-w-md">
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {blog.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
            </td>

            {/* Author */}
            <td className="px-6 py-4">
                <span className="text-sm text-gray-700">{blog.author}</span>
            </td>

            {/* Category */}
            <td className="px-6 py-4">
                <span className="inline-flex px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                    {blog.category}
                </span>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        blog.status
                    )}`}
                >
                    {blog.status}
                </span>
            </td>

            {/* Views */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-1 text-sm text-gray-700">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{blog.views.toLocaleString()}</span>
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{formatDate(blog.created_at)}</span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onView(blog.slug)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(blog)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    {blog.status === 'pending' && onApprove && (
                        <button
                            onClick={() => onApprove(blog.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    )}
                    {blog.status === 'pending' && onReject && (
                        <button
                            onClick={() => onReject(blog.id)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Reject"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Delete Blog Post?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(blog.id);
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </td>
        </motion.tr>
    );
}
