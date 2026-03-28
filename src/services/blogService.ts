// Enterprise-grade blog service layer

import { Database } from 'better-sqlite3';
import { createBlog, getBlogBySlug, getBlogBySlugAdmin, getAllBlogs, getAllBlogsAdmin, approveBlog, deleteBlog, incrementBlogViews } from '@/lib/database';
import { AppError, NotFoundError, ConflictError } from '@/lib/errorHandler';
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

export class BlogService {
  async createBlog(data: CreateBlogRequest): Promise<BlogResponse> {
    try {
      logger.info('Creating blog post', { title: data.title, author: data.author });
      
      const blogId = createBlog(data);
      const blog = getBlogBySlugAdmin(data.slug || '') as BlogResponse;
      
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
      const blog = isAdmin ? getBlogBySlugAdmin(slug) : getBlogBySlug(slug);
      
      if (!blog) {
        throw new NotFoundError('Blog post', { slug });
      }

      return blog as BlogResponse;
    } catch (error) {
      logger.error('Error fetching blog', { slug, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async getAllBlogs(isAdmin: boolean = false): Promise<BlogResponse[]> {
    try {
      const blogs = isAdmin ? getAllBlogsAdmin() : getAllBlogs();
      return blogs as BlogResponse[];
    } catch (error) {
      logger.error('Error fetching blogs', { error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async approveBlog(id: number): Promise<BlogResponse> {
    try {
      logger.info('Approving blog', { blogId: id });
      
      approveBlog(id);
      
      // Get the updated blog
      const blogs = getAllBlogsAdmin();
      const blog = blogs.find(b => b.id === id);
      
      if (!blog) {
        throw new NotFoundError('Blog post', { id });
      }

      logger.info('Blog approved successfully', { blogId: id, slug: blog.slug });
      return blog as BlogResponse;
    } catch (error) {
      logger.error('Error approving blog', { blogId: id, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async deleteBlog(id: number): Promise<void> {
    try {
      logger.info('Deleting blog', { blogId: id });
      
      deleteBlog(id);
      
      logger.info('Blog deleted successfully', { blogId: id });
    } catch (error) {
      logger.error('Error deleting blog', { blogId: id, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  async incrementViews(slug: string): Promise<void> {
    try {
      incrementBlogViews(slug);
    } catch (error) {
      logger.error('Error incrementing views', { slug, error: error instanceof Error ? error.message : 'Unknown error' });
      // Don't throw error for view counting - it's not critical
    }
  }
}

export const blogService = new BlogService();
