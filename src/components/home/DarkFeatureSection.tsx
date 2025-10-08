import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import { 
  FlashOn, 
  GpsFixed, 
  AttachMoney, 
  Link as LinkIcon 
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import img_ai from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { 
    icon: GpsFixed, 
    title: "Stop guessing what's wrong",
    description: "Alarms and trends flood in, but what's really happening? ChatAPC cuts through the noise and tells you exactly what's limiting your process — and why." 
  },
  { 
    icon: FlashOn, 
    title: 'Troubleshoot in seconds, not hours', 
    description: 'No more digging through historian data or waiting for the engineer on call. Get root cause analysis while the issue is still happening.' 
  },
  { 
    icon: AttachMoney, 
    title: 'Unlock hidden margin', 
    description: "Most constraints are invisible until someone looks. ChatAPC identifies what's limiting your unit and shows you how much it's costing — every shift." 
  },
  { 
    icon: LinkIcon, 
    title: 'Keep expertise alive', 
    description: 'Decades of process knowledge walk out the door with retiring engineers. ChatAPC captures that expertise and makes it available to everyone — from new hires to veterans.' 
  },
];

const DarkFeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified card animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Remove heavy parallax animations

      // Simplified text animation
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#7C3AED'}
      sx={{
        width: '100%',
        py: { xs: 10, md: 15 },
        // Special scaling for medium screens where sidebar causes issues
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 12,
        },
        '@media (min-width: 1550px)': {
          py: 15,
        },
        position: 'relative',
        zIndex: 2,
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.03) 0%, rgba(10, 14, 46, 0.5) 50%, rgba(13, 24, 66, 0.4) 100%)'
          : 'linear-gradient(135deg, rgba(124, 58, 237, 0.02) 0%, rgba(255, 255, 255, 0.99) 20%, rgba(254, 254, 254, 0.98) 50%, rgba(252, 252, 252, 0.95) 80%, rgba(250, 250, 250, 0.9) 100%)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'radial-gradient(circle at 20% 50%, rgba(0, 155, 228, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(37, 99, 235, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: isDark 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 155, 228, 0.3) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.5) 50%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, md: 3 },
          // Reduce width on medium screens where sidebar is present
          '@media (min-width: 960px) and (max-width: 1549px)': {
            maxWidth: '950px',
            px: 2.5,
          },
          '@media (min-width: 1550px)': {
            maxWidth: '1200px',
            px: 3,
          },
        }}
      >
        {/* Section Header */}
        <Box ref={textRef} sx={{ 
          textAlign: 'center', 
          mb: { xs: 10, md: 10 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mb: 8,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '2.8rem',
              },
            }}
          >
            Stop reacting. Start understanding.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              maxWidth: 700,
              mx: 'auto',
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.15rem',
                maxWidth: 650,
              },
            }}
          >
            Every plant faces the same challenges. ChatAPC solves them.
          </Typography>
        </Box>

        {/* Decorative Image that sinks down */}
        <Box
          ref={imageRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 850, md: 850 },
            height: { xs: 220, md: 320 },
            mx: 'auto',
            mb: { xs: 8, md: 8 },
            borderRadius: '4px',
            overflow: 'hidden',
            border: isDark 
              ? '1px solid rgba(0, 155, 228, 0.25)' 
              : '1px solid rgba(124, 58, 237, 0.2)',
            boxShadow: isDark 
              ? '0 20px 70px rgba(0, 155, 228, 0.2)' 
              : '0 20px 70px rgba(124, 58, 237, 0.15)',
            zIndex: 0,
            transition: 'all 0.3s ease',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              maxWidth: 750,
              height: 280,
              mb: 6,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.25) 0%, rgba(10, 14, 46, 0.5) 100%)'
                : 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(241, 245, 249, 0.3) 100%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            component="img"
            src={img_ai}
            alt="Industrial AI Operations"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Feature Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{
          '@media (min-width: 960px) and (max-width: 1549px)': {
          },
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    padding: { xs: 3, md: 4 },
                    borderRadius: '4px',
                    background: isDark 
                      ? 'rgba(255, 255, 255, 0.02)' 
                      : 'rgba(255, 255, 255, 0.98)',
                    border: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid rgba(124, 58, 237, 0.12)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isDark ? 'none' : '0 8px 32px rgba(124, 58, 237, 0.08)',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      padding: 3,
                    },
                    '&:hover': {
                      background: isDark 
                        ? 'rgba(255, 255, 255, 0.04)' 
                        : 'rgba(255, 255, 255, 1)',
                      border: isDark 
                        ? '1px solid rgba(0, 155, 228, 0.2)' 
                        : '1px solid rgba(124, 58, 237, 0.3)',
                      transform: 'translateY(-6px)',
                      boxShadow: isDark ? 'none' : '0 12px 40px rgba(124, 58, 237, 0.15)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: { xs: 52, md: 56 },
                      height: { xs: 52, md: 56 },
                      borderRadius: '4px',
                      background: isDark 
                        ? 'rgba(0, 155, 228, 0.1)' 
                        : 'rgba(124, 58, 237, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'background 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        width: 52,
                        height: 52,
                        mb: 2.5,
                      },
                      '&:hover': {
                        background: isDark 
                          ? 'rgba(0, 155, 228, 0.15)' 
                          : 'rgba(124, 58, 237, 0.18)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Icon sx={{ 
                      fontSize: { xs: 28, md: 32 },
                      color: isDark ? '#009BE4' : '#7C3AED',
                      transition: 'all 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: 28,
                      },
                    }} />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.4rem' },
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                      mb: 2,
                      lineHeight: 1.3,
                      transition: 'color 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '1.25rem',
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.95rem',
                      },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default DarkFeatureSection;

