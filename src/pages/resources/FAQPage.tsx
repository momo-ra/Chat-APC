import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Chip } from '@mui/material';
import { ExpandMore, HelpOutline, ArrowForward } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { AppSidebar, Footer, ThemeToggle } from '../../components/layout';
import { sidebarItems } from '../../data/layout/sidebarData';
import { getHomeBackground } from '../../components/shared/pageBackgrounds';
import { applySlideUp, applyCardGridAnimation, applyScaleUp } from '../../components/shared/animationHelpers';
import { usePageTitle } from '../../hooks/usePageTitle';

gsap.registerPlugin(ScrollTrigger);

const faqCategories = {
  general: {
    title: 'General',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
  },
  technical: {
    title: 'Technical',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  implementation: {
    title: 'Implementation',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
};

const faqData = [
  {
    category: 'general',
    question: "What is ChatAPC and how does it work?",
    answer: "ChatAPC is an AI-powered assistant specifically designed for industrial process control. It connects to your plant's data systems and provides intelligent insights, troubleshooting assistance, and optimization recommendations through natural language conversations. The system uses specialized agents to analyze your process data, detect issues, and explain complex control behaviors in plain language."
  },
  {
    category: 'technical',
    question: "How does ChatAPC integrate with existing control systems?",
    answer: "ChatAPC integrates seamlessly with your existing DCS, SCADA, and historian systems through secure APIs and data connectors. It can read real-time process data, historical trends, alarm logs, and control parameters without disrupting your current operations. The system supports major industrial protocols and can be deployed on-premise or in private cloud environments."
  },
  {
    category: 'general',
    question: "What types of process control questions can ChatAPC answer?",
    answer: "ChatAPC can help with a wide range of process control questions including: constraint identification and analysis, control loop troubleshooting, optimization recommendations, alarm analysis, historical trend interpretation, 'what-if' scenario planning, and process performance diagnostics. It understands industrial terminology and can explain complex control strategies in accessible terms."
  },
  {
    category: 'technical',
    question: "Is my plant data secure with ChatAPC?",
    answer: "Yes, data security is our top priority. ChatAPC can be deployed on-premise, ensuring your data never leaves your facility. We use enterprise-grade encryption, secure authentication, and follow industrial cybersecurity standards. The system can operate in air-gapped environments and integrates with your existing security infrastructure."
  },
  {
    category: 'implementation',
    question: "How quickly can we see results after implementing ChatAPC?",
    answer: "Most plants see immediate benefits within the first week of deployment. Engineers can start asking questions and getting insights right away. Typical ROI includes 10-30% improvement in process efficiency, significant reduction in troubleshooting time, and better decision-making. Full optimization benefits typically emerge within 3-6 months as the system learns your specific processes."
  },
  {
    category: 'implementation',
    question: "What training is required for our engineers to use ChatAPC?",
    answer: "ChatAPC is designed to be intuitive and requires minimal training. Engineers can start using it immediately with natural language questions. We provide a 2-hour onboarding session and ongoing support. The system learns your plant's specific terminology and processes over time, making it even more effective as your team uses it."
  },
  {
    category: 'general',
    question: "Can ChatAPC work with different types of industrial processes?",
    answer: "Yes, ChatAPC is designed to work across various industrial sectors including oil & gas, petrochemicals, power generation, pharmaceuticals, food & beverage, and manufacturing. The system adapts to different process types, control strategies, and industry-specific requirements. It can handle continuous processes, batch operations, and hybrid systems."
  },
  {
    category: 'technical',
    question: "What support and maintenance does ChatAPC require?",
    answer: "ChatAPC is designed for minimal maintenance. We provide 24/7 technical support, regular software updates, and system monitoring. The AI models are continuously improved and updated remotely. On-site maintenance is typically limited to initial setup and major updates, with most support provided remotely through secure connections."
  }
];

const FAQPage: React.FC = () => {
  usePageTitle({
    title: 'FAQ',
    description: 'Frequently asked questions about ChatAPC - AI assistant for industrial process control. Learn about integration, security, and implementation.',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<HTMLDivElement[]>([]);
  const answerRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const {
    h1FontSize,
    h2FontSize,
    bodyLargeFontSize,
    containerMaxWidth,
    containerPadding,
    isMobile
  } = useResponsiveLayout();

  // Fix scroll position on mount (always go to top when page is navigated to)
  useEffect(() => {
    // This makes sure when arriving on FAQ page, scroll is at the top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  // Configure ScrollTrigger for better performance
  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      // Clean up on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header with unified system
      applySlideUp(headerRef.current, { startTrigger: 'top 80%' });

      // Animate FAQ cards with unified system
      applyCardGridAnimation(faqRefs.current, sectionRef.current, {
        staggerDelay: 0.08,
      });

      // Animate CTA with unified system
      applyScaleUp(ctaRef.current, { startTrigger: 'top 90%' });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const handleFAQToggle = (index: number) => {
    const answerElement = answerRefs.current[index];
    if (!answerElement) return;

    const isCurrentlyExpanded = expandedFAQ === index;

    if (isCurrentlyExpanded) {
      // Collapse
      gsap.to(answerElement, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setExpandedFAQ(null);
        },
      });
    } else {
      // Collapse previously expanded FAQ if exists
      if (expandedFAQ !== null && answerRefs.current[expandedFAQ]) {
        gsap.to(answerRefs.current[expandedFAQ], {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }

      // Expand new FAQ
      setExpandedFAQ(index);
      gsap.set(answerElement, { height: 'auto' });
      const autoHeight = answerElement.offsetHeight;
      gsap.fromTo(
        answerElement,
        { height: 0, opacity: 0 },
        {
          height: autoHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }
      );
    }
  };

  return (
    <>
      {/* Skip Navigation */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '8px 16px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          textDecoration: 'none',
          borderRadius: 1,
          '&:focus': {
            left: '16px',
            top: '16px',
          },
        }}
      >
        Skip to main content
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          background: getHomeBackground(isDark),
          transition: 'background 0.3s ease',
          position: 'relative',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />
        
        <Box
          id="main-content"
          component="main"
          sx={{
            width: '100%',
            maxWidth: '100vw',
            minHeight: '100vh',
            overflow: 'hidden',
            pt: { xs: 6, md: 8 },
            pb: 4,
          }}
        >
          <Container 
            maxWidth="lg"
            sx={{
              maxWidth: containerMaxWidth,
              px: containerPadding,
              position: 'relative',
              zIndex: 2,
              overflow: 'visible',
            }}
          >
            {/* Header Section */}
            <Box ref={headerRef} sx={{ textAlign: 'center', mb: 8, willChange: 'transform, opacity' }}>
              <Chip
                icon={<HelpOutline sx={{ fontSize: '1rem !important' }} />}
                label="Help Center"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  mb: 3,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
                  color: isDark ? '#009BE4' : '#3B82F6',
                  border: 'none',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: h1FontSize,
                  fontWeight: 800,
                  background: isDark
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)'
                    : 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Frequently Asked Questions
              </Typography>

              <Typography
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Everything you need to know about ChatAPC and how it can transform your industrial processes
              </Typography>
            </Box>

            {/* Category Filter */}
            <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  p: 2,
                  background: isDark
                    ? 'rgba(30, 41, 59, 0.6)'
                    : 'rgba(248, 250, 252, 0.8)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid rgba(0, 0, 0, 0.04)',
                }}
              >
                <Button
                  variant={activeCategory === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setActiveCategory('all')}
                  sx={{
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'transform, background, border-color',
                    ...(activeCategory === 'all' ? {
                      background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                      border: 'none',
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    } : {
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                        transform: 'scale(1.02)',
                      },
                    }),
                  }}
                >
                  All Questions
                </Button>
                
                {Object.entries(faqCategories).map(([key, category]) => (
                  <Button
                    key={key}
                    variant={activeCategory === key ? 'contained' : 'outlined'}
                    onClick={() => setActiveCategory(key)}
                    sx={{
                      borderRadius: '12px',
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: 'transform, background, border-color',
                      ...(activeCategory === key ? {
                        background: category.gradient,
                        border: 'none',
                        color: 'white',
                        transform: 'scale(1.05)',
                        boxShadow: `0 4px 12px ${category.color}40`,
                      } : {
                        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          borderColor: category.color,
                          background: `${category.color}10`,
                          color: category.color,
                          transform: 'scale(1.02)',
                        },
                      }),
                    }}
                  >
                    {category.title}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* FAQ Cards */}
            <Box ref={sectionRef} sx={{ mb: 8, willChange: 'contents' }}>
              {filteredFAQs.map((faq, index) => {
                const category = faqCategories[faq.category as keyof typeof faqCategories];
                const isExpanded = expandedFAQ === index;
                
                return (
                  <Card
                    key={index}
                    ref={(el) => {
                      if (el) faqRefs.current[index] = el as HTMLDivElement;
                    }}
                    elevation={0}
                    sx={{
                      mb: 3,
                      background: isDark
                        ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.7) 100%)'
                        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
                      backdropFilter: 'blur(16px)',
                      border: isExpanded 
                        ? `2px solid ${category.color}`
                        : isDark 
                          ? '1px solid rgba(255, 255, 255, 0.06)'
                          : '1px solid rgba(0, 0, 0, 0.04)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      transition: 'border 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-2px) translateZ(0)',
                        border: `1px solid ${category.color}40`,
                        boxShadow: isDark
                          ? `0 12px 40px ${category.color}15`
                          : `0 12px 40px ${category.color}15`,
                      },
                    }}
                    onClick={() => handleFAQToggle(index)}
                  >
                    <CardContent sx={{ p: 0 }}>
                      {/* Question Header */}
                      <Box
                        sx={{
                          p: { xs: 3, sm: 4 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Chip
                              label={category.title}
                              size="small"
                              sx={{
                                background: `${category.color}15`,
                                color: category.color,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                border: 'none',
                              }}
                            />
                          </Box>
                          
                          <Typography
                            sx={{
                              fontSize: { xs: '1.1rem', md: '1.25rem' },
                              fontWeight: 600,
                              color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)',
                              lineHeight: 1.3,
                            }}
                          >
                            {faq.question}
                          </Typography>
                        </Box>
                        
                        <ExpandMore
                          sx={{
                            color: category.color,
                            fontSize: 28,
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'transform',
                          }}
                        />
                      </Box>

                      {/* Answer Content */}
                      <Box
                        ref={(el) => {
                          if (el) answerRefs.current[index] = el as HTMLDivElement;
                        }}
                        sx={{
                          height: 0,
                          opacity: 0,
                          overflow: 'hidden',
                          willChange: 'height, opacity',
                        }}
                      >
                        <Box
                          sx={{
                            px: { xs: 3, sm: 4 },
                            pb: { xs: 3, sm: 4 },
                            borderTop: isDark
                              ? '1px solid rgba(255, 255, 255, 0.06)'
                              : '1px solid rgba(0, 0, 0, 0.04)',
                            pt: 3,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                              lineHeight: 1.7,
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            {/* Contact CTA */}
            <Card
              ref={ctaRef}
              elevation={0}
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(0, 155, 228, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                backdropFilter: 'blur(20px)',
                border: isDark
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: h2FontSize,
                  fontWeight: 700,
                  color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 1)',
                  mb: 2,
                }}
              >
                Still have questions?
              </Typography>
              
              <Typography
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                Our team is here to help you get the most out of ChatAPC
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  background: isDark
                    ? 'linear-gradient(135deg, #009BE4 0%, #8B5CF6 100%)'
                    : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 155, 228, 0.3)'
                    : '0 12px 40px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, box-shadow',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: isDark
                      ? '0 16px 50px rgba(0, 155, 228, 0.45)'
                      : '0 16px 50px rgba(59, 130, 246, 0.45)',
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(0.99)',
                  },
                }}
              >
                Contact Us
              </Button>
            </Card>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default FAQPage;