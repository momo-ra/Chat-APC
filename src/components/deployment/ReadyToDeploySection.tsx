import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const readyFeatures = [
  {
    title: 'Lightweight Footprint',
    description: 'Minimal resource requirements mean ChatAPC can run alongside existing systems without performance impact. Efficient architecture maximizes value from your current hardware investments.',
  },
  {
    title: 'Security-First Design',
    description: 'Built from the ground up with industrial cybersecurity principles. Every component undergoes rigorous security testing to protect your critical operational data.',
  },
  {
    title: 'Adaptive Integration',
    description: 'Designed to enhance your existing environment, not replace it. ChatAPC works with your current systems, policies, and workflows to deliver immediate value.',
  },
];

const ReadyToDeploySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    sectionPadding,
    h2FontSize,
    bodyFontSize,
  } = useResponsiveLayout();

  const accentColor = { light: '#10B981', dark: '#34D399' };

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

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
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
            Deployment Ready
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              lineHeight: 1.2,
            }}
          >
            Ready to Deploy in Your Environment
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 5 },
          }}
        >
          {readyFeatures.map((feature, index) => (
            <Box
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el as HTMLDivElement;
              }}
              sx={{
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
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: bodyFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ReadyToDeploySection;