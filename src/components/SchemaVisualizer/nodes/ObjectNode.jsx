export default function ObjectNode({ data }) {
  return (
    <div className="rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-300 min-w-[160px]">
      <div className="font-medium text-neutral-200 truncate">{data.title}</div>
      <div className="mt-1 text-[10px] text-neutral-500">object</div>
    </div>
  );
}


