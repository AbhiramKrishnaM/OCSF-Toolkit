import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { GitBranch, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const DecisionNode = ({ data, selected }) => {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-yellow-500" />
      
      <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-4 min-w-[200px] border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-yellow-700 rounded-lg">
            <GitBranch className="w-5 h-5 text-yellow-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Decision Point'}</h3>
            <p className="text-yellow-200 text-xs">Workflow Logic</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span>High Risk → Block IP</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <AlertTriangle className="w-3 h-3 text-yellow-400" />
            <span>Medium Risk → Ticket</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <XCircle className="w-3 h-3 text-blue-400" />
            <span>Low Risk → Alert</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-yellow-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-yellow-500" style={{ left: '25%' }} />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-yellow-500" style={{ left: '75%' }} />
    </div>
  );
};

export default DecisionNode;
