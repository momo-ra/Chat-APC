import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

interface TypingTextProps {
  text: string;
  speed?: number;
  isDark: boolean;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 25, 
  isDark, 
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);

        // Trigger scroll to bottom during typing
        const scrollableArea = document.querySelector('[data-scrollable-area="true"]');
        if (scrollableArea) {
          scrollableArea.scrollTo({
            top: scrollableArea.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete && currentIndex >= text.length) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <Box
      sx={{
        maxWidth: '85%',
        color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
        lineHeight: 1.6,
        textAlign: 'left',
        whiteSpace: 'pre-line',
        fontWeight: 400,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '1.2em',
            backgroundColor: isDark ? '#009BE4' : '#3B82F6',
            ml: 0.5,
            animation: 'blink 1.2s infinite',
            '@keyframes blink': {
              '0%, 49%': { opacity: 1 },
              '50%, 100%': { opacity: 0 },
            },
          }}
        />
      )}
    </Box>
  );
};