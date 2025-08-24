import { useState, useEffect } from "react";
import { generateMultipleClassSamples } from "@/data/api/sample.js";

export default function EventCorrelationPanel({ selectedClass, onClose }) {
  const [correlatedEvents, setCorrelatedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [correlationRules, setCorrelationRules] = useState([
    {
      id: 1,
      name: "Auth Failure → Network Activity",
      description: "Correlate authentication failures with subsequent network activity",
      sourceClass: "authentication",
      targetClass: "network_activity",
      conditions: [
        { field: "status_id", operator: "equals", value: "2" }, // Failed auth
        { field: "time", operator: "within", value: "5m" } // Within 5 minutes
      ],
      actions: ["create_incident", "block_ip", "isolate_host"]
    },
    {
      id: 2,
      name: "Process → File → Registry",
      description: "Track process activity leading to file and registry changes",
      sourceClass: "process_activity",
      targetClass: "file_activity",
      conditions: [
        { field: "activity_id", operator: "in", value: ["1", "2"] }, // Process start/inject
        { field: "time", operator: "within", value: "2m" }
      ],
      actions: ["enrich_threat_intel", "escalate_severity"]
    }
  ]);

  // Generate correlated events when a class is selected
  useEffect(() => {
    if (!selectedClass) return;
    
    let cancelled = false;
    async function generateCorrelated() {
      setLoading(true);
      try {
        // Find applicable correlation rules
        const applicableRules = correlationRules.filter(rule => 
          rule.sourceClass === selectedClass.name || rule.targetClass === selectedClass.name
        );
        
        if (applicableRules.length === 0) return;
        
        // Generate sample events for correlation
        const events = [];
        for (const rule of applicableRules.slice(0, 2)) {
          try {
            const sourceEvents = await generateMultipleClassSamples(rule.sourceClass, 2);
            const targetEvents = await generateMultipleClassSamples(rule.targetClass, 2);
            
            events.push({
              rule,
              source: sourceEvents.data || [],
              target: targetEvents.data || [],
              correlation: {
                confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
                reason: `Rule "${rule.name}" matched`,
                timestamp: new Date().toISOString()
              }
            });
          } catch (error) {
            console.warn(`Failed to generate events for rule: ${rule.name}`, error);
          }
        }
        
        if (!cancelled) {
          setCorrelatedEvents(events);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    generateCorrelated();
    return () => { cancelled = true; };
  }, [selectedClass, correlationRules]);

  const addCorrelationRule = () => {
    const newRule = {
      id: Date.now(),
      name: "New Correlation Rule",
      description: "Describe the correlation logic",
      sourceClass: "authentication",
      targetClass: "network_activity",
      conditions: [
        { field: "status_id", operator: "equals", value: "" }
      ],
      actions: ["create_incident"]
    };
    setCorrelationRules([...correlationRules, newRule]);
  };

  if (!selectedClass) return null;

  return (
    <div className="fixed left-6 bottom-6 z-30 w-96 max-h-[80vh] overflow-auto rounded-xl border border-neutral-800 bg-neutral-900/95 backdrop-blur p-4 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-orange-400">Event Correlation</div>
          <div className="text-xs text-neutral-400">for {selectedClass.caption}</div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-200" onClick={onClose}>✕</button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Correlation Rules */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-neutral-300">Correlation Rules</h4>
            <button 
              onClick={addCorrelationRule}
              className="text-xs px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
            >
              + Add Rule
            </button>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-auto">
            {correlationRules.map((rule) => (
              <div key={rule.id} className="p-2 rounded border border-neutral-800 bg-neutral-950 text-xs">
                <div className="font-medium text-neutral-200">{rule.name}</div>
                <div className="text-neutral-400 mt-1">{rule.description}</div>
                <div className="text-neutral-500 mt-1">
                  {rule.sourceClass} → {rule.targetClass}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Correlated Events */}
        <div>
          <h4 className="text-xs font-medium text-neutral-300 mb-2">Correlated Events</h4>
          
          {loading ? (
            <div className="text-xs text-neutral-500">Analyzing correlations...</div>
          ) : correlatedEvents.length > 0 ? (
            <div className="space-y-3 max-h-48 overflow-auto">
              {correlatedEvents.map((correlation, idx) => (
                <div key={idx} className="p-3 rounded border border-neutral-800 bg-neutral-950">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-orange-400">
                      {correlation.rule.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {Math.round(correlation.correlation.confidence * 100)}%
                    </span>
                  </div>
                  
                  <div className="text-xs text-neutral-400 mb-2">
                    {correlation.correlation.reason}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-neutral-500">Source ({correlation.source.length})</div>
                      <div className="text-neutral-300 truncate">
                        {correlation.source[0]?.activity_name || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Target ({correlation.target.length})</div>
                      <div className="text-neutral-300 truncate">
                        {correlation.target[0]?.activity_name || 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex gap-1">
                    {correlation.rule.actions.map((action, actionIdx) => (
                      <span key={actionIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-neutral-500">No correlations found for this class</div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-xs font-medium text-neutral-300 mb-2">Quick Actions</h4>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white">
              Create Incident
            </button>
            <button className="text-xs px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300">
              Enrich Intel
            </button>
            <button className="text-xs px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300">
              Export Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
