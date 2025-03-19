
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
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
            <span className="hidden md:inline-block text-xl font-semibold tracking-tight">
              KubeWizardry
            </span>
          </Link>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2 lg:space-x-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clusters, deployments..."
                className="w-full bg-background pl-8 md:w-[200px] lg:w-[320px] rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-status-warning rounded-full" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/cluster/add">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline-block">Add Cluster</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@kubewizardry.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
