import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, InputBase, IconButton } from '@mui/material';
import { Search, TrendingUp, Psychology, Settings } from '@mui/icons-material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyScaleUp, applyStaggerAnimation } from '../shared/animationHelpers';

const BlogHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h1FontSize, 
    bodyLargeFontSize,
    heroMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content elements with unified system
      if (contentRef.current) {
        const children = Array.from(contentRef.current.children) as HTMLElement[];
        applyStaggerAnimation(children, 'slideUp', {
          staggerDelay: 0.2,
          startTrigger: 'top 80%',
          triggerElement: sectionRef.current,
        });
      }

      // Animate search box
      applyScaleUp(searchRef.current, {
        delay: 0.4,
        startTrigger: 'top 80%',
      });

      // Animate stats
      if (statsRef.current) {
        const statsChildren = Array.from(statsRef.current.children) as HTMLElement[];
        applyStaggerAnimation(statsChildren, 'slideUp', {
          staggerDelay: 0.15,
          startTrigger: 'top 80%',
          triggerElement: sectionRef.current,
          customProps: { delay: 0.6 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(4rem, 10vw, 4rem)',
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: heroMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 50%, #A855F7 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.2,
              transition: 'all 0.3s ease',
            }}
          >
            Industrial AI Insights
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h2"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
              fontWeight: 400,
              transition: 'color 0.3s ease',
            }}
          >
            Explore the latest trends in process control, AI optimization, and industrial automation. 
            Get expert insights to transform your operations.
          </Typography>

          {/* Search Box */}
          <Box
            ref={searchRef}
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              mb: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 1)',
                borderRadius: '12px',
                p: 1,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                boxShadow: isDark
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  borderColor: isDark ? '#009BE4' : '#2563EB',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 155, 228, 0.2)'
                    : '0 12px 40px rgba(37, 99, 235, 0.15)',
                },
                '&:focus-within': {
                  borderColor: isDark ? '#009BE4' : '#2563EB',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 155, 228, 0.25)'
                    : '0 12px 40px rgba(37, 99, 235, 0.2)',
                },
              }}
            >
              <InputBase
                placeholder="Search articles, topics, or keywords..."
                sx={{
                  flex: 1,
                  px: 3,
                  py: 1.5,
                  fontSize: '1.1rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                  '&::placeholder': {
                    color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 116, 139, 1)',
                    opacity: 1,
                  },
                }}
              />
              <IconButton
                sx={{
                  p: 1.5,
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #0EA5E9 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  color: 'white',
                  '&:hover': {
                    background: isDark
                      ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)'
                      : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Search sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogHeroSection;