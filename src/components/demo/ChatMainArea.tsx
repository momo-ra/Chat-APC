import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Avatar,
  Chip,
  Tooltip,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Alert,
  Slide,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  X as CloseIcon,
  MessageSquare as ChatIcon,
  Sparkles as SparklesIcon,
  Bot as BotIcon,
  ChevronRight as ArrowIcon,
  FileText as DocumentIcon,
  ArrowUpRight as OpenIcon,
} from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import ChatHistoryView from './ChatHistoryView';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BookmarkAdd, VerticalSplit } from '@mui/icons-material';

interface Suggestion {
  title: string;
  icon: string;
  message: string;
}

interface ArtifactNotification {
  name: string;
  artifactId: string;
}

interface InitialGreetingProps {
  onSuggestionClick: (suggestion: Suggestion) => void;
}

interface MessageBubbleProps {
  message: any;
  isLast: boolean;
  onSuggestionClick: (suggestion: Suggestion) => void;
}

const ChatMainArea: React.FC = () => {
  const {
    chats,
    activeChatId,
    addMessage,
    createChat,
    setActiveChatId,
    updateChat,
    createArtifact,
    setIsArtifactsPanelOpen,
    isChatSidebarOpen,
    setIsChatSidebarOpen,
    activeTab,
    setActiveTab,
    setActiveArtifactId
  } = useChat();

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHistoryView, setShowHistoryView] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [artifactNotification, setArtifactNotification] = useState<ArtifactNotification | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = activeChatId ? chats[activeChatId] : null;

  // Initial suggestions for new chats
  const suggestions: Suggestion[] = [
    {
      title: "Explain how the APC works",
      icon: "💡",
      message: "Explain how the APC works"
    },
    {
      title: "Plot the last week of data",
      icon: "📊",
      message: "Plot the last week of data"
    },
    {
      title: "Show me how to optimize process",
      icon: "⚡",
      message: "Show me how to optimize process"
    },
    {
      title: "Highlight the main pain points in last month production",
      icon: "🎯",
      message: "Highlight the main pain points in last month production"
    }
  ];

  // Show appropriate view based on active tab
  useEffect(() => {
    if (activeTab === 'chats' || activeTab === null) {
      setShowHistoryView(true);
      setActiveTab('chats');
    } else {
      setShowHistoryView(false);
    }
  }, [activeTab, setActiveTab]);

  // Hide history view when a chat is selected
  useEffect(() => {
    if (activeChatId) {
      setShowHistoryView(false);
      setActiveTab(null);
    }
  }, [activeChatId, setActiveTab]);

  // Filter messages based on search
  const filteredMessages = useMemo(() => {
    if (!activeChat || !searchQuery) return activeChat?.messages || [];
    
    return activeChat.messages.filter((message: any) => 
      message.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeChat, searchQuery]);

  // Auto-scroll to bottom when new messages arrive - Optimized
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' }); // Changed from 'smooth' for better performance
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  // Auto-hide artifact notification after 5 seconds
  useEffect(() => {
    if (artifactNotification) {
      const timer = setTimeout(() => {
        setArtifactNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [artifactNotification]);

  const handleSend = async (messageText: string = input) => {
    const textToSend = messageText.trim();
    if (!textToSend) return;

    let chatId = activeChatId;
    
    // Create new chat if none active
    if (!chatId) {
      const title = textToSend.slice(0, 30) + (textToSend.length > 30 ? '...' : '');
      chatId = createChat(title);
      setActiveChatId(chatId);
    }

    // Add user message
    addMessage(chatId, {
      role: 'user',
      content: textToSend,
      type: 'text'
    });

    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response
      setTimeout(() => {
        const lowerText = textToSend.toLowerCase();
        
        // Check if message contains keywords for chart generation
        const shouldGenerateChart = lowerText.includes('chart') || 
                                   lowerText.includes('graph') ||
                                   lowerText.includes('plot') ||
                                   lowerText.includes('data');
        
        // Check if message contains "options"
        const shouldShowOptions = lowerText.includes('options') || 
                                 lowerText.includes('help') ||
                                 lowerText.includes('what can you do');

        if (shouldGenerateChart) {
          // Add AI response with explanation
          addMessage(chatId, {
            role: 'assistant',
            content: 'I\'ve created a visualization based on your request. The data has been plotted and added to your outputs panel.',
            type: 'text'
          });

          // Create artifact
          const artifactName = lowerText.includes('weekly') ? 'Weekly Data Plot' : 
                              lowerText.includes('monthly') ? 'Monthly Data Plot' : 
                              'Data Visualization';
          
          const artifactId = createArtifact(chatId, {
            type: 'graph',
            name: artifactName,
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              values: [65, 72, 68, 81, 76, 89, 92]
            }
          });
          
          // Show notification instead of artifact message
          setArtifactNotification({
            name: artifactName,
            artifactId: artifactId
          });
          
        } else if (shouldShowOptions) {
          // Add response with options
          addMessage(chatId, {
            role: 'assistant',
            content: 'Here are some things I can help you with:',
            type: 'text'
          });
          
          // Add options message
          addMessage(chatId, {
            role: 'assistant',
            content: suggestions,
            type: 'options'
          });
          
        } else {
          // Regular text response
          addMessage(chatId, {
            role: 'assistant',
            content: `I understand you're asking about "${textToSend}". Let me help you with that.\n\nBased on your query, I can provide you with detailed information about the APC system and how it can help optimize your processes. Would you like me to explain the key components or focus on a specific aspect?`,
            type: 'text'
          });
        }
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage(chatId, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'error'
      });
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleSend(suggestion.message);
  };

  const handleTitleEdit = () => {
    if (activeChat) {
      setEditedTitle(activeChat.title);
      setIsEditingTitle(true);
    }
  };

  const handleTitleSave = () => {
    if (activeChatId && editedTitle.trim()) {
      updateChat(activeChatId, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleCloseHistoryView = () => {
    setShowHistoryView(false);
    setActiveTab(null);
  };

  const handleOpenArtifact = (artifactId: string) => {
    setActiveArtifactId(artifactId);
    setIsArtifactsPanelOpen(true);
    setArtifactNotification(null);
  };

  // Show Chat History View when Chats tab is active
  if (showHistoryView) {
    return <ChatHistoryView onClose={handleCloseHistoryView} />;
  }

  // Active chat view
  if (activeChat) {
    return (
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Paper 
          elevation={0}
          sx={{ 
            px: 3,
            py: 2.5,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            flexShrink: 0
          }}
        >
          {/* Chat Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {isEditingTitle ? (
              <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                }}
                size="small"
                autoFocus
                sx={{ flex: 1 }}
              />
            ) : (
              <>
                <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                  {activeChat.title}
                </Typography>
                <IconButton size="small" onClick={handleTitleEdit}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            label="Search"
            placeholder="Search in conversation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <CloseIcon size={16} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </Paper>

        {/* Messages Area - Modified for bottom-first layout */}
        <Box 
          ref={messagesContainerRef}
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end', // This pushes content to bottom
            p: 3,
            minHeight: 0
          }}
        >
          {/* Messages container */}
          <Box>
            {/* Show initial greeting if no messages */}
            {(!activeChat.messages || activeChat.messages.length === 0) && (
              <InitialGreeting onSuggestionClick={handleSuggestionClick} />
            )}

            {/* Regular messages */}
            {filteredMessages.map((message: any, index: number) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                isLast={index === filteredMessages.length - 1}
                onSuggestionClick={handleSuggestionClick}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 2
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  maxWidth: '70%'
                }}>
                  <Box sx={{ 
                    width: 150, 
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/src/assets/chatAPC-logo.svg" 
                      alt="ChatAPC Logo" 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        objectFit: 'contain',
                        padding: '2px'
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: 'background.paper',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 1
                  }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      ChatAPC is thinking...
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
        </Box>

        {/* Artifact Notification */}
        {artifactNotification && (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                bottom: 100,
                left: '10%',
                transform: 'translateX(-50%)',
                width: '80%',
                p: 2,
                backgroundColor: '#e6f7fe',
                borderRadius: 1,
                zIndex: 10
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BookmarkAdd sx={{ color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    A new output was added named "{artifactNotification.name}"
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  color="info"
                  endIcon={<VerticalSplit />}
                  onClick={() => handleOpenArtifact(artifactNotification.artifactId)}
                  sx={{ textTransform: 'none' }}
                >
                  Open
                </Button>
              </Box>
            </Paper>
          </Slide>
        )}

        {/* Input Area */}
        <Box sx={{ p: 3, flexShrink: 0, backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', maxWidth: '100%' }}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                border: 1,
                borderColor: 'divider',
                borderRadius: 3,
                p: 1.5,
                backgroundColor: 'background.default',
                '&:focus-within': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                }
              }}
            >
              <TextField
                fullWidth
                multiline
                maxRows={5}
                placeholder="Type something here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <AttachFileIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ px: 1 }}
              />
            </Paper>
            
            <IconButton 
              color="primary"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(1.05)'
                },
                '&:disabled': {
                  backgroundColor: 'action.disabledBackground',
                  transform: 'none'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <SendIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  // Default welcome state when no chat is active
  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'background.default',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      overflow: 'hidden'
    }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 700,
          p: 5,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            New chat
          </Typography>
          <EditIcon fontSize="small" />
        </Box>

        <TextField
          fullWidth
          label="Search"
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon size={18} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
            mb: 4
          }}
        />

          <Box sx={{ 
            width: 100, 
            height: 40, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src="/src/assets/chatAPC-logo.svg" 
              alt="ChatAPC Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: '3px'
              }} 
            />
          </Box>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Hello, Marco! How can I help you today?
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Here you have some suggestions for things you can ask me:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              fullWidth
              variant="outlined"
              onClick={() => handleSuggestionClick(suggestion)}
              sx={{
                justifyContent: 'space-between',
                textAlign: 'left',
                textTransform: 'none',
                py: 1.5,
                px: 2,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
              endIcon={<ArrowIcon size={16} />}
            >
              <Box>
                <Typography variant="body2" color="primary">
                  {suggestion.title}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              p: 1
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type something here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <AttachFileIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ px: 1 }}
            />
          </Paper>
          
          <IconButton 
            color="primary"
            onClick={() => handleSend()}
            disabled={!input.trim()}
            sx={{
              margin: 'auto',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark'
              },
              '&:disabled': {
                backgroundColor: 'action.disabledBackground'
              }
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

    </Box>
  );
};

// Initial Greeting Component
const InitialGreeting: React.FC<InitialGreetingProps> = ({ onSuggestionClick }) => {
  const suggestions: Suggestion[] = [
    {
      title: "Explain how the APC works",
      icon: "💡",
      message: "Explain how the APC works"
    },
    {
      title: "Plot the last week of data",
      icon: "📊",
      message: "Plot the last week of data"
    },
    {
      title: "Show me how to optimize process",
      icon: "⚡",
      message: "Show me how to optimize process"
    },
    {
      title: "Highlight the main pain points in last month production",
      icon: "🎯",
      message: "Highlight the main pain points in last month production"
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ 
          width: 150, 
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          <img 
            src="/src/assets/chatAPC-logo.svg" 
            alt="ChatAPC Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              padding: '3px'
            }} 
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Hello, Marco! How can I help you today?
          </Typography>
          
          {/* Suggestions */}
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Here you have some suggestions for things you can ask me:
          </Typography>
          <List sx={{ p: 0 }}>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => onSuggestionClick(suggestion)}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  <ListItemText 
                    primary={suggestion.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: 'primary.main'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

// Enhanced Message Bubble Component with options support
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast, onSuggestionClick }) => {
  const { setIsArtifactsPanelOpen, setActiveArtifactId } = useChat();
  const isUser = message.role === 'user';

  const handleArtifactClick = () => {
    if (message.artifactId) {
      setActiveArtifactId(message.artifactId);
      setIsArtifactsPanelOpen(true);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      mb: 2
    }}>
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        maxWidth: '70%',
        flexDirection: isUser ? 'row-reverse' : 'row'
      }}>
        {/* Avatar */}
        <Box sx={{ 
          width: 32, 
          height: 32,
          borderRadius: 2,
          backgroundColor: isUser ? 'primary.main' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isUser ? (
            <PersonIcon sx={{ color: 'white', fontSize: 20 }} />
          ) : (
            <img 
              src="/favicon.png" 
              alt="ChatAPC Logo" 
              style={{ 
                width: '100%', 
                height: '150%', 
                objectFit: 'contain',
                padding: '2px'
              }} 
            />
          )}
        </Box>
        
        {/* Message Content */}
        <Box>
          {/* Sender name */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              mb: 0.5,
              textAlign: isUser ? 'right' : 'left'
            }}
          >
            {isUser ? 'You' : ''}
          </Typography>
          
          {/* Message bubble */}
          {message.type === 'options' ? (
            // Options message with buttons
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {message.content.map((option: Suggestion, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => onSuggestionClick(option)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    py: 1,
                    px: 2,
                    borderColor: 'divider',
                    color: 'text.primary',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover'
                    }
                  }}
                  endIcon={<ArrowIcon size={14} />}
                >
                  <Typography variant="body2" color="primary">
                    {option.title}
                  </Typography>
                </Button>
              ))}
            </Box>
          ) : (
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.5,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderRadius: 2,
                boxShadow: 1,
                borderTopRightRadius: isUser ? 0 : 16,
                borderTopLeftRadius: isUser ? 16 : 0,
              }}
            >
              {message.type === 'text' && (
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </Typography>
              )}
              
              {message.type === 'artifact' && (
                <Chip
                  label={message.content}
                  onClick={handleArtifactClick}
                  variant={isUser ? "filled" : "outlined"}
                  size="small"
                  sx={{ 
                    cursor: 'pointer',
                    backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color: isUser ? 'inherit' : 'primary.main',
                    borderColor: isUser ? 'rgba(255,255,255,0.3)' : 'primary.main'
                  }}
                />
              )}
              
              {message.type === 'error' && (
                <Typography variant="body2" color="error">
                  {message.content}
                </Typography>
              )}
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMainArea;
