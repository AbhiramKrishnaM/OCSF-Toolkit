import React, { useState } from 'react';
import { Shield, AlertTriangle, Database, Bot, Network, FileText, Search, Zap, Lock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const nodeCategories = [
  {
    id: 'triggers',
    name: 'Triggers',
    icon: Zap,
    color: 'text-blue-400',
    nodes: [
      { type: 'alert-trigger', label: 'Alert Trigger', description: 'Start workflow on security alert' },
      { type: 'schedule-trigger', label: 'Schedule', description: 'Run workflow on schedule' },
      { type: 'webhook', label: 'Webhook', description: 'Trigger via HTTP webhook' },
      { type: 'file-watch', label: 'File Watch', description: 'Monitor file changes' }
    ]
  },
  {
    id: 'intelligence',
    name: 'Threat Intelligence',
    icon: Shield,
    color: 'text-red-400',
    nodes: [
      { type: 'ioc-lookup', label: 'IOC Lookup', description: 'Check indicators of compromise' },
      { type: 'threat-feed', label: 'Threat Feed', description: 'Fetch threat intelligence data' },
      { type: 'reputation-check', label: 'Reputation Check', description: 'Check IP/domain reputation' },
      { type: 'vulnerability-scan', label: 'Vulnerability Scan', description: 'Scan for vulnerabilities' }
    ]
  },
  {
    id: 'data',
    name: 'Data Processing',
    icon: Database,
    color: 'text-green-400',
    nodes: [
      { type: 'log-parser', label: 'Log Parser', description: 'Parse security logs' },
      { type: 'data-enrichment', label: 'Data Enrichment', description: 'Enrich with context' },
      { type: 'data-filter', label: 'Data Filter', description: 'Filter data by criteria' },
      { type: 'data-transform', label: 'Data Transform', description: 'Transform data format' }
    ]
  },
  {
    id: 'analysis',
    name: 'AI Analysis',
    icon: Bot,
    color: 'text-purple-400',
    nodes: [
      { type: 'anomaly-detection', label: 'Anomaly Detection', description: 'Detect unusual patterns' },
      { type: 'threat-scoring', label: 'Threat Scoring', description: 'Calculate threat scores' },
      { type: 'event-correlation', label: 'Event Correlation', description: 'Correlate related events' },
      { type: 'rag-query', label: 'RAG Query', description: 'Query security knowledge base' }
    ]
  },
  {
    id: 'response',
    name: 'Response Actions',
    icon: Lock,
    color: 'text-orange-400',
    nodes: [
      { type: 'block-ip', label: 'Block IP', description: 'Block malicious IP addresses' },
      { type: 'isolate-host', label: 'Isolate Host', description: 'Isolate compromised host' },
      { type: 'create-ticket', label: 'Create Ticket', description: 'Create incident ticket' },
      { type: 'send-notification', label: 'Send Alert', description: 'Send security notification' }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Network,
    color: 'text-cyan-400',
    nodes: [
      { type: 'siem-integration', label: 'SIEM', description: 'Integrate with SIEM systems' },
      { type: 'edr-integration', label: 'EDR', description: 'Endpoint detection & response' },
      { type: 'firewall-integration', label: 'Firewall', description: 'Network firewall control' },
      { type: 'ticketing-system', label: 'Ticketing', description: 'Incident management system' }
    ]
  }
];

const NodePalette = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openCategories, setOpenCategories] = useState(['triggers', 'intelligence']);

  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const onDragStart = (event, nodeType, nodeData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: nodeType,
      data: nodeData
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      {/* Hover Trigger Area */}
      <div 
        className="fixed left-0 top-0 w-8 h-full z-40 group"
        onMouseEnter={() => setIsVisible(true)}
      >
        {/* Visual indicator */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-neutral-600 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Floating Node Palette */}
      <div 
        className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl shadow-2xl w-72 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-800/50">
            <h3 className="text-lg font-semibold text-white mb-1">Workflow Nodes</h3>
            <p className="text-xs text-neutral-400">Drag nodes to build your security workflow</p>
          </div>
          
          {/* Node Categories */}
          <div className="p-3 space-y-2 max-h-[calc(80vh-80px)] overflow-y-auto">
            {nodeCategories.map((category) => {
              const IconComponent = category.icon;
              const isOpen = openCategories.includes(category.id);
              
              return (
                <Collapsible key={category.id} open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto bg-neutral-800 hover:bg-neutral-700 text-left rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${category.color}`} />
                        <span className="text-white font-medium text-sm">{category.name}</span>
                      </div>
                      <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-1 mt-2 ml-4">
                    {category.nodes.map((node) => (
                      <div
                        key={node.type}
                        draggable
                        onDragStart={(e) => onDragStart(e, node.type, { label: node.label })}
                        className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-md cursor-grab active:cursor-grabbing border border-neutral-700 hover:border-neutral-600 transition-colors"
                      >
                        <div className="text-sm font-medium text-white">{node.label}</div>
                        <div className="text-xs text-neutral-400 mt-1">{node.description}</div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NodePalette;
