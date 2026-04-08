import React from 'react';
import { Check, ArrowRight, ShieldCheck, HeartPulse, Car, Home } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface PlanCardProps {
  title: string;
  type: 'health' | 'life' | 'auto' | 'home';
  price: string;
  features: string[];
  recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, type, price, features, recommended }) => {
  const getIcon = () => {
    switch (type) {
      case 'health': return <HeartPulse className="w-6 h-6" />;
      case 'auto': return <Car className="w-6 h-6" />;
      case 'home': return <Home className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const getThemeColor = () => {
    switch (type) {
      case 'health': return 'bg-emerald-50 text-emerald-600';
      case 'auto': return 'bg-amber-50 text-amber-600';
      case 'home': return 'bg-indigo-50 text-indigo-600';
      default: return 'bg-teal-50 text-accent';
    }
  };

  return (
    <div className={cn(
      "relative group p-6 rounded-3xl transition-all duration-300 border",
      recommended 
        ? "bg-white border-teal-200 shadow-2xl scale-105 z-10" 
        : "bg-white border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
    )}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary/30">
          Most Recommended
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div className={cn("p-3 rounded-2xl", getThemeColor())}>
          {getIcon()}
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-tight">Starting from</p>
          <p className="text-2xl font-bold text-slate-900">${price}<span className="text-sm font-normal text-slate-400">/mo</span></p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">
        Comprehensive coverage tailored for your specific security needs and peace of mind.
      </p>

      <div className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <Check className="w-3 h-3 text-slate-600" />
            </div>
            <span className="text-sm text-slate-600 font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <button className={cn(
        "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
        recommended
          ? "bg-accent text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700"
          : "bg-primary text-white hover:bg-slate-800"
      )}>
        Get Started <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PlanCard;
