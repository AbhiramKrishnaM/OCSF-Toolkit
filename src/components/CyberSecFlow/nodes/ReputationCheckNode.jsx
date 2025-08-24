import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

const ReputationCheckNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg p-4 min-w-[200px] border-2 border-teal-500 hover:border-teal-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-teal-700 rounded-lg">
            <Shield className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Reputation Check'}</h3>
            <p className="text-teal-200 text-xs">Threat Assessment</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-200 text-xs">
            <CheckCircle className="w-3 h-3" />
            <span>Score: 85/100</span>
          </div>
          <div className="flex items-center gap-2 text-teal-200 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>Risk: Low</span>
          </div>
          <div className="flex items-center gap-2 text-teal-200 text-xs">
            <span>Status: Complete</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-teal-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-teal-500" />
    </div>
  );
};

export default ReputationCheckNode;
