
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Server, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';

export type ClusterStatus = 'healthy' | 'warning' | 'critical' | 'inactive';

export interface ClusterCardProps {
  id: string;
  name: string;
  status: ClusterStatus;
  version: string;
  nodes: number;
  region: string;
  provider: string;
  className?: string;
}

const ClusterCard: React.FC<ClusterCardProps> = ({
  id,
  name,
  status,
  version,
  nodes,
  region,
  provider,
  className,
}) => {
  const providerIcons: Record<string, string> = {
    'aws': 'bg-amber-100 text-amber-800',
    'gcp': 'bg-blue-100 text-blue-800',
    'azure': 'bg-indigo-100 text-indigo-800',
    'digitalocean': 'bg-cyan-100 text-cyan-800',
    'default': 'bg-gray-100 text-gray-800'
  };

  const providerStyle = providerIcons[provider.toLowerCase()] || providerIcons.default;

  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <StatusBadge status={status} showText />
        </div>
        <CardDescription>
          v{version} · {nodes} node{nodes !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className={cn("px-2 py-0.5 rounded-full text-xs font-medium", providerStyle)}>
            {provider}
          </div>
          <span>•</span>
          <span>{region}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="ghost" size="sm" asChild className="ml-auto group">
          <Link to={`/cluster/${id}`}>
            View details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClusterCard;
