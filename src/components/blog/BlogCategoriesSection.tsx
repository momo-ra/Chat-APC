import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { 
  Psychology, 
  Speed, 
  Security, 
  TrendingUp, 
  Engineering,
  AutoAwesome,
  BarChart,
  CloudSync 
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applySlideUp, applyCardGridAnimation } from '../shared/animationHelpers';

const categories = [
  {
    name: 'AI & Machine Learning',
    icon: Psychology,
    count: 45,
    color: { light: '#8B5CF6', dark: '#A855F7' },
    description: 'Latest advances in industrial AI',
  },
  {
    name: 'Process Optimization',
    icon: Speed,
    count: 38,
    color: { light: '#2563EB', dark: '#009BE4' },
    description: 'Efficiency and performance insights',
  },
  {
    name: 'Safety & Compliance',
    icon: Security,
    count: 29,
    color: { light: '#059669', dark: '#10B981' },
    description: 'Risk management and regulations',
  },
  {
    name: 'Industry Trends',
    icon: TrendingUp,
    count: 22,
    color: { light: '#DC2626', dark: '#EF4444' },
    description: 'Market analysis and predictions',
  },
  {
    name: 'Engineering Best Practices',
    icon: Engineering,
    count: 31,
    color: { light: '#EA580C', dark: '#FB923C' },
    description: 'Technical guides and methodologies',
  },
  {
    name: 'Automation',
    icon: AutoAwesome,
    count: 25,
    color: { light: '#7C3AED', dark: '#8B5CF6' },
    description: 'Smart automation solutions',
  },
  {
    name: 'Data Analytics',
    icon: BarChart,
    count: 33,
    color: { light: '#0891B2', dark: '#06B6D4' },
    description: 'Data-driven decision making',
  },
  {
    name: 'Digital Transformation',
    icon: CloudSync,
    count: 18,
    color: { light: '#BE185D', dark: '#EC4899' },
    description: 'Industry 4.0 implementation',
  },
];

const BlogCategoriesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      applySlideUp(headerRef.current);

      // Animate categories with unified card grid animation
      applyCardGridAnimation(categoriesRef.current, sectionRef.current, {
        staggerDelay: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: 'transparent',
        position: 'relative',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 3,
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            Explore by Category
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
            }}
          >
            Discover articles organized by key topics in industrial automation and process control
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
            '@media (min-width: 960px) and (max-width: 1549px)': {
              gap: 3,
            },
          }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) categoriesRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: '12px',
                  background: isDark
                    ? 'rgba(31, 41, 55, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                  border: isDark
                    ? '1px solid rgba(75, 85, 99, 0.3)'
                    : '1px solid rgba(226, 232, 240, 1)',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    p: 3,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: category.color[isDark ? 'dark' : 'light'],
                    boxShadow: isDark
                      ? `0 20px 60px ${category.color.dark}30`
                      : `0 20px 60px ${category.color.light}20`,
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${category.color[isDark ? 'dark' : 'light']} 0%, transparent 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    background: `${category.color[isDark ? 'dark' : 'light']}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: 28,
                      color: category.color[isDark ? 'dark' : 'light'],
                    }}
                  />
                </Box>

                {/* Category Info */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                        lineHeight: 1.3,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Chip
                      label={category.count}
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                        backgroundColor: `${category.color[isDark ? 'dark' : 'light']}15`,
                        color: category.color[isDark ? 'dark' : 'light'],
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                      lineHeight: 1.5,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {category.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogCategoriesSection;