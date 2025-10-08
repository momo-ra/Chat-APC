import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { 
  Visibility, 
  Language, 
  Psychology,
  CheckCircle
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Visibility,
    emoji: '1',
    title: 'You ask in plain language',
    description: 'Type your question naturally. No special syntax required.',
  },
  {
    icon: Language,
    emoji: '2',
    title: 'ChatAPC connects the dots with specialized agents',
    description: 'The AI interprets your intent and activates the right agent:',
    features: [
      'Graph Agent → Plots variables, limits, and events',
      'Event Agent → Detects violations and alarms',
      'Navigator Agent → Explores equipment, tags, and knowledge map',
      'Process Advisor → Explains how to stabilize or test "what-if" scenarios',
      'Profit Advisor → Highlights which constraints are cutting profit',
    ],
  },
  {
    icon: Psychology,
    emoji: '3',
    title: 'You get an answer with evidence',
    description: 'Each agent produces an artifact — a graph, event log, or recommendation — and ChatAPC explains it in plain language. You see what it sees.',
  },
];

const DarkPillarSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified animations for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Animate header
      if (headerRef.current) {
        tl.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0);
      }

      // Remove heavy parallax animations
      if (visualRef.current) {
        tl.from(visualRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.2);
      }

      // Simplified pillar animations
      if (pillarsRef.current.length > 0) {
        pillarsRef.current.forEach((pillar, index) => {
          if (pillar) {
            tl.from(pillar, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: 'power2.out',
            }, 0.3 + index * 0.1);
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="light"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, #E2E8F0 0%, #F1F5F9 50%, #E2E8F0 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(0, 155, 228, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#1E293B',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            From question to answer — clear, fast, and explainable
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            No black boxes. Every answer shows its work.
          </Typography>
        </Box>

        {/* Decorative Visual Element - Sinks down on scroll */}
        <Box
          ref={visualRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            height: { xs: 180, md: 250 },
            mx: 'auto',
            mb: 8,
            borderRadius: 4,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            },
          }}
        >
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.6, zIndex: 1 }}>🔍</Typography>
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.6, zIndex: 1 }}>🌐</Typography>
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.6, zIndex: 1 }}>🎯</Typography>
        </Box>

        {/* Pillars Grid */}
        <Grid container spacing={4}>
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
                <Box
                  sx={{
                    padding: 4,
                    borderRadius: 4,
                    background: '#FFFFFF',
                    border: '2px solid #E2E8F0',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      background: '#FFFFFF',
                      border: '2px solid rgba(0, 155, 228, 0.5)',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0, 155, 228, 0.2)',
                    },
                  }}
                >
                  {/* Number Badge */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      background: 'rgba(37, 99, 235, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#2563EB',
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
                      color: '#1E293B',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {pillar.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: '#475569',
                      lineHeight: 1.7,
                      mb: pillar.features ? 3 : 0,
                    }}
                  >
                    {pillar.description}
                  </Typography>

                  {/* Features List (if exists) */}
                  {pillar.features && (
                    <Box sx={{ mt: 'auto' }}>
                      {pillar.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 1.5,
                        }}
                      >
                        <CheckCircle
                          sx={{
                            fontSize: 20,
                            color: '#2563EB',
                            mr: 1,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: '#475569',
                            lineHeight: 1.5,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default DarkPillarSection;

