import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, Chip, IconButton } from '@mui/material';
import {
  LocationOn,
  Directions,
  Flight,
  Train,
  DirectionsCar,
  AccessTime,
  LocalParking,
  Business,
} from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import worldMapSvg from './world.svg';

const transportationOptions = [
  {
    icon: Flight,
    title: 'Airport',
    distance: '5 km',
    description: 'Pisa International Airport (PSA)',
    color: { light: '#EA580C', dark: '#FB923C' },
  },
  {
    icon: Train,
    title: 'Train Station',
    distance: '3 km',
    description: 'Pisa Centrale Railway Station',
    color: { light: '#2563EB', dark: '#3B82F6' },
  },
  {
    icon: DirectionsCar,
    title: 'Highway',
    distance: '1 km',
    description: 'A12 Autostrada Access',
    color: { light: '#059669', dark: '#10B981' },
  },
];

const facilities = [
  { icon: LocalParking, title: 'Free Parking', color: '#10B981' },
  { icon: AccessTime, title: '24/7 Access', color: '#3B82F6' },
  { icon: Business, title: 'Conference Rooms', color: '#8B5CF6' },
];

const ContactMapSection: React.FC = () => {
  const [activeTransport, setActiveTransport] = useState<number | null>(null);
  const [showEmbeddedMap, setShowEmbeddedMap] = useState(false);
  const { isDark } = useThemeMode();

  const handleLocationClick = () => setShowEmbeddedMap((prev) => !prev);

  const openGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/eTLTDLj53ANp1Az8A', '_blank');
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        background: "transparent",
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              fontWeight: 800,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 50%, #10B981 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #059669 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              lineHeight: 1.1,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Visit Our Headquarters
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            Located in the beautiful city of Pisa, Italy
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
              fontStyle: 'italic',
            }}
          >
            Click on our location to explore more
          </Typography>
        </Box>

        {/* Map/Card Section */}
        <Box sx={{ mb: 6 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: isDark
                ? 'rgba(31, 41, 55, 0.9)'
                : 'rgba(255, 255, 255, 0.95)',
              border: isDark
                ? '1px solid rgba(75, 85, 99, 0.3)'
                : '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(20px)',
              height: '500px',
              position: 'relative',
              boxShadow: isDark
                ? '0 25px 80px rgba(0, 0, 0, 0.3)'
                : '0 25px 80px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)',
              }}
            >
              <Box
                sx={{
                  width: '90%',
                  height: '80%',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <Box
                  component="img"
                  src={worldMapSvg}
                  alt="World Map"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: isDark
                      ? 'brightness(0.8) contrast(1.2)'
                      : 'brightness(1.1) contrast(0.9)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: '32%',
                    left: '52%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  onClick={handleLocationClick}
                >
                  {/* Pulsing circle animation */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `2px solid ${isDark ? '#3B82F6' : '#2563EB'}`,
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
                        '50%': { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0.3 },
                        '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
                      },
                    }}
                  />
                  {/* Main location pin */}
                  <Box
                    sx={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isDark
                        ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                        : 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isDark
                        ? '0 4px 12px rgba(59, 130, 246, 0.4)'
                        : '0 4px 12px rgba(37, 99, 235, 0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.2)' },
                    }}
                  >
                    <LocationOn sx={{ fontSize: 10, color: '#FFFFFF' }} />
                  </Box>
                </Box>

                {/* Location Label */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '25%',
                    left: '52%',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                    zIndex: 11,
                  }}
                  onClick={handleLocationClick}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      background: isDark
                        ? 'rgba(31, 41, 55, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: isDark
                        ? '1px solid rgba(75, 85, 99, 0.5)'
                        : '1px solid rgba(226, 232, 240, 0.8)',
                      boxShadow: isDark
                        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                        fontFamily: '"Inter", sans-serif',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Pisa, Italy
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* Floating particles (visual detail) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '48%',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: isDark ? '#3B82F6' : '#2563EB',
                  animation: 'float1 4s ease-in-out infinite',
                  '@keyframes float1': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(10px, -5px)' },
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '35%',
                  left: '46%',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: isDark ? '#10B981' : '#059669',
                  animation: 'float2 3s ease-in-out infinite',
                  '@keyframes float2': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-8px, 8px)' },
                  },
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.9rem',
                  color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                  fontWeight: 500,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.6 },
                    '50%': { opacity: 1 },
                  },
                }}
              >
                Click on our location to see detailed map
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Embedded Google Map */}
        {showEmbeddedMap && (
          <Box sx={{ mb: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.9)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: isDark
                  ? '1px solid rgba(75, 85, 99, 0.3)'
                  : '1px solid rgba(226, 232, 240, 0.5)',
                backdropFilter: 'blur(20px)',
                boxShadow: isDark
                  ? '0 25px 80px rgba(0, 0, 0, 0.3)'
                  : '0 25px 80px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    Alpha Process Control Location
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip
                      icon={<Directions />}
                      label="Open in Google Maps"
                      clickable
                      onClick={openGoogleMaps}
                      sx={{
                        background: isDark
                          ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => setShowEmbeddedMap(false)}
                      sx={{
                        background: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(226, 232, 240, 0.5)',
                        '&:hover': {
                          background: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)',
                        },
                      }}
                    >
                      <Box sx={{ fontSize: 18 }}>×</Box>
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: '450px',
                    position: 'relative',
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.482240659333!2d10.375793676412835!3d43.72130794802288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d591892f500b9b%3A0x145344e5a7bb4f43!2sALPHA%20Process%20Control!5e0!3m2!1sen!2sit!4v1760456793258!5m2!1sen!2sit"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Alpha Process Control Google Map"
                  />
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: '12px',
                    background: isDark ? 'rgba(17, 24, 39, 0.6)' : 'rgba(248, 250, 252, 0.8)',
                    border: isDark ? '1px solid rgba(75, 85, 99, 0.3)' : '1px solid rgba(226, 232, 240, 0.5)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 1)',
                      mb: 1,
                    }}
                  >
                    📍 Address
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                      lineHeight: 1.6,
                    }}
                  >
                    Via Giuseppe Impastato, 1<br />
                    56122 Pisa, PI, Italy
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default ContactMapSection;