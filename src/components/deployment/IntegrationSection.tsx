import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntegrationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
            Comprehensive Integration Ecosystem
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
            Future-Ready Architecture: Built-in support for emerging third-party real-time databases and external applications ensures your investment remains valuable as technology evolves.
          </Typography>

          <Grid container spacing={6}>
            {/* Data Sources */}
            <Grid item xs={12} md={6}>
              <Box
                className="integration-column"
                sx={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  padding: 4,
                  height: '100%',
                  opacity: 0,
                  transform: 'translateY(50px)',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    fontWeight: 600,
                    color: '#009BE4',
                    mb: 4,
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
                          backgroundColor: '#009BE4',
                          flexShrink: 0,
                          mt: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          lineHeight: 1.6,
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
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  padding: 4,
                  height: '100%',
                  opacity: 0,
                  transform: 'translateY(50px)',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    fontWeight: 600,
                    color: '#009BE4',
                    mb: 4,
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
                          backgroundColor: '#009BE4',
                          flexShrink: 0,
                          mt: 1,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          color: 'rgba(255, 255, 255, 0.75)',
                          lineHeight: 1.6,
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

