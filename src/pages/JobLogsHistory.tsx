
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import AppLayout from '@/layouts/AppLayout';
import LogsTable from '@/components/LogsTable';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { mockJobLogs } from '@/lib/mockData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const JobLogsHistory = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [system, setSystem] = React.useState<string>('all');
  const [status, setStatus] = React.useState<string>('all');

  return (
    <AppLayout>
      <PageTransition>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Job Logs History</h1>
          <p className="text-muted-foreground">
            View the execution history and status of all scheduled jobs.
          </p>
        </header>
        
        <div className="mb-6 flex flex-wrap gap-3">
          <Select value={system} onValueChange={setSystem}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by System" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Systems</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="data">Data Processing</SelectItem>
              <SelectItem value="reporting">Reporting</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" className="ml-auto">
            <Filter className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
        
        <LogsTable logs={mockJobLogs} className="mt-4" />
      </PageTransition>
    </AppLayout>
  );
};

export default JobLogsHistory;
