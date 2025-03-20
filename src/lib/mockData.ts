
// Mock data for development purposes

// Types
export interface Log {
  id: string;
  timestamp: string;
  eventType: string;
  userId: string;
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  details?: Record<string, any>;
}

export interface Job {
  id: string;
  name: string;
  schedule: string;
  status: 'active' | 'paused' | 'failed';
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
  createdBy: string;
  description?: string;
}

export interface KPI {
  id: string;
  title: string;
  value: number;
  change: number;
  timeframe: string;
  icon: string;
}

// Generate a random timestamp within the last 30 days
const randomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  
  return date.toISOString();
};

// Generate random logs
export const generateLogs = (count: number): Log[] => {
  const eventTypes = ['login', 'logout', 'data_access', 'file_upload', 'api_request', 'error', 'system_event'];
  const statuses = ['success', 'warning', 'error', 'info'] as const;
  const userIds = Array.from({ length: 10 }, (_, i) => `user-${i + 1}`);
  
  return Array.from({ length: count }, (_, i) => ({
    id: `log-${i + 1}`,
    timestamp: randomRecentDate(),
    eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    userId: userIds[Math.floor(Math.random() * userIds.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    message: `Event ${eventTypes[Math.floor(Math.random() * eventTypes.length)]} occurred.`,
    details: {
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)]
    }
  }));
};

// Generate random jobs
export const generateJobs = (count: number): Job[] => {
  const schedules = ['0 */2 * * *', '0 0 * * *', '*/15 * * * *', '0 0 * * 1'];
  const statuses = ['active', 'paused', 'failed'] as const;
  const users = ['admin', 'system', 'scheduler', 'api'];
  
  return Array.from({ length: count }, (_, i) => {
    const createdDate = randomRecentDate();
    const lastRun = Math.random() > 0.3 ? randomRecentDate() : undefined;
    
    return {
      id: `job-${i + 1}`,
      name: `Job ${i + 1}`,
      schedule: schedules[Math.floor(Math.random() * schedules.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastRun,
      nextRun: lastRun ? new Date(new Date(lastRun).getTime() + 24 * 60 * 60 * 1000).toISOString() : undefined,
      createdAt: createdDate,
      createdBy: users[Math.floor(Math.random() * users.length)],
      description: Math.random() > 0.5 ? `Scheduled task for processing data batch ${i + 1}` : undefined
    };
  });
};

// KPI data
export const kpiData: KPI[] = [
  {
    id: 'kpi-1',
    title: 'Events Today',
    value: 148,
    change: 12,
    timeframe: 'vs. yesterday',
    icon: 'activity'
  },
  {
    id: 'kpi-2',
    title: 'Events This Week',
    value: 847,
    change: -3,
    timeframe: 'vs. last week',
    icon: 'bar-chart'
  },
  {
    id: 'kpi-3',
    title: 'Events This Month',
    value: 3259,
    change: 23,
    timeframe: 'vs. last month',
    icon: 'trending-up'
  }
];

// Chart data for dashboard
export const getChartData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const eventTypes = ['Login', 'Logout', 'Data Access', 'File Upload', 'API Request', 'Error', 'System Event'];
  
  return {
    barChart: {
      labels: days,
      datasets: [
        {
          name: 'Events',
          data: days.map(() => Math.floor(Math.random() * 100) + 50)
        }
      ]
    },
    lineChart: {
      labels: days,
      datasets: [
        {
          name: 'Successful',
          data: days.map(() => Math.floor(Math.random() * 100) + 50)
        },
        {
          name: 'Failed',
          data: days.map(() => Math.floor(Math.random() * 30) + 5)
        }
      ]
    },
    pieChart: {
      labels: eventTypes,
      data: eventTypes.map(() => Math.floor(Math.random() * 100) + 10)
    }
  };
};

// Generate initial data
export const mockLogs = generateLogs(200);
export const mockJobs = generateJobs(12);
