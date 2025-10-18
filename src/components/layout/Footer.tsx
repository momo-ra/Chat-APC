import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { 
  Twitter, 
  LinkedIn
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.svg';
import chatAPCLogoDark from '../../assets/chatAPC-logo.svg';
import alphaProcessLogo from '../../assets/AlphaProcess-logo.png';
// You might need to replace the path below with your actual ISO certificate image file
import isoLogo from '../../assets/ISO.png';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { isDark } = useThemeMode();
  const footerRef = useRef<HTMLDivElement>(null);

  const footerLinks = {
    product: [
      { label: 'How It Works', href: '/product/how-it-works' },
      { label: 'Architecture', href: '/product/architecture' },
      { label: 'Agents', href: '/product/agents' },
      { label: 'Deployment', href: '/product/deployment' },
    ],
    roadmap: [
      { label: 'Home', href: '/' },
      { label: 'Demo', href: '/demo' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
    company: [
      { label: 'About Us', href: '/company/about' },
      { label: 'Careers', href: 'https://www.alphaproc.com/company' },
      { label: "Team", href: 'https://www.alphaproc.com/company' },
      { label: 'Contact', href: '/company/contact' },
    ],
    resources: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'FAQ', href: '/resources/faq' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/AlphaProcessCtr', label: 'Twitter' },
    { icon: LinkedIn, href: 'https://www.linkedin.com/company/alphaproc', label: 'LinkedIn' },
    // {icon: Iso, href:"https://www.alphaproc.com/_files/ugd/6ed5a8_4aebebb1143c48d0b4893d543d880229.pdf", label: 'ISO 9001:2015' },
  ];

  // ISO certificate info
  const isoCertificate = {
    url: "https://www.alphaproc.com/_files/ugd/6ed5a8_4aebebb1143c48d0b4893d543d880229.pdf",
    label: "ISO 9001:2015 Certified",
    img: isoLogo, // use your iso logo asset here
    imgAlt: "ISO 9001:2015 Certificate"
  };

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
          {/* Now arrange Grid and ISO beside each other (on desktop) */}
          <Box
            sx={{
              display: { xs: 'block', md: 'flex' },
              alignItems: { md: 'flex-start' },
              gap: { md: 5, lg: 8 },
            }}
          >
            {/* The whole Grid (Brand + Links) */}
            <Grid 
              container 
              spacing={4} 
              sx={{
                flex: 1,
                minWidth: 0,
                '@media (min-width: 960px) and (max-width: 1549px)': {},
              }}
            >
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
                            {/* ISO Certificate Section - moved to be beside the Grid, not inside it */}
            <Box
              sx={{
                mt: { xs: 5, md: 0 },
                minWidth: { md: '210px' },
                display: 'flex',
                alignItems: 'center',
                '@media (min-width: 960px) and (max-width: 1549px)': {
                  minWidth: '180px',
                },
              }}
            >
              <Link 
                href={isoCertificate.url} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  '&:hover .iso-cert-img': {
                    opacity: 1,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={isoCertificate.img}
                  alt={isoCertificate.imgAlt}
                  className="iso-cert-img"
                  sx={{
                    height: { xs: '36px', md: '46px' },
                    width: 'auto',
                    opacity: 0.92,
                    marginRight: 1.6,
                    transition: 'all 0.3s',
                    '@media (min-width: 960px) and (max-width: 1549px)': {
                      height: '40px',
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: '0.87rem', md: '1rem' },
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.25s',
                    '&:hover': {
                      color: isDark ? '#009BE4': '#2563EB'
                    }
                  }}
                >
                  {isoCertificate.label}
                </Typography>
              </Link>
            </Box>
            {/* End ISO beside grid */}
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
                  Roadmap
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5,
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    gap: 1.25,
                  },
                }}>
                  {footerLinks.roadmap.map((link) => (
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

