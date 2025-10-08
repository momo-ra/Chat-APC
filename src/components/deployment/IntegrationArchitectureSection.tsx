import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const IntegrationArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    // Animations disabled to prevent content from hiding
    // const ctx = gsap.context(() => {
    //   // Diagram animation
    //   if (diagramRef.current) {
    //     gsap.from(diagramRef.current, {
    //       scrollTrigger: {
    //         trigger: sectionRef.current,
    //         start: 'top 70%',
    //       },
    //       scale: 0.8,
    //       opacity: 0,
    //       duration: 1,
    //       ease: 'power2.out',
    //     });
    //   }

    //   // Content animation
    //   if (contentRef.current) {
    //     gsap.from(contentRef.current.children, {
    //       scrollTrigger: {
    //         trigger: sectionRef.current,
    //         start: 'top 70%',
    //       },
    //       x: 50,
    //       opacity: 0,
    //       duration: 0.8,
    //       stagger: 0.15,
    //       ease: 'power2.out',
    //     });
    //   }
    // }, sectionRef);

    // return () => ctx.revert();
  }, [isDark]);

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
        width: '100vw',
        py: { xs: 8, md: 14 },
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.02) 0%, transparent 100%)'
          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(248, 250, 252, 0.9) 70%, rgba(241, 245, 249, 0.8) 100%)',
        transition: 'background 0.3s ease',
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 11,
        },
        '@media (min-width: 1550px)': {
          py: 14,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'radial-gradient(circle at 20% 50%, rgba(0, 155, 228, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(124, 58, 237, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: isDark 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 155, 228, 0.3) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
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
        <Grid container spacing={6} alignItems="center" sx={{
          '@media (min-width: 960px) and (max-width: 1549px)': {
            spacing: 4,
          },
        }}>
          {/* Left side - Architecture Diagram Placeholder */}
          <Grid item xs={12} md={6}>
            <Box
              ref={diagramRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 350, md: 500 },
                borderRadius: 4,
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.02)' 
                  : 'rgba(255, 255, 255, 0.9)',
                border: isDark 
                  ? '2px dashed rgba(0, 155, 228, 0.3)' 
                  : '2px dashed rgba(37, 99, 235, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                overflow: 'hidden',
                boxShadow: isDark ? 'none' : '0 8px 32px rgba(37, 99, 235, 0.08)',
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isDark 
                    ? 'radial-gradient(circle at 50% 50%, rgba(0, 155, 228, 0.05) 0%, transparent 70%)'
                    : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.04) 0%, transparent 70%)',
                },
              }}
            >
              <AccountTreeIcon 
                sx={{ 
                  fontSize: 80, 
                  color: isDark ? 'rgba(0, 155, 228, 0.3)' : 'rgba(37, 99, 235, 0.4)',
                  zIndex: 1,
                  transition: 'color 0.3s ease',
                }} 
              />
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 400,
                  color: isDark ? 'rgba(0, 155, 228, 0.5)' : 'rgba(37, 99, 235, 0.6)',
                  textAlign: 'center',
                  zIndex: 1,
                  transition: 'color 0.3s ease',
                }}
              >
                [Integration Architecture Diagram]
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)',
                  textAlign: 'center',
                  zIndex: 1,
                  px: 3,
                  transition: 'color 0.3s ease',
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
                  color: isDark ? '#fff' : 'rgba(0, 0, 0, 0.9)',
                  mb: 3,
                  lineHeight: 1.2,
                  transition: 'color 0.3s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '2.4rem',
                    mb: 2.5,
                  },
                }}
              >
                Seamless System Integration
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)',
                  lineHeight: 1.8,
                  mb: 4,
                  transition: 'color 0.3s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '1.05rem',
                    mb: 3.5,
                  },
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
                      background: isDark 
                        ? 'rgba(255, 255, 255, 0.02)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      border: isDark 
                        ? '1px solid rgba(255, 255, 255, 0.08)' 
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: 4,
                      transition: 'all 0.2s ease',
                      boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        padding: 1.75,
                        gap: 1.75,
                      },
                      '&:hover': {
                        background: isDark 
                          ? 'rgba(255, 255, 255, 0.04)' 
                          : 'rgba(255, 255, 255, 0.95)',
                        borderColor: isDark 
                          ? 'rgba(0, 155, 228, 0.2)' 
                          : 'rgba(37, 99, 235, 0.3)',
                        transform: 'translateX(8px)',
                        boxShadow: isDark ? 'none' : '0 4px 16px rgba(37, 99, 235, 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: isDark 
                          ? 'linear-gradient(135deg, #009BE4 0%, #00AFF5 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                        boxShadow: isDark 
                          ? '0 0 12px rgba(0, 155, 228, 0.5)'
                          : '0 0 12px rgba(37, 99, 235, 0.4)',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
                        fontWeight: 500,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '0.95rem',
                        },
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

