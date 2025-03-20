
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  AlertCircle,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  Check
} from 'lucide-react';
import { Job } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobsListProps {
  jobs: Job[];
  className?: string;
}

export const JobsList: React.FC<JobsListProps> = ({
  jobs,
  className,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
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
      default:
        return null;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Scheduled Jobs</h2>
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
              <Button onClick={() => setOpenDialog(false)}>
                Create Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card 
            key={job.id} 
            className="glass-effect overflow-hidden transition-all duration-400 hover:shadow-glass-hover"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
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
                    <DropdownMenuItem>
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
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Run Now</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <CardTitle className="text-xl mt-3">{job.name}</CardTitle>
              {job.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {job.description}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="pb-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Schedule:</span>
                  <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono">
                    {job.schedule}
                  </code>
                </div>
                
                {job.lastRun && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Run:</span>
                    <span>{formatDate(job.lastRun)}</span>
                  </div>
                )}
                
                {job.nextRun && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Next Run:</span>
                    <span>{formatDate(job.nextRun)}</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="pt-3 text-xs text-muted-foreground">
              Created by {job.createdBy} on {formatDate(job.createdAt)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
