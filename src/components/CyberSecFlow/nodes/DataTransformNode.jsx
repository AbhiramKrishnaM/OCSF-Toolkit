import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { RefreshCw, ArrowRight, Zap } from 'lucide-react';

const DataTransformNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg p-4 min-w-[200px] border-2 border-emerald-500 hover:border-emerald-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-700 rounded-lg">
            <RefreshCw className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Data Transform'}</h3>
            <p className="text-emerald-200 text-xs">Data Conversion</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-200 text-xs">
            <ArrowRight className="w-3 h-3" />
            <span>Input: JSON</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Output: XML</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs">
            <span>Status: Ready</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-emerald-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-500" />
    </div>
  );
};

export default DataTransformNode;
