
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Server, 
  Boxes, 
  Database, 
  ShieldAlert, 
  Terminal, 
  Settings, 
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/',
  },
  {
    title: 'Clusters',
    icon: <Server className="h-5 w-5" />,
    href: '/clusters',
  },
  {
    title: 'Workloads',
    icon: <Boxes className="h-5 w-5" />,
    href: '/workloads',
  },
  {
    title: 'Storage',
    icon: <Database className="h-5 w-5" />,
    href: '/storage',
  },
  {
    title: 'Security',
    icon: <ShieldAlert className="h-5 w-5" />,
    href: '/security',
  },
  {
    title: 'Terminal',
    icon: <Terminal className="h-5 w-5" />,
    href: '/terminal',
  },
  {
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 transition-all duration-300 ease-in-out md:relative md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-kubernetes text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2 L7 7 L2 12 L7 17 L12 22 L17 17 L22 12 L17 7 Z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              KubeWizardry
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                location.pathname === item.href 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="mb-2 flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-status-healthy" />
              <p className="text-xs font-medium">Connected to API</p>
            </div>
            <p className="text-xs text-muted-foreground">
              System running normally
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
