
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ClusterCard, { ClusterStatus } from '@/components/dashboard/ClusterCard';
import ResourceChart from '@/components/dashboard/ResourceChart';
import { Button } from '@/components/ui/button';
import { RefreshCw, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockClusters = [
  {
    id: '1',
    name: 'Production Cluster',
    status: 'healthy' as ClusterStatus,
    version: '1.26.0',
    nodes: 5,
    region: 'us-west-1',
    provider: 'AWS',
  },
  {
    id: '2',
    name: 'Staging Environment',
    status: 'warning' as ClusterStatus,
    version: '1.25.3',
    nodes: 3,
    region: 'eu-central-1',
    provider: 'GCP',
  },
  {
    id: '3',
    name: 'Development',
    status: 'healthy' as ClusterStatus,
    version: '1.24.8',
    nodes: 2,
    region: 'ap-southeast-1',
    provider: 'Azure',
  },
  {
    id: '4',
    name: 'Data Processing',
    status: 'critical' as ClusterStatus,
    version: '1.26.1',
    nodes: 4,
    region: 'us-east-1',
    provider: 'AWS',
  },
  {
    id: '5',
    name: 'Testing Environment',
    status: 'inactive' as ClusterStatus,
    version: '1.23.5',
    nodes: 1,
    region: 'eu-west-1',
    provider: 'DigitalOcean',
  },
];

const cpuUsageData = [
  { time: '00:00', value: 45 },
  { time: '03:00', value: 38 },
  { time: '06:00', value: 42 },
  { time: '09:00', value: 68 },
  { time: '12:00', value: 75 },
  { time: '15:00', value: 62 },
  { time: '18:00', value: 54 },
  { time: '21:00', value: 48 },
];

const nodeResourcesData = [
  { name: 'Node 1', cpu: 65, memory: 48 },
  { name: 'Node 2', cpu: 45, memory: 56 },
  { name: 'Node 3', cpu: 78, memory: 70 },
  { name: 'Node 4', cpu: 32, memory: 41 },
  { name: 'Node 5', cpu: 55, memory: 59 },
];

const podDistributionData = [
  { name: 'Running', value: 48 },
  { name: 'Pending', value: 5 },
  { name: 'Failed', value: 2 },
  { name: 'Completed', value: 12 },
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 md:pt-0">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Refresh</span>
                </Button>
                <Button asChild size="sm" className="gap-1">
                  <Link to="/cluster/add">
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline-block">New Cluster</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <ResourceChart
                title="CPU Usage"
                description="Average cluster utilization"
                type="area"
                data={cpuUsageData}
                className="col-span-1 md:col-span-2 lg:col-span-1 animate-fade-in"
              />
              <ResourceChart
                title="Node Resources"
                description="CPU and memory usage"
                type="bar"
                data={nodeResourcesData}
                className="col-span-1 md:col-span-2 lg:col-span-1 animate-fade-in"
              />
              <ResourceChart
                title="Pod Distribution"
                description="Status breakdown"
                type="pie"
                data={podDistributionData}
                className="col-span-1 animate-fade-in"
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Clusters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockClusters.map((cluster, index) => (
                  <ClusterCard 
                    key={cluster.id} 
                    {...cluster} 
                    className={`animate-fade-in`}
                    style={{
                      animationDelay: `${index * 75}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
