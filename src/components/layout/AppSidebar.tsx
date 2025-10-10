import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useThemeMode } from '../../contexts/ThemeContext';
import { SidebarItem } from '../../data/layout/sidebarData';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.svg';
import chatAPCLogoDark from '../../assets/chatAPC-logo.svg';

interface AppSidebarProps {
  items: SidebarItem[];
  width?: number;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ items, width = 185 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SidebarItem[]>(items);
  const [navigationStack, setNavigationStack] = useState<{ label: string; items: SidebarItem[] }[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  
  // Detect if we're on medium screen
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMediumScreen(width >= 960 && width <= 1549);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Load initial sidebar state from localStorage - no auto-collapse
  useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    if (stored !== null) {
      setIsCollapsed(stored === 'true');
    }
  }, []);
  const [sectionColors, setSectionColors] = useState({
    primary: '#009BE4',
    text: 'rgba(255, 255, 255, 0.85)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.05)',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDark: isSystemDark, preference, setPreference } = useThemeMode();
  
  const collapsedWidth = 0;
  const expandedWidth = width;

  // Detect scroll position for mobile header - Optimized
  useEffect(() => {
    let ticking = false;
    const handleHeaderScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleHeaderScroll(); // Initial check
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleHeaderScroll);
  }, []);

  // Detect section colors dynamically based on scroll position - Optimized with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Get all sections with data-section-theme attribute
          const sections = document.querySelectorAll('[data-section-theme]');
          const sidebarRect = { top: 0, bottom: window.innerHeight, height: window.innerHeight };
          
          let maxOverlap = 0;
          let dominantSection: Element | null = null;

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            
            // Calculate overlap between sidebar area and section
            const overlapTop = Math.max(sidebarRect.top, rect.top);
            const overlapBottom = Math.min(sidebarRect.bottom, rect.bottom);
            const overlapHeight = Math.max(0, overlapBottom - overlapTop);
            
            if (overlapHeight > maxOverlap) {
              maxOverlap = overlapHeight;
              dominantSection = section;
            }
          });

          if (dominantSection) {
            const theme = dominantSection.getAttribute('data-section-theme');
            const primaryColor = dominantSection.getAttribute('data-section-primary') || '#009BE4';
            const textColor = dominantSection.getAttribute('data-section-text');
            
            // Set light/dark mode
            setIsLightMode(theme === 'light');
            
            // Set dynamic colors based on section
            if (theme === 'light') {
              setSectionColors({
                primary: primaryColor,
                text: textColor || 'rgba(0, 0, 0, 0.8)',
                textSecondary: 'rgba(0, 0, 0, 0.6)',
                border: 'rgba(0, 0, 0, 0.1)',
                hover: 'rgba(0, 0, 0, 0.05)',
              });
            } else {
              setSectionColors({
                primary: primaryColor,
                text: textColor || 'rgba(255, 255, 255, 0.85)',
                textSecondary: 'rgba(255, 255, 255, 0.6)',
                border: 'rgba(255, 255, 255, 0.1)',
                hover: 'rgba(255, 255, 255, 0.05)',
              });
            }
          } else {
            // No section detected - fallback to global theme preference
            setIsLightMode(!isSystemDark);
            
            if (!isSystemDark) {
              // Light mode
              setSectionColors({
                primary: '#2563EB',
                text: 'rgba(0, 0, 0, 0.8)',
                textSecondary: 'rgba(0, 0, 0, 0.6)',
                border: 'rgba(0, 0, 0, 0.1)',
                hover: 'rgba(0, 0, 0, 0.05)',
              });
            } else {
              // Dark mode
              setSectionColors({
                primary: '#009BE4',
                text: 'rgba(255, 255, 255, 0.85)',
                textSecondary: 'rgba(255, 255, 255, 0.6)',
                border: 'rgba(255, 255, 255, 0.1)',
                hover: 'rgba(255, 255, 255, 0.05)',
              });
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSystemDark]); // Re-run when theme changes

  // Function to check if item is active
  const isItemActive = (item: SidebarItem): boolean => {
    return item.path === location.pathname;
  };

  // Function to find parent and set correct view based on current path
  React.useEffect(() => {
    const currentPath = location.pathname;
    
    // Find if current path belongs to a submenu
    for (const item of items) {
      if (item.children) {
        const childMatch = item.children.find(child => child.path === currentPath);
        if (childMatch) {
          // We're in a submenu, set the view accordingly
          setNavigationStack([{ label: item.label, items: items }]);
          setCurrentView(item.children);
          return;
        }
      }
    }
    
    // We're at root level
    setNavigationStack([]);
    setCurrentView(items);
  }, [location.pathname, items]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      // Navigate to first child's path if it exists
      const firstChild = item.children.find(child => child.path);
      if (firstChild && firstChild.path) {
        navigate(firstChild.path);
        if (isMobile) handleDrawerToggle();
      }
      
      // Replace view with children - slide left (forward)
      setSlideDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setNavigationStack([...navigationStack, { label: item.label, items: currentView }]);
        setCurrentView(item.children);
        setIsAnimating(false);
      }, 150);
    } else if (item.path) {
      // Navigate to page
      navigate(item.path);
      if (isMobile) handleDrawerToggle();
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      // Go back - slide right (backward)
      setSlideDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        const previous = navigationStack[navigationStack.length - 1];
        setCurrentView(previous.items);
        setNavigationStack(navigationStack.slice(0, -1));
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    // Store in localStorage to sync with HomePage
    localStorage.setItem('sidebarCollapsed', String(newState));
    // Dispatch custom event to notify HomePage
    window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed: newState } }));
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
        {/* Mobile Drawer Header - Logo, Theme Toggle & Close Button */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: 'none',
              backgroundColor: isSystemDark 
                ? 'rgba(10, 14, 46, 0.98)'
                : 'rgba(248, 250, 252, 0.98)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              <Box
                component="img"
                src={isSystemDark ? chatAPCLogo : chatAPCLogoDark}
                alt="ChatAPC Logo"
                sx={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: isSystemDark ? 'brightness(1.1)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            </Box>

            {/* Right Side: Theme Toggle & Close Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Theme Toggle Button */}
              <Tooltip title={
                preference === 'light' ? 'Switch to Dark Mode' :
                preference === 'dark' ? 'Switch to System' :
                'Switch to Light Mode'
              }>
                <IconButton
                  onClick={() => {
                    // Cycle: light → dark → system
                    if (preference === 'light') {
                      setPreference('dark');
                    } else if (preference === 'dark') {
                      setPreference('system');
                    } else {
                      setPreference('light');
                    }
                  }}
                  sx={{
                    color: isSystemDark 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : 'rgba(0, 0, 0, 0.7)',
                    padding: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isSystemDark 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.08)',
                      color: isSystemDark 
                        ? 'rgba(255, 255, 255, 1)' 
                        : 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  {preference === 'system' ? (
                    <SettingsBrightnessIcon sx={{ fontSize: 20, color: '#9333EA' }} />
                  ) : isSystemDark ? (
                    <LightModeIcon sx={{ fontSize: 20, color: '#FDB813' }} />
                  ) : (
                    <DarkModeIcon sx={{ fontSize: 20, color: '#475569' }} />
                  )}
                </IconButton>
              </Tooltip>

              {/* Close Button */}
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: isSystemDark 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(0, 0, 0, 0.7)',
                  padding: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isSystemDark 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.08)',
                    color: isSystemDark 
                      ? 'rgba(255, 255, 255, 1)' 
                      : 'rgba(0, 0, 0, 0.9)',
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>
          </Box>
        )}

      {/* Menu Items - Centered in full height */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: { xs: '0 8px', md: '0 12px' },
          paddingBottom: { xs: '140px', md: 0 }, // Space for mobile auth buttons
          paddingTop: { xs: '20px', md: '100px' }, // Add space for fixed logo/icon
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            animation: isAnimating 
              ? slideDirection === 'left'
                ? 'slideOutLeft 0.3s ease-out forwards'
                : 'slideOutRight 0.3s ease-out forwards'
              : 'slideInFromRight 0.3s ease-out',
            '@keyframes slideOutLeft': {
              '0%': {
                transform: 'translateX(0)',
                opacity: 1,
              },
              '100%': {
                transform: 'translateX(-30px)',
                opacity: 0,
              },
            },
            '@keyframes slideOutRight': {
              '0%': {
                transform: 'translateX(0)',
                opacity: 1,
              },
              '100%': {
                transform: 'translateX(30px)',
                opacity: 0,
              },
            },
            '@keyframes slideInFromRight': {
              '0%': {
                transform: slideDirection === 'left' ? 'translateX(30px)' : 'translateX(-30px)',
                opacity: 0,
              },
              '100%': {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          {/* Back Button - Show when in sub-menu */}
          {navigationStack.length > 0 && (
            <Box
              sx={{
                mb: 3,
                pb: 2,
                borderBottom: isMobile 
                  ? 'none'
                  : (isLightMode 
                    ? '1px solid rgba(0, 0, 0, 0.1)' 
                    : '1px solid rgba(255, 255, 255, 0.1)'),
                transition: 'border-color 0.3s ease',
              }}
            >
              <ListItemButton
                onClick={handleBack}
                sx={{
                  borderRadius: '4px',
                  padding: '12px 8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isMobile 
                      ? (isSystemDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
                      : (isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'),
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: '1rem',
                      color: isMobile 
                        ? (isSystemDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)')
                        : (isLightMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)'),
                      transition: 'color 0.3s ease',
                    }}
                  >
                    ←
                  </Box>
                  <ListItemText
                    primary={navigationStack[navigationStack.length - 1].label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: '0.625rem', md: '0.8125rem' },
                        fontWeight: 500,
                        color: isMobile 
                          ? (isSystemDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')
                          : (isLightMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'),
                        textAlign: 'left',
                        transition: 'color 0.3s ease',
                      },
                    }}
                  />
                </Box>
              </ListItemButton>
            </Box>
          )}

          {/* Current View Items */}
          <List sx={{ width: '100%', padding: 0 }}>
            {currentView.map((item, index) => (
              <ListItem 
                key={item.label} 
                disablePadding 
                sx={{ 
                  marginBottom: '4px',
                  animation: `fadeInUp 0.3s ease-out ${index * 0.05}s backwards`,
                  '@keyframes fadeInUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(10px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <ListItemButton
                  selected={isItemActive(item)}
                  onClick={() => handleItemClick(item)}
                  sx={{
                    borderRadius: '4px',
                    padding: '12px 8px',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    minHeight: 40,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: isItemActive(item) ? '70%' : '0%',
                      backgroundColor: sectionColors.primary,
                      transition: 'all 0.3s ease',
                      borderRadius: '0 4px 4px 0',
                    },
                  '&:hover': {
                    backgroundColor: isMobile 
                      ? (isSystemDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)')
                      : sectionColors.hover,
                    '&::before': {
                      height: '50%',
                    },
                  },
                  '&.Mui-selected': {
                    backgroundColor: isMobile 
                      ? (isSystemDark ? 'rgba(0, 155, 228, 0.1)' : 'rgba(37, 99, 235, 0.1)')
                      : `${sectionColors.primary}1A`,
                    '&:hover': {
                      backgroundColor: isMobile 
                        ? (isSystemDark ? 'rgba(0, 155, 228, 0.15)' : 'rgba(37, 99, 235, 0.15)')
                        : `${sectionColors.primary}26`,
                    },
                  },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: '0.75rem', md: '0.8125rem' },
                        fontWeight: isItemActive(item) ? 600 : 500,
                        color: isItemActive(item) 
                          ? (isMobile ? (isSystemDark ? '#009BE4' : '#2563EB') : sectionColors.primary)
                          : (isMobile ? (isSystemDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.8)') : sectionColors.text),
                        transition: 'color 0.3s ease',
                        textAlign: { xs: 'center', md: 'left' },
                      },
                    }}
                  />
                  {item.children && (
                    <ChevronRight 
                      sx={{ 
                        fontSize: 16, 
                        color: isMobile 
                          ? (isSystemDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)')
                          : sectionColors.textSecondary,
                        ml: 'auto',
                        transition: 'color 0.3s ease',
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Auth Buttons - Mobile Only */}
      {isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 3,
            borderTop: 'none',
            backgroundColor: isSystemDark 
              ? 'rgba(10, 14, 46, 0.98)'
              : 'rgba(248, 250, 252, 0.98)',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              onClick={() => {
                navigate('/login');
                handleDrawerToggle();
              }}
              variant="text"
              sx={{
                padding: '12px 24px',
                color: isSystemDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 4,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: isSystemDark ? '#FFFFFF' : 'rgba(0, 0, 0, 0.95)',
                  backgroundColor: isSystemDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                navigate('/signup');
                handleDrawerToggle();
              }}
              variant="contained"
              sx={{
                padding: '12px 24px',
                background: isSystemDark 
                  ? 'linear-gradient(135deg, #009BE4 0%, #0084C7 100%)'
                  : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: 4,
                textTransform: 'none',
                boxShadow: isSystemDark 
                  ? '0 4px 12px rgba(0, 155, 228, 0.2)'
                  : '0 4px 12px rgba(37, 99, 235, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: isSystemDark 
                    ? 'linear-gradient(135deg, #0084C7 0%, #006FA9 100%)'
                    : 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                  boxShadow: isSystemDark 
                    ? '0 6px 16px rgba(0, 155, 228, 0.3)'
                    : '0 6px 16px rgba(37, 99, 235, 0.3)',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Logo and Toggle Button - Always Visible on Desktop */}
      {!isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: '30px',
            left: '16px',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <Box
              component="img"
              src={isLightMode ? chatAPCLogoDark : chatAPCLogo}
              alt="ChatAPC Logo"
              sx={{
                height: '36px',
                width: 'auto',
                objectFit: 'contain',
                filter: isLightMode ? 'none' : 'brightness(1.1)',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>

          {/* Collapse/Expand Toggle Button */}
          <IconButton
            onClick={handleToggleCollapse}
            sx={{
              color: isLightMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
              padding: '6px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: isLightMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <ViewSidebarIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      )}

      {/* Mobile Header Bar - Logo & Menu Button - Only when sidebar is closed */}
      {isMobile && !mobileOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1350,
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            boxSizing: 'border-box',
            maxWidth: '100vw',
            backgroundColor: isScrolled
              ? (isSystemDark
                  ? 'rgba(10, 14, 46, 0.95)' 
                  : 'rgba(255, 255, 255, 0.95)')
              : (isSystemDark
                  ? 'rgba(10, 14, 46, 0)'
                  : 'rgba(255, 255, 255, 0)'),
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled
              ? (isSystemDark
                  ? '1px solid rgba(255, 255, 255, 0.08)' 
                  : '1px solid rgba(0, 0, 0, 0.08)')
              : 'none',
            boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo - Clickable to open sidebar */}
          <Box
            onClick={handleDrawerToggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <Box
              component="img"
              src={isSystemDark ? chatAPCLogo : chatAPCLogoDark}
              alt="ChatAPC Logo"
              sx={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
                filter: isSystemDark ? 'brightness(1.1)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>

          {/* Menu Toggle Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: isSystemDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              padding: '8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isSystemDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.05)',
                color: isSystemDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      )}

      {/* Desktop Drawer - Permanent */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: isCollapsed ? collapsedWidth : expandedWidth,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: isCollapsed ? collapsedWidth : expandedWidth,
              boxSizing: 'border-box',
              // Always transparent - let section background show through
              backgroundColor: 'transparent',
              borderRight: 'none',
              transition: 'width 0.3s ease',
              overflow: 'hidden',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Mobile Drawer - Temporary */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
            BackdropProps: {
              sx: {
                backgroundColor: isSystemDark 
                  ? 'rgba(0, 0, 0, 0.7)'
                  : 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
              },
            },
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            zIndex: 1400,
            '& .MuiDrawer-paper': {
              width: 260,
              boxSizing: 'border-box',
              backgroundColor: isSystemDark 
                ? 'rgba(10, 14, 46, 0.98)'
                : 'rgba(248, 250, 252, 0.98)',
              backdropFilter: 'blur(20px)',
              border: 'none',
              boxShadow: isSystemDark 
                ? '-4px 0 24px rgba(0, 0, 0, 0.3)'
                : '-4px 0 24px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.3s ease',
              zIndex: 1400,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default AppSidebar;

