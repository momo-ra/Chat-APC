import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { PlayArrow, Visibility, ArrowDownward } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding, 
    h1FontSize,
    bodyLargeFontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content entrance animation
      const tl = gsap.timeline();
      
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: 'power3.out',
        }, 0.2);
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power2.out',
        }, 0.6);
      }

      if (buttonsRef.current) {
        tl.from(buttonsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        }, 1);
      }

      if (scrollIndicatorRef.current) {
        tl.from(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
        }, 1.5);

        // Continuous bounce animation
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 2,
        });
      }

      // Advanced floating animations for background elements
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        // Create complex motion paths
        gsap.to(element, {
          rotation: 360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: 'none',
        });

        gsap.to(element, {
          x: 30,
          y: -20,
          duration: 6 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.5,
        });
      });

      // Parallax effect on scroll
      gsap.to('.hero-bg-element', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProcess = () => {
    const processSection = document.getElementById('process-section');
    processSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: sectionPadding,
        background: 'transparent',
        minHeight: { xs: '90vh', md: '95vh' },
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Enhanced Background Elements */}
      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: { xs: 300, md: 400 },
          height: { xs: 300, md: 400 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          top: '40%',
          left: '8%',
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        className="floating-element hero-bg-element"
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: { xs: 150, md: 250 },
          height: { xs: 150, md: 250 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Geometric Accent Lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 2,
          height: 120,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
          transform: 'rotate(15deg)',
          opacity: 0.6,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          width: 2,
          height: 100,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.4) 50%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)',
          transform: 'rotate(-20deg)',
          opacity: 0.5,
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box
          ref={heroContentRef}
          sx={{ 
            textAlign: 'center', 
            maxWidth: { xs: '100%', md: 900 }, 
            mx: 'auto',
          }}
        >
          {/* Enhanced Title with Better Typography */}
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: 'clamp(2.5rem, 8vw, 3.5rem)',
                md: 'clamp(3.5rem, 6vw, 5rem)',
              },
              fontWeight: 800,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 4,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              position: 'relative',
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 25%, #A78BFA 50%, #F472B6 75%, #FFFFFF 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #1E40AF 25%, #7C3AED 50%, #DC2626 75%, #0F172A 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 8s ease-in-out infinite',
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                background: isDark
                  ? 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)'
                  : 'linear-gradient(90deg, #1E40AF 0%, #7C3AED 100%)',
                borderRadius: 2,
              },
            }}
          >
            From Question to Answer
          </Typography>

          {/* Enhanced Subtitle */}
          <Typography
            ref={subtitleRef}
            variant="body1"
            sx={{
              fontSize: {
                xs: 'clamp(1.1rem, 3vw, 1.25rem)',
                md: 'clamp(1.25rem, 2vw, 1.5rem)',
              },
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(71, 85, 105, 0.9)',
              lineHeight: 1.7,
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              fontWeight: 400,
              textShadow: isDark ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
            }}
          >
            Experience the power of natural-language AI combined with specialized industrial agents 
            and intelligent process knowledge mapping. Here's exactly how ChatAPC transforms 
            your questions into actionable insights.
          </Typography>

          {/* Enhanced Action Buttons */}
          <Box 
            ref={buttonsRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              justifyContent: 'center',
              alignItems: 'center',
              mb: 8,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Visibility />}
              onClick={handleScrollToProcess}
              sx={{
                px: 6,
                py: 3,
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 700,
                background: isDark
                  ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: isDark
                  ? '0 8px 32px rgba(59, 130, 246, 0.4)'
                  : '0 8px 32px rgba(30, 64, 175, 0.3)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: -100,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(59, 130, 246, 0.5)'
                    : '0 12px 40px rgba(30, 64, 175, 0.4)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
              }}
            >
              See How It Works
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 6,
                py: 3,
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderColor: isDark 
                  ? 'rgba(255, 255, 255, 0.25)' 
                  : 'rgba(59, 130, 246, 0.4)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(59, 130, 246, 1)',
                borderRadius: '50px',
                borderWidth: 2,
                textTransform: 'none',
                backdropFilter: 'blur(10px)',
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: isDark 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(59, 130, 246, 0.6)',
                  background: isDark 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 8px 25px rgba(255, 255, 255, 0.1)'
                    : '0 8px 25px rgba(59, 130, 246, 0.2)',
                },
              }}
            >
              Try Interactive Demo
            </Button>
          </Box>

          {/* Scroll Indicator */}
          <Box
            ref={scrollIndicatorRef}
            onClick={handleScrollToProcess}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.875rem',
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.7)',
                mb: 1,
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Explore Process
            </Typography>
            <ArrowDownward 
              sx={{ 
                fontSize: 24,
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.7)',
              }} 
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};