import type { BlogApiResponse, SingleBlogApiResponse, BlogPost, BlogArticle } from '../types/blog';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://172.27.88.85:3003/api/v1';
const BLOG_ENDPOINT = `${API_BASE_URL}/content/blogs`;

// Category mapping from categoryId to category name and color
const categoryMap: Record<number, { name: string; color: string }> = {
  3: { name: 'APC & Optimization', color: '#2563EB' },
  // Add more categories as needed
};

// Calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Format date to relative time
const formatPublishDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return '1 month ago';
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Extract plain text excerpt from HTML
const extractExcerpt = (html: string, maxLength: number = 150): string => {
  const text = html.replace(/<[^>]*>/g, ''); // Strip HTML tags
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Map API BlogPost to frontend BlogArticle
const mapBlogPostToArticle = (post: BlogPost, includeFullContent: boolean = false): BlogArticle => {
  const category = categoryMap[post.categoryId] || { name: 'General', color: '#6B7280' };
  
  return {
    id: post.id,
    title: post.htmlTitle || post.name,
    excerpt: extractExcerpt(post.postSummary || post.metaDescription || ''),
    content: includeFullContent ? post.postBody : undefined,
    category: category.name,
    categoryColor: category.color,
    readTime: calculateReadTime(post.postBody),
    publishedAt: formatPublishDate(post.publishDate),
    author: {
      name: post.authorName,
      avatar: '', // HubSpot doesn't provide avatar in blog post, you may need to fetch separately
    },
    image: post.featuredImage || '/api/placeholder/400/250',
    trending: false, // You can add logic to determine trending posts
    slug: post.slug,
    url: post.url,
    tags: post.tagIds,
  };
};

class BlogService {
  // Fetch all blogs
  async getAllBlogs(includeArchived: boolean = false): Promise<BlogArticle[]> {
    try {
      const response = await fetch(BLOG_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: BlogApiResponse = await response.json();
      
      // Filter out archived posts if needed
      let posts = data.data.results;
      if (!includeArchived) {
        posts = posts.filter(post => !post.archivedInDashboard && post.currentlyPublished);
      }
      
      // Map posts to articles without full content
      const articles: BlogArticle[] = posts.map((post) => 
        mapBlogPostToArticle(post, false)
      );
      
      return articles;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  // Fetch a single blog by ID
  async getBlogById(id: string, includeFullContent: boolean = true): Promise<BlogArticle | null> {
    try {
      const response = await fetch(`${BLOG_ENDPOINT}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SingleBlogApiResponse = await response.json();
      
      if (!data.data) {
        return null;
      }
      
      return mapBlogPostToArticle(data.data, includeFullContent);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  }

  // Fetch blogs by category
  async getBlogsByCategory(categoryId: number): Promise<BlogArticle[]> {
    try {
      const allBlogs = await this.getAllBlogs();
      return allBlogs.filter(blog => {
        const category = categoryMap[categoryId];
        return category && blog.category === category.name;
      });
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  }

  // Fetch featured blogs (you can customize the logic)
  async getFeaturedBlogs(limit: number = 3): Promise<BlogArticle[]> {
    try {
      const allBlogs = await this.getAllBlogs();
      // Sort by publish date and take the most recent
      return allBlogs
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      throw error;
    }
  }

  // Search blogs
  async searchBlogs(query: string): Promise<BlogArticle[]> {
    try {
      const allBlogs = await this.getAllBlogs();
      const lowerQuery = query.toLowerCase();
      
      return allBlogs.filter(blog => 
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.excerpt.toLowerCase().includes(lowerQuery) ||
        blog.category.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService();
export default blogService;

