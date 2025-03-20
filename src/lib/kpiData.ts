import { KPI } from './types';

export const kpiData: KPI[] = [
  {
    id: 'kpi-1',
    title: 'Total Events',
    value: 12345,
    change: 12,
    timeframe: 'vs last week',
    icon: 'activity',
    
    label: 'Total Events',
    trend: 'up',
    trendValue: 12,
  },
  {
    id: 'kpi-2',
    title: 'Unique Users',
    value: 500,
    change: 0,
    timeframe: 'vs last week',
    icon: 'bar-chart',
    
    label: 'Unique Users',
    trend: 'stable',
    trendValue: 0,
  },
  {
    id: 'kpi-3',
    title: 'Error Rate',
    value: 0.5,
    change: -0.1,
    timeframe: 'vs last week',
    icon: 'trending-down',
    
    label: 'Error Rate',
    trend: 'down',
    trendValue: -0.1,
  },
];
