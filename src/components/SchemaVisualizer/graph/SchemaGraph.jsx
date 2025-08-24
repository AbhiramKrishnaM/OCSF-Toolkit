import { useCallback, useMemo } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function ClassNode({ data }) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 shadow-sm overflow-hidden">
      <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-200 truncate">{data.title}</div>
        {data.uid && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">{data.uid}</span>
        )}
      </div>
      <div className="p-3 text-xs text-neutral-400 line-clamp-3 min-w-[220px]">
        {data.subtitle}
      </div>
      <div className="px-3 py-2 text-xs bg-neutral-950/80 text-neutral-500">
        extends: {data.extends || "base_event"}
      </div>
    </div>
  );
}

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


