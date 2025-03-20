
import React, { useState } from 'react';
import { 
  ArrowDownUp, 
  Calendar, 
  RefreshCcw, 
  DownloadCloud 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageTransition from '@/components/ui/PageTransition';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import { getChartData } from '@/lib/mockData';
import AppLayout from '@/layouts/AppLayout';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const [refreshing, setRefreshing] = useState(false);
  const chartData = getChartData();

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
            <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Analytics and visualizations for your application.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px] h-9">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 hours</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-9 w-9">
              <DownloadCloud className="h-4 w-4" />
              <span className="sr-only">Download</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-effect rounded-xl p-6 h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Daily Event Count</h2>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowDownUp className="h-3.5 w-3.5" />
                <span className="text-xs">Sort</span>
              </Button>
            </div>
            <BarChart data={chartData.barChart} />
          </div>
          
          <div className="glass-effect rounded-xl p-6 h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Event Success Rate</h2>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowDownUp className="h-3.5 w-3.5" />
                <span className="text-xs">Sort</span>
              </Button>
            </div>
            <LineChart data={chartData.lineChart} />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Event Type Distribution</h2>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <ArrowDownUp className="h-3.5 w-3.5" />
              <span className="text-xs">Sort</span>
            </Button>
          </div>
          <PieChart data={chartData.pieChart} />
        </div>
      </PageTransition>
    </AppLayout>
  );
};

// Helper function for class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Dashboard;
