
import React from 'react';
import { cn } from '../../utils/helpers';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendUp?: boolean;
  color?: 'teal' | 'blue' | 'purple' | 'orange' | 'emerald' | 'amber';
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, icon: Icon, trend, trendUp, color = 'teal' }) => {
  const colors = {
    teal: 'bg-teal-50 text-teal-600 shadow-teal-100',
    blue: 'bg-blue-50 text-blue-600 shadow-blue-100',
    purple: 'bg-purple-50 text-purple-600 shadow-purple-100',
    orange: 'bg-orange-50 text-orange-600 shadow-orange-100',
    emerald: 'bg-emerald-50 text-emerald-600 shadow-emerald-100',
    amber: 'bg-amber-50 text-amber-600 shadow-amber-100',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colors[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "text-[10px] font-black px-2 py-1 rounded-lg",
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {trendUp ? '↑' : '↓'} {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
};
