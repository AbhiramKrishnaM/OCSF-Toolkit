import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock, Calendar, Zap } from 'lucide-react';

const ScheduleTriggerNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 min-w-[200px] border-2 border-blue-500 hover:border-blue-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-700 rounded-lg">
            <Clock className="w-5 h-5 text-blue-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Schedule'}</h3>
            <p className="text-blue-200 text-xs">Time-based Trigger</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <Calendar className="w-3 h-3" />
            <span>Frequency: Daily</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Time: 9:00 AM</span>
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

export default ScheduleTriggerNode;
