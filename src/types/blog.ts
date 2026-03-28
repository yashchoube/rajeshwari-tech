export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image?: string;
  category: string;
  tags?: string;
  status: 'pending' | 'published';
  featured: boolean | number;
  views: number;
  created_at: string;
  updated_at: string;
}

export type CreateBlogInput = Omit<Blog, 'id' | 'created_at' | 'updated_at' | 'views'> & {
  slug?: string;
};
