export default function ClassNode({ data }) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden">
      <div className="px-3 py-2 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-sm font-semibold text-neutral-200 truncate">{data.title}</div>
        {data.uid && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">{data.uid}</span>
        )}
      </div>
      <div className="p-3 text-xs text-neutral-400 line-clamp-3 min-w-[220px]">
        {data.subtitle}
      </div>
      <div className="px-3 py-2 text-xs bg-neutral-950/80 text-neutral-500 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
        extends: {data.extends || "base_event"}
      </div>
    </div>
  );
}


