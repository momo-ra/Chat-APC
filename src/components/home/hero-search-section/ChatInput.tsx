import React from 'react';
import { Box, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SendFileIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  inputValue: string;
  isDark: boolean;
  isLoading: boolean;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  isDark,
  isLoading,
  isTyping,
  onInputChange,
  onSendMessage,
  onKeyPress,
}) => {
  const canSend = inputValue.trim() && !isLoading && !isTyping;

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 1.5, md: 2 },
        paddingTop: 2,
        borderRadius: '0 0 20px 20px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          border: isDark
            ? '1px solid rgba(71, 85, 105, 0.3)'
            : '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            borderColor: isDark
              ? 'rgba(0, 155, 228, 0.4)'
              : 'rgba(59, 130, 246, 0.4)',
            boxShadow: 'none',
          },
          '&:focus-within': {
            borderColor: isDark
              ? 'rgba(0, 155, 228, 0.6)'
              : 'rgba(59, 130, 246, 0.6)',
            boxShadow: isDark
              ? '0 0 0 2px rgba(0, 155, 228, 0.1)'
              : '0 0 0 2px rgba(59, 130, 246, 0.1)',
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Chat with your plant..."
          variant="standard"
          disabled={isLoading || isTyping}
          InputProps={{ disableUnderline: true }}
          sx={{
            '& .MuiInputBase-root': {
              color: isDark
                ? 'rgba(255, 255, 255, 0.92)'
                : 'rgba(15, 23, 42, 0.92)',
              fontSize: { xs: '1rem', sm: '1.05rem' },
              fontWeight: 400,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: 1.6,
              padding: '18px 64px 18px 20px',
              '&.Mui-disabled': {
                color: isDark
                  ? 'rgba(255, 255, 255, 0.75) !important'
                  : 'rgba(15, 23, 42, 0.6)',
                WebkitTextFillColor: isDark
                  ? 'rgba(255, 255, 255, 0.75) !important'
                  : 'rgba(15, 23, 42, 0.6)',
              },
            },
            '& .MuiInputBase-input': {
              padding: '0 !important',
              '&::placeholder': {
                color: isDark
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(15, 23, 42, 0.5)',
                opacity: 1,
                fontWeight: 400,
              },
              '&:disabled::placeholder': {
                color: isDark
                  ? 'rgba(255, 255, 255, 0.4) !important'
                  : 'rgba(15, 23, 42, 0.4)',
                WebkitTextFillColor: isDark
                  ? 'rgba(255, 255, 255, 0.4) !important'
                  : 'rgba(15, 23, 42, 0.4)',
              },
            },
            '& textarea': {
              resize: 'none',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': {
                width: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDark
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.2)',
                borderRadius: '2px',
              },
              '&:disabled': {
                color: isDark
                  ? 'rgba(255, 255, 255, 0.75) !important'
                  : 'rgba(15, 23, 42, 0.6)',
                WebkitTextFillColor: isDark
                  ? 'rgba(255, 255, 255, 0.75) !important'
                  : 'rgba(15, 23, 42, 0.6)',
              },
            },
          }}
        />
        <Box
          onClick={onSendMessage}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 40,
            height: 40,
            borderRadius: '10px',
            background: canSend
              ? isDark
                ? 'linear-gradient(135deg, #009BE4 0%, #3B82F6 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
              : isDark
              ? 'rgba(71, 85, 105, 0.3)'
              : 'rgba(203, 213, 225, 0.5)',
            cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            '&:hover':
              canSend
                ? {
                    background: isDark
                      ? 'linear-gradient(135deg, #93C5FD 0%, #009BE4 100%)'
                      : 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                    transform: 'translateY(-50%) translateY(-2px)',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(0, 155, 228, 0.4)'
                      : '0 4px 12px rgba(59, 130, 246, 0.3)',
                  }
                : {},
          }}
        >
          <SendFileIcon
            sx={{
              fontSize: '1.2rem',
              color: canSend
                ? '#FFFFFF'
                : isDark
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(15, 23, 42, 0.3)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};