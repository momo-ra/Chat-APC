import React from 'react';
import { Box, Typography, Container } from '@mui/material';

interface CompanySliderProps {
  companies: string[];
}

const CompanySlider: React.FC<CompanySliderProps> = ({ companies }) => {
  // Duplicate companies for seamless loop
  const allCompanies = [...companies, ...companies];

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 6, md: 10 },
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(10, 14, 46, 0.5) 0%, rgba(0, 155, 228, 0.04) 50%, rgba(10, 14, 46, 0.6) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 155, 228, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Trusted by Industry Leaders
          </Typography>
        </Box>
        
        <Box
          sx={{
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              '@keyframes slide': {
                '0%': {
                  transform: 'translateX(0)',
                },
                '100%': {
                  transform: 'translateX(-100%)',
                },
              },
              animation: 'slide 30s linear infinite',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '50px', md: '80px' },
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {allCompanies.map((company, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: { xs: '0.85rem', md: '1rem' },
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.25)',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    flexShrink: 0,
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  {company}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CompanySlider;

