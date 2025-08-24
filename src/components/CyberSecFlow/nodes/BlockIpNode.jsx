import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, Lock, Network } from 'lucide-react';

const BlockIpNode = ({ data, selected }) => {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-orange-400' : ''}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-red-500" />
      
      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-4 min-w-[200px] border-2 border-red-500 hover:border-red-400 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-700 rounded-lg">
            <Lock className="w-5 h-5 text-red-200" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{data.label || 'Block IP'}</h3>
            <p className="text-red-200 text-xs">Automated Response</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <Network className="w-3 h-3" />
            <span>IP: 192.168.1.100</span>
          </div>
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <Shield className="w-3 h-3" />
            <span>Firewall: Updated</span>
          </div>
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <span>Duration: 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockIpNode;
