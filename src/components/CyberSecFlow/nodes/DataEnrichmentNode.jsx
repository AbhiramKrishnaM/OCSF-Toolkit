import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database, Plus, Filter } from 'lucide-react';

const DataEnrichmentNode = ({ data, selected }) => {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500" />
      
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 min-w-[200px] border-2 border-green-500 hover:border-green-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-700 rounded-lg">
            <Database className="w-5 h-5 text-green-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Data Enrichment'}</h3>
            <p className="text-green-200 text-xs">Context Enhancement</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <Plus className="w-3 h-3" />
            <span>Geo Location</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <Plus className="w-3 h-3" />
            <span>ASN Info</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <Filter className="w-3 h-3" />
            <span>Filtered: 15 records</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
};

export default DataEnrichmentNode;
