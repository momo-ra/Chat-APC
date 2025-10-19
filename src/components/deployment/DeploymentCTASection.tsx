import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { CalendarToday } from '@mui/icons-material';
import { 
  themeConfig, 
  getColor, 
  getTextColor,
  getBorderColor,
  getButtonStyles,
} from '../shared/themeConfig';

const DeploymentCTASection: React.FC = () => {
  const { isDark } = useThemeMode();
  const navigate = useNavigate();
  const {
    containerMaxWidth,
    containerPadding,
    bodyLargeFontSize,
    sectionPadding,
  } = useResponsiveLayout();

  // Get unified theme values
  const { colors, gradients, typography, transitions, borderRadius, shadows } = themeConfig;
  const primaryColor = getColor(colors.blue, isDark);
  const accentColor = getColor(colors.cyan, isDark);
  
  // Get button styles
  const primaryButtonStyles = getButtonStyles('primary', isDark, 'default');
  const primaryButtonHoverStyles = getButtonStyles('primary', isDark, 'hover');

  return (
    <Box
      sx={{
        width: '100%',
        py: sectionPadding,
        background: 'transparent',
        position: 'relative',
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          maxWidth: containerMaxWidth,
          px: containerPadding,
        }}
      >
        <Box
          sx={{
            pt: { xs: 8, md: 10 },
            borderTop: `1px solid ${getBorderColor(isDark)}`,
          }}
        >
          <Typography
            sx={{
              fontSize: bodyLargeFontSize,
              fontWeight: typography.bodyLarge.weight,
              color: getTextColor('secondary', isDark),
              lineHeight: typography.bodyLarge.lineHeight,
              mb: 5,
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            ChatAPC deployment is lightweight, secure, and adaptable — engineered to integrate seamlessly into your existing infrastructure while providing the advanced analytics capabilities your operations need to thrive in an increasingly competitive market.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CalendarToday />}
              onClick={() => navigate('/company/contact')}  
              sx={{
                background: primaryButtonStyles.background,
                color: primaryButtonStyles.text,
                px: 5,
                py: 2,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: borderRadius.full,
                textTransform: 'none',
                boxShadow: primaryButtonStyles.shadow,
                transition: transitions.allNormal,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: primaryButtonHoverStyles.shadow,
                  background: primaryButtonHoverStyles.background,
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Schedule a Deployment Consultation
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DeploymentCTASection;