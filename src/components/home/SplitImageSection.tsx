import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Real-time data integration from all major systems',
  'Natural language queries with instant responses',
  'Automated root cause analysis',
  'Predictive maintenance recommendations',
];

const SplitImageSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });

        // Image parallax
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          y: -60,
          ease: 'none',
        });
      }

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          x: 100,
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
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(10, 14, 46, 0.6) 0%, rgba(0, 155, 228, 0.04) 50%, rgba(10, 14, 46, 0.6) 100%)',
      }}
    >
      <Grid container sx={{ minHeight: { md: 500 } }}>
        {/* Image Side */}
        <Grid item xs={12} md={6}>
          <Box
            ref={imageRef}
            sx={{
              position: 'relative',
              height: { xs: 300, md: '100%' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={industrialAI}
              alt="Industrial Operations"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(10, 14, 46, 0.8) 100%)',
              }}
            />
          </Box>
        </Grid>

        {/* Content Side */}
        <Grid item xs={12} md={6}>
          <Box
            ref={contentRef}
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: { xs: 4, md: 8 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.8rem' },
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.95)',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Your entire plant, one conversation away
              </Typography>
              
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Access decades of operational expertise combined with AI-powered insights through simple, natural conversations.
              </Typography>

              {/* Features List */}
              <Box>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 24,
                        color: '#009BE4',
                        mr: 2,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplitImageSection;

