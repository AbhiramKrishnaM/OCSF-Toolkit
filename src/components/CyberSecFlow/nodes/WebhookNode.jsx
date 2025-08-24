import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Webhook, Globe, Zap } from 'lucide-react';

const WebhookNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 min-w-[200px] border-2 border-green-500 hover:border-green-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-700 rounded-lg">
            <Webhook className="w-5 h-5 text-green-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Webhook'}</h3>
            <p className="text-green-200 text-xs">HTTP Trigger</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <Globe className="w-3 h-3" />
            <span>Endpoint: /webhook/security</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <Zap className="w-3 h-3" />
            <span>Method: POST</span>
          </div>
          <div className="flex items-center gap-2 text-green-200 text-xs">
            <span>Status: Active</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
};

export default WebhookNode;
