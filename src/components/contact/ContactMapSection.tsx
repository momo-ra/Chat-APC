import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, Chip } from '@mui/material';
import { 
  LocationOn, 
  Directions, 
  LocalParking,
  AccessTime,
  Business,
  Flight,
  Train,
  DirectionsCar
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const locationFeatures = [
  {
    icon: LocalParking,
    title: 'Free Parking',
    description: 'Ample visitor parking available on-site',
  },
  {
    icon: AccessTime,
    title: 'Easy Access',
    description: '24/7 secure building access for scheduled meetings',
  },
  {
    icon: Business,
    title: 'Conference Facilities',
    description: 'State-of-the-art meeting rooms and demo labs',
  },
];

const transportationOptions = [
  {
    icon: Flight,
    title: 'George Bush Intercontinental Airport (IAH)',
    distance: '15 minutes',
    description: 'Major international airport with direct flights worldwide',
  },
  {
    icon: DirectionsCar,
    title: 'Interstate Access',
    distance: '2 minutes',
    description: 'Direct access to I-45 and Beltway 8 for easy navigation',
  },
  {
    icon: Train,
    title: 'Metro Rail',
    distance: '5 minutes walk',
    description: 'Green Line connection to downtown Houston',
  },
];

const ContactMapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const transportRef = useRef<HTMLDivElement[]>([]);
  const { isDark } = useThemeMode();
  const { 
    h2FontSize,
    containerMaxWidth,
    containerPadding 
  } = useResponsiveLayout();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Info animation
      if (infoRef.current) {
        gsap.from(infoRef.current, {
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Features animation
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });

      // Transportation animation
      transportRef.current.forEach((transport, index) => {
        if (transport) {
          gsap.from(transport, {
            scrollTrigger: {
              trigger: transport,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
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
      component="section"
      sx={{
        py: 'clamp(3rem, 8vw, 6rem)',
        background: isDark
          ? 'linear-gradient(180deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 100%)'
          : 'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        position: 'relative',
        transition: 'background 0.3s ease',
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
            Visit Our Headquarters
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
            Located in the heart of Houston's industrial corridor, easily accessible from anywhere in the greater Houston area
          </Typography>
        </Box>

        {/* Map and Address Section */}
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 6, md: 8 } }}>
          {/* Interactive Map */}
          <Grid item xs={12} md={8}>
            <Card
              ref={mapRef}
              elevation={isDark ? 0 : 16}
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.9)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : 'none',
                backdropFilter: 'blur(20px)',
                height: { xs: '300px', md: '400px' },
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: isDark
                    ? '0 25px 80px rgba(0, 155, 228, 0.25)'
                    : '0 25px 80px rgba(37, 99, 235, 0.2)',
                },
              }}
            >
              {/* Placeholder for interactive map */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 100%)'
                    : 'linear-gradient(135deg, rgba(243, 244, 246, 1) 0%, rgba(249, 250, 251, 1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    width: '40%',
                    height: '60%',
                    background: isDark
                      ? 'radial-gradient(circle, rgba(0, 155, 228, 0.3) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                  },
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    zIndex: 10,
                  }}
                >
                  <LocationOn
                    sx={{
                      fontSize: 48,
                      color: isDark ? '#009BE4' : '#2563EB',
                      mb: 2,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                      mb: 1,
                    }}
                  >
                    Alpha Process Control
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                      mb: 3,
                    }}
                  >
                    Houston, TX 77032
                  </Typography>
                  <Chip
                    icon={<Directions />}
                    label="Get Directions"
                    clickable
                    sx={{
                      background: isDark
                        ? 'linear-gradient(135deg, #009BE4 0%, #0EA5E9 100%)'
                        : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Address and Details */}
          <Grid item xs={12} md={4}>
            <Card
              ref={infoRef}
              elevation={isDark ? 0 : 8}
              sx={{
                height: '100%',
                borderRadius: '16px',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : 'none',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  '@media (min-width: 960px) and (max-width: 1549px)': {
                    p: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <LocationOn
                    sx={{
                      fontSize: 28,
                      color: isDark ? '#009BE4' : '#2563EB',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                    }}
                  >
                    Our Location
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  <strong>Alpha Process Control</strong><br />
                  1500 Industrial Blvd, Suite 200<br />
                  Houston, TX 77032<br />
                  United States
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '12px',
                    background: isDark
                      ? 'rgba(17, 24, 39, 0.6)'
                      : 'rgba(248, 250, 252, 0.8)',
                    border: isDark
                      ? '1px solid rgba(75, 85, 99, 0.3)'
                      : '1px solid rgba(226, 232, 240, 0.5)',
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                      mb: 1,
                    }}
                  >
                    Visitor Information
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                      lineHeight: 1.5,
                    }}
                  >
                    Please check in at the main reception desk. Valid ID required for building access. 
                    Visitor badges will be provided for security purposes.
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                      fontStyle: 'italic',
                    }}
                  >
                    GPS Coordinates:<br />
                    29.7604° N, 95.3698° W
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Location Features */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Facility Features
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {locationFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={index}
                  ref={(el) => {
                    if (el) featuresRef.current[index] = el as HTMLDivElement;
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: { xs: 3, md: 4 },
                      borderRadius: '12px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.6)'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(226, 232, 240, 0.5)',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        background: isDark
                          ? 'rgba(31, 41, 55, 0.8)'
                          : 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 40,
                        color: isDark ? '#009BE4' : '#2563EB',
                        mb: 2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                        lineHeight: 1.5,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Transportation Options */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              fontWeight: 700,
              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Getting Here
          </Typography>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {transportationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={index}
                  ref={(el) => {
                    if (el) transportRef.current[index] = el as HTMLDivElement;
                  }}
                >
                  <Card
                    elevation={isDark ? 0 : 4}
                    sx={{
                      height: '100%',
                      borderRadius: '12px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.8)'
                        : 'rgba(255, 255, 255, 0.95)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : 'none',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: isDark
                          ? '0 15px 40px rgba(0, 155, 228, 0.2)'
                          : '0 15px 40px rgba(37, 99, 235, 0.15)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        '@media (min-width: 960px) and (max-width: 1549px)': {
                          p: 3,
                        },
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 36,
                          color: isDark ? '#009BE4' : '#2563EB',
                          mb: 2,
                          mx: 'auto',
                        }}
                      />
                      
                      <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                          mb: 1,
                        }}
                      >
                        {option.title}
                      </Typography>

                      <Chip
                        label={option.distance}
                        size="small"
                        sx={{
                          mb: 2,
                          background: isDark ? 'rgba(0, 155, 228, 0.2)' : 'rgba(37, 99, 235, 0.1)',
                          color: isDark ? '#009BE4' : '#2563EB',
                          fontWeight: 600,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: '0.9rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                          lineHeight: 1.5,
                          flex: 1,
                        }}
                      >
                        {option.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactMapSection;