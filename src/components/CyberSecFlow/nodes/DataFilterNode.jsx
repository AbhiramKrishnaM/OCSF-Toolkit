import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Filter, Settings, Zap } from 'lucide-react';

const DataFilterNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg p-4 min-w-[200px] border-2 border-cyan-500 hover:border-cyan-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-cyan-700 rounded-lg">
            <Filter className="w-5 h-5 text-cyan-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Data Filter'}</h3>
            <p className="text-cyan-200 text-xs">Data Processing</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-200 text-xs">
            <Settings className="w-3 h-3" />
            <span>Rules: 8 Active</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Mode: Whitelist</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-200 text-xs">
            <span>Status: Active</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-cyan-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-cyan-500" />
    </div>
  );
};

export default DataFilterNode;
