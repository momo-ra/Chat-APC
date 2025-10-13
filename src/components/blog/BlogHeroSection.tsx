import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, InputBase, IconButton } from '@mui/material';
import { Search, TrendingUp, Psychology, Settings } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animate content elements
      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0);
      }

      // Animate search box
      if (searchRef.current) {
        tl.from(searchRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.4);
      }

      // Animate stats
      if (statsRef.current) {
        tl.from(statsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        }, 0.6);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const blogStats = [
    { icon: TrendingUp, count: '150+', label: 'Articles' },
    { icon: Psychology, count: '25K+', label: 'Readers' },
    { icon: Settings, count: '500+', label: 'Industry Tips' },
  ];

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(4rem, 10vw, 8rem)',
        position: 'relative',
        background: isDark
          ? 'linear-gradient(135deg, rgba(10, 14, 46, 1) 0%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
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

          {/* Stats */}
          <Box
            ref={statsRef}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: { xs: 4, md: 8 },
            }}
          >
            {blogStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 24,
                        color: isDark ? '#009BE4' : '#2563EB',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {stat.count}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogHeroSection;