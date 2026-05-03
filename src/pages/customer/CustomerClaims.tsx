import React, { useState, useRef } from 'react';
import { Plus, CheckCircle2, Clock, Upload, History, Activity, Search, Filter } from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { cn } from '../../utils/helpers';
import { ClaimForm } from '../../components/ClaimForm';
import { ClaimStatusModal } from '../../components/ClaimStatusModal';

const CustomerClaims: React.FC = () => {
  const { data, loading, error, addClaim } = useCustomer();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [trackingClaim, setTrackingClaim] = useState<any>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  if (loading || !data) return <LoadingSpinner />;

  const activeClaims = data.claims.filter((c: any) => c.status !== 'Settled');
  const settledClaims = data.claims.filter((c: any) => c.status === 'Settled');

  const handleFileClaim = (claimData: any) => {
    addClaim(claimData);
  };

  const handleTrackStatus = (claim: any) => {
    setTrackingClaim(claim);
  };

  const handleUploadDocs = (claim: any) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) alert(`Uploading ${file.name} for Claim #${claim.id}...`);
    };
    input.click();
  };

  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Settled'];

  return (
    <CustomerLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Claims Center</h1>
            <p className="text-slate-500 mt-1">Track your ongoing claims and view settlement history.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={scrollToHistory}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              <History className="w-4 h-4" /> View History
            </button>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl text-sm font-bold hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20"
            >
              <Plus className="w-4 h-4" /> File New Claim
            </button>
          </div>
        </div>

        {/* Active Claims Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" /> Active Claims ({activeClaims.length})
          </h2>
          {activeClaims.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Activity className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">No active claims at the moment</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activeClaims.map((claim: any) => {
                const stepIndex = statusSteps.indexOf(claim.status);
                return (
                  <div key={claim.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col lg:flex-row justify-between gap-10">
                      <div className="flex-grow space-y-8">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                            <Clock className="w-8 h-8" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 px-3 py-1 bg-teal-50 rounded-full">
                                {claim.status}
                              </span>
                              <span className="text-xs text-slate-400 font-bold">ID: {claim.claim_number || claim.id}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{claim.policy_title || claim.policyName}</h3>
                            <p className="text-sm text-slate-500 font-medium">Filed on {claim.date}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Claim Amount</p><p className="text-lg font-bold text-slate-900">{claim.amount}</p></div>
                          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Claim Type</p><p className="text-lg font-bold text-slate-900">{claim.type}</p></div>
                          <div className="col-span-2"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hospital / Reason</p><p className="text-lg font-bold text-slate-900">{claim.hospital || claim.reason}</p></div>
                        </div>

                        {/* Progress */}
                        <div className="pt-4">
                          <div className="flex items-center w-full">
                            {statusSteps.map((step, i) => {
                              const done = i <= stepIndex;
                              const current = i === stepIndex;
                              return (
                                <React.Fragment key={step}>
                                  <div className="flex flex-col items-center relative z-10">
                                    <div className={cn(
                                      'w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-4 transition-all duration-500',
                                      done ? 'bg-teal-600 border-teal-50 text-white' : 'bg-white border-slate-100 text-slate-300'
                                    )}>
                                      {done ? '✓' : i + 1}
                                    </div>
                                    <span className={cn(
                                      'text-[10px] font-black mt-3 absolute -bottom-6 w-24 text-center uppercase tracking-tighter',
                                      current ? 'text-teal-600' : done ? 'text-slate-500' : 'text-slate-300'
                                    )}>
                                      {step}
                                    </span>
                                  </div>
                                  {i < statusSteps.length - 1 && (
                                    <div className={cn('h-1 flex-grow mx-1 rounded-full transition-all duration-500', i < stepIndex ? 'bg-teal-600' : 'bg-slate-100')} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 min-w-[200px] pt-4">
                        <button 
                          onClick={() => handleTrackStatus(claim)}
                          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                        >
                          <Activity className="w-4 h-4" /> Track Status
                        </button>
                        <button 
                          onClick={() => handleUploadDocs(claim)}
                          className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                        >
                          <Upload className="w-4 h-4" /> Upload Documents
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Claim History Section */}
        <div ref={historyRef} className="pt-8 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Settlement History
              </h2>
              <p className="text-sm text-slate-500 mt-1">Details of all successfully settled claims.</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Claim Details', 'Category', 'Hospital/Reason', 'Amount', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {settledClaims.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center">
                        <div className="text-slate-300 font-bold">No settlement history found.</div>
                      </td>
                    </tr>
                  ) : (
                    settledClaims.map((claim: any) => (
                      <tr key={claim.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-900 text-sm leading-tight">{claim.policy_title || claim.policyName}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">#{claim.claim_number || claim.id}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">{claim.type}</span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm text-slate-600 font-medium">{claim.hospital || claim.reason}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-900">{claim.amount}</p>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-medium whitespace-nowrap">
                          {claim.date}
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Settled
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ClaimForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFileClaim}
        policies={data.policies}
      />
      <ClaimStatusModal
        isOpen={!!trackingClaim}
        onClose={() => setTrackingClaim(null)}
        claim={trackingClaim}
      />
    </CustomerLayout>
  );
};

export default CustomerClaims;
