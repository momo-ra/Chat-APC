// Blog API Response Types
export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  name: string;
  htmlTitle: string;
  slug: string;
  url: string;
  authorName: string;
  blogAuthorId: string;
  categoryId: number;
  created: string;
  updated: string;
  publishDate: string;
  currentState: 'PUBLISHED' | 'DRAFT';
  currentlyPublished: boolean;
  archivedInDashboard: boolean;
  featuredImage: string;
  featuredImageAltText: string;
  metaDescription: string;
  postBody: string;
  postSummary: string;
  rssBody?: string;
  rssSummary?: string;
  tagIds: number[];
  state: 'PUBLISHED' | 'DRAFT';
  contentGroupId: string;
}

// Response for list of blogs
export interface BlogApiResponse {
  status: string;
  count: number;
  total: number;
  data: {
    total: number;
    results: BlogPost[];
  };
}

// Response for single blog
export interface SingleBlogApiResponse {
  status: string;
  data: BlogPost;
}

// Frontend Blog Article Type (mapped from API)
export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Full HTML content
  category: string;
  categoryColor: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  trending?: boolean;
  slug: string;
  url: string;
  tags: number[];
}

// Blog Category Type
export interface BlogCategory {
  id: number;
  name: string;
  color: string;
  description?: string;
}

// Blog Tag Type
export interface BlogTag {
  id: number;
  name: string;
}

