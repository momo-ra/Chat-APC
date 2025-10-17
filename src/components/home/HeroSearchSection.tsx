import React, { useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import FloatingInput from './FloatingInput';
import { HeroTitleSection, ChatMessage, LoadingIndicator, ChatInput, useChatLogic } from './hero-search-section';
import gsap from 'gsap';




interface HeroSearchSectionProps {
  animationComplete: boolean;
  setAnimationComplete: (done: boolean) => void;
}

const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({
  animationComplete,
  setAnimationComplete,
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

  const [showFloatingInput, setShowFloatingInput] = React.useState(false);

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

  // GSAP Animation - Include chatAreaRef in timeline
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true);
      }
    });

    const words = firstTitleRef.current?.querySelectorAll('[class^="word-"]');
    const isMobileView = window.innerWidth < 768;
    const isTabletView = window.innerWidth >= 768 && window.innerWidth < 1024;

    const startY = isMobileView
      ? window.innerHeight * 0.25
      : isTabletView
      ? window.innerHeight * 0.3
      : window.innerHeight * 0.35;

    const startScale = isMobileView ? 1.5 : isTabletView ? 1.8 : 2.2;
    const animationDuration = isMobileView ? 1 : 0.7;

    // Set initial states
    gsap.set([secondTitleRef.current, subtitleRef.current, chatAreaRef.current], {
      opacity: 0,
      y: isMobileView ? 40 : 60
    });

    gsap.set(firstTitleRef.current, {
      y: startY,
      scale: startScale,
      opacity: 1,
      transformOrigin: 'center center'
    });

    gsap.set(words, {
      opacity: 0.3,
      filter: 'grayscale(100%) brightness(0.5)',
      y: 0
    });

    // Animation timeline
    tl
      .to(firstTitleRef.current, {
        y: 0,
        duration: animationDuration,
        ease: 'power2.out'
      })
      .to(words, {
        opacity: 1,
        filter: 'grayscale(0%) brightness(1)',
        duration: animationDuration * 0.9,
        stagger: isMobileView ? 0.08 : 0.1,
        ease: 'power2.inOut'
      }, `-=${animationDuration * 0.9}`)
      .to({}, { duration: isMobileView ? 0.2 : 0.3 })
      .to(firstTitleRef.current, {
        scale: 1,
        duration: isMobileView ? 0.8 : 1,
        ease: 'power3.inOut'
      })
      .to(secondTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.4')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .to(chatAreaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [setAnimationComplete]);

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

  // Floating input visibility on mobile
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
          transition: 'background 0.3s ease',
          background: isDark
            ? 'linear-gradient(to bottom, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
            : 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
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
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
            },
          }}
        >
          {/* Hero Title - Inline instead of component */}
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
              px: { xs: 1, sm: 2, md: 0 },
            }}
          >
            {['Chat', 'with', 'your', 'plant.'].map((word, index) => (
              <Box
                key={index}
                component="span"
                className={`word-${index}`}
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #34D399 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
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

          <Box
            ref={secondTitleRef}
            component="div"
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
          </Box>

          <Box
            ref={subtitleRef}
            component="div"
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
            blends engineering expertise with AI to deliver clear, reliable insights —
            detecting issues early and revealing profit opportunities.
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
              height: is13InchScreen
                ? '830px'
                : { xs: '500px', sm: '650px', md: '800px', lg: '850px' },
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
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.15)',
                  borderRadius: 4,
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.25)',
                  },
                },
              }}
            >
              {/* Messages */}
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

              {/* Loading State */}
              {isLoading && (
                <LoadingIndicator isDark={isDark} currentStage={currentStage} />
              )}
            </Box>

            {/* Fixed Input at Bottom */}
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

          {/* Floating Input for Mobile */}
          {showFloatingInput && animationComplete && (
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