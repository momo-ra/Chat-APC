import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { PlayArrow, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import AIAnimation from '../../assets/AI animation.gif';
import { useThemeMode } from '../../contexts/ThemeContext';

// Mock responsive hook for demo
const useResponsiveLayout = () => ({
  containerMaxWidth: { xs: '1200px', sm: '1200px', md: '950px', lg: '950px', xl: '1200px' },
  containerPadding: { xs: 2, sm: 2, md: 2.5, lg: 2.5, xl: 3 },
  h1FontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
  bodyLargeFontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
});

export function AgentsHeroSection() {
  const { isDark, toggleTheme } = useThemeMode();
  const { containerMaxWidth, containerPadding, h1FontSize, bodyLargeFontSize } = useResponsiveLayout();

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate title
      if (titleRef.current) {
        tl.from(titleRef.current.children, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          stagger: 0.15,
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.6'
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            stagger: 0.15,
          },
          '-=0.4'
        );
      }
      // No svg/node animations anymore
    }, heroRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.5s ease',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.03 : 0.02,
          backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />


      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 8, md: 12 },
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <Box>
            {/* Title */}
            <Box
              ref={titleRef}
              sx={{
                mb: 5,
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: h1FontSize,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  mb: 2,
                }}
              >
                <Box component="span" sx={{ display: 'block' }}>
                  Make AI agents
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: isDark
                      ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                      : 'linear-gradient(135deg, #171B83 0%, #009BE4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  your unfair advantage
                </Box>
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              ref={subtitleRef}
              sx={{
                fontSize: bodyLargeFontSize,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                lineHeight: 1.7,
                mb: 6,
                maxWidth: '520px',
              }}
            >
              With ChatAPC, you can build AI agents that analyze, detect, and optimize your industrial processes more effectively.
            </Typography>

            {/* CTA Buttons */}
            {/* <Box
              ref={ctaRef}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #0080C0 100%)'
                    : 'linear-gradient(135deg, #171B83 0%, #009BE4 100%)',
                  color: 'white',
                  px: 5,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 155, 228, 0.3)'
                    : '0 8px 32px rgba(23, 27, 131, 0.25)',
                  transition: 'all 0.3s ease',

                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 12px 48px rgba(0, 155, 228, 0.4)'
                      : '0 12px 48px rgba(23, 27, 131, 0.35)',
                  },
                }}
              >
                Start building
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<School />}
                sx={{
                  borderColor: isDark ? 'rgba(0, 155, 228, 0.5)' : '#171B83',
                  color: isDark ? '#009BE4' : '#171B83',
                  px: 5,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderWidth: 2,
                  transition: 'all 0.3s ease',

                  '&:hover': {
                    borderWidth: 2,
                    borderColor: isDark ? '#009BE4' : '#171B83',
                    background: isDark ? 'rgba(0, 155, 228, 0.05)' : 'rgba(23, 27, 131, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Contact sales
              </Button>
            </Box> */}
          </Box>

          {/* Right Graphic - Animation GIF */}
          {/* Show on all views. On mobile, center and size smaller */}
          <Box
            ref={graphicRef}
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '260px', sm: '340px', md: '500px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: { xs: 6, md: 0 },
              mb: { xs: 2, md: 0 },
              // Order 2 on mobile so it shows after content
              order: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: '220px', sm: '320px', md: '370px', lg: '500px' },
                height: { xs: '220px', sm: '320px', md: '370px', lg: '520px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '24px',
                overflow: 'hidden'
              }}
            >
              <img
                src={AIAnimation}
                alt="AI animation"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                draggable={false}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}