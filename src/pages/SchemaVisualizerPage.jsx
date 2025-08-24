import SchemaVisualizer from "@/components/SchemaVisualizer/SchemaVisualizer.jsx";

export default function SchemaVisualizerPage() {
  return (
    <div className="relative h-[calc(100vh-56px)]">{/* full viewport minus header */}
      <SchemaVisualizer />
    </div>
  );
}


