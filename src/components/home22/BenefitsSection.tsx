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
    stat: '$1M-$4M',
    statLabel: 'Annual Value',
  },
  {
    icon: AccessTime,
    title: 'Time Saved',
    description: 'Replaces hours of manual trend-hunting with instant answers.',
    detail: 'Get insights in seconds, not hours. Focus on decisions instead of data collection.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
    stat: 'Up to 70%',
    statLabel: 'Time Reduction',
  },
  {
    icon: School,
    title: 'Knowledge Retention',
    description: 'Captures and shares expertise across all shifts.',
    detail: 'Plant knowledge stays accessible. New engineers and operators learn faster with AI-guided insights.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
    stat: '24/7',
    statLabel: 'Expert Access',
  },
];

export const BenefitsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize, 
    bodyLargeFontSize, 
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

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
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 1.2,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
          });

          // Continuous floating animation
          gsap.to(card, {
            y: -8,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3,
          });
        }
      });

      // ROI statement animation
      if (roiRef.current) {
        gsap.from(roiRef.current, {
          scrollTrigger: {
            trigger: roiRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 0.8,
        });
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
                    if (el) cardsRef.current[index] = el as HTMLDivElement;
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
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      border: isDark
                        ? `1px solid ${benefit.color}40`
                        : `1px solid ${benefit.color}30`,
                      boxShadow: isDark
                        ? `0 40px 80px -12px ${benefit.color}20, 0 0 0 1px ${benefit.color}10`
                        : `0 40px 80px -12px ${benefit.color}20, 0 0 0 1px ${benefit.color}15`,
                      '& .benefit-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        background: benefit.gradient,
                      },
                      '& .benefit-stat': {
                        transform: 'scale(1.05)',
                      },
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: benefit.bgGradient,
                      borderRadius: '32px',
                      opacity: 0,
                      transition: 'opacity 0.6s ease',
                      zIndex: -1,
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
                          ? `${benefit.color}20`
                          : `${benefit.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        transition: 'all 0.4s ease',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '24px',
                          background: benefit.gradient,
                          opacity: 0.1,
                          transition: 'opacity 0.4s ease',
                        },
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40, color: benefit.color, zIndex: 1 }} />
                    </Box>

                    {/* Stat */}
                    <Box
                      className="benefit-stat"
                      sx={{
                        mb: 3,
                        transition: 'transform 0.4s ease',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '2.5rem',
                          fontWeight: 800,
                          background: benefit.gradient,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1,
                          mb: 1,
                        }}
                      >
                        {benefit.stat}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(71, 85, 105, 0.8)',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {benefit.statLabel}
                      </Typography>
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
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark
                ? '2px solid rgba(255, 255, 255, 0.1)'
                : '2px solid rgba(0, 0, 0, 0.05)',
              boxShadow: isDark
                ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                : '0 20px 40px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
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