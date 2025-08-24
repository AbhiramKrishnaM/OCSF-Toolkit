import { useEffect, useMemo, useState } from "react";
import { getClassByName } from "@/data/api/categories.js";
import { getClassSample, generateMultipleClassSamples } from "@/data/api/sample.js";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockItem,
} from "@/components/ui/kibo-ui/code-block";

export default function ClassDetailsDrawer({ cls, onClose }) {
  const [activeTab, setActiveTab] = useState("schema");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    if (!cls) return;
    let cancelled = false;
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await getClassByName(cls.name);
        if (!cancelled) setDetails(res.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchDetails();
    return () => { cancelled = true; };
  }, [cls]);

  const jsonSchema = useMemo(() => {
    if (!details) return null;
    // The API returns a class definition; expose it as-is for now
    return details;
  }, [details]);

  const requiredTemplate = useMemo(() => {
    if (!details) return null;
    const props = details.properties || {};
    const required = new Set(details.required || []);
    const out = {};
    Object.keys(props).forEach((key) => {
      if (required.has(key)) out[key] = `{{${props[key]?.type || 'any'}}}`;
    });
    return out;
  }, [details]);

  async function handleGenerate(n = 1) {
    try {
      const res = await generateMultipleClassSamples(cls.name, n);
      setSamples(res.data || []);
      setActiveTab("sample");
    } catch {}
  }

  if (!cls) return null;

  const currentJson = activeTab === 'schema'
    ? jsonSchema
    : activeTab === 'template'
    ? requiredTemplate
    : (samples.length ? samples : (cls.sample || {}));

  return (
    <div className="fixed right-6 bottom-6 z-30 w-[720px] max-h-[80vh] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/95 backdrop-blur p-4 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-orange-400">{cls.name}</div>
          <div className="text-xs text-neutral-400">{cls.caption}</div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-200" onClick={onClose}>✕</button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <button onClick={() => setActiveTab("schema")} className={`px-2 py-1 rounded ${activeTab==='schema' ? 'bg-neutral-800 text-neutral-200':'bg-neutral-950 text-neutral-400'}`}>Schema</button>
        <button onClick={() => setActiveTab("sample")} className={`px-2 py-1 rounded ${activeTab==='sample' ? 'bg-neutral-800 text-neutral-200':'bg-neutral-950 text-neutral-400'}`}>Sample</button>
        <button onClick={() => setActiveTab("template")} className={`px-2 py-1 rounded ${activeTab==='template' ? 'bg-neutral-800 text-neutral-200':'bg-neutral-950 text-neutral-400'}`}>Template</button>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => handleGenerate(1)} className="px-2 py-1 rounded bg-neutral-800">Generate 1</button>
          <button onClick={() => handleGenerate(5)} className="px-2 py-1 rounded bg-neutral-800">Generate 5</button>
        </div>
      </div>

      <div className="mt-3 rounded border border-neutral-800 bg-neutral-950">
        {loading ? (
          <div className="p-3 text-xs text-neutral-500">Loading…</div>
        ) : (
          <CodeBlock
            className="h-[60vh]"
            data={[{ language: 'json', filename: 'data.json', code: JSON.stringify(currentJson, null, 2) }]}
            defaultValue="json"
          >
            <CodeBlockBody className="h-full">
              {(item) => (
                <CodeBlockItem value={item.language} className="h-full overflow-auto">
                  <CodeBlockContent language="json">
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        )}
      </div>
    </div>
  );
}


