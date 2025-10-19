import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Timeline, Rocket, AutoAwesome } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { getGradient, themeConfig } from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

export const RoadmapHeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const floatingElement1Ref = useRef<HTMLDivElement>(null);
  const floatingElement2Ref = useRef<HTMLDivElement>(null);

  const { isDark } = useThemeMode();
  const { gradients } = themeConfig;
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
      // Create timeline for hero sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Badge entrance
      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, 0);
      }

      // Title entrance
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.2);
      }

      // Subtitle badge entrance
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, 0.4);
      }

      // Description entrance
      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.6);
      }

      // Continuous floating animations for background elements
      if (floatingElement1Ref.current) {
        gsap.to(floatingElement1Ref.current, {
          y: 20,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      if (floatingElement2Ref.current) {
        gsap.to(floatingElement2Ref.current, {
          y: -20,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 0.5,
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
        position: 'relative',
        overflow: 'hidden',
        py: 'clamp(3rem, 8vw, 5rem)',
        background: 'transparent',
        minHeight: 'clamp(70vh, 90vh, 95vh)',
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        border: 'none',
      }}
    >
      {/* Subtle Floating Background Elements */}
      <Box
        ref={floatingElement1Ref}
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: { xs: 120, md: 200 },
          height: { xs: 120, md: 200 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(55, 65, 81, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(226, 232, 240, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <Box
        ref={floatingElement2Ref}
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: { xs: 100, md: 160 },
          height: { xs: 100, md: 160 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(55, 65, 81, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(226, 232, 240, 0.08) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          willChange: 'transform',
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
          {/* Timeline Badge */}
          <Box
            ref={badgeRef}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 1.5,
              borderRadius: '100px',
              background: isDark
                ? 'rgba(31, 41, 55, 0.8)'
                : 'rgba(255, 255, 255, 0.95)',
              border: isDark
                ? '1px solid rgba(55, 65, 81, 0.5)'
                : '1px solid rgba(226, 232, 240, 0.8)',
              mb: 4,
              backdropFilter: 'blur(20px)',
            }}
          >
            <Timeline sx={{ 
              color: isDark ? '#009BE4' : '#171B83',
              fontSize: 18 
            }} />
            <Typography
              variant="body2"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
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
              fontWeight: 700,
              background: getGradient(gradients.blueToPurple, isDark),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease',
            }}
          >
            Where ChatAPC is Going
          </Typography>

          {/* Interactive Subtitle Badge */}
          <Box ref={subtitleRef} sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                px: 4,
                py: 2,
                borderRadius: '100px',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: isDark
                  ? '1px solid rgba(55, 65, 81, 0.5)'
                  : '1px solid rgba(226, 232, 240, 0.8)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 20px 50px rgba(0, 155, 228, 0.2)'
                    : '0 20px 50px rgba(23, 27, 131, 0.15)',
                  borderColor: isDark ? '#009BE4' : '#171B83',
                },
              }}
            >
              <Rocket sx={{ 
                color: isDark ? '#009BE4' : '#171B83',
                fontSize: 22 
              }} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: h4FontSize,
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                  transition: 'color 0.3s ease',
                }}
              >
                Building the Future, Step by Step
              </Typography>
              <AutoAwesome sx={{ 
                color: isDark ? '#A855F7' : '#8B5CF6',
                fontSize: 22 
              }} />
            </Box>
          </Box>

          {/* Description */}
          <Typography
            ref={descriptionRef}
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: 650,
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