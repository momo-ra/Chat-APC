import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';

const DeploymentHeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box ref={heroRef} sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: '#fff',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Deploy ChatAPC Anywhere
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.8,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            Every plant is different. That's why ChatAPC is built to fit your infrastructure, whether you run on-premise, in the cloud, or in a hybrid setup. Our flexible deployment options ensure seamless integration with your existing systems while maintaining the security and reliability standards your operations demand.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DeploymentHeroSection;

