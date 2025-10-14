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
      const tl = gsap.timeline();

      // Hero content entrance
      if (heroContentRef.current) {
        tl.from(heroContentRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Title animation
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.2);
      }

      // Subtitle badge animation
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, 0.4);
      }

      // Description fade in
      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: 'power2.out',
        }, 0.6);
      }

      // Continuous floating animations
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        gsap.to(element, {
          y: -15,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.3,
        });
      });
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
        // TRANSPARENT - let page background show through
        background: 'transparent',
        minHeight: 'clamp(70vh, 90vh, 95vh)',
        display: 'flex',
        alignItems: 'center',
        // No margins or borders
        margin: 0,
        border: 'none',
      }}
    >
      {/* Subtle Floating Background Elements */}
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: { xs: 120, md: 200 },
          height: { xs: 120, md: 200 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(100, 116, 139, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(148, 163, 184, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: { xs: 100, md: 160 },
          height: { xs: 100, md: 160 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(71, 85, 105, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(100, 116, 139, 0.08) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
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
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              px: 3,
              py: 1.5,
              borderRadius: '50px',
              background: isDark
                ? 'rgba(51, 65, 85, 0.4)'
                : 'rgba(241, 245, 249, 0.8)',
              border: isDark
                ? '1px solid rgba(71, 85, 105, 0.3)'
                : '1px solid rgba(203, 213, 225, 0.4)',
              mb: 4,
              backdropFilter: 'blur(20px)',
            }}
          >
            <Timeline sx={{ 
              color: isDark ? '#94a3b8' : '#475569', 
              fontSize: 18 
            }} />
            <Typography
              variant="body2"
              sx={{
                color: isDark ? '#94a3b8' : '#475569',
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
              color: isDark ? '#f1f5f9' : '#1e293b',
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
                borderRadius: '50px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(51, 65, 85, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)'
                  : 'linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
                border: isDark
                  ? '1px solid rgba(71, 85, 105, 0.4)'
                  : '1px solid rgba(203, 213, 225, 0.3)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 8px 30px rgba(0, 0, 0, 0.4)'
                    : '0 8px 30px rgba(148, 163, 184, 0.15)',
                },
              }}
            >
              <Rocket sx={{ 
                color: isDark ? '#64748b' : '#64748b', 
                fontSize: 22 
              }} />
              <Typography
                variant="h4"
                sx={{
                  fontSize: h4FontSize,
                  fontWeight: 700,
                  color: isDark ? '#e2e8f0' : '#334155',
                  transition: 'color 0.3s ease',
                }}
              >
                Building the Future, Step by Step
              </Typography>
              <AutoAwesome sx={{ 
                color: isDark ? '#64748b' : '#64748b', 
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
              color: isDark ? '#94a3b8' : '#64748b',
              lineHeight: 1.7,
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