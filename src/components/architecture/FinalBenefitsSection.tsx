import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import { 
  Hub, 
  Psychology, 
  Chat,
  PlayArrow
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: 'Connected',
    subtitle: 'To your existing systems',
    description: 'Seamlessly integrate with your current infrastructure without disruption',
    icon: Hub,
    color: { light: '#3B82F6', dark: '#60A5FA' },
  },
  {
    title: 'Contextual',
    subtitle: 'Understands your plant',
    description: 'Built-in knowledge of your processes, equipment, and operational constraints',
    icon: Psychology,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Conversational',
    subtitle: 'Just ask in plain English',
    description: 'No technical expertise required — communicate naturally with your plant data',
    icon: Chat,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    title: 'Actionable',
    subtitle: 'Clear answers you can trust',
    description: 'Receive specific, reliable insights that drive immediate operational decisions',
    icon: PlayArrow,
    color: { light: '#EC4899', dark: '#F472B6' },
  },
];

export const FinalBenefitsSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding 
  } = useResponsiveLayout();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '-20%',
          width: '60%',
          height: '80%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 800,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 4,
              lineHeight: 1.1,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Complete Solution
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Four key capabilities that transform how you interact with your plant data
          </Typography>
        </Box>

        {/* Benefits Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                elevation={0}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: isDark 
                    ? `1px solid rgba(71, 85, 105, 0.3)`
                    : `1px solid rgba(226, 232, 240, 0.8)`,
                  borderRadius: 4,
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 25px 80px ${benefit.color.dark}25`
                      : `0 25px 80px ${benefit.color.light}20`,
                    borderColor: benefit.color[isDark ? 'dark' : 'light'],
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${benefit.color[isDark ? 'dark' : 'light']} 0%, ${benefit.color[isDark ? 'dark' : 'light']}80 100%)`,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center' }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                      background: `${benefit.color[isDark ? 'dark' : 'light']}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 40,
                        color: benefit.color[isDark ? 'dark' : 'light'],
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 800,
                      color: benefit.color[isDark ? 'dark' : 'light'],
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {benefit.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#334155',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {benefit.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 6, md: 8 },
            background: isDark
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
            borderRadius: 4,
            border: isDark
              ? '1px solid rgba(59, 130, 246, 0.2)'
              : '1px solid rgba(59, 130, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: isDark
                ? 'conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.1) 0deg, rgba(139, 92, 246, 0.1) 180deg, rgba(59, 130, 246, 0.1) 360deg)'
                : 'conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0.05) 0deg, rgba(139, 92, 246, 0.05) 180deg, rgba(59, 130, 246, 0.05) 360deg)',
              animation: 'rotate 20s linear infinite',
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Experience the Future of Process Operations
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Transform complex industrial data into clear, actionable insights that drive better decisions and improved performance.
          </Typography>
        </Box>
      </Container>

      {/* Add rotation keyframes */}
      <Box
        component="style"
        sx={{
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      />
    </Box>
  );
};