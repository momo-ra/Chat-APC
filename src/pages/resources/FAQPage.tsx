import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { AppSidebar, Footer, ThemeToggle } from '../../components/layout';
import { sidebarItems } from '../../data/layout/sidebarData';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What is ChatAPC and how does it work?",
    answer: "ChatAPC is an AI-powered assistant specifically designed for industrial process control. It connects to your plant's data systems and provides intelligent insights, troubleshooting assistance, and optimization recommendations through natural language conversations. The system uses specialized agents to analyze your process data, detect issues, and explain complex control behaviors in plain language."
  },
  {
    question: "How does ChatAPC integrate with existing control systems?",
    answer: "ChatAPC integrates seamlessly with your existing DCS, SCADA, and historian systems through secure APIs and data connectors. It can read real-time process data, historical trends, alarm logs, and control parameters without disrupting your current operations. The system supports major industrial protocols and can be deployed on-premise or in private cloud environments."
  },
  {
    question: "What types of process control questions can ChatAPC answer?",
    answer: "ChatAPC can help with a wide range of process control questions including: constraint identification and analysis, control loop troubleshooting, optimization recommendations, alarm analysis, historical trend interpretation, 'what-if' scenario planning, and process performance diagnostics. It understands industrial terminology and can explain complex control strategies in accessible terms."
  },
  {
    question: "Is my plant data secure with ChatAPC?",
    answer: "Yes, data security is our top priority. ChatAPC can be deployed on-premise, ensuring your data never leaves your facility. We use enterprise-grade encryption, secure authentication, and follow industrial cybersecurity standards. The system can operate in air-gapped environments and integrates with your existing security infrastructure."
  },
  {
    question: "How quickly can we see results after implementing ChatAPC?",
    answer: "Most plants see immediate benefits within the first week of deployment. Engineers can start asking questions and getting insights right away. Typical ROI includes 10-30% improvement in process efficiency, significant reduction in troubleshooting time, and better decision-making. Full optimization benefits typically emerge within 3-6 months as the system learns your specific processes."
  },
  {
    question: "What training is required for our engineers to use ChatAPC?",
    answer: "ChatAPC is designed to be intuitive and requires minimal training. Engineers can start using it immediately with natural language questions. We provide a 2-hour onboarding session and ongoing support. The system learns your plant's specific terminology and processes over time, making it even more effective as your team uses it."
  },
  {
    question: "Can ChatAPC work with different types of industrial processes?",
    answer: "Yes, ChatAPC is designed to work across various industrial sectors including oil & gas, petrochemicals, power generation, pharmaceuticals, food & beverage, and manufacturing. The system adapts to different process types, control strategies, and industry-specific requirements. It can handle continuous processes, batch operations, and hybrid systems."
  },
  {
    question: "What support and maintenance does ChatAPC require?",
    answer: "ChatAPC is designed for minimal maintenance. We provide 24/7 technical support, regular software updates, and system monitoring. The AI models are continuously improved and updated remotely. On-site maintenance is typically limited to initial setup and major updates, with most support provided remotely through secure connections."
  }
];

const FAQPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRefs = useRef<HTMLDivElement[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // Accordion animations
      accordionRefs.current.forEach((accordion, index) => {
        if (accordion) {
          gsap.from(accordion, {
            scrollTrigger: {
              trigger: accordion,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark 
          ? 'linear-gradient(180deg, #0a0e2e 0%, #0d1842 50%, #0a0e2e 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)',
        transition: 'background 0.3s ease',
      }}
    >
      <AppSidebar items={sidebarItems} />
      <ThemeToggle />
      
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          paddingTop: { xs: 4, md: 6 },
          paddingBottom: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Page Header */}
          <Box ref={headerRef} sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                maxWidth: 700,
                mx: 'auto',
                transition: 'color 0.3s ease',
              }}
            >
              Everything you need to know about ChatAPC and how it can transform your industrial processes
            </Typography>
          </Box>

          {/* FAQ Accordions */}
          <Box ref={sectionRef}>
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                ref={(el) => {
                  if (el) accordionRefs.current[index] = el as HTMLDivElement;
                }}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '4px !important',
                  border: '2px solid',
                  borderColor: expanded === `panel${index}` ? (isDark ? '#009BE4' : '#2563EB') : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'),
                  boxShadow: expanded === `panel${index}` 
                    ? (isDark ? '0 12px 40px rgba(0, 155, 228, 0.15)' : '0 12px 40px rgba(37, 99, 235, 0.15)')
                    : (isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)'),
                  mb: 2,
                  transition: 'all 0.3s ease',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: '0 0 16px 0',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: isDark ? '#009BE4' : '#2563EB' }} />}
                  sx={{
                    padding: { xs: 2, md: 3 },
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 600,
                      color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: { xs: '0 32px 24px 32px', md: '0 40px 32px 40px' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                      lineHeight: 1.7,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Contact CTA */}
          <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)',
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                mb: 3,
                transition: 'color 0.3s ease',
              }}
            >
              Our team is here to help you get the most out of ChatAPC
            </Typography>
            <Box
              component="a"
              href="/contact"
              sx={{
                display: 'inline-block',
                padding: '12px 24px',
                background: isDark 
                  ? 'linear-gradient(135deg, #009BE4 0%, #0084C7 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark 
                    ? '0 8px 24px rgba(0, 155, 228, 0.3)'
                    : '0 8px 24px rgba(37, 99, 235, 0.3)',
                },
              }}
            >
              Contact Us
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default FAQPage;
