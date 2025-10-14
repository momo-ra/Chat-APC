import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useThemeMode } from '../../contexts/ThemeContext';
import FloatingInput from './FloatingInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Enhanced Typing Animation Component with proper scroll handling
const TypingText: React.FC<{ text: string; speed?: number; isDark: boolean; onComplete?: () => void }> = ({ text, speed = 25, isDark, onComplete }) => {
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

// Enhanced Suggestion Questions Component with better styling
const SuggestionQuestions: React.FC<{
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isDark: boolean;
  title?: string;
  disabled?: boolean;
}> = ({ suggestions, onSuggestionClick, isDark, title = "What would you like to explore?", disabled = false }) => {
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
          flexDirection: { xs: 'column', sm: 'row' },
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
              flex: 1,
              textAlign: 'center',
              border: isDark 
                ? '1px solid rgba(0, 155, 228, 0.3)' 
                : '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '6px 8px',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
              background: isDark 
                ? 'rgba(0, 155, 228, 0.05)' 
                : 'rgba(59, 130, 246, 0.05)',
              minHeight: '42px',
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

interface HeroSearchSectionProps {}

const HeroSearchSection: React.FC<HeroSearchSectionProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatingInput, setShowFloatingInput] = useState(false);
  const [lastAskedQuestion, setLastAskedQuestion] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark } = useThemeMode();
  
  // Processing stages
  const processingStages = [
    'Analyzing real-time process data...',
    'Checking control loop performance...',
    'Reviewing constraint status...',
    'Generating insights...',
    'Preparing recommendations...'
  ];
  const [currentStage, setCurrentStage] = useState(0);
  
  // New flow state
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [waitingForUserInput, setWaitingForUserInput] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initial welcome message
  const initialWelcomeMessage = "Welcome to ChatAPC! I'm your AI assistant for process control and optimization. I can help you analyze constraints, identify opportunities, and optimize your plant operations in real-time.\n\nLet's get started with some common questions you might have:";

  // Suggestion questions that appear after responses
  const suggestionQuestions = [
    'Analyze my current process constraints',
    'Show me optimization opportunities', 
    'Explain recent process changes',
  ];

  // Expanded suggestion questions pool
  const allSuggestionQuestions = [
    'Analyze my current process constraints',
    'Show me optimization opportunities', 
    'Explain recent process changes',
    'Review equipment performance trends',
    'Identify energy efficiency improvements',
    'Check control loop stability',
    'Analyze production bottlenecks',
    'Review safety system status',
    'Examine quality control metrics',
    'Assess maintenance requirements',
    'Monitor environmental compliance',
    'Evaluate cost reduction opportunities',
    'Check alarm system performance',
    'Review operator performance data',
    'Analyze raw material efficiency'
  ];

  // Enhanced AI responses with more variety and no repeated questions
  const getAIResponse = (userMessage: string, lastQuestion: string): { response: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Filter out the question that was just asked
    const availableSuggestions = allSuggestionQuestions.filter(q => 
      q.toLowerCase() !== lastQuestion.toLowerCase()
    );
    
    if (lowerMessage.includes('constraint') || lowerMessage.includes('analyze') && lowerMessage.includes('constraint')) {
      return {
        response: "I've analyzed your current process constraints and identified several key areas:\n\n• **Active Constraints**: 3 control loops currently at their limits\n• **Bottleneck Analysis**: Unit 200 reactor temperature is the primary constraint\n• **Impact Assessment**: Current constraints are reducing throughput by ~12%\n• **Economic Impact**: Estimated $45K/day in lost revenue potential\n\nThe main constraint appears to be the reactor temperature limit (TI-200), which is preventing higher feed rates and limiting overall production capacity.",
        suggestions: availableSuggestions.filter(q => 
          q.includes('optimization') || q.includes('equipment') || q.includes('bottleneck')
        ).slice(0, 3)
      };
    } else if (lowerMessage.includes('optimization') || lowerMessage.includes('opportunities')) {
      return {
        response: "I've identified several optimization opportunities in your current process:\n\n• **Control Loop Tuning**: 4 loops showing suboptimal response times\n• **Setpoint Optimization**: Temperature and pressure targets could be adjusted\n• **Advanced Control**: Potential for implementing multivariable control strategies\n• **Economic Potential**: Estimated $200K+ annual savings opportunity\n\nThe highest-impact opportunity involves optimizing your reactor temperature control strategy, which could improve throughput by 6-8%.",
        suggestions: availableSuggestions.filter(q => 
          q.includes('energy') || q.includes('control') || q.includes('cost')
        ).slice(0, 3)
      };
    } else if (lowerMessage.includes('changes') || lowerMessage.includes('explain') && lowerMessage.includes('changes')) {
      return {
        response: "Recent process changes detected in your system:\n\n• **Last 4 hours**: Feed composition shifted by 3.2% (higher C3 content)\n• **Control Adjustments**: 2 setpoints modified by operations team\n• **Equipment Performance**: Compressor C-101 efficiency decreased to 92%\n• **Overall Impact**: Unit efficiency down 1.8% from normal operation\n\nThe most significant change was the feed composition shift, which has affected downstream separation efficiency and increased reboiler duty.",
        suggestions: availableSuggestions.filter(q => 
          q.includes('equipment') || q.includes('quality') || q.includes('performance')
        ).slice(0, 3)
      };
    } else {
      // Default response with random suggestions
      const randomSuggestions = availableSuggestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      return {
        response: "I can help you with various aspects of process control and optimization:\n\n• **Real-time Analysis**: Monitor constraints and performance indicators\n• **Optimization**: Identify improvement opportunities and cost savings\n• **Troubleshooting**: Diagnose issues and recommend solutions\n• **Reporting**: Generate insights and performance summaries\n\nI have access to your current process data and can provide specific insights tailored to your plant operations.",
        suggestions: randomSuggestions
      };
    }
  };

  // Initialize with welcome message and first suggestions
  useEffect(() => {
    setCurrentSuggestions(suggestionQuestions);
  }, []);

  // Initial welcome flow
  useEffect(() => {
    if (showInitialMessage && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome-message',
        role: 'assistant',
        content: initialWelcomeMessage,
        timestamp: new Date(),
      };
      
      setTimeout(() => {
        setIsTyping(true);
        setMessages([welcomeMessage]);
      }, 1500);
    }
  }, [showInitialMessage, messages.length]);
  
  // Callback for when welcome message typing completes
  const handleWelcomeTypingComplete = () => {
    setIsTyping(false);
    setShowSuggestions(true);
    setWaitingForUserInput(true);
    setShowInitialMessage(false);
  };
  
  // Callback for when AI response typing completes
  const handleResponseTypingComplete = () => {
    setIsTyping(false);
    setShowSuggestions(true);
    setWaitingForUserInput(true);
  };

  // Enhanced scroll to bottom effect
  useEffect(() => {
    const scrollContainer = scrollableAreaRef.current;
    if (scrollContainer) {
      const scrollToBottom = () => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      };
      
      // Multiple scroll attempts to ensure it reaches bottom
      requestAnimationFrame(scrollToBottom);
      const timeoutId1 = setTimeout(scrollToBottom, 50);
      const timeoutId2 = setTimeout(scrollToBottom, 150);
      
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [messages, isLoading, showSuggestions, isTyping]);
  
  // Smooth scroll during typing animation
  useEffect(() => {
    if (isTyping) {
      const scrollContainer = scrollableAreaRef.current;
      if (scrollContainer) {
        const scrollInterval = setInterval(() => {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
          });
        }, 200);
        
        return () => clearInterval(scrollInterval);
      }
    }
  }, [isTyping]);

  // Processing stages animation
  useEffect(() => {
    if (!isLoading) {
      setCurrentStage(0);
      return;
    }
    
    let stageIndex = 0;
    setCurrentStage(0);
    
    const interval = setInterval(() => {
      stageIndex = (stageIndex + 1) % processingStages.length;
      setCurrentStage(stageIndex);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  // Floating input for mobile
  useEffect(() => {
    if (!isMobile) {
      setShowFloatingInput(false);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroSectionHeight = window.innerHeight * 0.8;
          
          if (scrollY > Math.min(300, heroSectionHeight)) {
            setShowFloatingInput(true);
          } else {
            setShowFloatingInput(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Fixed suggestion click handler
  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading || isTyping) {
      return;
    }
    
    setInputValue(suggestion);
    setShowSuggestions(false);
    setWaitingForUserInput(false);
    handleSendMessage(suggestion);
  };

  const handleSendMessage = async (messageToSend?: string) => {
    const messageContent = messageToSend || inputValue.trim();
    
    if (!messageContent || isLoading || isTyping) {
      return;
    }

    setLastAskedQuestion(messageContent);
    setShowSuggestions(false);
    setWaitingForUserInput(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      setIsLoading(true);
    }, 800);

    setTimeout(() => {
      const { response, suggestions } = getAIResponse(userMessage.content, messageContent);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setIsTyping(true);
      setCurrentSuggestions(suggestions);
    }, 7500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Unified Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-0.5deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
          width: '100%',
          minHeight: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'background 0.3s ease',
          background: isDark 
            ? 'radial-gradient(ellipse 80% 50% at 20% -20%, rgba(0, 155, 228, 0.15) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 120%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), linear-gradient(135deg, #0F1419 0%, #1A202C 50%, #0F1419 100%)'
            : 'radial-gradient(ellipse 80% 50% at 20% -20%, rgba(37, 99, 235, 0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 120%, rgba(16, 185, 129, 0.06) 0%, transparent 60%), linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1920&q=60')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            opacity: isDark ? 0.08 : 0.04,
            filter: isDark 
              ? 'brightness(0.6) contrast(1.3) saturate(1.4)'
              : 'brightness(1.4) contrast(1.1) saturate(1.1)',
            zIndex: 0,
            transition: 'opacity 0.3s ease',
            transform: 'translateZ(0)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark 
              ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.92) 0%, rgba(26, 32, 44, 0.88) 50%, rgba(15, 20, 25, 0.92) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.95) 50%, rgba(255, 255, 255, 0.97) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            padding: { xs: '24px 20px', sm: '40px 32px', md: '60px 80px' },
            maxWidth: { xs: '100%', sm: '100%', md: 1000 },
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
            },
          }}
        >
          {/* Main Title */}
          <Typography
            sx={{
              fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' },
              fontWeight: 700,
              background: isDark 
                ? 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, #E2E8F0 100%)'
                : 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #475569 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              mb: 2,
              textAlign: 'center',
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '3px',
                background: isDark
                  ? 'linear-gradient(90deg, #009BE4 0%, #34D399 100%)'
                  : 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                borderRadius: '4px',
                opacity: 0.8,
              },
            }}
          >
            Chat with your plant. Get straight answers.
          </Typography>
          
          <Typography
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
              fontWeight: 500,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
              lineHeight: 1.6,
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 1rem auto',
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '1px',
                background: isDark 
                  ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(15,23,42,0.4) 50%, transparent 100%)',
              },
            }}
          >
            <Box component="span" sx={{
              background: isDark 
                ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}>
              ChatAPC
            </Box>{' '}
            analyzes your process data, identifies constraints, and recommends optimizations in real-time.
          </Typography>

          {/* Chat Area */}
          <Box
            ref={messagesContainerRef}
            data-messages-container="true"
            sx={{
              width: '100%',
              maxWidth: 750,
              background: isDark 
                ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark 
                ? '1px solid rgba(71, 85, 105, 0.4)' 
                : '1px solid rgba(226, 232, 240, 0.6)',
              borderRadius: '20px',
              boxShadow: isDark 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)',
              padding: 0,
              marginBottom: 3,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: '420px', sm: '560px', md: '650px' },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable Messages Area */}
            <Box
              ref={scrollableAreaRef}
              data-scrollable-area="true"
              sx={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                padding: { xs: 2, sm: 2.5, md: 3 },
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  borderRadius: 4,
                  '&:hover': {
                    background: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                  },
                },
              }}
            >
              {/* Messages */}
              {messages.map((message, index) => (
                <Box key={message.id}>
                  {message.role === 'user' ? (
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      mb: 2
                    }}>
                      <Box sx={{
                        maxWidth: '90%',
                        padding: '8px 10px',
                        borderRadius: '16px',
                        background: isDark 
                          ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.8) 0%, rgba(55, 65, 81, 0.9) 100%)'
                          : 'linear-gradient(135deg, rgba(226, 232, 240, 0.9) 0%, rgba(203, 213, 225, 0.95) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: isDark ? '1px solid rgba(71, 85, 105, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: isDark 
                          ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                          : '0 4px 20px rgba(0, 0, 0, 0.08)',
                      }}>
                        <Box sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                          lineHeight: 1.6,
                          color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
                          flex: 1,
                          fontWeight: 400,
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}>
                          {message.content}
                        </Box>
                        <Box sx={{
                          width: 35,
                          height: 35,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          fontFamily: '"Inter", sans-serif',
                        }}>
                          MG
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: 2, 
                        maxWidth: '95%',
                        mb: 3
                      }}>
                        <TypingText 
                          text={message.content} 
                          speed={25} 
                          isDark={isDark}
                          onComplete={message.id === 'welcome-message' ? handleWelcomeTypingComplete : (index === messages.length - 1 ? handleResponseTypingComplete : undefined)}
                        />
                      </Box>
                      
                      {/* Show suggestion questions after the welcome message ONLY */}
                      {message.id === 'welcome-message' && showSuggestions && (
                        <SuggestionQuestions
                          suggestions={currentSuggestions}
                          onSuggestionClick={handleSuggestionClick}
                          isDark={isDark}
                          title="What would you like to explore?"
                          disabled={isLoading || isTyping}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              ))}

              {/* Show suggestion questions for subsequent AI responses */}
              {showSuggestions && messages.length > 1 && 
               messages[messages.length - 1]?.role === 'assistant' && 
               messages[messages.length - 1]?.id !== 'welcome-message' && !isTyping && (
                <SuggestionQuestions
                  suggestions={currentSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  isDark={isDark}
                  title="What else can I help you with?"
                  disabled={isLoading || isTyping}
                />
              )}
              
              {/* Loading State */}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, width: '100%', mb: 4 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '12px 16px',
                    borderRadius: '12px',
                  }}>
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
                        }}
                      />
                    ))}
                    <Typography sx={{ 
                      fontSize: '0.9rem',
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
                      fontWeight: 500,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}>
                      {processingStages[currentStage]}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Fixed Input at Bottom */}
            <Box sx={{
              padding: { xs: 2, sm: 1.5, md: 2 },
              paddingTop: 2,
              borderRadius: '0 0 20px 20px',
            }}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '16px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: isDark 
                    ? 'rgba(0, 155, 228, 0.4)' 
                    : 'rgba(59, 130, 246, 0.4)',
                  boxShadow: 'none',
                },
                '&:focus-within': {
                  borderColor: isDark 
                    ? 'rgba(0, 155, 228, 0.6)' 
                    : 'rgba(59, 130, 246, 0.6)',
                  boxShadow: isDark 
                    ? '0 0 0 2px rgba(0, 155, 228, 0.1)' 
                    : '0 0 0 2px rgba(59, 130, 246, 0.1)',
                },
              }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={'Ask about your process...'}
                  variant="standard"
                  disabled={isLoading || isTyping}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    '& .MuiInputBase-root': {
                      color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
                      fontSize: { xs: '1rem', sm: '1.05rem' },
                      fontWeight: 400,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      lineHeight: 1.6,
                      padding: '18px 64px 18px 20px',
                      '&.Mui-disabled': {
                        color: isDark ? 'rgba(255, 255, 255, 0.75) !important' : 'rgba(15, 23, 42, 0.6)',
                        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.75) !important' : 'rgba(15, 23, 42, 0.6)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      padding: '0 !important',
                      '&::placeholder': {
                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)',
                        opacity: 1,
                        fontWeight: 400,
                      },
                      '&:disabled::placeholder': {
                        color: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(15, 23, 42, 0.4)',
                        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(15, 23, 42, 0.4)',
                      },
                    },
                    '& textarea': {
                      resize: 'none',
                      scrollbarWidth: 'thin',
                      '&::-webkit-scrollbar': {
                        width: '3px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '2px',
                      },
                      '&:disabled': {
                        color: isDark ? 'rgba(255, 255, 255, 0.75) !important' : 'rgba(15, 23, 42, 0.6)',
                        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.75) !important' : 'rgba(15, 23, 42, 0.6)',
                      },
                    },
                  }}
                />
                <Box
                  onClick={() => handleSendMessage()}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: inputValue.trim() && !isLoading && !isTyping
                      ? (isDark ? 'linear-gradient(135deg, #009BE4 0%, #3B82F6 100%)' : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)')
                      : (isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(203, 213, 225, 0.5)'),
                    cursor: inputValue.trim() && !isLoading && !isTyping ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': inputValue.trim() && !isLoading && !isTyping ? {
                      background: isDark 
                        ? 'linear-gradient(135deg, #93C5FD 0%, #009BE4 100%)'
                        : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                      transform: 'translateY(-50%) translateY(-2px)',
                      boxShadow: isDark
                        ? '0 4px 12px rgba(0, 155, 228, 0.4)'
                        : '0 4px 12px rgba(59, 130, 246, 0.3)',
                    } : {},
                  }}
                >
                  <ArrowUpwardIcon 
                    sx={{ 
                      fontSize: '1.2rem',
                      color: inputValue.trim() && !isLoading && !isTyping ? '#FFFFFF' : (isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.3)'),
                    }} 
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {showFloatingInput && (
            <FloatingInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              isLoading={isLoading}
              showAutoDemo={false}
              demoStep={0}
              setMessages={setMessages}
              setShowAutoDemo={() => {}}
              setDemoStep={() => {}}
              demoExample={{ user: '', assistant: '' }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default HeroSearchSection;