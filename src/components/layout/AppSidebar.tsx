import React, { useState, useEffect, useRef } from 'react';
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

interface NavigationStackEntry {
  label: string;
  items: SidebarItem[];
  prevPath: string;
  prevLabel?: string;
}

interface AppSidebarProps {
  items: SidebarItem[];
  width?: number;
}

const HOME_LABEL = "Home";
const HOME_PATH = "/";

const AppSidebar: React.FC<AppSidebarProps> = ({ items, width = 185 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SidebarItem[]>(items);

  // Now our navigationStack will be
  // { label: string; items: SidebarItem[]; prevPath: string; prevLabel?: string }[]
  const [navigationStack, setNavigationStack] = useState<NavigationStackEntry[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Store last visited main path for correct back navigation
  const [lastMainVisited, setLastMainVisited] = useState<{ label: string; path: string }>({ label: HOME_LABEL, path: HOME_PATH });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          const sections = document.querySelectorAll('[data-section-theme]');
          const sidebarRect = { top: 0, bottom: window.innerHeight, height: window.innerHeight };

          let maxOverlap = 0;
          let dominantSection: Element | null = null;

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
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
            setIsLightMode(theme === 'light');

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
            setIsLightMode(!isSystemDark);
            if (!isSystemDark) {
              setSectionColors({
                primary: '#2563EB',
                text: 'rgba(0, 0, 0, 0.8)',
                textSecondary: 'rgba(0, 0, 0, 0.6)',
                border: 'rgba(0, 0, 0, 0.1)',
                hover: 'rgba(0, 0, 0, 0.05)',
              });
            } else {
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

    handleScroll();
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

    // Always track the last main path before entering submenu (for breadcrumb back)
    // and always track "Home" for root ("/")
    // Check if on a main menu (root level)
    const foundRoot = items.find(i => i.path === currentPath && !i.children);
    if (currentPath === HOME_PATH || foundRoot) {
      setLastMainVisited({
        label: foundRoot?.label || HOME_LABEL,
        path: foundRoot?.path || HOME_PATH,
      });
    }

    // Find if current path belongs to a submenu
    let matched = false;
    for (const item of items) {
      if (item.children) {
        const childMatch = item.children.find(child => child.path === currentPath);
        if (childMatch) {
          // We're in a submenu, set the view accordingly
          // Set prevPath to lastMainVisited
          setNavigationStack([{
            label: item.label,
            items: items,
            prevPath: lastMainVisited.path,
            prevLabel: lastMainVisited.label,
          }]);
          setCurrentView(item.children);
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      setNavigationStack([]);
      setCurrentView(items);
    }
    // add lastMainVisited.label to deps as we want up-to-date label (to display in back btn)
  }, [location.pathname, items, lastMainVisited.label, lastMainVisited.path]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // update navigationStack to include prevPath for custom back
  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      const firstChild = item.children.find(child => child.path);
      if (firstChild && firstChild.path) {
        navigate(firstChild.path);
        if (isMobile) handleDrawerToggle();
      }
      setSlideDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setNavigationStack([
          ...navigationStack,
          {
            label: item.label,
            items: currentView,
            prevPath: location.pathname,
            prevLabel: items.find(i => i.path === location.pathname)?.label || HOME_LABEL,
          },
        ]);
        setCurrentView(item.children);
        setIsAnimating(false);
      }, 150);
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) handleDrawerToggle();
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const prev = navigationStack[navigationStack.length - 1];
      if (prev.prevPath && prev.prevPath !== location.pathname) {
        // Go directly to the previous main path (home or main menu)
        navigate(prev.prevPath);
        if (isMobile) handleDrawerToggle();
      } else {
        // classic "back"
        setSlideDirection('right');
        setIsAnimating(true);
        setTimeout(() => {
          const previous = navigationStack[navigationStack.length - 1];
          setCurrentView(previous.items);
          setNavigationStack(navigationStack.slice(0, -1));
          setIsAnimating(false);
        }, 150);
      }
    }
  };

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
    window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed: newState } }));
  };

  // ---- Helper: Desktop/Drawer Logo - make it a link to home
  function renderLogo(linked?: boolean) {
    const logoBox = (
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
    );
    if (linked) {
      // If already on home, do nothing
      return (
        <Box
          onClick={() => {
            if (location.pathname !== HOME_PATH) {
              navigate(HOME_PATH);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            cursor: location.pathname !== HOME_PATH ? 'pointer' : 'default',
            '&:hover': {
              transform: location.pathname !== HOME_PATH ? 'scale(1.05)' : 'none',
            },
            userSelect: 'none',
          }}
        >
          {logoBox}
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.03)' },
          }}
        >
          {logoBox}
        </Box>
      );
    }
  }

  // For Drawer - the logo is still clickable and links to HOME
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
          {/* Logo as link to home */}
          <Box
            onClick={() => {
              if (location.pathname !== HOME_PATH) {
                // Close drawer and go home
                navigate(HOME_PATH);
                handleDrawerToggle();
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: location.pathname !== HOME_PATH ? 'pointer' : 'default',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: location.pathname !== HOME_PATH ? 'scale(1.05)' : 'none',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Theme Toggle Button */}
            <Tooltip title={
              preference === 'light' ? 'Switch to Dark Mode' :
                preference === 'dark' ? 'Switch to System' :
                  'Switch to Light Mode'
            }>
              <IconButton
                onClick={() => {
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
                  cursor:
                    navigationStack.length > 0 &&
                      navigationStack[navigationStack.length - 1]?.prevPath &&
                      navigationStack[navigationStack.length - 1].prevPath !== location.pathname
                      ? 'pointer'
                      : 'pointer',
                  // We want always pointer for UI
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
                    // Instead of parent menu, now show the prevLabel or fallback
                    primary={
                      navigationStack.length > 0 &&
                        navigationStack[navigationStack.length - 1]?.prevLabel
                        ? navigationStack[navigationStack.length - 1]?.prevLabel
                        : HOME_LABEL
                    }
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
          {/* Logo - as link to home */}
          {renderLogo(true)}
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
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
            opacity: isHeaderVisible ? 1 : 0,
            backgroundColor: isScrolled
              ? (isSystemDark
                ? 'rgba(10, 22, 46, 0.75)'
                : 'rgba(255, 255, 255, 0.75)')
              : (isSystemDark
                ? 'rgba(10, 14, 46, 0)'
                : 'rgba(255, 255, 255, 0)'),
            backdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'none',
            borderBottom: isScrolled
              ? (isSystemDark
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid rgba(0, 0, 0, 0.12)')
              : 'none',
            boxShadow: isScrolled
              ? (isSystemDark
                ? '0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)'
                : '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)')
              : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Logo - as link to home */}
          <Box
            onClick={() => {
              if (location.pathname !== HOME_PATH) {
                navigate(HOME_PATH);
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: location.pathname !== HOME_PATH ? 'pointer' : 'default',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: location.pathname !== HOME_PATH ? 'scale(1.05)' : 'none',
              },
              '&:active': {
                transform: location.pathname !== HOME_PATH ? 'scale(0.98)' : 'none',
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
                filter: isSystemDark ? 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>

          {/* Menu Toggle Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: isSystemDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)',
              padding: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isSystemDark
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.06)',
                color: isSystemDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
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

