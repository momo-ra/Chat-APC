import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import {
  X as CloseIcon,
  Maximize2 as MaximizeIcon,
  Download as DownloadIcon
} from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

const ArtifactsPanel: React.FC = () => {
  const {
    artifacts,
    activeArtifactId,
    setIsArtifactsPanelOpen
  } = useChat();

  const activeArtifact = activeArtifactId ? artifacts[activeArtifactId] : null;

  return (
    <Paper
      elevation={0}
      sx={{
        width: 400,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        minHeight: '100vh',
        maxWidth: '500px'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          fontSize: '1.1rem',
          color: 'text.primary'
        }}>
          {activeArtifact?.name || 'Outputs'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" sx={{ 
            backgroundColor: 'action.hover',
            '&:hover': { backgroundColor: 'action.selected' }
          }}>
            <MaximizeIcon size={18} />
          </IconButton>
          <IconButton size="small" sx={{ 
            backgroundColor: 'action.hover',
            '&:hover': { backgroundColor: 'action.selected' }
          }}>
            <DownloadIcon size={18} />
          </IconButton>
          <IconButton 
            size="small"
            onClick={() => setIsArtifactsPanelOpen(false)}
            sx={{ 
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'error.light', color: 'error.main' }
            }}
          >
            <CloseIcon size={18} />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Content */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        {activeArtifact ? (
          <Box>
            {/* Render artifact based on type */}
            {activeArtifact.type === 'graph' && (
              <Box sx={{ 
                height: 400, 
                backgroundColor: 'grey.50',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography color="text.secondary">
                  Graph visualization will be rendered here
                </Typography>
              </Box>
            )}
            
            {activeArtifact.type === 'data' && (
              <Box sx={{ 
                backgroundColor: 'grey.50',
                borderRadius: 4,
                p: 2
              }}>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {JSON.stringify(activeArtifact.data, null, 2)}
                </pre>
              </Box>
            )}
            
            {activeArtifact.type === 'code' && (
              <Box sx={{ 
                backgroundColor: 'grey.900',
                color: 'grey.50',
                borderRadius: 4,
                p: 2,
                fontFamily: 'monospace'
              }}>
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {activeArtifact.content}
                </pre>
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography color="text.secondary">
              No artifact selected
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ArtifactsPanel;
