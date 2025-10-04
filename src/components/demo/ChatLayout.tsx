import React, { useState, useEffect } from 'react';
import { Box, Collapse } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import ChatMainArea from './ChatMainArea';
import ArtifactsPanel from './ArtifactsPanel';
import { useChat } from '../../contexts/ChatContext';

const ChatLayout: React.FC = () => {
  const { isChatSidebarOpen, isArtifactsPanelOpen } = useChat();
  const [isMainSidebarCollapsed, setIsMainSidebarCollapsed] = useState<boolean>(false);
  const location = useLocation();

  // Collapse main sidebar when on chat page
  useEffect(() => {
    const isOnChatPage = location.pathname.startsWith('/chat');
    setIsMainSidebarCollapsed(isOnChatPage);
  }, [location]);

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Chat Sidebar - always visible, but collapsed/expanded */}
      <Box sx={{ 
        height: '100%',
        flexShrink: 0
      }}>
        <ChatSidebar />
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        backgroundColor: 'background.default',
        overflow: 'hidden'
      }}>
        <ChatMainArea />
      </Box>

      {/* Artifacts Panel - slides in from right */}
      {isArtifactsPanelOpen && (
        <Box sx={{ 
          height: '100%',
          flexShrink: 0
        }}>
          <ArtifactsPanel />
        </Box>
      )}
    </Box>
  );
};

export default ChatLayout;
