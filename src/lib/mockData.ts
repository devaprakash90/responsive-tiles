export interface KPI {
  id: string;
  title: string;
  value: number;
  change: number;
  timeframe: string;
  icon: 'activity' | 'bar-chart' | 'trending-up' | string;
  
  // Keep the old properties for backward compatibility
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

// Add the getChartData function
export const getChartData = () => {
  return {
    barChart: [
      { name: 'Mon', value: 120 },
      { name: 'Tue', value: 90 },
      { name: 'Wed', value: 150 },
      { name: 'Thu', value: 85 },
      { name: 'Fri', value: 110 },
      { name: 'Sat', value: 70 },
      { name: 'Sun', value: 60 },
    ],
    lineChart: [
      { name: 'Jan', value: 95 },
      { name: 'Feb', value: 97 },
      { name: 'Mar', value: 94 },
      { name: 'Apr', value: 98 },
      { name: 'May', value: 99 },
      { name: 'Jun', value: 96 },
    ],
    pieChart: [
      { name: 'Login', value: 35 },
      { name: 'Logout', value: 25 },
      { name: 'API', value: 20 },
      { name: 'Error', value: 15 },
      { name: 'Other', value: 5 },
    ],
  };
};

export const kpiData: KPI[] = [
  {
    id: 'kpi-1',
    title: 'Total Events',
    value: 12345,
    change: 12,
    timeframe: 'vs last week',
    icon: 'activity',
    
    // Keep old properties
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
    
    // Keep old properties
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
    
    // Keep old properties
    label: 'Error Rate',
    trend: 'down',
    trendValue: -0.1,
  },
];

export const mockLogs: Log[] = [
  {
    id: 'log-1',
    timestamp: '2023-10-15T12:34:56Z',
    eventType: 'USER_LOGIN',
    userId: 'user123',
    status: 'success',
    message: 'User logged in successfully',
    details: {
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
    },
  },
  {
    id: 'log-2',
    timestamp: '2023-10-15T12:35:10Z',
    eventType: 'DATA_ACCESS',
    userId: 'user456',
    status: 'info',
    message: 'User accessed sensitive data',
    details: {
      fileId: 'file001',
      accessType: 'read',
    },
  },
  {
    id: 'log-3',
    timestamp: '2023-10-15T12:36:00Z',
    eventType: 'SYSTEM_ERROR',
    userId: 'system',
    status: 'error',
    message: 'Failed to connect to database',
    details: {
      errorCode: '500',
      errorMessage: 'Connection timeout',
    },
  },
  {
    id: 'log-4',
    timestamp: '2023-10-15T12:37:00Z',
    eventType: 'USER_LOGOUT',
    userId: 'user123',
    status: 'success',
    message: 'User logged out',
    details: {
      sessionDuration: '3600',
    },
  },
  {
    id: 'log-5',
    timestamp: '2023-10-15T12:38:00Z',
    eventType: 'WARNING',
    userId: 'system',
    status: 'warning',
    message: 'High CPU usage detected',
    details: {
      cpuUsage: '95%',
    },
  },
];

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    name: 'Daily Backup',
    description: 'Backup all databases',
    schedule: '0 0 * * *',
    status: 'active',
    lastRun: '2023-10-14T23:59:59Z',
    nextRun: '2023-10-15T00:00:00Z',
    createdBy: 'system',
    createdAt: '2023-10-01T10:00:00Z',
  },
  {
    id: 'job-2',
    name: 'Weekly Report',
    description: 'Generate weekly report',
    schedule: '0 0 * * 0',
    status: 'active',
    lastRun: '2023-10-14T23:59:59Z',
    nextRun: '2023-10-21T00:00:00Z',
    createdBy: 'admin',
    createdAt: '2023-10-02T11:30:00Z',
  },
  {
    id: 'job-3',
    name: 'Monthly Cleanup',
    description: 'Cleanup old logs',
    schedule: '0 0 1 * *',
    status: 'paused',
    lastRun: '2023-09-30T23:59:59Z',
    nextRun: 'N/A',
    createdBy: 'admin',
    createdAt: '2023-09-15T09:45:00Z',
  },
  {
    id: 'job-4',
    name: 'Data Synchronization',
    description: 'Sync data with external systems',
    schedule: '0 */4 * * *',
    status: 'failed',
    lastRun: '2023-10-14T20:00:00Z',
    nextRun: '2023-10-15T00:00:00Z',
    createdBy: 'system',
    createdAt: '2023-09-20T14:20:00Z',
  },
];

// Add mockJobLogs data
export const mockJobLogs: Log[] = [
  {
    id: "jl-1",
    timestamp: "2023-10-15T14:30:00Z",
    eventType: "REPORT_GENERATION",
    userId: "system",
    status: "success",
    message: "Daily report generation completed successfully",
    details: {
      jobId: "job-1",
      duration: "120s",
      records: 1250,
      system: "reporting"
    }
  },
  {
    id: "jl-2",
    timestamp: "2023-10-15T02:00:00Z",
    eventType: "DATA_BACKUP",
    userId: "system",
    status: "success",
    message: "Daily backup completed",
    details: {
      jobId: "job-2",
      duration: "540s",
      size: "2.3GB",
      system: "data"
    }
  },
  {
    id: "jl-3",
    timestamp: "2023-10-14T22:00:00Z",
    eventType: "USER_SYNC",
    userId: "system",
    status: "warning",
    message: "User synchronization completed with warnings",
    details: {
      jobId: "job-3",
      duration: "45s",
      users: 1203,
      warnings: 3,
      system: "auth"
    }
  },
  {
    id: "jl-4",
    timestamp: "2023-10-14T18:00:00Z",
    eventType: "LOG_CLEANUP",
    userId: "system",
    status: "error",
    message: "Failed to clean up old logs",
    details: {
      jobId: "job-4",
      error: "Database connection timeout",
      system: "data"
    }
  },
  {
    id: "jl-5",
    timestamp: "2023-10-14T12:00:00Z",
    eventType: "SYSTEM_HEALTH_CHECK",
    userId: "system",
    status: "info",
    message: "System health check completed",
    details: {
      jobId: "job-5",
      duration: "30s",
      services: {
        database: "healthy",
        api: "healthy",
        cache: "degraded"
      },
      system: "reporting"
    }
  }
];
