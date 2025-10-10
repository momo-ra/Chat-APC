import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material';
import { 
  Hub, 
  Groups,
  Business,
  PlayArrow,
  CalendarToday
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const visionItems = [
  {
    title: 'Connect with external apps',
    subtitle: 'historians, planning, reporting',
    description: 'Seamlessly integrate with your existing tools and systems',
    icon: Hub,
    color: { light: '#3B82F6', dark: '#60A5FA' },
  },
  {
    title: 'Collaborate with other AI agents',
    subtitle: 'insights move across operations, maintenance, and supply chain',
    description: 'Create a connected intelligence network across your organization',
    icon: Groups,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Scale across plants and enterprises',
    subtitle: 'making ChatAPC the hub of connected decision-making',
    description: 'Expand intelligent operations throughout your entire enterprise',
    icon: Business,
    color: { light: '#8B5CF6', dark: '#A78BFA' },
  },
];

export const BiggerVisionSection: React.FC = () => {
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
  const visionRef = useRef<HTMLDivElement[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);

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

      // Vision items animation
      visionRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
          });
        }
      });

      // Final section animation
      if (finalRef.current) {
        gsap.from(finalRef.current.children, {
          scrollTrigger: {
            trigger: finalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: sectionPadding,
        background: isDark
          ? 'linear-gradient(180deg, #1A1F2E 0%, #0F1419 50%, #2D1B69 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #EEF2FF 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '10%',
          left: '-20%',
          width: '70%',
          height: '80%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
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
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 4,
              lineHeight: 1.2,
            }}
          >
            The Bigger Vision
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Together, these agents form an ecosystem: a coordinated team inside ChatAPC that you can interact with directly. And this is just the start.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              fontWeight: 600,
              color: isDark ? '#A78BFA' : '#8B5CF6',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Our vision is to:
          </Typography>
        </Box>

        {/* Vision Items */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
            gap: { xs: 6, md: 8 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {visionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                ref={(el) => {
                  if (el) visionRef.current[index] = el as HTMLDivElement;
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
                  textAlign: 'center',
                  position: 'relative',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: isDark
                      ? `0 25px 80px ${item.color.dark}25`
                      : `0 25px 80px ${item.color.light}20`,
                    borderColor: item.color[isDark ? 'dark' : 'light'],
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
                    background: `linear-gradient(90deg, ${item.color[isDark ? 'dark' : 'light']} 0%, ${item.color[isDark ? 'dark' : 'light']}80 100%)`,
                    borderRadius: '4px 4px 0 0',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 4,
                      background: `${item.color[isDark ? 'dark' : 'light']}20`,
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
                        color: item.color[isDark ? 'dark' : 'light'],
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: item.color[isDark ? 'dark' : 'light'],
                      mb: 2,
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Final Message & CTA */}
        <Box
          ref={finalRef}
          sx={{
            textAlign: 'center',
            p: { xs: 6, md: 8 },
            background: isDark
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
            borderRadius: 4,
            border: isDark
              ? '1px solid rgba(139, 92, 246, 0.3)'
              : '1px solid rgba(139, 92, 246, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Animation */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: isDark
                ? 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.1) 0deg, rgba(59, 130, 246, 0.1) 180deg, rgba(139, 92, 246, 0.1) 360deg)'
                : 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.05) 0deg, rgba(59, 130, 246, 0.05) 180deg, rgba(139, 92, 246, 0.05) 360deg)',
              animation: 'rotate 25s linear infinite',
              zIndex: -1,
            }}
          />

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
            Digital Colleagues Who Detect, Explain, and Unlock
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 6,
            }}
          >
            With ChatAPC, you don't just get answers. You interact with digital colleagues who detect, explain, and unlock — helping you run operations smarter and more profitably.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                  : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: 'white',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                  background: isDark
                    ? 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
                    : 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                },
              }}
            >
              Start Your Journey
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<CalendarToday />}
              sx={{
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(71, 85, 105, 0.3)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: isDark ? '#A78BFA' : '#8B5CF6',
                  color: isDark ? '#A78BFA' : '#8B5CF6',
                  background: isDark ? 'rgba(167, 139, 250, 0.05)' : 'rgba(139, 92, 246, 0.05)',
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
                },
              }}
            >
              Schedule Demo
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Keyframes */}
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