import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  variant?: 'large' | 'small';
}

export function QuickAction({ 
  label, 
  icon: Icon, 
  onClick, 
  className,
  variant = 'large'
}: QuickActionProps) {
  const isLarge = variant === 'large';

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 transition-all duration-300",
        "group active:scale-95",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300",
        "group-hover:shadow-md group-hover:border-accent/20 group-hover:bg-accent/5",
        isLarge ? "h-20 w-20" : "h-14 w-14"
      )}>
        <Icon className={cn(
          "h-8 w-8 text-primary transition-colors",
          "group-hover:text-accent"
        )} />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter text-center max-w-[80px]">
        {label}
      </span>
    </button>
  );
}
