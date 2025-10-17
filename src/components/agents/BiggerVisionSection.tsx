import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const visionItems = [
  {
    title: 'Connect with external apps',
    subtitle: 'historians, planning, reporting',
    description: 'Seamlessly integrate with your existing tools and systems',
    icon: Hub,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Collaborate with other AI agents',
    subtitle: 'insights move across operations, maintenance, and supply chain',
    description: 'Create a connected intelligence network across your organization',
    icon: Groups,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    title: 'Scale across plants and enterprises',
    subtitle: 'making ChatAPC the hub of connected decision-making',
    description: 'Expand intelligent operations throughout your entire enterprise',
    icon: Business,
    color: { light: '#EC4899', dark: '#F472B6' },
  },
];

export const BiggerVisionSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
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
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });

      // Final section animation
      if (finalRef.current) {
        gsap.from(finalRef.current, {
          scrollTrigger: {
            trigger: finalRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
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
        {/* Section Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: isDark ? '#60A5FA' : '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Future Vision
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            The Bigger Vision
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
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
              color: isDark ? '#60A5FA' : '#3B82F6',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Our vision is to:
          </Typography>
        </Box>

        {/* Vision Items - Left Border Style */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, md: 5 },
            mb: { xs: 10, md: 14 },
          }}
        >
          {visionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) visionRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '80px 1fr' },
                  gap: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                  background: 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: item.color[isDark ? 'dark' : 'light'],
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${item.color.dark}10 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${item.color.light}08 0%, transparent 100%)`,
                    '& .vision-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box
                  className="vision-icon"
                  sx={{
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    borderRadius: 2,
                    background: item.color[isDark ? 'dark' : 'light'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    boxShadow: `0 8px 24px ${item.color[isDark ? 'dark' : 'light']}30`,
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: { xs: 32, md: 36 },
                      color: '#FFFFFF',
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
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
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: item.color[isDark ? 'dark' : 'light'],
                      mb: 2,
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                      maxWidth: 700,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Final Message & CTA */}
        <Box
          ref={finalRef}
          sx={{
            position: 'relative',
            pt: { xs: 8, md: 10 },
            borderTop: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 4,
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Digital Colleagues Who Detect, Explain, and Unlock
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
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
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => navigate('/demo')}
              sx={{
                background: isDark ? '#60A5FA' : '#3B82F6',
                color: '#FFFFFF',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: isDark
                  ? '0 8px 32px rgba(96, 165, 250, 0.3)'
                  : '0 8px 32px rgba(59, 130, 246, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(96, 165, 250, 0.4)'
                    : '0 12px 40px rgba(59, 130, 246, 0.3)',
                  background: isDark ? '#60A5FA' : '#3B82F6',
                  filter: 'brightness(1.1)',
                },
              }}
            >
              Start Your Journey
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<CalendarToday />}
              onClick={() => navigate('/company/contact')}
              sx={{
                borderColor: isDark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(226, 232, 240, 1)',
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 2,
                borderWidth: 2,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: isDark ? '#60A5FA' : '#3B82F6',
                  color: isDark ? '#60A5FA' : '#3B82F6',
                  background: isDark 
                    ? 'rgba(96, 165, 250, 0.05)' 
                    : 'rgba(59, 130, 246, 0.03)',
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
    </Box>
  );
};