import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import {
  BlogDetailHero,
  BlogDetailContent,
  BlogRelatedArticles,
} from '../components/blog-details';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { blogService } from '../services/blogService';
import type { BlogArticle } from '../types/blog';
import { usePageTitle } from '../hooks/usePageTitle';
import { applyEntranceAnimation } from '../components/shared/animationHelpers';
import { SEOHead } from '../components/SEO/SEOHead';


// NOTE: All page layouts should follow the structure in RoadmapPage.tsx for consistency
const BlogDetailPage: React.FC = () => {
  <SEOHead
    title="Blog Detail"
    description="Explore the latest insights on industrial AI, process control optimization, and ChatAPC features from Alpha Process Control experts."
  />
  usePageTitle({
    title: 'Blog Detail',
    description: 'Explore the latest insights on industrial AI, process control optimization, and ChatAPC features from Alpha Process Control experts.',
    suffix: 'ChatAPC - ',
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [previousArticle, setPreviousArticle] = useState<{ id: string; title: string } | undefined>();
  const [nextArticle, setNextArticle] = useState<{ id: string; title: string } | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Refs for animation
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount (like RoadmapPage)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('No blog post specified');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedArticle = await blogService.getBlogById(id);

        if (!fetchedArticle) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        setArticle(fetchedArticle);

        // Fetch related articles
        const featured = await blogService.getFeaturedBlogs(3);
        setRelatedArticles(featured.filter(a => a.id !== fetchedArticle.id).slice(0, 2));

        // Mock previous/next articles (implement proper navigation logic as needed)
        const allArticles = await blogService.getFeaturedBlogs(10);
        const currentIndex = allArticles.findIndex(a => a.id === id);

        if (currentIndex > 0) {
          setPreviousArticle({
            id: allArticles[currentIndex - 1].id,
            title: allArticles[currentIndex - 1].title,
          });
        } else {
          setPreviousArticle(undefined);
        }

        if (currentIndex < allArticles.length - 1 && currentIndex !== -1) {
          setNextArticle({
            id: allArticles[currentIndex + 1].id,
            title: allArticles[currentIndex + 1].title,
          });
        } else {
          setNextArticle(undefined);
        }

        // Update page metadata
        document.title = `${fetchedArticle.title} - Alpha Process Control Blog`;
        // You may set meta description here if available, simliar to RoadmapPage
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Animate sections when article is loaded
  useEffect(() => {
    if (!loading && !error && article) {
      // Animate hero section
      if (heroRef.current) {
        applyEntranceAnimation(heroRef.current, 'slideUp', { delay: 0.08, startTrigger: 'top 90%' });
      }
      // Animate blog content section
      if (contentRef.current) {
        applyEntranceAnimation(contentRef.current, 'fadeIn', { delay: 0.05, startTrigger: 'top 89%' });
      }
      // Animate related articles section
      if (relatedRef.current && relatedArticles.length > 0) {
        applyEntranceAnimation(relatedRef.current, 'slideUp', { delay: 0.12, startTrigger: 'top 91%' });
      }
    }
  }, [loading, error, article, relatedArticles.length]);

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  // Loading State (center content also with Portal-level zIndex, keep Sidebar/ThemeToggle layered)
  if (loading) {
    return (
      <>
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: '-9999px',
            zIndex: 9999,
            padding: '8px 16px',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            textDecoration: 'none',
            borderRadius: 1,
            '&:focus': {
              left: '16px',
              top: '16px',
            },
          }}
        >
          Skip to main content
        </Box>
        <Box
          sx={{
            minHeight: '100vh',
            background: isDark
              ? 'linear-gradient(to bottom, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
              : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
            transition: 'background 0.3s ease',
            position: 'relative',
          }}
        >
          {/* Make Sidebar and ThemeToggle layered above background */}
          <AppSidebar items={sidebarItems} />
          <ThemeToggle />
          {/* Center the loader absolutely relative to viewport */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 1098, // Above sidebar overlay, below dialogs
            }}
          >
            <CircularProgress
              size={60}
              sx={{
                color: isDark ? '#60A5FA' : '#3B82F6',
                pointerEvents: 'auto',
              }}
            />
          </Box>
        </Box>
      </>
    );
  }

  // Error State (mimic RoadmapPage, embed content in .main-content)
  if (error || !article) {
    return (
      <>
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: '-9999px',
            zIndex: 9999,
            padding: '8px 16px',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            textDecoration: 'none',
            borderRadius: 1,
            '&:focus': {
              left: '16px',
              top: '16px',
            },
          }}
        >
          Skip to main content
        </Box>
        <Box
          sx={{
            minHeight: '100vh',
            background: isDark
              ? 'linear-gradient(to bottom, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
              : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
            transition: 'background 0.3s ease',
            position: 'relative',
          }}
        >
          <AppSidebar items={sidebarItems} />
          <ThemeToggle />
          <Box
            id="main-content"
            component="main"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '100vw',
              overflow: 'hidden',
              position: 'relative',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              px: 3,
            }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 4,
                maxWidth: 600,
                width: '100%',
              }}
            >
              {error || 'Blog post not found'}
            </Alert>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/resources/blog')}
              variant="outlined"
              sx={{
                borderColor: isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 1)',
                color: isDark ? '#FFFFFF' : '#475569',
                '&:hover': {
                  borderColor: isDark ? '#60A5FA' : '#3B82F6',
                  backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                },
              }}
            >
              Back to Blog
            </Button>
          </Box>
          <Box
            component="footer"
            sx={{ 
              mt: 0,
              mb: 0,
              width: '100%',
              marginLeft: 0,
              paddingLeft: 0,
            }}
          >
            <Footer />
          </Box>
        </Box>
      </>
    );
  }

  // Main Content (structure and comments mimicking RoadmapPage)
  return (
    <>
      {/* Skip Navigation for Accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          borderRadius: 1,
          '&:focus': {
            left: '16px',
            top: '16px',
          },
        }}
      >
        Skip to main content
      </Box>

      <Box
        ref={mainBoxRef}
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(to bottom, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
          position: 'relative',
          overflow: 'visible',
          transition: 'background 0.3s ease',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />

        {/* Main Content */}
        <Box
          id="main-content"
          component="main"
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: '100vw',
            overflow: 'hidden',
            position: 'relative',
            background: 'transparent',
          }}
        >
          {/* Blog Detail Sections */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100vw',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            {/* Hero Section */}
            <div ref={heroRef}>
              <BlogDetailHero 
                article={article}
                onShare={handleShare}
              />
            </div>
            {/* Content Section */}
            <div ref={contentRef}>
              <BlogDetailContent
                content={article.content || article.excerpt}
                categoryColor={article.categoryColor}
                featuredImage={article.image}
                imageAlt={article.title}
              />
            </div>
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div ref={relatedRef}>
                <BlogRelatedArticles articles={relatedArticles} />
              </div>
            )}
          </Box>
          {/* Footer */}
          <Box 
            component="footer"
            sx={{
              mt: 0,
              mb: 0,
              width: '100%',
              marginLeft: 0,
              paddingLeft: 0,
            }}
          >
            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogDetailPage;