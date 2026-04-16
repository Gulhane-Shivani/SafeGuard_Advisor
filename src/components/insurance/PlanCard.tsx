import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ShieldCheck, HeartPulse, Car, Home, X, Shield } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { AuthModal } from '../layout/AuthModal';

interface PlanCardProps {
  title: string;
  type: 'health' | 'life' | 'car' | 'auto' | 'home' | 'investment';
  price: string;
  provider: string;
  features: string[];
  recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, type, price, provider, features, recommended }) => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handlePurchaseClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    // Proceed with purchase logic (not yet implemented)
    alert('Proceeding to purchase ' + title);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);


  const getIcon = () => {
    switch (type) {
      case 'health': return <HeartPulse className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      case 'home': return <Home className="w-4 h-4" />;
      default: return <ShieldCheck className="w-4 h-4" />;
    }
  };

  const getThemeColor = () => {
    if (recommended) return 'bg-teal-500 text-white';
    switch (type) {
      case 'health': return 'bg-blue-50 text-blue-600';
      case 'car': return 'bg-orange-50 text-orange-600';
      case 'home': return 'bg-indigo-50 text-indigo-600';
      case 'investment': return 'bg-teal-50 text-teal-600';
      default: return 'bg-teal-50 text-teal-600';
    }
  };

  return (
    <>
      <div className={cn(
        "relative group p-6 rounded-[2rem] transition-all duration-500 border shadow-lg hover:shadow-2xl",
        recommended 
          ? "bg-slate-900 border-slate-800 md:scale-110 z-20 shadow-slate-900/20" 
          : "bg-white border-slate-100 hover:-translate-y-1 z-10",
        showModal ? "!transform-none !transition-none" : ""
      )}>
        {recommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-30">
            Popular Choice
          </div>
        )}

        <div className="flex items-start justify-between mb-6 px-1">
          <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 shadow-sm", getThemeColor())}>
            {getIcon()}
          </div>
          <div className="text-right">
            <p className={cn("text-[8px] font-bold uppercase tracking-widest mb-1", recommended ? "text-slate-400" : "text-slate-400")}>Monthly</p>
            <p className={cn("text-xl font-black", recommended ? "text-white" : "text-slate-900")}>
              &#8377;{price}
            </p>
          </div>
        </div>

        <div className="mb-4 px-1">
          <h3 className={cn("text-base font-bold leading-tight truncate mb-1", recommended ? "text-white" : "text-slate-900")}>{title}</h3>
          <p className="text-[9px] font-black uppercase tracking-widest text-teal-500">
            {provider}
          </p>
        </div>

        <p className={cn("text-[11px] leading-relaxed mb-6 px-1 line-clamp-2", recommended ? "text-slate-400" : "text-slate-400")}>
          Verified {type} protection plan with comprehensive Indian network coverage.
        </p>

        <div className="space-y-3 mb-8 px-1">
          {features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={cn(
                "flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center",
                recommended ? "bg-teal-900/50 text-teal-400" : "bg-teal-50 text-teal-600"
              )}>
                <Check className="w-2 h-2" />
              </div>
              <span className={cn("text-[11px] font-bold tracking-tight", recommended ? "text-slate-300" : "text-slate-600")}>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => setShowModal(true)}
            className={cn(
              "w-full py-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap uppercase tracking-widest shadow-lg",
              recommended 
                ? "bg-teal-600 text-white hover:bg-teal-500 shadow-teal-900/20" 
                : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            View Plan <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Plan Detail Modal - Rendered outside the card to avoid transform issues */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-slate-100">
            {/* Modal Header */}
            <div className="relative h-40 bg-slate-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-transparent opacity-50" />
              <button 
                onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:rotate-90 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center relative z-10 shadow-2xl", 
                type === 'health' ? "bg-blue-600 text-white" : 
                type === 'car' ? "bg-orange-600 text-white" : 
                "bg-teal-600 text-white"
              )}>
                {React.cloneElement(getIcon() as React.ReactElement<{ className?: string }>, { className: 'w-10 h-10' })}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 md:p-10">
              <div className="text-center mb-10">
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">{provider}</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-10">
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group/item hover:bg-white hover:border-teal-100 transition-all">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Monthly Premium</p>
                  <p className="text-2xl font-black text-slate-900 group-hover/item:text-teal-600">&#8377;{price}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group/item hover:bg-white hover:border-teal-100 transition-all">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Claim Ratio</p>
                  <p className="text-2xl font-black text-slate-900 group-hover/item:text-teal-600">98.5%</p>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                   Plan Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 tracking-tight">{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Shield className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 tracking-tight">IRDAI Approved</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePurchaseClick}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs flex items-center justify-center gap-3 group"
              >
                Purchase Policy Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default PlanCard;
