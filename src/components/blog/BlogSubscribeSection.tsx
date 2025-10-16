import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material';
import { 
  Email, 
  Notifications, 
  TrendingUp, 
  School,
  CheckCircle
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applyStaggerAnimation, applyScaleUp } from '../shared/animationHelpers';

const subscriptionBenefits = [
  {
    icon: TrendingUp,
    title: 'Industry Insights',
    description: 'Weekly roundup of the latest trends and breakthroughs in process control and industrial AI.',
  },
  {
    icon: School,
    title: 'Expert Knowledge',
    description: 'Exclusive content from industry veterans and technical experts sharing their experience.',
  },
  {
    icon: Notifications,
    title: 'Early Access',
    description: 'Be the first to know about new features, product updates, and upcoming webinars.',
  },
];

const BlogSubscribeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      if (contentRef.current) {
        const children = Array.from(contentRef.current.children) as HTMLElement[];
        applyStaggerAnimation(children, 'slideUp', {
          staggerDelay: 0.2,
          startTrigger: 'top 80%',
          triggerElement: sectionRef.current,
        });
      }

      // Animate form
      applyScaleUp(formRef.current, {
        delay: 0.4,
        startTrigger: 'top 80%',
      });

      // Animate benefits
      applyStaggerAnimation(benefitsRef.current, 'slideUp', {
        staggerDelay: 0.15,
        startTrigger: 'top 80%',
        triggerElement: sectionRef.current,
        customProps: { delay: 0.6 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        py: 'clamp(4rem, 10vw, 8rem)',
        position: 'relative',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Newsletter Badge */}
          <Chip
            label="Newsletter"
            icon={<Email />}
            sx={{
              mb: 4,
              px: 2,
              py: 0.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              color: isDark ? '#009BE4' : '#2563EB',
              border: isDark ? '1px solid rgba(0, 155, 228, 0.3)' : '1px solid rgba(37, 99, 235, 0.2)',
              '& .MuiChip-icon': {
                color: isDark ? '#009BE4' : '#2563EB',
              },
            }}
          />

          {/* Main Heading */}
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #009BE4 50%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #8B5CF6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.2,
              transition: 'all 0.3s ease',
            }}
          >
            Stay Ahead of the Curve
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '700px',
              mx: 'auto',
              mb: 2,
              lineHeight: 1.6,
              fontWeight: 400,
              transition: 'color 0.3s ease',
            }}
          >
            Get the latest insights on industrial AI, process optimization, and automation delivered directly to your inbox.
          </Typography>

          {/* Subscriber Count */}
          <Typography
            sx={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
              mb: 6,
              transition: 'color 0.3s ease',
            }}
          >
            Join 15,000+ process engineers who trust our insights
          </Typography>
        </Box>

        {/* Subscription Form */}
        <Card
          ref={formRef}
          elevation={isDark ? 0 : 20}
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mb: { xs: 6, md: 8 },
            borderRadius: '20px',
            background: isDark
              ? 'rgba(31, 41, 55, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
            border: isDark
              ? '1px solid rgba(75, 85, 99, 0.3)'
              : 'none',
            backdropFilter: 'blur(30px)',
            position: 'relative',
            zIndex: 10,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: isDark
                ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '20px',
              opacity: 0,
              zIndex: -1,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
              opacity: 1,
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 4, md: 5 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
                p: 4,
              },
            }}
          >
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'stretch',
              }}
            >
              <TextField
                placeholder="Enter your email address"
                variant="outlined"
                fullWidth
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: isDark
                      ? 'rgba(17, 24, 39, 0.8)'
                      : 'rgba(248, 250, 252, 0.8)',
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 1)',
                    },
                    '&:hover fieldset': {
                      borderColor: isDark ? '#009BE4' : '#2563EB',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDark ? '#009BE4' : '#2563EB',
                    },
                    '& input': {
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                      py: 1.5,
                      fontSize: '1rem',
                      '&::placeholder': {
                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 116, 139, 1)',
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: { xs: 4, sm: 6 },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #0EA5E9 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 155, 228, 0.3)'
                    : '0 8px 32px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 12px 40px rgba(0, 155, 228, 0.4)'
                      : '0 12px 40px rgba(37, 99, 235, 0.4)',
                    background: isDark
                      ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)'
                      : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Privacy Notice */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 3,
                justifyContent: 'center',
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 16,
                  color: isDark ? '#10B981' : '#059669',
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  textAlign: 'center',
                  transition: 'color 0.3s ease',
                }}
              >
                No spam, unsubscribe at any time. We respect your privacy.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {subscriptionBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                ref={(el) => {
                  if (el) benefitsRef.current[index] = el as HTMLDivElement;
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 3, md: 4 },
                    borderRadius: '16px',
                    background: isDark
                      ? 'rgba(31, 41, 55, 0.6)'
                      : 'rgba(255, 255, 255, 0.7)',
                    border: isDark
                      ? '1px solid rgba(75, 85, 99, 0.2)'
                      : '1px solid rgba(226, 232, 240, 0.5)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      p: 3,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDark ? 'rgba(0, 155, 228, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                    },
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 32,
                        color: isDark ? '#009BE4' : '#2563EB',
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                      mb: 2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {benefit.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                      lineHeight: 1.6,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {benefit.description}
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

export default BlogSubscribeSection;