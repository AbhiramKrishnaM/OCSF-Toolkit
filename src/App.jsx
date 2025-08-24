import { Routes, Route, Link, Navigate } from "react-router-dom";
import AiInput from "@/components/AiInput";
import SchemaVisualizerPage from "@/pages/SchemaVisualizerPage.jsx";

function App() {
  return (
    <>
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-semibold text-orange-400">OCSF Toolkit</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link to="/ai" className="hover:text-orange-300">AI</Link>
              <Link to="/visualizer" className="hover:text-orange-300">Schema Visualizer</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/visualizer" replace />} />
            <Route
              path="/ai"
              element={
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-2xl">
                    <AiInput />
                  </div>
                </div>
              }
            />
            <Route path="/visualizer" element={<SchemaVisualizerPage />} />
            <Route path="*" element={<Navigate to="/visualizer" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
