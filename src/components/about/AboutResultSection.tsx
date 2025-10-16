import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Search, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutResultSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    sectionPadding, 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize, 
    h4FontSize, 
    bodyFontSize, 
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const features = [
    {
      icon: Search,
      title: "Detects Issues",
      description: "Identifies problems before they impact operations, using advanced pattern recognition and process knowledge",
      gradient: 'linear-gradient(135deg, #EF4444, #F97316)',
    },
    {
      icon: MessageCircle,
      title: "Explains Behavior",
      description: "Translates complex process dynamics into clear, actionable explanations that operators can immediately understand",
      gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    },
    {
      icon: TrendingUp,
      title: "Unlocks Margin",
      description: "Reveals hidden optimization opportunities that increase efficiency and profitability across operations",
      gradient: 'linear-gradient(135deg, #10B981, #059669)',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (headerRef.current) {
        tl.from(headerRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        }, 0);
      }

      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, 0.2);
      }

      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }, 0.4);
      }

      if (footerRef.current) {
        tl.from(footerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.8);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme="dark"
      data-section-primary="#60A5FA"
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          animation: 'pulse 4s infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          animation: 'pulse 5s infinite',
          animationDelay: '1s',
        },
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box 
          ref={headerRef}
          sx={{ 
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#60A5FA',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 2,
            }}
          >
            Chapter 04
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            The Result
          </Typography>
        </Box>

        {/* ChatAPC Badge */}
        <Box
          ref={badgeRef}
          sx={{
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
              borderRadius: '50px',
              px: 4,
              py: 2,
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4)',
            }}
          >
            <Sparkles size={32} style={{ color: '#FFFFFF' }} />
            <Typography
              sx={{
                fontSize: h2FontSize,
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              ChatAPC
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 3,
              fontSize: bodyLargeFontSize,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            An AI advisor built from the ground up to speak the language of operations.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid 
          container 
          spacing={{ xs: 4, md: 6 }}
          sx={{
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 4, md: 5 },
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 4,
                    },
                    borderRadius: '16px',
                    background: 'rgba(30, 41, 59, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    }}
                  >
                    <Icon size={28} style={{ color: '#FFFFFF' }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: h4FontSize,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: bodyFontSize,
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Footer Text */}
        <Typography
          ref={footerRef}
          sx={{
            fontSize: bodyLargeFontSize,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          It works just like having a seasoned APC engineer sitting beside you — available 24/7, with instant access to all your process data and the wisdom to
          interpret it meaningfully.
        </Typography>
      </Container>
    </Box>
  );
};
