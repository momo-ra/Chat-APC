import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, useTheme, useMediaQuery } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import { useThemeMode } from '../../contexts/ThemeContext';
import FloatingInput from './FloatingInput';
import gsap from 'gsap';

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
          flexDirection: isMobile ? 'column' : 'column', // Always vertical for both mobile and desktop
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
              width: '100%', // Full width for vertical layout
              textAlign: 'center',
              border: isDark 
                ? '1px solid rgba(0, 155, 228, 0.3)' 
                : '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '8px 12px', // Slightly more padding for vertical layout
              fontSize: '0.85rem',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
              background: isDark 
                ? 'rgba(0, 155, 228, 0.05)' 
                : 'rgba(59, 130, 246, 0.05)',
              minHeight: '45px', // Slightly taller for better vertical appearance
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
  
  // Refs for GSAP animations
  const firstTitleRef = useRef<HTMLDivElement>(null);
  const secondTitleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Processing stages
  const processingStages = [
    'Analyzing real-time process data...',
    'Checking control loop performance...',
    'Reviewing constraint status...',
    'Generating insights...',
    'Preparing recommendations...'
  ];
  const [currentStage, setCurrentStage] = useState(0);
  
  // Updated flow state - removed hasAutoSentOnce to allow multiple auto-sends
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [waitingForUserInput, setWaitingForUserInput] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [lastAutoSendTime, setLastAutoSendTime] = useState<number>(0);
  
  // Timer for auto-sending question
  const autoSendTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initial welcome message
  const initialWelcomeMessage = "ChatAPC blends deep engineering expertise with advanced AI to deliver clear, data-driven insights. It identifies issues early, explains process behavior intuitively, and reveals untapped opportunities for improved performance and profit — all in plain language.";

  // Suggestion questions that appear after responses (memoized to prevent recreating on every render)
  const suggestionQuestions = React.useMemo(() => [
    'When did TI100 start violating the high limit?',
    'How can we increase the margin of the CDU?', 
    'What is TI100?',
  ], []);

  // Expanded suggestion questions pool
  const allSuggestionQuestions = [
    'When did TI100 start violating the high limit?',
    'How can we increase the margin of the CDU?', 
    'What is TI100?',
    'What is kerosene flash point influenced by?',
    'What is the feed of C101', 
    'Check if the APC limits on the Debutanizer are correct',
    'How can I increase the kerosene flash point from 42 edgC to 43 degC',
    'Why is the draw temperature above its limit?',
    'Can I increase the feed from 1000 t/h to 1100 t/h?',
    'What is E201',
  ];

  // Enhanced AI responses with specific Q&A pairs
  const getAIResponse = (userMessage: string, lastQuestion: string): { response: string; suggestions: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Filter out the question that was just asked
    const availableSuggestions = allSuggestionQuestions.filter(q => 
      q.toLowerCase() !== lastQuestion.toLowerCase()
    );
    
    // Get random suggestions
    const getRandomSuggestions = (count: number = 3) => {
      return availableSuggestions
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    };
    
    // Check for specific questions
    if (lowerMessage.includes('ti100') && lowerMessage.includes('violating')) {
      return {
        response: "TI100 exceeded its high limit at **14:32 on October 10**, remaining above the limit for **45 minutes**.\n\nThis extended violation indicates a sustained process disturbance that should be investigated to prevent recurrence.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('increase') && lowerMessage.includes('margin') && lowerMessage.includes('cdu')) {
      return {
        response: "The margin of the CDU can be increased from **3.5 EUR/ton** to **3.8 EUR/ton** by performing the following action:\n\n• **Increase the Top pumparound flow APC high limit** from 600 ton/hr to 650 ton/hr\n  - This is safely below the equipment maximum of 700 ton/hr\n  - Expected margin improvement: **+0.3 EUR/ton**\n\nThis optimization opportunity could deliver significant annual savings while maintaining safe operating conditions.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('what is ti100')) {
      return {
        response: "**TI100** is the temperature indicator on the kerosene stripper overhead line, measuring vapor temperature.\n\n• **Current value**: 212.2°C\n• **8-hour average**: 210.8°C\n• **Location**: Overhead vapor line of kerosene stripper\n\nThis measurement is critical for monitoring stripper performance and product quality control.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('kerosene flash point') && lowerMessage.includes('influenced')) {
      return {
        response: "Kerosene flash point **AI100** is influenced by two primary factors:\n\n1. **Top temperature TC101** - Higher temperatures increase flash point\n2. **Stripping steam FC200** - Increased steam flow raises flash point by removing light ends\n\nThese variables can be adjusted to optimize the flash point specification while maintaining product quality.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('feed of c101') || (lowerMessage.includes('what is') && lowerMessage.includes('feed') && lowerMessage.includes('c101'))) {
      return {
        response: "The feed of stabilizer column **C101** is:\n\n• **Stream**: S01\n• **Source**: Heat exchanger E101 outlet\n• **Description**: Pre-heated hydrocarbon feed entering the stabilizer for light-ends removal\n\nThis feed stream's temperature and composition significantly affect the stabilizer's separation efficiency.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('apc limits') && lowerMessage.includes('debutanizer')) {
      return {
        response: "Analysis of the Debutanizer APC limits reveals an optimization opportunity:\n\n**Recommendation**: Reduce the APC low limit on the reboiler flow from **65 ton/hr to 60 ton/hr** (equipment low limit)\n\n**Economic Impact**:\n• Margin increase: 3.4 EUR/ton → **3.6 EUR/ton** (+0.2 EUR/ton)\n• Annual benefit: **156k EUR/year**\n\nThe current limit is unnecessarily conservative and constraining profitability. The equipment can safely operate at 60 ton/hr.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('increase') && lowerMessage.includes('kerosene flash point') && (lowerMessage.includes('42') || lowerMessage.includes('43'))) {
      return {
        response: "Kerosene Flash point **AI100** can be increased from 42°C to 43°C by performing the following actions:\n\n1. **Increase top temperature** from 110.8°C to **112.3°C** (+1.5°C)\n2. **Increase stripping steam** to the process high limit of **600 kg/hr**\n\nThese adjustments will remove lighter components more effectively, raising the flash point to meet your target specification while maintaining column stability.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('draw temperature') && lowerMessage.includes('above') && lowerMessage.includes('limit')) {
      return {
        response: "The draw temperature is high because the **kerosene draw flow is constrained at its APC low limit**.\n\nWhen the draw flow hits its lower constraint, it cannot be reduced further to control the temperature, causing the temperature to rise above its limit.\n\n**Solution**: Either increase the draw flow limit or adjust upstream conditions to reduce the temperature driving force.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('increase') && lowerMessage.includes('feed') && (lowerMessage.includes('1000') || lowerMessage.includes('1100'))) {
      return {
        response: "**No**, the feed cannot be increased from 1000 t/h to 1100 t/h.\n\n**Constraint**: Column differential pressure (ΔP)\n• Current ΔP: 0.3 bar\n• Projected ΔP at 1100 t/h: **0.6 bar**\n• Column limit: **0.55 bar**\n\nIncreasing the feed to 1100 t/h would exceed the column's pressure limit by 0.05 bar, risking flooding and potential equipment damage. The maximum safe feed rate is lower than 1100 t/h.",
        suggestions: getRandomSuggestions()
      };
    } else if (lowerMessage.includes('what is e201')) {
      return {
        response: "**E201** is a shell-and-tube heat exchanger with the following configuration:\n\n• **Type**: Shell-and-tube heat exchanger\n• **Hot side (shell)**: Kerosene flow from Main Fractionator C101\n• **Cold side (tubes)**: Cooling water\n• **Function**: Cools kerosene product to storage temperature\n\nThis exchanger is critical for product cooling and heat recovery in the fractionation section.",
        suggestions: getRandomSuggestions()
      };
    } else {
      // Default response with random suggestions
      const randomSuggestions = getRandomSuggestions();
      
      return {
        response: "I can help you with various aspects of process control and optimization:\n\n• **Equipment Information**: Details on instruments, vessels, and heat exchangers\n• **Process Analysis**: Temperature trends, pressure limits, and flow constraints\n• **Optimization Opportunities**: Margin improvements and limit adjustments\n• **Troubleshooting**: Root cause analysis and corrective actions\n\nI have access to your current process data and can provide specific insights tailored to your plant operations. Try asking about specific tags, equipment, or optimization opportunities!",
        suggestions: randomSuggestions
      };
    }
  };

  // Initialize with welcome message and first suggestions
  useEffect(() => {
    setCurrentSuggestions(suggestionQuestions);
  }, []);

  // GSAP Intro Animation - "The GSAP Field" style (Responsive)
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true)
    });

    // Get word elements for animation
    const words = firstTitleRef.current?.querySelectorAll('[class^="word-"]');

    // Responsive values based on screen size
    const isMobileView = window.innerWidth < 768;
    const isTabletView = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Calculate responsive starting position and scale
    const startY = isMobileView 
      ? window.innerHeight * 0.25  // 25% for mobile
      : isTabletView 
      ? window.innerHeight * 0.3   // 30% for tablet
      : window.innerHeight * 0.35; // 35% for desktop
    
    const startScale = isMobileView 
      ? 1.5   // Smaller scale for mobile
      : isTabletView 
      ? 1.8   // Medium scale for tablet
      : 2.2;  // Full scale for desktop

    const animationDuration = isMobileView ? 1.6 : 1.8; // Faster on mobile

    // Set initial states - hide everything
    gsap.set([secondTitleRef.current, subtitleRef.current, chatAreaRef.current], {
      opacity: 0,
      y: isMobileView ? 40 : 60
    });

    // Set first title container - start from bottom with larger scale
    gsap.set(firstTitleRef.current, {
      y: startY,
      scale: startScale,
      opacity: 1,
      transformOrigin: 'center center'
    });

    // Set individual words - start with dim/gray color
    gsap.set(words, {
      opacity: 0.3,
      filter: 'grayscale(100%) brightness(0.5)',
      y: 0
    });

    // Animation sequence - "The GSAP Field" style
    tl
      // First, bring the title up from bottom with color fade in
      .to(firstTitleRef.current, {
        y: 0,
        duration: animationDuration,
        ease: 'power2.out'
      })
      // Simultaneously fade in the words and reveal colors
      .to(words, {
        opacity: 1,
        filter: 'grayscale(0%) brightness(1)',
        duration: animationDuration * 0.9,
        stagger: isMobileView ? 0.08 : 0.1,
        ease: 'power2.inOut'
      }, `-=${animationDuration * 0.9}`)
      // Hold for a moment to let user see the full title
      .to({}, { duration: isMobileView ? 0.3 : 0.5 })
      // Scale down to final size
      .to(firstTitleRef.current, {
        scale: 1,
        duration: isMobileView ? 1 : 1.2,
        ease: 'power3.inOut'
      })
      // Bring in second title
      .to(secondTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.5')
      // Bring in subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')
      // Finally reveal the chat area
      .to(chatAreaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.3');

    return () => {
      tl.kill();
    };
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
  
  // Updated auto-send logic - allows multiple auto-sends with time intervals
  useEffect(() => {
    if (showSuggestions && !hasUserSentMessage && currentSuggestions.length > 0) {
      // Clear any existing timer
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
      
      // Set a new timer for auto-sending (15 seconds for first, 30 seconds for subsequent)
      const delay = messages.length === 1 ? 15000 : 30000; // 15s for first message, 30s for subsequent
      
      autoSendTimerRef.current = setTimeout(() => {
        const currentTime = Date.now();
        const timeSinceLastAutoSend = currentTime - lastAutoSendTime;
        
        // Only auto-send if enough time has passed and user hasn't sent a message
        if (!hasUserSentMessage && (lastAutoSendTime === 0 || timeSinceLastAutoSend > 25000)) {
          // Pick a random suggestion to make it more varied
          const randomIndex = Math.floor(Math.random() * currentSuggestions.length);
          const suggestionToSend = currentSuggestions[randomIndex];
          
          if (suggestionToSend) {
            setLastAutoSendTime(currentTime);
            handleSuggestionClick(suggestionToSend, true); // true flag indicates auto-sent
          }
        }
      }, delay);
    }
    
    return () => {
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
    };
  }, [showSuggestions, hasUserSentMessage, currentSuggestions, messages.length, lastAutoSendTime]);
  
  // Reset hasUserSentMessage when suggestions change (to allow auto-send for new suggestions)
  useEffect(() => {
    if (showSuggestions && messages.length > 1) {
      // Reset user interaction flag after showing suggestions for a new AI response
      setHasUserSentMessage(false);
    }
  }, [currentSuggestions, showSuggestions]);
  
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
    setHasUserSentMessage(false); // Reset to allow auto-send for new suggestions
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

  // Updated suggestion click handler
  const handleSuggestionClick = (suggestion: string, isAutoSent: boolean = false) => {
    if (isLoading || isTyping) {
      return;
    }
    
    // Clear auto-send timer if user clicks manually
    if (!isAutoSent && autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }
    
    setInputValue(suggestion);
    setShowSuggestions(false);
    setWaitingForUserInput(false);
    setHasUserSentMessage(true);
    handleSendMessage(suggestion, isAutoSent);
  };

  const handleSendMessage = async (messageToSend?: string, isAutoSent: boolean = false) => {
    const messageContent = messageToSend || inputValue.trim();
    
    if (!messageContent || isLoading || isTyping) {
      return;
    }

    setLastAskedQuestion(messageContent);
    setShowSuggestions(false);
    setWaitingForUserInput(false);
    setHasUserSentMessage(true);
    
    // Update last auto-send time if this was auto-sent
    if (isAutoSent) {
      setLastAutoSendTime(Date.now());
    }

    // Clear auto-send timer
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    // Remove welcome message when first user message is sent
    setMessages((prev) => {
      const filteredMessages = prev.filter(msg => msg.id !== 'welcome-message');
      return [...filteredMessages, userMessage];
    });
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
          overflow: 'hidden', // Prevent content from going outside viewport
          margin: 0,
          width: '100%',
          minHeight: '100vh',
          maxHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'background 0.3s ease',
          background: 'transparent', // Use unified background from parent
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            position: 'relative',
            zIndex: 5,
            padding: { xs: '24px 20px', sm: '40px 32px', md: '52px 40px' },
            maxWidth: { xs: '100%', sm: '100%', md: 1100 },
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
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
          {/* Main Title with word-by-word animation */}
          <Box
            ref={firstTitleRef}
            sx={{
              fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.2rem' },
              fontWeight: 900,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              display: 'flex',
              gap: { xs: '0.25rem', sm: '0.4rem', md: '0.5rem' },
              justifyContent: 'center',
              flexWrap: 'wrap',
              transformStyle: 'preserve-3d',
              px: { xs: 1, sm: 2, md: 0 }, // Add padding on mobile to prevent overflow
            }}
          >
            {['Chat', 'with', 'your', 'plant.'].map((word, index) => (
              <Box
                key={index}
                component="span"
                className={`word-${index}`}
                sx={{
                  background: isDark ? 
                    'linear-gradient(135deg, #009BE4 0%, #34D399 100%)' :
                    'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                {word}
              </Box>
            ))}
          </Box>
          
          <Typography
            ref={secondTitleRef}
            sx={{
              fontSize: { xs: '1.6rem', sm: '2.4rem', md: '3.2rem' },
              fontWeight: 900,
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
              px: { xs: 1, sm: 2, md: 0 },
            }}
          >
          Turn data into decisions.
          </Typography>
          
          <Typography
            ref={subtitleRef}
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.15rem', md: '1.25rem' },
              fontWeight: 500,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)',
              lineHeight: 1.6,
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 1rem auto',
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              px: { xs: 2, sm: 3, md: 0 },
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
            blends engineering expertise with AI to deliver clear, reliable insights — detecting issues early and revealing profit opportunities.
          </Typography>

          {/* Chat Area */}
          <Box
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                messagesContainerRef.current = el;
                chatAreaRef.current = el;
              }
            }}
            data-messages-container="true"
            sx={{
              width: '100%',
              maxWidth: 850,
              background: isDark 
                ? 'linear-gradient(145deg, rgba(10, 14, 46, 0.75) 0%, rgba(17, 24, 39, 0.85) 50%, rgba(13, 20, 51, 0.8) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 251, 254, 0.9) 50%, rgba(248, 250, 252, 0.88) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: isDark 
                ? '1px solid rgba(0, 155, 228, 0.15)' 
                : '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '24px',
              boxShadow: isDark 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 155, 228, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
              padding: 0,
              marginBottom: 1,
              display: 'flex',
              flexDirection: 'column',
              height: { xs: '420px', sm: '600px', md: '750px' },
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
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                          <PersonIcon sx={{ fontSize: '1.3rem' }} />
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
                          onSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, false)}
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
                  onSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, false)}
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