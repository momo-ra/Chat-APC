import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

gsap.registerPlugin(ScrollTrigger);

const IntegrationArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diagram animation
      if (diagramRef.current) {
        gsap.from(diagramRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Seamless DCS/SCADA integration',
    'Real-time data synchronization',
    'Historian connectivity (PI, Wonderware)',
    'Secure API endpoints',
    'Custom connector framework',
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.02) 0%, transparent 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Architecture Diagram Placeholder */}
          <Grid item xs={12} md={6}>
            <Box
              ref={diagramRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 350, md: 500 },
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px dashed rgba(0, 155, 228, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(0, 155, 228, 0.05) 0%, transparent 70%)',
                },
              }}
            >
              <AccountTreeIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'rgba(0, 155, 228, 0.3)',
                  zIndex: 1,
                }} 
              />
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  color: 'rgba(0, 155, 228, 0.5)',
                  textAlign: 'center',
                  zIndex: 1,
                }}
              >
                [Integration Architecture Diagram]
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textAlign: 'center',
                  zIndex: 1,
                  px: 3,
                }}
              >
                Visual representation of data flow and system connections
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} md={6}>
            <Box ref={contentRef}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 700,
                  color: '#fff',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Seamless System Integration
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                Our proven integration framework connects with your existing infrastructure without disrupting operations. ChatAPC acts as a transparent layer that enhances your systems without replacing them.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      padding: 2,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'rgba(0, 155, 228, 0.2)',
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #009BE4 0%, #00AFF5 100%)',
                        boxShadow: '0 0 12px rgba(0, 155, 228, 0.5)',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default IntegrationArchitectureSection;

