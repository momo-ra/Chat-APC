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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });

      // Image sinks down as you scroll (parallax)
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 60%',
            end: 'bottom top',
            scrub: 2,
          },
          y: 150,
          scale: 0.9,
          opacity: 0.3,
          ease: 'none',
        });
      }

      // Text rises up as you scroll
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.03) 0%, rgba(10, 14, 46, 0.5) 50%, rgba(13, 24, 66, 0.4) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 155, 228, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box ref={textRef} sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            Stop reacting. Start understanding.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 700,
              mx: 'auto',
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
            maxWidth: 850,
            height: { xs: 220, md: 320 },
            mx: 'auto',
            mb: 8,
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(0, 155, 228, 0.25)',
            boxShadow: '0 20px 70px rgba(0, 155, 228, 0.2)',
            zIndex: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.25) 0%, rgba(10, 14, 46, 0.5) 100%)',
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
        <Grid container spacing={4}>
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
                    padding: 4,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(0, 155, 228, 0.2)',
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      background: 'rgba(0, 155, 228, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Icon sx={{ fontSize: 32, color: '#009BE4' }} />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.4rem' },
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.95)',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.7,
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

