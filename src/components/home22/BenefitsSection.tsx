import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { TrendingUp, AccessTime, School } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: TrendingUp,
    title: 'Hidden Margin',
    description: 'Finds constraints and inefficiencies automatically.',
    detail: 'Typical plants add $1M-$4M+ per year. Continuous optimization identifies profit opportunities others miss.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
  },
  {
    icon: AccessTime,
    title: 'Time Saved',
    description: 'Replaces hours of manual trend-hunting with instant answers.',
    detail: 'Get insights in seconds, not hours. Focus on decisions instead of data collection.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
  },
  {
    icon: School,
    title: 'Knowledge Retention',
    description: 'Captures and shares expertise across all shifts.',
    detail: 'Plant knowledge stays accessible. New engineers and operators learn faster with AI-guided insights.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
  },
];

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  // --- Simpler & more attractive animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header in (fade + up)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, 
            duration: 0.7, 
            ease: 'power2.out', 
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Animate cards: each fades & rises staggered (no layered float)
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate ROI statement in (fade + slight scale from 0.94)
      if (roiRef.current) {
        gsap.fromTo(
          roiRef.current,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: roiRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
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
        background: isDark
          ? 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, #111827 40%, #111827 100%)'
          : 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59, 130, 246, 0.02) 0%, #FFFFFF 40%, #FFFFFF 100%)',
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
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Transform operations into
            <Box component="span" sx={{ 
              background: isDark
                ? 'linear-gradient(135deg, #009BE4 0%, #00D4AA 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
            }}>
              continuous improvement
            </Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            ChatAPC monitors your process and detects issues early. Clear explanations turn daily operations into continuous improvement — delivering real results for process teams.
          </Typography>
        </Box>

        {/* Benefits Cards */}
        <Grid container spacing={4} sx={{ mb: 'clamp(2rem, 10vw, 4rem)', position: 'relative', zIndex: 2 }}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  elevation={0}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)'
                      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.08)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '32px',
                    overflow: 'visible',
                    transition: 'box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: isDark
                        ? `0 8px 32px -8px ${benefit.color}22, 0 1.5px 14px 2px ${benefit.color}09`
                        : `0 16px 32px -8px ${benefit.color}1C, 0 1.5px 14px 2px ${benefit.color}12`,
                      transform: 'translateY(-8px) scale(1.025)',
                      border: isDark
                        ? `1px solid ${benefit.color}33`
                        : `1px solid ${benefit.color}22`,
                      '& .benefit-icon': {
                        transform: 'scale(1.07) rotate(3deg)',
                        background: benefit.gradient,
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Icon */}
                    <Box
                      className="benefit-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '24px',
                        background: isDark
                          ? `${benefit.color}19`
                          : `${benefit.color}13`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s cubic-bezier(0.4,0,0.2,1)',
                        position: 'relative',
                        boxShadow: isDark
                          ? `0 2px 16px 0 ${benefit.color}20`
                          : `0 2px 16px 0 ${benefit.color}1A`,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '24px',
                          background: benefit.gradient,
                          opacity: 0.13,
                          transition: 'opacity 0.3s ease',
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40, color: benefit.color, zIndex: 1 }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)',
                          mb: 2,
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                          mb: 3,
                          fontWeight: 500,
                          lineHeight: 1.6,
                        }}
                      >
                        {benefit.description}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                          lineHeight: 1.7,
                          fontSize: '0.95rem',
                        }}
                      >
                        {benefit.detail}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* ROI Statement */}
        <Box
          ref={roiRef}
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 8,
              py: 4,
              borderRadius: '50px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.09) 0%, rgba(139, 92, 246, 0.10) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.10) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark
                ? '2px solid rgba(255, 255, 255, 0.08)'
                : '2px solid rgba(0, 0, 0, 0.045)',
              boxShadow: isDark
                ? '0 12px 32px rgba(0, 0, 0, 0.25)'
                : '0 12px 32px rgba(0, 0, 0, 0.09)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'clamp(1.20rem, 2.5vw, 1.65rem)',
                fontWeight: 700,
                background: isDark
                  ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ROI in as little as a few weeks — typically under 6 months
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsSection;