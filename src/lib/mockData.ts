export interface KPI {
  id: string;
  label: string;
  value: number;
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
  status: 'active' | 'inactive';
  lastRun: string;
  nextRun: string;
}

export const kpiData: KPI[] = [
  {
    id: 'kpi-1',
    label: 'Total Events',
    value: 12345,
    trend: 'up',
    trendValue: 12,
  },
  {
    id: 'kpi-2',
    label: 'Unique Users',
    value: 500,
    trend: 'stable',
    trendValue: 0,
  },
  {
    id: 'kpi-3',
    label: 'Error Rate',
    value: 0.5,
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
  },
  {
    id: 'job-2',
    name: 'Weekly Report',
    description: 'Generate weekly report',
    schedule: '0 0 * * 0',
    status: 'active',
    lastRun: '2023-10-14T23:59:59Z',
    nextRun: '2023-10-21T00:00:00Z',
  },
  {
    id: 'job-3',
    name: 'Monthly Cleanup',
    description: 'Cleanup old logs',
    schedule: '0 0 1 * *',
    status: 'inactive',
    lastRun: '2023-09-30T23:59:59Z',
    nextRun: 'N/A',
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
