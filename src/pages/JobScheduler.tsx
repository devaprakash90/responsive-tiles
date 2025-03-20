
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import JobsList from '@/components/JobsList';
import { mockJobs } from '@/lib/mockData';
import AppLayout from '@/layouts/AppLayout';

const JobScheduler = () => {
  return (
    <AppLayout>
      <PageTransition>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Job Scheduler</h1>
          <p className="text-muted-foreground">
            Create and manage scheduled jobs for your application.
          </p>
        </header>
        
        <JobsList jobs={mockJobs} />
      </PageTransition>
    </AppLayout>
  );
};

export default JobScheduler;
