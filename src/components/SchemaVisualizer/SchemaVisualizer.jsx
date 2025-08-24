import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCategories } from "@/data/api/categories.js";
import { getAllObjects } from "@/data/api/objects.js";
import { getExtensions, getVersions } from "@/data/api/schema.js";
import { API_CONFIG } from "@/config/api.js";
import SchemaGraph from "./graph/SchemaGraph.jsx";

function Section({ title, children, right }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
        <h3 className="text-sm font-medium text-neutral-300">{title}</h3>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function SchemaVisualizer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesRaw, setCategoriesRaw] = useState(null);
  const [objects, setObjects] = useState([]);
  const [query, setQuery] = useState("");
  const [versions, setVersions] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedExtension, setSelectedExtension] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      setLoading(true);
      setError(null);
      try {
        const [cats, vers, exts, objs] = await Promise.all([
          getCategories(),
          getVersions(),
          getExtensions(),
          getAllObjects(),
        ]);
        if (!mounted) return;
        const catsData = cats?.data;
        const attributes = catsData?.attributes || {};
        const list = Object.entries(attributes).map(([key, value]) => ({
          key,
          name: value?.name || key,
          caption: value?.caption || value?.name || key,
          uid: value?.uid,
          classesCount: value?.classes ? Object.keys(value.classes).length : 0,
        }));
        setCategories(list);
        setCategoriesRaw(attributes);
        setVersions(Array.isArray(vers?.data) ? vers.data : []);
        setExtensions(Array.isArray(exts?.data) ? exts.data : []);
        const initialVersion = (Array.isArray(vers?.data) ? vers.data : [])[0] || "";
        setSelectedVersion(initialVersion);
        if (list.length) setSelectedCategory(list[0].key);
        setObjects(Array.isArray(objs?.data) ? objs.data : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Failed to load OCSF data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const categoryClasses = useMemo(() => {
    if (!selectedCategory) return [];
    const cat = categoriesRaw?.[selectedCategory];
    const classesObj = cat?.classes || {};
    const arr = Object.entries(classesObj).map(([key, value]) => ({
      key,
      name: value?.name || key,
      caption: value?.caption || value?.name || key,
      description: value?.description || "",
      extends: value?.extends,
      uid: value?.uid,
      category_uid: value?.category_uid,
      profiles: value?.profiles || [],
      extension: value?.extension || null,
    }));
    return arr;
  }, [categoriesRaw, selectedCategory]);

  const filteredClasses = useMemo(() => {
    const q = query.toLowerCase();
    return categoryClasses.filter((c) => {
      const matchQuery = !q ||
        c.name?.toLowerCase().includes(q) ||
        c.caption?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q);
      const matchExt = !selectedExtension || c.extension === selectedExtension;
      return matchQuery && matchExt;
    });
  }, [categoryClasses, query, selectedExtension]);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-3 space-y-6">
        <Section
          title="Search"
          right={<span className="text-xs text-neutral-500">{API_CONFIG.BASE_URL}</span>}
        >
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search classes, categories..."
              className="w-full rounded-lg bg-neutral-950 border border-neutral-800 py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          {error && (
            <p className="mt-3 text-xs text-red-400">{String(error)}</p>
          )}
          {loading && (
            <p className="mt-3 text-xs text-neutral-400">Loading OCSF metadata…</p>
          )}
        </Section>

        <Section title="Categories">
          <ul className="max-h-72 overflow-auto text-sm divide-y divide-neutral-800">
            {Array.isArray(categories) && categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <li
                  key={cat.key}
                  className={`py-2 flex items-center justify-between cursor-pointer ${active ? 'text-orange-400' : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  <span className="truncate text-neutral-300">{cat.caption}</span>
                  <span className="text-xs text-neutral-500">{cat.classesCount}</span>
                </li>
              );
            })}
          </ul>
        </Section>
      </div>

      <div className="lg:col-span-9 space-y-6">
        <Section
          title="Visualizer"
          right={
            <div className="flex items-center gap-2">
              <select
                value={selectedExtension}
                onChange={(e) => setSelectedExtension(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded px-2 py-1"
              >
                <option value="">All extensions</option>
                {extensions.map((e) => (
                  <option key={e.name} value={e.name}>{e.caption || e.name}</option>
                ))}
              </select>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded px-2 py-1"
              >
                {versions.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          }
        >
          <div className="h-[70vh] rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950">
            <SchemaGraph
              categoryKey={selectedCategory}
              classes={filteredClasses}
              onSelectClass={setSelectedClass}
            />
          </div>
        </Section>

        <Section title="Objects">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(objects) && objects.slice(0, 30).map((o) => (
              <div key={o.name} className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="text-sm font-medium text-neutral-200 truncate">{o.name}</div>
                <div className="mt-1 text-xs text-neutral-400 line-clamp-3">{o.description}</div>
              </div>
            ))}
          </div>
        </Section>

        {selectedClass && (
          <div className="fixed right-6 bottom-6 z-20 w-96 rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur p-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-orange-400">{selectedClass.name}</div>
                <div className="text-xs text-neutral-400">{selectedClass.caption}</div>
              </div>
              <button
                className="text-neutral-400 hover:text-neutral-200"
                onClick={() => setSelectedClass(null)}
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-neutral-300 whitespace-pre-wrap">
              {selectedClass.description || "No description available."}
            </p>
            <div className="mt-3 text-xs text-neutral-500">
              Extends: {selectedClass.extends || 'base_event'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


