import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText, Eye, Folder } from 'lucide-react';

const FileWatchNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 min-w-[200px] border-2 border-purple-500 hover:border-purple-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-700 rounded-lg">
            <FileText className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'File Watch'}</h3>
            <p className="text-purple-200 text-xs">File Monitor</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Folder className="w-3 h-3" />
            <span>Path: /logs/security</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <Eye className="w-3 h-3" />
            <span>Pattern: *.log</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200 text-xs">
            <span>Status: Monitoring</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
};

export default FileWatchNode;
