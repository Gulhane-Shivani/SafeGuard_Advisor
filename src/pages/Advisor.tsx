import React, { useState } from 'react';
import { ArrowLeft, Target, Shield, HeartPulse, Car, TrendingUp } from 'lucide-react';
import { cn } from '../utils/helpers';

export const Advisor: React.FC = () => {
  const [step, setStep] = useState(1);
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
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Target className="w-4 h-4" /> Smart AI Advisor
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">What Would You Like to Insure?</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Our AI engine will analyze your profile to suggest the most cost-effective and comprehensive plans approved by IRDAI.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    "p-8 rounded-[2rem] border-2 transition-all text-center group relative overflow-hidden",
                    formData.category === id ? "border-teal-600 bg-teal-50/50 shadow-xl shadow-teal-600/10" : "border-slate-100 bg-white hover:border-teal-200 hover:shadow-lg"
                  )}
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500", bg)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold text-slate-800 block mb-1">{label}</span>
                  <span className="text-slate-400 text-xs font-medium">{ins}</span>
                  {formData.category === id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Financial Profile</h2>
              <p className="text-slate-500">Personalize your recommendation with basic financial data.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Your Age</label>
                <input
                  type="number"
                  placeholder="e.g. 28"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-semibold text-lg"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Annual Income (in Lakhs)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xl">&#8377;</span>
                  <input
                    type="number"
                    placeholder="e.g. 8"
                    className="w-full pl-12 pr-24 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all font-semibold text-lg"
                    value={formData.income}
                    onChange={e => setFormData({ ...formData, income: e.target.value })}
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 uppercase tracking-widest">Lakh/Year</span>
                </div>
              </div>
              <button
                onClick={nextStep}
                disabled={!formData.age || !formData.income}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-30 shadow-xl shadow-slate-900/20 text-lg flex items-center justify-center gap-3"
              >
                Next Step <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Coverage Preferences</h2>
              <p className="text-slate-500">Tell us about your family size and risk appetite.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4 ml-1">Family Members to Cover</label>
                <div className="flex gap-4">
                  {['1', '2', '3', '4+'].map(num => (
                    <button
                      key={num}
                      onClick={() => setFormData({ ...formData, familySize: num })}
                      className={cn(
                        "flex-1 py-4 rounded-2xl border-2 font-black transition-all text-base",
                        formData.familySize === num
                          ? "border-teal-600 bg-teal-50 text-teal-700 shadow-lg shadow-teal-600/5"
                          : "border-slate-100 bg-white text-slate-500 hover:border-teal-100"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">Risk Appetite</label>
                <select
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all bg-white font-semibold"
                  value={formData.riskAppetite}
                  onChange={e => setFormData({ ...formData, riskAppetite: e.target.value })}
                >
                  <option value="conservative">Conservative (Pure Protection)</option>
                  <option value="balanced">Balanced (Protection + Growth)</option>
                  <option value="aggressive">Aggressive (High Returns Focused)</option>
                </select>
              </div>
              <button
                onClick={nextStep}
                className="w-full py-5 bg-teal-600 text-white rounded-2xl font-extrabold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/20 text-lg"
              >
                Analyze My Profile
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center max-w-3xl mx-auto animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-teal-600/30">
              <Target className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3">Optimal Plan Isolated!</h2>
            <p className="text-slate-500 mb-10">
              Our Advisor algorithm successfully analyzed your profile for <b>{formData.category}</b> insurance.
            </p>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] mb-10 text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-teal-600 text-white px-8 py-2 font-bold text-[10px] uppercase tracking-[0.2em] rounded-bl-3xl">
                Best Value Match
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-1">{rec.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{rec.insurer}</span>
                    <span className="text-teal-600 text-[10px] font-black uppercase tracking-wider">Approved by IRDAI</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-slate-900">&#8377;{rec.price}</span>
                  <span className="text-slate-400 block text-xs font-bold uppercase tracking-widest mt-1">Starting / Month</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'Sum Insured', value: rec.cover },
                  { label: 'Claim Ratio',  value: rec.claimRatio },
                  { label: 'Tax Saving',    value: 'Up to ₹45k' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-[2rem] p-6 text-center border border-slate-100">
                    <div className="text-xl font-black text-slate-900">{item.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-2">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10">
                {['Verified Section 80C / 80D Benefits', 'Instant Cashless Approval Network', 'Zero Waiting Period (Conditions Apply)', '24/7 Priority Claims Assistance'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 font-semibold group">
                    <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-6 bg-teal-600 text-white rounded-[1.5rem] font-black hover:bg-teal-700 transition-all shadow-2xl shadow-teal-600/30 text-lg uppercase tracking-widest">
                Unlock This Plan
              </button>
            </div>

            <button onClick={() => setStep(1)} className="group inline-flex items-center gap-2 text-slate-400 font-black hover:text-teal-600 transition-all text-xs uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Restart Analysis
            </button>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        {step < 4 && (
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={prevStep}
                className={cn("flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest", step === 1 && "invisible")}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-[0.2em]">Step {step} of 3</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
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
