import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useThemeMode } from '../../contexts/ThemeContext';
import FloatingInput from './FloatingInput';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Typing Animation Component
const TypingText: React.FC<{ text: string; speed?: number; isDark: boolean }> = ({ text, speed = 20, isDark }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <Box
      sx={{
        maxWidth: '75%',
        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.9)',
        fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
        lineHeight: 1.6,
        textAlign: 'left',
        whiteSpace: 'pre-line',
      }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: isDark ? '#009BE4' : '#2563EB',
            ml: 0.5,
            animation: 'blink 1s infinite',
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark } = useThemeMode();
  
  // Backend processing stages - More realistic
  const processingStages = [
    'Retrieving real-time process data...',
    'Analyzing control loops & constraints...',
    'Querying historical trends...',
    'Applying AI reasoning models...',
    'Generating insights & recommendations...'
  ];
  const [currentStage, setCurrentStage] = useState(0);
  
  // Auto-demo state
  const [showAutoDemo, setShowAutoDemo] = useState(true);
  const [demoStep, setDemoStep] = useState(0);
  const hasAutoStarted = useRef(false);
  
  // Auto-send suggestion questions state
  const [autoSendIndex, setAutoSendIndex] = useState(-1);
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [wasAutoSendingBeforeFocus, setWasAutoSendingBeforeFocus] = useState(false);
  const autoSendTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Demo example
  const demoExample = {
    user: "Which constraint is limiting my reactor throughput?",
    assistant: "Based on current MPC data, your throughput is limited by two active constraints:\n\n• TI100 (Reactor Temperature) at 285°C upper limit\n• C-101 compressor running at 94% capacity\n\nThe feed controller is being held back by these constraints. Would you like me to suggest optimization strategies?",
  };
  
  const suggestionQuestions = [
    'Learn about ChatAPC',
    'Analyze my process data',
    'Show me optimization tips',
  ];

  // Auto-start demo animation then start question loop
  useEffect(() => {
    if (!hasAutoStarted.current && showAutoDemo && messages.length === 0) {
      hasAutoStarted.current = true;
      
      // Calculate demo assistant response typing time
      const demoTypingTime = demoExample.assistant.length * 20; // ~5000ms
      
      const timeouts = [
        setTimeout(() => setDemoStep(1), 1200), // Show user message
        setTimeout(() => setDemoStep(2), 2400), // Show loading after 600ms thinking
        setTimeout(() => setDemoStep(3), 5100), // Show assistant response (600ms + 2100ms loading)
        setTimeout(() => {
          // After demo finishes (response fully typed), clear and start auto-sending
          setShowAutoDemo(false);
          setDemoStep(0);
          setMessages([]);
          setIsAutoSending(true);
          setAutoSendIndex(0);
        }, 5100 + demoTypingTime + 2500), // Wait for typing to complete + 2.5s reading time
      ];
      
      return () => timeouts.forEach(clearTimeout);
    }
  }, [showAutoDemo, messages.length]);

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
  }, [currentQuestionIndex, charIndex, isDeleting, questions, messages.length, showAutoDemo]);

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

  // Cycle through backend processing stages
  useEffect(() => {
    if (!isLoading) {
      setCurrentStage(0); // Reset to first stage when not loading
      return;
    }
    
    console.log('Loading started, showing all stages');
    let stageIndex = 0;
    setCurrentStage(0); // Start with first stage
    
    const interval = setInterval(() => {
      stageIndex = (stageIndex + 1) % processingStages.length;
      setCurrentStage(stageIndex);
      console.log('Stage changed to:', processingStages[stageIndex]);
    }, 1500); // Increased to 1500ms to show all stages
    
    return () => clearInterval(interval);
  }, [isLoading]);

  // Auto-send suggestion questions in a loop
  useEffect(() => {
    if (!isAutoSending || autoSendIndex < 0) return;

    const sendQuestion = () => {
      const question = suggestionQuestions[autoSendIndex];
      
      // Step 1: Show question
      const userMessage: Message = {
        id: `auto-user-${Date.now()}`,
        role: 'user',
        content: question,
        timestamp: new Date(),
      };
      setMessages([userMessage]);
      
      // Wait 600ms before showing loading (thinking time)
      const thinkingTimer = setTimeout(() => {
        setIsLoading(true);
      }, 600);

      // Step 2: Show response after 8.6s (600ms thinking + 8s processing stages)
      const responseTimer = setTimeout(() => {
        const { response, followUp } = getAIResponse(question);
        
        const aiMessage: Message = {
          id: `auto-ai-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };

        setMessages([userMessage, aiMessage]);
        setIsLoading(false);

        // Calculate typing animation time (20ms per character)
        const responseTypingTime = response.length * 20;
        
        // Step 3: Add follow-up after response typing finishes + 800ms
        const followUpTimer = setTimeout(() => {
          const followUpMessage: Message = {
            id: `auto-followup-${Date.now()}`,
            role: 'assistant',
            content: followUp,
            timestamp: new Date(),
          };
          setMessages([userMessage, aiMessage, followUpMessage]);

          // Calculate follow-up typing time
          const followUpTypingTime = followUp.length * 20;
          
          // Step 4: Wait for follow-up typing to finish + 2.5s, then clear and move to next question
          const clearTimer = setTimeout(() => {
            setMessages([]);
            
            // Move to next question (loop back to 0 after last one)
            const nextTimer = setTimeout(() => {
              const nextIndex = (autoSendIndex + 1) % suggestionQuestions.length;
              setAutoSendIndex(nextIndex);
            }, 300);

            autoSendTimerRef.current = nextTimer;
          }, followUpTypingTime + 2500);

          autoSendTimerRef.current = clearTimer;
        }, responseTypingTime + 800);

        autoSendTimerRef.current = followUpTimer;
      }, 8600); // 600ms thinking + 8s processing stages

      autoSendTimerRef.current = responseTimer;
    };

    sendQuestion();

    // Cleanup function
    return () => {
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
    };
  }, [autoSendIndex, isAutoSending]);

  // Scroll detection for floating input (mobile only) - Optimized with throttling
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
          
          // Show floating input after scrolling down 300px or past hero section
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

  const stopAutoSending = () => {
    setIsAutoSending(false);
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
    }
    if (showAutoDemo) {
      setShowAutoDemo(false);
      setDemoStep(0);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (isAutoSending) {
      setWasAutoSendingBeforeFocus(true);
      setIsAutoSending(false);
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // Only resume if user didn't type anything and was auto-sending before
    if (wasAutoSendingBeforeFocus && !inputValue.trim()) {
      setTimeout(() => {
        setIsAutoSending(true);
        setWasAutoSendingBeforeFocus(false);
      }, 300); // Small delay before resuming
    } else {
      setWasAutoSendingBeforeFocus(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Stop auto-sending permanently
    stopAutoSending();
    setWasAutoSendingBeforeFocus(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Wait 600ms before showing loading (thinking time)
    setTimeout(() => {
      setIsLoading(true);
      console.log('Loading state set to true');
    }, 600);

    // Simulate AI thinking + processing time
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
      console.log('Loading state set to false');

      // Calculate typing animation time for response (20ms per character)
      const responseTypingTime = response.length * 20;

      // Add follow-up question after response typing finishes + 800ms
      setTimeout(() => {
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: followUp,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, followUpMessage]);
      }, responseTypingTime + 800);
    }, 8600); // 600ms thinking + 8s processing
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasMessages = messages.length > 0;
  const hasContent = hasMessages || (showAutoDemo && demoStep > 0);

  return (
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
        // Enhanced background styling - optimized for performance
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
          opacity: isDark ? 0.4 : 0.25,
          filter: isDark 
            ? 'brightness(0.8) contrast(1.2) saturate(1.3)'
            : 'brightness(1.1) contrast(0.9) saturate(0.8)',
          zIndex: 0,
          transition: 'opacity 0.3s ease',
          transform: 'translateZ(0)',
          pointerEvents: 'none',
        },
        // Enhanced overlay for better text readability - improved for light mode
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 50%, rgba(51, 65, 85, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 50%, rgba(241, 245, 249, 0.95) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          padding: { xs: '20px 12px', sm: '30px 20px', md: '40px 60px', lg: '40px 80px' },
          maxWidth: { xs: '100%', sm: '100%', md: 850, lg: 900 },
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '95vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          marginLeft: { xs: 0, md: 'auto' },
          marginRight: { xs: 0, md: 'auto' },
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: 3,
          },
        }}
      >

      {/* Main Title - Enhanced styling */}
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem', lg: '2.75rem' },
            fontWeight: 600,
            background: isDark 
              ? 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #CBD5E1 100%)'
              : 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            px: { xs: 1, sm: 2, md: 0 },
            mb: 1.5,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '2px',
              background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
              borderRadius: '2px',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Chat with your plant. Get straight answers.
        </Typography>
        
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
            fontWeight: 400,
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.9)',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: { xs: '95%', sm: '90%', md: '700px' },
            margin: '0 auto 1.5rem auto',
            position: 'relative',
            textShadow: isDark ? 'none' : '0 1px 2px rgba(255, 255, 255, 0.8)',
            px: { xs: 1, sm: 2, md: 0 },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '35px',
              height: '1px',
              background: isDark 
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
            },
            transition: 'color 0.3s ease',
          }}
        >
          <Box component="span" sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
            fontSize: '1.1em',
          }}>
            ChatAPC
          </Box> detects issues, explains process behavior, and finds hidden profit .
        </Typography>

      {/* Combined Chat Area - Fixed Size from Start */}
      <Box
        ref={messagesContainerRef}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '95%', md: 700, lg: 750 },
          background: isDark 
            ? 'rgba(30, 41, 59, 0.7)' 
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          border: isDark 
            ? '1px solid rgba(71, 85, 105, 0.3)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '4px',
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          padding: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
          marginBottom: { xs: 1.5, sm: 2, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.5, sm: 2, md: 2 },
          height: { xs: '320px', sm: '350px', md: '380px', lg: '480px' }, // More responsive heights
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          boxSizing: 'border-box',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            borderRadius: 3,
            '&:hover': {
              background: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
            },
          },
        }}
      >
        {/* Demo Messages */}
        {showAutoDemo && demoStep > 0 && (
          <>
            {/* User Message */}
            {demoStep >= 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  animation: 'fadeUpDelay 0.5s ease-out forwards',
                  '@keyframes fadeUpDelay': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
              <Box
                sx={{
                  maxWidth: '75%',
                  padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                  borderRadius: '4px',
                  background: isDark 
                    ? 'rgba(71, 85, 105, 0.7)'
                    : 'rgba(226, 232, 240, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: 1.6,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                    flex: 1,
                  }}
                >
                  {demoExample.user}
                </Box>
                  <Box
                    sx={{
                      width: { xs: 32, sm: 36, md: 40 },
                      height: { xs: 32, sm: 36, md: 40 },
                      borderRadius: '50%',
                      background: isDark 
                        ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                        : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    MG
                  </Box>
                </Box>
              </Box>
            )}

            {/* Loading State - Typing Indicator */}
            {demoStep === 2 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  animation: 'fadeIn 0.3s ease-in',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isDark ? '#009BE4' : '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0s',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isDark ? '#009BE4' : '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.2s',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isDark ? '#009BE4' : '#2563EB',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0.4s',
                      '@keyframes bounce': {
                        '0%, 80%, 100%': { transform: 'scale(0)' },
                        '40%': { transform: 'scale(1)' },
                      },
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Assistant Response */}
            {demoStep >= 3 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  animation: 'fadeUpDelay 0.5s ease-out forwards',
                  '@keyframes fadeUpDelay': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                <TypingText text={demoExample.assistant} speed={20} isDark={isDark} />
              </Box>
            )}
          </>
        )}

        {/* Actual Messages */}
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              width: '100%',
              animation: 'fadeUpDelay 0.5s ease-out forwards',
              '@keyframes fadeUpDelay': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {message.role === 'user' ? (
              // User message with avatar inside the box
              <Box
                sx={{
                  maxWidth: '75%',
                  padding: { xs: '10px 12px', sm: '12px 14px', md: '14px 16px' },
                  borderRadius: '4px',
                  background: isDark 
                    ? 'rgba(71, 85, 105, 0.7)'
                    : 'rgba(226, 232, 240, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                    lineHeight: 1.6,
                    color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                    flex: 1,
                  }}
                >
                  {message.content}
                </Box>
                <Box
                  sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    borderRadius: '50%',
                    background: isDark 
                      ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                      : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  MG
                </Box>
              </Box>
            ) : (
              // Assistant message - just text with typing animation
              <TypingText text={message.content} speed={20} isDark={isDark} />
            )}
          </Box>
        ))}
        
        {/* Loading State - Show ChatAPC Backend Processing */}
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            <Box
              sx={{
                maxWidth: '75%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isDark ? '#009BE4' : '#2563EB',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0s',
                  '@keyframes bounce': {
                    '0%, 80%, 100%': { transform: 'scale(0)' },
                    '40%': { transform: 'scale(1)' },
                  },
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isDark ? '#009BE4' : '#2563EB',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.2s',
                  '@keyframes bounce': {
                    '0%, 80%, 100%': { transform: 'scale(0)' },
                    '40%': { transform: 'scale(1)' },
                  },
                }}
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isDark ? '#009BE4' : '#2563EB',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.4s',
                  '@keyframes bounce': {
                    '0%, 80%, 100%': { transform: 'scale(0)' },
                    '40%': { transform: 'scale(1)' },
                  },
                }}
              />
              <Typography sx={{ 
                fontSize: { xs: '0.85rem', sm: '0.875rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.7)',
                fontWeight: 500,
                ml: 1
              }}>
                {processingStages[currentStage]}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Input inside chat area */}
        <Box
          sx={{
            mt: 'auto',
            width: '100%',
            position: 'sticky',
            bottom: 0,
            background: 'transparent',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              boxSizing: 'border-box',
              background: isDark 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
              border: isDark 
                ? '1px solid rgba(255, 255, 255, 0.12)' 
                : '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              minHeight: { xs: '46px', sm: '48px', md: '52px' },
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  stopAutoSending();
                  setWasAutoSendingBeforeFocus(false);
                }
                setInputValue(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder={!hasContent ? currentText : 'Ask a follow-up question...'}
              variant="standard"
              disabled={isLoading}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.87)',
                  fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem', lg: '1.05rem' },
                  padding: { xs: '8px 12px', sm: '10px 14px', md: '12px 16px', lg: '14px 18px' },
                  paddingRight: { xs: '44px', sm: '48px', md: '56px' },
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
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem', lg: '1.1rem' }, 
                  color: inputValue.trim() && !isLoading
                    ? (isDark ? '#0a0e2e' : '#FFFFFF')
                    : (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'),
                }} 
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Suggestion Buttons - Always show */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1, md: 1.5 },
          justifyContent: 'center',
          maxWidth: { xs: '100%', sm: '95%', md: 700, lg: 750 },
          width: '100%',
          marginBottom: { xs: 1.5, sm: 2 },
          px: { xs: 0, sm: 1, md: 0 },
          boxSizing: 'border-box',
        }}
      >
      {suggestionQuestions.map((suggestion, index) => {
          const isActive = isAutoSending && autoSendIndex === index;
          
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() => {
                stopAutoSending();
                setWasAutoSendingBeforeFocus(false);
                setInputValue(suggestion);
              }}
              sx={{
                border: isActive
                  ? '2px solid #009BE4'
                  : (isDark 
                    ? '1px solid rgba(255, 255, 255, 0.15)' 
                    : '1px solid rgba(0, 0, 0, 0.15)'),
                color: isActive
                  ? '#009BE4'
                  : (isDark 
                    ? 'rgba(255, 255, 255, 0.85)' 
                    : 'rgba(0, 0, 0, 0.7)'),
                borderRadius: '4px',
                padding: { xs: '6px 10px', sm: '8px 12px', md: '10px 16px' },
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                fontWeight: isActive ? 600 : 400,
                textTransform: 'none',
                transition: 'all 0.2s ease',
                background: isActive
                  ? (isDark ? 'rgba(0, 155, 228, 0.2)' : 'rgba(0, 155, 228, 0.15)')
                  : (isDark 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.02)'),
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: isActive 
                    ? '#009BE4'
                    : (isDark 
                      ? 'rgba(255, 255, 255, 0.25)' 
                      : 'rgba(0, 0, 0, 0.3)'),
                  background: isActive
                    ? (isDark ? 'rgba(0, 155, 228, 0.25)' : 'rgba(0, 155, 228, 0.2)')
                    : (isDark 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.05)'),
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {suggestion}
            </Button>
          );
        })}
      </Box>

      {/* Floating Input - Mobile Only */}
      {showFloatingInput && (
        <FloatingInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isLoading={isLoading}
          showAutoDemo={showAutoDemo}
          demoStep={demoStep}
          setMessages={setMessages}
          setShowAutoDemo={setShowAutoDemo}
          setDemoStep={setDemoStep}
          demoExample={demoExample}
        />
      )}
      </Box>
    </Box>
  );
};

export default HeroSearchSection;

