import { useState, useEffect, useMemo } from "react";
import { getClassSample } from "@/data/api/sample.js";

export default function ThreatHuntingPanel({ selectedClass, onClose }) {
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [investigationPath, setInvestigationPath] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pre-built threat hunting workflows
  const huntingWorkflows = useMemo(() => [
    {
      id: "malware_investigation",
      name: "Malware Investigation",
      description: "Investigate potential malware activity through process, file, and registry analysis",
      steps: [
        {
          step: 1,
          title: "Process Analysis",
          description: "Examine suspicious process activity",
          class: "process_activity",
          indicators: ["process_injection", "suspicious_parent", "unusual_behavior"],
          actions: ["enrich_process", "check_reputation", "isolate_host"]
        },
        {
          step: 2,
          title: "File Activity",
          description: "Analyze file modifications and access patterns",
          class: "file_activity",
          indicators: ["suspicious_extension", "temp_directory", "system_files"],
          actions: ["scan_file", "check_hash", "quarantine"]
        },
        {
          step: 3,
          title: "Registry Analysis",
          description: "Check for persistence mechanisms and configuration changes",
          class: "win/registry_key_activity",
          indicators: ["startup_keys", "persistence", "suspicious_values"],
          actions: ["backup_registry", "remove_keys", "monitor_changes"]
        },
        {
          step: 4,
          title: "Network Activity",
          description: "Investigate network connections and communication",
          class: "network_activity",
          indicators: ["unusual_ports", "suspicious_domains", "data_exfiltration"],
          actions: ["block_ips", "monitor_traffic", "capture_pcaps"]
        }
      ]
    },
    {
      id: "credential_theft",
      name: "Credential Theft Investigation",
      description: "Investigate potential credential harvesting and account compromise",
      steps: [
        {
          step: 1,
          title: "Authentication Events",
          description: "Analyze login patterns and failures",
          class: "authentication",
          indicators: ["multiple_failures", "unusual_times", "suspicious_locations"],
          actions: ["reset_password", "enable_mfa", "monitor_account"]
        },
        {
          step: 2,
          title: "Process Memory",
          description: "Check for credential dumping tools",
          class: "memory_activity",
          indicators: ["lsass_access", "credential_tools", "memory_dumps"],
          actions: ["kill_process", "scan_memory", "update_defenses"]
        },
        {
          step: 3,
          title: "File Access",
          description: "Monitor access to credential files",
          class: "file_activity",
          indicators: ["credential_files", "config_access", "backup_files"],
          actions: ["secure_files", "audit_access", "encrypt_data"]
        }
      ]
    },
    {
      id: "lateral_movement",
      name: "Lateral Movement Investigation",
      description: "Track attacker movement across systems and accounts",
      steps: [
        {
          step: 1,
          title: "Account Changes",
          description: "Monitor for suspicious account modifications",
          class: "account_change",
          indicators: ["privilege_escalation", "new_accounts", "group_changes"],
          actions: ["review_changes", "revert_privileges", "audit_accounts"]
        },
        {
          step: 2,
          title: "Remote Access",
          description: "Check for unauthorized remote connections",
          class: "rdp_activity",
          indicators: ["unusual_connections", "after_hours", "suspicious_users"],
          actions: ["block_ips", "disable_rdp", "monitor_sessions"]
        },
        {
          step: 3,
          title: "Service Manipulation",
          description: "Investigate service creation and modification",
          class: "win/windows_service_activity",
          indicators: ["new_services", "suspicious_paths", "privileged_services"],
          actions: ["disable_service", "investigate_path", "restore_defaults"]
        }
      ]
    }
  ], []);

  // Auto-select workflow based on selected class
  useEffect(() => {
    if (!selectedClass) return;
    
    const applicableWorkflow = huntingWorkflows.find(workflow => 
      workflow.steps.some(step => step.class === selectedClass.name)
    );
    
    if (applicableWorkflow) {
      setActiveWorkflow(applicableWorkflow);
      startInvestigation(applicableWorkflow, selectedClass);
    }
  }, [selectedClass, huntingWorkflows]);

  const startInvestigation = async (workflow, startingClass) => {
    setLoading(true);
    const path = [];
    
    try {
      // Only generate samples for the active step to avoid unnecessary API calls
      for (const step of workflow.steps) {
        const isActive = step.class === startingClass.name;
        
        let events = [];
        if (isActive) {
          try {
            // Try to get a single sample for the active step
            const response = await getClassSample(step.class);
            events = response.data ? [response.data] : [];
          } catch {
            // If API fails, create a mock event structure
            console.warn(`No samples available for ${step.class}, using mock data`);
            events = [{
              activity_name: `${step.class} sample`,
              timestamp: new Date().toISOString(),
              status: 'mock_data'
            }];
          }
        }
        
        path.push({
          ...step,
          events,
          status: isActive ? 'active' : 'pending',
          timestamp: new Date().toISOString()
        });
      }
      
      setInvestigationPath(path);
    } catch (error) {
      console.warn('Failed to generate investigation path:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeAction = (action, step) => {
    // Simulate action execution
    console.log(`Executing action: ${action} for step: ${step.title}`);
    
    // In real implementation, this would call backend APIs
    const actionResults = {
      'enrich_process': 'Process enriched with threat intel',
      'scan_file': 'File scanned, no threats detected',
      'block_ips': 'IP addresses blocked successfully',
      'reset_password': 'Password reset initiated',
      'isolate_host': 'Host isolated from network'
    };
    
    alert(`${action}: ${actionResults[action] || 'Action completed'}`);
  };

  if (!selectedClass) return null;

  return (
    <div className="fixed left-6 top-6 z-30 w-[480px] max-h-[85vh] overflow-auto rounded-xl border border-neutral-800 bg-neutral-900/95 backdrop-blur p-4 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-orange-400">Threat Hunting</div>
          <div className="text-xs text-neutral-400">Investigation workflows for {selectedClass.caption}</div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-200" onClick={onClose}>✕</button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Workflow Selection */}
        <div>
          <h4 className="text-xs font-medium text-neutral-300 mb-2">Investigation Workflows</h4>
          <div className="space-y-2">
            {huntingWorkflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => {
                  setActiveWorkflow(workflow);
                  startInvestigation(workflow, selectedClass);
                }}
                className={`w-full text-left p-3 rounded border text-xs transition-colors ${
                  activeWorkflow?.id === workflow.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'
                }`}
              >
                <div className="font-medium text-neutral-200">{workflow.name}</div>
                <div className="text-neutral-400 mt-1">{workflow.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Investigation Path */}
        {activeWorkflow && (
          <div>
            <h4 className="text-xs font-medium text-neutral-300 mb-2">Investigation Path</h4>
            
            {loading ? (
              <div className="text-xs text-neutral-500">Building investigation path...</div>
            ) : (
              <div className="space-y-3">
                {investigationPath.map((step) => (
                  <div key={step.step} className="p-3 rounded border border-neutral-800 bg-neutral-950">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                          step.status === 'active' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-neutral-700 text-neutral-300'
                        }`}>
                          {step.step}
                        </span>
                        <span className="text-xs font-medium text-neutral-200">{step.title}</span>
                      </div>
                      {step.status === 'active' && (
                        <span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">
                          Active
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-neutral-400 mb-2">{step.description}</div>
                    
                    {/* Indicators */}
                    <div className="mb-2">
                      <div className="text-[10px] text-neutral-500 mb-1">Key Indicators:</div>
                      <div className="flex flex-wrap gap-1">
                        {step.indicators.map((indicator, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div>
                      <div className="text-[10px] text-neutral-500 mb-1">Recommended Actions:</div>
                      <div className="flex flex-wrap gap-1">
                        {step.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => executeAction(action, step)}
                            className="text-[10px] px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sample Events */}
                    {step.events.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-neutral-800">
                        <div className="text-[10px] text-neutral-500 mb-1">
                          Sample Events ({step.events.length})
                          {step.events[0]?.status === 'mock_data' && (
                            <span className="ml-1 text-yellow-400">(Mock Data)</span>
                          )}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {step.events[0]?.activity_name || 'N/A'}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h4 className="text-xs font-medium text-neutral-300 mb-2">Investigation Tools</h4>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white">
              Export Timeline
            </button>
            <button className="text-xs px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300">
              Create Case
            </button>
            <button className="text-xs px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300">
              Share Findings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
