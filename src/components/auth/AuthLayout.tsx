import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { gsap } from 'gsap';
import { AppSidebar } from '../layout';
import { sidebarItems } from '../../data/layout/sidebarData';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  onBack 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Content animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(0, 155, 228, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(106, 17, 203, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Sidebar */}
      <AppSidebar items={sidebarItems} />

      {/* Main Content */}
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: { xs: 2, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Container maxWidth="sm">
          {/* Back Button */}
          {onBack && (
            <Box sx={{ mb: 4 }}>
              <IconButton
                onClick={onBack}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ArrowBack />
              </IconButton>
            </Box>
          )}

          {/* Header */}
          <Box ref={headerRef} sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 2,
                background: 'linear-gradient(135deg, #009BE4 0%, #6A11CB 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          {/* Content */}
          <Box
            ref={contentRef}
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: { xs: 3, md: 4 },
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
