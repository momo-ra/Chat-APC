import React from 'react';
import { Box, Typography } from '@mui/material';

interface LoadingIndicatorProps {
  isDark: boolean;
  currentStage: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  isDark, 
  currentStage 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
        width: '100%',
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '12px 16px',
          borderRadius: '12px',
        }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isDark ? '#009BE4' : '#3B82F6',
              animation: 'bounce 1.4s infinite ease-in-out',
              animationDelay: `${delay}s`,
              '@keyframes bounce': {
                '0%, 80%, 100%': { transform: 'scale(0)' },
                '40%': { transform: 'scale(1)' },
              },
            }}
          />
        ))}
        <Typography
          sx={{
            fontSize: '0.9rem',
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
            fontWeight: 500,
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {currentStage}
        </Typography>
      </Box>
    </Box>
  );
};