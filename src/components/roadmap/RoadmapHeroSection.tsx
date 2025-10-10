import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Timeline, Rocket, AutoAwesome } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const RoadmapHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h1FontSize, 
    h4FontSize, 
    bodyLargeFontSize, 
    heroMaxWidth,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animation
      if (heroContentRef.current) {
        gsap.from(heroContentRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
        });
      }

      // Title animation with split text effect
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: 0.5,
          ease: 'back.out(1.7)',
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.7,
          ease: 'power2.out',
        });
      }

      // Floating animations for background elements
      const circles = sectionRef.current?.querySelectorAll('.floating-element');
      circles?.forEach((circle, index) => {
        gsap.to(circle, {
          y: -20,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 'clamp(3rem, 10vh, 5rem)',
        background: isDark
          ? 'linear-gradient(135deg, rgba(17, 24, 39, 1) 0%, rgba(30, 58, 138, 0.3) 50%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(135deg, rgba(239, 246, 255, 1) 0%, rgba(238, 242, 255, 1) 50%, rgba(250, 245, 255, 1) 100%)',
        transition: 'background 0.3s ease',
        minHeight: 'clamp(70vh, 90vh, 95vh)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: { xs: 150, md: 250 },
          height: { xs: 150, md: 250 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
          },
        }}
      />

      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: { xs: 120, md: 200 },
          height: { xs: 120, md: 200 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          animation: 'pulse 5s ease-in-out infinite',
        }}
      />

      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: { xs: 100, md: 180 },
          height: { xs: 100, md: 180 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          filter: 'blur(25px)',
          pointerEvents: 'none',
          animation: 'pulse 6s ease-in-out infinite',
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          ref={heroContentRef}
          sx={{
            textAlign: 'center',
            maxWidth: heroMaxWidth,
            mx: 'auto',
          }}
        >
          {/* Icon Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              borderRadius: '50px',
              background: isDark
                ? 'rgba(0, 155, 228, 0.1)'
                : 'rgba(59, 130, 246, 0.1)',
              border: isDark
                ? '1px solid rgba(0, 155, 228, 0.2)'
                : '1px solid rgba(59, 130, 246, 0.2)',
              mb: 4,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Timeline sx={{ color: isDark ? '#009BE4' : '#2563EB', fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#009BE4' : '#2563EB',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Product Roadmap
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#1E293B',
              mb: 2,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textShadow: isDark 
                ? '0 2px 20px rgba(0, 155, 228, 0.3)'
                : '0 2px 20px rgba(37, 99, 235, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            Where ChatAPC is Going
          </Typography>

          {/* Subtitle */}
          <Box ref={subtitleRef} sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                px: 4,
                py: 2,
                borderRadius: '50px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Rocket sx={{ color: isDark ? '#009BE4' : '#2563EB', fontSize: 24 }} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: h4FontSize,
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                  transition: 'color 0.3s ease',
                }}
              >
                Building the Future, Step by Step
              </Typography>
              <AutoAwesome sx={{ color: isDark ? '#A855F7' : '#8B5CF6', fontSize: 24 }} />
            </Box>
          </Box>

          {/* Description */}
          <Typography
            ref={descriptionRef}
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
              lineHeight: 1.7,
              maxWidth: 700,
              mx: 'auto',
              transition: 'color 0.3s ease',
            }}
          >
            We're constantly expanding ChatAPC with new agents, connectors, and
            integrations to make your digital colleagues even more powerful and
            integrated into your daily operations.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};