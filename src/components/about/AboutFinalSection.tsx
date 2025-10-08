import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { Building, Sparkles, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutFinalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isDark } = useThemeMode();

  const values = [
    {
      icon: Building,
      title: "Real Experience",
      description: "Decades in refineries, chemical plants, and energy facilities",
      gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    },
    {
      icon: Sparkles,
      title: "AI Innovation",
      description: "Cutting-edge technology designed specifically for industrial operations",
      gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    },
    {
      icon: Users,
      title: "Your Partner",
      description: "An expert advisor available 24/7 to support your operational decisions",
      gradient: 'linear-gradient(135deg, #F97316, #EF4444)',
    },
  ];

  useEffect(() => {
    // Animation disabled for better reliability - content is always visible
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        position: 'relative',
        background: isDark 
          ? 'rgba(17, 24, 39, 0.5)' 
          : 'rgba(249, 250, 251, 1)',
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Box ref={contentRef}>
          {/* Section header */}
          <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
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
              CHAPTER 06
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
              At Alpha Process Control
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(75, 85, 99, 1)',
                maxWidth: 896,
                mx: 'auto',
                lineHeight: 1.7,
                transition: 'color 0.3s ease',
              }}
            >
              We've lived the reality of process operations. We've been in your shoes, faced the
              same challenges, and felt the same pressures that come with managing complex
              industrial processes.
            </Typography>
          </Box>

          {/* Mission statement */}
          <Box sx={{ mb: 6, maxWidth: 896, mx: 'auto' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                textAlign: 'center',
                lineHeight: 1.7,
                transition: 'color 0.3s ease',
              }}
            >
              Now we're bringing that hard-won knowledge into the age of AI — so every operator
              and engineer has an expert at their side, ready to help navigate the complexities of
              modern process control.
            </Typography>
          </Box>

          {/* Values grid */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={isDark ? 0 : 2}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    bgcolor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#FFFFFF',
                    border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(229, 231, 235, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark 
                        ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                        : '0 20px 40px rgba(0, 0, 0, 0.1)',
                      '& .value-icon': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    },
                  }}
                >
                  {/* Glow effect on hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: value.gradient,
                      opacity: 0,
                      filter: 'blur(40px)',
                      transition: 'opacity 0.5s ease',
                      '.MuiPaper-root:hover &': {
                        opacity: 0.15,
                      },
                    }}
                  />
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      className="value-icon"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        background: value.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <value.icon size={28} style={{ color: '#FFFFFF' }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                        mb: 2,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 1)',
                        lineHeight: 1.7,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* CTA Section */}
          <Box>
            <Paper
              elevation={8}
              sx={{
                position: 'relative',
                p: { xs: 6, md: 8 },
                borderRadius: 6,
                background: 'linear-gradient(135deg, #111827, #1e3a8a, #111827)',
                border: '1px solid rgba(55, 65, 81, 1)',
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Background glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15))',
                  filter: 'blur(60px)',
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.75rem' },
                    fontWeight: 700,
                    color: '#FFFFFF',
                    mb: 3,
                    lineHeight: 1.1,
                  }}
                >
                  The future of process control is here.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    color: 'rgba(229, 231, 235, 1)',
                    mb: 4,
                    maxWidth: 640,
                    mx: 'auto',
                  }}
                >
                  Experience the power of AI-driven process optimization built by operators, for operators.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    onClick={() => navigate("/demo")}
                    variant="contained"
                    endIcon={<ArrowRight size={20} />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                      color: '#FFFFFF',
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
                      },
                    }}
                  >
                    Try ChatAPC Demo
                  </Button>
                  <Button
                    onClick={() => navigate("/#contact")}
                    variant="outlined"
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
