import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { PlayArrow, Visibility, Fullscreen } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyScaleUp, applyFloatingAnimation, createAnimationTimeline } from '../shared/animationHelpers';

gsap.registerPlugin(ScrollTrigger);

export const DemoVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDemoStarted, setIsDemoStarted] = useState(false);

  const {
    h2FontSize,
    bodyLargeFontSize,
    containerMaxWidth,
    containerPadding,
  } = useResponsiveLayout();

  // Handle Fullscreen
  // We must listen for fullscreenchange to keep state in sync, because :fullscreen state and react state can diverge
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      // Don't setIsFullscreen(!isFullscreen) here because we listen and update via fullscreenchange
    }
  }, [isFullscreen]);

  // Handle demo start
  const handleStartDemo = () => {
    setIsDemoStarted(true);
  };

  useEffect(() => {
    // Load Storylane script
    const script = document.createElement('script');
    script.src = 'https://js.storylane.io/js/v2/storylane.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for the demo container when not started
      if (demoRef.current && !isDemoStarted) {
        applyFloatingAnimation(demoRef.current, {
          distance: 10,
          duration: 3,
        });
      }

      // Section entrance animation
      createAnimationTimeline(sectionRef.current);

      const headerElement = sectionRef.current?.querySelector('.section-header') as HTMLElement;
      const demoElement = sectionRef.current?.querySelector('.demo-container') as HTMLElement;

      if (headerElement) {
        applySlideUp(headerElement, { startTrigger: 'top 80%' });
      }

      if (demoElement) {
        applyScaleUp(demoElement, {
          delay: 0.3,
          startTrigger: 'top 80%'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDemoStarted]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: { xs: 6, sm: 8, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
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
                Interactive Demo
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
              Experience ChatAPC Live
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
              Try our interactive demo to see how ChatAPC instantly answers the questions engineers ask every day. Explore process constraints, shift events, and profit opportunities.
            </Typography>
          </Box>

          {/* Interactive Demo Container */}
          <Box
            ref={demoRef}
            className="demo-container"
            sx={{
              position: 'relative',
              maxWidth: 1000,
              mx: 'auto',
              perspective: '1000px',
            }}
          >
            <Box
              ref={containerRef}
              sx={{
                position: 'relative',
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isDark
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: isDemoStarted ? 'none' : 'translateY(-8px)',
                  boxShadow: isDark
                    ? '0 35px 70px -12px rgba(0, 155, 228, 0.3)'
                    : '0 35px 70px -12px rgba(59, 130, 246, 0.3)',
                },
              }}
            >
              {/* Storylane Embed Container */}
              <Box
                className="sl-embed"
                sx={{
                  position: 'relative',
                  paddingBottom: 'calc(71.08% + 25px)',
                  width: '100%',
                  height: 0,
                  transform: 'scale(1)',
                  background: isDark ? '#0a0e2e' : '#f8fafc',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  loading="lazy"
                  className="sl-demo"
                  src="https://chatapc.storylane.io/demo/n2q3pvcx5mtt?embed=inline"
                  name="sl-embed"
                  allow="fullscreen"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: isDark
                      ? '1px solid rgba(0, 155, 228, 0.35)'
                      : '1px solid rgba(63, 95, 172, 0.35)',
                    boxShadow: '0px 0px 18px rgba(26, 19, 72, 0.15)',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                  onLoad={() => setIsDemoStarted(true)}
                />
              </Box>

              {/* Overlay for initial state */}
              {!isDemoStarted && (
                <Box
                  onClick={handleStartDemo}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isDark
                      ? 'linear-gradient(rgba(10, 14, 46, 0.8), rgba(10, 14, 46, 0.4))'
                      : 'linear-gradient(rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.4))',
                    cursor: 'pointer',
                    zIndex: 10,
                    borderRadius: '10px',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <IconButton
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        background: isDark
                          ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                          : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                      },
                    }}
                  >
                    <PlayArrow sx={{
                      fontSize: { xs: 32, md: 40 },
                      color: 'white',
                      ml: 1,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }} />
                  </IconButton>

                  <Typography
                    sx={{
                      position: 'absolute',
                      bottom: 30,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                      background: isDark
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.9)',
                      px: 3,
                      py: 1,
                      borderRadius: '50px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    Click to Start Interactive Demo
                  </Typography>
                </Box>
              )}

              {/* Fullscreen Button */}
              {isDemoStarted && (
                <IconButton
                  onClick={handleFullscreen}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 20,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.8)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Fullscreen />
                </IconButton>
              )}

              {/* Demo Label */}
              {isDemoStarted && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    px: 3,
                    py: 1,
                    borderRadius: '50px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 15,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    Try It Yourself
                  </Typography>
                </Box>
              )}
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