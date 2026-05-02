import React, { useState } from 'react';
import { X, CreditCard, IndianRupee, Info, Send, Landmark } from 'lucide-react';
import { cn } from '../utils/helpers';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (loanData: any) => void;
  eligiblePolicies: any[];
  initialPolicy?: any;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose, onSubmit, eligiblePolicies, initialPolicy }) => {
  const [formData, setFormData] = useState({
    policyId: initialPolicy?.id || (eligiblePolicies[0]?.id || ''),
    amount: '',
    tenure: '12',
    bankAccount: ''
  });

  // Update policy if initialPolicy changes
  React.useEffect(() => {
    if (initialPolicy) setFormData(prev => ({ ...prev, policyId: initialPolicy.id }));
  }, [initialPolicy]);

  if (!isOpen) return null;

  const selectedPolicy = eligiblePolicies.find(p => String(p.id) === String(formData.policyId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      policyName: selectedPolicy?.title,
      submissionDate: new Date().toLocaleDateString(),
      status: 'In Review'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-teal-600 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Apply for Policy Loan</h2>
              <p className="text-teal-100 text-xs">Low interest loans against your life insurance.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Policy</label>
            <select
              value={formData.policyId}
              onChange={e => setFormData({ ...formData, policyId: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              {eligiblePolicies.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Loan Amount</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="e.g. 50000"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Tenure (Months)</label>
              <select
                value={formData.tenure}
                onChange={e => setFormData({ ...formData, tenure: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              >
                {[6, 12, 18, 24, 36].map(m => (
                  <option key={m} value={m}>{m} Months</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Disbursement Bank Account</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Account Number or Saved Bank"
                value={formData.bankAccount}
                onChange={e => setFormData({ ...formData, bankAccount: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-2xl flex items-start gap-3 border border-teal-100">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-[10px] text-teal-700 font-medium leading-relaxed">
              Interest rate: <span className="font-bold">9% p.a.</span> (Fixed). 
              Disbursement usually takes 24-48 working hours after digital verification.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Apply for Loan
          </button>
        </form>
      </div>
    </div>
  );
};
