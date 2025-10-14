import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: '100+', 
    label: 'Man-Years of Experience', 
    description: 'Process optimization expertise',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  },
  { 
    value: '200+', 
    label: 'Optimization Projects', 
    description: 'Worldwide installations',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  { 
    value: '$300M+', 
    label: 'Value Created', 
    description: 'For our customers',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
];

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - simplified
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Company info animation - simplified
      if (companyRef.current) {
        gsap.from(companyRef.current, {
          scrollTrigger: {
            trigger: companyRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Stats animation - much simpler, no rotation
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
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
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        py: 'clamp(3rem, 10vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
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
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 'clamp(2rem, 8vw, 3rem)', position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 900,
              lineHeight: 1.1,
              mb: 6,
              letterSpacing: '-0.02em',
            }}
          >
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                  : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                mb: 2,
              }}
            >
              Made by process engineers —
            </Box>
            <Box
              component="span"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              not just AI labs
            </Box>
          </Typography>
          
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: bodyLargeFontSize,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                mb: 3,
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Decades of experience in control rooms and commissioning units. Our team
              has designed optimization systems for plants worldwide. ChatAPC captures
              that expertise.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.25rem',
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(100, 116, 139, 1)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Combining engineering rigor with conversational intelligence creates trust.
              We understand your challenges because we've solved them before.
            </Typography>
          </Box>
        </Box>

        {/* Company Info */}
        <Box
          ref={companyRef}
          sx={{
            textAlign: 'center',
            mb: 'clamp(2rem, 8vw, 3rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 'clamp(2rem, 6vw, 4rem)',
              py: 'clamp(1.5rem, 5vw, 3rem)',
              borderRadius: 'clamp(20px, 3vw, 32px)',
              background: isDark
                ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark
                ? '2px solid rgba(255, 255, 255, 0.08)'
                : '2px solid rgba(0, 0, 0, 0.05)',
              boxShadow: isDark
                ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                : '0 20px 40px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 'clamp(0.75rem, 2vw, 1rem)',
                textAlign: 'center',
              }}
            >
              Alpha Process Control
            </Typography>
            
            <Typography
              sx={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                fontWeight: 500,
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: 1.6,
              }}
            >
              Leaders in advanced process control and optimization. Proven results across refining, chemicals, and manufacturing.
            </Typography>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid 
          container 
          spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }} 
          sx={{ 
            maxWidth: '100%',
            mx: 'auto', 
            position: 'relative', 
            zIndex: 2,
            justifyContent: 'center',
          }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <Box
                ref={el => { if (el) statsRef.current[index] = el as HTMLDivElement; }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 'clamp(2rem, 2vw, 3rem)',
                  borderRadius: 'clamp(20px, 3vw, 28px)',
                  background: isDark
                    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)'
                    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.6) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformOrigin: 'center',
                  width: '100%',
                  height: '100%',
                  minHeight: 'clamp(200px, 30vw, 280px)',
                  maxHeight: 360,
                  gap: 0,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 1) 100%)',
                    boxShadow: isDark
                      ? '0 20px 40px rgba(0, 0, 0, 0.4)'
                      : '0 20px 40px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                {/* Content wrapper for vertical centering and even spacing */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    flex: 1,
                  }}
                >
                  <Typography
                    className="stat-value"
                    sx={{
                      fontSize: 'clamp(2rem, 3vw, 3.3rem)',
                      fontWeight: 800,
                      background: stat.gradient,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                      width: '100%',
                      wordBreak: 'break-word',
                      textOverflow: 'ellipsis',
                      mb: 0.5,
                      pb: 0,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 1)': 'rgba(15, 23, 42, 1)',
                      lineHeight: 1.35,
                      width: '100%',
                      wordBreak: 'break-word',
                      px: 1,
                      mb: 0.5,
                      pb: 0,
                      minHeight: 44, // ensures label is always same vertical space
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                      color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(100, 116, 139, 1)',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      width: '100%',
                      px: 1,
                      wordBreak: 'break-word',
                      minHeight: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 0,
                    }}
                  >
                    {stat.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;