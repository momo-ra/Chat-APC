import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScalableArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
        width: '100%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 155, 228, 0.05) 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box ref={sectionRef}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#fff',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Scalable Architecture for Growth
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'rgba(255, 255, 255, 0.65)',
              textAlign: 'center',
              mb: 8,
              maxWidth: 800,
              mx: 'auto',
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
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    padding: 4,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0,
                    transform: 'scale(0.9)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(0, 155, 228, 0.3)',
                      boxShadow: '0 12px 40px rgba(0, 155, 228, 0.15)',
                    },
                    '&::before': {
                      content: `"${index + 1}"`,
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      fontSize: '4rem',
                      fontWeight: 700,
                      color: 'rgba(0, 155, 228, 0.1)',
                      lineHeight: 1,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontWeight: 600,
                      color: '#009BE4',
                      mb: 2,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.7,
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

