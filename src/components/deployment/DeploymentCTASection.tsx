import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const DeploymentCTASection: React.FC = () => {
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
        py: { xs: 8, md: 12 },
        transition: 'background 0.3s ease',
        '@media (min-width: 960px) and (max-width: 1549px)': {
          py: 10,
        },
        '@media (min-width: 1550px)': {
          py: 12,
        },
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          textAlign: 'center',
          '@media (min-width: 960px) and (max-width: 1549px)': {
            maxWidth: '850px',
            px: 2.5,
          },
          '@media (min-width: 1550px)': {
            maxWidth: '960px',
            px: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.3rem', md: '1.6rem' },
            fontWeight: 500,
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
            lineHeight: 1.7,
            mb: 5,
            transition: 'color 0.3s ease',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              fontSize: '1.45rem',
              mb: 4,
            },
          }}
        >
          ChatAPC deployment is lightweight, secure, and adaptable — engineered to integrate seamlessly into your existing infrastructure while providing the advanced analytics capabilities your operations need to thrive in an increasingly competitive market.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/company/contact')}  
          sx={{
            background: isDark 
              ? 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)'
              : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            color: '#fff',
            padding: '16px 48px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 4,
            textTransform: 'none',
            boxShadow: isDark 
              ? '0 8px 24px rgba(0, 155, 228, 0.3)'
              : '0 8px 24px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.3s ease',
            '@media (min-width: 960px) and (max-width: 1549px)': {
              fontSize: '1.05rem',
              padding: '14px 42px',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? '0 12px 32px rgba(0, 155, 228, 0.4)'
                : '0 12px 32px rgba(37, 99, 235, 0.4)',
              background: isDark 
                ? 'linear-gradient(135deg, #00AFF5 0%, #0088C7 100%)'
                : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
            },
          }}
        >
          Schedule a Deployment Consultation
        </Button>
      </Container>
    </Box>
  );
};

export default DeploymentCTASection;

