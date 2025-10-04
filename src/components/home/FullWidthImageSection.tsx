import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const FullWidthImageSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax effect
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -80,
          ease: 'none',
        });
      }

      // Overlay text animation
      if (overlayTextRef.current) {
        gsap.from(overlayTextRef.current, {
          scrollTrigger: {
            trigger: overlayTextRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="dark"
      sx={{
        width: '100%',
        position: 'relative',
        height: { xs: 400, md: 600 },
        overflow: 'hidden',
        marginY: { xs: 8, md: 12 },
      }}
    >
      {/* Background Image */}
      <Box
        ref={imageRef}
        sx={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%',
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src={industrialAI}
          alt="Industrial Control Systems"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7) contrast(1.1)',
          }}
        />
      </Box>

      {/* Gradient Overlays */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.4) 0%, rgba(106, 17, 203, 0.3) 50%, rgba(10, 14, 46, 0.6) 100%)',
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 14, 46, 0.5) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          ref={overlayTextRef}
          sx={{
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#fff',
              mb: 3,
              lineHeight: 1.2,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            Real-time insights from your control systems
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: 1.7,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Connect to DCS, SCADA, and historian data for instant AI-powered analysis and recommendations
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FullWidthImageSection;

