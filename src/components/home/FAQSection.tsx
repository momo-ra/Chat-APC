import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, HelpOutline } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Who is ChatAPC for?",
    a: "Operators, process engineers, and managers — anyone who needs fast, reliable insights from plant data.",
  },
  {
    q: "Does ChatAPC replace engineers?",
    a: "No — it's an advisor, not a replacement. It explains what's happening so people make better decisions faster.",
  },
  {
    q: "Where does it get its answers?",
    a: "From your plant's data, documents, and captured expertise, all connected in a process knowledge map.",
  },
  {
    q: "How is my data handled?",
    a: "Your data stays in your environment. Deploy on-premise or private cloud with enterprise-grade security.",
  },
  {
    q: "How long does implementation take?",
    a: "Typically 4-8 weeks from kickoff to first answers. We work with your team to map your process, connect data sources, and configure the knowledge graph for your specific operations.",
  },
  {
    q: "What makes ChatAPC different?",
    a: "Built by process engineers and AI experts together — designed specifically for process industries with explainability and trust at the core.",
  },
];

const FAQSection: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('panel0');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement[]>([]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Animate FAQ items
      faqsRef.current.forEach((faq, index) => {
        if (faq) {
          gsap.from(faq, {
            scrollTrigger: {
              trigger: faq,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      data-section-theme="light"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        position: 'relative',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: 8 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              mb: 3,
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.25)',
            }}
          >
            <HelpOutline sx={{ fontSize: 32, color: '#FFFFFF' }} />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#1E293B',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about ChatAPC
          </Typography>
        </Box>

        {/* FAQ Accordions */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {faqs.map((faq, index) => (
            <Box
              key={index}
              ref={(el) => {
                if (el) faqsRef.current[index] = el as HTMLDivElement;
              }}
              sx={{ mb: 2 }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  background: '#FFFFFF',
                  borderRadius: '4px !important',
                  border: '2px solid',
                  borderColor: expanded === `panel${index}` ? '#2563EB' : '#E2E8F0',
                  boxShadow: expanded === `panel${index}` 
                    ? '0 12px 40px rgba(37, 99, 235, 0.15)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:before': {
                    display: 'none',
                  },
                  '&:hover': {
                    borderColor: '#2563EB',
                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.12)',
                  },
                  mb: 0,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore 
                      sx={{ 
                        color: expanded === `panel${index}` ? '#2563EB' : '#64748B',
                        transition: 'all 0.3s ease',
                      }} 
                    />
                  }
                  sx={{
                    minHeight: 72,
                    px: { xs: 2.5, md: 4 },
                    py: 2,
                    '& .MuiAccordionSummary-content': {
                      my: 2,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    {/* Question Number Badge */}
                    <Box
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: 4,
                        background: expanded === `panel${index}` 
                          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' 
                          : 'rgba(37, 99, 235, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: expanded === `panel${index}` ? '#FFFFFF' : '#2563EB',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>

                    {/* Question Text */}
                    <Typography
                      sx={{
                        fontSize: { xs: '1.05rem', md: '1.15rem' },
                        fontWeight: 600,
                        color: expanded === `panel${index}` ? '#2563EB' : '#1E293B',
                        transition: 'color 0.3s ease',
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.q}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: { xs: 2.5, md: 4 },
                    pb: 3,
                    pt: 0,
                  }}
                >
                  <Box
                    sx={{
                      pl: { xs: 0, md: 7 },
                      borderLeft: { xs: 'none', md: '3px solid #E2E8F0' },
                      ml: { xs: 0, md: 2.5 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        color: '#475569',
                        lineHeight: 1.8,
                      }}
                    >
                      {faq.a}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>

        {/* Bottom CTA */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 10,
            pt: 8,
            borderTop: '2px solid #E2E8F0',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: '#475569',
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            Still have questions?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: '#64748B',
              lineHeight: 1.7,
            }}
          >
            Our team is here to help.{' '}
            <Box
              component="span"
              sx={{
                color: '#2563EB',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(37, 99, 235, 0.3)',
                textUnderlineOffset: '4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#1D4ED8',
                  textDecorationColor: '#1D4ED8',
                },
              }}
            >
              Contact us
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;

