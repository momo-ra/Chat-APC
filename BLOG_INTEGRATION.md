# Blog Integration Documentation

## Overview
This document describes the integration of the HubSpot blog API with the Alpha Process Control website.

## API Endpoints

### Base URL
```
http://localhost:3003/api/v1/content
```

### Available Endpoints

1. **Get All Blogs**
   - Endpoint: `GET /blogs`
   - Returns: List of all published blog posts
   - Response includes pagination info and blog posts array

2. **Get Single Blog**
   - Endpoint: `GET /blogs/:id`
   - Returns: Single blog post by ID

## Data Structure

### API Response Format
```typescript
{
  status: "success",
  count: number,
  total: number,
  data: {
    total: number,
    results: BlogPost[]
  }
}
```

### BlogPost Interface
Key fields from the API:
- `id`: Unique identifier
- `name`: Internal name
- `htmlTitle`: Display title
- `slug`: URL-friendly identifier
- `url`: Full URL to the blog post
- `authorName`: Author's name
- `categoryId`: Numeric category identifier
- `featuredImage`: Image URL
- `featuredImageAltText`: Alt text for image
- `metaDescription`: SEO description
- `postBody`: Full HTML content
- `postSummary`: Summary/excerpt HTML
- `publishDate`: ISO date string
- `currentState`: "PUBLISHED" or "DRAFT"
- `currentlyPublished`: Boolean
- `archivedInDashboard`: Boolean
- `tagIds`: Array of tag IDs

## Implementation

### Type Definitions
Located in `/src/types/blog.ts`:
- `BlogPost`: Raw API response type
- `BlogArticle`: Frontend-friendly mapped type
- `BlogApiResponse`: API wrapper response
- `BlogCategory`: Category information
- `BlogTag`: Tag information

### Service Layer
Located in `/src/services/blogService.ts`:

#### Available Methods

1. **getAllBlogs(includeArchived?: boolean)**
   - Fetches all blog posts
   - Filters out archived/unpublished posts by default
   - Returns: `Promise<BlogArticle[]>`

2. **getBlogById(id: string)**
   - Fetches a single blog post
   - Returns: `Promise<BlogArticle | null>`

3. **getBlogsByCategory(categoryId: number)**
   - Filters blogs by category
   - Returns: `Promise<BlogArticle[]>`

4. **getFeaturedBlogs(limit?: number)**
   - Gets most recent blogs (default: 3)
   - Returns: `Promise<BlogArticle[]>`

5. **searchBlogs(query: string)**
   - Searches blogs by title, excerpt, or category
   - Returns: `Promise<BlogArticle[]>`

### Data Transformation

The service layer includes helper functions to transform API data:

- **calculateReadTime(content: string)**: Estimates reading time based on word count
- **formatPublishDate(dateString: string)**: Converts ISO dates to relative time (e.g., "3 days ago")
- **extractExcerpt(html: string, maxLength?: number)**: Strips HTML and creates plain text excerpts
- **mapBlogPostToArticle(post: BlogPost)**: Transforms API BlogPost to frontend BlogArticle

### Category Mapping

Categories are mapped from numeric IDs to names and colors in the service:

```typescript
const categoryMap: Record<number, { name: string; color: string }> = {
  3: { name: 'APC & Optimization', color: '#2563EB' },
  // Add more categories as needed
};
```

**Note**: Update this mapping based on your actual HubSpot categories.

## Components

### BlogListSection
Main component displaying all blog articles with:
- Category filtering
- Pagination
- Loading states
- Error handling
- Responsive grid layout

#### Features:
- Fetches blogs on component mount
- Extracts and displays unique categories
- Filters articles by selected category
- Paginated display (6 articles per page)
- GSAP animations for smooth transitions
- Dark/light mode support

### Other Blog Components
- `BlogHeroSection`: Hero banner with search
- `BlogCategoriesSection`: Category quick links
- `BlogFeaturedSection`: Featured articles carousel
- `BlogSubscribeSection`: Newsletter subscription

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3003/api/v1
VITE_HUBSPOT_BLOG_ENDPOINT=/content/blogs
```

## Usage Example

```typescript
import { blogService } from './services/blogService';

// Fetch all blogs
const blogs = await blogService.getAllBlogs();

// Fetch single blog
const blog = await blogService.getBlogById('276909964527');

// Search blogs
const results = await blogService.searchBlogs('APC optimization');

// Get featured blogs
const featured = await blogService.getFeaturedBlogs(3);
```

## Error Handling

The service includes comprehensive error handling:
- Network errors
- HTTP errors (404, 500, etc.)
- Empty responses
- Invalid data

All errors are logged to console and can be caught by components.

## Future Enhancements

1. **Caching**: Implement caching to reduce API calls
2. **Author Profiles**: Fetch and display author information
3. **Tag Filtering**: Add tag-based filtering
4. **Related Posts**: Implement related posts algorithm
5. **Social Sharing**: Add social media sharing buttons
6. **Comments**: Integrate commenting system
7. **Reading Progress**: Add reading progress indicator
8. **Bookmarks**: Allow users to save favorite articles

## Testing

To test the integration:

1. Ensure the API server is running on `http://localhost:3003`
2. Navigate to `/blog` route
3. Check browser console for any errors
4. Verify that blog posts are displayed correctly
5. Test category filtering
6. Test pagination

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure the API server has CORS configured correctly
   - Check that the API URL in `.env` is correct

2. **Empty Blog List**
   - Verify API is returning data
   - Check filter conditions (archived/published)
   - Verify category mapping

3. **Images Not Loading**
   - Check that `featuredImage` URLs are accessible
   - Verify CORS for image resources

4. **Slow Loading**
   - Consider implementing pagination on API level
   - Add caching layer
   - Optimize image sizes

## Contributing

When adding new features:
1. Update type definitions in `/src/types/blog.ts`
2. Add service methods in `/src/services/blogService.ts`
3. Update components to use new features
4. Update this documentation
5. Test thoroughly

## Contact

For questions or issues, contact the development team.

