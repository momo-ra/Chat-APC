import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Container, Chip, IconButton, Tooltip, Paper, ButtonGroup, Button, useMediaQuery } from '@mui/material';
import {
  AccountTree,
  Speed,
  Thermostat,
  Opacity,
  Memory,
  ZoomIn,
  ZoomOut,
  CenterFocusStrong,
  Engineering,
  Psychology,
  Insights,
  TrendingUp,
  Settings,
  RestartAlt,
  ViewComfy,
} from '@mui/icons-material';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  Panel,
  Position,
  Handle,
  ConnectionLineType,
  getBezierPath,
} from 'reactflow';
import type { DefaultEdgeOptions, EdgeProps } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';

// Unified color palette
const PRIMARY_COLOR = '#1890FF';
const SECONDARY_COLOR = '#91D5FF';
const TERTIARY_COLOR = '#BAE7FF';

// Node dimensions for Dagre
const NODE_WIDTH = 110;
const NODE_HEIGHT = 110;

// Use a single consistent node size across the graph
const NODE_SIZE = 110; // square nodes

// Professional smooth edge with gradient + soft shadow
const ProEdge = (props: EdgeProps) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
  } = props;
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const gradId = `edge-grad-${id}`;
  const shadowId = `edge-shadow`;

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A7D8FF" />
          <stop offset="100%" stopColor="#1890FF" />
        </linearGradient>
        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>
      <path
        d={edgePath}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        filter={`url(#${shadowId})`}
        markerEnd={markerEnd}
      />
    </g>
  );
};

