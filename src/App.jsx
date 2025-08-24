import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import AiInput from "@/components/AiInput";
import SchemaVisualizerPage from "@/pages/SchemaVisualizerPage.jsx";
import DataQualityDashboardPage from "@/pages/DataQualityDashboardPage.jsx";
import CyberSecFlowPage from "@/pages/CyberSecFlowPage.jsx";

function App() {
  const location = useLocation();
  
  return (
    <>
      <div className="min-h-screen bg-neutral-950 text-neutral-100">
                  <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img src="/dashboard.svg" alt="OCSF Toolkit" className="w-6 h-6" />
              </Link>
              <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-sm">
                {/* <Link to="/ai" className="hover:text-orange-300">AI</Link> */}
                <Link
                  to="/visualizer"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/visualizer'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'hover:text-orange-300'
                  }`}
                >
                  Visualizer
                </Link>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'hover:text-orange-300'
                  }`}
                >
                  Data Quality
                </Link>
                <Link
                  to="/cybersecflow"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/cybersecflow'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'hover:text-orange-300'
                  }`}
                >
                  CyberSecFlow
                </Link>
              </nav>
            </div>
          </header>
        <main className="px-0 py-0">
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
            <Route path="/dashboard" element={<DataQualityDashboardPage />} />
            <Route path="/cybersecflow" element={<CyberSecFlowPage />} />
            <Route path="*" element={<Navigate to="/visualizer" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
