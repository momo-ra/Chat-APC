import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, useTheme, useMediaQuery, Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AutoAwesome, Psychology } from '@mui/icons-material';
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
        maxWidth: { xs: '95%', sm: '90%', md: '85%' },
        color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
        fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
        lineHeight: { xs: 1.5, sm: 1.55, md: 1.6 },
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
        gap: { xs: 1.25, sm: 1.75, md: 2 },
        mb: { xs: 2, sm: 2.5, md: 3 },
        animation: 'fadeInUp 0.8s ease-out',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
          textAlign: 'center',
          fontWeight: 600,
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          mb: { xs: 0.75, sm: 1 },
        }}
      >
        {title}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 1.5 },
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
              borderRadius: { xs: '10px', sm: '12px' },
              padding: { xs: '5px 6px', sm: '6px 8px' },
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
              background: isDark 
                ? 'rgba(0, 155, 228, 0.05)' 
                : 'rgba(59, 130, 246, 0.05)',
              minHeight: { xs: '36px', sm: '40px', md: '42px' },
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

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
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
          background: 'transparent',
          transition: 'background 0.3s ease',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            padding: { xs: '20px 18px', sm: '30px 24px', md: '40px 80px' },
            maxWidth: { xs: '100%', sm: '100%', md: 1000 },
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '95vh',
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
          {/* Enhanced Header Section */}
          <Box sx={{ textAlign: 'center', mb: 2, position: 'relative' }}>

            {/* Main Title */}
            <Typography
              sx={{
                fontSize: { xs: '2.1rem', sm: '2.75rem', md: '3.5rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: 2,
                my: { xs: 0, sm: 1, md: 2 },
                letterSpacing: '-0.02em',
                textAlign: 'center',
                position: 'relative',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              <Box
                component="span"
                sx={{
                  background: isDark 
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)'
                    : 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  mb: 0.5,
                  my: { xs: 0, sm: 1, md: 2 },
                }}
              >
                Chat with your plant.
              </Box>
              <Box
                component="span"
                sx={{
                  background: isDark 
                    ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                }}
              >
                Turn data into decisions.
              </Box>
            </Typography>
            
            {/* Enhanced Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.175rem' },
                fontWeight: 400,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                lineHeight: 1.4,
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              <Box
                component="span"
                sx={{
                  background: isDark 
                    ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                }}
              >
                ChatAPC
              </Box>{' '}
              blends engineering expertise with AI to deliver clear, reliable insights detecting issues early and revealing profit opportunities.
            </Typography>
          </Box>

          {/* Enhanced Chat Area */}
          <Box
            ref={messagesContainerRef}
            data-messages-container="true"
            sx={{
              width: '100%',
              maxWidth: 850,
              background: isDark 
                ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.08)' 
                : '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '32px',
              boxShadow: isDark 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
              padding: 0,
              marginBottom: 1,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: '380px', sm: '650px', md: '850px' },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)',
                borderRadius: '32px',
                pointerEvents: 'none',
              },
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
                padding: { xs: 2, sm: 3, md: 4 },
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  borderRadius: 6,
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
                      mb: { xs: 1.5, sm: 2 }
                    }}>
                      <Box sx={{
                        maxWidth: { xs: '92%', sm: '90%' },
                        padding: { xs: '10px 12px', sm: '12px 16px' },
                        borderRadius: { xs: '16px', sm: '20px' },
                        background: isDark 
                          ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
                          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: isDark ? '1px solid rgba(0, 155, 228, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1.5, sm: 2.5, md: 3 },
                        boxShadow: isDark 
                          ? '0 8px 32px rgba(0, 155, 228, 0.15)'
                          : '0 8px 32px rgba(59, 130, 246, 0.15)',
                      }}>
                        <Box sx={{
                          fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
                          lineHeight: { xs: 1.5, sm: 1.6 },
                          color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
                          flex: 1,
                          fontWeight: 500,
                          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}>
                          {message.content}
                        </Box>
                        <Box sx={{
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                          fontWeight: 700,
                          flexShrink: 0,
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
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
                        gap: 3, 
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
              
              {/* Enhanced Loading State */}
              {isLoading && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-start', 
                  alignItems: 'flex-start', 
                  gap: { xs: 1.5, sm: 2.5, md: 3 }, 
                  width: '100%', 
                  mb: { xs: 2, sm: 3, md: 4 } 
                }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.5, sm: 2 },
                    padding: { xs: '10px 14px', sm: '14px 18px', md: '16px 20px' },
                    borderRadius: { xs: '12px', sm: '14px', md: '16px' },
                    background: isDark 
                      ? 'rgba(0, 155, 228, 0.08)'
                      : 'rgba(59, 130, 246, 0.08)',
                    border: isDark 
                      ? '1px solid rgba(0, 155, 228, 0.2)'
                      : '1px solid rgba(59, 130, 246, 0.2)',
                  }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: { xs: 6, sm: 7, md: 8 },
                          height: { xs: 6, sm: 7, md: 8 },
                          borderRadius: '50%',
                          background: isDark ? '#009BE4' : '#3B82F6',
                          animation: 'bounce 1.4s infinite ease-in-out',
                          animationDelay: `${delay}s`,
                        }}
                      />
                    ))}
                    <Typography sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
                      fontWeight: 500,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      ml: { xs: 0.5, sm: 0.75, md: 1 },
                      display: { xs: 'none', sm: 'block' },
                    }}>
                      {processingStages[currentStage]}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Enhanced Input at Bottom */}
            <Box sx={{
              padding: { xs: 2, sm: 3, md: 4 },
              paddingTop: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: '0 0 32px 32px',
            }}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                border: isDark 
                  ? { xs: '1.5px solid rgba(255, 255, 255, 0.08)', sm: '2px solid rgba(255, 255, 255, 0.08)' }
                  : { xs: '1.5px solid rgba(0, 0, 0, 0.05)', sm: '2px solid rgba(0, 0, 0, 0.05)' },
                borderRadius: { xs: '16px', sm: '18px', md: '20px' },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: isDark 
                    ? 'rgba(0, 155, 228, 0.3)' 
                    : 'rgba(59, 130, 246, 0.3)',
                },
                '&:focus-within': {
                  borderColor: isDark 
                    ? 'rgba(0, 155, 228, 0.5)' 
                    : 'rgba(59, 130, 246, 0.5)',
                  boxShadow: isDark 
                    ? { xs: '0 0 0 3px rgba(0, 155, 228, 0.1)', sm: '0 0 0 4px rgba(0, 155, 228, 0.1)' }
                    : { xs: '0 0 0 3px rgba(59, 130, 246, 0.1)', sm: '0 0 0 4px rgba(59, 130, 246, 0.1)' },
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
                      fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                      fontWeight: 400,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      lineHeight: { xs: 1.5, sm: 1.55, md: 1.6 },
                      padding: { xs: '14px 56px 14px 16px', sm: '16px 62px 16px 20px', md: '20px 70px 20px 24px' },
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
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
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
                    right: { xs: 10, sm: 12, md: 16 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: { xs: 40, sm: 44, md: 48 },
                    height: { xs: 40, sm: 44, md: 48 },
                    borderRadius: { xs: '12px', sm: '14px', md: '16px' },
                    background: inputValue.trim() && !isLoading && !isTyping
                      ? (isDark ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)' : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)')
                      : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
                    cursor: inputValue.trim() && !isLoading && !isTyping ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': inputValue.trim() && !isLoading && !isTyping ? {
                      background: isDark 
                        ? 'linear-gradient(135deg, #0284C7 0%, #10B981 100%)'
                        : 'linear-gradient(135deg, #1D4ED8 0%, #059669 100%)',
                      transform: 'translateY(-50%) translateY(-2px) scale(1.05)',
                      boxShadow: isDark
                        ? '0 8px 25px rgba(0, 155, 228, 0.4)'
                        : '0 8px 25px rgba(59, 130, 246, 0.4)',
                    } : {},
                  }}
                >
                  <ArrowUpwardIcon 
                    sx={{ 
                      fontSize: { xs: '1.1rem', sm: '1.175rem', md: '1.25rem' },
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