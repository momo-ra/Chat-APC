import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useTheme,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useThemeMode } from '../../contexts/ThemeContext';

interface UserTourFullscreenDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UserTourFullscreenDialog: React.FC<UserTourFullscreenDialogProps> = ({
  open,
  onClose,
}) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: isDark
            ? theme.palette.background.default
            : theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        },
      }}
    >
      {/* Close Button */}
      <DialogActions
        sx={{
          justifyContent: 'flex-end',
          px: { xs: 2, md: 3 },
          pt: { xs: 1.5, md: 2 },
          pb: 0,
          background: isDark
            ? 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, transparent 100%)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close full screen tour"
          size="large"
          sx={{
            color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(241, 245, 249, 0.8)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(226, 232, 240, 1)',
              transform: 'rotate(90deg)',
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogActions>

      {/* Fullscreen Embed Content */}
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexGrow: 1,
          bgcolor: isDark
            ? theme.palette.background.default
            : theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Box
          className="sl-embed"
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            '& iframe': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100% !important',
              height: '100% !important',
              border: 'none',
            },
          }}
        >
          <iframe
            loading="lazy"
            className="sl-demo"
            src="https://chatapc.storylane.io/demo/meeuyf6dbalg?embed=inline"
            title="ChatAPC Storylane Tour Fullscreen"
            name="sl-embed-fullscreen"
            allow="fullscreen"
            allowFullScreen
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};