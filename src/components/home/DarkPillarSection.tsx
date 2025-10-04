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
      // Header animation - fades and rises
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Visual element sinks down
      if (visualRef.current) {
        gsap.to(visualRef.current, {
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 70%',
            end: 'bottom top',
            scrub: 2,
          },
          y: 120,
          scale: 0.85,
          opacity: 0.4,
          ease: 'none',
        });
      }

      // Pillars with staggered entrance from different directions
      pillarsRef.current.forEach((pillar, index) => {
        if (pillar) {
          const direction = index === 0 ? -80 : index === 2 ? 80 : 0;
          gsap.from(pillar, {
            scrollTrigger: {
              trigger: pillar,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: direction,
            y: 60,
            scale: 0.92,
            rotation: index === 1 ? 0 : (index === 0 ? -3 : 3),
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: { xs: 10, md: 15 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(13, 24, 66, 0.4) 0%, rgba(106, 17, 203, 0.05) 30%, rgba(0, 155, 228, 0.04) 70%, rgba(10, 14, 46, 0.5) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 30%, rgba(106, 17, 203, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(0, 155, 228, 0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            From question to answer — clear, fast, and explainable
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 700,
              mx: 'auto',
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
            background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.08) 0%, rgba(0, 155, 228, 0.05) 100%)',
            border: '1px solid rgba(106, 17, 203, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(106, 17, 203, 0.1) 0%, transparent 70%)',
            },
          }}
        >
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.4, zIndex: 1 }}>🔍</Typography>
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.4, zIndex: 1 }}>🌐</Typography>
          <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.4, zIndex: 1 }}>🎯</Typography>
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
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 155, 228, 0.2)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {/* Number Badge */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      background: 'rgba(0, 155, 228, 0.15)',
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
                        color: '#009BE4',
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
                      color: 'rgba(255, 255, 255, 0.95)',
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
                      color: 'rgba(255, 255, 255, 0.65)',
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
                            color: '#009BE4',
                            mr: 1,
                            mt: 0.25,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: 'rgba(255, 255, 255, 0.7)',
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

