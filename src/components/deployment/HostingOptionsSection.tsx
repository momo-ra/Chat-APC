import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import HubIcon from '@mui/icons-material/Hub';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useThemeMode } from '../../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const HostingOptionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hosting-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hostingOptions = [
    {
      icon: <StorageIcon sx={{ fontSize: 48 }} />,
      title: 'On-Premise',
      description: 'Deploy fully inside your plant network with no internet connection required. Complete control over your data and infrastructure while maintaining existing security protocols and compliance standards.',
      benefits: [
        'Air-gapped deployment',
        'Full data sovereignty',
        'Zero cloud dependencies',
        'Custom hardware optimization'
      ],
      imagePlaceholder: true,
    },
    {
      icon: <CloudIcon sx={{ fontSize: 48 }} />,
      title: 'Private Cloud',
      description: 'Run securely in Cloud Platforms with enterprise-grade security. Benefit from cloud scalability while maintaining dedicated, isolated environments for your industrial data.',
      benefits: [
        'Elastic scalability',
        'Managed infrastructure',
        'Global availability',
        'Enterprise SLA guarantees'
      ],
      imagePlaceholder: true,
    },
    {
      icon: <HubIcon sx={{ fontSize: 48 }} />,
      title: 'Hybrid',
      description: 'Combine both approaches for maximum flexibility. Keep sensitive data on-premise while leveraging cloud resources for advanced analytics and reporting capabilities.',
      benefits: [
        'Best of both worlds',
        'Flexible data residency',
        'Cost optimization',
        'Seamless integration'
      ],
      imagePlaceholder: true,
    },
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
              color: isDark ? '#fff' : '#0F172A',
              mb: 2,
              textAlign: 'center',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.6rem',
              },
              '@media (min-width: 1550px)': {
                fontSize: '3rem',
              },
            }}
          >
            Flexible Hosting Options
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              mb: 8,
              maxWidth: 700,
              mx: 'auto',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.05rem',
                maxWidth: 650,
                mb: 6,
              },
              '@media (min-width: 1550px)': {
                fontSize: '1.1rem',
                mb: 8,
              },
            }}
          >
            Choose what works best for your IT policies and operational requirements. Our deployment experts work with your team to ensure optimal configuration for your specific environment.
          </Typography>

          <Grid container spacing={4} sx={{
            '@media (min-width: 960px) and (max-width: 1549px)': {
              spacing: 3,
            },
          }}>
            {hostingOptions.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  className="hosting-card"
                  sx={{
                    background: isDark 
                      ? 'rgba(255, 255, 255, 0.03)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 4,
                    padding: 0,
                    height: '100%',
                    opacity: 0,
                    transform: 'translateY(60px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark 
                      ? 'none' 
                      : '0 4px 20px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: isDark 
                        ? 'rgba(0, 155, 228, 0.3)' 
                        : 'rgba(37, 99, 235, 0.4)',
                      boxShadow: isDark 
                        ? '0 12px 40px rgba(0, 155, 228, 0.15)' 
                        : '0 16px 48px rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >

                  {/* Content Area */}
                  <Box
                    sx={{
                      padding: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        padding: 3,
                      },
                    }}
                  >
                    {/* Icon Badge */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'all 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          width: 56,
                          height: 56,
                          mb: 2.5,
                        },
                      }}
                    >
                      <Box sx={{ 
                        color: isDark ? '#009BE4' : '#2563EB',
                        transition: 'color 0.3s ease',
                      }}>
                        {option.icon}
                      </Box>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: { xs: '1.3rem', md: '1.5rem' },
                        fontWeight: 600,
                        color: isDark ? '#fff' : '#0F172A',
                        mb: 2,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '1.35rem',
                        },
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.6)',
                        lineHeight: 1.7,
                        mb: 3,
                        transition: 'color 0.3s ease',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          fontSize: '0.9rem',
                        },
                      }}
                    >
                      {option.description}
                    </Typography>

                    {/* Benefits List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto' }}>
                      {option.benefits.map((benefit, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleOutlineIcon 
                            sx={{ 
                              fontSize: 18, 
                              color: isDark ? '#009BE4' : '#2563EB',
                              flexShrink: 0,
                              transition: 'color 0.3s ease',
                            }} 
                          />
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)',
                              lineHeight: 1.5,
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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

export default HostingOptionsSection;

