import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const scaleSteps = [
  {
    title: 'Start Small',
    description: 'Begin with a single process unit or production line. Minimal initial investment with immediate value demonstration for stakeholders and operators.',
  },
  {
    title: 'Scale Gradually',
    description: 'Add agents and connectors step by step as your confidence grows. Each expansion builds on proven success, reducing implementation risk.',
  },
  {
    title: 'Enterprise-Wide',
    description: 'Expand across multiple sites and facilities. Centralized management with distributed deployment maintains performance and security standards.',
  },
];

const ScalableArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const accentColor = { light: '#EC4899', dark: '#F472B6' };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: sectionPadding,
        position: 'relative',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: accentColor[isDark ? 'dark' : 'light'],
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Scalability
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Scalable Architecture for Growth
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              lineHeight: 1.7,
              maxWidth: 800,
            }}
          >
            Performance engineered for high-speed, real-time data streams processing thousands of tags per second without compromising system responsiveness or data integrity.
          </Typography>
        </Box>

        {/* Scale Steps */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 5 },
          }}
        >
          {scaleSteps.map((step, index) => (
            <Box
              key={index}
              ref={(el) => {
                if (el) stepsRef.current[index] = el as HTMLDivElement;
              }}
              sx={{
                position: 'relative',
                p: { xs: 3, md: 4 },
                borderRadius: 0,
                borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                background: 'transparent',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  pl: { xs: 4, md: 5 },
                  borderLeftColor: accentColor[isDark ? 'dark' : 'light'],
                  borderLeftWidth: '3px',
                  background: isDark
                    ? `linear-gradient(90deg, ${accentColor.dark}10 0%, transparent 100%)`
                    : `linear-gradient(90deg, ${accentColor.light}08 0%, transparent 100%)`,
                },
                '&::before': {
                  content: `"${index + 1}"`,
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: isDark 
                    ? `${accentColor.dark}20`
                    : `${accentColor.light}15`,
                  lineHeight: 1,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.4rem' },
                  fontWeight: 700,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ScalableArchitectureSection;