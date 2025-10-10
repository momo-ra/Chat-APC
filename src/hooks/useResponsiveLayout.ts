import { useMediaQuery, useTheme } from '@mui/material';

interface ResponsiveLayoutValues {
  // Container max widths - responsive objects
  containerMaxWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  heroMaxWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Spacing values
  sectionPadding: string;
  containerPadding: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  
  // Font sizes using clamp()
  h1FontSize: string;
  h2FontSize: string;
  h4FontSize: string;
  bodyFontSize: string;
  bodyLargeFontSize: string;
  
  // Layout state
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasSidebar: boolean;
}

/**
 * Custom hook for responsive layout values that adapts to sidebar presence
 * Uses clamp() for fluid typography and spacing, reducing media query complexity
 * 
 * Accounts for sidebar width (185px) in calculations:
 * - Mobile (<960px): No sidebar, full width
 * - Medium (960px-1549px): Sidebar present, constrained width
 * - Large (1550px+): Sidebar present, max width
 */
export const useResponsiveLayout = (): ResponsiveLayoutValues => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 960px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >= 960px
  const hasSidebar = useMediaQuery(theme.breakpoints.up('md'));
  
  // Medium screens: 960px-1549px (sidebar takes 185px)
  const isMediumScreen = useMediaQuery('(min-width: 960px) and (max-width: 1549px)');
  // Large screens: 1550px+ (sidebar takes 185px)
  const isLargeScreen = useMediaQuery('(min-width: 1550px)');

  // Sidebar width when expanded
  const SIDEBAR_WIDTH = 185;
  
  // Calculate available width for content - returns responsive object
  // Medium: viewport - sidebar - padding ≈ 950px max
  // Large: viewport - sidebar - padding ≈ 1200px max
  const containerMaxWidth = {
    xs: '1200px',
    sm: '1200px', 
    md: '950px',  // Medium screens with sidebar (960-1549px)
    lg: '950px',
    xl: '1200px', // Large screens with sidebar (1550px+)
  };

  const heroMaxWidth = {
    xs: '1000px',
    sm: '1000px',
    md: '850px',  // Medium screens with sidebar
    lg: '850px',
    xl: '900px',  // Large screens with sidebar
  };

  const containerPadding = {
    xs: 2,     // 16px mobile
    sm: 2,
    md: 2.5,   // 20px medium with sidebar
    lg: 2.5,
    xl: 3,     // 24px large with sidebar
  };

  return {
    // Container widths adapt to sidebar and screen size - responsive objects
    containerMaxWidth,
    heroMaxWidth,
    
    // Fluid spacing with clamp(min, preferred, max)
    // Scale down slightly on medium screens to account for sidebar
    sectionPadding: isMediumScreen 
      ? 'clamp(2.5rem, 7vw, 3.5rem)'  // Slightly reduced for medium screens
      : 'clamp(3rem, 8vw, 5rem)',      // Full range for mobile and large
    
    containerPadding,
    
    // Fluid typography - adjusted for sidebar context
    // Medium screens get slightly smaller max values
    h1FontSize: isMediumScreen
      ? 'clamp(2.5rem, 4.5vw, 3.25rem)'  // Max 3.25rem on medium
      : 'clamp(2.5rem, 5vw, 4.5rem)',    // Max 4.5rem otherwise
    
    h2FontSize: isMediumScreen
      ? 'clamp(2rem, 3.5vw, 2.75rem)'    // Max 2.75rem on medium
      : 'clamp(2rem, 4vw, 3.5rem)',      // Max 3.5rem otherwise
    
    h4FontSize: isMediumScreen
      ? 'clamp(1.5rem, 2.2vw, 1.6rem)'   // Max 1.6rem on medium
      : 'clamp(1.5rem, 2.5vw, 2rem)',    // Max 2rem otherwise
    
    bodyFontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    
    bodyLargeFontSize: isMediumScreen
      ? 'clamp(1.125rem, 1.8vw, 1.35rem)'  // Max 1.35rem on medium
      : 'clamp(1.125rem, 2vw, 1.5rem)',    // Max 1.5rem otherwise
    
    // Layout state
    isMobile,
    isTablet,
    isDesktop,
    hasSidebar,
  };
};

