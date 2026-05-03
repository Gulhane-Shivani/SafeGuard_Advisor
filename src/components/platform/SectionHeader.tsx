
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-1 bg-teal-600 rounded-full" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
        </div>
        {description && <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
};
