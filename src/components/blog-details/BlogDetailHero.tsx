import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  AccessTime,
  Person,
  Share,
  BookmarkBorder,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import type { BlogArticle } from '../../types/blog';
import { applyStaggerAnimation } from '../shared/animationHelpers';

interface BlogDetailHeroProps {
  article: BlogArticle;
  onShare?: () => void;
}

export const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ article, onShare }) => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const heroRef = useRef<HTMLDivElement>(null);

  const {
    containerMaxWidth,
    containerPadding,
    h1FontSize,
    bodyLargeFontSize,
  } = useResponsiveLayout();

  useEffect(() => {
    if (heroRef.current) {
      const elements = Array.from(
        heroRef.current.querySelectorAll('.hero-element')
      ) as HTMLElement[];

      applyStaggerAnimation(elements, 'slideUp', {
        staggerDelay: 0.1,
        startTrigger: 'top 85%',
        triggerElement: heroRef.current,
      });
    }
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 6, md: 10 },
        position: 'relative',
        background: 'transparent',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: isDark
            ? 'radial-gradient(ellipse at top, rgba(96, 165, 250, 0.08) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: { xs: '100%', md: '900px' },
          px: containerPadding,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          className="hero-element"
          separator={<ArrowForward sx={{ fontSize: 14 }} />}
          sx={{
            mb: 4,
            '& .MuiBreadcrumbs-separator': {
              color: isDark ? 'rgba(255, 255, 255, 0.3)' : '#CBD5E1',
              mx: 1,
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
              color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#64748B',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: isDark ? '#60A5FA' : '#3B82F6',
              },
            }}
          >
            Resources
          </MuiLink>
          <MuiLink
            color="inherit"
            href="/resources/blog"
            onClick={(e) => {
              e.preventDefault();
              navigate('/resources/blog');
            }}
            sx={{
              color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#64748B',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: isDark ? '#60A5FA' : '#3B82F6',
              },
            }}
          >
            Blog
          </MuiLink>
          <Typography
            sx={{
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#0F172A',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            {article.category}
          </Typography>
        </Breadcrumbs>

        {/* Category Chip */}
        <Chip
          className="hero-element"
          label={article.category}
          sx={{
            backgroundColor: isDark ? `${article.categoryColor}18` : `${article.categoryColor}12`,
            color: article.categoryColor,
            fontWeight: 700,
            fontSize: '0.8125rem',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            mb: 4,
            px: 2,
            height: 36,
            border: isDark ? `1px solid ${article.categoryColor}30` : `1px solid ${article.categoryColor}20`,
            '&:hover': {
              backgroundColor: isDark ? `${article.categoryColor}22` : `${article.categoryColor}18`,
            },
          }}
        />

        {/* Title */}
        <Typography
          className="hero-element"
          variant="h1"
          sx={{
            fontSize: h1FontSize,
            fontWeight: 800,
            color: isDark ? '#FFFFFF' : '#0F172A',
            mb: 4,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {article.title}
        </Typography>

        {/* Excerpt */}
        <Typography
          className="hero-element"
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
            mb: 6,
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          {article.excerpt}
        </Typography>

        {/* Meta Information */}
        <Box
          className="hero-element"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 3,
            pb: 6,
            borderBottom: isDark ? '1px solid rgba(71, 85, 105, 0.25)' : '1px solid rgba(226, 232, 240, 0.8)',
          }}
        >
          {/* Author Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${article.categoryColor} 0%, ${article.categoryColor}DD 100%)`,
                border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: isDark
                  ? `0 8px 24px ${article.categoryColor}20`
                  : `0 8px 24px ${article.categoryColor}15`,
              }}
            >
              <Person sx={{ fontSize: 28 }} />
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  mb: 0.25,
                }}
              >
                {article.author.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#64748B',
                    fontWeight: 500,
                  }}
                >
                  {article.publishedAt}
                </Typography>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.3)' : '#CBD5E1',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <AccessTime
                    sx={{
                      fontSize: 16,
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#64748B',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#64748B',
                      fontWeight: 500,
                    }}
                  >
                    {article.readTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <IconButton
              onClick={onShare}
              sx={{
                width: 44,
                height: 44,
                border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 0.8)',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(59, 130, 246, 0.08)',
                  borderColor: isDark ? '#60A5FA' : '#3B82F6',
                  color: isDark ? '#60A5FA' : '#3B82F6',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Share sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              sx={{
                width: 44,
                height: 44,
                border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 0.8)',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(59, 130, 246, 0.08)',
                  borderColor: isDark ? '#60A5FA' : '#3B82F6',
                  color: isDark ? '#60A5FA' : '#3B82F6',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <BookmarkBorder sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};