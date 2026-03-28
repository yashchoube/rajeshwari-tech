import {
  createBlog,
  getBlogBySlug,
  getBlogBySlugAdmin,
  getAllBlogs,
  getAllBlogsAdmin,
  approveBlog,
  deleteBlog,
  incrementBlogViews,
  getBlogById,
} from '@/lib/database';
import { AppError, NotFoundError } from '@/lib/errorHandler';
import { logger } from '@/lib/logger';

export interface CreateBlogRequest {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  category: string;
  tags?: string;
  featured?: boolean;
  status?: 'pending' | 'published';
}

export interface BlogResponse {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  category: string;
  tags?: string;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

type Row = Record<string, unknown>;

function toResponse(row: Row | undefined): BlogResponse | null {
  if (!row || row.id == null) return null;
  return {
    id: Number(row.id),
    title: String(row.title ?? ''),
    slug: String(row.slug ?? ''),
    excerpt: String(row.excerpt ?? ''),
    content: String(row.content ?? ''),
    author: String(row.author ?? ''),
    featuredImage:
      row.featured_image != null && String(row.featured_image) !== ''
        ? String(row.featured_image)
        : undefined,
    category: String(row.category ?? ''),
    tags: row.tags != null ? String(row.tags) : undefined,
    status: String(row.status ?? ''),
    featured: Boolean(row.featured),
    views: Number(row.views ?? 0),
    created_at: row.created_at != null ? String(row.created_at) : '',
    updated_at: row.updated_at != null ? String(row.updated_at) : '',
  };
}

export class BlogService {
  async createBlog(data: CreateBlogRequest): Promise<BlogResponse> {
    try {
      logger.info('Creating blog post', { title: data.title, author: data.author });
      const blogId = await createBlog(data);
      const blog = toResponse((await getBlogById(Number(blogId))) as Row);
      if (!blog) {
        throw new AppError('Failed to retrieve created blog', 500);
      }
      logger.info('Blog created successfully', { blogId, slug: blog.slug });
      return blog;
    } catch (error) {
      logger.error('Error creating blog', { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async getBlogBySlug(slug: string, isAdmin: boolean = false): Promise<BlogResponse> {
    try {
      const row = isAdmin ? await getBlogBySlugAdmin(slug) : await getBlogBySlug(slug);
      const blog = toResponse(row as Row);
      if (!blog) {
        throw new NotFoundError('Blog post', { slug });
      }
      return blog;
    } catch (error) {
      logger.error('Error fetching blog', { slug, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async getAllBlogs(isAdmin: boolean = false): Promise<BlogResponse[]> {
    try {
      const rows = isAdmin ? await getAllBlogsAdmin() : await getAllBlogs();
      return (rows as Row[]).map((r) => toResponse(r)).filter((b): b is BlogResponse => b !== null);
    } catch (error) {
      logger.error('Error fetching blogs', { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async approveBlog(id: number): Promise<BlogResponse> {
    try {
      logger.info('Approving blog', { blogId: id });
      await approveBlog(id);
      const blog = toResponse((await getBlogById(id)) as Row);
      if (!blog) {
        throw new NotFoundError('Blog post', { id });
      }
      logger.info('Blog approved successfully', { blogId: id, slug: blog.slug });
      return blog;
    } catch (error) {
      logger.error('Error approving blog', { blogId: id, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async deleteBlog(id: number): Promise<void> {
    try {
      logger.info('Deleting blog', { blogId: id });
      await deleteBlog(id);
      logger.info('Blog deleted successfully', { blogId: id });
    } catch (error) {
      logger.error('Error deleting blog', { blogId: id, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async incrementViews(slug: string): Promise<void> {
    try {
      await incrementBlogViews(slug);
    } catch (error) {
      logger.error('Error incrementing views', { slug, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}

export const blogService = new BlogService();
