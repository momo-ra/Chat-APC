import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | any[];
  type: 'text' | 'options' | 'artifact' | 'error';
  timestamp: number;
  artifactId?: string;
}

export interface Chat {
  id: string;
  title: string;
  projectId?: string | null;
  messages: Message[];
  artifacts: string[];
  createdAt: number;
  updatedAt: number;
  createdBy?: {
    name: string;
    initial: string;
  };
}

export interface Project {
  id: string;
  name: string;
  chats: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Artifact {
  id: string;
  chatId: string;
  type: 'graph' | 'chart' | 'code' | 'data' | 'document';
  name: string;
  content?: string;
  data?: any;
  createdAt: number;
}

export interface ChatContextType {
  // State
  projects: Record<string, Project>;
  chats: Record<string, Chat>;
  artifacts: Record<string, Artifact>;
  starredChats: string[];
  activeProjectId: string | null;
  activeChatId: string | null;
  activeArtifactId: string | null;
  isChatSidebarOpen: boolean;
  isArtifactsPanelOpen: boolean;
  activeTab: 'chats' | 'projects' | 'artifacts' | 'outputs' | 'explorer' | null;
  
  // Actions
  createProject: (name: string) => string;
  createChat: (title?: string, projectId?: string | null) => string;
  updateChat: (chatId: string, updates: Partial<Chat>) => void;
  deleteChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  createArtifact: (chatId: string, artifactData: Omit<Artifact, 'id' | 'chatId' | 'createdAt'>) => string;
  deleteArtifact: (artifactId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  toggleStarChat: (chatId: string) => void;
  setActiveProjectId: (projectId: string | null) => void;
  setActiveChatId: (chatId: string | null) => void;
  setActiveArtifactId: (artifactId: string | null) => void;
  setIsChatSidebarOpen: (open: boolean) => void;
  setIsArtifactsPanelOpen: (open: boolean) => void;
  setActiveTab: (tab: 'chats' | 'projects' | 'artifacts' | 'outputs' | 'explorer' | null) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Core state following Claude's data model
  const [projects, setProjects] = useState<Record<string, Project>>({});
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [artifacts, setArtifacts] = useState<Record<string, Artifact>>({});
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);
  const [starredChats, setStarredChats] = useState<string[]>([]);
  
  // UI state
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState<boolean>(true);
  const [isArtifactsPanelOpen, setIsArtifactsPanelOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chats' | 'projects' | 'artifacts' | 'outputs' | 'explorer' | null>(null);

  // Create new project
  const createProject = useCallback((name: string): string => {
    const projectId = uuidv4();
    const newProject: Project = {
      id: projectId,
      name,
      chats: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setProjects(prev => ({ ...prev, [projectId]: newProject }));
    return projectId;
  }, []);

  // Create new chat
  const createChat = useCallback((title: string = 'New Chat', projectId: string | null = null): string => {
    const chatId = uuidv4();
    const newChat: Chat = {
      id: chatId,
      title,
      projectId,
      messages: [],
      artifacts: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    setChats(prev => ({ ...prev, [chatId]: newChat }));
    
    // Update project if applicable
    if (projectId) {
      setProjects(prev => ({
        ...prev,
        [projectId]: {
          ...prev[projectId],
          chats: [...prev[projectId].chats, chatId],
          updatedAt: Date.now()
        }
      }));
    }
    
    return chatId;
  }, []);

  // Update chat
  const updateChat = useCallback((chatId: string, updates: Partial<Chat>): void => {
    setChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        ...updates,
        updatedAt: Date.now()
      }
    }));
  }, []);

