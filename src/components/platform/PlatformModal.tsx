
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const PlatformModal: React.FC<PlatformModalProps> = ({ 
  isOpen, onClose, title, children, footer, size = 'md' 
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className={cn(
        "relative w-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden transition-all animate-in zoom-in-95 duration-300",
        sizes[size]
      )}>
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
        {footer && (
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
