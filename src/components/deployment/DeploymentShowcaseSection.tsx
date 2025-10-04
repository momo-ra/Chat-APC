import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeploymentShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom top',
            scrub: 1,
          },
          y: -80,
          ease: 'none',
        });
      }

      // Fade in stats
      gsap.from('.stat-box', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Image Placeholder */}
          <Grid item xs={12} md={6}>
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 300, md: 450 },
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)',
                border: '1px solid rgba(0, 155, 228, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 60px rgba(0, 155, 228, 0.15)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'rgba(0,155,228,0.1)\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 300,
                  color: 'rgba(0, 155, 228, 0.3)',
                  textAlign: 'center',
                  zIndex: 1,
                }}
              >
                [Deployment Image]
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Stats */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#fff',
                mb: 3,
                lineHeight: 1.3,
              }}
            >
              Proven at Scale
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.7,
                mb: 5,
              }}
            >
              Trusted by leading industrial companies worldwide to manage their most critical process operations with confidence and reliability.
            </Typography>

            <Grid container spacing={3}>
              {[
                { value: '500+', label: 'Active Deployments' },
                { value: '99.9%', label: 'System Uptime' },
                { value: '24/7', label: 'Support Available' },
                { value: '<15min', label: 'Average Setup Time' },
              ].map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    className="stat-box"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      padding: 3,
                      textAlign: 'center',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(0, 155, 228, 0.3)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 700,
                        color: '#009BE4',
                        mb: 1,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DeploymentShowcaseSection;

