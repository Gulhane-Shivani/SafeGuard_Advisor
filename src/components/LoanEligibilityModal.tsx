import React, { useState } from 'react';
import { X, Calculator, Info, ArrowRight, ShieldCheck } from 'lucide-react';


interface LoanEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligiblePolicies: any[];
}

export const LoanEligibilityModal: React.FC<LoanEligibilityModalProps> = ({ isOpen, onClose, eligiblePolicies }) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState(eligiblePolicies[0]?.id || '');
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const policy = eligiblePolicies.find(p => String(p.id) === String(selectedPolicyId));
    
    // Mock calculation logic
    const premiumValue = parseInt(policy?.premium.replace(/[^0-9]/g, '') || '0');
    const eligibleAmount = premiumValue * 36; // 3 years of premium as demo logic
    
    setResult({
      amount: `₹${eligibleAmount.toLocaleString()}`,
      policy: policy?.title,
      interest: '9% p.a.',
      maxTenure: '36 Months'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Loan Eligibility Calculator</h2>
              <p className="text-slate-400 text-xs">Estimate your maximum loan amount in seconds.</p>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-8">
          {!result ? (
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Policy to Check</label>
                <select
                  value={selectedPolicyId}
                  onChange={e => setSelectedPolicyId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                >
                  {eligiblePolicies.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                <Info className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your eligibility is calculated based on the policy's <span className="font-bold text-slate-700">Surrender Value</span>, premium payment history, and current policy status.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                Calculate Eligibility <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">You are eligible for up to</p>
                <h3 className="text-5xl font-black text-teal-600 tracking-tight">{result.amount}</h3>
                <p className="text-sm font-bold text-slate-900 mt-2">Against {result.policy}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Interest Rate</p>
                  <p className="text-sm font-bold text-slate-900">{result.interest}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Tenure</p>
                  <p className="text-sm font-bold text-slate-900">{result.maxTenure}</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-3xl flex items-center gap-4 border border-emerald-100">
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">Pre-Approved Offer!</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Your payment history is excellent. Instant disbursal available.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Recalculate
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
