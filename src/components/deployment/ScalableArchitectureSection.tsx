import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ScalableArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.scale-step', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const scaleSteps = [
    {
      title: 'Start Small',
      description: 'Begin with a single process unit or production line. Minimal initial investment with immediate value demonstration for stakeholders and operators.',
    },
    {
      title: 'Scale Gradually',
      description: 'Add agents and connectors step by step as your confidence grows. Each expansion builds on proven success, reducing implementation risk.',
    },
    {
      title: 'Enterprise-Wide',
      description: 'Expand across multiple sites and facilities. Centralized management with distributed deployment maintains performance and security standards.',
    },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: isDark 
          ? 'linear-gradient(180deg, transparent 0%, rgba(0, 155, 228, 0.05) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(37, 99, 235, 0.03) 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
        transition: 'background 0.3s ease',
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 10,
        },
        '@media (min-width: 1550px)': {
          py: 12,
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
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
        <Box ref={sectionRef}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: isDark ? '#fff' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              textAlign: 'center',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.6rem',
              },
            }}
          >
            Scalable Architecture for Growth
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
              mb: 8,
              transition: 'color 0.3s ease',
              maxWidth: 800,
              mx: 'auto',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.05rem',
                mb: 6,
                maxWidth: 700,
              },
            }}
          >
            Performance engineered for high-speed, real-time data streams processing thousands of tags per second without compromising system responsiveness or data integrity.
          </Typography>

          <Grid container spacing={4}>
            {scaleSteps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  className="scale-step"
                  sx={{
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 4,
                    padding: 4,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0,
                    transform: 'scale(0.9)',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      padding: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: isDark ? 'rgba(0, 155, 228, 0.3)' : 'rgba(37, 99, 235, 0.3)',
                      boxShadow: isDark ? '0 12px 40px rgba(0, 155, 228, 0.15)' : '0 16px 48px rgba(37, 99, 235, 0.15)',
                    },
                    '&::before': {
                      content: `"${index + 1}"`,
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      fontSize: '4rem',
                      fontWeight: 700,
                      color: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.08)',
                      lineHeight: 1,
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '3.5rem',
                      },
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontWeight: 600,
                      color: isDark ? '#009BE4' : '#2563EB',
                      mb: 2,
                      transition: 'color 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '1.35rem',
                      },
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.95rem',
                      },
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ScalableArchitectureSection;

