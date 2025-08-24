import { useCallback, useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ClassNode from "../nodes/ClassNode.jsx";

const nodeTypes = { class: ClassNode };

export default function SchemaGraph({ categoryKey, classes, onSelectClass }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes = (classes || []).map((c, idx) => ({
      id: c.name,
      type: "class",
      data: {
        title: c.caption || c.name,
        subtitle: c.description || "",
        extends: c.extends,
        uid: c.uid,
        raw: c,
      },
      position: { x: (idx % 4) * 320, y: Math.floor(idx / 4) * 180 },
    }));

    const edges = (classes || [])
      .filter((c) => c.extends && c.extends !== c.name)
      .map((c) => ({
        id: `${c.name}->${c.extends}`,
        source: c.name,
        target: c.extends,
        animated: true,
        style: { stroke: "#f97316" },
      }));

    return { nodes, edges };
  }, [classes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    // Fit view whenever the graph data changes
    const id = setTimeout(() => {
      try { fitView({ padding: 0.2, includeHiddenNodes: true }); } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    onSelectClass?.(node?.data?.raw);
  }, [onSelectClass]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
      nodeTypes={nodeTypes}
      defaultEdgeOptions={{ style: { stroke: "#a3a3a3" } }}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#2a2a2a" gap={16} />
      <MiniMap pannable zoomable maskColor="rgba(10,10,10,0.7)" nodeColor="#f97316" />
      <Controls position="bottom-left" />
    </ReactFlow>
  );
}


