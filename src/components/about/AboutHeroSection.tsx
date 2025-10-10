import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { h1FontSize, bodyLargeFontSize, heroMaxWidth, containerMaxWidth } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hero content animation
      if (heroContentRef.current) {
        gsap.from(heroContentRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Badge animation
      if (badgeRef.current) {
        gsap.from(badgeRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      }

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      }

      // Description animation
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
        });
      }

      // Decorative line animation
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          duration: 1,
          delay: 0.6,
          ease: 'power2.out',
        });
      }

      // Floating circles animations (optimized for performance)
      const circle1 = sectionRef.current?.querySelector('.floating-circle-1');
      const circle2 = sectionRef.current?.querySelector('.floating-circle-2');

      if (circle1) {
        gsap.to(circle1, {
          scale: 1.2,
          opacity: 0.5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      if (circle2) {
        gsap.to(circle2, {
          scale: 1.3,
          opacity: 0.5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 'clamp(2.5rem, 12vh, 5rem)',
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(79, 70, 229, 0.08) 35%, rgba(124, 58, 237, 0.06) 100%)'
          : 'linear-gradient(135deg, rgba(239, 246, 255, 1) 0%, rgba(238, 242, 255, 1) 35%, rgba(250, 245, 255, 1) 100%)',
        transition: 'background 0.3s ease',
        minHeight: 'clamp(70vh, 85vh, 90vh)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Animated background circles */}
      <Box
        className="floating-circle-1"
        sx={{
          position: 'absolute',
          top: { xs: '10%', md: '15%' },
          left: { xs: '-10%', md: '5%' },
          width: { xs: 200, md: 288 },
          height: { xs: 200, md: 288 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(191, 219, 254, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.3,
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
      />
      
      <Box
        className="floating-circle-2"
        sx={{
          position: 'absolute',
          bottom: { xs: '10%', md: '15%' },
          right: { xs: '-10%', md: '5%' },
          width: { xs: 240, md: 384 },
          height: { xs: 240, md: 384 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.3,
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: containerMaxWidth,
          px: 'clamp(0.5rem, 2vw, 0.75rem)',
        }}
      >
        <Box
          ref={heroContentRef}
          sx={{
            maxWidth: heroMaxWidth,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <Box ref={badgeRef} sx={{ mb: 3 }}>
            <Chip
              icon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isDark ? '#009BE4' : '#2563EB',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                />
              }
              label="From Control Rooms to AI"
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                backgroundColor: isDark
                  ? 'rgba(0, 155, 228, 0.15)'
                  : 'rgba(219, 234, 254, 1)',
                color: isDark ? '#009BE4' : '#1d4ed8',
                border: isDark
                  ? '1px solid rgba(0, 155, 228, 0.2)'
                  : '1px solid rgba(191, 219, 254, 1)',
                transition: 'all 0.3s ease',
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />
          </Box>

          {/* Main Title */}
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease',
            }}
          >
            Our Story
          </Typography>

          {/* Description */}
          <Typography
            ref={descriptionRef}
            variant="body1"
            component="p"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
              lineHeight: 1.6,
              maxWidth: 768,
              mx: 'auto',
              mb: 6,
              transition: 'color 0.3s ease',
            }}
          >
            From the foundational grit of traditional process control to the cutting-edge
            intelligence of AI assistance, discover how decades of unparalleled hands-on
            experience are forging the future of industrial operations.
          </Typography>

          {/* Decorative line */}
          <Box
            ref={lineRef}
            sx={{
              height: 4,
              width: 128,
              mx: 'auto',
              borderRadius: 2,
              background: isDark
                ? 'linear-gradient(90deg, #009BE4 0%, #6B5CE7 50%, #A855F7 100%)'
                : 'linear-gradient(90deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
              transformOrigin: 'left',
              transition: 'background 0.3s ease',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};