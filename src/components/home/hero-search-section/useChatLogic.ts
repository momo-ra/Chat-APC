import { useState, useEffect, useRef } from 'react';
import { Message } from './ChatMessage';
import { getAIResponse, initialSuggestionQuestions } from './aiResponse';

const INITIAL_WELCOME_MESSAGE =
  "ChatAPC blends deep engineering expertise with advanced AI to deliver clear, data-driven insights. It identifies issues early, explains process behavior intuitively, and reveals untapped opportunities for improved performance and profit — all in plain language.";

const PROCESSING_STAGES = [
  'connecting to process data...',
  'navigating knowledge map…',
  'preparing answer…',
];

export const useChatLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentStage, setCurrentStage] = useState(0);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [waitingForUserInput, setWaitingForUserInput] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [lastAutoSendTime, setLastAutoSendTime] = useState<number>(0);
  const [lastAskedQuestion, setLastAskedQuestion] = useState('');

  const autoSendTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with welcome message
  useEffect(() => {
    setCurrentSuggestions(initialSuggestionQuestions);
  }, []);

  // Initial welcome flow
  useEffect(() => {
    if (showInitialMessage && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome-message',
        role: 'assistant',
        content: INITIAL_WELCOME_MESSAGE,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setIsTyping(true);
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [showInitialMessage, messages.length]);

  // Auto-send logic
  useEffect(() => {
    if (showSuggestions && !hasUserSentMessage && currentSuggestions.length > 0) {
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }

      const delay = messages.length === 1 ? 6000 : 12000;

      autoSendTimerRef.current = setTimeout(() => {
        const currentTime = Date.now();
        const timeSinceLastAutoSend = currentTime - lastAutoSendTime;

        if (
          !hasUserSentMessage &&
          (lastAutoSendTime === 0 || timeSinceLastAutoSend > 9000)
        ) {
          const randomIndex = Math.floor(Math.random() * currentSuggestions.length);
          const suggestionToSend = currentSuggestions[randomIndex];
          if (suggestionToSend) {
            setLastAutoSendTime(currentTime);
            handleSuggestionClick(suggestionToSend, true);
          }
        }
      }, delay);
    }

    return () => {
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
    };
  }, [
    showSuggestions,
    hasUserSentMessage,
    currentSuggestions,
    messages.length,
    lastAutoSendTime,
  ]);

  // Reset hasUserSentMessage when new suggestions appear
  useEffect(() => {
    if (showSuggestions && messages.length > 1) {
      setHasUserSentMessage(false);
    }
  }, [currentSuggestions, showSuggestions]);

  // Processing stages animation
  useEffect(() => {
    if (!isLoading) {
      setCurrentStage(0);
      return;
    }

    let stageIndex = 0;
    setCurrentStage(0);
    const interval = setInterval(() => {
      stageIndex = (stageIndex + 1) % PROCESSING_STAGES.length;
      setCurrentStage(stageIndex);
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleWelcomeTypingComplete = () => {
    setIsTyping(false);
    setShowInitialMessage(false);
    // Show suggestions after 3 seconds delay
    setTimeout(() => {
      setShowSuggestions(true);
      setWaitingForUserInput(true);
    }, 3000);
  };

  const handleResponseTypingComplete = () => {
    setIsTyping(false);
    // Show suggestions after 3 seconds delay
    setTimeout(() => {
      setShowSuggestions(true);
      setWaitingForUserInput(true);
      setHasUserSentMessage(false);
    }, 3000);
  };

  const handleSuggestionClick = (suggestion: string, isAutoSent: boolean = false) => {
    if (isLoading || isTyping) {
      return;
    }

    if (!isAutoSent && autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }

    setInputValue(suggestion);
    setShowSuggestions(false);
    setWaitingForUserInput(false);
    setHasUserSentMessage(true);
    handleSendMessage(suggestion, isAutoSent);
  };

  const handleSendMessage = async (
    messageToSend?: string,
    isAutoSent: boolean = false
  ) => {
    const messageContent = messageToSend || inputValue.trim();
    if (!messageContent || isLoading || isTyping) {
      return;
    }

    setLastAskedQuestion(messageContent);
    setShowSuggestions(false);
    setWaitingForUserInput(false);
    setHasUserSentMessage(true);

    if (isAutoSent) {
      setLastAutoSendTime(Date.now());
    }

    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const filteredMessages = prev.filter((msg) => msg.id !== 'welcome-message');
      return [...filteredMessages, userMessage];
    });
    setInputValue('');

    setTimeout(() => {
      setIsLoading(true);
    }, 180);

    setTimeout(() => {
      const { response, suggestions } = getAIResponse(messageContent, messageContent);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setIsTyping(true);
      setCurrentSuggestions(suggestions);
    }, 1400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    isLoading,
    isTyping,
    inputValue,
    currentStage: PROCESSING_STAGES[currentStage],
    showSuggestions,
    currentSuggestions,
    setInputValue,
    handleSendMessage,
    handleKeyPress,
    handleSuggestionClick,
    handleWelcomeTypingComplete,
    handleResponseTypingComplete,
    setMessages,
  };
};