  // Delete chat
  const deleteChat = useCallback((chatId: string): void => {
    // Get the chat to check if it belongs to a project
    const chat = chats[chatId];
    
    if (chat) {
      // Remove chat from chats state
      setChats(prev => {
        const newChats = { ...prev };
        delete newChats[chatId];
        return newChats;
      });
      
      // Remove associated artifacts
      setArtifacts(prev => {
        const newArtifacts = { ...prev };
        Object.keys(newArtifacts).forEach(artifactId => {
          if (newArtifacts[artifactId].chatId === chatId) {
            delete newArtifacts[artifactId];
          }
        });
        return newArtifacts;
      });
      
      // Remove chat from project if it belongs to one
      if (chat.projectId) {
        setProjects(prev => ({
          ...prev,
          [chat.projectId]: {
            ...prev[chat.projectId],
            chats: prev[chat.projectId].chats.filter(id => id !== chatId),
            updatedAt: Date.now()
          }
        }));
      }
      
      // Clear active chat if it was deleted
      if (activeChatId === chatId) {
        setActiveChatId(null);
      }
    }
  }, [chats, activeChatId]);

  // Add message to chat
  const addMessage = useCallback((chatId: string, message: Omit<Message, 'id' | 'timestamp'>): void => {
    setChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: [...prev[chatId].messages, {
          id: uuidv4(),
          ...message,
          timestamp: Date.now()
        }],
        updatedAt: Date.now()
      }
    }));
  }, []);

  // Create artifact
  const createArtifact = useCallback((chatId: string, artifactData: Omit<Artifact, 'id' | 'chatId' | 'createdAt'>): string => {
    const artifactId = uuidv4();
    const newArtifact: Artifact = {
      id: artifactId,
      chatId,
      ...artifactData,
      createdAt: Date.now()
    };
    
    setArtifacts(prev => ({ ...prev, [artifactId]: newArtifact }));
    
    // Update chat
    setChats(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        artifacts: [...prev[chatId].artifacts, artifactId],
        updatedAt: Date.now()
      }
    }));
    
    return artifactId;
  }, []);

  // Delete artifact
  const deleteArtifact = useCallback((artifactId: string): void => {
    const artifact = artifacts[artifactId];
    
    if (artifact) {
      // Remove artifact from artifacts state
      setArtifacts(prev => {
        const newArtifacts = { ...prev };
        delete newArtifacts[artifactId];
        return newArtifacts;
      });
      
      // Remove artifact reference from chat
      if (artifact.chatId) {
        setChats(prev => ({
          ...prev,
          [artifact.chatId]: {
            ...prev[artifact.chatId],
            artifacts: prev[artifact.chatId].artifacts.filter(id => id !== artifactId),
            updatedAt: Date.now()
          }
        }));
      }
      
      // Clear active artifact if it was deleted
      if (activeArtifactId === artifactId) {
        setActiveArtifactId(null);
      }
    }
  }, [artifacts, activeArtifactId]);

  // Update project
  const updateProject = useCallback((projectId: string, updates: Partial<Project>): void => {
    setProjects(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        ...updates,
        updatedAt: Date.now()
      }
    }));
  }, []);

  // Delete project
  const deleteProject = useCallback((projectId: string): void => {
    const project = projects[projectId];
    
    if (project) {
      // Delete all chats in the project
      project.chats.forEach(chatId => {
        deleteChat(chatId);
      });
      
      // Remove project from projects state
      setProjects(prev => {
        const newProjects = { ...prev };
        delete newProjects[projectId];
        return newProjects;
      });
      
      // Clear active project if it was deleted
      if (activeProjectId === projectId) {
        setActiveProjectId(null);
      }
    }
  }, [projects, activeProjectId, deleteChat]);

  // Toggle star status for a chat
  const toggleStarChat = useCallback((chatId: string): void => {
    setStarredChats(prev => {
      if (prev.includes(chatId)) {
        return prev.filter(id => id !== chatId);
      } else {
        return [...prev, chatId];
      }
    });
  }, []);

  const value: ChatContextType = {
    // State
    projects,
    chats,
    artifacts,
    starredChats,
    activeProjectId,
    activeChatId,
    activeArtifactId,
    isChatSidebarOpen,
    isArtifactsPanelOpen,
    activeTab,
    
    // Actions
    createProject,
    createChat,
    updateChat,
    deleteChat,
    addMessage,
    createArtifact,
    deleteArtifact,
    updateProject,
    deleteProject,
    toggleStarChat,
    setActiveProjectId,
    setActiveChatId,
    setActiveArtifactId,
    setIsChatSidebarOpen,
    setIsArtifactsPanelOpen,
    setActiveTab
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
