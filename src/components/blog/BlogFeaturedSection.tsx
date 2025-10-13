import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia, Chip, Avatar } from '@mui/material';
import { AccessTime, ArrowForward, Person } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const featuredArticles = [
  {
    id: 1,
    title: 'Revolutionizing Process Control with AI-Powered Constraint Detection',
    excerpt: 'Discover how ChatAPC\'s advanced algorithms identify hidden bottlenecks in real-time, potentially saving millions in operational efficiency.',
    category: 'AI & Machine Learning',
    categoryColor: '#8B5CF6',
    readTime: '8 min read',
    publishedAt: '2 days ago',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: '/api/placeholder/40/40',
    },
    image: 'https://www.webnode.com/blog/wp-content/uploads/2019/04/blog2.png',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Industrial Automation: Trends to Watch in 2025',
    excerpt: 'Explore the emerging technologies and methodologies that will shape the next generation of smart manufacturing.',
    category: 'Industry Trends',
    categoryColor: '#DC2626',
    readTime: '6 min read',
    publishedAt: '1 week ago',
    author: {
      name: 'Michael Chen',
      avatar: '/api/placeholder/40/40',
    },
    image: 'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg',
  },
  {
    id: 3,
    title: 'Case Study: 300% ROI Improvement Through Intelligent Process Optimization',
    excerpt: 'Learn how a major petrochemical plant achieved unprecedented efficiency gains using data-driven optimization strategies.',
    category: 'Process Optimization',
    categoryColor: '#2563EB',
    readTime: '12 min read',
    publishedAt: '5 days ago',
    author: {
      name: 'Emily Rodriguez',
      avatar: '/api/placeholder/40/40',
    },
    image: 'https://img.freepik.com/free-vector/character-illustration-people-holding-blogging-icons_53876-59869.jpg?semt=ais_hybrid&w=740&q=80',
  },
];

const BlogFeaturedSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Featured article animation
      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Other articles animation
      articlesRef.current.forEach((article, index) => {
        if (article) {
          gsap.from(article, {
            scrollTrigger: {
              trigger: article,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [featuredArticle, ...otherArticles] = featuredArticles;

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
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
            mb: { xs: 6, md: 8 },
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
            Featured Articles
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
            Must-read insights from industry experts and thought leaders
          </Typography>
        </Box>

        {/* Featured Article */}
        <Card
          ref={featuredRef}
          elevation={isDark ? 0 : 12}
          sx={{
            mb: { xs: 6, md: 8 },
            borderRadius: '16px',
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
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-12px)',
              boxShadow: isDark
                ? '0 25px 80px rgba(0, 155, 228, 0.25)'
                : '0 25px 80px rgba(37, 99, 235, 0.2)',
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              minHeight: { xs: 'auto', lg: '400px' },
            }}
          >
            {/* Image */}
            <CardMedia
              component="img"
              image={featuredArticle.image}
              alt={featuredArticle.title}
              sx={{
                height: { xs: '250px', lg: '100%' },
                objectFit: 'cover',
                order: { xs: 1, lg: 1 },
              }}
            />

            {/* Content */}
            <CardContent
              sx={{
                p: { xs: 3, md: 4, lg: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                order: { xs: 2, lg: 2 },
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  p: 4,
                },
              }}
            >
              {/* Category & Meta */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Chip
                    label="Featured"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Chip
                    label={featuredArticle.category}
                    size="small"
                    sx={{
                      backgroundColor: `${featuredArticle.categoryColor}15`,
                      color: featuredArticle.categoryColor,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: '0.875rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 16 }} />
                    {featuredArticle.readTime}
                  </Box>
                  <Box>•</Box>
                  <Box>{featuredArticle.publishedAt}</Box>
                </Box>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.75rem', lg: '2rem' },
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                  mb: 3,
                  lineHeight: 1.3,
                  transition: 'color 0.3s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '1.6rem',
                  },
                }}
              >
                {featuredArticle.title}
              </Typography>

              {/* Excerpt */}
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                  lineHeight: 1.6,
                  mb: 4,
                  transition: 'color 0.3s ease',
                }}
              >
                {featuredArticle.excerpt}
              </Typography>

              {/* Author & Read More */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={featuredArticle.author.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                      background: featuredArticle.categoryColor,
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {featuredArticle.author.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: isDark ? '#009BE4' : '#2563EB',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      gap: 1.5,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    Read More
                  </Typography>
                  <ArrowForward sx={{ fontSize: 18 }} />
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Card>

        {/* Other Articles */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              gap: 3,
            },
          }}
        >
          {otherArticles.map((article, index) => (
            <Card
              key={article.id}
              ref={(el) => {
                if (el) articlesRef.current[index] = el as HTMLDivElement;
              }}
              elevation={isDark ? 0 : 8}
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
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: isDark
                    ? `0 20px 60px ${article.categoryColor}30`
                    : `0 20px 60px ${article.categoryColor}20`,
                },
              }}
            >
              <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                  height: '200px',
                  objectFit: 'cover',
                }}
              />

              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
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
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                    mb: 2,
                    lineHeight: 1.3,
                    transition: 'color 0.3s ease',
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
      </Container>
    </Box>
  );
};

export default BlogFeaturedSection;