import { Handle, Position } from "@xyflow/react";
export default function ClassNode({ data }) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden w-[560px]">
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-200 truncate">{data.title}</div>
        {data.uid && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">{data.uid}</span>
        )}
      </div>
      <div className="p-3 text-xs text-neutral-400 line-clamp-3 min-w-[220px]">
        {data.subtitle}
      </div>
      <div className="px-3 py-2 text-xs bg-neutral-950/80 text-neutral-500 flex flex-wrap items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
        <span>extends: {data.extends || "base_event"}</span>
        {Array.isArray(data.profiles) && data.profiles.slice(0,3).map((p) => (
          <span key={p} className="ml-1 rounded-full bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-300">{p}</span>
        ))}
        {typeof data.requiredCount === 'number' && typeof data.totalProps === 'number' && (
          <span className="ml-auto rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] text-neutral-300">req {data.requiredCount}/{data.totalProps}</span>
        )}
        {data.deprecated && (
          <span className="rounded bg-red-900/40 px-1.5 py-0.5 text-[10px] text-red-300">deprecated</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}


