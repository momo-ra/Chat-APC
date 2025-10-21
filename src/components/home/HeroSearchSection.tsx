import React, { useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { HeroTitleSection, ChatMessage, LoadingIndicator, ChatInput, useChatLogic } from './hero-search-section';
import gsap from 'gsap';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getBackground,
  withOpacity 
} from '../shared/themeConfig';

import AnimatedHomeBackground from '../shared/AnimatedHomeBackground';

interface HeroSearchSectionProps {
  animationComplete: boolean;
  setAnimationComplete: (done: boolean) => void;
  inputValue?: string;
  setInputValue?: (val: string) => void;
  messages?: any[];
  setMessages?: React.Dispatch<React.SetStateAction<any[]>> | ((msgs: any[]) => void);
}

const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  animationComplete,
  setAnimationComplete,
  ..._rest
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const firstTitleRef = useRef<HTMLDivElement>(null);
  const secondTitleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark } = useThemeMode();
  const is13InchScreen = useMediaQuery('(min-width:1360px) and (max-width:1510px)');

  const { colors, gradients, borderRadius, transitions, animations: animConfig } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const cyanColor = getColor(colors.cyan, isDark);
  const greenColor = getColor(colors.green, isDark);

  const {
    messages,
    isLoading,
    isTyping,
    inputValue,
    currentStage,
    showSuggestions,
    currentSuggestions,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleSuggestionClick,
    handleWelcomeTypingComplete,
    handleResponseTypingComplete,
    setMessages,
  } = useChatLogic();

  // GSAP Animation - FIXED VERSION
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true);
      }
    });

    const isMobileView = window.innerWidth < 768;
    const isTabletView = window.innerWidth >= 768 && window.innerWidth < 1024;

    const startY = isMobileView
      ? window.innerHeight * 0.25
      : isTabletView
      ? window.innerHeight * 0.3
      : window.innerHeight * 0.35;

    // حجم البداية والنهاية منفصلين تماماً
    const startFontSize = isMobileView ? '2rem' : isTabletView ? '5.5rem' : '6rem';
    const endFontSize = isMobileView ? '2rem' : isTabletView ? '2.4rem' : '4.3rem';
    
    const animationDuration = isMobileView ? 1 : 0.7;

    // Set initial states
    gsap.set([secondTitleRef.current, subtitleRef.current, chatAreaRef.current], {
      opacity: 0,
      y: isMobileView ? 40 : 60
    });

    gsap.set(firstTitleRef.current, {
      y: startY,
      fontSize: startFontSize, 
      opacity: 1,
      filter: 'grayscale(100%) brightness(0.5)',
      transformOrigin: 'center center'
    });

    // Animation timeline
    tl
      .to(firstTitleRef.current, {
        y: 0,
        duration: animationDuration,
        ease: animConfig.easing.easeOut,
      })
      .to(firstTitleRef.current, {
        filter: 'grayscale(0%) brightness(1)',
        opacity: 1,
        duration: animationDuration * 0.9,
        ease: animConfig.easing.easeInOut,
      }, `-=${animationDuration * 0.9}`)
      .to({}, { duration: isMobileView ? 0.2 : 0.3 })
      .to(firstTitleRef.current, {
        fontSize: endFontSize,  // ← نزلنا للحجم النهائي
        duration: isMobileView ? 0.8 : 1,
        ease: 'power3.inOut'
      })
      .to(secondTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: animConfig.easing.sharp,
      }, '-=0.4')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: animConfig.easing.sharp,
      }, '-=0.3')
      .to(chatAreaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: animConfig.easing.sharp,
      }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [setAnimationComplete, animConfig]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollContainer = scrollableAreaRef.current;
    if (scrollContainer) {
      const scrollToBottom = () => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      };
      requestAnimationFrame(scrollToBottom);
      const timeoutId1 = setTimeout(scrollToBottom, 50);
      const timeoutId2 = setTimeout(scrollToBottom, 150);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [messages, isLoading, showSuggestions, isTyping]);

  // Continuous scroll during typing
  useEffect(() => {
    if (isTyping) {
      const scrollContainer = scrollableAreaRef.current;
      if (scrollContainer) {
        const scrollInterval = setInterval(() => {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth',
          });
        }, 200);

        return () => clearInterval(scrollInterval);
      }
    }
  }, [isTyping]);

  return (
    <>
      <style>
        {`
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
          transition: transitions.normal,
        }}
      >
        {/* {!isMobile && ( */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <AnimatedHomeBackground />
          </Box>
        {/* )} */}
        
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
            overflowY: animationComplete ? 'auto' : 'hidden',
            overflowX: 'hidden',
            pointerEvents: animationComplete ? 'auto' : 'none',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: isDark
                ? withOpacity('#FFFFFF', 0.2)
                : withOpacity('#000000', 0.2),
              borderRadius: borderRadius.sm,
            },
          }}
        >
          {/* Hero Title - First Line - شيلنا fontSize من هنا خالص */}
          <Box
            ref={firstTitleRef}
            sx={{
              fontWeight: 900,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              position: 'relative',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              transformStyle: 'preserve-3d',
              px: { xs: 1, sm: 2, md: 0 },
              gap: 0,
            }}
          >
            <Box
              component="span"
              className="word-0"
              sx={{
                background: isDark
                  ? getGradient(gradients.blueToPurple, isDark)
                  : getGradient(gradients.blue, isDark),
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                position: 'relative',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                display: 'flex',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                px: { xs: 1, sm: 2, md: 0 },
                gap: 0,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {`Chat with your plant.`}
            </Box>
          </Box>

          {/* Hero Title - Second Line */}
          <Box
            ref={secondTitleRef}
            component="div"
            sx={{
              fontSize: { xs: '1.6rem', sm: '2.4rem', md: '2.5rem' },
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
          </Box>

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
              backdropFilter: 'blur(4px) saturate(180%)',
              border: isDark
                ? `1px solid ${withOpacity(cyanColor, 0.15)}`
                : `1px solid ${withOpacity(primaryColor, 0.2)}`,
              borderRadius: borderRadius.xl,
              padding: 0,
              marginBottom: 1,
              display: 'flex',
              flexDirection: 'column',
              height: is13InchScreen
                ? '830px'
                : { xs: '420px', sm: '520px', md: '850px', lg: '900px' },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              ref={scrollableAreaRef}
              data-scrollable-area="true"
              sx={{
                flex: 1,
                overflowY: animationComplete ? 'auto' : 'hidden',
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                padding: { xs: 2, sm: 2.5, md: 3 },
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                pointerEvents: animationComplete ? 'auto' : 'none',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: isDark
                    ? withOpacity('#FFFFFF', 0.15)
                    : withOpacity('#000000', 0.15),
                  borderRadius: borderRadius.sm,
                  '&:hover': {
                    background: isDark
                      ? withOpacity('#FFFFFF', 0.25)
                      : withOpacity('#000000', 0.25),
                  },
                },
              }}
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isDark={isDark}
                  isLastMessage={index === messages.length - 1}
                  isWelcomeMessage={message.id === 'welcome-message'}
                  showSuggestions={showSuggestions}
                  currentSuggestions={currentSuggestions}
                  isTyping={isTyping}
                  isLoading={isLoading}
                  onTypingComplete={
                    message.id === 'welcome-message'
                      ? handleWelcomeTypingComplete
                      : index === messages.length - 1
                      ? handleResponseTypingComplete
                      : undefined
                  }
                  onSuggestionClick={(suggestion) =>
                    handleSuggestionClick(suggestion, false)
                  }
                  suggestionTitle="What would you like to explore?"
                />
              ))}

              {isLoading && (
                <LoadingIndicator isDark={isDark} currentStage={currentStage} />
              )}
            </Box>

            <ChatInput
              inputValue={inputValue}
              isDark={isDark}
              isLoading={isLoading}
              isTyping={isTyping}
              onInputChange={setInputValue}
              onSendMessage={handleSendMessage}
              onKeyPress={handleKeyPress}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeroSearchSection;