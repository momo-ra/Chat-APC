import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  AccessTime,
  Person,
  ArrowBack,
  Share,
  BookmarkBorder,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import { AppSidebar, Footer, ThemeToggle } from '../components/layout';
import { sidebarItems } from '../data/layout/sidebarData';
import { useThemeMode } from '../contexts/ThemeContext';
import { blogService } from '../services/blogService';
import type { BlogArticle } from '../types/blog';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Update page metadata
        document.title = `${fetchedArticle.title} - Alpha Process Control Blog`;
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: isDark
            ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            {error || 'Blog post not found'}
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/resources/blog')}
            variant="outlined"
          >
            Back to Blog
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'visible',
        transition: 'background 0.3s ease',
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />

      <Box component="main" sx={{ width: '100%', position: 'relative' }}>
        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 10, md: 12 },
            pb: { xs: 4, md: 6 },
            background: isDark
              ? 'linear-gradient(180deg, rgba(10, 14, 46, 1) 0%, rgba(13, 24, 66, 0.95) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.95) 100%)',
          }}
        >
          <Container maxWidth="lg">
            {/* Breadcrumbs */}
            <Breadcrumbs
              sx={{
                mb: 3,
                '& .MuiBreadcrumbs-separator': {
                  color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(100, 116, 139, 0.6)',
                },
              }}
            >
              <MuiLink
                color="inherit"
                href="/resources/blog"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/resources/blog');
                }}
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: isDark ? '#009BE4' : '#2563EB',
                    textDecoration: 'underline',
                  },
                }}
              >
                Blog
              </MuiLink>
              <MuiLink
                color="inherit"
                href="#"
                onClick={(e) => e.preventDefault()}
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  textDecoration: 'none',
                }}
              >
                {article.category}
              </MuiLink>
              <Typography
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                }}
              >
                Article
              </Typography>
            </Breadcrumbs>

            {/* Back Button */}
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/resources/blog')}
              sx={{
                mb: 4,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              Back to All Articles
            </Button>

            {/* Category Chip */}
            <Chip
              label={article.category}
              sx={{
                backgroundColor: `${article.categoryColor}15`,
                color: article.categoryColor,
                fontWeight: 600,
                fontSize: '0.9rem',
                mb: 3,
                px: 1,
              }}
            />

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                mb: 3,
                lineHeight: 1.2,
                maxWidth: '900px',
              }}
            >
              {article.title}
            </Typography>

            {/* Excerpt */}
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '800px',
              }}
            >
              {article.excerpt}
            </Typography>

            {/* Meta Information */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 3,
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: article.categoryColor,
                  }}
                >
                  <Person />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                    }}
                  >
                    {article.author.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                    }}
                  >
                    Author
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime
                  sx={{
                    fontSize: 18,
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                  }}
                >
                  {article.readTime}
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Typography
                sx={{
                  fontSize: '0.9rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                }}
              >
                {article.publishedAt}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <IconButton
                onClick={handleShare}
                sx={{
                  border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)'}`,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                    borderColor: isDark ? '#009BE4' : '#2563EB',
                  },
                }}
              >
                <Share />
              </IconButton>
              <IconButton
                sx={{
                  border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)'}`,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                    borderColor: isDark ? '#009BE4' : '#2563EB',
                  },
                }}
              >
                <BookmarkBorder />
              </IconButton>
            </Box>
          </Container>
        </Box>

        {/* Featured Image */}
        {article.image && (
          <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 } }}>
            <Box
              component="img"
              src={article.image}
              alt={article.title}
              sx={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: isDark
                  ? '0 20px 60px rgba(0, 0, 0, 0.5)'
                  : '0 20px 60px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Container>
        )}

        {/* Article Content */}
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 8 } }}>
          <Box
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                fontWeight: 600,
                mb: 2,
                mt: 4,
                lineHeight: 1.3,
              },
              '& h2': {
                fontSize: { xs: '1.75rem', md: '2rem' },
              },
              '& h3': {
                fontSize: { xs: '1.5rem', md: '1.75rem' },
              },
              '& p': {
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(51, 65, 85, 1)',
                mb: 3,
              },
              '& ul, & ol': {
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(51, 65, 85, 1)',
                mb: 3,
                pl: 4,
              },
              '& li': {
                mb: 1,
              },
              '& blockquote': {
                borderLeft: `4px solid ${article.categoryColor}`,
                pl: 3,
                py: 1,
                my: 3,
                fontStyle: 'italic',
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                backgroundColor: isDark ? 'rgba(0, 155, 228, 0.05)' : 'rgba(37, 99, 235, 0.05)',
                borderRadius: '0 8px 8px 0',
              },
              '& code': {
                backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                color: isDark ? '#009BE4' : '#2563EB',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'monospace',
              },
              '& pre': {
                backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(248, 250, 252, 1)',
                padding: 3,
                borderRadius: '12px',
                overflow: 'auto',
                mb: 3,
              },
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                my: 3,
              },
              '& hr': {
                border: 'none',
                borderTop: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)'}`,
                my: 4,
              },
              '& a': {
                color: isDark ? '#009BE4' : '#2563EB',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
            dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
          />
        </Container>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <Box
            sx={{
              py: { xs: 6, md: 8 },
              background: isDark
                ? 'linear-gradient(180deg, rgba(17, 24, 39, 0.5) 0%, rgba(31, 41, 55, 0.5) 100%)'
                : 'linear-gradient(180deg, rgba(248, 250, 252, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
            }}
          >
            <Container maxWidth="lg">
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2rem' },
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                  mb: 4,
                }}
              >
                Related Articles
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 4,
                }}
              >
                {relatedArticles.map((related) => (
                  <Box
                    key={related.id}
                    onClick={() => navigate(`/resources/blog/${related.id}`)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.8)'
                        : 'rgba(255, 255, 255, 0.95)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(226, 232, 240, 1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                          ? `0 12px 40px ${related.categoryColor}20`
                          : `0 12px 40px ${related.categoryColor}15`,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={related.image}
                      alt={related.title}
                      sx={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Chip
                        label={related.category}
                        size="small"
                        sx={{
                          backgroundColor: `${related.categoryColor}15`,
                          color: related.categoryColor,
                          fontWeight: 500,
                          mb: 2,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 2,
                          lineHeight: 1.3,
                        }}
                      >
                        {related.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                          mb: 2,
                        }}
                      >
                        {related.excerpt.substring(0, 100)}...
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: '0.8rem' }}>
                          {related.readTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button
              startIcon={<NavigateBefore />}
              variant="outlined"
              onClick={() => navigate('/resources/blog')}
              sx={{
                borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                '&:hover': {
                  borderColor: isDark ? '#009BE4' : '#2563EB',
                  backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                },
              }}
            >
              Previous Article
            </Button>
            <Button
              endIcon={<NavigateNext />}
              variant="outlined"
              onClick={() => navigate('/resources/blog')}
              sx={{
                borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                '&:hover': {
                  borderColor: isDark ? '#009BE4' : '#2563EB',
                  backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                },
              }}
            >
              Next Article
            </Button>
          </Box>
        </Container>

        <Footer />
      </Box>
    </Box>
  );
};

export default BlogDetailPage;

