export interface KPI {
  id: string;
  title: string;
  value: number;
  change: number;
  timeframe: string;
  icon: 'activity' | 'bar-chart' | 'trending-up' | 'trending-down' | string;
  
  label: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface Log {
  id: string;
  timestamp: string;
  eventType: string;
  userId: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details: any;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: 'active' | 'paused' | 'failed' | 'inactive';
  lastRun: string;
  nextRun: string;
  createdBy: string;
  createdAt: string;
}

export interface ChartData {
  barChart: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
    }[];
  };
  lineChart: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
    }[];
  };
  pieChart: {
    labels: string[];
    data: number[];
  };
}
