import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Security, Speed, Psychology } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          scale: 1.1,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
        });

        // Image parallax
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 65%',
            end: 'bottom top',
            scrub: 2,
          },
          y: -50,
          scale: 1.05,
          ease: 'none',
        });
      }

      itemsRef.current.forEach((item, index) => {
        if (item) {
          const direction = index % 2 === 0 ? -100 : 100;
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            x: direction,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="dark"
      sx={{
        width: '100%',
        py: { xs: 10, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(10, 14, 46, 0.8) 0%, rgba(13, 24, 66, 0.6) 50%, rgba(10, 14, 46, 0.8) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 155, 228, 0.03) 50%, transparent 100%)',
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
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            Not just another AI tool — this one knows your plant
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 800,
              mx: 'auto',
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
            border: '1px solid rgba(106, 17, 203, 0.2)',
            boxShadow: '0 25px 70px rgba(106, 17, 203, 0.25)',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.35) 0%, rgba(13, 24, 66, 0.5) 100%)',
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
                    background: isEven
                      ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.05) 0%, rgba(13, 24, 66, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(106, 17, 203, 0.05) 0%, rgba(13, 24, 66, 0.3) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isEven
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.08) 0%, rgba(13, 24, 66, 0.4) 100%)'
                        : 'linear-gradient(135deg, rgba(106, 17, 203, 0.08) 0%, rgba(13, 24, 66, 0.4) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      minWidth: { xs: 80, md: 120 },
                      height: { xs: 80, md: 120 },
                      borderRadius: 3,
                      background: isEven
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(106, 17, 203, 0.15) 0%, rgba(106, 17, 203, 0.05) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isEven ? 'rgba(0, 155, 228, 0.2)' : 'rgba(106, 17, 203, 0.2)'}`,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: { xs: 40, md: 56 },
                        color: isEven ? '#009BE4' : '#6A11CB',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.95)',
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1rem', md: '1.15rem' },
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.8,
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

