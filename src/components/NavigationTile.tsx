
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  className?: string;
}

export const NavigationTile: React.FC<NavigationTileProps> = ({
  title,
  description,
  icon: Icon,
  to,
  className,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'group relative flex flex-col p-6 md:p-8 rounded-2xl glass-effect glass-effect-hover',
        'border border-border/60 overflow-hidden',
        'transition-all duration-400 ease-apple',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-apple" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="bg-accent/90 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary/80 group-hover:bg-primary/10 transition-colors duration-400 ease-apple">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground group-hover:text-primary transition-colors duration-400 ease-apple"
          >
            <path 
              d="M6 12L10 8L6 4" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-foreground group-hover:text-primary transition-colors duration-400 ease-apple">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm">
        {description}
      </p>
    </Link>
  );
};

export default NavigationTile;
