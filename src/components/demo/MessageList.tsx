import React from "react";
import {
  Box,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import {
  BarChart as ChartIcon
} from '@mui/icons-material';
// import UPlotChart from "../charts/LineChart";
import Message from "./Message";

interface MessageItem {
  msg_type: string;
  sender: string;
  data: any;
}

interface MessageListProps {
  messageList: MessageItem[];
}

const MessageList: React.FC<MessageListProps> = ({ messageList }) => {
  const determineChartType = (msgType: string, data: any) => {
    switch (msgType) {
      case "line_plot":
      case "linechart":
        return (
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mt: 1,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ChartIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Chart Visualization
              </Typography>
            </Box>
            {/* <Box sx={{ height: 300, width: '100%' }}>
              <UPlotChart 
                key={`chart-${Math.random()}`} 
                data={data}
                width={600}
                height={300}
              />
            </Box> */}
          </Paper>
        );
      default:
        return (
          <Alert severity="warning" sx={{ mt: 1 }}>
            <Typography variant="body2">
              Unsupported chart type: {msgType}
            </Typography>
          </Alert>
        );
    }
  };

  // Handle empty message list
  if (!messageList || messageList.length === 0) {
    return (
      <Box
        data-testid="empty-message-list"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: 200,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          No messages yet
        </Typography>
        <Typography variant="body2">
          Start a conversation by sending a message
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      data-testid="message-list"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        overflow: 'auto',
        px: 1
      }}
    >
      {messageList.map((item, index) => {
        // Validate message item
        if (!item || !item.msg_type) {
          console.warn("Invalid message item:", item);
          return (
            <Alert key={`error-${index}`} severity="error" sx={{ my: 0.5 }}>
              <Typography variant="body2">
                Invalid message format
              </Typography>
            </Alert>
          );
        }

        // Handle text messages
        if (item.msg_type === "text") {
          return (
            <Message 
              key={`msg-${index}`} 
              index={index} 
              sender={item.sender} 
              textData={item.data} 
            />
          );
        }
        
        // Handle chart/visualization messages
        if (!item.data) {
          console.warn("Missing data for visualization:", item);
          return (
            <Alert key={`missing-data-${index}`} severity="warning" sx={{ my: 0.5 }}>
              <Typography variant="body2">
                Chart data is missing for visualization
              </Typography>
            </Alert>
          );
        }
        
        // Handle chart data which could be a single object or an array of data sets
        if (Array.isArray(item.data)) {
          return (
            <Box 
              key={`chart-container-${index}`} 
              data-testid="chart-container"
              sx={{
                my: 1
              }}
            >
              {determineChartType(item.msg_type, item.data)}
            </Box>
          );
        } else {
          return (
            <Box 
              key={`single-chart-${index}`}
              data-testid="single-chart"
              sx={{
                my: 1
              }}
            >
              {determineChartType(item.msg_type, item.data)}
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default MessageList;

