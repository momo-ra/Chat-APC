import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { SidebarItem } from '../../data/layout/sidebarData';
import chatAPCLogo from '../../assets/chatAPC-logo-light-mode.png';

interface AppSidebarProps {
  items: SidebarItem[];
  width?: number;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ items, width = 200 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState<SidebarItem[]>(items);
  const [navigationStack, setNavigationStack] = useState<{ label: string; items: SidebarItem[] }[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const drawer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Logo Section - Desktop Only */}
      <Box
        sx={{
          position: 'absolute',
          top: '30px',
          left: 0,
          right: 0,
          display: { xs: 'none', md: 'flex' }, // Only show on desktop
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
      >
        <Box
          component="img"
          src={chatAPCLogo}
          alt="ChatAPC Logo"
          sx={{
            height: '36px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'brightness(1.1)',
          }}
        />
      </Box>

      {/* Menu Items - Centered in full height */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: { xs: '0 8px', md: '0 12px' },
          paddingBottom: { xs: '140px', md: 0 }, // Space for mobile auth buttons
          paddingTop: { xs: '20px', md: 0 }, // Add top padding for mobile
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
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <ListItemButton
                onClick={handleBack}
                sx={{
                  borderRadius: '6px',
                  padding: '12px 8px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
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
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    ←
                  </Box>
                  <ListItemText
                    primary={navigationStack[navigationStack.length - 1].label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: '0.625rem', md: '0.8125rem' },
                        fontWeight: 400,
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'left',
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
                    borderRadius: '6px',
                    padding: '12px 8px',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: isItemActive(item) ? '70%' : '0%',
                      backgroundColor: '#009BE4',
                      transition: 'height 0.2s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      '&::before': {
                        height: '50%',
                      },
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 155, 228, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 155, 228, 0.12)',
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: '0.625rem', md: '0.8125rem' },
                        fontWeight: isItemActive(item) ? 600 : 500,
                        color: isItemActive(item) ? '#009BE4' : 'rgba(255, 255, 255, 0.7)',
                        transition: 'color 0.2s ease',
                        textAlign: { xs: 'center', md: 'left' },
                      },
                    }}
                  />
                  {item.children && (
                    <ChevronRight 
                      sx={{ 
                        fontSize: 16, 
                        color: 'rgba(255, 255, 255, 0.5)',
                        ml: 'auto',
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
                padding: '10px 24px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: 400,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.95)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
              variant="outlined"
              sx={{
                padding: '10px 24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: 400,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
      {/* Logo - Always Visible on Mobile */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 20,
            left: 16,
            zIndex: 1300,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
        >
          <Box
            component="img"
            src={chatAPCLogo}
            alt="ChatAPC Logo"
            sx={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'brightness(1.1)',
            }}
          />
        </Box>
      )}

      {/* Menu Toggle Button - Mobile Only */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1300,
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      {/* Desktop Drawer - Permanent */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: width,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: width,
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
              border: 'none',
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
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 260,
              boxSizing: 'border-box',
              backgroundColor: 'rgba(10, 14, 46, 0.98)',
              backdropFilter: 'blur(20px)',
              border: 'none',
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

