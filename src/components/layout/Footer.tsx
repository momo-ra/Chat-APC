import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { 
  Twitter, 
  LinkedIn,
  ArrowForward
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.svg';
import chatAPCLogoDark from '../../assets/chatAPC-logo.svg';
import alphaProcessLogo from '../../assets/AlphaProcess-logo.png';
import isoLogo from '../../assets/ISO.png';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { isDark } = useThemeMode();
  const { containerMaxWidth, containerPadding } = useResponsiveLayout();
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const footerLinks = {
    product: [
      { label: 'How It Works', href: '/product/how-it-works' },
      { label: 'Architecture', href: '/product/architecture' },
      { label: 'Agents', href: '/product/agents' },
      { label: 'Deployment', href: '/product/deployment' },
    ],
    company: [
      { label: 'About Us', href: '/company/about' },
      { label: 'Careers', href: 'https://www.alphaproc.com/company' },
      { label: "Team", href: 'https://www.alphaproc.com/company' },
      { label: 'Contact', href: '/company/contact' },
    ],
    roadmap: [
      { label: 'Home', href: '/' },
      { label: 'Demo', href: '/demo' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    resources: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'FAQ', href: '/resources/faq' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/AlphaProcessCtr', label: 'Twitter' },
    { icon: LinkedIn, href: 'https://www.linkedin.com/company/alphaproc', label: 'LinkedIn' },
  ];

  const isoCertificate = {
    url: "https://www.alphaproc.com/_files/ugd/6ed5a8_4aebebb1143c48d0b4893d543d880229.pdf",
    label: "ISO 9001:2015 Certified",
    img: isoLogo,
    imgAlt: "ISO 9001:2015 Certificate"
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate entire footer on scroll
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={footerRef}
      component="footer"
      sx={{
        width: '100%',
        background: 'transparent',
        borderTop: isDark 
          ? '1px solid rgba(255, 255, 255, 0.06)'
          : '1px solid rgba(0, 0, 0, 0.06)',
        position: 'relative',
        zIndex: 2,
        m: 0,
        p: 0,
        mt: 8,
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Main Footer Content */}
        <Box ref={contentRef} sx={{ 
          py: { xs: 8, md: 10 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            py: 8,
          },
        }}>
          <Grid 
            container 
            spacing={{ xs: 4, md: 5 }}
          >
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box>
                {/* Logo */}
                <Box
                  component="img"
                  src={isDark ? chatAPCLogo : chatAPCLogoDark}
                  alt="ChatAPC Logo"
                  sx={{
                    height: '40px',
                    width: 'auto',
                    mb: 3,
                    filter: isDark ? 'brightness(1.1)' : 'none',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      height: '36px',
                    },
                  }}
                />
                
                {/* Description */}
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                    lineHeight: 1.7,
                    mb: 3,
                    maxWidth: '350px',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      fontSize: '0.9rem',
                    },
                  }}
                >
                  Your AI advisor for smarter process operations. Built by process engineers, for process engineers.
                </Typography>

                {/* Social Links */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5,
                  mb: 4,
                }}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          width: 40,
                          height: 40,
                          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                          border: isDark 
                            ? '1px solid rgba(255, 255, 255, 0.1)' 
                            : '1px solid rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: isDark ? '#009BE4' : '#2563EB',
                            borderColor: isDark ? '#009BE4' : '#2563EB',
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
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                  },
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
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        paddingLeft: '4px',
                      },
                      '&:hover .arrow-icon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {link.label}
                    <ArrowForward
                      className="arrow-icon"
                      sx={{
                        fontSize: 14,
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                  },
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
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        paddingLeft: '4px',
                      },
                      '&:hover .arrow-icon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {link.label}
                    <ArrowForward
                      className="arrow-icon"
                      sx={{
                        fontSize: 14,
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                  },
                }}
              >
                Roadmap
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.roadmap.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        paddingLeft: '4px',
                      },
                      '&:hover .arrow-icon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {link.label}
                    <ArrowForward
                      className="arrow-icon"
                      sx={{
                        fontSize: 14,
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                  },
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
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        paddingLeft: '4px',
                      },
                      '&:hover .arrow-icon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {link.label}
                    <ArrowForward
                      className="arrow-icon"
                      sx={{
                        fontSize: 14,
                        opacity: 0,
                        transform: 'translateX(-4px)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            borderColor: isDark 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        />

        {/* Bottom Bar */}
        <Box
          ref={bottomRef}
          sx={{
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
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              }}
            >
              © {new Date().getFullYear()} ChatAPC. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link
                href="#"
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: isDark ? '#009BE4' : '#2563EB',
                  },
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: isDark ? '#009BE4' : '#2563EB',
                  },
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: isDark ? '#009BE4' : '#2563EB',
                  },
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Box>

          {/* Right Side - Powered By & ISO */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 2, sm: 4 },
            }}
          >
            {/* ISO Certificate */}
            <Link 
              href={isoCertificate.url} 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&:hover .iso-cert-img': {
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={isoCertificate.img}
                alt={isoCertificate.imgAlt}
                className="iso-cert-img"
                sx={{
                  height: { xs: '32px', md: '36px' },
                  width: 'auto',
                  opacity: 0.85,
                  transition: 'opacity 0.3s',
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: '0.8rem', md: '0.875rem' },
                  color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    color: isDark ? '#009BE4': '#2563EB'
                  }
                }}
              >
                {isoCertificate.label}
              </Typography>
            </Link>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: 'none', sm: 'block' },
                borderColor: isDark 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                height: '24px',
                alignSelf: 'center',
              }}
            />

            {/* Powered By Alpha Process */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                }}
              >
                Powered by
              </Typography>
              <Link
                href="https://www.alphaproc.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={alphaProcessLogo}
                  alt="Alpha Process Control"
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
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;