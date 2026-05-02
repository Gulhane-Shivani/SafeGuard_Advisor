import React, { useState } from 'react';
import { X, Shield, FileText, Activity, MapPin, Calendar, IndianRupee } from 'lucide-react';
import { cn } from '../utils/helpers';

interface ClaimFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: any) => void;
  policies: any[];
}

export const ClaimForm: React.FC<ClaimFormProps> = ({ isOpen, onClose, onSubmit, policies }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    policyId: '',
    type: 'Reimbursement',
    amount: '',
    hospital: '',
    reason: '',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPolicy = policies.find(p => p.id === formData.policyId);
    
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      claim_number: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
      policy_id: formData.policyId,
      policy_title: selectedPolicy?.title || 'Unknown Policy',
      policyName: selectedPolicy?.title || 'Unknown Policy',
      status: 'Submitted',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: `₹${Number(formData.amount).toLocaleString('en-IN')}`,
      type: formData.type,
      hospital: formData.hospital || 'N/A',
      reason: formData.reason
    });
    
    // Reset and close
    setStep(1);
    setFormData({
      policyId: '',
      type: 'Reimbursement',
      amount: '',
      hospital: '',
      reason: '',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-8 text-white">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">File New Claim</h2>
              <p className="text-slate-400 text-sm">Step {step} of 2: {step === 1 ? 'Policy & Details' : 'Facility & Reason'}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[1, 2].map(s => (
              <div key={s} className={cn("h-1 flex-grow rounded-full transition-all duration-500", s <= step ? "bg-teal-500" : "bg-white/10")} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Select Policy</label>
                <div className="grid grid-cols-1 gap-3">
                  {policies.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({...formData, policyId: p.id})}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                        formData.policyId === p.id ? "border-teal-500 bg-teal-50" : "border-slate-100 hover:border-slate-200"
                      )}
                    >
                      <div>
                        <p className="font-bold text-slate-900">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.policy_number}</p>
                      </div>
                      {formData.policyId === p.id && <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Claim Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                  >
                    <option>Reimbursement</option>
                    <option>Cashless</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Estimated Amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      required
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                      placeholder="50,000"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Hospital / Facility Name</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.hospital}
                    onChange={e => setFormData({...formData, hospital: e.target.value})}
                    placeholder="e.g. Manipal Hospital, Whitefield"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Reason for Claim</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    required
                    value={formData.reason}
                    onChange={e => setFormData({...formData, reason: e.target.value})}
                    rows={3}
                    placeholder="Briefly describe the medical emergency or event..."
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Date of Event</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                disabled={!formData.policyId}
                onClick={() => setStep(2)}
                className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all"
              >
                Submit Claim
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
