import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  QuestionAnswer as AddIcon,
  Search as SearchIcon,
  FilterAlt as FilterListIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ArrowBack as BackIcon,
  ArrowDropDown as ArrowDropDownIcon,
  KeyboardArrowLeft as ChevronLeftIcon,
  KeyboardArrowRight as ChevronRightIcon,
  Person as PersonIcon,
  Person
} from '@mui/icons-material';
import { useChat } from '../../contexts/ChatContext';
import { getCurrentUser } from '../../services/authService';

interface ChatHistoryViewProps {
  onClose: () => void;
}

const ChatHistoryView: React.FC<ChatHistoryViewProps> = ({ onClose }) => {
  const {
    chats,
    createChat,
    setActiveChatId,
    deleteChat,
    updateChat,
    toggleStarChat,
    starredChats = []
  } = useChat();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = getCurrentUser();

  // Convert chats object to array and sort by date
  const chatsList = useMemo(() => {
    const chatsArray = Object.values(chats || {});
    return chatsArray.sort((a, b) => b.createdAt - a.createdAt);
  }, [chats]);

  // Filter chats based on search
  const filteredChats = useMemo(() => {
    if (!searchQuery) return chatsList;
    
    return chatsList.filter(chat =>
      chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatsList, searchQuery]);

  // Paginated chats
  const paginatedChats = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredChats.slice(start, end);
  }, [filteredChats, page, rowsPerPage]);

  // Check if all visible chats are selected
  const isAllSelected = paginatedChats.length > 0 && 
    paginatedChats.every(chat => selectedChats.includes(chat.id));
  
  const isIndeterminate = paginatedChats.some(chat => selectedChats.includes(chat.id)) && 
    !isAllSelected;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = paginatedChats.map(chat => chat.id);
      setSelectedChats(prev => [...new Set([...prev, ...newSelected])]);
    } else {
      const currentPageIds = paginatedChats.map(chat => chat.id);
      setSelectedChats(prev => prev.filter(id => !currentPageIds.includes(id)));
    }
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChats(prev => {
      if (prev.includes(chatId)) {
        return prev.filter(id => id !== chatId);
      }
      return [...prev, chatId];
    });
  };

  const handleCreateNewChat = () => {
    const chatId = createChat('New Chat');
    setActiveChatId(chatId);
    onClose();
  };

  const handleOpenChat = (chatId: string) => {
    setActiveChatId(chatId);
    onClose();
  };

  const handleDeleteSelected = () => {
    selectedChats.forEach(chatId => {
      if (deleteChat) {
        deleteChat(chatId);
      }
    });
    setSelectedChats([]);
  };

  const handleDeleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (deleteChat) {
      deleteChat(chatId);
      setSelectedChats(prev => prev.filter(id => id !== chatId));
    }
  };

  const handleStarToggle = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (toggleStarChat) {
      toggleStarChat(chatId);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Get user info for created by column
  const getCreatedBy = (chat: any) => {
    // This would normally come from chat metadata
    // For now, using a placeholder
    return chat.createdBy || { name: 'Marco Rossi', initial: 'M' };
  };

  return (
    <Box sx={{ 
      padding: '4px 120px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'background.default'
    }}>
      {/* Welcome Message */}
      <Box sx={{ 
        p: 3,
        backgroundColor: 'background.paper',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Welcome back, {user.name}! Looking for something?
        </Typography>
      </Box>

      {/* Search and Controls Section */}
      <Box sx={{ 
        p: 3,
        pb: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}>
        {/* Left side - Search and Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, maxWidth: 400 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search for projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            label="Search"
            InputProps={{
              sx: { 
                fontSize: '14px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)'
                }
              }
            }}
            InputLabelProps={{
              sx: { fontSize: '12px' }
            }}
          />
          <IconButton size="medium">
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* Right side - Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            disabled={selectedChats.length === 0}
            onClick={handleDeleteSelected}
            sx={{ 
              textTransform: 'none',
              backgroundColor: selectedChats.length > 0 ? 'warning.main' : 'action.disabledBackground',
              '&:hover': {
                backgroundColor: selectedChats.length > 0 ? 'warning.dark' : 'action.disabledBackground'
              }
            }}
          >
            Delete selected
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleCreateNewChat}
            sx={{ textTransform: 'none' }}
          >
            New chat
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: 'background.paper' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell 
                  padding="checkbox" 
                  sx={{ 
                    width: '42.5%',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Checkbox
                      indeterminate={isIndeterminate}
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Chat name
                    </Typography>
                    <ArrowDropDownIcon fontSize="small" />
                  </Box>
                </TableCell>
                <TableCell 
                  sx={{ 
                    width: '21.25%',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Created on
                  </Typography>
                </TableCell>
                <TableCell 
                  sx={{ 
                    width: '21.25%',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Created by
                  </Typography>
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{ 
                    width: '15%',
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedChats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchQuery ? 'No chats found matching your search' : 'No chats yet'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedChats.map((chat) => {
                  const isSelected = selectedChats.includes(chat.id);
                  const isStarred = starredChats.includes(chat.id);
                  const createdBy = getCreatedBy(chat);

                  return (
                    <TableRow
                      key={chat.id}
                      hover
                      selected={isSelected}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectChat(chat.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Typography
                            variant="body2"
                            onClick={() => handleOpenChat(chat.id)}
                            sx={{ 
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            {chat.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(chat.createdAt || chat.updatedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          avatar={
                            <Person sx={{ width: 18, height: 18, fontSize: '10px' }}>
                              {createdBy.initial || 'M'}
                            </Person>
                          }
                          label={createdBy.name}
                          size="small"
                          sx={{ 
                            height: 24,
                            '& .MuiChip-label': { 
                              fontSize: '13px',
                              px: 1
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0 }}>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleStarToggle(chat.id, e)}
                          >
                            {isStarred ? (
                              <StarIcon fontSize="small" sx={{ color: 'warning.main' }} />
                            ) : (
                              <StarBorderIcon fontSize="small" />
                            )}
                          </IconButton>
                          <Box sx={{ 
                            width: '2%', 
                            height: 34, 
                            backgroundColor: 'divider',
                            alignSelf: 'center'
                          }} />
                          <IconButton 
                            size="small"
                            onClick={(e) => handleDeleteChat(chat.id, e)}
                            sx={{ color: 'warning.main' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination Footer */}
      <Box sx={{ 
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}>
        <TablePagination
          component="div"
          count={filteredChats.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            '& .MuiTablePagination-toolbar': {
              minHeight: 52,
              paddingRight: 2
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select, & .MuiTablePagination-displayedRows': {
              fontSize: '12px'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatHistoryView;

