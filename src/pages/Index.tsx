
import React from 'react';
import { Link } from 'react-router-dom';
import { Files, Calendar, BarChart } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import NavigationTile from '@/components/NavigationTile';
import KPITile from '@/components/KPITile';
import { kpiData } from '@/lib/mockData';
import AppLayout from '@/layouts/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <PageTransition>
        <header className="mb-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-semibold mb-2">Welcome to AppMonitor</h1>
            <p className="text-muted-foreground">
              Monitor your application metrics and logs in one place.
            </p>
          </div>
        </header>
        
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-medium mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiData.map((kpi) => (
              <KPITile key={kpi.id} data={kpi} />
            ))}
          </div>
        </section>
        
        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-medium mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NavigationTile
              title="Logs Viewer"
              description="Browse and filter application logs with advanced search capabilities."
              icon={Files}
              to="/logs"
            />
            <NavigationTile
              title="Job Scheduler"
              description="Create and manage scheduled tasks across your application."
              icon={Calendar}
              to="/jobs"
            />
            <NavigationTile
              title="Dashboard"
              description="Visualize key performance metrics with interactive charts."
              icon={BarChart}
              to="/dashboard"
            />
          </div>
        </section>
      </PageTransition>
    </AppLayout>
  );
};

export default Index;
