import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  Divider,
  Paper,
  Tooltip,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import {
  Plus as AddIcon,
  ChevronDown as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  PanelLeftClose,
  PanelLeft,
  MoreHorizontal as MoreIcon,
  LogOut as LogoutIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  FileText as DocumentIcon,
  BarChart as ChartIcon,
  Code as CodeIcon,
  Database as DataIcon,
  File as FileIcon
} from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { getCurrentUser } from '../../services/authService';
import HelpPopup, { HelpPopupButton } from '../shared/HelpPopup';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Forum as ForumIcon,
  AllInbox as AllInboxIcon,
  Apps as AppsIcon,
  Hub as HubIcon,
  Add,
  ViewSidebar,
  AutoAwesome
} from '@mui/icons-material';

interface NavButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface ChatItemProps {
  chat: any;
  isStarred: boolean;
}

interface OutputItemProps {
  artifact: any;
}

const ChatSidebar: React.FC = () => {
  const {
    projects,
    chats,
    artifacts,
    activeTab,
    setActiveTab,
    activeChatId,
    setActiveChatId,
    activeProjectId,
    setActiveProjectId,
    createChat,
    createProject,
    isChatSidebarOpen,
    setIsChatSidebarOpen,
    updateChat,
    starredChats = [],
    toggleStarChat,
    setIsArtifactsPanelOpen,
    setActiveArtifactId
  } = useChat();

  const [starredExpanded, setStarredExpanded] = useState<boolean>(true);
  const [recentExpanded, setRecentExpanded] = useState<boolean>(true);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState<boolean>(false);
  const addOutputButtonRef = useRef<HTMLButtonElement>(null);
  
  const currentUser = getCurrentUser();

  // Keyboard shortcut for toggle (Cmd/Ctrl + B)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsChatSidebarOpen(!isChatSidebarOpen);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setIsChatSidebarOpen]);

  // Get recent chats (last 15 updated)
  const recentChats = useMemo(() => {
    const chatsArray = Object.values(chats || {});
    return chatsArray
      .filter(chat => !starredChats.includes(chat.id))
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 15);
  }, [chats, starredChats]);

  // Get starred chats
  const starredChatsList = useMemo(() => {
    return starredChats
      .map(chatId => chats[chatId])
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [chats, starredChats]);

  // Get artifacts/outputs for the active chat
  const chatOutputs = useMemo(() => {
    if (!activeChatId || !chats[activeChatId]) return [];
    
    const chat = chats[activeChatId];
    const chatArtifacts: any[] = [];
    
    // Get all artifacts associated with this chat
    Object.values(artifacts || {}).forEach(artifact => {
      if (artifact.chatId === activeChatId) {
        chatArtifacts.push(artifact);
      }
    });
    
    return chatArtifacts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [activeChatId, chats, artifacts]);

  const handleNewChat = () => {
    const chatId = createChat('New Chat', activeProjectId);
    setActiveChatId(chatId);
  };

  const handleStarToggle = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (toggleStarChat) {
      toggleStarChat(chatId);
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleOutputClick = (artifactId: string) => {
    setActiveArtifactId(artifactId);
    setIsArtifactsPanelOpen(true);
  };

  const formatChatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get icon for artifact type
  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'graph':
      case 'chart':
        return <ChartIcon size={16} />;
      case 'code':
        return <CodeIcon size={16} />;
      case 'data':
        return <DataIcon size={16} />;
      case 'document':
        return <DocumentIcon size={16} />;
      default:
        return <FileIcon size={16} />;
    }
  };

  // Navigation button component
  const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, isActive, onClick }) => (
    <ListItemButton
      onClick={onClick}
      selected={isActive}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        py: 1.5,
        px: 2,
        mx: 1,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        '&.Mui-selected': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '& .MuiListItemIcon-root': {
            color: 'primary.contrastText',
          }
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText 
        primary={label}
        primaryTypographyProps={{ 
          fontSize: '0.9rem',
          fontWeight: isActive ? 600 : 500
        }}
      />
    </ListItemButton>
  );

  // Chat item component
  const ChatItem: React.FC<ChatItemProps> = ({ chat, isStarred }) => {
    const isActive = chat.id === activeChatId;
    
    return (
      <ListItemButton
        onClick={() => setActiveChatId(chat.id)}
        selected={isActive}
        sx={{
          py: 0.75,
          px: 2,
          borderRadius: 1,
          mb: 0.25,
          '&.Mui-selected': {
            backgroundColor: 'action.selected'
          },
          '&:hover .star-button': {
            opacity: 1
          }
        }}
      >
        <ListItemText
          primary={chat.title}
          primaryTypographyProps={{
            fontSize: '0.813rem',
            fontWeight: isActive ? 500 : 400,
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }
          }}
        />
        <IconButton
          size="small"
          className="star-button"
          onClick={(e) => handleStarToggle(e, chat.id)}
          sx={{
            opacity: isStarred ? 1 : 0,
            transition: 'opacity 0.2s',
            p: 0.5,
            ml: 0.5
          }}
        >
          {isStarred ? (
            <StarIcon fontSize="small" sx={{ color: 'warning.main' }} />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </IconButton>
      </ListItemButton>
    );
  };

  // Output/Artifact item component
  const OutputItem: React.FC<OutputItemProps> = ({ artifact }) => {
    return (
      <ListItemButton
        onClick={() => handleOutputClick(artifact.id)}
        sx={{
          py: 0.75,
          px: 2,
          borderRadius: 1,
          mb: 0.25,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          {getArtifactIcon(artifact.type)}
        </ListItemIcon>
        <ListItemText
          primary={artifact.name || 'Untitled'}
          secondary={artifact.type}
          primaryTypographyProps={{
            fontSize: '0.813rem',
            fontWeight: 400,
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }
          }}
          secondaryTypographyProps={{
            fontSize: '0.75rem'
          }}
        />
      </ListItemButton>
    );
  };

  // Collapsed state - minimal sidebar
  if (!isChatSidebarOpen) {
    return (
      <Paper
        elevation={1}
        sx={{
          width: 64,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1000,
          transition: 'width 0.3s ease-in-out'
        }}
      >
        {/* Logo in collapsed state */}
        <Box sx={{ 
          p: 1.5, 
          display: 'flex', 
          justifyContent: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ 
            width: 150, 
            height: 60, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src="/src/assets/chatAPC-logo.png" 
              alt="ChatAPC Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: '4px'
              }} 
            />
          </Box>
        </Box>
        
        {/* Navigation Icons */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, p: 1 }}>
          {/* Chats */}
          <Tooltip title="Chats" placement="right">
            <IconButton
              size="small"
              onClick={() => {
                setActiveTab('chats');
                setActiveChatId(null);
              }}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: activeTab === 'chats' ? 'primary.main' : 'transparent',
                color: activeTab === 'chats' ? 'primary.contrastText' : 'text.secondary',
                '&:hover': {
                  backgroundColor: activeTab === 'chats' ? 'primary.dark' : 'action.hover'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ForumIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Projects */}
          <Tooltip title="Projects" placement="right">
            <IconButton
              size="small"
              onClick={() => {
                setActiveTab('projects');
                setActiveChatId(null);
              }}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: activeTab === 'projects' ? 'primary.main' : 'transparent',
                color: activeTab === 'projects' ? 'primary.contrastText' : 'text.secondary',
                '&:hover': {
                  backgroundColor: activeTab === 'projects' ? 'primary.dark' : 'action.hover'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <AllInboxIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Outputs */}
          <Tooltip title="Outputs" placement="right">
            <IconButton
              size="small"
              onClick={() => {
                setActiveTab('outputs');
                setActiveChatId(null);
              }}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: activeTab === 'outputs' ? 'primary.main' : 'transparent',
                color: activeTab === 'outputs' ? 'primary.contrastText' : 'text.secondary',
                '&:hover': {
                  backgroundColor: activeTab === 'outputs' ? 'primary.dark' : 'action.hover'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <AppsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Explorer */}
          <Tooltip title="Explorer" placement="right">
            <IconButton
              size="small"
              onClick={() => {
                setActiveTab('explorer');
                setActiveChatId(null);
              }}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: activeTab === 'explorer' ? 'primary.main' : 'transparent',
                color: activeTab === 'explorer' ? 'primary.contrastText' : 'text.secondary',
                '&:hover': {
                  backgroundColor: activeTab === 'explorer' ? 'primary.dark' : 'action.hover'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <HubIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <Box sx={{ 
            height: 1, 
            // backgroundColor: 'divider', 
            mx: 1, 
            my: 0.5 
          }} />

          {/* New Chat Button */}
          <Tooltip title="New Chat" placement="right">
            <IconButton
              size="small"
              onClick={handleNewChat}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: 'secondary.main',
                color: 'secondary.contrastText',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Expand button */}
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Open sidebar (⌘B)" placement="right">
            <IconButton
              size="medium"
              onClick={() => setIsChatSidebarOpen(true)}
              sx={{ 
                width: 40,
                height: 40,
                backgroundColor: 'action.hover',
                '&:hover': {
                  backgroundColor: 'action.selected',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <PanelLeft size={20} />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    );
  }

  // Expanded state - full sidebar
  return (
    <Paper
      elevation={0}
      sx={{
        width: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        minHeight: '100vh',
        maxWidth: '320px',
        transition: 'width 0.3s ease-in-out'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.paper'
      }}>
          <Box sx={{ 
            width: 150, 
            height: 40, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img 
              src="/src/assets/chatAPC-logo.png" 
              alt="ChatAPC Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: '4px'
              }} 
            />
          </Box>
        <Tooltip title="Collapse sidebar (⌘B)">
          <IconButton 
            size="small"
            onClick={() => setIsChatSidebarOpen(false)}
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected'
              }
            }}
          >
            <ViewSidebar fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Navigation Tabs */}
      <Box sx={{ px: 2, pb: 1 }}>
        <List sx={{ p: 0 }}>
          <NavButton
            icon={ForumIcon}
            label="Chats"
            isActive={activeTab === 'chats'}
            onClick={() => {
              setActiveTab('chats');
              setActiveChatId(null);
            }}
          />
          <NavButton
            icon={AllInboxIcon}
            label="Projects"
            isActive={activeTab === 'projects'}
            onClick={() => {
              setActiveTab('projects');
              setActiveChatId(null);
            }}
          />
          <NavButton
            icon={AppsIcon}
            label="Outputs"
            isActive={activeTab === 'outputs'}
            onClick={() => {
              setActiveTab('outputs');
              setActiveChatId(null);
            }}
          />
          <NavButton
            icon={HubIcon}
            label="Explorer"
            isActive={activeTab === 'explorer'}
            onClick={() => {
              setActiveTab('explorer');
              setActiveChatId(null);
            }}
          />
        </List>
      </Box>

      <Divider />

      {/* Dynamic Content Section */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        {/* Show chat outputs when a chat is active */}
        {activeChatId ? (
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                px: 2,
                py: 1,
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: 0.5
              }}
            >
              Chat Outputs ({chatOutputs.length})
            </Typography>
            
            {chatOutputs.length === 0 ? (
              <Typography 
                variant="caption" 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  display: 'block',
                  color: 'text.disabled'
                }}
              >
                No outputs to show yet
              </Typography>
            ) : (
              <List sx={{ py: 0, px: 1 }}>
                {chatOutputs.map(artifact => (
                  <OutputItem key={artifact.id} artifact={artifact} />
                ))}
              </List>
            )}
            
            {/* Optional: Add button to create new output */}
            <Box sx={{ px: 2, py: 1 }}>
              <Button
                ref={addOutputButtonRef}
                fullWidth
                variant="text"
                startIcon={<AddIcon size={16} />}
                onClick={() => {
                  // Show help popup instead of creating output
                  setIsHelpPopupOpen(true);
                }}
                sx={{ 
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontSize: '0.813rem',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                Add output
              </Button>
            </Box>
          </Box>
        ) : (
          // Show starred and recent chats when no chat is active
          <>
            {/* Starred Chats */}
            {starredChatsList.length > 0 && (
              <Box>
                <ListItemButton
                  onClick={() => setStarredExpanded(!starredExpanded)}
                  sx={{ py: 0.5, px: 2 }}
                >
                  <ListItemText 
                    primary="Starred chats"
                    primaryTypographyProps={{ 
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    {starredExpanded ? <ExpandMoreIcon size={16} /> : <ChevronRightIcon size={16} />}
                  </ListItemIcon>
                </ListItemButton>
                <Collapse in={starredExpanded}>
                  <List sx={{ py: 0, px: 1 }}>
                    {starredChatsList.map(chat => (
                      <ChatItem key={chat.id} chat={chat} isStarred={true} />
                    ))}
                  </List>
                </Collapse>
              </Box>
            )}

            {/* Recent Chats */}
            <Box>
              <ListItemButton
                onClick={() => setRecentExpanded(!recentExpanded)}
                sx={{ py: 0.5, px: 2 }}
              >
                <ListItemText 
                  primary="Recent chats"
                  primaryTypographyProps={{ 
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}
                />
                <ListItemIcon 
                  sx={{ minWidth: 24 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewChat();
                  }}
                >
                  <Add fontSize="small" />
                </ListItemIcon>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  {recentExpanded ? <ExpandMoreIcon size={16} /> : <ChevronRightIcon size={16} />}
                </ListItemIcon>
              </ListItemButton>
              <Collapse in={recentExpanded}>
                <List sx={{ py: 0, px: 1 }}>
                  {recentChats.length === 0 ? (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        px: 2, 
                        py: 1, 
                        display: 'block',
                        color: 'text.disabled'
                      }}
                    >
                      No recent chats
                    </Typography>
                  ) : (
                    recentChats.map(chat => (
                      <ChatItem key={chat.id} chat={chat} isStarred={false} />
                    ))
                  )}
                </List>
              </Collapse>
            </Box>
          </>
        )}
      </Box>

      {/* User Section */}
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleUserMenuOpen}
          sx={{ 
            borderRadius: 1,
            py: 1,
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {currentUser?.name?.charAt(0) || 'U'}
            </Avatar>
          </ListItemIcon>
          <ListItemText 
            primary={currentUser?.name || 'User'}
            secondary={currentUser?.email}
            primaryTypographyProps={{ 
              fontSize: '0.813rem',
              fontWeight: 500
            }}
            secondaryTypographyProps={{ 
              fontSize: '0.75rem'
            }}
          />
          <ExpandMoreIcon size={16} />
        </ListItemButton>
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <SettingsIcon size={16} />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <LogoutIcon size={16} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Help Popup */}
      <HelpPopup
        isOpen={isHelpPopupOpen}
        onClose={() => setIsHelpPopupOpen(false)}
        title="Add Output"
        description="Click this button to create a new output or artifact for your current chat. Outputs can include charts, graphs, code snippets, or other visualizations generated by the AI assistant."
        buttons={[
          { 
            label: 'Show me how', 
            onClick: () => {
              alert('This would show a tutorial on how to add outputs!');
              setIsHelpPopupOpen(false);
            }, 
            variant: 'primary' 
          },
          { 
            label: 'Learn more', 
            onClick: () => {
              alert('This would open documentation about outputs!');
              setIsHelpPopupOpen(false);
            }, 
            variant: 'outline' 
          }
        ]}
        targetElement={addOutputButtonRef.current}
        placement="right"
      />
    </Paper>
  );
};

export default ChatSidebar;
