import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useThemeMode } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface HeroSearchSectionProps {
  questions: string[];
}

const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatingInput, setShowFloatingInput] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark } = useThemeMode();

  // Animated placeholder effect (only show when no messages)
  useEffect(() => {
    if (messages.length > 0) return;
    
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
  }, [currentQuestionIndex, charIndex, isDeleting, questions, messages.length]);

  useEffect(() => {
    setCharIndex(0);
    setCurrentText('');
  }, [currentQuestionIndex]);

  // Auto-scroll to bottom when messages change (only within the messages container)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Scroll detection for floating input (mobile only)
  useEffect(() => {
    if (!isMobile) {
      setShowFloatingInput(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight * 0.8; // Approximate hero section height
      
      // Show floating input after scrolling down 300px or past hero section
      if (scrollY > Math.min(300, heroSectionHeight)) {
        setShowFloatingInput(true);
      } else {
        setShowFloatingInput(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Sample suggestion buttons
  const suggestions = [
    'Learn about ChatAPC',
    'Analyze my process data',
    'Show me optimization tips',
    'Explain control strategies',
  ];

  // AI responses with follow-up questions
  const getAIResponse = (userMessage: string): { response: string; followUp: string } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('learn') || lowerMessage.includes('about') || lowerMessage.includes('what')) {
      return {
        response: "ChatAPC is an advanced AI assistant specifically designed for process engineers. It helps you optimize control systems, analyze industrial data, troubleshoot issues, and improve operational efficiency using advanced machine learning algorithms.",
        followUp: "Would you like to see some example questions you can ask me?"
      };
    } else if (lowerMessage.includes('analyze') || lowerMessage.includes('data')) {
      return {
        response: "I can analyze your process data in multiple ways: identify trends, detect anomalies, predict potential issues, and suggest optimization opportunities. I work with real-time data streams and historical records.",
        followUp: "What type of process data would you like to analyze?"
      };
    } else if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
      return {
        response: "Process optimization with ChatAPC involves analyzing your control loops, identifying inefficiencies, recommending parameter adjustments, and implementing advanced control strategies. We focus on improving yield, reducing waste, and enhancing stability.",
        followUp: "Which aspect of your process would you like to optimize first?"
      };
    } else if (lowerMessage.includes('control') || lowerMessage.includes('strategy')) {
      return {
        response: "I can help you implement various control strategies including PID tuning, Model Predictive Control (MPC), cascade control, feedforward control, and advanced process control (APC) techniques tailored to your specific industrial needs.",
        followUp: "What control challenges are you currently facing?"
      };
    } else {
      return {
        response: "I'm here to help with all aspects of process control and optimization. From data analysis to control strategy implementation, I can assist you in making your industrial processes more efficient and reliable.",
        followUp: "What specific area would you like to explore?"
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const { response, followUp } = getAIResponse(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      // Add follow-up question after a short delay
      setTimeout(() => {
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: followUp,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, followUpMessage]);
      }, 800);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <Box
      sx={{
        minHeight: { xs: '80vh', md: '90vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: hasMessages ? 'flex-start' : 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5,
        padding: { xs: '20px 16px', sm: '40px 20px', md: '60px 40px' },
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
        paddingTop: hasMessages ? { xs: '100px', md: '100px' } : { xs: '80px', sm: '60px', md: '60px' },
      }}
    >
      {/* Main Title - Only show when no messages */}
      {!hasMessages && (
        <Typography
          sx={{
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
            fontWeight: 500,
            color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
            marginBottom: { xs: 4, sm: 5, md: 6 },
            letterSpacing: '-0.02em',
            px: { xs: 2, sm: 0 },
            transition: 'color 0.3s ease',
          }}
        >
          What can I help with?
        </Typography>
      )}

      {/* Messages Area */}
      {hasMessages && (
        <Box
          ref={messagesContainerRef}
          sx={{
            width: '100%',
            flex: 1,
            overflowY: 'auto',
            marginBottom: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
            maxHeight: { xs: 'calc(80vh - 180px)', md: 'calc(90vh - 200px)' },
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
              '&:hover': {
                background: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              },
            },
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  maxWidth: { xs: '85%', sm: '80%', md: '75%' },
                  padding: { xs: '10px 14px', sm: '12px 16px', md: '12px 18px' },
                  borderRadius: 3,
                  background: message.role === 'user'
                    ? (isDark 
                      ? 'linear-gradient(135deg, #009BE4 0%, #0077B6 100%)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)')
                    : (isDark 
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.05)'),
                  color: message.role === 'user' 
                    ? 'rgba(255, 255, 255, 0.95)'
                    : (isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)'),
                  textAlign: 'left',
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  lineHeight: 1.6,
                  border: message.role === 'assistant' 
                    ? (isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)')
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          
          {/* Loading State */}
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  padding: '12px 18px',
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CircularProgress size={20} sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                  Thinking...
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Suggestion Buttons - Only show when no messages */}
      {!hasMessages && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 1.5 },
            justifyContent: 'center',
            maxWidth: 680,
            width: '100%',
            marginBottom: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.15)' 
                  : '1px solid rgba(0, 0, 0, 0.15)',
                color: isDark 
                  ? 'rgba(255, 255, 255, 0.85)' 
                  : 'rgba(0, 0, 0, 0.7)',
                borderRadius: 3,
                padding: { xs: '8px 14px', sm: '10px 16px', md: '10px 18px' },
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                fontWeight: 400,
                textTransform: 'none',
                transition: 'all 0.2s ease',
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)',
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: isDark 
                    ? 'rgba(255, 255, 255, 0.25)' 
                    : 'rgba(0, 0, 0, 0.3)',
                  background: isDark 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {suggestion}
            </Button>
          ))}
        </Box>
      )}

      {/* Search Input Box - Fixed at bottom when there are messages */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 680,
          position: hasMessages ? 'sticky' : 'relative',
          bottom: hasMessages ? { xs: 10, sm: 15, md: 20 } : 'auto',
          px: { xs: 1, sm: 0 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            background: isDark 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.03)',
            border: isDark 
              ? '1px solid rgba(255, 255, 255, 0.12)' 
              : '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: { xs: 3, md: 4 },
            transition: 'all 0.2s ease',
            minHeight: { xs: '48px', sm: '52px', md: '56px' },
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              background: isDark 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.05)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.18)' 
                : '1px solid rgba(0, 0, 0, 0.18)',
            },
            '&:focus-within': {
              background: isDark 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.05)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(0, 0, 0, 0.3)',
              boxShadow: isDark 
                ? '0 0 0 3px rgba(0, 155, 228, 0.15)' 
                : '0 0 0 3px rgba(37, 99, 235, 0.15)',
            },
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={!hasMessages ? currentText : 'Type your message...'}
            variant="standard"
            disabled={isLoading}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              flex: 1,
              '& .MuiInputBase-root': {
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                padding: { xs: '12px 16px', sm: '14px 18px', md: '16px 20px' },
                paddingRight: { xs: '48px', md: '56px' },
              },
              '& textarea': {
                lineHeight: 1.5,
                '&::placeholder': {
                  color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.4)',
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            onClick={handleSendMessage}
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 10, md: 12 },
              bottom: { xs: 8, sm: 10, md: 12 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 28, sm: 30, md: 32 },
              height: { xs: 28, sm: 30, md: 32 },
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
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' }, 
                color: inputValue.trim() && !isLoading 
                  ? (isDark ? '#0a0e2e' : '#FFFFFF')
                  : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'),
              }} 
            />
          </Box>
        </Box>
      </Box>

      {/* Floating Input Box - Mobile Only */}
      {isMobile && showFloatingInput && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: '500px',
            zIndex: 1200,
            animation: 'slideUp 0.3s ease-out',
            '@keyframes slideUp': {
              '0%': {
                transform: 'translateX(-50%) translateY(100px)',
                opacity: 0,
              },
              '100%': {
                transform: 'translateX(-50%) translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              background: 'rgba(52, 64, 84, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              padding: '12px 16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '0.95rem',
                },
                '& input': {
                  padding: 0,
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.45)',
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
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.2)',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                '&:hover': inputValue.trim() && !isLoading ? {
                  background: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.05)',
                } : {},
              }}
            >
              <ArrowUpwardIcon 
                sx={{ 
                  fontSize: '1.1rem', 
                  color: inputValue.trim() && !isLoading ? '#0a0e2e' : 'rgba(255, 255, 255, 0.4)',
                }} 
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HeroSearchSection;

