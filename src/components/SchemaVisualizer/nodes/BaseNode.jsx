import { Handle, Position } from "@xyflow/react";
export default function BaseNode({ data }) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-2 text-sm text-orange-400 font-semibold">
      <div>{data.title}</div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}


