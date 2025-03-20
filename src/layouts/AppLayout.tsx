
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, BarChart, Files, Calendar } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: Home 
    },
    { 
      path: '/logs', 
      label: 'Logs', 
      icon: Files 
    },
    { 
      path: '/jobs', 
      label: 'Jobs', 
      icon: Calendar 
    },
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: BarChart 
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 glass-effect border-b shadow-sm backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-semibold text-primary-foreground">A</span>
              </div>
              <span className="font-medium">AppMonitor</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Admin
            </span>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-8">
        {children}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 text-sm text-muted-foreground">
          <p>© 2023 AppMonitor. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link to="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t flex justify-around py-2 z-10">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center py-2 px-3 rounded-md",
              location.pathname === path 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AppLayout;
