import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText, Code, Filter } from 'lucide-react';

const LogParserNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg p-4 min-w-[200px] border-2 border-indigo-500 hover:border-indigo-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-700 rounded-lg">
            <FileText className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Log Parser'}</h3>
            <p className="text-indigo-200 text-xs">Data Processing</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-200 text-xs">
            <Code className="w-3 h-3" />
            <span>Format: JSON/Syslog</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-200 text-xs">
            <Filter className="w-3 h-3" />
            <span>Filters: Security Events</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-200 text-xs">
            <span>Status: Processing</span>
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-indigo-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500" />
    </div>
  );
};

export default LogParserNode;
