import React, { useState, useCallback } from 'react';
import { ReactFlow, addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './CyberSecFlow.css';
import { Button } from '@/components/ui/button';
import { Plus, Settings, AlertTriangle, Database, Bot } from 'lucide-react';
import WorkflowToolbar from './WorkflowToolbar';
import NodePalette from './NodePalette';
import WorkflowSidebar from './WorkflowSidebar';
import { initialNodes, initialEdges } from './workflowData';
import { nodeTypes } from './nodes';

const CyberSecFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${data.type}-${Date.now()}`,
        type: data.type,
        position,
        data: data.data,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const runWorkflow = async () => {
    setIsRunning(true);
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunning(false);
  };

  const saveWorkflow = () => {
    const workflowData = { nodes, edges };
    localStorage.setItem('cybersecflow-workflow', JSON.stringify(workflowData));
    // In a real app, this would save to backend
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-950">


      <div className="flex-1 flex">
        {/* Main Workflow Area - Full Width */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            className="bg-neutral-900 cybersecflow-canvas"
            proOptions={{ hideAttribution: true }}
            attributionPosition="bottom-left"
          >
            {/* Removed Controls, Background, and MiniMap for cleaner interface */}
          </ReactFlow>
        </div>

        {/* Right Sidebar - Workflow Details */}
        <WorkflowSidebar 
          selectedNode={selectedNode}
          nodes={nodes}
          edges={edges}
        />
      </div>

      {/* Floating Node Palette */}
      <NodePalette />

      {/* Bottom Toolbar */}
      <WorkflowToolbar />
    </div>
  );
};

export default CyberSecFlow;
