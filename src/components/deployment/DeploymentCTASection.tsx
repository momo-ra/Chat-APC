import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { CalendarToday } from '@mui/icons-material';

const DeploymentCTASection: React.FC = () => {
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
  const {
    containerMaxWidth,
    containerPadding,
    bodyLargeFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  const ctaColor = { light: '#3B82F6', dark: '#60A5FA' };

  return (
    <Box
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          sx={{
            pt: { xs: 8, md: 10 },
            borderTop: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
          }}
        >
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              fontWeight: 500,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#475569',
              lineHeight: 1.7,
              mb: 5,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            ChatAPC deployment is lightweight, secure, and adaptable — engineered to integrate seamlessly into your existing infrastructure while providing the advanced analytics capabilities your operations need to thrive in an increasingly competitive market.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CalendarToday />}
              onClick={() => navigate('/company/contact')}  
              sx={{
                background: ctaColor[isDark ? 'dark' : 'light'],
                color: '#FFFFFF',
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: `0 8px 24px ${ctaColor[isDark ? 'dark' : 'light']}40`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 32px ${ctaColor[isDark ? 'dark' : 'light']}50`,
                  background: ctaColor[isDark ? 'dark' : 'light'],
                  filter: 'brightness(1.1)',
                },
              }}
            >
              Schedule a Deployment Consultation
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DeploymentCTASection;