import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { PlayArrow, Visibility } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const DemoVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the video container
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      // Section entrance animation
      if (sectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });

        tl.from(sectionRef.current.querySelector('.section-header'), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(sectionRef.current.querySelector('.video-container'), {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'back.out(1.7)',
        }, 0.3);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(2.5rem, 8vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(0, 155, 228, 0.035) 0%, #111827 40%, #111827 100%)'
          : 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.02) 0%, #FFFFFF 40%, #FFFFFF 100%)',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <Box className="section-header" sx={{ mb: 8 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1,
                borderRadius: '50px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: isDark
                  ? '1px solid rgba(0, 155, 228, 0.2)'
                  : '1px solid rgba(59, 130, 246, 0.2)',
                mb: 4,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Visibility sx={{ fontSize: 16, color: isDark ? '#009BE4' : '#3B82F6' }} />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isDark ? '#009BE4' : '#3B82F6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Live Demo
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: h2FontSize,
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 100%)'
                  : 'linear-gradient(135deg, #0F172A 0%, #3B82F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              ChatAPC in action
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: bodyLargeFontSize,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Instant answers to the questions engineers ask every day. Get clarity on process constraints, shift events, and profit opportunities.
            </Typography>
          </Box>

          {/* Video Container */}
          <Box
            ref={videoRef}
            className="video-container"
            sx={{
              position: 'relative',
              maxWidth: 800,
              mx: 'auto',
              perspective: '1000px',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '24px',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: isDark
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px) rotateX(2deg)',
                  boxShadow: isDark
                    ? '0 35px 70px -12px rgba(0, 155, 228, 0.3), 0 0 0 1px rgba(0, 155, 228, 0.2)'
                    : '0 35px 70px -12px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2)',
                  '& .play-button': {
                    transform: 'scale(1.1)',
                    background: isDark
                      ? 'linear-gradient(135deg, #009BE4 0%, #00D4AA 100%)'
                      : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    boxShadow: isDark
                      ? '0 20px 40px rgba(0, 155, 228, 0.4)'
                      : '0 20px 40px rgba(59, 130, 246, 0.4)',
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)',
                  borderRadius: '24px',
                  pointerEvents: 'none',
                },
              }}
            >
              {/* Play Button */}
              <IconButton
                className="play-button"
                sx={{
                  width: 80,
                  height: 80,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  boxShadow: isDark
                    ? '0 10px 30px rgba(0, 155, 228, 0.3)'
                    : '0 10px 30px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <PlayArrow sx={{ fontSize: 32, color: 'white', ml: 0.5 }} />
              </IconButton>

              {/* Demo Label */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  background: isDark
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 1)',
                  }}
                >
                  Interactive Demo
                </Typography>
              </Box>
            </Box>

            {/* Floating Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #00D4AA 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                opacity: 0.6,
                filter: 'blur(1px)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                  '50%': { transform: 'translateY(-20px) rotate(180deg)' },
                },
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)'
                  : 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                opacity: 0.4,
                filter: 'blur(2px)',
                animation: 'float 8s ease-in-out infinite reverse',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoVideoSection;