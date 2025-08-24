import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { AlertTriangle, Zap } from 'lucide-react';

const AlertTriggerNode = ({ data, selected }) => {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 min-w-[200px] border-2 border-blue-500 hover:border-blue-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-700 rounded-lg">
            <Zap className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Alert Trigger'}</h3>
            <p className="text-blue-200 text-xs">Workflow Starter</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Source: SIEM System</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <span>Severity: Medium+</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <span>Status: Active</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  );
};

export default AlertTriggerNode;
