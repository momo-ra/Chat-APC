import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { MessageSquare, AlertCircle, TrendingUp } from 'lucide-react';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutGapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const questions = [
    {
      icon: TrendingUp,
      question: "Why can't the feed go higher?",
      color: isDark ? 'linear-gradient(135deg, #0EA5E9, #06B6D4)' : 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    },
    {
      icon: AlertCircle,
      question: "Why is the controller off?",
      color: isDark ? 'linear-gradient(135deg, #A855F7, #EC4899)' : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    },
    {
      icon: MessageSquare,
      question: "What changed last shift?",
      color: isDark ? 'linear-gradient(135deg, #F97316, #EF4444)' : 'linear-gradient(135deg, #F97316, #EF4444)',
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
              CHAPTER 02
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
              The Gap We Saw
            </Typography>
          </Box>

          {/* Main content */}
          <Box sx={{ maxWidth: 896, mx: 'auto', mb: 6 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                lineHeight: 1.7,
                textAlign: 'center',
                transition: 'color 0.3s ease',
              }}
            >
              Advanced Process Control and optimization tools were powerful, but they weren't always easy to use. The technology existed, but the bridge
              between complex data and actionable insights was missing.
            </Typography>
          </Box>

          {/* Questions grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {questions.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={isDark ? 0 : 2}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 4,
                    bgcolor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#FFFFFF',
                    border: isDark ? '1px solid rgba(55, 65, 81, 1)' : '1px solid rgba(229, 231, 235, 1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: isDark 
                        ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                        : '0 20px 40px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      background: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <item.icon size={24} style={{ color: '#FFFFFF' }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 1)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    "{item.question}"
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Bottom text */}
          <Box sx={{ maxWidth: 896, mx: 'auto' }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.08), rgba(107, 92, 231, 0.08))'
                  : 'linear-gradient(135deg, rgba(239, 246, 255, 1), rgba(238, 242, 255, 1))',
                border: isDark 
                  ? '1px solid rgba(0, 155, 228, 0.2)' 
                  : '1px solid rgba(191, 219, 254, 1)',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(55, 65, 81, 1)',
                  lineHeight: 1.7,
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                }}
              >
                We heard these questions countless times from experienced operators who knew their processes inside and out. The answers were always there —
                buried in data, trends, and reports — but never clear or immediate. Operators shouldn't have to dig through layers of information to understand what's
                happening in their own plant.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
