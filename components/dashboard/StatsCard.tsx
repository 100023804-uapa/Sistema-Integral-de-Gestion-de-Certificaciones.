import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  variant = 'secondary',
  className 
}: StatsCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <Card className={cn(
      "p-6 rounded-3xl border-none shadow-xl",
      isPrimary ? "bg-primary text-white" : "bg-white text-primary",
      className
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "p-3 rounded-2xl",
          isPrimary ? "bg-white/10" : "bg-accent/10"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            isPrimary ? "text-accent" : "text-accent"
          )} />
        </div>
        {trend && (
          <Badge variant={isPrimary ? "white" : "success"} className="font-bold">
            {trend}
          </Badge>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className={cn(
          "text-4xl font-bold tracking-tight",
          isPrimary ? "text-white" : "text-primary text-glow"
        )}>
          {value}
        </h3>
        <p className={cn(
          "text-sm font-medium opacity-70",
          isPrimary ? "text-blue-100" : "text-gray-500"
        )}>
          {title}
        </p>
      </div>
    </Card>
  );
}
