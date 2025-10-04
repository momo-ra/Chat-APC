import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' }, // Hidden on mobile
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '30px 48px',
        position: 'relative',
        zIndex: 10,
        background: 'transparent',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => navigate('/login')}
          variant="text"
          sx={{
            padding: '10px 24px',
            border: '1px solid transparent',
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            fontWeight: 400,
            borderRadius: 2,
            textTransform: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.95)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => navigate('/signup')}
          variant="outlined"
          sx={{
            padding: '10px 24px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            fontWeight: 400,
            borderRadius: 2,
            textTransform: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default AuthButtons;

