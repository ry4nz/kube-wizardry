
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type StatusType = 'healthy' | 'warning' | 'critical' | 'inactive';

interface StatusBadgeProps {
  status: StatusType;
  animate?: boolean;
  showText?: boolean;
  className?: string;
}

const statusConfig = {
  healthy: {
    color: 'bg-status-healthy',
    text: 'Healthy',
    description: 'All systems operational'
  },
  warning: {
    color: 'bg-status-warning',
    text: 'Warning',
    description: 'Minor issues detected'
  },
  critical: {
    color: 'bg-status-critical',
    text: 'Critical',
    description: 'Immediate attention required'
  },
  inactive: {
    color: 'bg-status-inactive',
    text: 'Inactive',
    description: 'System currently offline'
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  animate = true, 
  showText = false,
  className
}) => {
  const config = statusConfig[status];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-2", className)}>
            <span 
              className={cn(
                "h-2.5 w-2.5 rounded-full", 
                config.color, 
                animate && status !== 'inactive' && "animate-pulse-subtle"
              )} 
            />
            {showText && (
              <span className="text-xs font-medium">{config.text}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatusBadge;
