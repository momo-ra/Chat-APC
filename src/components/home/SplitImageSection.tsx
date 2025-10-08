import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
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
  const { isDark } = useThemeMode();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate on desktop (md breakpoint and above)
      const isDesktop = window.matchMedia('(min-width: 960px)').matches;
      
      if (!isDesktop) return;

      // Use timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Image animation - Removed parallax scrub for better scroll performance
      if (imageRef.current) {
        tl.from(imageRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0);
        
        // Parallax removed - causes scroll jank
      }

      // Content animation
      if (contentRef.current) {
        tl.from(contentRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.1);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

  return (
    <Box
      ref={sectionRef}
      data-section-theme={isDark ? 'dark' : 'light'}
      data-section-primary={isDark ? '#009BE4' : '#2563EB'}
      sx={{
        width: '100%',
        py: { xs: 6, sm: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark 
          ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 100%)'
          : 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
        transition: 'background 0.3s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
        }}
      >
        {/* Desktop Layout */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            minHeight: { md: '500px', lg: '550px' },
          }}
        >
          {/* Image Container */}
          <Box
            sx={{
              width: '55%',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Box
              ref={imageRef}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: isDark 
                  ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                  : '0 20px 60px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box
                component="img"
                src={industrialAI}
                alt="Industrial Operations"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
          </Box>

          {/* Text Container */}
          <Box
            sx={{
              width: '50%',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Box
              ref={contentRef}
              sx={{
                width: '100%',
                background: isDark
                  ? 'rgba(45, 55, 72, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                padding: { md: 5, lg: 6 },
                boxShadow: isDark 
                  ? '0 20px 60px rgba(0, 0, 0, 0.5)'
                  : '0 20px 60px rgba(0, 0, 0, 0.15)',
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Quote Icon */}
              <Box
                sx={{
                  fontSize: '4rem',
                  lineHeight: 0.8,
                  color: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                  mb: 2,
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                }}
              >
                "
              </Box>

              {/* Quote Text */}
              <Typography
                sx={{
                  fontSize: { md: '1.15rem', lg: '1.25rem' },
                  fontWeight: 400,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                  mb: 3,
                  lineHeight: 1.7,
                  letterSpacing: '0.01em',
                }}
              >
                Your entire plant, one conversation away. Access decades of operational expertise combined with AI-powered insights through simple, natural conversations.
              </Typography>

              {/* Divider */}
              <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  background: isDark 
                    ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)',
                  mb: 3,
                }}
              />

              {/* Author Info */}
              <Box mb={3}>
                <Typography
                  sx={{
                    fontSize: { md: '1.1rem', lg: '1.2rem' },
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                    mb: 0.5,
                  }}
                >
                  Industrial AI Excellence
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  Chief Technology Officer, Alpha Process Control
                </Typography>
              </Box>

              {/* Features List - Subtle */}
              <Box>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 1.5,
                      opacity: 0.9,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 16,
                        color: isDark ? '#009BE4' : '#2563EB',
                        mr: 1.5,
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Mobile/Tablet Layout */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              width: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={industrialAI}
              alt="Industrial Operations"
              sx={{
                width: '100%',
                height: { xs: '250px', sm: '350px' },
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Content Card */}
          <Box
            sx={{
              width: '100%',
              background: isDark
                ? 'rgba(45, 55, 72, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              padding: { xs: 3, sm: 4 },
              boxShadow: isDark 
                ? '0 10px 30px rgba(0, 0, 0, 0.5)'
                : '0 10px 30px rgba(0, 0, 0, 0.15)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Quote Icon */}
            <Box
              sx={{
                fontSize: { xs: '3rem', sm: '3.5rem' },
                lineHeight: 0.8,
                color: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                mb: 2,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
              }}
            >
              "
            </Box>

            {/* Quote Text */}
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 400,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                mb: 3,
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}
            >
              Your entire plant, one conversation away. Access decades of operational expertise combined with AI-powered insights through simple, natural conversations.
            </Typography>

            {/* Divider */}
            <Box
              sx={{
                width: '100%',
                height: '1px',
                background: isDark 
                  ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%)',
                mb: 3,
              }}
            />

            {/* Author Info */}
            <Box mb={3}>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                  mb: 0.5,
                }}
              >
                Industrial AI Excellence
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
                Chief Technology Officer, Alpha Process Control
              </Typography>
            </Box>

            {/* Features List */}
            <Box>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: 1.5,
                    opacity: 0.9,
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: { xs: 16, sm: 18 },
                      color: isDark ? '#009BE4' : '#2563EB',
                      mr: 1.5,
                      mt: 0.25,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      lineHeight: 1.5,
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SplitImageSection;