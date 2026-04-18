import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Target, Shield, HeartPulse, Car, TrendingUp } from 'lucide-react';
import { cn } from '../utils/helpers';
import { AuthModal } from '../components/layout/AuthModal';

export const Advisor: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    category: '',
    age: '',
    income: '',
    familySize: '1',
    riskAppetite: 'balanced',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSelect = (field: string, value: string) => {
    // GATEKEEPING: Check if logged in before proceeding
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/auth', { state: { from: '/advisor' } });
      return;
    }

    setFormData({ ...formData, [field]: value });
    if (field === 'category') nextStep();
  };

  const getRecommendation = () => {
    const income = parseInt(formData.income);
    if (formData.category === 'health') {
      if (parseInt(formData.familySize) >= 3)
        return { name: 'Niva Bupa Reassure Family Floater', price: '1,499', insurer: 'Niva Bupa',   cover: '10 Lakh', claimRatio: '90%' };
      return   { name: 'Star Comprehensive Health',         price: '799',   insurer: 'Star Health', cover: '5 Lakh',  claimRatio: '92%' };
    }
    if (formData.category === 'life') {
      if (income > 10)
        return { name: 'HDFC Life Click 2 Protect', price: '1,800', insurer: 'HDFC Life',   cover: '2 Crore', claimRatio: '99.4%' };
      return   { name: 'LIC Tech Term',             price: '1,199', insurer: 'LIC of India', cover: '1 Crore', claimRatio: '98.7%' };
    }
    if (formData.category === 'motor')
      return { name: 'Bajaj Allianz Comprehensive', price: '499',   insurer: 'Bajaj Allianz', cover: 'OD + Third Party', claimRatio: '89%' };
    return   { name: 'Tata AIA Smart Wealth',       price: '2,500', insurer: 'Tata AIA Life', cover: '1 Crore',          claimRatio: '98.5%' };
  };

  const rec = getRecommendation();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Target className="w-3.5 h-3.5" /> Smart AI Advisor
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">What Would You Like to Insure?</h2>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">Our AI engine will analyze your profile to suggest the most cost-effective and comprehensive plans approved by IRDAI.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { id: 'health',     label: 'Health',      Icon: HeartPulse,  bg: 'bg-blue-100 text-blue-600',    ins: 'Star, Niva Bupa' },
                { id: 'life',       label: 'Life / Term', Icon: Shield,      bg: 'bg-purple-100 text-purple-600', ins: 'LIC, HDFC, Max' },
                { id: 'motor',      label: 'Motor',       Icon: Car,         bg: 'bg-orange-100 text-orange-600', ins: 'ICICI, Bajaj' },
                { id: 'investment', label: 'Investment',  Icon: TrendingUp,  bg: 'bg-teal-100 text-teal-600',     ins: 'ULIP, SIP' },
              ].map(({ id, label, Icon, bg, ins }) => (
                <button
                  key={id}
                  onClick={() => handleSelect('category', id)}
                  className={cn(
                    "p-6 rounded-[2rem] border-2 transition-all text-center group relative overflow-hidden",
                    formData.category === id ? "border-teal-600 bg-teal-50/50 shadow-xl shadow-teal-600/10" : "border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg"
                  )}
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500", bg)}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-base font-bold text-slate-800 block mb-0.5">{label}</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{ins}</span>
                  {formData.category === id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

        );

      case 2:
        return (
          <div className="max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Your Financial Profile</h2>
              <p className="text-slate-500 text-sm">Personalize your recommendation with basic data.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-1">Your Age</label>
                <input
                  type="number"
                  placeholder="e.g. 28"
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-bold text-base"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-1">Annual Income</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">&#8377;</span>
                  <input
                    type="number"
                    placeholder="e.g. 8"
                    className="w-full pl-10 pr-24 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-bold text-base"
                    value={formData.income}
                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lakh / Year</span>
                </div>
              </div>
              <button
                onClick={nextStep}
                disabled={!formData.age || !formData.income}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-30 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-3"
              >
                Continue <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>

        );

      case 3:
        return (
          <div className="max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Coverage Preferences</h2>
              <p className="text-slate-500 text-sm">Tell us about your family size and risk appetite.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3.5 ml-1">Family Members to Cover</label>
                <div className="flex gap-3">
                  {['1', '2', '3', '4+'].map(num => (
                    <button
                      key={num}
                      onClick={() => setFormData({ ...formData, familySize: num })}
                      className={cn(
                        "flex-1 py-3.5 rounded-xl border-2 font-black transition-all text-sm",
                        formData.familySize === num
                          ? "border-teal-600 bg-teal-50 text-teal-700"
                          : "border-slate-100 bg-white text-slate-500 hover:border-teal-100"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-1">Risk Appetite</label>
                <select
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all bg-white font-bold"
                  value={formData.riskAppetite}
                  onChange={e => setFormData({ ...formData, riskAppetite: e.target.value })}
                >
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
              <button
                onClick={nextStep}
                className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
              >
                Analyze My Profile
              </button>
            </div>
          </div>

        );

      case 4:
        return (
          <div className="text-center max-w-2xl mx-auto animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-600/20">
              <Target className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Optimal Plan Isolated!</h2>
            <p className="text-slate-500 text-sm mb-8">
              Analysis complete for <b>{formData.category}</b> insurance.
            </p>
 
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl mb-8 text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-teal-600 text-white px-6 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] rounded-bl-2xl">
                Best Value Match
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-5">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{rec.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">{rec.insurer}</span>
                    <span className="text-teal-600 text-[9px] font-black uppercase tracking-wider">Approved by IRDAI</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900">&#8377;{rec.price}</span>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-widest mt-0.5"> / Month</span>
                </div>
              </div>
 
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Sum Insured', value: rec.cover },
                  { label: 'Claim Ratio',  value: rec.claimRatio },
                  { label: 'Tax Saving',    value: 'Up to ₹45k' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{item.value}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-1.5">{item.label}</div>
                  </div>
                ))}
              </div>
 
              <div className="space-y-3.5 mb-8">
                {['Verified 80C / 80D Benefits', 'Instant Cashless Network', 'Zero Waiting Period', '24/7 Priority Assistance'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3.5 text-slate-700 font-bold group">
                    <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs">{feat}</span>
                  </div>
                ))}
              </div>
 
              <button className="w-full py-4.5 bg-teal-600 text-white rounded-xl font-black hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/30 text-base uppercase tracking-widest">
                Unlock This Plan
              </button>
            </div>
 
            <button onClick={() => setStep(1)} className="group inline-flex items-center gap-2 text-slate-400 font-black hover:text-teal-600 transition-all text-[10px] uppercase tracking-widest">
              <ArrowLeft className="w-3.5 h-3.5" /> Restart Analysis
            </button>
          </div>

        );

      default: return null;
    }
  };

  return (
    <div className="pt-28 pb-16 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {step < 4 && (
          <div className="mb-12 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevStep}
                className={cn("flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest", step === 1 && "invisible")}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-[0.2em]">Step {step} of 3</span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
        {renderStep()}
      </div>

    </div>
  );
};

