
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

interface BarChartProps {
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

export const BarChart: React.FC<BarChartProps> = ({
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
          <RechartsBarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            barCategoryGap={8}
            barGap={2}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.1)' }} />
            {data.datasets.map((dataset, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={dataset.name}
                fill={index === 0 ? "url(#colorBar)" : `hsl(${214 + index * 30} 95% 60% / 0.7)`}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
