import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface HeroSearchSectionProps {
  questions: string[];
}

const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Animated placeholder effect
  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentQuestion.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
        }, 500);
      }
    } else {
      if (charIndex < currentQuestion.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentQuestion.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentQuestionIndex, charIndex, isDeleting, questions]);

  useEffect(() => {
    setCharIndex(0);
    setCurrentText('');
  }, [currentQuestionIndex]);

  // Sample suggestion buttons
  const suggestions = [
    'Learn about ChatAPC',
    'Search with ChatAPC',
    'Talk with ChatAPC',
    'Analyze Process',
    'More'
  ];

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5,
        padding: { xs: '40px 20px', md: '60px 40px' },
        maxWidth: 800,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Main Title */}
      <Typography
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: 6,
          letterSpacing: '-0.02em',
        }}
      >
        What can I help with?
      </Typography>

      {/* Search Input Box */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 680,
          marginBottom: 3,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 4,
            transition: 'all 0.2s ease',
            minHeight: '56px',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            },
            '&:focus-within': {
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 0 3px rgba(0, 155, 228, 0.15)',
            },
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentText}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              flex: 1,
              '& .MuiInputBase-root': {
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '1.05rem',
                padding: '16px 20px',
                paddingRight: '56px',
              },
              '& textarea': {
                lineHeight: 1.5,
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.45)',
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: inputValue.trim() 
                ? 'rgba(255, 255, 255, 0.9)' 
                : 'rgba(255, 255, 255, 0.2)',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              '&:hover': inputValue.trim() ? {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'scale(1.05)',
              } : {},
            }}
          >
            <ArrowUpwardIcon 
              sx={{ 
                fontSize: '1.1rem', 
                color: inputValue.trim() ? '#0a0e2e' : 'rgba(255, 255, 255, 0.4)',
              }} 
            />
          </Box>
        </Box>
      </Box>

      {/* Suggestion Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          justifyContent: 'center',
          maxWidth: 680,
          width: '100%',
        }}
      >
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outlined"
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.85)',
              borderRadius: 3,
              padding: '10px 18px',
              fontSize: '0.9rem',
              fontWeight: 400,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.08)',
                transform: 'translateY(-1px)',
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

export default HeroSearchSection;

