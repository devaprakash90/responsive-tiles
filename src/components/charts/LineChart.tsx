
import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      name: string;
      data: number[];
    }[];
  };
  title?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-effect p-3 border border-border/60 rounded-lg shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  className,
}) => {
  const chartData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.name] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {title && (
        <h3 className="text-lg font-medium mb-4">{title}</h3>
      )}
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            {data.datasets.map((dataset, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={dataset.name}
                stroke={index === 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                strokeWidth={2}
                dot={{ 
                  r: 4, 
                  fill: 'white', 
                  strokeWidth: 2, 
                  stroke: index === 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))" 
                }}
                activeDot={{ 
                  r: 6, 
                  fill: index === 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))",
                  stroke: 'white',
                  strokeWidth: 2
                }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
