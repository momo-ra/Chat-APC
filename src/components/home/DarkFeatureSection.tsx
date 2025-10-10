import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Card, CardContent } from '@mui/material';
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
    description: "Alarms and trends flood in, but what's really happening? ChatAPC cuts through the noise and tells you exactly what's limiting your process — and why.",
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    glowColor: 'rgba(255, 107, 107, 0.3)',
  },
  { 
    icon: FlashOn, 
    title: 'Troubleshoot in seconds, not hours', 
    description: 'No more digging through historian data or waiting for the engineer on call. Get root cause analysis while the issue is still happening.',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    glowColor: 'rgba(78, 205, 196, 0.3)',
  },
  { 
    icon: AttachMoney, 
    title: 'Unlock hidden margin', 
    description: "Most constraints are invisible until someone looks. ChatAPC identifies what's limiting your unit and shows you how much it's costing — every shift.",
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%)',
    glowColor: 'rgba(168, 230, 207, 0.3)',
  },
  { 
    icon: LinkIcon, 
    title: 'Keep expertise alive', 
    description: 'Decades of process knowledge walk out the door with retiring engineers. ChatAPC captures that expertise and makes it available to everyone — from new hires to veterans.',
    gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)',
    glowColor: 'rgba(255, 182, 193, 0.3)',
  },
];

const UltraStylishFeatureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated header animation with magnetic effect
      if (textRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.from(textRef.current.children[0], {
          y: 80,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power4.out',
        })
        .from(textRef.current.children[1], {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        }, 0.3);
      }

      // Image with 3D tilt effect
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.9,
          rotationX: 15,
          duration: 1.5,
          ease: 'power4.out',
        });

        // Continuous floating animation
        gsap.to(imageRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });
      }

      // Advanced card animations with stagger and magnetic hover
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Entrance animation
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotationY: 15,
            duration: 1.2,
            delay: index * 0.2,
            ease: 'power4.out',
          });

          // Magnetic hover effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -15,
              rotationY: 5,
              rotationX: 5,
              duration: 0.6,
              ease: 'power3.out',
            });

            // Icon rotation on hover
            const icon = card.querySelector('.feature-icon');
            if (icon) {
              gsap.to(icon, {
                rotation: 360,
                scale: 1.1,
                duration: 0.8,
                ease: 'power2.out',
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              rotationX: 0,
              duration: 0.6,
              ease: 'power3.out',
            });

            const icon = card.querySelector('.feature-icon');
            if (icon) {
              gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
          });

          // Continuous subtle animation
          gsap.to(card, {
            y: Math.sin(index) * 5,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          });
        }
      });

      // Floating background elements
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            x: Math.cos(index * 2) * 20,
            y: Math.sin(index * 2) * 30,
            rotation: 360,
            duration: 8 + index * 2,
            repeat: -1,
            ease: 'none',
          });
        }
      });
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
        py: { xs: 12, md: 18 },
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 15,
        },
        '@media (min-width: 1550px)': {
          py: 18,
        },
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        background: isDark 
          ? 'radial-gradient(ellipse at top, rgba(0, 155, 228, 0.15) 0%, rgba(10, 14, 46, 0.8) 40%, rgba(13, 24, 66, 0.9) 100%)'
          : 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(248, 250, 252, 1) 100%)',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? `
              radial-gradient(circle at 20% 30%, rgba(0, 155, 228, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(106, 17, 203, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255, 107, 107, 0.08) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
            `,
          pointerEvents: 'none',
          animation: 'backgroundShift 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'linear-gradient(45deg, transparent 48%, rgba(0, 155, 228, 0.1) 49%, rgba(0, 155, 228, 0.1) 51%, transparent 52%)'
            : 'linear-gradient(45deg, transparent 48%, rgba(124, 58, 237, 0.06) 49%, rgba(124, 58, 237, 0.06) 51%, transparent 52%)',
          pointerEvents: 'none',
          animation: 'diagonalShift 15s linear infinite',
        },
        '@keyframes backgroundShift': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
        },
        '@keyframes diagonalShift': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      }}
    >
      {/* Floating Background Elements */}
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          key={index}
          ref={(el) => {
            if (el) floatingElementsRef.current[index] = el as HTMLDivElement;
          }}
          sx={{
            position: 'absolute',
            width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 },
            borderRadius: '50%',
            background: isDark 
              ? `linear-gradient(45deg, rgba(0, 155, 228, 0.1) 0%, rgba(106, 17, 203, 0.05) 100%)`
              : `linear-gradient(45deg, rgba(124, 58, 237, 0.08) 0%, rgba(37, 99, 235, 0.04) 100%)`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            filter: 'blur(1px)',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        />
      ))}

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, md: 3 },
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
        {/* Ultra Stylish Header */}
        <Box ref={textRef} sx={{ 
          textAlign: 'center', 
          mb: { xs: 12, md: 14 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            mb: 12,
          },
        }}>
          <Typography
            sx={{
              fontSize: { xs: '2.8rem', md: '4.5rem' },
              fontWeight: 800,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(0, 155, 228, 0.9) 50%, rgba(255, 255, 255, 0.8) 100%)'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(0, 0, 0, 0.7) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 8s ease-in-out infinite',
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textShadow: isDark 
                ? '0 0 40px rgba(0, 155, 228, 0.3)'
                : '0 0 40px rgba(124, 58, 237, 0.2)',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '3.5rem',
              },
              '@keyframes gradientShift': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
              },
            }}
          >
            Stop reacting. Start understanding.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.3rem', md: '1.6rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              maxWidth: 800,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.6,
              transition: 'all 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.4rem',
                maxWidth: 700,
              },
              '&:hover': {
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.02)',
              },
            }}
          >
            Every plant faces the same challenges. ChatAPC solves them.
          </Typography>
        </Box>

        {/* Premium Image with 3D Effects */}
        <Box
          ref={imageRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: { xs: 900, md: 1000 },
            height: { xs: 280, md: 400 },
            mx: 'auto',
            mb: { xs: 10, md: 12 },
            borderRadius: '20px',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              maxWidth: 850,
              height: 350,
              mb: 10,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              background: isDark 
                ? 'linear-gradient(45deg, rgba(0, 155, 228, 0.6), rgba(106, 17, 203, 0.4), rgba(0, 155, 228, 0.6))'
                : 'linear-gradient(45deg, rgba(124, 58, 237, 0.4), rgba(37, 99, 235, 0.3), rgba(124, 58, 237, 0.4))',
              borderRadius: '24px',
              zIndex: -1,
              filter: 'blur(8px)',
              animation: 'borderGlow 4s ease-in-out infinite',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(10, 14, 46, 0.4) 50%, rgba(106, 17, 203, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(37, 99, 235, 0.15) 100%)',
              borderRadius: '20px',
              pointerEvents: 'none',
              zIndex: 2,
            },
            '@keyframes borderGlow': {
              '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.02)' },
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
              borderRadius: '20px',
              position: 'relative',
              zIndex: 1,
              filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
            }}
          />
        </Box>

        {/* Ultra Premium Feature Cards */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
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
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'visible',
                    background: isDark 
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: isDark 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'none',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      background: feature.gradient,
                      borderRadius: '26px',
                      zIndex: -1,
                      opacity: 0,
                      filter: 'blur(10px)',
                      transition: 'opacity 0.6s ease',
                    },
                    '&:hover::before': {
                      opacity: 0.4,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isDark
                        ? `radial-gradient(circle at 50% 0%, ${feature.glowColor} 0%, transparent 70%)`
                        : `radial-gradient(circle at 50% 0%, ${feature.glowColor} 0%, transparent 70%)`,
                      borderRadius: '24px',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.6s ease',
                    },
                    '&:hover::after': {
                      opacity: 0.6,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
                    {/* Ultra Stylish Icon */}
                    <Box
                      className="feature-icon"
                      sx={{
                        width: { xs: 70, md: 80 },
                        height: { xs: 70, md: 80 },
                        borderRadius: '20px',
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        position: 'relative',
                        boxShadow: `0 8px 32px ${feature.glowColor}`,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 2,
                          borderRadius: '18px',
                          background: 'rgba(255, 255, 255, 0.2)',
                          zIndex: -1,
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: -4,
                          left: -4,
                          right: -4,
                          bottom: -4,
                          background: feature.gradient,
                          borderRadius: '24px',
                          filter: 'blur(8px)',
                          opacity: 0.3,
                          zIndex: -2,
                        },
                      }}
                    >
                      <Icon sx={{ 
                        fontSize: { xs: 32, md: 36 },
                        color: '#FFFFFF',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      }} />
                    </Box>

                    {/* Premium Typography */}
                    <Typography
                      sx={{
                        fontSize: { xs: '1.4rem', md: '1.6rem' },
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                        mb: 2.5,
                        lineHeight: 1.3,
                        background: isDark 
                          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 155, 228, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(124, 58, 237, 0.7) 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.7)',
                        lineHeight: 1.7,
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default UltraStylishFeatureSection;