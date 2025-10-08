import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { AttachMoney, Schedule, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roiItems = [
  {
    icon: AttachMoney,
    amount: '$500K',
    title: 'Constraint Identification',
    description: 'Annual margin improvement, potentially up to $2M. One hidden bottleneck can pay for years of ChatAPC.',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
  },
  {
    icon: Schedule,
    amount: '$200K',
    title: 'Time Savings',
    description: 'Annually, 3 engineers saving 10 hours/week translates to $200K - $400K in productivity gains.',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    icon: School,
    amount: '$150K',
    title: 'Knowledge Retention',
    description: 'Faster onboarding for new hires and consistent decision-making, valued at $150K - $300K annually.',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
];

const LightFeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use a single timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animate header
      if (headerRef.current) {
        tl.from(headerRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, 0);
      }

      // Animate cards with stagger
      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="light"
      sx={{
        width: '100%',
        py: { xs: 6, sm: 8, md: 10, lg: 8, xl: 10 },
        // Special scaling for medium screens where sidebar causes issues
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 8,
        },
        '@media (min-width: 1550px)': {
          py: 10,
        },
        position: 'relative',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FEFEFE 30%, #FCFCFC 70%, #FAFAFA 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 3 },
          // Reduce width on medium screens where sidebar is present
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
        {/* Section Header */}
        <Box ref={headerRef} sx={{ 
          textAlign: 'center', 
          mb: { xs: 6, md: 8 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mb: 6,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 600,
              color: '#1E293B',
              mb: 2,
              lineHeight: 1.2,
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.8rem',
              },
            }}
          >
            Typical ROI in under 6 months
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 800,
              mx: 'auto',
              mb: 1,
              lineHeight: 1.7,
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.15rem',
                maxWidth: 700,
              },
            }}
          >
            Here's what plants can achieve with ChatAPC:
          </Typography>
        </Box>

        {/* ROI Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{
          '@media (min-width: 960px) and (max-width: 1549px)': {
          },
        }}>
          {roiItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  // Ensure Grid item takes proper width
                  flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 1.5rem)' },
                }}
              >
                <Box
                  sx={{
                    padding: { xs: 3, md: 4 },
                    borderRadius: '4px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(226, 232, 240, 1)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      padding: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: '#FFFFFF',
                      boxShadow: '0 20px 50px rgba(0, 155, 228, 0.15)',
                      border: '1px solid rgba(0, 155, 228, 0.4)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: { xs: 56, md: 64 },
                      height: { xs: 56, md: 64 },
                      borderRadius: '4px',
                      background: item.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.2)',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        width: 58,
                        height: 58,
                        mb: 2.5,
                      },
                    }}
                  >
                    <Icon sx={{ 
                      fontSize: { xs: 28, md: 32 },
                      color: '#FFFFFF',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: 29,
                      },
                    }} />
                  </Box>

                  {/* Amount */}
                  <Typography
                    sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                      color: '#2563EB',
                      mb: 1,
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '2.2rem',
                      },
                    }}
                  >
                    {item.amount}
                  </Typography>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 600,
                      color: '#1E293B',
                      mb: 2,
                      lineHeight: 1.3,
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '1.15rem',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      color: '#475569',
                      lineHeight: 1.7,
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.9rem',
                      },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Total Value */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 6, md: 8 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mt: 6,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 600,
              color: '#475569',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.35rem',
              },
            }}
          >
            Total potential value: <Box component="span" sx={{ color: '#2563EB' }}>$1M - $4M+ per year</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LightFeatureSection;

