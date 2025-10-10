import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { MessageSquare, Wrench, GraduationCap, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutBeliefSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const beliefBoxRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    sectionPadding, 
    containerMaxWidth, 
    containerPadding, 
    h2FontSize, 
    h4FontSize, 
    bodyFontSize, 
    bodyLargeFontSize 
  } = useResponsiveLayout();

  const beliefs = [
    {
      icon: MessageSquare,
      title: "Conversational",
      description: "Ask questions in plain English and get answers that make immediate sense",
      bgColor: isDark ? 'rgba(0, 155, 228, 0.15)' : 'rgba(219, 234, 254, 1)',
      iconColor: isDark ? '#009BE4' : '#2563EB',
    },
    {
      icon: Wrench,
      title: "Practical",
      description: "Every feature is built around real operational needs and workflows",
      bgColor: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(233, 213, 255, 1)',
      iconColor: isDark ? '#A855F7' : '#8B5CF6',
    },
    {
      icon: GraduationCap,
      title: "Experienced",
      description: "Backed by decades of process control expertise and field-tested knowledge",
      bgColor: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(207, 250, 254, 1)',
      iconColor: isDark ? '#06B6D4' : '#0891B2',
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

      if (beliefBoxRef.current) {
        tl.from(beliefBoxRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.2);
      }

      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }, 0.4);
      }

      if (footerRef.current) {
        tl.from(footerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.8);
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
        background: isDark
          ? 'linear-gradient(180deg, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box 
          ref={headerRef}
          sx={{ 
            textAlign: 'center',
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
            Chapter 05
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
            Our Belief
          </Typography>
        </Box>

        {/* Main Belief Statement */}
        <Box
          ref={beliefBoxRef}
          sx={{
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: isDark
                  ? 'radial-gradient(circle, rgba(0, 155, 228, 0.1), rgba(168, 85, 247, 0.05), transparent)'
                  : 'radial-gradient(circle, rgba(37, 99, 235, 0.08), rgba(139, 92, 246, 0.05), transparent)',
                filter: 'blur(40px)',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  p: 5,
                },
                boxShadow: isDark
                  ? '0 10px 40px rgba(0, 0, 0, 0.4)'
                  : '0 10px 40px rgba(0, 0, 0, 0.08)',
                background: isDark ? '#1e293b' : '#FFFFFF',
                border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Heart 
                  size={48} 
                  style={{ 
                    color: '#EF4444',
                    fill: '#EF4444',
                  }} 
                />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: h4FontSize,
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                  textAlign: 'center',
                  mb: 2,
                  lineHeight: 1.3,
                  transition: 'color 0.3s ease',
                }}
              >
                We believe technology only works if it feels like a colleague, not another system to manage.
              </Typography>
              <Typography
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  transition: 'color 0.3s ease',
                }}
              >
                That's why ChatAPC is designed the way it is: conversational, practical, and grounded
                in real plant experience. We didn't want to create another complex software tool that
                operators would need extensive training to use.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Beliefs Grid */}
        <Grid 
          container 
          spacing={{ xs: 4, md: 6 }}
          sx={{
            mb: { xs: 6, md: 8 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 6,
            },
          }}
        >
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 4, md: 5 },
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 4,
                    },
                    borderRadius: '16px',
                    background: isDark ? '#1e293b' : '#FFFFFF',
                    border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    boxShadow: isDark
                      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark
                        ? '0 20px 50px rgba(0, 155, 228, 0.2)'
                        : '0 20px 50px rgba(37, 99, 235, 0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      backgroundColor: belief.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    }}
                  >
                    <Icon size={28} style={{ color: belief.iconColor }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: h4FontSize,
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                      mb: 2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {belief.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: bodyFontSize,
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {belief.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom Statement */}
        <Typography
          ref={footerRef}
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 900,
            mx: 'auto',
            fontStyle: 'italic',
            transition: 'color 0.3s ease',
          }}
        >
          Technology should enhance human expertise, not replace it. ChatAPC amplifies the
          knowledge and intuition that experienced operators already possess.
        </Typography>
      </Container>
    </Box>
  );
};
