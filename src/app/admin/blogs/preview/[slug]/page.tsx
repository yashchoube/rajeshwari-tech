import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// Note: approveBlog is not used in this component, it's handled by ApproveActions
import ApproveActions from '@/components/ApproveActions';

interface PageProps {
  params: Promise<{ slug: string }>;
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
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
}

export default async function AdminPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const { getBlogBySlugAdmin } = await import('@/lib/neon-database');
  const blog = await getBlogBySlugAdmin(slug) as BlogRecord | undefined;

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <Link href="/admin/blogs" className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Blogs</span>
          </Link>
          <div className="mt-8 bg-white rounded-2xl shadow p-8">
            <h1 className="text-2xl font-bold">Blog not found</h1>
            <p className="text-gray-600 mt-2">Ensure the blog exists. Pending blogs can be previewed here before approval.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin/blogs" className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Blogs</span>
          </Link>
        </div>
      </div>

      <article className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-56 md:h-64 bg-gradient-to-br from-indigo-500 to-purple-600">
              {blog.featured_image ? (
                <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-3">📝</div>
                    <div className="text-lg opacity-90">Admin Preview</div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

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
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pending Preview</span>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              <ApproveActions blogId={blog.id} isPublished={blog.status === 'published'} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}


