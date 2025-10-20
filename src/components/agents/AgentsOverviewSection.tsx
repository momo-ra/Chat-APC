// import React, { useEffect, useRef } from 'react';
// import { Box, Typography, Container } from '@mui/material';
// import {
//   SmartToy,
//   Tune,
//   Explore,
//   Chat,
//   TrendingUp
// } from '@mui/icons-material';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useThemeMode } from '../../contexts/ThemeContext';
// import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

// gsap.registerPlugin(ScrollTrigger);

// const BLUE_DARK = '#60A5FA';
// const BLUE_LIGHT = '#3B82F6';

// const agentCapabilities = [
//   {
//     title: 'Adjust time window or tags',
//     agent: 'Visualize Agent',
//     description: 'Customize your data visualization in real-time',
//     icon: Tune,
//   },
//   {
//     title: 'Explore and zoom through equipment',
//     agent: 'Process Navigator',
//     description: 'Navigate your plant\'s knowledge map interactively',
//     icon: Explore,
//   },
//   {
//     title: 'Question decisions or shifts',
//     agent: 'Advisor Agent',
//     description: 'Get explanations about process behavior and changes',
//     icon: Chat,
//   },
//   {
//     title: 'Review and filter events',
//     agent: 'Events Manager',
//     description: 'Track and analyze operational events over time',
//     icon: TrendingUp,
//   },
// ];

// export const AgentsOverviewSection: React.FC = () => {
//   const { isDark } = useThemeMode();
//   const {
//     containerMaxWidth,
//     containerPadding,
//     h2FontSize,
//     bodyFontSize,
//     sectionPadding
//   } = useResponsiveLayout();

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<HTMLDivElement[]>([]);
//   const visionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header animation
//       if (headerRef.current) {
//         gsap.from(headerRef.current, {
//           scrollTrigger: {
//             trigger: headerRef.current,
//             start: 'top 85%',
//             toggleActions: 'play none none none',
//           },
//           y: 50,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power3.out',
//         });
//       }

//       // Cards animation
//       cardsRef.current.forEach((card, index) => {
//         if (card) {
//           gsap.from(card, {
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 90%',
//               toggleActions: 'play none none none',
//             },
//             y: 60,
//             opacity: 0,
//             duration: 0.8,
//             delay: index * 0.15,
//             ease: 'power2.out',
//           });
//         }
//       });

//       // Vision section animation
//       if (visionRef.current) {
//         gsap.from(visionRef.current, {
//           scrollTrigger: {
//             trigger: visionRef.current,
//             start: 'top 85%',
//             toggleActions: 'play none none none',
//           },
//           y: 40,
//           opacity: 0,
//           duration: 0.6,
//           ease: 'power2.out',
//         });
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   // Blue palette according to palette spec
//   const blueMain = isDark ? BLUE_DARK : BLUE_LIGHT;
//   const blueText = isDark ? BLUE_DARK : BLUE_LIGHT;

//   // Used for subtle backgrounds on hover
//   const blueBgHover = isDark
//     ? 'linear-gradient(90deg, rgba(96, 165, 250, 0.09) 0%, transparent 100%)'
//     : 'linear-gradient(90deg, rgba(59, 130, 246, 0.09) 0%, transparent 100%)';

//   const blueBorderDefault = isDark
//     ? '2px solid rgba(96, 165, 250, 0.20)'
//     : '2px solid rgba(59, 130, 246, 0.14)';

//   const blueBorderActive = isDark
//     ? `3px solid ${BLUE_DARK}`
//     : `3px solid ${BLUE_LIGHT}`;

//   return (
//     <Box
//       ref={sectionRef}
//       component="section"
//       sx={{
//         py: sectionPadding,
//         background: 'transparent',
//         position: 'relative',
//       }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{
//           maxWidth: containerMaxWidth,
//           px: containerPadding,
//         }}
//       >
//         {/* Section Header */}
//         <Box ref={headerRef} sx={{ mb: { xs: 8, md: 10 } }}>
//           <Typography
//             sx={{
//               fontSize: { xs: '0.875rem', md: '1rem' },
//               fontWeight: 700,
//               color: blueMain,
//               textTransform: 'uppercase',
//               letterSpacing: 2,
//               mb: 2,
//             }}
//           >
//             How it Works
//           </Typography>
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: h2FontSize,
//               fontWeight: 700,
//               color: isDark ? '#FFFFFF' : '#0F172A',
//               mb: 3,
//               lineHeight: 1.2,
//               maxWidth: 900,
//             }}
//           >
//             What are Agents?
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: bodyFontSize,
//               color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
//               maxWidth: '800px',
//               lineHeight: 1.7,
//               mb: 3,
//             }}
//           >
//             Agents are specialized digital co-workers inside ChatAPC. Each one has a role:
//             one shows you the graph, another explains process behavior, another watches profit,
//             another keeps track of events.
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: { xs: '1.125rem', md: '1.25rem' },
//               fontWeight: 600,
//               color: blueMain,
//               maxWidth: '700px',
//               lineHeight: 1.6,
//             }}
//           >
//             You don't just receive static answers — you can drive the interaction:
//           </Typography>
//         </Box>

