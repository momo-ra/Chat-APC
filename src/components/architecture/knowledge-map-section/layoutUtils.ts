import dagre from 'dagre';
import type { Node, Edge, Position } from 'reactflow';
import { NODE_SIZE } from './knowledgeMapConfig';

function enforceSameRankSpacing(
  nodes: Node[],
  direction: 'TB' | 'LR',
  minGap: number
) {
  const tol = 16;
  type RankKey = string;
  const byRank = new Map<RankKey, Node[]>();

  nodes.forEach((n) => {
    const cx = n.position.x + NODE_SIZE / 2;
    const cy = n.position.y + NODE_SIZE / 2;
    const keyVal = direction === 'LR' ? cx : cy;
    const bucket = Math.round(keyVal / tol);
    const key = `${bucket}`;
    if (!byRank.has(key)) byRank.set(key, []);
    byRank.get(key)!.push(n);
  });

  byRank.forEach((group) => {
    if (group.length < 2) return;

    if (direction === 'TB') {
      group.sort(
        (a, b) =>
          a.position.x + NODE_SIZE / 2 - (b.position.x + NODE_SIZE / 2)
      );
      let lastCenterX = group[0].position.x + NODE_SIZE / 2;
      for (let i = 1; i < group.length; i++) {
        const n = group[i];
        let cx = n.position.x + NODE_SIZE / 2;
        if (cx - lastCenterX < minGap) {
          const needed = minGap - (cx - lastCenterX);
          n.position.x += needed;
          cx = n.position.x + NODE_SIZE / 2;
        }
        lastCenterX = cx;
      }
    } else {
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
          n.position.y += needed;
          cy = n.position.y + NODE_SIZE / 2;
        }
        lastCenterY = cy;
      }
    }
  });

  return nodes;
}

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'LR'
): { nodes: Node[]; edges: Edge[] } {
  const isHorizontal = direction === 'LR';
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));

  const nodeCount = nodes.length;
  let nodesep = 100;
  let ranksep = 150;

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
    g.setNode(n.id, { width: NODE_SIZE, height: NODE_SIZE });
  });

  edges.forEach((e) => {
    g.setEdge(e.source, e.target);
  });

  dagre.layout(g);

  let layoutedNodes = nodes.map((n) => {
    const nodeWithPosition = g.node(n.id);
    if (nodeWithPosition) {
      const { x, y } = nodeWithPosition;
      return {
        ...n,
        position: {
          x: x - NODE_SIZE / 2,
          y: y - NODE_SIZE / 2,
        },
        sourcePosition: isHorizontal ? ('right' as Position) : ('bottom' as Position),
        targetPosition: isHorizontal ? ('left' as Position) : ('top' as Position),
      };
    }
    return n;
  });

  // Center parents relative to children
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
      const childNodes = childIds
        .map((cid) => idToNode.get(cid))
        .filter(Boolean) as Node[];
      if (childNodes.length === 0) return n;

      if (!isHorizontal) {
        const childCentersX = childNodes.map((cn) => cn.position.x + NODE_SIZE / 2);
        const avgCX =
          childCentersX.reduce((a, b) => a + b, 0) / childCentersX.length;
        return { ...n, position: { ...n.position, x: avgCX - NODE_SIZE / 2 } };
      } else {
        const childCentersY = childNodes.map((cn) => cn.position.y + NODE_SIZE / 2);
        const avgCY =
          childCentersY.reduce((a, b) => a + b, 0) / childCentersY.length;
        return { ...n, position: { ...n.position, y: avgCY - NODE_SIZE / 2 } };
      }
    });
  }

  // Enforce minimum same-rank spacing
  {
    const nodeCount = layoutedNodes.length;
    const baseGap = NODE_SIZE + 80;
    const scaledGap =
      nodeCount > 50 ? baseGap + 100 : nodeCount > 20 ? baseGap + 50 : baseGap;
    layoutedNodes = enforceSameRankSpacing(layoutedNodes, direction, scaledGap);
  }

  return { nodes: layoutedNodes, edges: edges };
}