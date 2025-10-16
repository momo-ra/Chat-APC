import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { PlayArrow, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AgentsHeroSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    h1FontSize,
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.3);
      }

      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.5);
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }, 0.8);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Main Title */}
        <Typography
          ref={titleRef}
          variant="h1"
          sx={{
            fontSize: h1FontSize,
            fontWeight: 800,
            color: isDark ? '#FFFFFF' : '#0F172A',
            mb: 2,
            lineHeight: 1.1,
            background: isDark
              ? 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)'
              : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your ecosystem of digital colleagues
        </Typography>

        {/* Subtitle */}
        <Typography
          ref={subtitleRef}
          variant="h4"
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? '#A78BFA' : '#7C3AED',
            mb: 4,
            maxWidth: '900px',
            mx: 'auto',
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          ChatAPC is built around a team of agents — each focused on a specific part of operations. 
          They detect, explain, and advise.
        </Typography>

        {/* Main Description */}
        <Typography
          ref={descriptionRef}
          variant="h5"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.7,
            fontWeight: 500,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: isDark ? '#FFFFFF' : '#1E293B' }}>
            But more importantly: you can interact with them directly.
          </Box>
          <br /><br />
          Build your own plots, navigate the process map, ask "why," or review events — just like working side by side with a colleague.
        </Typography>

        {/* CTA Buttons */}
        <Box
          ref={ctaRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                background: isDark
                  ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
              },
            }}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<School />}
            sx={{
              borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(71, 85, 105, 0.3)',
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569',
              px: 4,
              py: 1.5,
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: 3,
              borderWidth: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: isDark ? '#A78BFA' : '#8B5CF6',
                color: isDark ? '#A78BFA' : '#8B5CF6',
                background: isDark ? 'rgba(167, 139, 250, 0.05)' : 'rgba(139, 92, 246, 0.05)',
                transform: 'translateY(-2px)',
                borderWidth: 2,
              },
            }}
          >
            Learn More
          </Button>
        </Box>

        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.08) 100%)',
            filter: 'blur(20px)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(29, 78, 216, 0.08) 100%)',
            filter: 'blur(15px)',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        {/* Keyframes */}
        <Box
          component="style"
          sx={{
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0px)',
              },
              '50%': {
                transform: 'translateY(-20px)',
              },
            },
          }}
        />
      </Container>
    </Box>
  );
};