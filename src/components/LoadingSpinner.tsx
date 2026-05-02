import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-teal-600/20 border-t-teal-600 rounded-full animate-spin" />
  </div>
);
