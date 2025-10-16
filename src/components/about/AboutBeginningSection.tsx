import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Building2, Clock, Gauge } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutBeginningSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    sectionPadding, 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize, 
    bodyFontSize, 
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const highlights = [
    {
      icon: Building2,
      text: "Refineries, chemical plants, and energy sites",
    },
    {
      icon: Clock,
      text: "24/7 operations, middle-of-the-night decisions",
    },
    {
      icon: Gauge,
      text: "Millions at stake with every optimization",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (headerRef.current) {
        tl.from(headerRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        }, 0);
      }

      if (imageRef.current) {
        tl.from(imageRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.2);
      }

      if (contentRef.current) {
        tl.from(contentRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.3);
      }

      if (highlightsRef.current.length > 0) {
        tl.from(highlightsRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, 0.6);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
        transition: 'background 0.3s ease',
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
        <Box 
          ref={headerRef}
          sx={{ 
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isDark ? '#009BE4' : '#2563EB',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Chapter 01
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            The Beginning
          </Typography>
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
              transition: 'color 0.3s ease',
            }}
          >
            We didn't start in Silicon Valley.
          </Typography>
        </Box>

        {/* Content Grid */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Image Side */}
          <Grid item xs={12} lg={6}>
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isDark
                  ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                  : '0 20px 60px rgba(0, 0, 0, 0.15)',
                background: isDark
                  ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                  : 'linear-gradient(135deg, #475569 0%, #334155 100%)',
              }}
            >
              {/* Control room aesthetic overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.2), transparent 50%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.2), transparent 50%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Gauge size={80} style={{ color: '#60A5FA', opacity: 0.5 }} />
                <Typography
                  sx={{
                    color: '#94A3B8',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                  }}
                >
                  Control Room Operations
                </Typography>
              </Box>

              {/* Floating badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -24,
                  right: -24,
                  backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: isDark
                    ? '0 10px 40px rgba(0, 0, 0, 0.5)'
                    : '0 10px 40px rgba(0, 0, 0, 0.2)',
                  p: 3,
                  border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: isDark ? '#009BE4' : '#2563EB',
                    transition: 'color 0.3s ease',
                  }}
                >
                  20+
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Years Experience
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Content Side */}
          <Grid item xs={12} lg={6}>
            <Box ref={contentRef} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                sx={{
                  fontSize: bodyFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                We started in control rooms — surrounded by alarms, trends, and
                operators making tough calls under pressure.
              </Typography>

              <Typography
                sx={{
                  fontSize: bodyFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                For years, our team at Alpha Process Control worked side by side with
                engineers and operators in refineries, chemical plants, and energy sites.
                We tuned controllers, solved constraint problems, and optimized
                processes — sometimes in the middle of the night, sometimes when
                every decision meant millions for the plant.
              </Typography>

              <Typography
                sx={{
                  fontSize: bodyFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                Our roots run deep in the trenches of industrial operations. We've felt the weight of critical decisions, understood the complexity of real-time process
                management, and experienced firsthand the challenges that keep operators alert during overnight shifts. This isn't theoretical knowledge — it's
                earned through countless hours in the field, troubleshooting systems when stakes were highest.
              </Typography>

              {/* Highlights */}
              <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <Box
                      key={index}
                      ref={(el) => {
                        if (el) highlightsRef.current[index] = el as HTMLDivElement;
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          borderRadius: '8px',
                          backgroundColor: isDark
                            ? 'rgba(0, 155, 228, 0.15)'
                            : 'rgba(219, 234, 254, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background-color 0.3s ease',
                        }}
                      >
                        <Icon size={20} style={{ 
                          color: isDark ? '#009BE4' : '#2563EB',
                          transition: 'color 0.3s ease' 
                        }} />
                      </Box>
                      <Typography
                        sx={{
                          pt: 1,
                          fontSize: bodyFontSize,
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {highlight.text}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
