import React from 'react';
import { Plus, CheckCircle2, Clock } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { CUSTOMER_DATA } from '../../data/mockCustomerData';
import { cn } from '../../utils/helpers';

const CustomerClaims: React.FC = () => {
  const data = CUSTOMER_DATA;

  const statusSteps = ['Submitted', 'Under Review', 'Approved', 'Settled'];

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Claims Center</h1>
            <p className="text-slate-500 text-sm mt-1">Track and manage your insurance claims.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
            <Plus className="w-4 h-4" /> File New Claim
          </button>
        </div>

        <div className="space-y-6">
          {data.claims.map(claim => {
            const stepIndex = statusSteps.indexOf(claim.status);
            return (
              <div key={claim.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                      claim.status === 'Settled' ? 'bg-teal-50 text-teal-600' : 'bg-orange-50 text-orange-600'
                    )}>
                      {claim.status === 'Settled'
                        ? <CheckCircle2 className="w-8 h-8" />
                        : <Clock className="w-8 h-8" />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{claim.policyName}</h3>
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full font-bold',
                          claim.status === 'Settled'      ? 'bg-teal-100 text-teal-700' :
                          claim.status === 'Approved'     ? 'bg-green-100 text-green-700' :
                          claim.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-orange-100 text-orange-700'
                        )}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">ID: {claim.id} • Filed on {claim.date}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
                        <div><span className="text-slate-400">Amount</span><p className="font-bold text-slate-900 mt-0.5">{claim.amount}</p></div>
                        <div><span className="text-slate-400">Type</span><p className="font-bold text-slate-900 mt-0.5">{claim.type}</p></div>
                        <div className="col-span-2"><span className="text-slate-400">Facility / Reason</span><p className="font-bold text-slate-900 mt-0.5">{claim.hospital || claim.reason}</p></div>
                      </div>

                      {/* Progress tracker */}
                      <div className="mt-6">
                        <div className="flex items-center gap-0">
                          {statusSteps.map((step, i) => {
                            const done = i <= stepIndex;
                            const current = i === stepIndex;
                            return (
                              <React.Fragment key={step}>
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all',
                                    done ? 'bg-teal-600 border-teal-600 text-white' :
                                           'bg-white border-slate-200 text-slate-400'
                                  )}>
                                    {done ? '✓' : i + 1}
                                  </div>
                                  <span className={cn(
                                    'text-[9px] font-bold mt-1 text-center w-14',
                                    current ? 'text-teal-600' : done ? 'text-slate-500' : 'text-slate-300'
                                  )}>
                                    {step}
                                  </span>
                                </div>
                                {i < statusSteps.length - 1 && (
                                  <div className={cn('h-0.5 flex-grow mb-5', i < stepIndex ? 'bg-teal-600' : 'bg-slate-200')} />
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                      Track Status
                    </button>
                    <button className="px-6 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                      Upload Documents
                    </button>
                    <button className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                      View History
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerClaims;
