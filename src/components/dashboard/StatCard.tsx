import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-divider bg-bg-secondary p-6 transition-all duration-200 hover:shadow-card',
        variant === 'primary' && 'border-accent bg-bg-secondary',
        variant === 'accent' && 'border-accent bg-bg-secondary',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                trend === 'up' && 'text-accent',
                trend === 'down' && 'text-accent',
                trend === 'neutral' && 'text-muted'
              )}
            >
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trendValue}
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg bg-bg-secondary',
            (variant === 'primary' || variant === 'accent') && 'border border-accent bg-accent/10',
          )}
        >
          <Icon
            className={cn(
              'h-6 w-6',
              (variant === 'primary' || variant === 'accent') ? 'text-accent' : 'text-text-primary'
            )}
          />
        </div>
      </div>
    </div>
  );
}
