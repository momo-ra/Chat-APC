import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import MapIcon from '@mui/icons-material/Map';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getBackground,
  getTextColor,
  withOpacity 
} from '../shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

export const ArchitectureHeroSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { 
    containerMaxWidth, 
    containerPadding,
    sectionPadding
  } = useResponsiveLayout();

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get unified theme values
  const { colors, gradients, typography, animations, transitions, borderRadius } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const greenColor = getColor(colors.green, isDark);
  const yellowColor = getColor(colors.yellow, isDark);
  const pinkColor = getColor(colors.pink, isDark);

  const steps = [
    { 
      label: 'Connect', 
      color: primaryColor,
      Icon: LinkIcon,
      gradient: getGradient(gradients.blue, isDark),
      description: 'Live data streams',
      colorKey: 'blue'
    },
    { 
      label: 'Map', 
      color: greenColor,
      Icon: MapIcon,
      gradient: getGradient(gradients.green, isDark),
      description: 'Process knowledge',
      colorKey: 'green'
    },
    { 
      label: 'Ask', 
      color: yellowColor,
      Icon: QuestionAnswerIcon,
      gradient: getGradient(gradients.yellow, isDark),
      description: 'Natural language',
      colorKey: 'yellow'
    },
    { 
      label: 'Answer', 
      color: pinkColor,
      Icon: CheckCircleIcon,
      gradient: getGradient(gradients.pink, isDark),
      description: 'Trusted insights',
      colorKey: 'pink'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      const tl = gsap.timeline({ defaults: { ease: animations.easing.easeOut } });

      if (titleRef.current) {
        tl.from(titleRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: animations.duration.normal,
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.4'
        );
      }

      if (flowRef.current) {
        tl.from(
          flowRef.current.children,
          {
            y: 50,
            scale: 0.8,
            opacity: 0,
            rotationY: 45,
            duration: animations.duration.normal,
            stagger: 0.12,
            ease: animations.easing.bounce,
          },
          '-=0.3'
        );
      }

      // Floating animation for orbit rings
      orbitRefs.current.forEach((orbit, index) => {
        if (orbit) {
          gsap.to(orbit, {
            y: '+=15',
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
          });
        }
      });

      // Particle animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, index) => {
          gsap.to(particle, {
            y: `+=${gsap.utils.random(-30, 30)}`,
            x: `+=${gsap.utils.random(-20, 20)}`,
            opacity: gsap.utils.random(0.3, 0.8),
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isDark, animations]);

  return (
    <Box
      ref={heroRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: sectionPadding,
        pt: { xs: 16, md: 16 },
        background: 'transparent',
        minHeight: { xs: '90vh', md: '95vh' },
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getBackground('radialBlue', isDark),
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating particles */}
      <Box
        ref={particlesRef}
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.4,
        }}
      >
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: 4, md: 6 },
              height: { xs: 4, md: 6 },
              borderRadius: borderRadius.full,
              background: primaryColor,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Main Title */}
        <Typography
          ref={titleRef}
          variant="h1"
          component="h1"
          sx={{
            fontSize: {
              xs: 'clamp(2.5rem, 8vw, 3.5rem)',
              md: 'clamp(3.5rem, 6vw, 5rem)',
            },
            fontWeight: typography.h1.weight,
            color: getTextColor('primary', isDark),
            mb: 4,
            lineHeight: typography.h1.lineHeight,
            letterSpacing: '-0.03em',
            position: 'relative',
            background: getGradient(gradients.multiColor, isDark),
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'gradientShift 8s ease-in-out infinite',
            '@keyframes gradientShift': {
              '0%, 100%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
            },
          }}
        >
          How It All Comes Together
        </Typography>

        {/* Subtitle */}
        <Typography
          ref={subtitleRef}
          variant="h4"
          sx={{
            fontSize: typography.bodyLarge.size,
            color: getTextColor('muted', isDark),
            mb: 8,
            maxWidth: '850px',
            mx: 'auto',
            lineHeight: typography.bodyLarge.lineHeight,
            fontWeight: typography.bodyLarge.weight,
          }}
        >
          Behind the simple chat interface is a powerful architecture that connects to your systems, 
          organizes plant knowledge, and delivers explanations you can trust.
        </Typography>

        {/* Process Flow - Connected Timeline Design */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '1200px',
            mx: 'auto',
            mt: 8,
          }}
        >
          {/* Central animated line */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 100, md: '100%' },
              left: { xs: '50%', md: 0 },
              width: { xs: 3, md: '100%' },
              height: { xs: '80%', md: 3 },
              transform: { xs: 'translateX(-50%)', md: 'translateY(-50%)' },
              background: isDark
                ? `linear-gradient(90deg, ${primaryColor} 0%, ${greenColor} 33%, ${yellowColor} 66%, ${pinkColor} 100%)`
                : `linear-gradient(90deg, ${primaryColor} 0%, ${greenColor} 33%, ${yellowColor} 66%, ${pinkColor} 100%)`,
              borderRadius: borderRadius.sm,
              opacity: 0.3,
              zIndex: 0,
              display: { xs: 'block', md: 'block' },
              '@media (max-width: 959px)': {
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${greenColor} 33%, ${yellowColor} 66%, ${pinkColor} 100%)`,
              },
            }}
          />

          <Box
            ref={flowRef}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 8, md: 0 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={step.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  flex: { xs: 'none', md: 1 },
                  width: { xs: '100%', md: 'auto' },
                  maxWidth: { xs: 280, md: 'none' },
                }}
              >
                {/* Large iconic circle */}
                <Box
                  ref={(el) => (orbitRefs.current[index] = el as HTMLDivElement)}
                  sx={{
                    position: 'relative',
                    width: { xs: 140, md: 160 },
                    height: { xs: 140, md: 160 },
                    cursor: 'pointer',
                    transition: transitions.allSlow,
                    
                    '&:hover': {
                      transform: 'scale(1.15)',
                      '& .icon-container': {
                        boxShadow: `0 20px 60px ${withOpacity(step.color, 0.44)}`,
                      },
                      '& .outer-ring': {
                        transform: 'scale(1.2)',
                        opacity: 1,
                      },
                      '& .pulse-ring': {
                        animation: 'pulse-expand 1.5s ease-out infinite',
                      },
                    },
                  }}
                >
                  {/* Pulse rings */}
                  {[0, 1, 2].map((ring) => (
                    <Box
                      key={ring}
                      className="pulse-ring"
                      sx={{
                        position: 'absolute',
                        inset: -15 - ring * 15,
                        borderRadius: borderRadius.full,
                        border: `2px solid ${step.color}`,
                        opacity: 0.2 - ring * 0.05,
                        animation: `pulse-expand 2s ease-out infinite`,
                        animationDelay: `${ring * 0.3}s`,
                        '@keyframes pulse-expand': {
                          '0%': {
                            transform: 'scale(0.95)',
                            opacity: 0.3,
                          },
                          '50%': {
                            opacity: 0.1,
                          },
                          '100%': {
                            transform: 'scale(1.05)',
                            opacity: 0,
                          },
                        },
                      }}
                    />
                  ))}

                  {/* Rotating outer ring */}
                  <Box
                    className="outer-ring"
                    sx={{
                      position: 'absolute',
                      inset: -12,
                      borderRadius: borderRadius.full,
                      border: `3px solid ${withOpacity(step.color, 0.19)}`,
                      borderTopColor: step.color,
                      opacity: 0.6,
                      transition: transitions.allSlow,
                      animation: 'rotate 8s linear infinite',
                      '@keyframes rotate': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  />

                  {/* Main icon circle */}
                  <Box
                    className="icon-container"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: borderRadius.full,
                      background: step.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 10px 40px ${withOpacity(step.color, 0.31)}`,
                      transition: transitions.normal,
                      border: isDark 
                        ? `3px solid ${withOpacity('#FFFFFF', 0.1)}` 
                        : `3px solid ${withOpacity('#000000', 0.05)}`,
                      
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: borderRadius.full,
                        background: `radial-gradient(circle at 30% 30%, ${withOpacity('#FFFFFF', 0.3)} 0%, transparent 60%)`,
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    <step.Icon
                      sx={{
                        fontSize: { xs: '3.5rem', md: '4rem' },
                        color: '#FFFFFF',
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                        zIndex: 1,
                      }}
                    />

                    {/* Step number overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 36,
                        height: 36,
                        borderRadius: borderRadius.full,
                        // background: step.color,
                        border: `3px solid ${step.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${withOpacity(step.color, 0.38)}`,
                        zIndex: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: step.color,
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Label and description */}
                <Box
                  sx={{
                    textAlign: 'center',
                    mt: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: typography.h4.weight,
                      color: getTextColor('primary', isDark),
                      mb: 1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      color: getTextColor('muted', isDark),
                      fontWeight: 500,
                      px: 2,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom Tagline with Pulse Effect */}
        <Box
          sx={{
            mt: 10,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: -20,
              background: isDark
                ? `radial-gradient(circle, ${withOpacity(primaryColor, 0.15)} 0%, transparent 70%)`
                : `radial-gradient(circle, ${withOpacity(primaryColor, 0.1)} 0%, transparent 70%)`,
              filter: 'blur(20px)',
              animation: 'pulse 3s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                '50%': { opacity: 1, transform: 'scale(1.1)' },
              },
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: getTextColor('muted', isDark),
              fontWeight: 500,
              position: 'relative',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              '&::before, &::after': {
                content: '"—"',
                mx: 2,
                opacity: 0.5,
              },
            }}
          >
            From plant data to clear answers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};