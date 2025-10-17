import React, { useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { applyEntranceAnimation, applyStaggerAnimation } from '../shared/animationHelpers';
import { animationPresets, staggerConfig } from '../shared/animation';

interface BlogDetailContentProps {
  content: string;
  categoryColor: string;
  featuredImage?: string;
  imageAlt?: string;
}

export const BlogDetailContent: React.FC<BlogDetailContentProps> = ({
  content,
  categoryColor,
  featuredImage,
  imageAlt = 'Article image',
}) => {
  const { isDark } = useThemeMode();
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    containerMaxWidth,
    containerPadding,
  } = useResponsiveLayout();

  useEffect(() => {
    // Featured image animation
    if (imageRef.current) {
      applyEntranceAnimation(imageRef.current, 'scaleUp', {
        delay: 0,
        startTrigger: 'top 80%',
      });
    }

    // Stagger content paragraphs & elements
    if (contentRef.current) {
      const elements = Array.from(
        contentRef.current.querySelectorAll('p, h2, h3, ul, ol, blockquote')
      ) as HTMLElement[];
      if (elements.length) {
        applyStaggerAnimation(elements, 'slideUp', {
          staggerDelay: staggerConfig.cards.delay,
          triggerElement: contentRef.current,
          startTrigger: 'top 85%',
        });
      }
    }
    // no gsap context needed as the helpers already rely on gsap and ScrollTrigger handles cleanup
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* Featured Image */}
      {featuredImage && (
        <Container
          maxWidth="lg"
          sx={{
            maxWidth: containerMaxWidth,
            px: containerPadding,
            mt: { xs: 4, md: 6 },
          }}
        >
          <Box
            ref={imageRef}
            component="img"
            src={featuredImage}
            alt={imageAlt}
            sx={{
              width: '100%',
              maxHeight: { xs: 300, md: 500 },
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: isDark
                ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                : '0 20px 60px rgba(0, 0, 0, 0.08)',
            }}
          />
        </Container>
      )}

      {/* Article Content */}
      <Container
        maxWidth="md"
        sx={{
          maxWidth: { xs: '100%', md: '800px' },
          px: containerPadding,
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          ref={contentRef}
          sx={{
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              color: isDark ? '#FFFFFF' : '#0F172A',
              fontWeight: 700,
              mb: 3,
              mt: 5,
              lineHeight: 1.3,
              '&:first-of-type': {
                mt: 0,
              },
            },
            '& h2': {
              fontSize: { xs: '1.75rem', md: '2rem' },
              borderBottom: isDark ? '2px solid rgba(71, 85, 105, 0.3)' : '2px solid rgba(226, 232, 240, 1)',
              pb: 2,
            },
            '& h3': {
              fontSize: { xs: '1.5rem', md: '1.75rem' },
            },
            '& h4': {
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            },
            '& p': {
              fontSize: { xs: '1.0625rem', md: '1.125rem' },
              lineHeight: 1.8,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
              mb: 3,
            },
            '& ul, & ol': {
              fontSize: { xs: '1.0625rem', md: '1.125rem' },
              lineHeight: 1.8,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
              mb: 3,
              pl: { xs: 3, md: 4 },
            },
            '& li': {
              mb: 1.5,
              '&::marker': {
                color: categoryColor,
              },
            },
            '& blockquote': {
              borderLeft: `4px solid ${categoryColor}`,
              pl: 3,
              py: 2,
              my: 4,
              fontStyle: 'italic',
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#475569',
              backgroundColor: isDark 
                ? `${categoryColor}08`
                : `${categoryColor}05`,
              borderRadius: '0 8px 8px 0',
            },
            '& code': {
              backgroundColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.1)',
              color: isDark ? '#60A5FA' : '#3B82F6',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '0.9em',
              fontFamily: '"Fira Code", "Courier New", monospace',
              fontWeight: 500,
            },
            '& pre': {
              backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(248, 250, 252, 1)',
              border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
              padding: 3,
              borderRadius: 3,
              overflow: 'auto',
              mb: 4,
              '& code': {
                backgroundColor: 'transparent',
                padding: 0,
                color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#1E293B',
              },
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
              my: 4,
              boxShadow: isDark
                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.08)',
            },
            '& hr': {
              border: 'none',
              borderTop: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
              my: 5,
            },
            '& a': {
              color: categoryColor,
              textDecoration: 'none',
              fontWeight: 600,
              borderBottom: `2px solid ${categoryColor}40`,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderBottomColor: categoryColor,
              },
            },
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              my: 4,
              fontSize: '0.95rem',
              '& th, & td': {
                border: isDark ? '1px solid rgba(71, 85, 105, 0.3)' : '1px solid rgba(226, 232, 240, 1)',
                padding: 2,
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: isDark ? 'rgba(71, 85, 105, 0.2)' : 'rgba(248, 250, 252, 1)',
                fontWeight: 600,
                color: isDark ? '#FFFFFF' : '#0F172A',
              },
              '& td': {
                color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#334155',
              },
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </>
  );
};