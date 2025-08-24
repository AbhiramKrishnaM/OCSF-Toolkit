import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';

const AnomalyDetectionNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-4 min-w-[200px] border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-yellow-700 rounded-lg">
            <Activity className="w-5 h-5 text-yellow-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Anomaly Detection'}</h3>
            <p className="text-yellow-200 text-xs">Behavior Analysis</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>Baseline: 30 Days</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Sensitivity: High</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200 text-xs">
            <span>Status: Learning</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-yellow-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-yellow-500" />
    </div>
  );
};

export default AnomalyDetectionNode;
