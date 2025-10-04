import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ShieldIcon from '@mui/icons-material/Shield';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
        width: '100%',
        background: 'linear-gradient(180deg, rgba(0, 155, 228, 0.05) 0%, transparent 100%)',
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
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 3,
                    padding: 3,
                    opacity: 0,
                    transform: 'translateX(-50px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(0, 155, 228, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: '#009BE4',
                      flexShrink: 0,
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
                        color: '#fff',
                        mb: 1.5,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.7,
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

