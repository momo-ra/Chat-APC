import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Lightbulb, Users, Code2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutTurningPointSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
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

  const teams = [
    {
      icon: Users,
      title: "Process Control Expertise",
      description: "Decades of hands-on experience in refineries, chemical plants, and energy facilities",
      gradient: isDark
        ? 'linear-gradient(135deg, #009BE4, #06B6D4)'
        : 'linear-gradient(135deg, #2563EB, #06B6D4)',
    },
    {
      icon: Code2,
      title: "AI Engineering",
      description: "Software specialists who transform complex operational knowledge into intelligent, accessible tools",
      gradient: isDark
        ? 'linear-gradient(135deg, #A855F7, #EC4899)'
        : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
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

      if (questionRef.current) {
        tl.from(questionRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.2);
      }

      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.4);
      }

      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
        }, 0.5);
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
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
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
            Chapter 03
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
            The Turning Point
          </Typography>
        </Box>

        {/* Main Question */}
        <Box
          ref={questionRef}
          sx={{
            position: 'relative',
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'radial-gradient(circle, rgba(0, 155, 228, 0.15), rgba(168, 85, 247, 0.1), transparent)'
                : 'radial-gradient(circle, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08), transparent)',
              filter: 'blur(40px)',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              borderRadius: '24px',
              p: { xs: 4, md: 8 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 6,
              },
              textAlign: 'center',
              background: isDark
                ? 'linear-gradient(135deg, #1e293b, #334155)'
                : 'linear-gradient(135deg, #1E293B, #475569)',
              boxShadow: isDark
                ? '0 20px 60px rgba(0, 0, 0, 0.5)'
                : '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: isDark ? '1px solid #334155' : '1px solid #475569',
            }}
          >
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Lightbulb 
                size={64} 
                style={{ 
                  color: '#FBBF24',
                  animation: 'pulse 2s infinite',
                }} 
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: h4FontSize,
                fontWeight: 700,
                color: '#FFFFFF',
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              What if the plant could answer back?
            </Typography>
            <Typography
              sx={{
                fontSize: bodyLargeFontSize,
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: 768,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              That's when we asked ourselves the question that changed everything. Not with
              numbers and charts, but with plain explanations that actually made sense.
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          ref={descriptionRef}
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: 900,
            mx: 'auto',
            mb: { xs: 6, md: 8 },
            transition: 'color 0.3s ease',
          }}
        >
          So we brought together two worlds that had never truly connected before. Our team
          combined deep operational expertise with cutting-edge AI capabilities, creating
          something entirely new for the industrial space.
        </Typography>

        {/* Teams Grid */}
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {teams.map((team, index) => {
            const Icon = team.icon;
            return (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    p: { xs: 4, md: 5 },
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 4,
                    },
                    borderRadius: '16px',
                    background: isDark ? '#1e293b' : '#FFFFFF',
                    border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    boxShadow: isDark
                      ? '0 10px 40px rgba(0, 0, 0, 0.4)'
                      : '0 10px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 20px 60px rgba(0, 155, 228, 0.3)'
                        : '0 20px 60px rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '16px',
                      background: team.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    }}
                  >
                    <Icon size={32} style={{ color: '#FFFFFF' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: h4FontSize,
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                      mb: 2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {team.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: bodyFontSize,
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {team.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
