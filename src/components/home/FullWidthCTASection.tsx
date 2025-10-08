import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

gsap.registerPlugin(ScrollTrigger);

const FullWidthCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: 'power3.out',
        });
      }

      // Parallax background disabled to prevent scroll lag
      // if (sectionRef.current) {
      //   gsap.to(sectionRef.current, {
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: 'top bottom',
      //       end: 'bottom top',
      //       scrub: 2,
      //     },
      //     backgroundPosition: '50% 100%',
      //     ease: 'none',
      //   });
      // }
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
        py: { xs: 12, md: 18 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(106, 17, 203, 0.12) 50%, rgba(0, 155, 228, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.03) 0%, rgba(99, 102, 241, 0.02) 50%, rgba(37, 99, 235, 0.015) 100%)',
        backgroundSize: '200% 200%',
        backgroundPosition: '50% 0%',
        transition: 'background 0.3s ease',
        // Special scaling for medium screens where sidebar causes issues
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 14,
        },
        '@media (min-width: 1550px)': {
          py: 18,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'radial-gradient(circle at 30% 50%, rgba(0, 155, 228, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(106, 17, 203, 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(0, 155, 228, 0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
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
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.9)',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '3rem',
                mb: 2.5,
              },
            }}
          >
            Transparent AI you can trust in critical operations
          </Typography>
          
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.7)',
              mb: 6,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                fontSize: '1.3rem',
                mb: 5,
                maxWidth: 700,
              },
            }}
          >
            Experience the power of AI built specifically for industrial process control
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              '@media (min-width: 960px) and (max-width: 1549px)': {
                gap: 2.5,
              },
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
                color: '#fff',
                borderRadius: '4px',
                padding: '18px 48px',
                fontSize: '1.2rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(0, 155, 228, 0.4)',
                transition: 'all 0.3s ease',
                width: { xs: '100%', sm: 'auto' },
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  padding: '16px 40px',
                  fontSize: '1.1rem',
                },
                '&:hover': {
                  background: 'linear-gradient(135deg, #0077B6 0%, #005A87 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 155, 228, 0.5)',
                },
              }}
            >
              Request a Demo
            </Button>

            <Button
              variant="outlined"
              sx={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '4px',
                padding: '18px 48px',
                fontSize: '1.2rem',
                fontWeight: 500,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                width: { xs: '100%', sm: 'auto' },
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  padding: '16px 40px',
                  fontSize: '1.1rem',
                },
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              Download One-Pager
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FullWidthCTASection;

