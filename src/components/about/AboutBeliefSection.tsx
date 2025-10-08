import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { MessageSquare, Wrench, GraduationCap, Heart } from 'lucide-react';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutBeliefSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const beliefs = [
    {
      icon: MessageSquare,
      title: "Conversational",
      description: "Ask questions in plain English and get answers that make immediate sense",
      bgColor: isDark ? 'rgba(0, 155, 228, 0.15)' : 'rgba(219, 234, 254, 1)',
      iconColor: isDark ? '#009BE4' : '#2563EB',
    },
    {
      icon: Wrench,
      title: "Practical",
      description: "Every feature is built around real operational needs and workflows",
      bgColor: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(233, 213, 255, 1)',
      iconColor: isDark ? '#A855F7' : '#7C3AED',
    },
    {
      icon: GraduationCap,
      title: "Experienced",
      description: "Backed by decades of process control expertise and field-tested knowledge",
      bgColor: isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(207, 250, 254, 1)',
      iconColor: isDark ? '#06B6D4' : '#0891B2',
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
          ? 'rgba(10, 14, 46, 0.5)' 
          : '#FFFFFF',
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
              CHAPTER 05
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
              Our Belief
            </Typography>
          </Box>

          {/* Main belief statement */}
          <Box sx={{ mb: 6 }}>
            <Paper
              elevation={isDark ? 0 : 4}
              sx={{
                position: 'relative',
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                bgcolor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#FFFFFF',
                border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(229, 231, 235, 1)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Background glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
                  filter: 'blur(60px)',
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <Heart size={48} style={{ color: '#EF4444', marginBottom: 24 }} />
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                    fontWeight: 700,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                    mb: 2,
                    lineHeight: 1.3,
                    transition: 'color 0.3s ease',
                  }}
                >
                  We believe technology only works if it feels like a colleague, not another system to manage.
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 1)',
                    lineHeight: 1.7,
                    transition: 'color 0.3s ease',
                  }}
                >
                  That's why ChatAPC is designed the way it is: conversational, practical, and grounded
                  in real plant experience. We didn't want to create another complex software tool that
                  operators would need extensive training to use.
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Beliefs grid */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {beliefs.map((belief, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={isDark ? 0 : 2}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    bgcolor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#FFFFFF',
                    border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(229, 231, 235, 1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: isDark 
                        ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                        : '0 20px 40px rgba(0, 0, 0, 0.1)',
                      '& .belief-icon': {
                        transform: 'scale(1.1) rotate(3deg)',
                      },
                    },
                  }}
                >
                  <Box
                    className="belief-icon"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: belief.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <belief.icon size={28} style={{ color: belief.iconColor }} />
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
                    {belief.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 1)',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {belief.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Bottom statement */}
          <Box sx={{ maxWidth: 896, mx: 'auto' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                textAlign: 'center',
                lineHeight: 1.7,
                fontStyle: 'italic',
                transition: 'color 0.3s ease',
              }}
            >
              Technology should enhance human expertise, not replace it. ChatAPC amplifies the
              knowledge and intuition that experienced operators already possess.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
