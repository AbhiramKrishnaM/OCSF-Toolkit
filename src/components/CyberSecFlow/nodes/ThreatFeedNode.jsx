import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Rss, Globe, Zap } from 'lucide-react';

const ThreatFeedNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-4 min-w-[200px] border-2 border-orange-500 hover:border-orange-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-orange-700 rounded-lg">
            <Rss className="w-5 h-5 text-orange-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Threat Feed'}</h3>
            <p className="text-orange-200 text-xs">Intelligence Source</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-200 text-xs">
            <Globe className="w-3 h-3" />
            <span>Source: AlienVault OTX</span>
          </div>
          <div className="flex items-center gap-2 text-orange-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Update: Real-time</span>
          </div>
          <div className="flex items-center gap-2 text-orange-200 text-xs">
            <span>Status: Active</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-orange-500" />
    </div>
  );
};

export default ThreatFeedNode;
