
import { Job } from './types';

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
