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
      "relative group p-8 rounded-3xl transition-all duration-500 border overflow-hidden",
      recommended
        ? "bg-slate-900 border-slate-800 shadow-2xl scale-105 z-10 text-white"
        : "bg-white border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1"
    )}>
      {recommended && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-teal-600/30">
            Top Recommendation
          </div>
        </>
      )}

      <div className="flex items-start justify-between mb-8">
        <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500", getThemeColor())}>
          {getIcon()}
        </div>
        <div className="text-right">
          <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", recommended ? "text-slate-400" : "text-slate-400")}>Monthly</p>
          <p className={cn("text-3xl font-bold", recommended ? "text-white" : "text-slate-900")}>
            &#8377;{price}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className={cn("text-xl font-bold mb-1", recommended ? "text-white" : "text-slate-900")}>{title}</h3>
        <p className={cn("text-xs font-semibold uppercase tracking-wider", recommended ? "text-teal-400" : "text-teal-600")}>
          {provider}
        </p>
      </div>

      <p className={cn("text-sm leading-relaxed mb-8", recommended ? "text-slate-400" : "text-slate-500")}>
        Industry leading coverage specifically designed for your {type} protection needs in India.
      </p>

      <div className="space-y-4 mb-10">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors",
              recommended ? "bg-teal-500/20 text-teal-400" : "bg-teal-50 text-teal-600"
            )}>
              <Check className="w-3 h-3" />
            </div>
            <span className={cn("text-sm font-medium", recommended ? "text-slate-300" : "text-slate-600")}>{feature}</span>
          </div>
        ))}
      </div>

      <button className={cn(
        "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group-hover:gap-3",
        recommended
          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25 hover:bg-teal-500 hover:shadow-teal-500/40"
          : "bg-slate-900 text-white hover:bg-slate-800"
      )}>
        View Plan Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PlanCard;
