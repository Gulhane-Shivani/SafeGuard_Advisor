import React from 'react';
import { Shield, CreditCard, ChevronRight, CheckCircle2, Info, ArrowRight, IndianRupee } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { cn } from '../../utils/helpers';

import { LoanApplicationModal } from '../../components/LoanApplicationModal';
import { LoanEligibilityModal } from '../../components/LoanEligibilityModal';

const CustomerPolicyLoan: React.FC = () => {
  const { data, loading, error, addLoan } = useCustomer();
  const [isApplyOpen, setIsApplyOpen] = React.useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = React.useState(false);
  const [selectedPolicy, setSelectedPolicy] = React.useState<any>(null);

  if (loading || !data) return <LoadingSpinner />;
  const eligiblePolicies = data.policies.filter((p: any) => p.type.includes('Life'));

  const handleApplyLoan = (policy?: any) => {
    setSelectedPolicy(policy || null);
    setIsApplyOpen(true);
  };

  const handleCheckEligibility = () => {
    setIsEligibilityOpen(true);
  };

  const handleLoanSubmit = (loanData: any) => {
    addLoan({
      id: `LN-${Math.floor(10000 + Math.random() * 90000)}`,
      policy: loanData.policyName,
      amount: `₹${parseInt(loanData.amount).toLocaleString()}`,
      date: loanData.submissionDate,
      status: 'In Review',
      tenure: `${loanData.tenure} Months`,
      rate: '9% p.a.'
    });
  };

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Policy Loans</h1>
          <p className="text-slate-500 text-sm mt-1">Apply for instant loans against your life insurance policies.</p>
        </div>

        {/* Hero Banner */}
        <div className="bg-teal-600 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl font-bold mb-3">Check Your Loan Eligibility</h2>
            <p className="text-teal-100 mb-8">
              Get instant loans against your life insurance policy at low interest rates with minimal documentation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleApplyLoan()}
                className="px-8 py-3 bg-white text-teal-600 rounded-xl font-bold shadow-lg hover:bg-teal-50 transition-all"
              >
                Apply for Loan
              </button>
              <button 
                onClick={handleCheckEligibility}
                className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Check Eligibility
              </button>
            </div>
          </div>
          <IndianRupee className="absolute -right-8 -bottom-8 w-64 h-64 text-teal-500/20 pointer-events-none" />
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Low Interest Rate', value: 'From 9% p.a.', desc: 'Competitive rates' },
            { label: 'Max Loan Amount',   value: 'Up to 90%',    desc: 'Of surrender value' },
            { label: 'Disbursal Time',    value: '48 Hours',     desc: 'Quick processing' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <p className="text-2xl font-bold text-teal-600">{item.value}</p>
              <p className="font-bold text-slate-900 mt-1">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eligible Policies */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Eligible Policies</h3>
            {eligiblePolicies.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">No eligible life insurance policies found.</p>
            ) : (
              <div className="space-y-4">
                {eligiblePolicies.map(policy => (
                  <div key={policy.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-slate-900">{policy.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{policy.provider} • {policy.id}</p>
                      </div>
                      <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">Eligible</span>
                    </div>
                    <div className="flex justify-between text-xs mb-4">
                      <div><span className="text-slate-400">Sum Assured:</span> <span className="font-bold text-slate-700 ml-1">{policy.sumAssured}</span></div>
                      <div><span className="text-slate-400">Est. Loan:</span> <span className="font-bold text-teal-700 ml-1">₹2,50,000</span></div>
                    </div>
                    <button 
                      onClick={() => handleApplyLoan(policy)}
                      className="w-full py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors"
                    >
                      Apply for Loan
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* How it works + Loan History */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5">How It Works</h3>
              <div className="space-y-4">
                {[
                  'Check eligibility on your life policy',
                  'Submit loan application online',
                  'Minimal document verification',
                  'Amount credited in 48 hours',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{step}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>

    {/* Loan History Table */}
        <div className="pt-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Loan History</h2>
            <p className="text-sm text-slate-500 mt-1">Track your current and previous loan applications.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Loan ID', 'Policy Name', 'Amount', 'Interest Rate', 'Tenure', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!data.loans || data.loans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-8 py-20 text-center">
                        <div className="text-slate-300 font-bold">No loan history found.</div>
                      </td>
                    </tr>
                  ) : (
                    data.loans.map((loan: any) => (
                      <tr key={loan.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-xs font-bold text-slate-900">{loan.id}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-700 leading-tight">{loan.policy}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-teal-600">{loan.amount}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-medium text-slate-600">{loan.rate}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-medium text-slate-600">{loan.tenure}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm text-slate-500 font-medium">{loan.date}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full",
                            loan.status === 'Disbursed' ? "text-emerald-600 bg-emerald-50" :
                            loan.status === 'In Review' ? "text-blue-600 bg-blue-50" :
                                                         "text-slate-500 bg-slate-100"
                          )}>
                            {loan.status}
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

        <LoanApplicationModal
          isOpen={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
          onSubmit={handleLoanSubmit}
          eligiblePolicies={eligiblePolicies}
          initialPolicy={selectedPolicy}
        />

        <LoanEligibilityModal
          isOpen={isEligibilityOpen}
          onClose={() => setIsEligibilityOpen(false)}
          eligiblePolicies={eligiblePolicies}
        />
      </div>
    </CustomerLayout>
  );
};

export default CustomerPolicyLoan;
