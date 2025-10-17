import type { BlogApiResponse, SingleBlogApiResponse, BlogPost, BlogArticle } from '../types/blog';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://10.10.10.64:3003/api/v1';
const BLOG_ENDPOINT = `/api/v1/content/blogs`;

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
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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

/**
 * Remove inline icon hub l markup, icon templates, html tags and extra whitespace from text.
 * HubSpot icon hubl looks like: {% icon ... %}
 */
function cleanHtmlSummary(html: string): string {
  if (!html) return '';

  // Remove all HubL icon/spans: they often look like nested <span ...>{% icon ... %}</span>
  let text = html.replace(
    /<span [^>]*data-hs-icon-hubl[^>]*>.*?{%\s*icon[^%]*%}.*?<\/span>/gis,
    ''
  );

  // Remove any left over HubL icon templates even if not in a span
  text = text.replace(/{%\s*icon[^%]*%}/gis, '');

  // Now strip remaining HTML
  text = text.replace(/<[^>]*>/g, '');

  // Replace excess whitespace/newlines
  text = text.replace(/\s{2,}/g, ' ').replace(/\n+/g, ' ').trim();

  return text;
}

// --- Enhancement for postBody / content field cleaning ---

/**
 * Enhanced content filter for frontend blog article.
 * 1. Removes any HubSpot module blocks, e.g. {% module_block ... %}{% end_module_block %}
 * 2. Removes "read more" comments (<!--more-->).
 * 3. Removes trailing invisible <p> tags or empty tags at the end.
 * 4. Removes extra whitespace lines.
 * 5. Strips some special hubspot template tags and artifacts.
 */
function cleanHtmlContent(html: string): string {
  if (!html) return '';

  let text = html;

  // 1. Remove HubSpot module blocks and their attributes (very greedy, covers multilines)
  text = text.replace(/{%\s*module_block[\s\S]+?{%\s*end_module_block\s*%}/g, '');

  // 2. Remove read more comments
  text = text.replace(/<!--\s*more\s*-->/gi, '');

  // 3. Remove all HubL icon tags as well (in case they're in content)
  text = text.replace(
    /<span [^>]*data-hs-icon-hubl[^>]*>.*?{%\s*icon[^%]*%}.*?<\/span>/gis,
    ''
  );
  text = text.replace(/{%\s*icon[^%]*%}/gis, '');

  // 4. Remove any empty <p></p> and tags like <p> </p> at the start and end
  text = text.replace(/(<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>\s*)+/g, ''); // globally (cautious for leading/trailing empties)

  // 5. Remove extra blanklines or more than 2 consecutive newlines
  text = text.replace(/\n{3,}/g, '\n\n');

  // 6. Remove excessive spaces around
  text = text.trim();

  return text;
}

// Extract plain text excerpt from HTML with 
// cleaning logic for HubSpot summaries, to be more robust for edge cases.
const extractExcerpt = (html: string, maxLength: number = 150): string => {
  if (!html) return '';
  const cleaned = cleanHtmlSummary(html);
  return cleaned.length > maxLength ? `${cleaned.substring(0, maxLength)}...` : cleaned;
};

// Map API BlogPost to frontend BlogArticle
const mapBlogPostToArticle = (post: BlogPost, includeFullContent: boolean = false): BlogArticle => {
  const category = categoryMap[post.categoryId] || { name: 'General', color: '#6B7280' };

  // Try best available summary: prefer cleaned postSummary, else metaDescription, else empty
  let summarySource = post.postSummary && post.postSummary.trim()
    ? post.postSummary
    : post.metaDescription || '';

  // Enhance/clean postBody (the article content!) if full content requested
  let filteredContent: string | undefined = undefined;
  if (includeFullContent && typeof post.postBody === 'string' && post.postBody.trim()) {
    filteredContent = cleanHtmlContent(post.postBody);
  }

  return {
    id: post.id,
    title: post.htmlTitle || post.name,
    excerpt: extractExcerpt(summarySource),
    content: includeFullContent ? filteredContent : undefined,
    category: category.name,
    categoryColor: category.color,
    readTime: calculateReadTime(post.postBody || ''),
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
      const articles: BlogArticle[] = posts.map(post =>
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

