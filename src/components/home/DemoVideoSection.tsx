import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { PlayCircleOutline, ArrowForward, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { getGradient, themeConfig } from '../shared/themeConfig';
import DemoImage from "../../assets/Home.png"

gsap.registerPlugin(ScrollTrigger);

export const DemoVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isDark } = useThemeMode();
  const {
    h2FontSize,
    bodyLargeFontSize,
    containerMaxWidth,
    containerPadding,
    sectionPadding,
  } = useResponsiveLayout();
  const { gradients } = themeConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animate content
      if (contentRef.current) {
        tl.from(contentRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        }, 0);
      }

      // Animate CTA card
      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.9,
          ease: 'power3.out',
        }, 0.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = () => {
    navigate('/product/tour');
  };

  const mainTextColor = isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)';
  const secondaryTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)';
  const cardBackground = isDark
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.98) 100%)';
  const cardBorder = isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(148, 163, 184, 0.3)';

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        position: 'relative',
        overflow: 'hidden',
        background: "transparent",
        transition: 'background 0.3s ease',
        // Animated gradient orbs
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: "transparent",
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header Content */}
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: mainTextColor,
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            See ChatAPC in Action
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: secondaryTextColor,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              transition: 'color 0.3s ease',
            }}
          >
            Experience our interactive product tour and discover how ChatAPC transforms industrial process control
          </Typography>
        </Box>

        {/* CTA Card */}
        <Box
          ref={ctaRef}
          sx={{
            maxWidth: 900,
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              background: "transparent",
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Visual Preview Area */}
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '16 / 9',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(241, 245, 249, 0.8) 0%, rgba(226, 232, 240, 0.9) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderBottom: `1px solid ${cardBorder}`,
                // Animated gradient overlay
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: getGradient(gradients.blueToPurple, isDark),
                  opacity: 0.05,
                  transition: 'opacity 0.4s ease',
                  zIndex: 1,
                },
                '&:hover::before': {
                  opacity: 0.1,
                },
              }}
            >
              {/* New Visual Preview behind Play Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  backgroundColor: isDark
                    ? 'rgba(15,23,42,0.82)'
                    : 'rgba(241,245,249,0.93)',
                  // Add a gradient overlay for better play icon readability
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(30,41,59,0.45) 0%, rgba(99,102,241,0.08) 100%)'
                      : 'linear-gradient(135deg, rgba(165,180,252,0.08) 10%, rgba(255,255,255,0.26) 100%)',
                  }
                }}
              >
                <Box
                  component="img"
                  alt="Demo Video Preview"
                  src={DemoImage}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 0,
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
                {/* Slight overlay over the image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none',
                    // Very subtle overlay, adjusts for dark/light mode
                    background: isDark
                      ? 'rgba(20, 31, 57, 0.63)'
                      : 'rgba(100, 116, 139, 0.37)',
                  }}
                />
              </Box>
              {/* Play Icon on top of the visual preview */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  userSelect: 'none',
                  pointerEvents: 'auto', // changed from 'none' to 'auto' to make the group interactive
                }}
              >
                <Box
                  role="button"
                  aria-label="Play Interactive Product Tour"
                  tabIndex={0}
                  onClick={handleNavigate}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavigate();
                    }
                  }}
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: '50%',
                    background: getGradient(gradients.blueToPurple, isDark),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isDark
                      ? '0 20px 50px rgba(99, 102, 241, 0.4)'
                      : '0 20px 50px rgba(59, 130, 246, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    outline: 'none',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                    '&:focus': {
                      boxShadow: `${isDark
                        ? '0 0 0 3px rgba(99, 102, 241, 0.8)'
                        : '0 0 0 3px rgba(37, 99, 235, 0.5)'}`
                    },
                    '@keyframes pulse': {
                      '0%, 100%': {
                        boxShadow: isDark
                          ? '0 20px 50px rgba(99, 102, 241, 0.4)'
                          : '0 20px 50px rgba(59, 130, 246, 0.3)',
                      },
                      '50%': {
                        boxShadow: isDark
                          ? '0 20px 60px rgba(99, 102, 241, 0.6), 0 0 0 20px rgba(99, 102, 241, 0.1)'
                          : '0 20px 60px rgba(59, 130, 246, 0.4), 0 0 0 20px rgba(59, 130, 246, 0.05)',
                      },
                    },
                  }}
                >
                  <PlayCircleOutline
                    sx={{
                      fontSize: { xs: 48, md: 56 },
                      color: '#FFFFFF',
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: mainTextColor,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    transition: 'color 0.3s ease',
                    mt: 1
                  }}
                >
                  Interactive Product Tour
                </Typography>
              </Box>
              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '10%',
                  left: '5%',
                  width: 200,
                  height: 200,
                  background: "transparent",
                  // filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '15%',
                  right: '8%',
                  width: 180,
                  height: 180,
                  background: "transparent",
                  // filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
            </Box>

            {/* Content Area */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: secondaryTextColor,
                  mb: 3,
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                Walk through a live demo of ChatAPC and see how it helps process engineers analyze constraints,
                optimize operations, and make data-driven decisions
              </Typography>

              {/* CTA Buttons */}
              <Box
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
                  endIcon={<ArrowForward />}
                  onClick={handleNavigate}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '10px',
                    letterSpacing: '0.3px',
                    background: getGradient(gradients.blueToPurple, isDark),
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Launch Interactive Tour
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Visibility />}
                  onClick={() => navigate('/demo')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '10px',
                    borderWidth: '1.5px',
                    borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(37, 99, 235, 0.5)',
                    color: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(37, 99, 235, 1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Preview Demo
                </Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoVideoSection;