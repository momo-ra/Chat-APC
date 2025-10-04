import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const DeploymentCTASection: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(0, 155, 228, 0.05) 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: { xs: '1.3rem', md: '1.6rem' },
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          ChatAPC deployment is lightweight, secure, and adaptable — engineered to integrate seamlessly into your existing infrastructure while providing the advanced analytics capabilities your operations need to thrive in an increasingly competitive market.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)',
            color: '#fff',
            padding: '16px 48px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: '0 8px 24px rgba(0, 155, 228, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(0, 155, 228, 0.4)',
              background: 'linear-gradient(135deg, #00AFF5 0%, #0088C7 100%)',
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

