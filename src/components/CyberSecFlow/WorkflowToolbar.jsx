import React, { useState } from 'react';
import { Play, Pause, Square, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WorkflowToolbar = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const toggleWorkflow = () => {
    setIsRunning(!isRunning);
  };

  const stopWorkflow = () => {
    setIsRunning(false);
  };

  const resetWorkflow = () => {
    // Reset workflow state
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-4">
          {/* Workflow Controls */}
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleWorkflow}
              disabled={false}
              size="sm"
              className={`${
                isRunning 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              onClick={stopWorkflow}
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white"
            >
              <Square className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={resetWorkflow}
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-neutral-600" />

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowGrid(!showGrid)}
              variant="ghost"
              size="sm"
              className={`text-neutral-400 hover:text-white ${
                showGrid ? 'text-orange-400' : ''
              }`}
            >
              {showGrid ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-neutral-600" />

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-800/50 rounded-lg border border-neutral-600">
            <div className={`w-2 h-2 rounded-full ${
              isRunning ? 'bg-green-400' : 'bg-neutral-500'
            }`} />
            <span className="text-xs text-neutral-300 font-medium">
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowToolbar;
