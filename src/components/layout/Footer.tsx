import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { 
  Twitter, 
  LinkedIn, 
  GitHub, 
  YouTube 
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.svg';
import chatAPCLogoDark from '../../assets/chatAPC-logo.svg';
import alphaProcessLogo from '../../assets/AlphaProcess-logo.png';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { isDark } = useThemeMode();
  const footerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple single animation for the entire footer
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
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
        background: isDark 
          ? 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(139, 92, 246, 0.025) 0%, #111827 35%, #111827 100%)'
          : 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(139, 92, 246, 0.012) 0%, #FFFFFF 35%, #FFFFFF 100%)',
        borderTop: 'none',
        position: 'relative',
        zIndex: 2,
        m: 0,
        p: 0,
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, md: 3 },
          // Reduce width on medium screens where sidebar is present
          '@media (min-width: 960px) and (max-width: 1549px)': {
            maxWidth: '950px',
            px: 2.5,
          },
          '@media (min-width: 1550px)': {
            maxWidth: '1200px',
            px: 3,
          },
        }}
      >
        {/* Main Footer Content */}
        <Box sx={{ 
          py: { xs: 8, md: 10 },
          '@media (min-width: 960px) and (max-width: 1549px)': {
            py: 8,
          },
        }}>
          <Grid container spacing={4} sx={{
            '@media (min-width: 960px) and (max-width: 1549px)': {
            },
          }}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                mb: 3,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  mb: 2.5,
                },
              }}>
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
                      mb: 2.5,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                    lineHeight: 1.7,
                    mb: 3,
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      fontSize: '0.9rem',
                      mb: 2.5,
                    },
                  }}
                >
                  Your AI advisor for smarter process operations. Built by process engineers, for process engineers.
                </Typography>

                {/* Social Links */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                  },
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
                        <Icon sx={{ 
                          fontSize: 20,
                          '@media (min-width: 960px) and (max-width: 1549px)': {
                            fontSize: 18,
                          },
                        }} />
                      </IconButton>
                    );
                  })}
                </Box>
              </Box>
            </Grid>

            {/* Links Sections */}
            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={2}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                    mb: 1.5,
                  },
                }}
              >
                Product
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  gap: 1.25,
                },
              }}>
                {footerLinks.product.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={2}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                    mb: 1.5,
                  },
                }}
              >
                Solutions
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  gap: 1.25,
                },
              }}>
                {footerLinks.solutions.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={2}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                    mb: 1.5,
                  },
                }}
              >
                Company
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  gap: 1.25,
                },
              }}>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={2}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.85rem',
                    mb: 1.5,
                  },
                }}
              >
                Resources
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  gap: 1.25,
                },
              }}>
                {footerLinks.resources.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '@media (min-width: 960px) and (max-width: 1549px)': {
                        fontSize: '0.85rem',
                      },
                      '&:hover': {
                        color: isDark ? '#009BE4' : '#2563EB',
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
            borderTop: isDark 
              ? '1px solid rgba(255, 255, 255, 0.08)' 
              : '1px solid rgba(0, 0, 0, 0.08)',
            py: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
            '@media (min-width: 960px) and (max-width: 1549px)': {
              py: 3,
            },
          }}
        >
          {/* Copyright & Legal Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 2, sm: 4 },
              '@media (min-width: 960px) and (max-width: 1549px)': {
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  fontSize: '0.825rem',
                },
              }}
            >
              © {new Date().getFullYear()} ChatAPC. All rights reserved.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 3,
              '@media (min-width: 960px) and (max-width: 1549px)': {
                gap: 2.5,
              },
            }}>
              <Link
                href="#"
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.825rem',
                  },
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
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.825rem',
                  },
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
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    fontSize: '0.825rem',
                  },
                  '&:hover': {
                    color: isDark ? '#009BE4' : '#2563EB',
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
              '@media (min-width: 960px) and (max-width: 1549px)': {
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  fontSize: '0.825rem',
                },
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
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    height: '22px',
                  },
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

