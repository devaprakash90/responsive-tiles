
import React, { useState } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import { mockJobs } from '@/lib/jobData';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, Play, Pause, AlertCircle, MoreHorizontal, Edit, Trash2, Check } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Job } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

const JobScheduler = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'cards'>('table');
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    if (dateString === 'N/A') return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-600';
      case 'paused':
        return 'bg-amber-50 text-amber-600';
      case 'failed':
        return 'bg-red-50 text-red-600';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return <Play className="h-3.5 w-3.5" />;
      case 'paused':
        return <Pause className="h-3.5 w-3.5" />;
      case 'failed':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'inactive':
        return <AlertCircle className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const handleCreateJob = () => {
    // This would typically call an API to create a job
    const newJob = {
      id: `job-${jobs.length + 1}`,
      name: 'New Job',
      description: 'New job description',
      schedule: '0 * * * *',
      status: 'inactive' as const,
      lastRun: '',
      nextRun: formatDate(new Date(Date.now() + 3600000).toISOString()),
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
    };
    
    setJobs([...jobs, newJob]);
    setOpenDialog(false);
    toast({
      title: "Job Created",
      description: "Your job has been successfully created",
    });
  };

  const toggleJobStatus = (jobId: string) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        const newStatus = job.status === 'active' ? 'paused' : 'active';
        return {
          ...job,
          status: newStatus,
          nextRun: newStatus === 'paused' ? 'N/A' : formatDate(new Date(Date.now() + 3600000).toISOString()),
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    toast({
      title: "Job Updated",
      description: "Job status has been updated successfully",
    });
  };

  const deleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    toast({
      title: "Job Deleted",
      description: "The job has been deleted successfully",
      variant: "destructive",
    });
  };

  const runJobNow = (jobId: string) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          lastRun: new Date().toISOString(),
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    toast({
      title: "Job Running",
      description: "The job has been triggered to run now",
    });
  };

  return (
    <AppLayout>
      <PageTransition>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Job Scheduler</h1>
          <p className="text-muted-foreground">
            Create and manage scheduled jobs for your application.
          </p>
        </header>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <Tabs 
            defaultValue="table" 
            className="w-full"
            value={activeView}
            onValueChange={(value) => setActiveView(value as 'table' | 'cards')}
          >
            <div className="flex justify-between items-center w-full mb-4">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>
              
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Job</DialogTitle>
                    <DialogDescription>
                      Add a new scheduled job to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Job name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="schedule" className="text-right">
                        Schedule
                      </Label>
                      <Input
                        id="schedule"
                        placeholder="CRON expression (e.g., 0 0 * * *)"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Job description"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateJob}>
                      Create Job
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <TabsContent value="table" className="mt-0">
              <div className="rounded-lg border glass-effect overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Job Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.name}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{job.description}</TableCell>
                        <TableCell>
                          <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono">
                            {job.schedule}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                            getStatusColor(job.status)
                          )}>
                            {getStatusIcon(job.status)}
                            <span>{job.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(job.lastRun)}</TableCell>
                        <TableCell>{formatDate(job.nextRun)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleJobStatus(job.id)}>
                                {job.status === 'active' ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    <span>Pause</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    <span>Activate</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => runJobNow(job.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Run Now</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => deleteJob(job.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="glass-effect rounded-lg border overflow-hidden"
                  >
                    <div className="p-6 pb-3">
                      <div className="flex justify-between items-start mb-3">
                        <div className={cn(
                          'text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5',
                          getStatusColor(job.status)
                        )}>
                          {getStatusIcon(job.status)}
                          <span className="capitalize">{job.status}</span>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleJobStatus(job.id)}>
                              {job.status === 'active' ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  <span>Pause</span>
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  <span>Activate</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => runJobNow(job.id)}>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Run Now</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => deleteJob(job.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <h3 className="text-xl font-semibold mt-2">{job.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Schedule:</span>
                          <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono">
                            {job.schedule}
                          </code>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Last Run:</span>
                          <span>{formatDate(job.lastRun)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Next Run:</span>
                          <span>{formatDate(job.nextRun)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t px-6 py-3 text-xs text-muted-foreground">
                      Created by {job.createdBy} on {formatDate(job.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </AppLayout>
  );
};

export default JobScheduler;
