import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { 
  AccountTree, 
  Explore, 
  TrendingUp,
  Psychology,
  Engineering,
  Insights
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

gsap.registerPlugin(ScrollTrigger);

const mapFeatures = [
  {
    title: 'Context-rich',
    description: 'TI100 isn\'t just a number — it\'s a temperature indicator, tied to E-200, controlling feed flow',
    icon: Psychology,
    color: { light: '#8B5CF6', dark: '#A78BFA' },
  },
  {
    title: 'Structured',
    description: 'Equipment, loops, variables, and alarms are linked in meaningful relationships',
    icon: AccountTree,
    color: { light: '#10B981', dark: '#34D399' },
  },
  {
    title: 'Explorable',
    description: 'Navigate the map directly, zooming into loops, units, or entire process areas',
    icon: Explore,
    color: { light: '#F59E0B', dark: '#FBBF24' },
  },
  {
    title: 'Evolving',
    description: 'As you add more, the map grows — becoming your single source of truth',
    icon: TrendingUp,
    color: { light: '#EC4899', dark: '#F472B6' },
  },
];

// Define the nodes for the interactive knowledge graph.  Each node has
// a unique id, display label, size category, color palette, relative
// position expressed as percentages, and an optional icon component.
// Colors are provided as objects with `light` and `dark` keys so that
// they can adapt to the current theme.
const graphNodes = [
  {
    id: 'central',
    label: 'Process Knowledge',
    size: 'xlarge',
    color: { light: '#8B5CF6', dark: '#A78BFA' },
    x: 50,
    y: 50,
    icon: Engineering,
  },
  {
    id: 'ti100',
    label: 'TI-100',
    size: 'large',
    color: { light: '#10B981', dark: '#34D399' },
    x: 50,
    y: 12,
    icon: Psychology,
  },
  {
    id: 'equipment',
    label: 'E-200',
    size: 'large',
    color: { light: '#F59E0B', dark: '#FBBF24' },
    x: 20,
    y: 35,
    icon: AccountTree,
  },
  {
    id: 'feed',
    label: 'Feed Flow',
    size: 'large',
    color: { light: '#EC4899', dark: '#F472B6' },
    x: 80,
    y: 40,
    icon: TrendingUp,
  },
  {
    id: 'control',
    label: 'Control Loop',
    size: 'large',
    color: { light: '#3B82F6', dark: '#60A5FA' },
    x: 75,
    y: 78,
    icon: Explore,
  },
  {
    id: 'alarms',
    label: 'Alarms',
    size: 'large',
    color: { light: '#A855F7', dark: '#C084FC' },
    x: 25,
    y: 78,
    icon: Insights,
  },
  // Satellite nodes without labels to hint at more context
  { id: 'sat1', label: '', size: 'small', color: { light: '#F472B6', dark: '#F472B6' }, x: 15, y: 20 },
  { id: 'sat2', label: '', size: 'small', color: { light: '#A78BFA', dark: '#A78BFA' }, x: 70, y: 18 },
  { id: 'sat3', label: '', size: 'small', color: { light: '#FBBF24', dark: '#FBBF24' }, x: 90, y: 35 },
  { id: 'sat4', label: '', size: 'small', color: { light: '#34D399', dark: '#34D399' }, x: 90, y: 70 },
  { id: 'sat5', label: '', size: 'small', color: { light: '#60A5FA', dark: '#60A5FA' }, x: 55, y: 90 },
  { id: 'sat6', label: '', size: 'small', color: { light: '#F59E0B', dark: '#F59E0B' }, x: 12, y: 70 },
  { id: 'sat7', label: '', size: 'medium', color: { light: '#EC4899', dark: '#EC4899' }, x: 40, y: 25 },
  { id: 'sat8', label: '', size: 'small', color: { light: '#FBBF24', dark: '#FBBF24' }, x: 90, y: 50 },
];

// Define edges between nodes.  Each connection describes the relationship
// from one node to another and optionally includes a label that will be
// displayed at the midpoint of the connecting line.  These labels
// explain the relationship in plain language.
const graphConnections = [
  { from: 'central', to: 'ti100', label: 'monitors' },
  { from: 'central', to: 'equipment', label: 'controls' },
  { from: 'central', to: 'feed', label: 'regulates' },
  { from: 'central', to: 'control', label: 'manages' },
  { from: 'central', to: 'alarms', label: 'triggers' },
  { from: 'ti100', to: 'feed', label: 'measures' },
  { from: 'equipment', to: 'alarms', label: 'connected' },
  { from: 'equipment', to: 'sat7', label: '' },
  { from: 'ti100', to: 'sat1', label: '' },
  { from: 'ti100', to: 'sat2', label: '' },
  { from: 'feed', to: 'sat3', label: '' },
  { from: 'feed', to: 'control', label: 'feeds into' },
  { from: 'control', to: 'sat4', label: '' },
  { from: 'control', to: 'sat5', label: '' },
  { from: 'alarms', to: 'sat6', label: '' },
  { from: 'feed', to: 'sat8', label: '' },
];


export const KnowledgeMapSection: React.FC = () => {
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  // Section and element refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);

  // Graph refs for nodes and connections
  const graphNodesRef = useRef<HTMLDivElement[]>([]);
  const connectionRefs = useRef<SVGGElement[]>([]);

  // Visibility state for the graph; triggers animations when it enters viewport
  const [graphVisible, setGraphVisible] = useState(false);

  // Helper to convert node size labels to pixel values
  const getNodeSize = (size: 'small' | 'medium' | 'large' | 'xlarge'): number => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 70;
      case 'large':
        return 110;
      case 'xlarge':
        return 180;
      default:
        return 60;
    }
  };

  // Observe the visual graph container to trigger animations when it becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGraphVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (visualRef.current) {
      observer.observe(visualRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Animate header, graph elements, and feature cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation: slide and fade in
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'back.out(1.4)',
        });
      }

      // Animate graph only after it becomes visible
      if (graphVisible) {
        // Nodes scale in with slight delay between each
        if (graphNodesRef.current.length) {
          graphNodesRef.current.forEach((node, idx) => {
            gsap.from(node, {
              scale: 0.5,
              opacity: 0,
              duration: 0.6,
              delay: 0.3 + idx * 0.08,
              ease: 'back.out(1.5)',
            });
          });
        }
        // Draw connection lines and fade in labels
        if (connectionRefs.current.length) {
          connectionRefs.current.forEach((conn, idx) => {
            const line = conn.querySelector('line');
            const label = conn.querySelector('text');
            if (line) {
              const length = (line as SVGLineElement).getTotalLength();
              // Set up dasharray and initial dashoffset
              gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
              gsap.to(line, {
                strokeDashoffset: 0,
                duration: 1.0,
                delay: 0.5 + idx * 0.05,
                ease: 'power2.out',
              });
            }
            if (label) {
              gsap.from(label, {
                opacity: 0,
                duration: 0.5,
                delay: 1.3 + idx * 0.05,
                ease: 'power2.out',
              });
            }
          });
        }
      }

      // Feature cards animation: staggered fade and slide up
      featuresRef.current.forEach((feature, index) => {
        if (feature) {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            y: 80,
            scale: 0.95,
            opacity: 0,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'back.out(1.4)',
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [graphVisible]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      data-section-theme={isDark ? 'dark' : 'light'}
      sx={{
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '60%',
          height: '60%',
          background: isDark
            ? 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        {/* Section Header */}
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <Chip
            label="Context Made Visible"
            sx={{
              mb: 3,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: isDark
                ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              px: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            The Knowledge Map
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            Raw tags alone don't explain a process. ChatAPC builds a knowledge map: a living model of your plant.
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: isDark ? '#A78BFA' : '#7C3AED',
              fontStyle: 'italic',
            }}
          >
            The map lets ChatAPC understand your plant like an experienced engineer would
          </Typography>
        </Box>

        {/* Visual Knowledge Map Representation */}
        <Box
          ref={visualRef}
          sx={{
            position: 'relative',
            width: '100%',
            // Maintain a responsive height while leaving room for aspect ratio on larger screens
            height: { xs: 320, md: 420 },
            mb: { xs: 8, md: 12 },
            // Subtle gradient background that adapts to the current theme
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(255, 255, 255, 0.96) 100%)',
            borderRadius: 6,
            border: isDark
              ? '1px solid rgba(71, 85, 105, 0.35)'
              : '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: isDark
              ? '0 15px 40px rgba(0, 0, 0, 0.5)'
              : '0 15px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle radial background effect */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'radial-gradient(circle at center, rgba(167, 139, 250, 0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(167, 139, 250, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* SVG for connections */}
          <Box
            component="svg"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          >
            <defs>
              {/* Define an arrowhead marker for directed edges */}
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 10 3, 0 6" fill={isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(100, 116, 139, 0.3)'} />
              </marker>
            </defs>
            {graphConnections.map((conn, idx) => {
              const fromNode = graphNodes.find((n) => n.id === conn.from);
              const toNode = graphNodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;
              const x1 = `${fromNode.x}%`;
              const y1 = `${fromNode.y}%`;
              const x2 = `${toNode.x}%`;
              const y2 = `${toNode.y}%`;
              // Midpoint for optional label
              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;
              // Determine stroke color based on theme
              const strokeColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(71, 85, 105, 0.3)';
              return (
                <g
                  key={`conn-${idx}`}
                  ref={(el) => {
                    if (el) connectionRefs.current[idx] = el as SVGGElement;
                  }}
                  style={{ transformOrigin: 'center center' }}
                >
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={strokeColor}
                    strokeWidth={2}
                    markerEnd="url(#arrowhead)"
                  />
                  {conn.label && (
                    <text
                      x={`${midX}%`}
                      y={`${midY}%`}
                      fill={isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 0.7)'}
                      fontSize="11"
                      fontStyle="italic"
                      textAnchor="middle"
                      dy={-4}
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}
          </Box>

          {/* Nodes */}
          {graphNodes.map((node, idx) => {
            const size = getNodeSize(node.size as any);
            const nodeColor = (node.color as any)[isDark ? 'dark' : 'light'] || node.color;
            const IconComponent = node.icon as any;
            return (
              <Box
                key={node.id}
                ref={(el) => {
                  if (el) graphNodesRef.current[idx] = el as HTMLDivElement;
                }}
                sx={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: size,
                  height: size,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: node.label ? 'pointer' : 'default',
                  zIndex: 2,
                }}
              >
                {/* Node circle */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    // Fill the circle completely with the node's color for a bold appearance
                    background: nodeColor,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: `0 8px 32px ${nodeColor}40`,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      sx={{
                        fontSize:
                          node.size === 'xlarge'
                            ? 48
                            : node.size === 'large'
                            ? 36
                            : node.size === 'medium'
                            ? 28
                            : 20,
                        // Icons are white to contrast the colored circle
                        color: '#FFFFFF',
                      }}
                    />
                  )}
                  {/* Glow effect */}
                  <Box
                    className="glow"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${nodeColor}60 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      zIndex: -1,
                      pointerEvents: 'none',
                      '.MuiBox-root:hover &': {
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
                {/* Label */}
                {node.label && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: nodeColor,
                      background: `${nodeColor}15`,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      backdropFilter: 'blur(6px)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {node.label}
                  </Typography>
                )}
              </Box>
            );
          })}

          {/* Floating Label */}
          <Typography
            sx={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              fontWeight: 600,
              color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
              background: isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.85)',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backdropFilter: 'blur(12px)',
              zIndex: 3,
            }}
          >
            Process Knowledge Map
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {mapFeatures.map((feature, index) => {
            const featureColor = feature.color[isDark ? 'dark' : 'light'];
            const IconComponent = feature.icon;
            return (
              <Box
                key={index}
                ref={(el) => {
                  if (el) featuresRef.current[index] = el as HTMLDivElement;
                }}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: isDark
                    ? `1px solid rgba(71, 85, 105, 0.35)`
                    : `1px solid rgba(226, 232, 240, 0.85)`,
                  background: isDark
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isDark
                      ? `0 20px 40px ${feature.color.dark}30`
                      : `0 20px 40px ${feature.color.light}20`,
                    borderColor: featureColor,
                  },
                }}
              >
                {/* Icon container */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    backgroundColor: `${featureColor}20`,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: featureColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Render the feature icon within the inner circle */}
                    <IconComponent
                      sx={{
                        fontSize: 18,
                        color: '#FFFFFF',
                      }}
                    />
                  </Box>
                </Box>
                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    mb: 1.5,
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </Typography>
                {/* Description */}
                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};