import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper, Chip } from '@mui/material';
import { Search, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import { useThemeMode } from '../../contexts/ThemeContext';

export const AboutResultSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();

  const features = [
    {
      icon: Search,
      title: "Detects Issues",
      description: "Identifies problems before they impact operations, using advanced pattern recognition and process knowledge",
      gradient: 'linear-gradient(135deg, #EF4444, #F97316)',
    },
    {
      icon: MessageCircle,
      title: "Explains Behavior",
      description: "Translates complex process dynamics into clear, actionable explanations that operators can immediately understand",
      gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
    },
    {
      icon: TrendingUp,
      title: "Unlocks Margin",
      description: "Reveals hidden optimization opportunities that increase efficiency and profitability across operations",
      gradient: 'linear-gradient(135deg, #10B981, #14B8A6)',
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
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 4s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 0.6 },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: 384,
          height: 384,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 5s infinite 1s',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Box ref={contentRef}>
          {/* Section header */}
          <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                display: 'inline-block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#60A5FA',
                letterSpacing: '0.1em',
                mb: 2,
              }}
            >
              CHAPTER 04
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: '#FFFFFF',
                mb: 3,
              }}
            >
              The Result
            </Typography>
          </Box>

          {/* ChatAPC Badge */}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Chip
              icon={<Sparkles size={32} style={{ color: '#FFFFFF' }} />}
              label="ChatAPC"
              sx={{
                px: 4,
                py: 2,
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                fontWeight: 700,
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                color: '#FFFFFF',
                height: 'auto',
                borderRadius: 10,
                '& .MuiChip-label': {
                  px: 2,
                },
                '& .MuiChip-icon': {
                  ml: 2,
                  mr: 0,
                },
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              }}
            />
            <Typography
              sx={{
                mt: 3,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(229, 231, 235, 1)',
              }}
            >
              An AI advisor built from the ground up to speak the language of operations.
            </Typography>
          </Box>

          {/* Features grid */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(31, 41, 55, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(55, 65, 81, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(96, 165, 250, 0.5)',
                      transform: 'translateY(-8px)',
                      '& .feature-icon': {
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
                      background: feature.gradient,
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
                      className="feature-icon"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        background: feature.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <feature.icon size={28} style={{ color: '#FFFFFF' }} />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(229, 231, 235, 1)',
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Bottom text */}
          <Box sx={{ maxWidth: 896, mx: 'auto' }}>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'rgba(229, 231, 235, 1)',
                textAlign: 'center',
                lineHeight: 1.7,
              }}
            >
              It works just like having a seasoned APC engineer sitting beside you — available 24/7, with instant access to all your process data and the wisdom to
              interpret it meaningfully.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
