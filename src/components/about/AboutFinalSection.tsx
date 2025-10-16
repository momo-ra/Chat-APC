import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { Building, Sparkles, Users, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

export const AboutFinalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const values = [
    {
      icon: Building,
      title: "Real Experience",
      description: "Decades in refineries, chemical plants, and energy facilities",
      gradient: isDark
        ? 'linear-gradient(135deg, #009BE4, #06B6D4)'
        : 'linear-gradient(135deg, #2563EB, #06B6D4)',
    },
    {
      icon: Sparkles,
      title: "AI Innovation",
      description: "Cutting-edge technology designed specifically for industrial operations",
      gradient: isDark
        ? 'linear-gradient(135deg, #A855F7, #EC4899)'
        : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    },
    {
      icon: Users,
      title: "Your Partner",
      description: "An expert advisor available 24/7 to support your operational decisions",
      gradient: isDark
        ? 'linear-gradient(135deg, #F97316, #EF4444)'
        : 'linear-gradient(135deg, #F97316, #EF4444)',
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

      if (descriptionRef.current) {
        tl.from(descriptionRef.current, {
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

      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
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
        background: 'transparent',
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
            Chapter 06
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
            At Alpha Process Control
          </Typography>
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              maxWidth: 900,
              mx: 'auto',
              lineHeight: 1.7,
              transition: 'color 0.3s ease',
            }}
          >
            We've lived the reality of process operations. We've been in your shoes, faced the
            same challenges, and felt the same pressures that come with managing complex
            industrial processes.
          </Typography>
        </Box>

        {/* Mission Statement */}
        <Typography
          ref={descriptionRef}
          sx={{
            fontSize: bodyLargeFontSize,
            color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
            textAlign: 'center',
            lineHeight: 1.7,
            maxWidth: 900,
            mx: 'auto',
            mb: { xs: 6, md: 8 },
            transition: 'color 0.3s ease',
          }}
        >
          Now we're bringing that hard-won knowledge into the age of AI — so every operator
          and engineer has an expert at their side, ready to help navigate the complexities of
          modern process control.
        </Typography>

        {/* Values Grid */}
        <Grid 
          container 
          spacing={{ xs: 4, md: 6 }}
          sx={{
            mb: { xs: 8, md: 10 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              mb: 8,
            },
          }}
        >
          {values.map((value, index) => {
            const Icon = value.icon;
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
                        ? '0 20px 50px rgba(0, 155, 228, 0.3)'
                        : '0 20px 50px rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      background: value.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    }}
                  >
                    <Icon size={28} style={{ color: '#FFFFFF' }} />
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
                    {value.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: bodyFontSize,
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA Section */}
        <Box ref={ctaRef} sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'radial-gradient(circle, rgba(0, 155, 228, 0.15), rgba(168, 85, 247, 0.1), transparent)'
                : 'radial-gradient(circle, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.08), transparent)',
              filter: 'blur(60px)',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              borderRadius: '24px',
              p: { xs: 6, md: 10 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 8,
              },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1E293B 0%, #3B82F6 50%, #1E293B 100%)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '1px solid #475569',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: h2FontSize,
                fontWeight: 700,
                color: '#FFFFFF',
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              The future of process control is here.
            </Typography>
            <Typography
              sx={{
                fontSize: bodyLargeFontSize,
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                maxWidth: 640,
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Experience the power of AI-driven process optimization built by operators, for operators.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/demo")}
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
                    boxShadow: '0 15px 40px rgba(59, 130, 246, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Try ChatAPC Demo
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/company/contact")}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
