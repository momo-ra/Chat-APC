import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const IntegrationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.integration-column', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const dataSources = [
    'OPC-UA: Standard industrial protocol connectivity',
    'SQL Databases: Direct integration with existing databases',
    'Historians: OSIsoft PI, Wonderware, and other major platforms',
    'Excel/CSV: Import spreadsheets and flat files',
    'Custom Connectors: Tailored solutions for proprietary systems',
  ];

  const dataOutputs = [
    'Real-time Alerts: Immediate notifications via email, SMS, or dashboards',
    'Automated Reports: Scheduled insights and performance summaries',
    'Data Exports: Flexible formats for external analysis',
    'Write-back Capability: Direct integration with DCS and databases',
    'API Access: Programmatic integration with third-party applications',
  ];

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        position: 'relative',
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
            Comprehensive Integration Ecosystem
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
              mb: 8,
              maxWidth: 800,
              mx: 'auto',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.05rem',
                mb: 6,
                maxWidth: 700,
              },
            }}
          >
            Future-Ready Architecture: Built-in support for emerging third-party real-time databases and external applications ensures your investment remains valuable as technology evolves.
          </Typography>

          <Grid container spacing={6}>
            {/* Data Sources */}
            <Grid item xs={12} md={6}>
              <Box
                className="integration-column"
                sx={{
                  background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 4,
                  padding: 4,
                  height: '100%',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  boxShadow: isDark ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    padding: 3,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    fontWeight: 600,
                    color: isDark ? '#009BE4' : '#2563EB',
                    mb: 4,
                    transition: 'color 0.3s ease',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      fontSize: '1.65rem',
                      mb: 3,
                    },
                  }}
                >
                  Data Sources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {dataSources.map((source, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: isDark ? '#009BE4' : '#2563EB',
                          flexShrink: 0,
                          mt: 1,
                          transition: 'background-color 0.3s ease',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.7)',
                          lineHeight: 1.6,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {source}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Data Outputs */}
            <Grid item xs={12} md={6}>
              <Box
                className="integration-column"
                sx={{
                  background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 4,
                  padding: 4,
                  height: '100%',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  boxShadow: isDark ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    padding: 3,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    fontWeight: 600,
                    color: isDark ? '#009BE4' : '#2563EB',
                    mb: 4,
                    transition: 'color 0.3s ease',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      fontSize: '1.65rem',
                      mb: 3,
                    },
                  }}
                >
                  Data Outputs
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {dataOutputs.map((output, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: isDark ? '#009BE4' : '#2563EB',
                          flexShrink: 0,
                          mt: 1,
                          transition: 'background-color 0.3s ease',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.7)',
                          lineHeight: 1.6,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {output}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default IntegrationSection;

