
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 md:pt-0">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 animate-fade-in flex items-center justify-center p-4 md:p-6">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-8xl font-bold text-kubernetes mb-6 animate-fade-in-up">404</h1>
            <div className="space-y-2 mb-8 animate-fade-in-up" style={{ animationDelay: '75ms' }}>
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <p className="text-muted-foreground">
                The resource at <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">{location.pathname}</span> could not be found.
              </p>
            </div>
            <Button asChild className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
