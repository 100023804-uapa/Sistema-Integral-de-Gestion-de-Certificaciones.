import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon, CheckCircle2, AlertCircle, Bookmark, Printer } from 'lucide-react';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  icon: LucideIcon;
}

interface ActivityListProps {
  activities: ActivityItem[];
  className?: string;
}

const statusColors = {
  success: 'bg-green-100 text-green-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-blue-100 text-blue-600',
  error: 'bg-red-100 text-red-600',
};

export function ActivityList({ activities, className }: ActivityListProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm rounded-3xl", className)}>
      <div className="divide-y divide-gray-50">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
              <div className={cn(
                "p-2.5 rounded-full shrink-0",
                statusColors[activity.type] || statusColors.info
              )}>
                <Icon size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-primary truncate">
                  {activity.title}
                </h4>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {activity.description}
                </p>
              </div>
              
              <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap pt-1">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 bg-gray-50/50 text-center border-t border-gray-50">
        <button className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider hover:underline">
          Ver todo
        </button>
      </div>
    </Card>
  );
}
