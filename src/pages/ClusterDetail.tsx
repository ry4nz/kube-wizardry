
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import ResourceChart from '@/components/dashboard/ResourceChart';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  RefreshCw, 
  Trash2,
  Terminal, 
  Power, 
  Download,
  Boxes, 
  Database
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for a specific cluster
const clusterData = {
  '1': {
    id: '1',
    name: 'Production Cluster',
    status: 'healthy',
    version: '1.26.0',
    nodes: 5,
    region: 'us-west-1',
    provider: 'AWS',
    created: '2023-05-10',
    lastUpdated: '2023-11-28',
    cpu: {
      total: '20 vCPU',
      used: '68%',
    },
    memory: {
      total: '80 GiB',
      used: '55%',
    },
    storage: {
      total: '500 GiB',
      used: '32%',
    },
    endpoints: {
      api: 'https://k8s-api.example.com',
      dashboard: 'https://k8s-dashboard.example.com',
    },
    namespaces: [
      { name: 'default', status: 'active', pods: 5, services: 3 },
      { name: 'kube-system', status: 'active', pods: 12, services: 8 },
      { name: 'monitoring', status: 'active', pods: 7, services: 4 },
      { name: 'applications', status: 'active', pods: 10, services: 6 },
      { name: 'database', status: 'active', pods: 3, services: 2 },
    ],
    nodes: [
      { name: 'node-1', status: 'healthy', role: 'master', cpu: '65%', memory: '48%' },
      { name: 'node-2', status: 'healthy', role: 'worker', cpu: '45%', memory: '56%' },
      { name: 'node-3', status: 'warning', role: 'worker', cpu: '78%', memory: '70%' },
      { name: 'node-4', status: 'healthy', role: 'worker', cpu: '32%', memory: '41%' },
      { name: 'node-5', status: 'healthy', role: 'worker', cpu: '55%', memory: '59%' },
    ],
  },
  '2': {
    id: '2',
    name: 'Staging Environment',
    status: 'warning',
    version: '1.25.3',
    nodes: 3,
    region: 'eu-central-1',
    provider: 'GCP',
    created: '2023-06-15',
    lastUpdated: '2023-11-20',
    cpu: {
      total: '12 vCPU',
      used: '45%',
    },
    memory: {
      total: '48 GiB',
      used: '62%',
    },
    storage: {
      total: '300 GiB',
      used: '40%',
    },
    endpoints: {
      api: 'https://staging-k8s-api.example.com',
      dashboard: 'https://staging-k8s-dashboard.example.com',
    },
    namespaces: [
      { name: 'default', status: 'active', pods: 3, services: 2 },
      { name: 'kube-system', status: 'active', pods: 8, services: 5 },
      { name: 'monitoring', status: 'active', pods: 5, services: 3 },
      { name: 'applications', status: 'active', pods: 7, services: 4 },
    ],
    nodes: [
      { name: 'staging-node-1', status: 'healthy', role: 'master', cpu: '52%', memory: '48%' },
      { name: 'staging-node-2', status: 'warning', role: 'worker', cpu: '82%', memory: '76%' },
      { name: 'staging-node-3', status: 'healthy', role: 'worker', cpu: '41%', memory: '63%' },
    ],
  }
};

const memoryUsageData = [
  { time: '00:00', value: 35 },
  { time: '03:00', value: 40 },
  { time: '06:00', value: 45 },
  { time: '09:00', value: 52 },
  { time: '12:00', value: 65 },
  { time: '15:00', value: 59 },
  { time: '18:00', value: 48 },
  { time: '21:00', value: 42 },
];

const ClusterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  
  // Handle non-existent clusters
  if (!id || !clusterData[id as keyof typeof clusterData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 pt-16 md:pt-0">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <main className="flex-1 p-4 md:p-6 animate-fade-in">
            <div className="w-full max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold tracking-tight mb-6">Cluster Not Found</h1>
              <p>The requested cluster does not exist or you don't have permission to view it.</p>
              <Button asChild className="mt-4">
                <Link to="/">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  const cluster = clusterData[id as keyof typeof clusterData];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 md:pt-0">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">{cluster.name}</h1>
                    <StatusBadge status={cluster.status as any} showText />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {cluster.provider} • {cluster.region} • v{cluster.version}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Terminal className="h-4 w-4" />
                  <span>Terminal</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Config</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Power className="h-4 w-4" />
                  <span>Stop</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">CPU</span>
                      <span className="text-sm font-medium">{cluster.cpu.used} of {cluster.cpu.total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-kubernetes rounded-full" 
                        style={{ width: cluster.cpu.used }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Memory</span>
                      <span className="text-sm font-medium">{cluster.memory.used} of {cluster.memory.total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-status-healthy rounded-full" 
                        style={{ width: cluster.memory.used }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Storage</span>
                      <span className="text-sm font-medium">{cluster.storage.used} of {cluster.storage.total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-status-warning rounded-full" 
                        style={{ width: cluster.storage.used }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Cluster Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Version</span>
                      <span className="text-sm font-medium">v{cluster.version}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Nodes</span>
                      <span className="text-sm font-medium">{cluster.nodes}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Provider</span>
                      <span className="text-sm font-medium">{cluster.provider}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Region</span>
                      <span className="text-sm font-medium">{cluster.region}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Created</span>
                      <span className="text-sm font-medium">{cluster.created}</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-muted-foreground text-sm">Last Updated</span>
                      <span className="text-sm font-medium">{cluster.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">API Server</div>
                      <div className="text-sm font-mono bg-muted p-2 rounded-md overflow-x-auto">
                        {cluster.endpoints.api}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Dashboard</div>
                      <div className="text-sm font-mono bg-muted p-2 rounded-md overflow-x-auto">
                        {cluster.endpoints.dashboard}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <ResourceChart
                title="Memory Usage Trend"
                description="Last 24 hours"
                type="area"
                data={memoryUsageData}
                className="animate-fade-in"
              />
            </div>
            
            <div className="mb-6">
              <Tabs defaultValue="nodes" className="animate-fade-in">
                <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 md:inline-grid">
                  <TabsTrigger value="nodes">Nodes</TabsTrigger>
                  <TabsTrigger value="namespaces">Namespaces</TabsTrigger>
                  <TabsTrigger value="workloads">Workloads</TabsTrigger>
                </TabsList>
                <TabsContent value="nodes" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Cluster Nodes</CardTitle>
                      <CardDescription>
                        {cluster.nodes.length} nodes in total
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>CPU</TableHead>
                            <TableHead>Memory</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cluster.nodes.map((node) => (
                            <TableRow key={node.name}>
                              <TableCell className="font-medium">{node.name}</TableCell>
                              <TableCell>
                                <StatusBadge status={node.status as any} showText />
                              </TableCell>
                              <TableCell>{node.role}</TableCell>
                              <TableCell>{node.cpu}</TableCell>
                              <TableCell>{node.memory}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="namespaces" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Namespaces</CardTitle>
                      <CardDescription>
                        {cluster.namespaces.length} namespaces in total
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Pods</TableHead>
                            <TableHead>Services</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cluster.namespaces.map((namespace) => (
                            <TableRow key={namespace.name}>
                              <TableCell className="font-medium">{namespace.name}</TableCell>
                              <TableCell>{namespace.status}</TableCell>
                              <TableCell>{namespace.pods}</TableCell>
                              <TableCell>{namespace.services}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="workloads" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base font-medium">Workloads</CardTitle>
                          <CardDescription>
                            Deployments, StatefulSets, and DaemonSets
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Boxes className="h-4 w-4 mr-1" />
                            Deployments
                          </Button>
                          <Button variant="outline" size="sm">
                            <Database className="h-4 w-4 mr-1" />
                            StatefulSets
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center py-8">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-4">Connect to view workloads</p>
                          <Button>
                            Connect Cluster
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Danger Zone</h2>
              <Card className="border-destructive/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Delete Cluster</CardTitle>
                  <CardDescription>
                    This will permanently remove the cluster and all its resources.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button variant="destructive" className="gap-1">
                    <Trash2 className="h-4 w-4" />
                    Delete Cluster
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClusterDetail;
