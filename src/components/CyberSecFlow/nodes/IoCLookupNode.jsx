import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, Search, Database } from 'lucide-react';

const IoCLookupNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-red-500" />
      
      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-4 min-w-[200px] border-2 border-red-500 hover:border-red-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-700 rounded-lg">
            <Shield className="w-5 h-5 text-red-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'IOC Lookup'}</h3>
            <p className="text-red-200 text-xs">Threat Intelligence</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <Search className="w-3 h-3" />
            <span>Type: IP Address</span>
          </div>
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <Database className="w-3 h-3" />
            <span>Sources: 4 APIs</span>
          </div>
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <span>Status: Checking...</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-red-500" />
    </div>
  );
};

export default IoCLookupNode;
