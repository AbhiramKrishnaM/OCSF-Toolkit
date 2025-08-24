import React, { useState } from 'react';
import { Settings, Play, Pause, Trash2, Copy, Eye, AlertTriangle, Database, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WorkflowSidebar = ({ selectedNode, nodes, edges }) => {
  const [activeTab, setActiveTab] = useState('properties');

  if (!selectedNode) {
    return null; // Don't show anything when no node is selected
  }

  const getNodeIcon = (type) => {
    if (type.includes('trigger')) return <Play className="w-4 h-4" />;
    if (type.includes('intelligence') || type.includes('ioc') || type.includes('threat')) return <Shield className="w-4 h-4" />;
    if (type.includes('data') || type.includes('log') || type.includes('enrichment')) return <Database className="w-4 h-4" />;
    if (type.includes('ai') || type.includes('anomaly') || type.includes('rag')) return <Bot className="w-4 h-4" />;
    if (type.includes('response') || type.includes('block') || type.includes('isolate')) return <AlertTriangle className="w-4 h-4" />;
    return <Settings className="w-4 h-4" />;
  };

  const getNodeColor = (type) => {
    if (type.includes('trigger')) return 'text-blue-400';
    if (type.includes('intelligence') || type.includes('ioc') || type.includes('threat')) return 'text-red-400';
    if (type.includes('data') || type.includes('log') || type.includes('enrichment')) return 'text-green-400';
    if (type.includes('ai') || type.includes('anomaly') || type.includes('rag')) return 'text-purple-400';
    if (type.includes('response') || type.includes('block') || type.includes('isolate')) return 'text-orange-400';
    return 'text-neutral-400';
  };

  const renderNodeProperties = () => {
    const { type, data } = selectedNode;
    
    switch (type) {
      case 'alert-trigger':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Alert Source</label>
              <Select defaultValue="siem">
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue placeholder="Select alert source" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="siem">SIEM System</SelectItem>
                  <SelectItem value="edr">EDR Platform</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                  <SelectItem value="ids">IDS/IPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Severity Threshold</label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'ioc-lookup':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">IOC Type</label>
              <Select defaultValue="ip">
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue placeholder="Select IOC type" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="ip">IP Address</SelectItem>
                  <SelectItem value="domain">Domain</SelectItem>
                  <SelectItem value="hash">File Hash</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Threat Intel Sources</label>
              <div className="space-y-2">
                {['VirusTotal', 'AbuseIPDB', 'AlienVault OTX', 'IBM X-Force'].map((source) => (
                  <label key={source} className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded border-neutral-600 bg-neutral-800" />
                    <span className="text-sm text-neutral-300">{source}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'rag-query':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Knowledge Base</label>
              <Select defaultValue="threat-intel">
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue placeholder="Select knowledge base" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="threat-intel">Threat Intelligence</SelectItem>
                  <SelectItem value="incident-response">Incident Response</SelectItem>
                  <SelectItem value="vulnerabilities">Vulnerabilities</SelectItem>
                  <SelectItem value="compliance">Compliance & Standards</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Query Context</label>
              <Textarea 
                placeholder="Enter context about the security event..."
                className="bg-neutral-800 border-neutral-700 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Response Format</label>
              <Select defaultValue="actionable">
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="actionable">Actionable Steps</SelectItem>
                  <SelectItem value="analysis">Detailed Analysis</SelectItem>
                  <SelectItem value="summary">Executive Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Node Name</label>
              <Input 
                defaultValue={data.label || 'Unnamed Node'}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Description</label>
              <Textarea 
                placeholder="Describe what this node does..."
                className="bg-neutral-800 border-neutral-700 text-white"
                rows={3}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl shadow-2xl w-80 max-h-[70vh] overflow-hidden">
              {/* Node Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-neutral-800 ${getNodeColor(selectedNode.type)}`}>
            {getNodeIcon(selectedNode.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{selectedNode.data.label || 'Unnamed Node'}</h3>
            <p className="text-sm text-neutral-400 capitalize">{selectedNode.type.replace('-', ' ')}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600/10">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800">
        {['properties', 'execution', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-neutral-400 hover:text-neutral-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-[calc(70vh-140px)] overflow-y-auto">
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <h4 className="text-md font-medium text-white">Configuration</h4>
            {renderNodeProperties()}
          </div>
        )}
        
        {activeTab === 'execution' && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">Execution Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                <span className="text-sm text-neutral-300">Last Run</span>
                <span className="text-sm text-neutral-400">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                <span className="text-sm text-neutral-300">Status</span>
                <span className="text-sm text-green-400">Success</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                <span className="text-sm text-neutral-300">Execution Time</span>
                <span className="text-sm text-neutral-400">1.2s</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">Recent Logs</h4>
            <div className="space-y-2">
              {[
                { level: 'info', message: 'Node executed successfully', time: '2 hours ago' },
                { level: 'warning', message: 'Rate limit approaching', time: '4 hours ago' },
                { level: 'error', message: 'API connection failed', time: '1 day ago' }
              ].map((log, index) => (
                <div key={index} className="p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.level === 'error' ? 'bg-red-600/20 text-red-400' :
                      log.level === 'warning' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-blue-600/20 text-blue-400'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-400">{log.time}</span>
                  </div>
                  <p className="text-sm text-neutral-300">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