//         {/* Interactive Capabilities - Grid Layout */}
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
//             gap: { xs: 3, md: 4 },
//             mb: { xs: 10, md: 14 },
//           }}
//         >
//           {agentCapabilities.map((capability, index) => {
//             const IconComponent = capability.icon;
//             return (
//               <Box
//                 key={index}
//                 ref={(el) => {
//                   if (el) cardsRef.current[index] = el as HTMLDivElement;
//                 }}
//                 sx={{
//                   position: 'relative',
//                   p: { xs: 3, md: 4 },
//                   borderRadius: 0,
//                   borderLeft: blueBorderDefault,
//                   background: 'transparent',
//                   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                   '&:hover': {
//                     pl: { xs: 4, md: 5 },
//                     borderLeft: blueBorderActive,
//                     background: blueBgHover,
//                     '& .capability-icon': {
//                       transform: 'scale(1.1) rotate(5deg)',
//                     },
//                   },
//                 }}
//               >
//                 {/* Icon */}
//                 <Box
//                   className="capability-icon"
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mb: 3,
//                     transition: 'all 0.4s ease',
//                   }}
//                 >
//                   <IconComponent
//                     sx={{
//                       fontSize: 36,
//                       color: isDark ? 'rgba(96,165,250,0.62)' : 'rgba(59,130,246,0.82)',
//                       transition: 'all 0.4s ease',
//                     }}
//                   />
//                 </Box>

//                 {/* Agent Label */}
//                 <Typography
//                   sx={{
//                     fontSize: '0.75rem',
//                     fontWeight: 600,
//                     color: blueMain,
//                     textTransform: 'uppercase',
//                     letterSpacing: 1.5,
//                     mb: 1,
//                   }}
//                 >
//                   {capability.agent}
//                 </Typography>

//                 {/* Title */}
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontSize: { xs: '1.25rem', md: '1.4rem' },
//                     fontWeight: 700,
//                     color: isDark ? '#FFFFFF' : '#0F172A',
//                     mb: 2,
//                     lineHeight: 1.3,
//                   }}
//                 >
//                   {capability.title}
//                 </Typography>

//                 {/* Description */}
//                 <Typography
//                   sx={{
//                     fontSize: '1rem',
//                     color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748B',
//                     lineHeight: 1.7,
//                   }}
//                 >
//                   {capability.description}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>

//         {/* Vision Section - Simplified */}
//         <Box
//           ref={visionRef}
//           sx={{
//             position: 'relative',
//             pt: { xs: 8, md: 10 },
//             borderTop: isDark
//               ? `1px solid ${BLUE_DARK}30`
//               : `1px solid ${BLUE_LIGHT}20`,
//           }}
//         >
//           {/* Icon */}
//           <Box
//             sx={{
//               width: 72,
//               height: 72,
//               borderRadius: 2,
//               background: isDark
//                 ? `linear-gradient(135deg, ${BLUE_DARK} 0%, #1e293b 100%)`
//                 : `linear-gradient(135deg, ${BLUE_LIGHT} 0%, #dbeafe 100%)`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               mb: 4,
//               boxShadow: isDark
//                 ? `0 8px 24px ${BLUE_DARK}4D`
//                 : `0 8px 24px ${BLUE_LIGHT}40`,
//             }}
//           >
//             <SmartToy
//               sx={{
//                 fontSize: 40,
//                 color: '#FFFFFF',
//               }}
//             />
//           </Box>

//           <Typography
//             variant="h3"
//             sx={{
//               fontSize: { xs: '1.75rem', md: '2.25rem' },
//               fontWeight: 700,
//               color: isDark ? '#FFFFFF' : '#0F172A',
//               mb: 3,
//               lineHeight: 1.2,
//               maxWidth: 800,
//             }}
//           >
//             Agents Work Together as an Ecosystem
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: { xs: '1rem', md: '1.125rem' },
//               color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
//               maxWidth: '800px',
//               lineHeight: 1.7,
//               mb: 5,
//             }}
//           >
//             Because they share the same foundation, agents work together as an ecosystem. Our vision is to connect them with external apps and agents — extending insights across dashboards, planning tools, or even other AI copilots.
//           </Typography>

//           {/* Integration Tags */}
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 2,
//             }}
//           >
//             {['Dashboards', 'Planning Tools', 'AI Copilots'].map((tool) => (
//               <Box
//                 key={tool}
//                 sx={{
//                   px: 3,
//                   py: 1.5,
//                   borderRadius: 2,
//                   background: isDark
//                     ? `${BLUE_DARK}15`
//                     : `${BLUE_LIGHT}19`,
//                   border: isDark
//                     ? `1px solid ${BLUE_DARK}33`
//                     : `1px solid ${BLUE_LIGHT}24`,
//                   transition: 'all 0.3s ease',
//                   cursor: 'default',
//                   '&:hover': {
//                     background: isDark
//                       ? `${BLUE_DARK}22`
//                       : `${BLUE_LIGHT}22`,
//                     borderColor: blueMain,
//                   },
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: '0.875rem',
//                     fontWeight: 600,
//                     color: blueText,
//                   }}
//                 >
//                   {tool}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };