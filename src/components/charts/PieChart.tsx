
import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend 
} from 'recharts';
import { cn } from '@/lib/utils';

interface PieChartProps {
  data: {
    labels: string[];
    data: number[];
  };
  title?: string;
  className?: string;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent-foreground))',
  'hsl(var(--destructive))',
  '#60A5FA',
  '#4F46E5',
  '#8B5CF6',
  '#EC4899',
  '#F43F5E',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#14B8A6',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-effect p-3 border border-border/60 rounded-lg shadow-sm">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          Value: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  className,
}) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.data[index],
  }));

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      {title && (
        <h3 className="text-lg font-medium mb-4">{title}</h3>
      )}
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  strokeWidth={1}
                  stroke="hsl(var(--background))"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value, entry, index) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
