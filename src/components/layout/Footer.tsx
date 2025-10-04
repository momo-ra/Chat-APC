import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { 
  Twitter, 
  LinkedIn, 
  GitHub, 
  YouTube 
} from '@mui/icons-material';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.png';
import alphaProcessLogo from '../../assets/AlphaProcess-logo.png';

const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Demo', href: '/demo' },
      { label: 'API', href: '#' },
    ],
    solutions: [
      { label: 'For Engineers', href: '#' },
      { label: 'For Operators', href: '#' },
      { label: 'Enterprise', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Support', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: LinkedIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com', label: 'GitHub' },
    { icon: YouTube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: 'linear-gradient(180deg, rgba(10, 14, 46, 0.8) 0%, #0a0e2e 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 155, 228, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Box sx={{ py: { xs: 8, md: 10 } }}>
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box
                  component="img"
                  src={chatAPCLogo}
                  alt="ChatAPC Logo"
                  sx={{
                    height: '40px',
                    width: 'auto',
                    mb: 3,
                    filter: 'brightness(1.1)',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  Your AI advisor for smarter process operations. Built by process engineers, for process engineers.
                </Typography>

                {/* Social Links */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#009BE4',
                            borderColor: '#009BE4',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                      </IconButton>
                    );
                  })}
                </Box>
              </Box>
            </Grid>

            {/* Links Sections */}
            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Product
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.product.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#009BE4',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Solutions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.solutions.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#009BE4',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Company
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#009BE4',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.resources.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#009BE4',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            py: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Copyright & Legal Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              © {new Date().getFullYear()} ChatAPC. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#009BE4',
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#009BE4',
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#009BE4',
                  },
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>

          {/* Powered By Alpha Process */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Powered by
            </Typography>
            <Box
              component="img"
              src={alphaProcessLogo}
              alt="Alpha Process Logo"
              sx={{
                height: '24px',
                width: 'auto',
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

