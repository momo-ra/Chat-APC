import React from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';

interface SuggestionQuestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isDark: boolean;
  title?: string;
  disabled?: boolean;
}

export const SuggestionQuestions: React.FC<SuggestionQuestionsProps> = ({ 
  suggestions, 
  onSuggestionClick, 
  isDark, 
  title = "What would you like to explore?", 
  disabled = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
        animation: 'fadeInUp 0.8s ease-out',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '0.9rem',
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
          textAlign: 'center',
          fontWeight: 600,
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'column',
          gap: 1.5,
          width: '100%',
        }}
      >
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => {
              if (!disabled) {
                onSuggestionClick(suggestion);
              }
            }}
            disabled={disabled}
            size="medium"
            sx={{
              width: '100%',
              textAlign: 'center',
              border: isDark 
                ? '1px solid rgba(0, 155, 228, 0.3)' 
                : '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '8px 12px',
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
              background: isDark 
                ? 'rgba(0, 155, 228, 0.05)' 
                : 'rgba(59, 130, 246, 0.05)',
              minHeight: '45px',
              '&:hover:not(:disabled)': {
                borderColor: isDark ? '#009BE4' : '#3B82F6',
                background: isDark 
                  ? 'rgba(0, 155, 228, 0.15)' 
                  : 'rgba(59, 130, 246, 0.1)',
                color: isDark ? '#009BE4' : '#2563EB',
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 8px 25px rgba(0, 155, 228, 0.25)'
                  : '0 8px 25px rgba(59, 130, 246, 0.2)',
              },
              '&:active:not(:disabled)': {
                transform: 'translateY(0px)',
              },
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
            }}
          >
            {suggestion}
          </Button>
        ))}
      </Box>
    </Box>
  );
};