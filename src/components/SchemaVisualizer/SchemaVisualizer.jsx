import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCategories, getAllClasses } from "@/data/api/categories.js";
import { getAllObjects } from "@/data/api/objects.js";
import { API_CONFIG } from "@/config/api.js";

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
  const [classes, setClasses] = useState([]);
  const [objects, setObjects] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      setLoading(true);
      setError(null);
      try {
        const [cats, cls, objs] = await Promise.all([
          getCategories(),
          getAllClasses(),
          getAllObjects(),
        ]);
        if (!mounted) return;
        const toArray = (val) => {
          if (Array.isArray(val)) return val;
          if (val && Array.isArray(val.data)) return val.data;
          if (val && Array.isArray(val.categories)) return val.categories;
          if (val && typeof val === "object") return Object.values(val);
          return [];
        };
        setCategories(toArray(cats?.data));
        setClasses(toArray(cls?.data));
        setObjects(toArray(objs?.data));
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

  const filteredClasses = useMemo(() => {
    if (!query) return classes;
    const q = query.toLowerCase();
    return classes.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
    );
  }, [classes, query]);

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
            {Array.isArray(categories) && categories.map((cat) => (
              <li key={cat.name} className="py-2 flex items-center justify-between">
                <span className="truncate text-neutral-300">{cat.title || cat.name}</span>
                <span className="text-xs text-neutral-500">{cat.classes?.length ?? ''}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="lg:col-span-9 space-y-6">
        <Section
          title="Classes"
          right={<span className="text-xs text-neutral-500">{filteredClasses.length} results</span>}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(filteredClasses) && filteredClasses.slice(0, 60).map((c) => (
              <div key={c.name} className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-orange-400 truncate">{c.name}</div>
                  {typeof c.class_uid !== 'undefined' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">{c.class_uid}</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-neutral-400 line-clamp-3">{c.description}</div>
                {c.category && (
                  <div className="mt-2 text-[10px] text-neutral-500">{c.category}</div>
                )}
              </div>
            ))}
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
      </div>
    </div>
  );
}