// Enhanced Knowledge Node
const KnowledgeNode = ({ data, selected }: any) => {
  const { isDark } = useThemeMode();
  const [isHovered, setIsHovered] = useState(false);

  const nodeColor = data.color || PRIMARY_COLOR;
  const IconComponent = data.icon;
  const size = NODE_SIZE;
  const iconSize = 40;

  // We don't show handles to avoid the visible dots around nodes.

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Hidden handles to satisfy React Flow without visual dots */}
      <Handle type="target" position={Position.Top} id="top" style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} />
      <Handle type="target" position={Position.Left} id="left" style={{ opacity: 0, width: 0, height: 0, border: 0, background: 'transparent', pointerEvents: 'none' }} />

      {/* Glow Effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: -12,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${nodeColor}40 0%, transparent 70%)`,
          opacity: selected ? 1 : isHovered ? 0.8 : 0,
          transition: 'opacity 0.3s ease',
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />

      {/* Main Circle */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isDark
            ? `linear-gradient(135deg, ${nodeColor}20 0%, ${nodeColor}10 100%)`
            : `linear-gradient(135deg, ${nodeColor}15 0%, ${nodeColor}05 100%)`,
          border: selected
            ? `3px solid ${nodeColor}`
            : isHovered
            ? `2px solid ${nodeColor}`
            : isDark
            ? `2px solid ${nodeColor}40`
            : `2px solid ${nodeColor}30`,
          boxShadow: selected
            ? `0 0 0 4px ${nodeColor}30, 0 12px 32px rgba(0,0,0,0.25)`
            : isHovered
            ? `0 0 0 3px ${nodeColor}20, 0 8px 24px rgba(0,0,0,0.2)`
            : '0 4px 16px rgba(0,0,0,0.12)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.08)' : selected ? 'scale(1.05)' : 'scale(1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Icon Container */}
        <Box
          sx={{
            width: iconSize,
            height: iconSize,
            borderRadius: '50%',
            background: nodeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 20px ${nodeColor}50`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {IconComponent && (
            <IconComponent
              sx={{
                fontSize: iconSize * 0.6,
                color: '#FFFFFF',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          )}
        </Box>

        {/* Label */}
        <Typography
          sx={{
            fontSize: data.size === 'xlarge' ? '0.95rem' : data.size === 'large' ? '0.85rem' : '0.75rem',
            fontWeight: 700,
            color: isDark ? '#FFFFFF' : '#0F172A',
            textAlign: 'center',
            maxWidth: size - 24,
            lineHeight: 1.2,
            textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
            px: 1,
          }}
        >
          {data.label}
        </Typography>

        {/* Type Badge */}
        {data.type && (
          <Chip
            label={data.type}
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 600,
              backgroundColor: `${nodeColor}30`,
              color: nodeColor,
              border: `1px solid ${nodeColor}50`,
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const nodeTypes = {
  custom: KnowledgeNode,
};

const edgeTypes = {
  'pro-edge': ProEdge,
} as const;

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'pro-edge',
  animated: false,
  style: { strokeWidth: 3, strokeLinecap: 'round' },
  markerEnd: { type: MarkerType.ArrowClosed, color: PRIMARY_COLOR, width: 14, height: 14 },
};

// --- Post-layout spacing helper: keep nodes on the same rank from crowding ---
function enforceSameRankSpacing(
  nodes: Node[],
  direction: 'TB' | 'LR',
  minGap: number
) {
  // We group nodes by their rank coordinate (y for TB, x for LR) with a small tolerance
  const tol = 16;
  type RankKey = string;
  const byRank = new Map<RankKey, Node[]>();

  nodes.forEach((n) => {
    const cx = n.position.x + NODE_SIZE / 2;
    const cy = n.position.y + NODE_SIZE / 2;
    const keyVal = direction === 'LR' ? cx : cy; // LR ranks along x, TB ranks along y
    const bucket = Math.round(keyVal / tol);
    const key = `${bucket}`;
    if (!byRank.has(key)) byRank.set(key, []);
    byRank.get(key)!.push(n);
  });

  // For each rank, sort by the orthogonal axis and push apart to satisfy minGap
  byRank.forEach((group) => {
    if (group.length < 2) return;

    if (direction === 'TB') {
      // Same Y rank; sort left-to-right by center X
      group.sort(
        (a, b) =>
          a.position.x + NODE_SIZE / 2 - (b.position.x + NODE_SIZE / 2)
      );
      // Sweep left→right, pushing nodes to the right if needed
      let lastCenterX = group[0].position.x + NODE_SIZE / 2;
      for (let i = 1; i < group.length; i++) {
        const n = group[i];
        let cx = n.position.x + NODE_SIZE / 2;
        if (cx - lastCenterX < minGap) {
          const needed = minGap - (cx - lastCenterX);
          n.position.x += needed; // push right
          cx = n.position.x + NODE_SIZE / 2;
        }
        lastCenterX = cx;
      }
    } else {
      // LR: Same X rank; sort top-to-bottom by center Y
      group.sort(
        (a, b) =>
          a.position.y + NODE_SIZE / 2 - (b.position.y + NODE_SIZE / 2)
      );
      let lastCenterY = group[0].position.y + NODE_SIZE / 2;
      for (let i = 1; i < group.length; i++) {
        const n = group[i];
        let cy = n.position.y + NODE_SIZE / 2;
        if (cy - lastCenterY < minGap) {
          const needed = minGap - (cy - lastCenterY);
          n.position.y += needed; // push down
          cy = n.position.y + NODE_SIZE / 2;
        }
        lastCenterY = cy;
      }
    }
  });

  return nodes;
}

// Dagre Layout Function - من knowledge-graph-unified.tsx
function getLayoutedElements(nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'LR') {
  const isHorizontal = direction === 'LR';
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  
  const nodeCount = nodes.length;
  let nodesep = 100;
  let ranksep = 150;
  
  // Adjust spacing based on node count
  if (nodeCount > 50) {
    nodesep = 200;
    ranksep = 250;
  } else if (nodeCount > 20) {
    nodesep = 150;
    ranksep = 200;
  }
  
  g.setGraph({ 
    rankdir: direction, 
    nodesep: nodesep, 
    ranksep: ranksep,
    marginx: 50,
    marginy: 50,
    align: 'UL',
    ranker: 'network-simplex',
  });

  nodes.forEach((n) => {
    const width = NODE_SIZE;
    const height = NODE_SIZE;
    g.setNode(n.id, { width, height });
  });
  
  edges.forEach((e) => {
    g.setEdge(e.source, e.target);
  });

  dagre.layout(g);

  let layoutedNodes = nodes.map((n) => {
    const nodeWithPosition = g.node(n.id);
    if (nodeWithPosition) {
      const { x, y } = nodeWithPosition;
      const width = NODE_SIZE;
      const height = NODE_SIZE;
      return {
        ...n,
        position: {
          x: x - width / 2,
          y: y - height / 2,
        },
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
      };
    }
    return n;
  });

  // Center parents relative to their children for both TB (vertical) and LR (horizontal)
  {
    const idToNode = new Map(layoutedNodes.map((n) => [n.id, n]));
    const childrenByParent = new Map<string, string[]>();
    edges.forEach((e) => {
      if (!childrenByParent.has(e.source)) childrenByParent.set(e.source, []);
      childrenByParent.get(e.source)!.push(e.target);
    });
    layoutedNodes = layoutedNodes.map((n) => {
      const childIds = childrenByParent.get(n.id);
      if (!childIds || childIds.length === 0) return n;
      const w = NODE_SIZE;
      const h = NODE_SIZE;
      const childNodes = childIds.map((cid) => idToNode.get(cid)).filter(Boolean) as any[];
      if (childNodes.length === 0) return n;

      if (!isHorizontal) {
        // TB: center X above children
        const childCentersX = childNodes.map((cn) => {
          const cw = NODE_SIZE;
          return cn.position.x + cw / 2;
        });
        const avgCX = childCentersX.reduce((a, b) => a + b, 0) / childCentersX.length;
        return { ...n, position: { ...n.position, x: avgCX - w / 2 } };
      } else {
        // LR: center Y beside children
        const childCentersY = childNodes.map((cn) => {
          const ch = NODE_SIZE;
          return cn.position.y + ch / 2;
        });
        const avgCY = childCentersY.reduce((a, b) => a + b, 0) / childCentersY.length;
        return { ...n, position: { ...n.position, y: avgCY - h / 2 } };
      }
    });
  }

  // Enforce a minimum same-rank spacing to avoid crowding when expanding children
  {
    const nodeCount = layoutedNodes.length;
    // Base gap is node width plus padding; scale slightly with graph size
    const baseGap = NODE_SIZE + 80;
    const scaledGap =
      nodeCount > 50 ? baseGap + 100 : nodeCount > 20 ? baseGap + 50 : baseGap;
    layoutedNodes = enforceSameRankSpacing(layoutedNodes, direction, scaledGap);
  }
  // Keep edges unchanged; positions handle side selection
  const layoutedEdges = edges;

  return { nodes: layoutedNodes, edges: layoutedEdges };
}

// Initial graph creation
const createInitialGraph = () => {
  const nodes: Node[] = [
    {
      id: 'root',
      type: 'custom',
      position: { x: 450, y: 300 },
      data: {
        label: 'Process Unit',
        icon: Engineering,
        color: PRIMARY_COLOR,
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
        color: PRIMARY_COLOR,
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
        color: PRIMARY_COLOR,
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
        color: PRIMARY_COLOR,
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
        color: PRIMARY_COLOR,
        size: 'large',
        type: 'Safety',
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: 'e-root-equipment',
      source: 'root',
      target: 'equipment',
      animated: false,
      style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
      label: 'monitors',
      labelStyle: { fontSize: 12, fontWeight: 700, fill: SECONDARY_COLOR },
      labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
      markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
    },
    {
      id: 'e-root-control',
      source: 'root',
      target: 'control',
      animated: false,
      style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
      label: 'manages',
      labelStyle: { fontSize: 12, fontWeight: 700, fill: SECONDARY_COLOR },
      labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
      markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
    },
    {
      id: 'e-root-sensors',
      source: 'root',
      target: 'sensors',
      animated: false,
      style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
      label: 'reads data',
      labelStyle: { fontSize: 12, fontWeight: 700, fill: SECONDARY_COLOR },
      labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
      markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
    },
    {
      id: 'e-root-alarms',
      source: 'root',
      target: 'alarms',
      animated: false,
      style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
      label: 'triggers',
      labelStyle: { fontSize: 12, fontWeight: 700, fill: SECONDARY_COLOR },
      labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
      markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
    },
  ];
  
  return { nodes, edges };
};

// Detail nodes
const detailNodes: { [key: string]: { nodes: Node[]; edges: Edge[] } } = {
  equipment: {
    nodes: [
      {
        id: 'temp1',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'TI-100', icon: Thermostat, color: SECONDARY_COLOR, size: 'medium', type: 'Temp' },
      },
      {
        id: 'pressure1',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'PI-101', icon: Speed, color: SECONDARY_COLOR, size: 'medium', type: 'Press' },
      },
    ],
    edges: [
      {
        id: 'e-equipment-temp1',
        source: 'equipment',
        target: 'temp1',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'measures',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
      {
        id: 'e-equipment-pressure1',
        source: 'equipment',
        target: 'pressure1',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'monitors',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
    ],
  },
  control: {
    nodes: [
      {
        id: 'loop1',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'PID-200', icon: Psychology, color: SECONDARY_COLOR, size: 'medium', type: 'Loop' },
      },
      {
        id: 'loop2',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'PID-201', icon: Settings, color: SECONDARY_COLOR, size: 'medium', type: 'Loop' },
      },
    ],
    edges: [
      {
        id: 'e-control-loop1',
        source: 'control',
        target: 'loop1',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'executes',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
      {
        id: 'e-control-loop2',
        source: 'control',
        target: 'loop2',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'runs',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      }
    ],
  },
  sensors: {
    nodes: [
      {
        id: 'ti100',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'TI-100', icon: Thermostat, color: SECONDARY_COLOR, size: 'medium', type: 'Input' },
      },
      {
        id: 'fi100',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'FI-100', icon: Opacity, color: SECONDARY_COLOR, size: 'medium', type: 'Flow' },
      },
    ],
    edges: [
      {
        id: 'e-sensors-ti100',
        source: 'sensors',
        target: 'ti100',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'reads',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
      {
        id: 'e-sensors-fi100',
        source: 'sensors',
        target: 'fi100',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'tracks',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
    ],
  },
  alarms: {
    nodes: [
      {
        id: 'alarm1',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'TAH-100', icon: Insights, color: SECONDARY_COLOR, size: 'medium', type: 'High' },
      },
      {
        id: 'alarm2',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'PAH-101', icon: TrendingUp, color: SECONDARY_COLOR, size: 'medium', type: 'Critical' },
      },
    ],
    edges: [
      {
        id: 'e-alarms-alarm1',
        source: 'alarms',
        target: 'alarm1',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'monitors',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
      {
        id: 'e-alarms-alarm2',
        source: 'alarms',
        target: 'alarm2',
        animated: false,
        style: { stroke: SECONDARY_COLOR, strokeWidth: 2 },
        label: 'watches',
        labelStyle: { fontSize: 11, fontWeight: 700, fill: SECONDARY_COLOR },
        labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: SECONDARY_COLOR },
      },
    ],
  },
};

const KnowledgeMapContent: React.FC = () => {
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();
  const isSmall = useMediaQuery('(max-width:600px)');

  // Prepare initial auto-layout so first paint is already organized
  const initialGraphRef = useRef(createInitialGraph());
  const initialLayoutRef = useRef(
    getLayoutedElements(initialGraphRef.current.nodes, initialGraphRef.current.edges, 'TB')
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayoutRef.current.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLayoutRef.current.edges);
  const [selectedNode, setSelectedNode] = useState<string | null>('root');
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB'); // Changed to TB (Vertical)

  // Apply auto layout using Dagre
  const applyAutoLayout = useCallback((direction: 'TB' | 'LR' = 'TB') => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    // Ensure viewport updates after DOM paints
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 500, includeHiddenNodes: true });
      });
    });
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
      // Check if this node has details
      if (detailNodes[node.id]) {
        const { nodes: newNodes, edges: newEdges } = detailNodes[node.id];
        const existingNodeIds = new Set(nodes.map((n) => n.id));
        const nodesToAdd = newNodes.filter((n) => !existingNodeIds.has(n.id));
        if (nodesToAdd.length > 0) {
          const existingEdgeIds = new Set(edges.map((e) => e.id));
          const edgesToAdd = newEdges.filter((e) => !existingEdgeIds.has(e.id));
          const allNodes = [...nodes, ...nodesToAdd];
          const allEdges = [...edges, ...edgesToAdd];
          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(allNodes, allEdges, layoutDirection);
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              reactFlowInstance.fitView({ padding: 0.2, duration: 500, includeHiddenNodes: true });
            });
          });
        }
      }
    },
    [nodes, edges, setNodes, setEdges, reactFlowInstance, layoutDirection]
  );

  const handleReset = useCallback(() => {
    const initial = createInitialGraph();
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initial.nodes, initial.edges, layoutDirection);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setSelectedNode('root');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 500, includeHiddenNodes: true });
      });
    });
  }, [setNodes, setEdges, reactFlowInstance, layoutDirection]);

  const handleLayoutDirectionChange = useCallback((direction: 'TB' | 'LR') => {
    setLayoutDirection(direction);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2, duration: 500, includeHiddenNodes: true });
      });
    });
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);

  // Auto focus when graph content changes (existing useEffect already calls fitView)
  useEffect(() => {
    if (!nodes.length) return;
    // Re-focus viewport whenever nodes/edges change (after layout settles)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: isSmall ? 0.1 : 0.15, duration: 500, includeHiddenNodes: true });
      });
    });
  }, [nodes.length, edges.length, isSmall]);

  // Header animation
  useEffect(() => {
    if (!headerRef.current) return;
    const header = headerRef.current;
    const items = Array.from(header.children);
    items.forEach((el, idx) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      setTimeout(() => {
        (el as HTMLElement).style.transition = 'all 0.6s ease-out';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, idx * 150);
    });
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: sectionPadding,
        position: 'relative',
        background: 'transparent',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: containerMaxWidth,
          px: containerPadding,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box ref={headerRef} sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="Interactive Knowledge Graph"
            sx={{
              mb: 2,
              fontSize: '0.875rem',
              fontWeight: 600,
              background: PRIMARY_COLOR,
              color: 'white',
              px: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: h2FontSize,
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#0F172A',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Navigate Your Process Knowledge
          </Typography>
          <Typography
            sx={{
              fontSize: bodyFontSize,
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#64748B',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Click on nodes to explore relationships between equipment, sensors, and control systems
          </Typography>
        </Box>

        <Paper
          elevation={isDark ? 0 : 12}
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 460, sm: 560, md: 650 },
            borderRadius: 4,
            overflow: 'visible',
            background: isDark
              ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isDark
              ? '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 25px 60px rgba(0, 0, 0, 0.12)',
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.Bezier}
            onInit={(instance) => {
              // First fit instantly to avoid showing any offset, then refine after paints
              instance.fitView({ padding: isSmall ? 0.1 : 0.2, duration: 0, includeHiddenNodes: true });
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  instance.fitView({ padding: isSmall ? 0.1 : 0.2, duration: 500, includeHiddenNodes: true });
                });
              });
            }}
            fitView
            fitViewOptions={{ padding: isSmall ? 0.1 : 0.2, duration: 800 }}
            style={{ width: '100%', height: '100%' }}
            minZoom={isSmall ? 0.25 : 0.4}
            maxZoom={isSmall ? 1.4 : 1.8}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            proOptions={{ hideAttribution: true }}
          >
            <Panel position="top-right">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Tooltip title="Zoom In" placement="left">
                  <IconButton
                    onClick={() => reactFlowInstance.zoomIn({ duration: 300 })}
                    sx={{
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(55, 65, 81, 0.95)' : 'rgba(249, 250, 251, 1)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ZoomIn sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Out" placement="left">
                  <IconButton
                    onClick={() => reactFlowInstance.zoomOut({ duration: 300 })}
                    sx={{
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(55, 65, 81, 0.95)' : 'rgba(249, 250, 251, 1)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ZoomOut sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Auto Layout" placement="left">
                  <IconButton
                    onClick={() => applyAutoLayout()}
                    sx={{
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(55, 65, 81, 0.95)' : 'rgba(249, 250, 251, 1)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ViewComfy sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Panel>

            <Panel position="top-left">
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Auto Layout">
                  <IconButton
                    onClick={() => applyAutoLayout('TB')}
                    sx={{
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(12px)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(55, 65, 81, 0.95)' : 'rgba(249, 250, 251, 1)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ViewComfy sx={{ color: isDark ? '#FFFFFF' : '#0F172A', fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Panel>

            <Background
              gap={20}
              size={1.5}
              color={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
            />
          </ReactFlow>
        </Paper>
      </Container>
    </Box>
  );
};

export const KnowledgeMapSection: React.FC = () => {
  return (
    <ReactFlowProvider>
      <KnowledgeMapContent />
    </ReactFlowProvider>
  );
};