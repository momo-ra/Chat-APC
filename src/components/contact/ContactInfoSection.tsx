import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567'],
    subtext: 'Mon-Fri 9AM-6PM EST',
    color: { light: '#059669', dark: '#10B981' },
  },
  {
    icon: Email,
    title: 'Email Us',
    details: ['hello@alphapc.com'],
    subtext: '24-hour response guarantee',
    color: { light: '#2563EB', dark: '#3B82F6' },
  },
  {
    icon: LocationOn,
    title: 'Visit Us',
    details: ['1500 Industrial Blvd, Suite 200', 'Houston, TX 77032'],
    subtext: 'Valid ID required for access',
    color: { light: '#7C3AED', dark: '#8B5CF6' },
  },
];

const ContactInfoSection: React.FC = () => {
  const { isDark } = useThemeMode();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: "transparent",
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.4rem' },
              fontWeight: 800,
              background: isDark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #3B82F6 100%)'
                : 'linear-gradient(135deg, #1E293B 0%, #2563EB 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Multiple ways to connect with our expert team
          </Typography>
        </Box>

        {/* Contact Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '16px',
                    background: isDark
                      ? 'rgba(31, 41, 55, 0.8)'
                      : 'rgba(255, 255, 255, 0.95)',
                    border: isDark
                      ? '1px solid rgba(75, 85, 99, 0.3)'
                      : '1px solid rgba(226, 232, 240, 0.5)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      borderColor: info.color[isDark ? 'dark' : 'light'],
                      boxShadow: isDark
                        ? `0 20px 60px ${info.color.dark}20`
                        : `0 20px 60px ${info.color.light}15`,
                      '& .icon-container': {
                        background: `linear-gradient(135deg, ${info.color[isDark ? 'dark' : 'light']} 0%, ${info.color[isDark ? 'dark' : 'light']}CC 100%)`,
                        transform: 'scale(1.05)',
                      },
                      '& .icon': {
                        color: '#FFFFFF',
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="icon-container"
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '16px',
                        background: `${info.color[isDark ? 'dark' : 'light']}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <IconComponent
                        className="icon"
                        sx={{
                          fontSize: 32,
                          color: info.color[isDark ? 'dark' : 'light'],
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(30, 41, 59, 1)',
                        mb: 2,
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      {info.title}
                    </Typography>

                    {/* Details */}
                    <Box sx={{ flex: 1, mb: 2 }}>
                      {info.details.map((detail, detailIndex) => (
                        <Typography
                          key={detailIndex}
                          sx={{
                            fontSize: '1rem',
                            color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                            lineHeight: 1.6,
                            mb: 0.5,
                            fontWeight: 600,
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>

                    {/* Subtext */}
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 1)',
                        fontWeight: 500,
                      }}
                    >
                      {info.subtext}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactInfoSection;