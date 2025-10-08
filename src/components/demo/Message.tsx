import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar
} from '@mui/material';
import {
  Person as UserIcon,
  SmartToy as BotIcon
} from '@mui/icons-material';

interface MessageProps {
  index: number;
  sender: string;
  textData: string;
}

const Message: React.FC<MessageProps> = ({ index, sender, textData }) => {
  // Function to format text with line breaks
  const formatText = (text: string) => {
    // Check if text is a string
    if (typeof text !== 'string') {
      return JSON.stringify(text);
    }
    
    // Replace newlines with <br /> tags
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const isUser = sender === 'user';
  
  return (
    <Box
      id={`msg-${index}`}
      data-testid={`message-${sender}`}
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1,
        mb: 2,
        px: 1
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 32,
          height: 32,
          backgroundColor: isUser ? 'primary.main' : 'secondary.main',
          fontSize: '1rem'
        }}
      >
        {isUser ? <UserIcon fontSize="small" /> : <BotIcon fontSize="small" />}
      </Avatar>

      {/* Message Bubble */}
      <Paper
        elevation={1}
        sx={{
          maxWidth: '70%',
          px: 2,
          py: 1.5,
          borderRadius: 4,
          backgroundColor: isUser ? 'primary.main' : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          borderTopLeftRadius: isUser ? 2 : 0.5,
          borderTopRightRadius: isUser ? 0.5 : 2,
          border: 1,
          borderColor: isUser ? 'primary.main' : 'divider',
          '&:hover': {
            elevation: 2
          }
        }}
      >
        <Typography
          variant="body2"
          component="div"
          sx={{
            lineHeight: 1.4,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap'
          }}
        >
        {formatText(textData)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;

