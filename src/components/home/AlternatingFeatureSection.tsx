import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Security, Speed, Psychology } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Psychology,
    title: 'Process expertise',
    description: '30+ years designing APC and optimizing plants. Deep operations — from refining to petrochemicals.',
  },
  {
    icon: Speed,
    title: 'AI that understands operations',
    description: 'Built for loops, constraints, and understanding of industrial operations, not generic internet data. Speaks your technical language fluently.',
  },
  {
    icon: Security,
    title: 'Your data stays yours',
    description: 'On-premise or private cloud deployment. No data leaves your firewall. Enterprise-grade security built in from day one.',
  },
];

const AlternatingFeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simplified header image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Simplified item animations
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
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
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: isDark 
          ? 'linear-gradient(180deg, rgba(10, 14, 46, 0.8) 0%, rgba(13, 24, 66, 0.6) 50%, rgba(10, 14, 46, 0.8) 100%)'
          : 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.6) 50%, rgba(248, 250, 252, 0.8) 100%)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: isDark 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 155, 228, 0.03) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.08) 50%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Not just another AI tool — this one knows your plant
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              maxWidth: 800,
              mx: 'auto',
              transition: 'color 0.3s ease',
            }}
          >
            ChatAPC was built by people who've spent decades in control rooms and optimization design — not just AI labs.
          </Typography>
        </Box>

        {/* Decorative Image */}
        <Box
          ref={imageRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 1000,
            height: { xs: 180, md: 280 },
            mx: 'auto',
            mb: 12,
            borderRadius: 4,
            overflow: 'hidden',
            border: isDark 
              ? '1px solid rgba(106, 17, 203, 0.2)' 
              : '1px solid rgba(37, 99, 235, 0.2)',
            boxShadow: isDark 
              ? '0 25px 70px rgba(106, 17, 203, 0.25)' 
              : '0 25px 70px rgba(37, 99, 235, 0.15)',
            transition: 'all 0.3s ease',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(106, 17, 203, 0.35) 0%, rgba(13, 24, 66, 0.5) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(241, 245, 249, 0.3) 100%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            component="img"
            src={industrialAI}
            alt="Process Control Expertise"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9)',
            }}
          />
        </Box>

        {/* Features */}
        <Grid container spacing={8}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <Grid
                item
                xs={12}
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
                    alignItems: 'center',
                    gap: { xs: 4, md: 8 },
                    padding: { xs: 3, md: 6 },
                    borderRadius: 4,
                    background: isDark 
                      ? (isEven
                          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.05) 0%, rgba(13, 24, 66, 0.3) 100%)'
                          : 'linear-gradient(135deg, rgba(106, 17, 203, 0.05) 0%, rgba(13, 24, 66, 0.3) 100%)')
                      : (isEven
                          ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(255, 255, 255, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(255, 255, 255, 0.8) 100%)'),
                    border: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      background: isDark 
                        ? (isEven
                            ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.08) 0%, rgba(13, 24, 66, 0.4) 100%)'
                            : 'linear-gradient(135deg, rgba(106, 17, 203, 0.08) 0%, rgba(13, 24, 66, 0.4) 100%)')
                        : (isEven
                            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)'
                            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)'),
                      border: isDark 
                        ? '1px solid rgba(255, 255, 255, 0.1)' 
                        : '1px solid rgba(37, 99, 235, 0.2)',
                      transform: 'translateY(-8px)',
                      boxShadow: isDark ? 'none' : '0 12px 40px rgba(37, 99, 235, 0.15)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      minWidth: { xs: 80, md: 120 },
                      height: { xs: 80, md: 120 },
                      borderRadius: 3,
                      background: isDark 
                        ? (isEven
                            ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)'
                            : 'linear-gradient(135deg, rgba(106, 17, 203, 0.15) 0%, rgba(106, 17, 203, 0.05) 100%)')
                        : (isEven
                            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0.04) 100%)'
                            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isDark 
                        ? `1px solid ${isEven ? 'rgba(0, 155, 228, 0.2)' : 'rgba(106, 17, 203, 0.2)'}`
                        : `1px solid ${isEven ? 'rgba(37, 99, 235, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: { xs: 40, md: 56 },
                        color: isDark 
                          ? (isEven ? '#009BE4' : '#6A11CB')
                          : (isEven ? '#2563EB' : '#6366F1'),
                        transition: 'color 0.3s ease',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                        mb: 2,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.15rem' },
                        color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                        lineHeight: 1.8,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default AlternatingFeatureSection;

