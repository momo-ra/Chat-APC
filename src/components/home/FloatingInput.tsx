import React from 'react';
import { Box, TextField, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useThemeMode } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FloatingInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  showAutoDemo: boolean;
  demoStep: number;
  setMessages: (messages: Message[]) => void;
  setShowAutoDemo: (show: boolean) => void;
  setDemoStep: (step: number) => void;
  demoExample: {
    user: string;
    assistant: string;
  };
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isLoading,
  showAutoDemo,
  demoStep,
  setMessages,
  setShowAutoDemo,
  setDemoStep,
  demoExample,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark } = useThemeMode();

  if (!isMobile) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        width: 'auto',
        maxWidth: '480px',
        margin: '0 auto',
        zIndex: 1200,
        animation: 'slideUp 0.3s ease-out',
        '@keyframes slideUp': {
          '0%': {
            transform: 'translateY(100px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          background: isDark 
            ? 'rgba(52, 64, 84, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          padding: '10px 14px',
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => {
            // Stop demo and add demo messages when user starts typing
            if (showAutoDemo && e.target.value.length > 0 && demoStep >= 3) {
              const demoUserMessage: Message = {
                id: 'demo-user',
                role: 'user',
                content: demoExample.user,
                timestamp: new Date(),
              };
              const demoAiMessage: Message = {
                id: 'demo-ai',
                role: 'assistant',
                content: demoExample.assistant,
                timestamp: new Date(),
              };
              setMessages([demoUserMessage, demoAiMessage]);
              setShowAutoDemo(false);
              setDemoStep(0);
            }
            setInputValue(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Ask ChatAPC"
          variant="standard"
          disabled={isLoading}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              color: isDark 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(0, 0, 0, 0.87)',
              fontSize: '0.95rem',
            },
            '& input': {
              padding: 0,
              '&::placeholder': {
                color: isDark 
                  ? 'rgba(255, 255, 255, 0.45)' 
                  : 'rgba(0, 0, 0, 0.4)',
                opacity: 1,
              },
            },
          }}
        />
        <Box
          onClick={handleSendMessage}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: inputValue.trim() && !isLoading
              ? (isDark 
                ? 'rgba(255, 255, 255, 0.9)' 
                : '#2563EB')
              : (isDark 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.15)'),
            cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            '&:hover': inputValue.trim() && !isLoading ? {
              background: isDark 
                ? 'rgba(255, 255, 255, 1)' 
                : '#1E40AF',
              transform: 'scale(1.05)',
            } : {},
          }}
        >
          <ArrowUpwardIcon 
            sx={{ 
              fontSize: '1.1rem', 
              color: inputValue.trim() && !isLoading 
                ? (isDark ? '#0a0e2e' : '#FFFFFF')
                : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'),
            }} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingInput;
