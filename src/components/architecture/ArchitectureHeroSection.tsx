import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const ArchitectureHeroSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    h1FontSize,
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.3);
      }

      if (flowRef.current) {
        tl.from(flowRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }, 0.6);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #0F1419 0%, #1A1F2E 50%, #0F1419 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: '50%',
          height: '80%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '40%',
          height: '60%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Main Title */}
        <Typography
          ref={titleRef}
          variant="h1"
          sx={{
            fontSize: h1FontSize,
            fontWeight: 800,
            color: isDark ? '#FFFFFF' : '#0F172A',
            mb: 3,
            lineHeight: 1.1,
            background: isDark
              ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
              : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          How It All Comes Together
        </Typography>

        {/* Subtitle */}
        <Typography
          ref={subtitleRef}
          variant="h4"
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          Behind the simple chat interface is a powerful architecture that connects to your systems, 
          organizes plant knowledge, and delivers explanations you can trust.
        </Typography>

        {/* Process Flow */}
        <Box
          ref={flowRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 2 },
            mt: 6,
            flexWrap: 'wrap',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {[
            { label: 'Connect', color: isDark ? '#60A5FA' : '#3B82F6' },
            { label: 'Map', color: isDark ? '#34D399' : '#10B981' },
            { label: 'Ask', color: isDark ? '#FBBF24' : '#F59E0B' },
            { label: 'Answer', color: isDark ? '#F472B6' : '#EC4899' },
          ].map((step, index) => (
            <React.Fragment key={step.label}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${step.color}20 0%, ${step.color}40 100%)`,
                    border: `2px solid ${step.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: `0 8px 32px ${step.color}40`,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 700,
                      color: step.color,
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 600,
                    color: isDark ? '#FFFFFF' : '#1E293B',
                  }}
                >
                  {step.label}
                </Typography>
              </Box>

              {index < 3 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 40,
                    height: 2,
                    background: `linear-gradient(90deg, ${step.color} 0%, ${[
                      isDark ? '#34D399' : '#10B981',
                      isDark ? '#FBBF24' : '#F59E0B', 
                      isDark ? '#F472B6' : '#EC4899'
                    ][index]} 100%)`,
                    borderRadius: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Bottom tagline */}
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#94A3B8',
            mt: 6,
            fontStyle: 'italic',
          }}
        >
          From plant data to clear answers
        </Typography>
      </Container>
    </Box>
  );
};