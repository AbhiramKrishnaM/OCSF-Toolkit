import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ClassNode from "../nodes/ClassNode.jsx";
import ObjectNode from "../nodes/ObjectNode.jsx";
import BaseNode from "../nodes/BaseNode.jsx";

const nodeTypes = { class: ClassNode, object: ObjectNode, base: BaseNode };

export default function SchemaGraph({ categoryKey, classes, objects = [], compositionMap = {}, onSelectClass, onContextMenu }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];

    // 1) Base/parent nodes from extends
    const baseNames = new Set((classes || []).map((c) => c.extends || categoryKey).filter(Boolean));
    Array.from(baseNames).forEach((base, idx) => {
      nodes.push({
        id: `base:${base}`,
        type: "base",
        data: { title: base },
        position: { x: idx * 360, y: 20 },
      });
    });

    // 2) Class nodes arranged in a grid with consistent spacing
    const cols = 2; // wider nodes → fewer columns
    const xGap = 620;
    const yGap = 210;
    (classes || []).forEach((c, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      nodes.push({
        id: c.name,
        type: "class",
        data: {
          title: c.caption || c.name,
          subtitle: c.description || "",
          extends: c.extends,
          uid: c.uid,
          deprecated: Boolean(c["@deprecated"]),
          profiles: c.profiles || [],
          raw: c,
        },
        position: { x: 40 + col * xGap, y: 120 + row * yGap },
      });

      const parent = c.extends || categoryKey;
      if (parent) {
        edges.push({
          id: `e:${c.name}->base:${parent}`,
          source: `base:${parent}`,
          target: c.name,
          type: "smoothstep",
          animated: false,
          style: { stroke: "#f97316", opacity: 0.7 },
        });
      }
    });

    // 3) Object nodes and composition edges
    const objectNameToObj = new Map((objects || []).map((o) => [o.name, o]));
    const usedObjectNames = new Set();
    Object.entries(compositionMap || {}).forEach(([className, objectNames]) => {
      objectNames.forEach((objName) => {
        if (!objectNameToObj.has(objName)) return;
        usedObjectNames.add(objName);
        edges.push({
          id: `e:${className}->obj:${objName}`,
          source: className,
          target: `obj:${objName}`,
          type: "smoothstep",
          animated: false,
          style: { stroke: "#a3a3a3", opacity: 0.5 },
        });
      });
    });
    Array.from(usedObjectNames).forEach((name, idx) => {
      nodes.push({
        id: `obj:${name}`,
        type: "object",
        data: { title: name },
        position: { x: (idx % 4) * 300, y: 140 + (Math.ceil((classes?.length || 0) / cols) + 1) * yGap },
      });
    });

    return { nodes, edges };
  }, [classes, objects, compositionMap, categoryKey]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const rfInstanceRef = useRef(null);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    // Fit view whenever the graph data changes (after instance is available)
    const id = setTimeout(() => {
      try {
        rfInstanceRef.current?.fitView({ padding: 0.2, includeHiddenNodes: true });
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleInit = useCallback((instance) => {
    rfInstanceRef.current = instance;
    try {
      instance.fitView({ padding: 0.2, includeHiddenNodes: true });
    } catch {}
  }, []);

  const onNodeClick = useCallback((_, node) => {
    onSelectClass?.(node?.data?.raw);
  }, [onSelectClass]);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    onContextMenu?.({ x: event.clientX, y: event.clientY, cls: node?.data?.raw });
  }, [onContextMenu]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={handleInit}
      onNodeClick={onNodeClick}
      onNodeContextMenu={onNodeContextMenu}
      fitView
      nodeTypes={nodeTypes}
      defaultEdgeOptions={{ style: { stroke: "#a3a3a3" } }}
      proOptions={{ hideAttribution: true }}
    >
      {/* Background grid only; hide minimap/controls as requested */}
      <Background color="#2a2a2a" gap={16} />
    </ReactFlow>
  );
}


