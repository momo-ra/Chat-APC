import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { Lightbulb, Users, Code2 } from 'lucide-react';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutTurningPointSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const teams = [
    {
      icon: Users,
      title: "Process Control Expertise",
      description: "Decades of hands-on experience in refineries, chemical plants, and energy facilities",
      gradient: isDark ? 'linear-gradient(135deg, #0EA5E9, #06B6D4)' : 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    },
    {
      icon: Code2,
      title: "AI Engineering",
      description: "Software specialists who transform complex operational knowledge into intelligent, accessible tools",
      gradient: isDark ? 'linear-gradient(135deg, #A855F7, #EC4899)' : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
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
              CHAPTER 03
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
              The Turning Point
            </Typography>
          </Box>

          {/* Main question */}
          <Box sx={{ mb: 8 }}>
            <Paper
              elevation={8}
              sx={{
                position: 'relative',
                p: { xs: 4, md: 8 },
                borderRadius: 6,
                background: isDark
                  ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                  : 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
                border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(75, 85, 99, 1)',
                textAlign: 'center',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Background glow */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15))',
                  filter: 'blur(60px)',
                  opacity: 0.6,
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Lightbulb 
                  size={64} 
                  style={{ 
                    color: '#FBBF24', 
                    marginBottom: 24,
                    animation: 'pulse 2s infinite'
                  }} 
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                    fontWeight: 700,
                    color: '#FFFFFF',
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  What if the plant could answer back?
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                    color: 'rgba(229, 231, 235, 1)',
                    maxWidth: 768,
                    mx: 'auto',
                  }}
                >
                  That's when we asked ourselves the question that changed everything. Not with
                  numbers and charts, but with plain explanations that actually made sense.
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                textAlign: 'center',
                mb: 4,
                transition: 'color 0.3s ease',
              }}
            >
              So we brought together two worlds that had never truly connected before. Our team
              combined deep operational expertise with cutting-edge AI capabilities, creating
              something entirely new for the industrial space.
            </Typography>
          </Box>

          {/* Teams grid */}
          <Grid container spacing={4}>
            {teams.map((team, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={isDark ? 0 : 4}
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
                      borderColor: isDark ? 'rgba(0, 155, 228, 0.5)' : 'rgba(59, 130, 246, 0.5)',
                      '& .team-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    },
                  }}
                >
                  {/* Glow effect on hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: team.gradient,
                      opacity: 0,
                      filter: 'blur(40px)',
                      transition: 'opacity 0.5s ease',
                      '.MuiPaper-root:hover &': {
                        opacity: 0.1,
                      },
                    }}
                  />
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      className="team-icon"
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 4,
                        background: team.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <team.icon size={32} style={{ color: '#FFFFFF' }} />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                        mb: 2,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {team.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(107, 114, 128, 1)',
                        lineHeight: 1.7,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {team.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
