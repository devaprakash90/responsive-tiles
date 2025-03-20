
import React, { useState } from 'react';
import { Clock, Filter, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/ui/PageTransition';
import LogsTable from '@/components/LogsTable';
import { mockLogs } from '@/lib/mockData';
import AppLayout from '@/layouts/AppLayout';

const LogsViewer = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <AppLayout>
      <PageTransition>
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Logs Viewer</h1>
            <p className="text-muted-foreground">
              Browse, filter and analyze application logs.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCcw 
                className={cn(
                  "h-4 w-4", 
                  refreshing && "animate-spin"
                )} 
              />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </header>
        
        <section className="mb-6 flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
          
          <div className="text-sm">
            Showing {mockLogs.length} logs
          </div>
        </section>
        
        <LogsTable logs={mockLogs} />
      </PageTransition>
    </AppLayout>
  );
};

// Helper function for class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default LogsViewer;
