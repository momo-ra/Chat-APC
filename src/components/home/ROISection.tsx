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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header - rises from below
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Animate cards with rotation and scale
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            scale: 0.9,
            y: 60,
            rotationX: -15,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        }
      });

      // Parallax for background
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -30,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.06) 0%, rgba(106, 17, 203, 0.04) 50%, rgba(10, 14, 46, 0.5) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '70%',
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
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            Typical ROI in under 6 months
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 800,
              mx: 'auto',
              mb: 1,
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
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 155, 228, 0.3)',
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: 'rgba(0, 155, 228, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Icon sx={{ fontSize: 36, color: '#009BE4' }} />
                  </Box>

                  {/* Amount */}
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: '#009BE4',
                      mb: 1,
                    }}
                  >
                    {item.amount}
                  </Typography>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.95)',
                      mb: 2,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.7,
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
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Total potential value: <Box component="span" sx={{ color: '#009BE4' }}>$1M - $4M+ per year</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ROISection;

