import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { AttachMoney, Schedule, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';

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

const ThemeAdaptiveROISection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

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
    <>
      {/* Unified Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-0.5deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>

      <Box
        ref={sectionRef}
        data-section-theme={isDark ? 'dark' : 'light'}
        data-section-primary={isDark ? '#009BE4' : '#2563EB'}
        sx={{
          width: '100%',
          py: { xs: 6, sm: 8, md: 10, lg: 8, xl: 10 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            py: 8,
          },
          '@media (min-width: 1550px)': {
            py: 10,
          },
          position: 'relative',
          transition: 'background 0.3s ease',
          // Primary background pattern with floating orbs
          background: isDark
            ? 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 30%, rgba(55, 65, 81, 0.85) 70%, rgba(17, 24, 39, 0.95) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 254, 254, 0.95) 30%, rgba(252, 252, 252, 0.9) 70%, rgba(250, 250, 250, 0.85) 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 155, 228, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '350px',
            height: '350px',
            background: isDark
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'float 8s ease-in-out infinite reverse',
          },
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            px: { xs: 2, md: 3 },
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
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                mb: 2,
                lineHeight: 1.2,
                transition: 'color 0.3s ease',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                maxWidth: 800,
                mx: 'auto',
                mb: 1,
                lineHeight: 1.7,
                transition: 'color 0.3s ease',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
          <Grid container spacing={{ xs: 3, md: 4 }}>
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
                    flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 1.5rem)' },
                  }}
                >
                  <Box
                    sx={{
                      padding: { xs: 3, md: 4 },
                      borderRadius: '4px',
                      background: isDark 
                        ? 'rgba(31, 41, 55, 0.8)' 
                        : '#FFFFFF',
                      border: isDark 
                        ? '1px solid rgba(75, 85, 99, 0.3)' 
                        : '1px solid rgba(226, 232, 240, 1)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      boxShadow: isDark 
                        ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.08)',
                      backdropFilter: isDark ? 'blur(10px)' : 'none',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        padding: 3,
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        background: isDark 
                          ? 'rgba(31, 41, 55, 0.9)' 
                          : '#FFFFFF',
                        boxShadow: isDark 
                          ? '0 20px 50px rgba(0, 155, 228, 0.15)' 
                          : '0 20px 50px rgba(0, 155, 228, 0.15)',
                        border: isDark 
                          ? '1px solid rgba(0, 155, 228, 0.4)' 
                          : '1px solid rgba(0, 155, 228, 0.4)',
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
                        color: isDark ? '#009BE4' : '#2563EB',
                        mb: 1,
                        transition: 'color 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                        mb: 2,
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                        lineHeight: 1.7,
                        transition: 'color 0.3s ease',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                transition: 'color 0.3s ease',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  fontSize: '1.35rem',
                },
              }}
            >
              Total potential value: <Box component="span" sx={{ color: isDark ? '#009BE4' : '#2563EB' }}>$1M - $4M+ per year</Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ThemeAdaptiveROISection;