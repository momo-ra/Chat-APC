import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ExamplesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate video container with zoom and fade
      if (videoRef.current) {
        gsap.from(videoRef.current, {
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Unified Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-0.5deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>

      <Box
        ref={sectionRef}
        data-section-theme={isDark ? 'dark' : 'light'}
        data-section-primary={isDark ? '#009BE4' : '#2563EB'}
        sx={{
          width: '100%',
          py: { xs: 12, md: 16 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            py: 13,
          },
          '@media (min-width: 1550px)': {
            py: 16,
          },
          position: 'relative',
          zIndex: 2,
          transition: 'background 0.3s ease',
          // Secondary background pattern
          background: isDark 
            ? 'linear-gradient(180deg, rgba(13, 24, 66, 0.4) 0%, rgba(0, 155, 228, 0.06) 30%, rgba(10, 14, 46, 0.5) 70%, rgba(13, 24, 66, 0.4) 100%)'
            : 'linear-gradient(180deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.95) 30%, rgba(236, 241, 247, 0.9) 70%, rgba(248, 250, 252, 0.85) 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: isDark 
              ? 'radial-gradient(ellipse at center, rgba(0, 155, 228, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'pulse 4s ease-in-out infinite',
          },
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative', 
            zIndex: 1,
            px: { xs: 2, md: 3 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              maxWidth: '950px',
              px: 2.5,
            },
            '@media (min-width: 1550px)': {
              maxWidth: '1200px',
              px: 3,
            },
          }}
        >
          {/* Section Header */}
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 8, md: 8 },
            animation: 'fadeInUp 0.8s ease-out',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
            '@media (min-width: 1550px)': {
              mb: 8,
            },
          }}>
            <Typography
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                mb: 2,
                transition: 'color 0.3s ease',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: 1.2,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  fontSize: '2.6rem',
                },
                '@media (min-width: 1550px)': {
                  fontSize: '3rem',
                },
              }}
            >
              This is ChatAPC in action.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.8)',
                maxWidth: 800,
                mx: 'auto',
                transition: 'color 0.3s ease',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: 1.6,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  fontSize: '1.15rem',
                  maxWidth: 700,
                },
                '@media (min-width: 1550px)': {
                  fontSize: '1.25rem',
                  maxWidth: 800,
                },
              }}
            >
              Real conversation. Real plant data. Here's how ChatAPC helps engineers understand what's happening — in plain language.
            </Typography>
          </Box>

          {/* Video Demo Container */}
          <Box
            ref={videoRef}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 1200,
              mx: 'auto',
              mb: 10,
              borderRadius: '4px',
              overflow: 'hidden',
              border: isDark ? '1px solid rgba(0, 155, 228, 0.2)' : '1px solid rgba(37, 99, 235, 0.2)',
              boxShadow: isDark 
                ? '0 20px 60px rgba(0, 155, 228, 0.2)' 
                : '0 20px 60px rgba(37, 99, 235, 0.15)',
              backdropFilter: 'blur(10px)',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                maxWidth: 900,
                mb: 8,
              },
              '@media (min-width: 1550px)': {
                maxWidth: 1200,
                mb: 10,
              },
              // Responsive aspect ratio for video
              aspectRatio: '16 / 9',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(10, 14, 46, 0.3) 100%)'
                  : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(241, 245, 249, 0.3) 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              },
            }}
          >
            {/* Video Element */}
            <Box
              component="video"
              controls
              autoPlay={false}
              muted
              loop
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'relative',
                zIndex: 0,
              }}
            >
              {/* Add your video sources here */}
              <source src="/path/to/your/chatapc-demo.mp4" type="video/mp4" />
              <source src="/path/to/your/chatapc-demo.webm" type="video/webm" />
              
              {/* Fallback content */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(31, 41, 55, 1) 0%, rgba(17, 24, 39, 1) 100%)'
                    : 'linear-gradient(135deg, rgba(243, 244, 246, 1) 0%, rgba(229, 231, 235, 1) 100%)',
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                >
                  Your browser doesn't support video playback.
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                >
                  Please update your browser or contact support.
                </Typography>
              </Box>
            </Box>

            {/* Play button overlay (optional) */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  background: 'rgba(0, 0, 0, 0.8)',
                },
                // Hide on video interaction
                '.MuiBox-root:has(video:not([paused])) &': {
                  opacity: 0,
                  pointerEvents: 'none',
                },
              }}
            >
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: '20px solid white',
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  ml: 1,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ExamplesSection;