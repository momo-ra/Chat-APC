import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  Avatar,
  Button,
  Tab,
  Tabs,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { AccessTime, Person, TrendingUp, FilterList } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { blogService } from '../../services/blogService';
import type { BlogArticle } from '../../types/blog';
import { applySlideUp, applyCardGridAnimation } from '../shared/animationHelpers';

const BlogListSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogs = await blogService.getAllBlogs();
        setAllArticles(blogs);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(blogs.map(blog => blog.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load blog articles. Please try again later.');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      applySlideUp(headerRef.current);

      // Animate tabs
      applySlideUp(tabsRef.current, { delay: 0.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate articles when they change
  useEffect(() => {
    if (articlesRef.current.length > 0) {
      applyCardGridAnimation(articlesRef.current, sectionRef.current, {
        staggerDelay: 0.1,
      });
    }
  }, [activeCategory, currentPage]);

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'All' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: sectionRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: BlogArticle) => {
    navigate(`/resources/blog/${article.id}`);
  };

  // Show loading state
  if (loading) {
    return (
      <Box
        ref={sectionRef}
        component="section"
        sx={{
          py: 'clamp(3rem, 8vw, 6rem)',
          background: 'transparent',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box
        ref={sectionRef}
        component="section"
        sx={{
          py: 'clamp(3rem, 8vw, 6rem)',
          background: 'transparent',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 50%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(248, 250, 252, 1) 100%)',
        position: 'relative',
        transition: 'background 0.3s ease',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            All Articles
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            Browse our complete library of industrial insights and technical guides
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box
          ref={tabsRef}
          sx={{
            mb: { xs: 4, md: 6 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: isDark ? '#009BE4' : '#2563EB',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTabs-scrollButtons': {
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 1)',
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category}
                label={category}
                value={category}
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: isDark ? '#009BE4' : '#2563EB',
                    fontWeight: 600,
                  },
                  '&:hover': {
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 1)',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Articles Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              gap: 3,
            },
          }}
        >
          {currentArticles.map((article, index) => (
            <Card
              key={article.id}
              ref={(el) => {
                if (el) articlesRef.current[index] = el as HTMLDivElement;
              }}
              onClick={() => handleArticleClick(article)}
              elevation={isDark ? 0 : 6}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : 'none',
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: isDark
                    ? `0 20px 60px ${article.categoryColor}30`
                    : `0 20px 60px ${article.categoryColor}20`,
                },
              }}
            >
              {/* Trending Badge */}
              {article.trending && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <TrendingUp sx={{ fontSize: 14 }} />
                  Trending
                </Box>
              )}

              <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                  height: '180px',
                  objectFit: 'cover',
                }}
              />

              <CardContent
                sx={{
                  p: { xs: 3, md: 3.5 },
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    p: 3,
                  },
                }}
              >
                {/* Category & Meta */}
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      backgroundColor: `${article.categoryColor}15`,
                      color: article.categoryColor,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      mb: 2,
                    }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      fontSize: '0.8rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTime sx={{ fontSize: 14 }} />
                      {article.readTime}
                    </Box>
                    <Box>•</Box>
                    <Box>{article.publishedAt}</Box>
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                    mb: 2,
                    lineHeight: 1.3,
                    transition: 'color 0.3s ease',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.title}
                </Typography>

                {/* Excerpt */}
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                    lineHeight: 1.5,
                    mb: 3,
                    flex: 1,
                    transition: 'color 0.3s ease',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.excerpt}
                </Typography>

                {/* Author */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={article.author.avatar}
                    sx={{
                      width: 32,
                      height: 32,
                      background: article.categoryColor,
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {article.author.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 4, md: 6 },
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                  borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(248, 250, 252, 1)',
                    borderColor: isDark ? '#009BE4' : '#2563EB',
                  },
                  '&.Mui-selected': {
                    backgroundColor: isDark ? '#009BE4' : '#2563EB',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: isDark ? '#0284C7' : '#1E40AF',
                    },
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Load More Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="outlined"
            size="large"
            startIcon={<FilterList />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: isDark ? '#009BE4' : '#2563EB',
                backgroundColor: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                color: isDark ? '#009BE4' : '#2563EB',
                transform: 'translateY(-2px)',
              },
            }}
          >
            View Advanced Filters
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogListSection;