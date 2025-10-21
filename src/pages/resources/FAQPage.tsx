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
import { usePageTitle } from '../../hooks/usePageTitle';
import { SEOHead } from '../../components/SEO/SEOHead';
import { 
  themeConfig, 
  getColor, 
  getGradient, 
  getTextColor,
  getCardStyles,
  getButtonStyles,
  withOpacity 
} from '../../components/shared/themeConfig';

gsap.registerPlugin(ScrollTrigger);

const getFaqCategories = (isDark: boolean) => ({
  general: {
    title: 'General',
    color: getColor(themeConfig.colors.blue, isDark),
    gradient: getGradient(themeConfig.gradients.blue, isDark),
  },
  technical: {
    title: 'Technical',
    color: getColor(themeConfig.colors.green, isDark),
    gradient: getGradient(themeConfig.gradients.green, isDark),
  },
  implementation: {
    title: 'Implementation',
    color: getColor(themeConfig.colors.purple, isDark),
    gradient: getGradient(themeConfig.gradients.purple, isDark),
  },
});

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
    answer: "ChatAPC is designed to be intuitive and requires minimal training. Engineers can start using it immediately with natural language questions. We provide training sessions and ongoing support."
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
  } = useResponsiveLayout();

  // Get unified theme values
  const { colors, gradients, typography, animations, transitions, borderRadius, shadows } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const secondaryColor = getColor(colors.cyan, isDark);
  const faqCategories = getFaqCategories(isDark);
  const cardStyles = getCardStyles(isDark, 'default');
  const cardHoverStyles = getCardStyles(isDark, 'hover');
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150,
    });

    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: animations.duration.normal,
          stagger: 0.2,
          ease: animations.easing.easeOut,
        });
      }

      // Animate FAQ cards
      faqRefs.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: animations.duration.normal,
            delay: index * 0.08,
            ease: animations.easing.sharp,
          });
        }
      });

      // Animate CTA
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          opacity: 0,
          duration: animations.duration.normal,
          ease: animations.easing.easeOut,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [animations]);

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const handleFAQToggle = (index: number) => {
    const answerElement = answerRefs.current[index];
    if (!answerElement) return;

    const isCurrentlyExpanded = expandedFAQ === index;

    if (isCurrentlyExpanded) {
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
      if (expandedFAQ !== null && answerRefs.current[expandedFAQ]) {
        gsap.to(answerRefs.current[expandedFAQ], {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }

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
      {/* SEO Meta Tags with FAQ Schema */}
      <SEOHead
        title="FAQ - ChatAPC | Frequently Asked Questions"
        description="Frequently asked questions about ChatAPC (Chat APC) - AI assistant for industrial process control. Learn about integration, security, implementation, and more."
        url="https://chatapc.ai/resources/faq"
        keywords="ChatAPC FAQ, Chat APC questions, industrial AI FAQ, process control questions, ChatAPC help"
        breadcrumbs={[
          { name: 'Home', url: 'https://chatapc.ai/' },
          { name: 'FAQ', url: 'https://chatapc.ai/resources/faq' }
        ]}
        schema={faqSchema}
      />

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
          transition: transitions.normal,
          position: 'relative',
        }}
      >
        <AppSidebar items={sidebarItems} />
        <ThemeToggle />
        
        <Box
          id="main-content"
          component="main"
          role="main"
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
                  fontSize: typography.bodySmall.size,
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  mb: 3,
                  background: isDark
                    ? withOpacity(secondaryColor, 0.12)
                    : withOpacity(primaryColor, 0.12),
                  color: primaryColor,
                  border: 'none',
                  backdropFilter: 'blur(10px)',
                  borderRadius: borderRadius.full,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: h1FontSize,
                  fontWeight: typography.h1.weight,
                  background: getGradient(gradients.blueToPurple, isDark),
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  letterSpacing: '-0.02em',
                  lineHeight: typography.h1.lineHeight,
                }}
              >
                Frequently Asked Questions
              </Typography>

              <Typography
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: getTextColor('muted', isDark),
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: typography.bodyLarge.lineHeight,
                  fontWeight: typography.bodyLarge.weight,
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
                  background: cardStyles.background,
                  borderRadius: borderRadius.xl,
                  backdropFilter: 'blur(10px)',
                  border: cardStyles.border,
                }}
              >
                <Button
                  variant={activeCategory === 'all' ? 'contained' : 'outlined'}
                  onClick={() => setActiveCategory('all')}
                  sx={{
                    borderRadius: borderRadius.lg,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: transitions.allNormal,
                    willChange: 'transform, background, border-color',
                    ...(activeCategory === 'all' ? {
                      background: getGradient(gradients.blue, isDark),
                      border: 'none',
                      color: '#FFFFFF',
                      transform: 'scale(1.05)',
                      boxShadow: `0 4px 12px ${withOpacity(primaryColor, 0.3)}`,
                    } : {
                      color: getTextColor('muted', isDark),
                      borderColor: withOpacity(primaryColor, 0.1),
                      '&:hover': {
                        borderColor: withOpacity(primaryColor, 0.2),
                        background: withOpacity(primaryColor, 0.05),
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
                      borderRadius: borderRadius.lg,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: transitions.allNormal,
                      willChange: 'transform, background, border-color',
                      ...(activeCategory === key ? {
                        background: category.gradient,
                        border: 'none',
                        color: '#FFFFFF',
                        transform: 'scale(1.05)',
                        boxShadow: `0 4px 12px ${withOpacity(category.color, 0.3)}`,
                      } : {
                        color: getTextColor('muted', isDark),
                        borderColor: withOpacity(category.color, 0.1),
                        '&:hover': {
                          borderColor: category.color,
                          background: withOpacity(category.color, 0.1),
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
                      background: cardStyles.background,
                      backdropFilter: 'blur(16px)',
                      border: isExpanded 
                        ? `2px solid ${category.color}`
                        : cardStyles.border,
                      borderRadius: borderRadius.xl,
                      overflow: 'hidden',
                      transition: transitions.allNormal,
                      cursor: 'pointer',
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-2px) translateZ(0)',
                        border: `1px solid ${withOpacity(category.color, 0.4)}`,
                        boxShadow: `0 12px 40px ${withOpacity(category.color, 0.15)}`,
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
                                background: withOpacity(category.color, 0.15),
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
                              color: getTextColor('primary', isDark),
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
                            transition: transitions.allNormal,
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
                            borderTop: cardStyles.border,
                            pt: 3,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              color: getTextColor('secondary', isDark),
                              lineHeight: typography.body.lineHeight,
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
                  ? withOpacity(secondaryColor, 0.08)
                  : withOpacity(primaryColor, 0.08),
                backdropFilter: 'blur(20px)',
                border: cardStyles.border,
                borderRadius: borderRadius.xl,
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
                  fontWeight: typography.h2.weight,
                  color: getTextColor('primary', isDark),
                  mb: 2,
                }}
              >
                Still have questions?
              </Typography>
              
              <Typography
                sx={{
                  fontSize: bodyLargeFontSize,
                  color: getTextColor('muted', isDark),
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
                onClick={() => navigate('/company/contact')}
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  background: primaryButtonStyles.background,
                  color: primaryButtonStyles.text,
                  borderRadius: borderRadius.full,
                  textTransform: 'none',
                  boxShadow: primaryButtonStyles.shadow,
                  transition: transitions.allNormal,
                  willChange: 'transform, box-shadow',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.02)',
                    background: primaryButtonHoverStyles.background,
                    boxShadow: primaryButtonHoverStyles.shadow,
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

        <Box component="footer" role="contentinfo">
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default FAQPage;