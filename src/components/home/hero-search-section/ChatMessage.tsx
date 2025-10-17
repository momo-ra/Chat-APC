import React from 'react';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { TypingText } from './TypingText';
import { SuggestionQuestions } from './SuggestionQuestions';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isDark: boolean;
  isLastMessage: boolean;
  isWelcomeMessage: boolean;
  showSuggestions: boolean;
  currentSuggestions: string[];
  isTyping: boolean;
  isLoading: boolean;
  onTypingComplete?: () => void;
  onSuggestionClick: (suggestion: string) => void;
  suggestionTitle: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isDark,
  isLastMessage,
  isWelcomeMessage,
  showSuggestions,
  currentSuggestions,
  isTyping,
  isLoading,
  onTypingComplete,
  onSuggestionClick,
  suggestionTitle,
}) => {
  if (message.role === 'user') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Box
          sx={{
            maxWidth: '90%',
            padding: '8px 10px',
            borderRadius: '16px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(71, 85, 105, 0.8) 0%, rgba(55, 65, 81, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(226, 232, 240, 0.9) 0%, rgba(203, 213, 225, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(71, 85, 105, 0.5)'
              : '1px solid rgba(203, 213, 225, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: isDark
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
              lineHeight: 1.6,
              color: isDark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
              flex: 1,
              fontWeight: 400,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {message.content}
          </Box>
          <Box
            sx={{
              width: 35,
              height: 35,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #64748B 0%, #475569 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <PersonIcon sx={{ fontSize: '1.3rem' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  // Assistant message
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          maxWidth: '95%',
          mb: 3,
        }}
      >
        <TypingText
          text={message.content}
          speed={18}
          isDark={isDark}
          onComplete={onTypingComplete}
        />
      </Box>

      {/* Show suggestions after welcome message */}
      {isWelcomeMessage && showSuggestions && (
        <SuggestionQuestions
          suggestions={currentSuggestions}
          onSuggestionClick={onSuggestionClick}
          isDark={isDark}
          title={suggestionTitle}
          disabled={isLoading || isTyping}
        />
      )}

      {/* Show suggestions for subsequent responses */}
      {!isWelcomeMessage &&
        showSuggestions &&
        isLastMessage &&
        !isTyping && (
          <SuggestionQuestions
            suggestions={currentSuggestions}
            onSuggestionClick={onSuggestionClick}
            isDark={isDark}
            title="What else can I help you with?"
            disabled={isLoading || isTyping}
          />
        )}
    </Box>
  );
};