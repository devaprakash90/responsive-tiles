
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Activity, 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle 
} from 'lucide-react';
import { KPI } from '@/lib/mockData';

interface KPITileProps {
  data: KPI;
  className?: string;
}

export const KPITile: React.FC<KPITileProps> = ({
  data,
  className,
}) => {
  const { title, value, change, timeframe, icon } = data;

  const renderIcon = () => {
    switch (icon) {
      case 'activity':
        return <Activity className="h-5 w-5" />;
      case 'bar-chart':
        return <BarChart className="h-5 w-5" />;
      case 'trending-up':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        'glass-effect rounded-2xl p-6 flex flex-col h-full',
        'transition-all duration-400 ease-apple hover:shadow-glass-hover',
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-accent/80 p-2.5 rounded-xl">
          {renderIcon()}
        </div>
        
        <div className={cn(
          'text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1',
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        )}>
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-1.5">{title}</p>
      
      <h3 className="text-3xl font-semibold mb-1">{value.toLocaleString()}</h3>
      
      <p className="text-xs text-muted-foreground">{timeframe}</p>
    </div>
  );
};

export default KPITile;
