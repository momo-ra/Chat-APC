import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { KnowledgeMapContent } from './knowledge-map-section/KnowledgeMapContent';

export const KnowledgeMapSection: React.FC = () => {
  return (
    <ReactFlowProvider>
      <KnowledgeMapContent />
    </ReactFlowProvider>
  );
};