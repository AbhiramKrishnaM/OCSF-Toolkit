import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot, Brain, Database, Zap } from 'lucide-react';

const RagQueryNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />
      
      <div 
        className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 min-w-[200px] cursor-pointer border-2 border-purple-500 hover:border-purple-400 transition-all duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-700 rounded-lg">
            <Bot className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'RAG Analysis'}</h3>
            <p className="text-purple-200 text-xs">AI-Powered Security Insights</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Database className="w-3 h-3" />
            <span>Knowledge Base: Threat Intel</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Brain className="w-3 h-3" />
            <span>Context: Security Event</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Response: Actionable Steps</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-purple-500/30">
            <div className="text-xs text-purple-200 space-y-1">
              <div className="flex justify-between">
                <span>Query Time:</span>
                <span className="text-purple-300">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span>Sources:</span>
                <span className="text-purple-300">3 found</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence:</span>
                <span className="text-purple-300">87%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
};

export default RagQueryNode;
