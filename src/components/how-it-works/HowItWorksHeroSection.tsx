import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { PlayArrow, Visibility } from '@mui/icons-material';
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

      // Title animation with gradient effect
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
          y: 20,
          duration: 0.6,
          delay: 0.5,
          ease: 'power2.out',
        });
      }

      // Buttons animation
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }

      // Floating animations for background elements
      const floatingElements = sectionRef.current?.querySelectorAll('.floating-element');
      floatingElements?.forEach((element, index) => {
        gsap.to(element, {
          y: -15,
          duration: 4 + index,
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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: sectionPadding,
        background: 'transparent',
        transition: 'background 0.3s ease',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: { xs: 120, md: 200 },
          height: { xs: 120, md: 200 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          animation: 'pulse 6s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.4 },
            '50%': { opacity: 0.8 },
          },
        }}
      />

      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: { xs: 100, md: 180 },
          height: { xs: 100, md: 180 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      <Box
        className="floating-element"
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: { xs: 80, md: 150 },
          height: { xs: 80, md: 150 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          animation: 'pulse 7s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          ref={heroContentRef}
          sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}
        >
          <Typography
            ref={titleRef}
            variant="h1"
            component="h1"
            sx={{
              fontSize: h1FontSize,
              fontWeight: 800,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 30%, #A855F7 70%, #FFFFFF 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 30%, #8B5CF6 70%, #1E293B 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ChatAPC: From Question to Answer
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
              lineHeight: 1.7,
              maxWidth: 700,
              mx: 'auto',
              mb: 5,
            }}
          >
            ChatAPC combines natural-language AI with specialized agents and
            process knowledge mapping. Here's exactly how it works every time you
            interact with it.
          </Typography>

          <Box 
            ref={buttonsRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Visibility />}
              onClick={() => {
                const processSection = document.getElementById('process-section');
                processSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #A855F7 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                borderRadius: 3,
              }}
            >
              See the Process
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(59, 130, 246, 0.5)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(59, 130, 246, 1)',
                borderRadius: 3,
              }}
            >
              Try Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};