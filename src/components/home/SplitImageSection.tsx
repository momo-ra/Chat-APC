import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Real-time data integration from all major systems',
  'Natural language queries with instant responses',
  'Automated root cause analysis',
  'Predictive maintenance recommendations',
];

const SplitImageSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });

        // Image parallax
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          y: -60,
          ease: 'none',
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(10, 14, 46, 0.6) 0%, rgba(0, 155, 228, 0.04) 50%, rgba(10, 14, 46, 0.6) 100%)'
          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(248, 250, 252, 0.9) 70%, rgba(241, 245, 249, 0.8) 100%)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'radial-gradient(circle at 30% 50%, rgba(0, 155, 228, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.06) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(124, 58, 237, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: isDark 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 155, 228, 0.3) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Grid container sx={{ minHeight: { md: 500 } }}>
        {/* Image Side */}
        <Grid item xs={12} md={6}>
          <Box
            ref={imageRef}
            sx={{
              position: 'relative',
              height: { xs: 300, md: '100%' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={industrialAI}
              alt="Industrial Operations"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isDark ? 'brightness(0.8)' : 'brightness(0.7) contrast(1.1)',
                transition: 'filter 0.3s ease',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDark 
                  ? 'linear-gradient(90deg, transparent 0%, rgba(10, 14, 46, 0.8) 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.3) 100%)',
                transition: 'background 0.3s ease',
              }}
            />
          </Box>
        </Grid>

        {/* Content Side */}
        <Grid item xs={12} md={6}>
          <Box
            ref={contentRef}
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: { xs: 4, md: 8 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.8rem' },
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 3,
                  lineHeight: 1.2,
                  transition: 'color 0.3s ease',
                }}
              >
                Your entire plant, one conversation away
              </Typography>
              
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)',
                  mb: 4,
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                Access decades of operational expertise combined with AI-powered insights through simple, natural conversations.
              </Typography>

              {/* Features List */}
              <Box>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 24,
                        color: isDark ? '#009BE4' : '#2563EB',
                        mr: 2,
                        mt: 0.25,
                        flexShrink: 0,
                        transition: 'color 0.3s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                        lineHeight: 1.6,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplitImageSection;

