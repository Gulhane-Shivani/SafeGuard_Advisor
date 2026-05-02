import React from 'react';
import { X, Activity, CheckCircle2, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '../utils/helpers';

interface ClaimStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: any;
}

export const ClaimStatusModal: React.FC<ClaimStatusModalProps> = ({ isOpen, onClose, claim }) => {
  if (!isOpen || !claim) return null;

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Settled'];
  const stepIndex = statusSteps.indexOf(claim.status);

  const getStepStatus = (index: number) => {
    if (index < stepIndex) return 'completed';
    if (index === stepIndex) return 'current';
    return 'pending';
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
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Track Claim Status</h2>
              <p className="text-slate-400 text-xs">#{claim.claim_number || claim.id}</p>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-8">
          {/* Summary Card */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900">{claim.policy_title || claim.policyName}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your claim for <span className="font-bold text-slate-700">{claim.amount}</span> is currently in the <span className="font-bold text-teal-600">{claim.status}</span> phase.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {statusSteps.map((step, i) => {
              const status = getStepStatus(i);
              return (
                <div key={step} className="flex gap-6 relative">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all relative z-10",
                    status === 'completed' ? "bg-teal-600 border-teal-50 text-white" :
                    status === 'current'   ? "bg-white border-teal-500 text-teal-600 shadow-lg shadow-teal-500/20" :
                                           "bg-white border-slate-100 text-slate-300"
                  )}>
                    {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div className="pt-2">
                    <p className={cn(
                      "text-sm font-bold",
                      status === 'current' ? "text-teal-600" : "text-slate-900"
                    )}>{step}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {status === 'completed' ? `Verified on ${claim.date}` : 
                       status === 'current'   ? "Expected resolution in 48 hours" : 
                       "Pending next step"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
