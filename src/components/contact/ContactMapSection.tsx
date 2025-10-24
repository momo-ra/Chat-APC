import React, { useMemo, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
// import { Phone, Email, LocationOn } from '@mui/icons-material';
import { VectorMap } from 'react-jvectormap';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { getGradient, themeConfig } from '../shared/themeConfig';


const {gradients} = themeConfig;
const contactInfo = [
  {
    // icon: Phone,
    title: 'Call Us',
    details: ['(+39)0506201704'],
  },
  {
    // icon: Email,
    title: 'Email Us',
    details: ['info@chatapc.ai'],
  },
  {
    // icon: LocationOn,
    title: 'Visit Us',
    details: ['Via Impastato 1, 56122 Pisa, Italy'],
  },
];

const ContactMapSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const { containerMaxWidth, containerPadding, h2FontSize, bodyLargeFontSize } = useResponsiveLayout();
  const mapRef = useRef<any>(null);

  // Single office in Pisa, Italy
  const pisa = useMemo(() => ({
    latLng: [43.7167, 10.4],
    name: 'Pisa, Italy',
  }), []);

  const markers = useMemo(() => ([
    // Outer soft glow
    {
      latLng: pisa.latLng,
      name: 'Pisa Glow 1',
      style: { 
        initial: { 
          r: 28, 
          fill: isDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(23, 27, 131, 0.08)', 
          stroke: 'none' 
        } 
      },
    },
    // Inner soft glow
    {
      latLng: pisa.latLng,
      name: 'Pisa Glow 2',
      style: { 
        initial: { 
          r: 18, 
          fill: isDark ? 'rgba(0, 155, 228, 0.18)' : 'rgba(23, 27, 131, 0.14)', 
          stroke: 'none' 
        } 
      },
    },
    // Main dot
    {
      latLng: pisa.latLng,
      name: 'Pisa, Italy',
      style: { 
        initial: { 
          r: 7, 
          fill: isDark ? '#009BE4' : '#171B83', 
          stroke: '#FFFFFF', 
          'stroke-width': 2.5 
        } 
      },
    },
  ]), [pisa, isDark]);

  useEffect(() => {
    // Zoom and center on Pisa/Italy when the map mounts
    const t = setTimeout(() => {
      try {
        const ref: any = mapRef.current;
        const mapObj = ref?.getMapObject ? ref.getMapObject() : ref;
        mapObj?.setFocus?.({ scale: 4.5, lat: 43.7167, lng: 10.4, animate: true });
      } catch (e) {
        // no-op if API differs
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        width: '100%',
        py: { xs: 8, sm: 10, md: 12 },
        position: 'relative',
        background: "transparent",
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
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              // color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
              background: getGradient(gradients.blueToPurple, isDark),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              mb: 2,
              transition: 'color 0.3s ease',
            }}
          >
            Our Office Location
          </Typography>
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              transition: 'color 0.3s ease',
            }}
          >
            We are located in Pisa, Italy
          </Typography>
        </Box>

        {/* World map - No card wrapper, no borders */}
        <Box
          sx={{
            mb: { xs: 8, md: 10 },
            background: 'transparent',
          }}
        >
          <Box
            sx={{
              height: { xs: 360, sm: 400, md: 500 },
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'transparent',
              '& .jvectormap-container': { 
                width: '100%', 
                height: '100%',
              },
            }}
          >
            <VectorMap
              ref={mapRef}
              map={'world_mill'}
              backgroundColor="transparent"
              containerStyle={{ width: '100%', height: '100%' }}
              zoomOnScroll={true}
              zoomButtons={true}
              panOnDrag={true}
              zoomStep={1.6}
              zoomMax={8}
              zoomMin={1}
              markers={markers}
              markerStyle={{
                initial: { r: 7 },
                hover: { cursor: 'default' },
              }}
              regionStyle={{
                initial: isDark
                  ? { 
                      fill: '#374151',  // Lighter gray for dark mode
                      'fill-opacity': 1, 
                      stroke: '#4B5563',  // Lighter stroke
                      'stroke-width': 0.7 
                    }
                  : { 
                      fill: '#E2E8F0', 
                      'fill-opacity': 0.9, 
                      stroke: '#CBD5E1', 
                      'stroke-width': 0.5 
                    },
                hover: isDark
                  ? { 'fill-opacity': 1, fill: '#4B5563', cursor: 'default' }
                  : { 'fill-opacity': 1, fill: '#CBD5E1', cursor: 'default' },
              }}
              onMarkerTipShow={(event: any, label: any) => {
                label.html(
                  `<div style="background: ${isDark ? '#1F2937' : '#171B83'}; color: #FFFFFF; padding: 8px 14px; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">${pisa.name}</div>`
                );
              }}
              onRegionTipShow={(e: any, label: any, code: string) => {
                label.html(
                  `<div style="background: ${isDark ? '#1F2937' : '#171B83'}; color: #FFFFFF; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 12px;">${label.html()}</div>`
                );
              }}
            />
          </Box>
        </Box>

        {/* Contact Info Grid - No boxes, no borders, no hover */}
        <Grid 
          container 
          spacing={{ xs: 6, md: 8 }}
          sx={{
            alignItems: 'start',
          }}
        >
          {contactInfo.map((info, index) => {
            // const IconComponent = info.icon;
            return (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  {/* Icon */}
                  {/* <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '12px',
                      background: isDark 
                        ? 'rgba(0, 155, 228, 0.1)' 
                        : 'rgba(23, 27, 131, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      mx: 'auto',
                    }}
                  >
                    {/* <IconComponent */}
                  {/*   sx={{
                        fontSize: 32,
                        color: isDark ? '#009BE4' : '#171B83',
                      }}
                    /> */}
                  {/* </Box> */}

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : '#1E293B',
                      mb: 2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {info.title}
                  </Typography>

                  {/* Details */}
                  <Box sx={{ mb: 1.5 }}>
                    {info.details.map((detail, detailIndex) => (
                      <Typography
                        key={detailIndex}
                        sx={{
                          fontSize: '1rem',
                          color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                          lineHeight: 1.8,
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactMapSection;