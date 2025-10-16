import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import MapIcon from '@mui/icons-material/Map';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

  // Define the data for the process flow.  Each entry contains
  // a label, a color that adapts to the current theme and the
  // corresponding icon component.  Placing this definition here
  // ensures that the values are recalculated when `isDark` changes
  // without re-rendering the entire component.  Using descriptive
  // names helps keep the JSX below concise and easier to read.
  const steps = [
    { label: 'Connect', color: isDark ? '#60A5FA' : '#3B82F6', Icon: LinkIcon },
    { label: 'Map',     color: isDark ? '#34D399' : '#10B981', Icon: MapIcon },
    { label: 'Ask',     color: isDark ? '#FBBF24' : '#F59E0B', Icon: QuestionAnswerIcon },
    { label: 'Answer',  color: isDark ? '#F472B6' : '#EC4899', Icon: CheckCircleIcon },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Build a simple yet attractive animation timeline for the hero
      // section.  We adjust the durations and add a subtle scale
      // bounce effect to make the elements feel alive without being
      // distracting.  Using negative offsets makes animations overlap
      // slightly, producing a smooth cascade.
      const tl = gsap.timeline();

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      if (flowRef.current) {
        tl.from(
          flowRef.current.children,
          {
            y: 30,
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
          },
          '-=0.2'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
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
            gap: { xs: 4, md: 3 },
            mt: 6,
            flexWrap: 'wrap',
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {/* Circle with icon and step number */}
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 80, md: 90 },
                    height: { xs: 80, md: 90 },
                    borderRadius: '20%',
                    background: `linear-gradient(135deg, ${step.color}1A 0%, ${step.color}33 100%)`,
                    border: `2px solid ${step.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.05)',
                      boxShadow: `0 12px 24px ${step.color}40`,
                    },
                  }}
                >
                  {/* Icon */}
                  <step.Icon
                    sx={{
                      fontSize: { xs: '2rem', md: '2.25rem' },
                      color: step.color,
                    }}
                  />
                  {/* Step number in the corner */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 6,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 700,
                      color: step.color,
                      opacity: 0.8,
                    }}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                {/* Label */}
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

              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 50,
                    height: 2,
                    background: `linear-gradient(90deg, ${step.color} 0%, ${steps[index + 1].color} 100%)`,
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