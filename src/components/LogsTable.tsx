
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Check, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  ChevronDown,
  ChevronUp,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Log } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LogsTableProps {
  logs: Log[];
  className?: string;
}

export const LogsTable: React.FC<LogsTableProps> = ({
  logs,
  className,
}) => {
  const [sortField, setSortField] = useState<keyof Log>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Log) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const renderStatusIcon = (status: Log['status']) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-emerald-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-sky-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 focus-visible:ring-primary transition-shadow"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="w-full overflow-auto rounded-lg glass-effect">
        <Table>
          <TableHeader className="border-b">
            <TableRow>
              <TableHead 
                className="w-[180px] cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center">
                  Timestamp
                  {sortField === 'timestamp' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('eventType')}
              >
                <div className="flex items-center">
                  Event Type
                  {sortField === 'eventType' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('userId')}
              >
                <div className="flex items-center">
                  User ID
                  {sortField === 'userId' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? 
                      <ChevronUp className="ml-1 h-4 w-4" /> : 
                      <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-auto">Message</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLogs.length > 0 ? (
              sortedLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <TableRow className="transition-colors hover:bg-muted/20">
                    <TableCell className="font-mono text-xs">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium">
                        {log.eventType}
                      </span>
                    </TableCell>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStatusIcon(log.status)}
                        <span className="capitalize text-sm">{log.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{log.message}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRowExpand(log.id)}
                        className="h-8 w-8"
                      >
                        {expandedRows[log.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows[log.id] && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/10 p-4">
                        <div className="text-sm text-muted-foreground">
                          <h4 className="font-medium text-foreground mb-2">Details</h4>
                          <pre className="bg-muted/20 p-3 rounded-md overflow-auto text-xs">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {sortedLogs.length} of {logs.length} logs
        </div>
      </div>
    </div>
  );
};

export default LogsTable;
