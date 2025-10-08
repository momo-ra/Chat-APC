import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ShieldIcon from '@mui/icons-material/Shield';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.security-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  const securityFeatures = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Role-Based Access Control',
      description: 'Granular permissions ensure users access only the data and functions relevant to their role. Administrators can define custom access levels aligned with your organizational structure.',
    },
    {
      icon: <LockIcon sx={{ fontSize: 40 }} />,
      title: 'Encrypted Data Transfer',
      description: 'All data communication uses industry-standard encryption protocols. End-to-end security protects sensitive operational data throughout transmission and storage.',
    },
    {
      icon: <IntegrationInstructionsIcon sx={{ fontSize: 40 }} />,
      title: 'Zero Disruption Integration',
      description: 'ChatAPC integrates seamlessly without interrupting existing systems. Read-only connections by default ensure your critical operations continue unaffected during deployment.',
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      title: 'Industrial Cybersecurity Standards',
      description: 'Built to meet IEC 62443, NIST, and other industrial cybersecurity frameworks. Regular security audits and updates maintain compliance with evolving standards.',
    },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: isDark 
          ? 'linear-gradient(180deg, rgba(0, 155, 228, 0.05) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(37, 99, 235, 0.03) 0%, transparent 100%)',
        py: { xs: 8, md: 12 },
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
              mb: 8,
              textAlign: 'center',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.6rem',
                mb: 6,
              },
              '@media (min-width: 1550px)': {
                fontSize: '3rem',
                mb: 8,
              },
            }}
          >
            Enterprise-Grade Security
          </Typography>

          <Grid container spacing={4}>
            {securityFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  className="security-item"
                  sx={{
                    display: 'flex',
                    gap: 3,
                    background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 4,
                    padding: 3,
                    opacity: 0,
                    transform: 'translateX(-50px)',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      gap: 2.5,
                      padding: 2.5,
                    },
                    '&:hover': {
                      background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.95)',
                      borderColor: isDark ? 'rgba(0, 155, 228, 0.2)' : 'rgba(37, 99, 235, 0.3)',
                      boxShadow: isDark ? 'none' : '0 8px 32px rgba(37, 99, 235, 0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: isDark ? '#009BE4' : '#2563EB',
                      flexShrink: 0,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 600,
                        color: isDark ? '#fff' : 'rgba(0, 0, 0, 0.9)',
                        mb: 1.5,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '1.15rem',
                        },
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                        lineHeight: 1.7,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '0.9rem',
                        },
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SecuritySection;

