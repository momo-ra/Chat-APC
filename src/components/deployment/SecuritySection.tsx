import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ShieldIcon from '@mui/icons-material/Shield';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  {
    icon: SecurityIcon,
    title: 'Role-Based Access Control',
    description: 'Granular permissions ensure users access only the data and functions relevant to their role. Administrators can define custom access levels aligned with your organizational structure.',
  },
  {
    icon: LockIcon,
    title: 'Encrypted Data Transfer',
    description: 'All data communication uses industry-standard encryption protocols. End-to-end security protects sensitive operational data throughout transmission and storage.',
  },
  {
    icon: IntegrationInstructionsIcon,
    title: 'Zero Disruption Integration',
    description: 'ChatAPC integrates seamlessly without interrupting existing systems. Read-only connections by default ensure your critical operations continue unaffected during deployment.',
  },
  {
    icon: ShieldIcon,
    title: 'Industrial Cybersecurity Standards',
    description: 'Built to meet cybersecurity frameworks. Regular security audits and updates maintain compliance with evolving standards.',
  },
];

const SecuritySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const accentColor = { light: '#F59E0B', dark: '#FBBF24' };

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

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDark]);

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
              color: accentColor[isDark ? 'dark' : 'light'],
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 2,
            }}
          >
            Security
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              lineHeight: 1.2,
            }}
          >
            Enterprise-Grade Security
          </Typography>
        </Box>

        {/* Security Features */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 5 },
          }}
        >
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  borderLeft: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    pl: { xs: 4, md: 5 },
                    borderLeftColor: accentColor[isDark ? 'dark' : 'light'],
                    borderLeftWidth: '3px',
                    background: isDark
                      ? `linear-gradient(90deg, ${accentColor.dark}10 0%, transparent 100%)`
                      : `linear-gradient(90deg, ${accentColor.light}08 0%, transparent 100%)`,
                    '& .security-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <Box
                  className="security-icon"
                  sx={{
                    color: accentColor[isDark ? 'dark' : 'light'],
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <IconComponent sx={{ fontSize: 36 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      mb: 1.5,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
                      lineHeight: 1.7,
                    }}
                  >
                    {feature.description}
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

export default SecuritySection;