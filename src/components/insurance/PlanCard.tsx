import React from 'react';
import { Check, ArrowRight, ShieldCheck, HeartPulse, Car, Home } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface PlanCardProps {
  title: string;
  type: 'health' | 'life' | 'car' | 'auto' | 'home' | 'investment';
  price: string;
  provider: string;
  features: string[];
  recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, type, price, provider, features, recommended }) => {
  const getIcon = () => {
    switch (type) {
      case 'health': return <HeartPulse className="w-6 h-6" />;
      case 'auto':
      case 'car': return <Car className="w-6 h-6" />;
      case 'home': return <Home className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const getThemeColor = () => {
    switch (type) {
      case 'health': return 'bg-blue-50 text-blue-600';
      case 'auto':
      case 'car': return 'bg-orange-50 text-orange-600';
      case 'home': return 'bg-indigo-50 text-indigo-600';
      case 'investment': return 'bg-teal-50 text-teal-600';
      default: return 'bg-teal-50 text-teal-600';
    }
  };

  return (
    <div className={cn(
      "relative group p-6 rounded-[2rem] transition-all duration-500 border overflow-hidden",
      recommended
        ? "bg-slate-900 border-slate-800 shadow-2xl scale-105 z-10 text-white"
        : "bg-white border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1"
    )}>
      {recommended && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[9px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-[0.2em] shadow-lg shadow-teal-600/20">
            Top Pick
          </div>
        </>
      )}

      <div className="flex items-start justify-between mb-6 pt-2">
        <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110 duration-500", getThemeColor())}>
          {getIcon()}
        </div>
        <div className="text-right">
          <p className={cn("text-[9px] font-bold uppercase tracking-widest mb-0.5", recommended ? "text-slate-500" : "text-slate-400")}>Monthly</p>
          <p className={cn("text-2xl font-black", recommended ? "text-white" : "text-slate-900")}>
            &#8377;{price}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className={cn("text-lg font-bold mb-0.5", recommended ? "text-white" : "text-slate-900")}>{title}</h3>
        <p className={cn("text-[10px] font-extrabold uppercase tracking-widest", recommended ? "text-teal-400" : "text-teal-600")}>
          {provider}
        </p>
      </div>

      <p className={cn("text-xs leading-relaxed mb-6", recommended ? "text-slate-400" : "text-slate-400")}>
        Verified {type} protection plan with comprehensive Indian network coverage.
      </p>

      <div className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <div className={cn(
              "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors",
              recommended ? "bg-teal-500/20 text-teal-400" : "bg-teal-50 text-teal-600"
            )}>
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className={cn("text-xs font-semibold", recommended ? "text-slate-300" : "text-slate-600")}>{feature}</span>
          </div>
        ))}
      </div>

      <button className={cn(
        "w-full py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all group-hover:gap-3",
        recommended
          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-500"
          : "bg-slate-900 text-white hover:bg-slate-800"
      )}>
        View Plan <ArrowRight className="w-4 h-4" />
      </button>
    </div>

  );
};

export default PlanCard;
