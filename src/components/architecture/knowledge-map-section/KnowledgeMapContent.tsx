import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Box, Container, Paper, useMediaQuery } from '@mui/material';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import type { Node, Edge, DefaultEdgeOptions } from 'reactflow';
import 'reactflow/dist/style.css';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { useResponsiveLayout } from '../../../hooks/useResponsiveLayout';
import { themeConfig, withOpacity } from '../../shared/themeConfig';
import { KnowledgeNode } from './KnowledgeNode';
import { ProEdge } from './ProEdge';
import { GraphControls } from './GraphControls';
import { KnowledgeMapHeader } from './KnowledgeMapHeader';
import { getLayoutedElements } from './layoutUtils';
import {
  createInitialGraph,
  getDetailNodes,
  getPrimaryColor,
} from './knowledgeMapConfig';

const { borderRadius, shadows } = themeConfig;

const nodeTypes = {
  custom: KnowledgeNode,
};

const edgeTypes = {
  'pro-edge': ProEdge,
};

const getDefaultEdgeOptions = (isDark: boolean): DefaultEdgeOptions => ({
  type: 'pro-edge',
  animated: false,
  style: { strokeWidth: 3, strokeLinecap: 'round' as const },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: getPrimaryColor(isDark),
    width: 14,
    height: 14,
  },
});

export const KnowledgeMapContent: React.FC = () => {
  const { isDark } = useThemeMode();
  const {
    containerMaxWidth,
    containerPadding,
    h2FontSize,
    bodyFontSize,
    sectionPadding,
  } = useResponsiveLayout();
  const isSmall = useMediaQuery('(max-width:600px)');
  const reactFlowInstance = useReactFlow();

  const initialGraphRef = useRef(createInitialGraph(isDark));
  const initialLayoutRef = useRef(
    getLayoutedElements(
      initialGraphRef.current.nodes,
      initialGraphRef.current.edges,
      'TB'
    )
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialLayoutRef.current.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialLayoutRef.current.edges
  );
  const [selectedNode, setSelectedNode] = useState<string | null>('root');
  const [layoutDirection] = useState<'TB' | 'LR'>('TB');

  const detailNodes = getDetailNodes(isDark);

  const applyAutoLayout = useCallback(
    (direction: 'TB' | 'LR' = 'TB') => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reactFlowInstance.fitView({
            padding: 0.2,
            duration: 500,
            includeHiddenNodes: true,
          });
        });
      });
    },
    [nodes, edges, setNodes, setEdges, reactFlowInstance]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
      if (detailNodes[node.id]) {
        const { nodes: newNodes, edges: newEdges } = detailNodes[node.id];
        const existingNodeIds = new Set(nodes.map((n) => n.id));
        const nodesToAdd = newNodes.filter((n) => !existingNodeIds.has(n.id));
        if (nodesToAdd.length > 0) {
          const existingEdgeIds = new Set(edges.map((e) => e.id));
          const edgesToAdd = newEdges.filter((e) => !existingEdgeIds.has(e.id));
          const allNodes = [...nodes, ...nodesToAdd];
          const allEdges = [...edges, ...edgesToAdd];
          const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(allNodes, allEdges, layoutDirection);
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              reactFlowInstance.fitView({
                padding: 0.2,
                duration: 500,
                includeHiddenNodes: true,
              });
            });
          });
        }
      }
    },
    [nodes, edges, setNodes, setEdges, reactFlowInstance, layoutDirection, detailNodes]
  );

  useEffect(() => {
    if (!nodes.length) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({
          padding: isSmall ? 0.1 : 0.15,
          duration: 500,
          includeHiddenNodes: true,
        });
      });
    });
  }, [nodes.length, edges.length, isSmall, reactFlowInstance]);

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
        <KnowledgeMapHeader h2FontSize={h2FontSize} bodyFontSize={bodyFontSize} />

        <Paper
          elevation={isDark ? 0 : 12}
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 460, sm: 560, md: 650 },
            borderRadius: borderRadius.xl,
            overflow: 'visible',
            background: isDark
              ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: isDark
              ? `1px solid ${withOpacity('#FFFFFF', 0.08)}`
              : `1px solid ${withOpacity('#000000', 0.06)}`,
            boxShadow: isDark
              ? `${shadows.dark.xl}, inset 0 1px 0 ${withOpacity('#FFFFFF', 0.05)}`
              : shadows.light.xl,
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
            defaultEdgeOptions={getDefaultEdgeOptions(isDark)}
            connectionLineType={ConnectionLineType.Bezier}
            onInit={(instance) => {
              instance.fitView({
                padding: isSmall ? 0.1 : 0.2,
                duration: 0,
                includeHiddenNodes: true,
              });
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  instance.fitView({
                    padding: isSmall ? 0.1 : 0.2,
                    duration: 500,
                    includeHiddenNodes: true,
                  });
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
            <GraphControls
              onZoomIn={() => reactFlowInstance.zoomIn({ duration: 300 })}
              onZoomOut={() => reactFlowInstance.zoomOut({ duration: 300 })}
              onAutoLayout={() => applyAutoLayout('TB')}
            />
            <Background
              gap={20}
              size={1.5}
              color={
                isDark
                  ? withOpacity('#FFFFFF', 0.06)
                  : withOpacity('#000000', 0.04)
              }
            />
          </ReactFlow>
        </Paper>
      </Container>
    </Box>
  );
};