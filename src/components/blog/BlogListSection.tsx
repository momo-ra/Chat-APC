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

/**
 * Dynamic Masonry Layout Algorithm
 * Creates varied, balanced card sizes that always fill the full width
 * No repeating patterns - each article gets intelligently sized
 */
const getMasonryLayout = (index: number, totalCards: number) => {
  // Track how many columns we've used so far
  // We need to ensure each row sums to exactly 12 units (like Bootstrap grid)
  
  // Define possible card sizes (in grid units out of 12)
  // 12 = full width, 6 = half, 4 = third, 8 = two-thirds, etc.
  const layouts = [
    { width: 12, height: 'medium' },  // Full width
    { width: 8, height: 'tall' },     // Two-thirds + tall
    { width: 6, height: 'medium' },   // Half width
    { width: 4, height: 'short' },    // Third width
    { width: 4, height: 'tall' },     // Third width + tall
    { width: 6, height: 'tall' },     // Half width + tall
  ];

  // Smart distribution based on position and total count
  if (totalCards === 1) {
    return { width: 12, height: 'medium' };
  }
  
  if (totalCards === 2) {
    return { width: 6, height: 'medium' };
  }
  
  if (totalCards === 3) {
    if (index === 0) return { width: 12, height: 'medium' }; // Full width
    return { width: 6, height: 'medium' }; // Two halves on second row
  }
  
  if (totalCards === 4) {
    if (index === 0) return { width: 8, height: 'tall' };    // Large card
    if (index === 1) return { width: 4, height: 'tall' };    // Small tall
    return { width: 6, height: 'medium' }; // Two halves
  }
  
  if (totalCards === 5) {
    if (index === 0) return { width: 6, height: 'tall' };    // Half tall
    if (index === 1) return { width: 6, height: 'medium' };  // Half medium
    if (index === 2) return { width: 4, height: 'short' };   // Third
    if (index === 3) return { width: 4, height: 'tall' };    // Third tall
    return { width: 4, height: 'medium' }; // Third
  }
  
  if (totalCards === 6) {
    if (index === 0) return { width: 8, height: 'tall' };    // Two-thirds tall
    if (index === 1) return { width: 4, height: 'medium' };  // Third
    if (index === 2) return { width: 6, height: 'medium' };  // Half
    if (index === 3) return { width: 6, height: 'tall' };    // Half tall
    if (index === 4) return { width: 4, height: 'short' };   // Third
    return { width: 8, height: 'medium' }; // Two-thirds
  }
  
  // For 7+ articles: create interesting varied pattern
  const patterns = [
    { width: 8, height: 'tall' },     // 0: Large featured
    { width: 4, height: 'medium' },   // 1: Small
    { width: 6, height: 'medium' },   // 2: Half
    { width: 6, height: 'tall' },     // 3: Half tall
    { width: 4, height: 'short' },    // 4: Third short
    { width: 4, height: 'tall' },     // 5: Third tall
    { width: 4, height: 'medium' },   // 6: Third medium
    { width: 12, height: 'medium' },  // 7: Full width feature
    { width: 6, height: 'medium' },   // 8: Half
    { width: 6, height: 'tall' },     // 9: Half tall
    { width: 8, height: 'medium' },   // 10: Two-thirds
    { width: 4, height: 'tall' },     // 11: Third tall
  ];
  
  return patterns[index % patterns.length];
};

// Convert grid units to CSS percentages
const getFlexBasis = (width: number) => {
  const percentage = (width / 12) * 100;
  // Subtract gap spacing (3 gaps * 24px = 72px total / 3 cards = 24px per card)
  return `calc(${percentage}% - 24px)`;
};

// Get card heights based on size
const getCardHeight = (height: string) => {
  switch (height) {
    case 'short': return { minHeight: '320px', imageHeight: '140px' };
    case 'medium': return { minHeight: '420px', imageHeight: '180px' };
    case 'tall': return { minHeight: '550px', imageHeight: '240px' };
    default: return { minHeight: '420px', imageHeight: '180px' };
  }
};

const BlogListSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9); // Changed to 9 for better masonry layout
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
      applySlideUp(headerRef.current);
      applySlideUp(tabsRef.current, { delay: 0.2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (articlesRef.current.length > 0) {
      applyCardGridAnimation(articlesRef.current, sectionRef.current, {
        staggerDelay: 0.08,
      });
    }
  }, [activeCategory, currentPage]);

  const filteredArticles = activeCategory === 'All' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeCategory);

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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box ref={sectionRef} component="section" sx={{ py: 'clamp(3rem, 8vw, 6rem)', background: 'transparent', position: 'relative' }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
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
        background: "transparent",
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
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
        <Box ref={tabsRef} sx={{ mb: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
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
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Responsive Flex Grid - Always fills full width */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 3 },
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              gap: 2.5,
            },
          }}
        >
          {currentArticles.map((article, index) => {
            const layout = getMasonryLayout(index, currentArticles.length);
            const cardSize = getCardHeight(layout.height);
            const isFullWidth = layout.width === 12;
            const isLarge = layout.width >= 8;

            return (
              <Card
                key={article.id}
                ref={(el) => {
                  if (el) articlesRef.current[index] = el as HTMLDivElement;
                }}
                onClick={() => handleArticleClick(article)}
                elevation={isDark ? 0 : 6}
                sx={{
                  flex: {
                    xs: '1 1 100%',
                    md: `0 1 ${getFlexBasis(layout.width)}`,
                  },
                  minHeight: {
                    xs: '380px',
                    md: cardSize.minHeight,
                  },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  border: isDark ? '1px solid rgba(75, 85, 99, 0.3)' : 'none',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
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

                {/* Image - Dynamic sizing based on card height */}
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{
                    height: {
                      xs: '180px',
                      md: cardSize.imageHeight,
                    },
                    width: '100%',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />

                {/* Content - Adaptive padding for large cards */}
                <CardContent
                  sx={{
                    p: isLarge ? { xs: 2.5, md: 3.5 } : { xs: 2.5, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: isLarge ? 3 : 2.5,
                    },
                  }}
                >
                  {/* Category & Meta */}
                  <Box sx={{ mb: isLarge ? 2 : 1.5 }}>
                    <Chip
                      label={article.category}
                      size="small"
                      sx={{
                        backgroundColor: `${article.categoryColor}15`,
                        color: article.categoryColor,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        mb: isLarge ? 2 : 1.5,
                      }}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        fontSize: isLarge ? '0.85rem' : '0.75rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime sx={{ fontSize: isLarge ? 16 : 14 }} />
                        {article.readTime}
                      </Box>
                      <Box>•</Box>
                      <Box>{article.publishedAt}</Box>
                    </Box>
                  </Box>

                  {/* Title - Larger for feature cards */}
                  <Typography
                    sx={{
                      fontSize: isFullWidth 
                        ? { xs: '1.4rem', md: '1.6rem' }
                        : isLarge
                        ? { xs: '1.2rem', md: '1.35rem' }
                        : { xs: '1.05rem', md: '1.15rem' },
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                      mb: isLarge ? 2 : 1.5,
                      lineHeight: 1.3,
                      transition: 'color 0.3s ease',
                      display: '-webkit-box',
                      WebkitLineClamp: isFullWidth ? 2 : isLarge ? 3 : 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.title}
                  </Typography>

                  {/* Excerpt - Show more on taller cards */}
                  <Typography
                    sx={{
                      fontSize: isLarge ? '0.95rem' : '0.875rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                      lineHeight: 1.6,
                      mb: 2,
                      flex: 1,
                      transition: 'color 0.3s ease',
                      display: '-webkit-box',
                      WebkitLineClamp: layout.height === 'tall' ? 5 : layout.height === 'short' ? 2 : 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.excerpt}
                  </Typography>

                  {/* Author - Larger avatar for big cards */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
                    <Avatar
                      src={article.author.avatar}
                      sx={{
                        width: isLarge ? 36 : 32,
                        height: isLarge ? 36 : 32,
                        background: article.categoryColor,
                      }}
                    >
                      <Person />
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: isLarge ? '0.9rem' : '0.8rem',
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
            );
          })}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 6 } }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                  borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                  '&.Mui-selected': {
                    backgroundColor: isDark ? '#009BE4' : '#2563EB',
                    color: 'white',
                  },
                },
              }}
            />
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default BlogListSection;