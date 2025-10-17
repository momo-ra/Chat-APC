import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Card, CardContent } from '@mui/material';
import { 
  Visibility, 
  Language, 
  Psychology,
  CheckCircle
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Visibility,
    emoji: '1',
    title: 'You ask in plain language',
    description: 'Type your question naturally. No special syntax required.',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    glowColor: 'rgba(255, 107, 107, 0.2)',
  },
  {
    icon: Language,
    emoji: '2',
    title: 'ChatAPC connects the dots with specialized agents',
    description: 'The AI interprets your intent and activates the right agent:',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    glowColor: 'rgba(78, 205, 196, 0.2)',
    features: [
      'Visualize Agent → Plots variables, limits, and events',
      'Event Agent → Detects violations and alarms',
      'Navigator Agent → Explores equipment, tags, and knowledge map',
      'Advisor Agent → Explains how to stabilize or test "what-if" scenarios',
      'Optimizer Agent → Highlights which constraints are cutting profit',
    ],
  },
  {
    icon: Psychology,
    emoji: '3',
    title: 'You get an answer with evidence',
    description: 'Each agent produces an artifact — a graph, event log, or recommendation — and ChatAPC explains it in plain language. You see what it sees.',
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%)',
    glowColor: 'rgba(168, 230, 207, 0.2)',
  },
];

const StylishPillarSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Minimal, smooth animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Header animation
      if (headerRef.current) {
        tl.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 0);
      }

      // Visual element animation
      if (visualRef.current) {
        tl.from(visualRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.2);
      }

      // Minimal pillar animations - just fade and slight lift
      pillarsRef.current.forEach((pillar, index) => {
        if (pillar) {
          tl.from(pillar, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          }, 0.3 + index * 0.1);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 12,
        },
        '@media (min-width: 1550px)': {
          py: 16,
        },
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 0.95) 30%, rgba(55, 65, 81, 0.9) 70%, rgba(17, 24, 39, 1) 100%)'
          : 'linear-gradient(180deg, #FEFEFE 0%, #FCFCFC 30%, #FAFAFA 70%, #F8F8F8 100%)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? `
              radial-gradient(circle at 20% 30%, rgba(0, 155, 228, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(106, 17, 203, 0.04) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)
            `,
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
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
        {/* Stylish Header */}
        <Box ref={headerRef} sx={{ 
          textAlign: 'center', 
          mb: { xs: 10, md: 10 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mb: 8,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 155, 228, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(37, 99, 235, 0.8) 50%, rgba(30, 41, 59, 0.9) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.2,
              transition: 'all 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.8rem',
              },
            }}
          >
            From question to answer — clear, fast, and explainable
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.15rem',
                maxWidth: 650,
              },
            }}
          >
            No black boxes. Every answer shows its work.
          </Typography>
        </Box>

        {/* Premium Visual Element */}
        <Box
          ref={visualRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 900, md: 900 },
            height: { xs: 180, md: 250 },
            mx: 'auto',
            mb: { xs: 8, md: 8 },
            borderRadius: '16px',
            overflow: 'hidden',
            background: isDark
              ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(106, 17, 203, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '2px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 4 },
            boxShadow: isDark
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              maxWidth: 800,
              height: 220,
              mb: 6,
              gap: 3,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark
                ? 'radial-gradient(circle at center, rgba(0, 155, 228, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
              transition: 'background 0.3s ease',
            },
          }}
        >
          <Typography sx={{ 
            fontSize: { xs: '3rem', md: '4rem' }, 
            opacity: isDark ? 0.8 : 0.6, 
            zIndex: 1,
            filter: isDark ? 'brightness(1.2)' : 'none',
            transition: 'all 0.3s ease',
          }}>🔍</Typography>
          <Typography sx={{ 
            fontSize: { xs: '3rem', md: '4rem' }, 
            opacity: isDark ? 0.8 : 0.6, 
            zIndex: 1,
            filter: isDark ? 'brightness(1.2)' : 'none',
            transition: 'all 0.3s ease',
          }}>🌐</Typography>
          <Typography sx={{ 
            fontSize: { xs: '3rem', md: '4rem' }, 
            opacity: isDark ? 0.8 : 0.6, 
            zIndex: 1,
            filter: isDark ? 'brightness(1.2)' : 'none',
            transition: 'all 0.3s ease',
          }}>🎯</Typography>
        </Box>

        {/* Stylish Pillars Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Grid
                item
                xs={12}
                lg={4}
                key={index}
                ref={(el) => {
                  if (el) pillarsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '16px',
                    background: isDark 
                      ? 'rgba(31, 41, 55, 0.8)' 
                      : '#FFFFFF',
                    border: isDark 
                      ? '1px solid rgba(75, 85, 99, 0.3)' 
                      : '2px solid #E2E8F0',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isDark 
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
                      : '0 4px 20px rgba(0, 0, 0, 0.06)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      background: pillar.gradient,
                      borderRadius: '18px',
                      zIndex: -1,
                      opacity: 0,
                      filter: 'blur(8px)',
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      border: isDark 
                        ? '1px solid rgba(0, 155, 228, 0.4)' 
                        : '2px solid rgba(0, 155, 228, 0.5)',
                      boxShadow: isDark 
                        ? '0 8px 32px rgba(0, 155, 228, 0.15)' 
                        : '0 12px 40px rgba(0, 155, 228, 0.2)',
                      '&::before': {
                        opacity: 0.2,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 3,
                    },
                  }}>
                    {/* Premium Number Badge */}
                    <Box
                      sx={{
                        width: { xs: 60, md: 64 },
                        height: { xs: 60, md: 64 },
                        borderRadius: '12px',
                        background: pillar.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        position: 'relative',
                        boxShadow: `0 4px 20px ${pillar.glowColor}`,
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          width: 60,
                          height: 60,
                          mb: 2.5,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 2,
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          zIndex: -1,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '1.8rem', md: '2rem' },
                          fontWeight: 800,
                          color: '#FFFFFF',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          '@media (min-width: 960px) and (max-width: 1549px)': {
                            fontSize: '1.8rem',
                          },
                        }}
                      >
                        {pillar.emoji}
                      </Typography>
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.4rem' },
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                        mb: 2,
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '1.25rem',
                        },
                      }}
                    >
                      {pillar.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                        lineHeight: 1.7,
                        mb: pillar.features ? 3 : 0,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '0.95rem',
                          mb: pillar.features ? 2.5 : 0,
                        },
                      }}
                    >
                      {pillar.description}
                    </Typography>

                    {/* Features List */}
                    {pillar.features && (
                      <Box sx={{ mt: 'auto' }}>
                        {pillar.features.map((feature, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: { xs: 1.5, md: 1.5 },
                              '@media (min-width: 960px) and (max-width: 1549px)': {
                                mb: 1.25,
                              },
                            }}
                          >
                            <CheckCircle
                              sx={{
                                fontSize: { xs: 18, md: 20 },
                                color: isDark ? '#009BE4' : '#2563EB',
                                mr: 1,
                                mt: 0.25,
                                flexShrink: 0,
                                transition: 'color 0.3s ease',
                                '@media (min-width: 960px) and (max-width: 1549px)': {
                                  fontSize: 18,
                                },
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: { xs: '0.85rem', md: '0.875rem' },
                                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                                lineHeight: 1.5,
                                transition: 'color 0.3s ease',
                                '@media (min-width: 960px) and (max-width: 1549px)': {
                                  fontSize: '0.85rem',
                                },
                              }}
                            >
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default StylishPillarSection;