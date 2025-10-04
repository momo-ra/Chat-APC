import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '99.9%',
    label: 'Uptime Guarantee',
    description: 'Enterprise-grade reliability you can count on',
  },
  {
    value: '< 50ms',
    label: 'Response Time',
    description: 'Lightning-fast insights when you need them',
  },
  {
    value: '24/7',
    label: 'Expert Support',
    description: 'Round-the-clock assistance from our team',
  },
  {
    value: '500+',
    label: 'Active Plants',
    description: 'Trusted by leading industrial operations',
  },
];

const LightStatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Animate stats with counter effect
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });

          // Add scale pulse on hover
          stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="light"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, #E2E8F0 0%, #F1F5F9 50%, #E2E8F0 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(0, 155, 228, 0.06) 0%, transparent 70%)',
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
              fontWeight: 700,
              color: '#1E293B',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Trusted by industry leaders
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Join hundreds of plants optimizing their operations with ChatAPC
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              ref={(el) => {
                if (el) statsRef.current[index] = el as HTMLDivElement;
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  padding: 4,
                  borderRadius: 4,
                  background: '#FFFFFF',
                  border: '2px solid #E2E8F0',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  '&:hover': {
                    background: '#FFFFFF',
                    border: '2px solid rgba(0, 155, 228, 0.5)',
                    boxShadow: '0 12px 40px rgba(0, 155, 228, 0.2)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Value */}
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>

                  {/* Label */}
                  <Typography
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      mb: 1.5,
                    }}
                  >
                    {stat.label}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#64748B',
                      lineHeight: 1.6,
                    }}
                  >
                    {stat.description}
                  </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA Text */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Ready to transform your process operations?{' '}
            <Box
              component="span"
              sx={{
                color: '#009BE4',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#0077B6',
                },
              }}
            >
              Get started today
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LightStatsSection;

