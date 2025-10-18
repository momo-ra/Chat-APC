import {
    Cable,
    Storage,
    Description,
    CloudUpload,
    Timeline,
    Speed,
    Sync,
    Memory,
    Thermostat,
    Opacity,
    AccountTree,
    Insights,
    TrendingUp,
    Psychology,
    Settings,
    Engineering,
  } from '@mui/icons-material';
  import type { Node, Edge, MarkerType } from 'reactflow';
  import { themeConfig, getColor } from '../../shared/themeConfig';
  
  // Node dimensions
  export const NODE_WIDTH = 110;
  export const NODE_HEIGHT = 110;
  export const NODE_SIZE = 110;
  
  // Get colors from unified theme
  export const getPrimaryColor = (isDark: boolean) => getColor(themeConfig.colors.blue, isDark);
  export const getSecondaryColor = (isDark: boolean) => getColor(themeConfig.colors.cyan, isDark);
  
  // Initial graph structure
  export const createInitialGraph = (isDark: boolean): { nodes: Node[]; edges: Edge[] } => {
    const primaryColor = getPrimaryColor(isDark);
    
    const nodes: Node[] = [
      {
        id: 'root',
        type: 'custom',
        position: { x: 450, y: 300 },
        data: {
          label: 'Process Unit',
          icon: Engineering,
          color: primaryColor,
          size: 'xlarge',
          type: 'Control',
        },
      },
      {
        id: 'equipment',
        type: 'custom',
        position: { x: 120, y: 180 },
        data: {
          label: 'E-200',
          icon: Memory,
          color: primaryColor,
          size: 'large',
          type: 'Equipment',
        },
      },
      {
        id: 'control',
        type: 'custom',
        position: { x: 780, y: 180 },
        data: {
          label: 'Control',
          icon: AccountTree,
          color: primaryColor,
          size: 'large',
          type: 'System',
        },
      },
      {
        id: 'sensors',
        type: 'custom',
        position: { x: 180, y: 480 },
        data: {
          label: 'Sensors',
          icon: Speed,
          color: primaryColor,
          size: 'large',
          type: 'I/O',
        },
      },
      {
        id: 'alarms',
        type: 'custom',
        position: { x: 720, y: 480 },
        data: {
          label: 'Alarms',
          icon: Insights,
          color: primaryColor,
          size: 'large',
          type: 'Safety',
        },
      },
    ];
  
    const secondaryColor = getSecondaryColor(isDark);
  
    const edges: Edge[] = [
      {
        id: 'e-root-equipment',
        source: 'root',
        target: 'equipment',
        animated: false,
        style: { stroke: secondaryColor, strokeWidth: 2 },
        label: 'monitors',
        labelStyle: { fontSize: 12, fontWeight: 700, fill: secondaryColor },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
      },
      {
        id: 'e-root-control',
        source: 'root',
        target: 'control',
        animated: false,
        style: { stroke: secondaryColor, strokeWidth: 2 },
        label: 'manages',
        labelStyle: { fontSize: 12, fontWeight: 700, fill: secondaryColor },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
      },
      {
        id: 'e-root-sensors',
        source: 'root',
        target: 'sensors',
        animated: false,
        style: { stroke: secondaryColor, strokeWidth: 2 },
        label: 'reads data',
        labelStyle: { fontSize: 12, fontWeight: 700, fill: secondaryColor },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
      },
      {
        id: 'e-root-alarms',
        source: 'root',
        target: 'alarms',
        animated: false,
        style: { stroke: secondaryColor, strokeWidth: 2 },
        label: 'triggers',
        labelStyle: { fontSize: 12, fontWeight: 700, fill: secondaryColor },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
      },
    ];
  
    return { nodes, edges };
  };
  
  // Detail nodes for expansion
  export const getDetailNodes = (isDark: boolean): { [key: string]: { nodes: Node[]; edges: Edge[] } } => {
    const secondaryColor = getSecondaryColor(isDark);
    
    return {
      equipment: {
        nodes: [
          {
            id: 'temp1',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'TI-100', icon: Thermostat, color: secondaryColor, size: 'medium', type: 'Temp' },
          },
          {
            id: 'pressure1',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'PI-101', icon: Speed, color: secondaryColor, size: 'medium', type: 'Press' },
          },
        ],
        edges: [
          {
            id: 'e-equipment-temp1',
            source: 'equipment',
            target: 'temp1',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'measures',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
          {
            id: 'e-equipment-pressure1',
            source: 'equipment',
            target: 'pressure1',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'monitors',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
        ],
      },
      control: {
        nodes: [
          {
            id: 'loop1',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'PID-200', icon: Psychology, color: secondaryColor, size: 'medium', type: 'Loop' },
          },
          {
            id: 'loop2',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'PID-201', icon: Settings, color: secondaryColor, size: 'medium', type: 'Loop' },
          },
        ],
        edges: [
          {
            id: 'e-control-loop1',
            source: 'control',
            target: 'loop1',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'executes',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
          {
            id: 'e-control-loop2',
            source: 'control',
            target: 'loop2',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'runs',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
        ],
      },
      sensors: {
        nodes: [
          {
            id: 'ti100',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'TI-100', icon: Thermostat, color: secondaryColor, size: 'medium', type: 'Input' },
          },
          {
            id: 'fi100',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'FI-100', icon: Opacity, color: secondaryColor, size: 'medium', type: 'Flow' },
          },
        ],
        edges: [
          {
            id: 'e-sensors-ti100',
            source: 'sensors',
            target: 'ti100',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'reads',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
          {
            id: 'e-sensors-fi100',
            source: 'sensors',
            target: 'fi100',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'tracks',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
        ],
      },
      alarms: {
        nodes: [
          {
            id: 'alarm1',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'TAH-100', icon: Insights, color: secondaryColor, size: 'medium', type: 'High' },
          },
          {
            id: 'alarm2',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: { label: 'PAH-101', icon: TrendingUp, color: secondaryColor, size: 'medium', type: 'Critical' },
          },
        ],
        edges: [
          {
            id: 'e-alarms-alarm1',
            source: 'alarms',
            target: 'alarm1',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'monitors',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
          {
            id: 'e-alarms-alarm2',
            source: 'alarms',
            target: 'alarm2',
            animated: false,
            style: { stroke: secondaryColor, strokeWidth: 2 },
            label: 'watches',
            labelStyle: { fontSize: 11, fontWeight: 700, fill: secondaryColor },
            labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
            markerEnd: { type: 'arrowclosed' as any, color: secondaryColor },
          },
        ],
      },
    };
  };