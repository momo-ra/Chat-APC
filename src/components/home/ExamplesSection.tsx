import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);


const ExamplesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image with zoom and fade
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        // Parallax effect disabled to prevent scroll lag
        // gsap.to(imageRef.current, {
        //   scrollTrigger: {
        //     trigger: sectionRef.current,
        //     start: 'top bottom',
        //     end: 'bottom top',
        //     scrub: 0.5,
        //   },
        //   y: -30,
        //   ease: 'none',
        // });
      }
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
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: isDark 
          ? 'linear-gradient(180deg, rgba(13, 24, 66, 0.4) 0%, rgba(0, 155, 228, 0.06) 30%, rgba(10, 14, 46, 0.5) 70%, rgba(13, 24, 66, 0.4) 100%)'
          : 'transparent',
        transition: 'background 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(0, 155, 228, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            This is ChatAPC in action.
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
            Real conversation. Real plant data. Here's how ChatAPC helps engineers understand what's happening — in plain language.
          </Typography>
        </Box>

        {/* Video Demo Container */}
        <Box
          ref={imageRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            height: { xs: 300, md: 500, lg: 600 },
            mx: 'auto',
            mb: 10,
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0, 155, 228, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 155, 228, 0.2)',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.1) 0%, rgba(10, 14, 46, 0.3) 100%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            component="img"
            src={industrialAI}
            alt="ChatAPC Demo Video"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>


      </Container>
    </Box>
  );
};

export default ExamplesSection;

