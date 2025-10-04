import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ReadyToDeploySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ready-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const readyFeatures = [
    {
      title: 'Lightweight Footprint',
      description: 'Minimal resource requirements mean ChatAPC can run alongside existing systems without performance impact. Efficient architecture maximizes value from your current hardware investments.',
    },
    {
      title: 'Security-First Design',
      description: 'Built from the ground up with industrial cybersecurity principles. Every component undergoes rigorous security testing to protect your critical operational data.',
    },
    {
      title: 'Adaptive Integration',
      description: 'Designed to enhance your existing environment, not replace it. ChatAPC works with your current systems, policies, and workflows to deliver immediate value.',
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
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
              mb: 8,
              textAlign: 'center',
            }}
          >
            Ready to Deploy in Your Environment
          </Typography>

          <Grid container spacing={4}>
            {readyFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  className="ready-card"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    padding: 4,
                    height: '100%',
                    opacity: 0,
                    transform: 'translateY(40px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(0, 155, 228, 0.3)',
                      boxShadow: '0 12px 40px rgba(0, 155, 228, 0.15)',
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontWeight: 600,
                      color: '#fff',
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
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

export default ReadyToDeploySection;

