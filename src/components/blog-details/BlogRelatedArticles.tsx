import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { AccessTime, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import type { BlogArticle } from '../../types/blog';

gsap.registerPlugin(ScrollTrigger);

// IMPORTANT: Export this component as named export
// import { BlogRelatedArticles } from '../components/blog-details';

interface BlogRelatedArticlesProps {
  articles: BlogArticle[];
}

export const BlogRelatedArticles: React.FC<BlogRelatedArticlesProps> = ({ articles }) => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    sectionPadding,
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (articles.length === 0) return null;

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: sectionPadding,
        background: 'transparent',
        borderTop: isDark 
          ? '1px solid rgba(71, 85, 105, 0.2)' 
          : '1px solid rgba(226, 232, 240, 0.6)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: isDark ? '#60A5FA' : '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              mb: 2,
            }}
          >
            Continue Reading
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#0F172A',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Related Articles
          </Typography>
        </Box>

        {/* Articles Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {articles.map((article, index) => (
            <Box
              key={article.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el as HTMLDivElement;
              }}
              onClick={() => navigate(`/resources/blog/${article.id}`)}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                overflow: 'hidden',
                background: 'transparent',
                border: isDark 
                  ? '1px solid rgba(71, 85, 105, 0.2)' 
                  : '1px solid rgba(226, 232, 240, 0.6)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: article.categoryColor,
                  transform: 'translateY(-4px)',
                  boxShadow: isDark
                    ? `0 20px 40px ${article.categoryColor}15`
                    : `0 20px 40px ${article.categoryColor}12`,
                  '& .article-image': {
                    transform: 'scale(1.05)',
                  },
                  '& .read-more': {
                    transform: 'translateX(4px)',
                    color: article.categoryColor,
                  },
                },
              }}
            >
              {/* Image Container */}
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 240, md: 280 },
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: isDark ? 'rgba(71, 85, 105, 0.2)' : 'rgba(248, 250, 252, 1)',
                }}
              >
                <Box
                  className="article-image"
                  component="img"
                  src={article.image}
                  alt={article.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                {/* Category Badge Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                  }}
                >
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      backgroundColor: isDark ? `${article.categoryColor}DD` : `${article.categoryColor}`,
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      height: 28,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                </Box>
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: isDark
                      ? 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(255, 255, 255, 0.6) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </Box>

              {/* Content */}
              <Box sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Meta Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime
                      sx={{
                        fontSize: 16,
                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#64748B',
                        fontWeight: 500,
                      }}
                    >
                      {article.readTime}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.3)' : '#CBD5E1',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#64748B',
                      fontWeight: 500,
                    }}
                  >
                    {article.publishedAt}
                  </Typography>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: { xs: '1.375rem', md: '1.5rem' },
                    fontWeight: 700,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    mb: 2,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
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
                    fontSize: '0.9375rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                    mb: 3,
                    lineHeight: 1.7,
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.excerpt}
                </Typography>

                {/* Read More Link */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    pt: 2,
                    borderTop: isDark 
                      ? '1px solid rgba(71, 85, 105, 0.2)' 
                      : '1px solid rgba(226, 232, 240, 0.6)',
                  }}
                >
                  <Typography
                    className="read-more"
                    sx={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Read Article
                  </Typography>
                  <ArrowForward
                    className="read-more"
                    sx={{
                      fontSize: 18,
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};