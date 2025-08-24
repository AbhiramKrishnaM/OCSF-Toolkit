import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';

const ThreatScoringNode = ({ data, selected }) => {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />
      
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 min-w-[200px] border-2 border-purple-500 hover:border-purple-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-700 rounded-lg">
            <Brain className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Threat Scoring'}</h3>
            <p className="text-purple-200 text-xs">AI Risk Assessment</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>Score: 8.7/10</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Risk: High</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <span>Confidence: 92%</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
};

export default ThreatScoringNode;
