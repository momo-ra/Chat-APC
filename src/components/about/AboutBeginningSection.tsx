import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Building2, Clock, Gauge } from 'lucide-react';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutBeginningSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const highlights = [
    {
      icon: Building2,
      text: "Refineries, chemical plants, and energy sites",
    },
    {
      icon: Clock,
      text: "24/7 operations, middle-of-the-night decisions",
    },
    {
      icon: Gauge,
      text: "Millions at stake with every optimization",
    },
  ];

  useEffect(() => {
    // Animation disabled for better reliability - content is always visible
    // Uncomment below if you want scroll animations
    /*
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        
        gsap.fromTo(children, 
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
    */
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        position: 'relative',
        background: isDark 
          ? 'rgba(10, 14, 46, 0.5)' 
          : '#FFFFFF',
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Box ref={contentRef}>
          {/* Section header */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{
                display: 'inline-block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isDark ? '#009BE4' : '#2563EB',
                letterSpacing: '0.1em',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              CHAPTER 01
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                mb: 3,
                transition: 'color 0.3s ease',
              }}
            >
              The Beginning
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 500,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(75, 85, 99, 1)',
                transition: 'color 0.3s ease',
              }}
            >
              We didn't start in Silicon Valley.
            </Typography>
          </Box>

          {/* Main content */}
          <Grid container spacing={{ xs: 4, lg: 8 }} alignItems="center">
            {/* Left side - Image placeholder */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={8}
                  sx={{
                    aspectRatio: '4/3',
                    borderRadius: 4,
                    background: isDark
                      ? 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)'
                      : 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  {/* Control room aesthetic overlays */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.2), transparent 50%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 70% 50%, rgba(99, 102, 241, 0.2), transparent 50%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Gauge size={80} style={{ color: 'rgba(96, 165, 250, 0.5)' }} />
                    <Typography
                      sx={{
                        color: 'rgba(156, 163, 175, 1)',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      Control Room Operations
                    </Typography>
                  </Box>
                </Paper>

                {/* Floating badge */}
                <Paper
                  elevation={12}
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    right: -24,
                    bgcolor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 4,
                    p: 3,
                    border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(229, 231, 235, 1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: isDark ? '#009BE4' : '#2563EB',
                      lineHeight: 1,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    20+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 1)',
                      mt: 0.5,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    Years Experience
                  </Typography>
                </Paper>
              </Box>
            </Grid>

            {/* Right side - Content */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                    lineHeight: 1.7,
                    transition: 'color 0.3s ease',
                  }}
                >
                  We started in control rooms — surrounded by alarms, trends, and
                  operators making tough calls under pressure.
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                    lineHeight: 1.7,
                    transition: 'color 0.3s ease',
                  }}
                >
                  For years, our team at Alpha Process Control worked side by side with
                  engineers and operators in refineries, chemical plants, and energy sites.
                  We tuned controllers, solved constraint problems, and optimized
                  processes — sometimes in the middle of the night, sometimes when
                  every decision meant millions for the plant.
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                    lineHeight: 1.7,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Our roots run deep in the trenches of industrial operations. We've felt the weight of critical decisions, understood the complexity of real-time process
                  management, and experienced firsthand the challenges that keep operators alert during overnight shifts. This isn't theoretical knowledge — it's
                  earned through countless hours in the field, troubleshooting systems when stakes were highest.
                </Typography>

                {/* Highlights */}
                <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {highlights.map((highlight, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: isDark ? 'rgba(0, 155, 228, 0.15)' : 'rgba(219, 234, 254, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <highlight.icon size={20} style={{ color: isDark ? '#009BE4' : '#2563EB' }} />
                      </Paper>
                      <Typography
                        sx={{
                          pt: 1,
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {highlight.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
