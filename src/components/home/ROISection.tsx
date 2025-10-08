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
  },
  {
    icon: Schedule,
    amount: '$200K',
    title: 'Time Savings',
    description: 'Annually, 3 engineers saving 10 hours/week translates to $200K - $400K in productivity gains.',
  },
  {
    icon: School,
    amount: '$150K',
    title: 'Knowledge Retention',
    description: 'Faster onboarding for new hires and consistent decision-making, valued at $150K - $300K annually.',
  },
];

const ROISection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified animations for better performance
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Simplified card animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Remove heavy parallax for better scroll performance
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.06) 0%, rgba(106, 17, 203, 0.04) 50%, rgba(10, 14, 46, 0.5) 100%)'
          : 'transparent',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(0, 155, 228, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Typical ROI in under 6 months
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              maxWidth: 800,
              mx: 'auto',
              mb: 1,
              transition: 'color 0.3s ease',
            }}
          >
            Here's what plants can achieve with ChatAPC:
          </Typography>
        </Box>

        {/* ROI Grid */}
        <Grid container spacing={4}>
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
              >
                <Box
                  sx={{
                    padding: 4,
                    borderRadius: 4,
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                      border: isDark ? '1px solid rgba(0, 155, 228, 0.3)' : '1px solid rgba(37, 99, 235, 0.3)',
                      transform: 'translateY(-6px)',
                      boxShadow: isDark ? 'none' : '0 12px 40px rgba(37, 99, 235, 0.15)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: isDark ? 'rgba(0, 155, 228, 0.15)' : 'rgba(37, 99, 235, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <Icon sx={{ fontSize: 36, color: isDark ? '#009BE4' : '#2563EB', transition: 'color 0.3s ease' }} />
                  </Box>

                  {/* Amount */}
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: isDark ? '#009BE4' : '#2563EB',
                      mb: 1,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.amount}
                  </Typography>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                      mb: 2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
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
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
              transition: 'color 0.3s ease',
            }}
          >
            Total potential value: <Box component="span" sx={{ color: isDark ? '#009BE4' : '#2563EB', transition: 'color 0.3s ease' }}>$1M - $4M+ per year</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ROISection;

