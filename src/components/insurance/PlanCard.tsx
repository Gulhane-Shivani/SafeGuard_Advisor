import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, HeartPulse, Car, Home, X, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
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
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    if (!termsAccepted) return;
    setIsProcessing(true);
    setTimeout(() => {
      const storedStr = localStorage.getItem('purchasedPolicies');
      const storedPolicies = storedStr ? JSON.parse(storedStr) : [];
      
      const newPolicy = {
        id: `NEW-${Math.floor(Math.random() * 10000)}`,
        policy_number: `POL-${Math.floor(100000 + Math.random() * 900000)}`,
        title: title,
        provider: provider,
        type: type === 'health' ? 'Health Insurance' : type === 'car' || type === 'auto' ? 'Motor Insurance' : 'Life Insurance',
        status: 'Active',
        premium: `₹${price}`,
        due_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        start_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        coverage: features,
        benefits: ["Comprehensive coverage", "IRDAI Approved"],
        nominee: "Self"
      };
      
      localStorage.setItem('purchasedPolicies', JSON.stringify([newPolicy, ...storedPolicies]));
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setStep('details');
      setTermsAccepted(false);
      setIsProcessing(false);
    }, 300);
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
        "relative group p-8 rounded-[2rem] transition-all duration-500 border shadow-lg hover:shadow-2xl",
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
            <p className={cn("text-2xl font-black", recommended ? "text-white" : "text-slate-900")}>
              &#8377;{price}
            </p>
          </div>
        </div>

        <div className="mb-4 px-1">
          <h3 className={cn("text-lg font-bold leading-tight truncate mb-1", recommended ? "text-white" : "text-slate-900")}>{title}</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-teal-500">
            {provider}
          </p>
        </div>

        <p className={cn("text-xs leading-relaxed mb-6 px-1 line-clamp-2", recommended ? "text-slate-400" : "text-slate-400")}>
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
              <span className={cn("text-xs font-bold tracking-tight", recommended ? "text-slate-300" : "text-slate-600")}>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => setShowModal(true)}
            className={cn(
              "w-full py-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap uppercase tracking-widest shadow-lg",
              recommended 
                ? "bg-teal-600 text-white hover:bg-teal-500 shadow-teal-900/20" 
                : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            View Plan <ArrowRight className="w-4 h-4" />
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
                onClick={(e) => { e.stopPropagation(); handleCloseModal(); }}
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
            <div className="p-8 md:p-10 max-h-[75vh] overflow-y-auto">
              {step === 'details' && (
                <div className="animate-in fade-in duration-500">
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

                  <div className="mb-10">
                    <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
                       Coverage Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Check className="w-4 h-4 text-teal-500" /> What's Covered</h5>
                        <ul className="space-y-3">
                          {features.map((feature, idx) => (
                            <li key={idx} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                          <li className="text-xs font-medium text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                            Comprehensive support & claims assistance
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h5 className="text-sm font-bold text-slate-800 flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> What's Not Covered</h5>
                        <ul className="space-y-3">
                          <li className="text-xs font-medium text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            Pre-existing conditions (first 24 months)
                          </li>
                          <li className="text-xs font-medium text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            Injuries under influence of alcohol
                          </li>
                          <li className="text-xs font-medium text-slate-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            Cosmetic procedures & treatments
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handlePurchaseClick}
                    className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs flex items-center justify-center gap-3 group"
                  >
                    Buy Plan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Complete Purchase</h2>
                    <p className="text-sm text-slate-500 mt-2">You are buying <b>{title}</b> for <span className="text-slate-900 font-bold">&#8377;{price}</span>/month</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-400" /> Payment Details
                    </h4>
                    
                    <div className="space-y-4">
                      <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow bg-white" defaultValue="John Doe" />
                      <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow bg-white" defaultValue="**** **** **** 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow bg-white" defaultValue="12/25" />
                        <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow bg-white" defaultValue="***" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 flex items-start gap-3 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                      I have read and agree to the <a href="#" className="text-teal-600 font-bold underline hover:text-teal-700">Terms & Conditions</a>. I verify the coverage limits, exclusions, and waiting periods associated with this policy.
                    </label>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={!termsAccepted || isProcessing}
                    className="w-full py-5 bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none text-white rounded-[1.5rem] font-black hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs flex items-center justify-center gap-3 group"
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...</>
                    ) : (
                      <>Pay &#8377;{price} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  <button 
                    onClick={() => setStep('details')}
                    className="w-full mt-4 py-3 text-slate-400 hover:text-slate-800 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Back to Details
                  </button>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Policy Activated!</h2>
                  <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
                    Your <b>{title}</b> plan is now active. We've sent the policy documents to your registered email address.
                  </p>
                  
                  <div className="bg-slate-50 rounded-3xl p-6 mb-10 text-left border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy Number</span>
                      <span className="text-sm font-black text-slate-800">POL-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                      <span className="text-xs font-black text-green-600 bg-green-100 px-3 py-1.5 rounded-full uppercase tracking-widest">Active</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      handleCloseModal();
                      navigate('/customer/policies');
                    }}
                    className="w-full py-5 bg-teal-600 text-white rounded-[1.5rem] font-black hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 uppercase tracking-widest text-xs"
                  >
                    Done
                  </button>
                </div>
              )}
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
