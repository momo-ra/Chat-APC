import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import HubIcon from '@mui/icons-material/Hub';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const hostingOptions = [
  {
    icon: StorageIcon,
    title: 'On-Premise',
    description: 'Deploy fully inside your plant network with no internet connection required. Complete control over your data and infrastructure while maintaining existing security protocols and compliance standards.',
    benefits: [
      'Air-gapped deployment',
      'Full data sovereignty',
      'Zero cloud dependencies',
      'Custom hardware optimization'
    ],
    color: { light: '#3B82F6', dark: '#60A5FA' },
  },
  {
    icon: CloudIcon,
    title: 'Private Cloud',
    description: 'Run securely in Cloud Platforms with enterprise-grade security. Benefit from cloud scalability while maintaining dedicated, isolated environments for your industrial data.',
    benefits: [
      'Elastic scalability',
      'Managed infrastructure',
      'Global availability',
      'Enterprise SLA guarantees'
    ],
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    icon: HubIcon,
    title: 'Hybrid',
    description: 'Combine both approaches for maximum flexibility. Keep sensitive data on-premise while leveraging cloud resources for advanced analytics and reporting capabilities.',
    benefits: [
      'Best of both worlds',
      'Flexible data residency',
      'Cost optimization',
      'Seamless integration'
    ],
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
];

const HostingOptionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: '100%',
        py: sectionPadding,
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
        {/* Header */}
        <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              fontWeight: 700,
              color: isDark ? '#60A5FA' : '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Hosting Options
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Flexible Hosting Options
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              lineHeight: 1.7,
              maxWidth: 700,
            }}
          >
            Choose what works best for your IT policies and operational requirements. Our deployment experts work with your team to ensure optimal configuration for your specific environment.
          </Typography>
        </Box>

        {/* Options List */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, md: 5 },
          }}
        >
          {hostingOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '80px 1fr' },
                  gap: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                  background: 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: option.color[isDark ? 'dark' : 'light'],
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${option.color.dark}10 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${option.color.light}08 0%, transparent 100%)`,
                    '& .hosting-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                }}
              >
                {/* Icon */}
                <Box
                  className="hosting-icon"
                  sx={{
                    width: { xs: 64, md: 72 },
                    height: { xs: 64, md: 72 },
                    borderRadius: 2,
                    background: option.color[isDark ? 'dark' : 'light'],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    boxShadow: `0 8px 24px ${option.color[isDark ? 'dark' : 'light']}30`,
                    mx: { xs: 0, md: 0 }, // Force left-align on mobile, preserve desktop
                    ml: { xs: 0, md: 0 }, // ensure left on both
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: { xs: 32, md: 36 },
                      color: '#FFFFFF',
                    }}
                  />
                </Box>

                {/* Content */}
                <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {option.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                      mb: 3,
                      maxWidth: 700,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    {option.description}
                  </Typography>

                  {/* Benefits */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                      gap: 2,
                      maxWidth: 700,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  >
                    {option.benefits.map((benefit, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          justifyContent: { xs: 'left', md: 'flex-start' },
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: option.color[isDark ? 'dark' : 'light'],
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                            lineHeight: 1.5,
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HostingOptionsSection;