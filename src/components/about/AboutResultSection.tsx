import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Search, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import {
  getColor,
  withOpacity,
  getTextColor,
} from '../shared/themeConfig';

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

  // Color fixes for dark and light mode
  // Color tokens
  const surfaceBg = isDark
    ? 'rgba(30, 41, 59, 0.7)'
    : 'rgba(245, 249, 255, 0.98)';
  const cardBorder =
    isDark
      ? '1px solid rgba(148, 163, 184, 0.20)'
      : '1px solid rgba(96, 165, 250, 0.08)';
  const cardHoverBorder =
    isDark
      ? '1px solid rgba(148, 163, 184, 0.40)'
      : '1px solid rgba(59, 130, 246, 0.15)';
  const cardShadow =
    isDark
      ? '0 20px 60px rgba(59, 130, 246, 0.30)'
      : '0 8px 30px rgba(96, 165, 250, 0.12)';
  const cardText = getTextColor('primary', isDark);
  const secondaryText = getTextColor('secondary', isDark);
  const badgeText = '#FFF';
  const badgeBg =
    'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)';
  const featureTitle = getTextColor('primary', isDark);

  // Decorative background radiants
  const beforeRadial =
    isDark
      ? 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)';
  const afterRadial =
    isDark
      ? 'radial-gradient(circle, rgba(147,51,234,0.10) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)';

  // Features gradients unchanged (so they pop in both modes)
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
      data-section-theme={isDark ? "dark" : "light"}
      data-section-primary="#60A5FA"
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s cubic-bezier(.4,1.25,.3,1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: beforeRadial,
          animation: 'pulse 4s infinite',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: afterRadial,
          animation: 'pulse 5s infinite',
          animationDelay: '1s',
          zIndex: 0,
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
              color: cardText,
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s',
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
              background: badgeBg,
              borderRadius: '50px',
              px: 4,
              py: 2,
              boxShadow: isDark
                ? '0 20px 60px rgba(59, 130, 246, 0.4)'
                : '0 8px 30px rgba(59, 130, 246, 0.12)',
              // adaptive shadow
            }}
          >
            <Sparkles size={32} style={{ color: badgeText }} />
            <Typography
              sx={{
                fontSize: h2FontSize,
                fontWeight: 700,
                color: badgeText,
              }}
            >
              ChatAPC
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 3,
              fontSize: bodyLargeFontSize,
              color: secondaryText,
              transition: 'color 0.3s',
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
                    background: surfaceBg,
                    backdropFilter: isDark ? 'blur(10px)' : undefined,
                    border: cardBorder,
                    transition: 'all 0.3s cubic-bezier(.4,1.25,.3,1)',
                    boxShadow: isDark ? undefined : '0 2px 12px 0 rgba(0,0,0,.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: cardHoverBorder,
                      boxShadow: cardShadow,
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
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    }}
                  >
                    <Icon size={28} style={{ color: '#FFF' }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: h4FontSize,
                      fontWeight: 700,
                      color: featureTitle,
                      mb: 2,
                      transition: 'color 0.3s',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: bodyFontSize,
                      color: secondaryText,
                      lineHeight: 1.7,
                      transition: 'color 0.3s',
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
            color: secondaryText,
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 900,
            mx: 'auto',
            transition: 'color 0.3s',
          }}
        >
          It works just like having a seasoned APC engineer sitting beside you — available 24/7, with instant access to all your process data and the wisdom to
          interpret it meaningfully.
        </Typography>
      </Container>
    </Box>
  );
};
