import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Network, Link, Zap } from 'lucide-react';

const EventCorrelationNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-4 min-w-[200px] border-2 border-pink-500 hover:border-pink-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-pink-700 rounded-lg">
            <Network className="w-5 h-5 text-pink-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Event Correlation'}</h3>
            <p className="text-pink-200 text-xs">Pattern Analysis</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-pink-200 text-xs">
            <Link className="w-3 h-3" />
            <span>Patterns: 12 Active</span>
          </div>
          <div className="flex items-center gap-2 text-pink-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Threshold: 3 Events</span>
          </div>
          <div className="flex items-center gap-2 text-pink-200 text-xs">
            <span>Status: Monitoring</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-pink-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-pink-500" />
    </div>
  );
};

export default EventCorrelationNode;
