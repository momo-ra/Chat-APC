import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { MessageSquare, AlertCircle, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutGapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    sectionPadding, 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize, 
    bodyFontSize, 
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const questions = [
    {
      icon: TrendingUp,
      question: "Why can't the feed go higher?",
      color: isDark ? '#009BE4' : '#2563EB',
      gradient: isDark
        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1), rgba(6, 182, 212, 0.1))'
        : 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(6, 182, 212, 0.05))',
    },
    {
      icon: AlertCircle,
      question: "Why is the controller off?",
      color: isDark ? '#A855F7' : '#8B5CF6',
      gradient: isDark
        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))'
        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))',
    },
    {
      icon: MessageSquare,
      question: "What changed last shift?",
      color: isDark ? '#F97316' : '#EF4444',
      gradient: isDark
        ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))'
        : 'linear-gradient(135deg, rgba(249, 115, 22, 0.05), rgba(239, 68, 68, 0.05))',
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

      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, 0.3);
      }

      if (bottomTextRef.current) {
        tl.from(bottomTextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.6);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: sectionPadding,
        background: isDark
          ? 'linear-gradient(180deg, #0d1842 0%, #0a0e2e 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
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
              color: isDark ? '#009BE4' : '#2563EB',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Chapter 02
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            The Gap We Saw
          </Typography>
        </Box>

        {/* Main Description */}
        <Typography
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: 1000,
            mx: 'auto',
            mb: { xs: 6, md: 8 },
            transition: 'color 0.3s ease',
          }}
        >
          Advanced Process Control and optimization tools were powerful, but they weren't always easy to use. The technology existed, but the bridge
          between complex data and actionable insights was missing.
        </Typography>

        {/* Questions Grid */}
        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }}
          sx={{
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          {questions.map((item, index) => {
            const Icon = item.icon;
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
                    position: 'relative',
                    height: '100%',
                    p: { xs: 3, md: 4 },
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 3,
                    },
                    borderRadius: '16px',
                    background: isDark ? '#1e293b' : '#FFFFFF',
                    border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    boxShadow: isDark
                      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 20px 50px rgba(0, 155, 228, 0.2)'
                        : '0 20px 50px rgba(37, 99, 235, 0.15)',
                      border: `1px solid ${item.color}40`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      background: item.gradient,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: `0 8px 20px ${item.color}40`,
                    }}
                  >
                    <Icon size={24} style={{ color: '#FFFFFF' }} />
                  </Box>

                  {/* Question */}
                  <Typography
                    sx={{
                      position: 'relative',
                      fontSize: bodyLargeFontSize,
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                      lineHeight: 1.4,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    "{item.question}"
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom Text */}
        <Box
          ref={bottomTextRef}
          sx={{
            maxWidth: 1000,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              borderRadius: '16px',
              p: { xs: 4, md: 6 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 5,
              },
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.08), rgba(99, 102, 241, 0.08))'
                : 'linear-gradient(135deg, rgba(239, 246, 255, 1), rgba(238, 242, 255, 1))',
              border: isDark
                ? '1px solid rgba(0, 155, 228, 0.2)'
                : '1px solid rgba(191, 219, 254, 1)',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              sx={{
                fontSize: bodyLargeFontSize,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                lineHeight: 1.7,
                textAlign: 'center',
                transition: 'color 0.3s ease',
              }}
            >
              We heard these questions countless times from experienced operators who knew their processes inside and out. The answers were always there —
              buried in data, trends, and reports — but never clear or immediate. Operators shouldn't have to dig through layers of information to understand what's
              happening in their own plant.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
