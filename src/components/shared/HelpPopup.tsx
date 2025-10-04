import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './HelpPopup.css';

export interface HelpPopupButtonProps {
  label: string;
  onClick: () => void;
}

interface HelpPopupProps {
  isOpen: boolean;
  title: string;
  message?: string;
  description?: string;
  buttons: HelpPopupButtonProps[];
  onClose: () => void;
  position?: { top: number; left: number };
}

const HelpPopup: React.FC<HelpPopupProps> = ({ isOpen, title, message, description, buttons, onClose, position }) => {
  if (!isOpen) return null;
  
  return (
    <Box
      className="help-popup"
      sx={{
        position: 'fixed',
        top: position?.top || 100,
        left: position?.left || 20,
        zIndex: 10000,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 3,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: 3,
        maxWidth: 400,
        width: '90%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Typography sx={{ mb: 3, color: '#666', lineHeight: 1.6 }}>
        {message || description}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {buttons.map((button, index) => (
          <Box
            key={index}
            component="button"
            onClick={button.onClick}
            sx={{
              flex: 1,
              padding: '12px 24px',
              borderRadius: 2,
              border: index === 0 ? '2px solid #009BE4' : '1px solid #ddd',
              background: index === 0 ? '#009BE4' : 'white',
              color: index === 0 ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            {button.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HelpPopup;
export type { HelpPopupButtonProps as HelpPopupButton };

