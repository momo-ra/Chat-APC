import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { Speed, Security, TrendingUp, Settings } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Speed,
    title: 'Real-Time Performance',
    description: 'Monitor and optimize your process in real-time with instant insights and automated recommendations.',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
  },
  {
    icon: Security,
    title: 'Enterprise-Grade Security',
    description: 'Your data stays secure with SOC 2 compliance, end-to-end encryption, and on-premise deployment options.',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Anticipate issues before they happen with AI-powered predictive models and proactive alerts.',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
  {
    icon: Settings,
    title: 'Seamless Integration',
    description: 'Connect with your existing DCS, SCADA, and historians without disrupting your current operations.',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
];

const LightFeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Animate cards with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
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
      data-section-theme="light"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 155, 228, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              display: 'inline-block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#2563EB',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 2,
              px: 3,
              py: 1,
              borderRadius: 3,
              background: 'rgba(37, 99, 235, 0.08)',
            }}
          >
            Why ChatAPC
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#1E293B',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Built for industrial excellence
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Powerful features designed specifically for process engineers and plant operations teams
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
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
                    padding: 4,
                    borderRadius: 4,
                    background: '#FFFFFF',
                    border: '1px solid rgba(226, 232, 240, 1)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: '#FFFFFF',
                      boxShadow: '0 20px 50px rgba(0, 155, 228, 0.15)',
                      border: '1px solid rgba(0, 155, 228, 0.4)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    <Icon sx={{ fontSize: 32, color: '#FFFFFF' }} />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: '#475569',
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
      </Container>
    </Box>
  );
};

export default LightFeatureSection;

