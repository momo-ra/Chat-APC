import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import industrialAI from '../../assets/hero-industrial-ai.jpg';

gsap.registerPlugin(ScrollTrigger);

const examples = [
  {
    question: '"Why isn\'t feed increasing?"',
    answer: 'TI100 is maxed out at 285°C — it\'s your bottleneck right now. Last increased 40 minutes ago when pressure spiked.',
  },
  {
    question: '"What happened last shift?"',
    answer: 'Feed dropped at 02:15 when the controller went off due to a compressor vibration alarm. Operator switched to manual and ran 15% below target for 3 hours.',
  },
  {
    question: '"Which limits are cutting profit?"',
    answer: 'Column P is active 89% of the time, costing ~$4K/day. Cooler duty hits limits during hot afternoons — another $1.8K/day opportunity.',
  },
  {
    question: '"What if I increase reflux by 5%?"',
    answer: 'Product purity improves by 0.2%, but reboiler duty goes up 1.5% and column flooding risk increases to 12%. Net margin impact: +$340/day if you stay below 78% flooding.',
  },
];

const ExamplesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image with zoom and fade
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });

        // Image parallax effect
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 70%',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -40,
          ease: 'none',
        });
      }

      // Animate cards with alternating directions
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const isEven = index % 2 === 0;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: isEven ? -60 : 60,
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });

      // Parallax effect for section
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -50,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(13, 24, 66, 0.4) 0%, rgba(0, 155, 228, 0.06) 30%, rgba(10, 14, 46, 0.5) 70%, rgba(13, 24, 66, 0.4) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
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
              color: 'rgba(255, 255, 255, 0.95)',
              mb: 2,
            }}
          >
            Instant answers to your everyday questions
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            No more hunting through trends, alarms, and reports. Just ask and get clear explanations — in seconds.
          </Typography>
        </Box>

        {/* Image with overlay */}
        <Box
          ref={imageRef}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            height: { xs: 200, md: 300 },
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
              background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.3) 0%, rgba(10, 14, 46, 0.6) 100%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            component="img"
            src={industrialAI}
            alt="Industrial AI Control System"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Examples Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {examples.map((example, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el as HTMLDivElement;
              }}
            >
              <Box
                sx={{
                  padding: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(0, 155, 228, 0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Question */}
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    fontWeight: 600,
                    color: '#009BE4',
                    mb: 2,
                    lineHeight: 1.4,
                  }}
                >
                  {example.question}
                </Typography>

                {/* Answer */}
                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7,
                  }}
                >
                  {example.answer}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              border: '1px solid rgba(0, 155, 228, 0.3)',
              color: '#009BE4',
              borderRadius: 3,
              padding: '14px 36px',
              fontSize: '1rem',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#009BE4',
                background: 'rgba(0, 155, 228, 0.08)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            See more example questions →
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ExamplesSection;

