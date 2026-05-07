import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield, CheckCircle2, Download, CreditCard,
  User, Calendar, Heart, LayoutGrid,
  ArrowLeft, MapPin,
  History, AlertCircle,
  TrendingUp, Star
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const DEFAULT_POLICIES = [
  {
    id: 'SG-HLTH-002', name: 'Star Comprehensive Health', customer: 'Vijay Mehta',
    email: 'vijay.mehta@example.com', phone: '+91 98765 43210', type: 'HEALTH INSURANCE',
    premium: '₹80,000', expiry: '2027-05-02', startDate: '2022-05-02',
    nomineeName: 'Anita Mehta', nomineeRelation: 'Spouse',
    customCoverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment'],
    customBenefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup']
  },
  {
    id: 'SG-MOTR-003', name: 'Bajaj Car Insurance', customer: 'Deepak Singh',
    email: 'deepak.s@example.com', phone: '+91 88776 55443', type: 'MOTOR INSURANCE',
    premium: '₹12,500', expiry: '2027-08-15', startDate: '2023-08-15',
    nomineeName: 'Karan Singh', nomineeRelation: 'Child',
    customCoverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire'],
    customBenefits: ['Zero Depreciation', 'Roadside Assistance']
  },
];

// Helper to generate realistic history based on dates
const generateOfficialHistory = (startDate: string, expiryDate: string, premium: string) => {
  const history: any[] = [];
  const start = new Date(startDate);
  const end = new Date();
  const expiry = new Date(expiryDate);

  let currentYearDate = new Date(start);

  while (currentYearDate <= end && currentYearDate <= expiry) {
    const yearStr = currentYearDate.getFullYear();
    const dateStr = currentYearDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Add Payment Record
    history.push({
      date: dateStr,
      type: currentYearDate.getTime() === start.getTime() ? 'NEW ISSUANCE PAYMENT' : 'RENEWAL PREMIUM',
      amount: premium,
      status: 'SUCCESS',
      id: `TXN-${yearStr}-00${Math.floor(Math.random() * 90) + 10}`
    });

    // Add Renewal Record (if not the first year)
    if (currentYearDate.getTime() !== start.getTime()) {
      history.push({
        date: dateStr,
        type: 'POLICY RENEWAL',
        amount: premium,
        status: 'COMPLETED'
      });
    }

    currentYearDate.setFullYear(currentYearDate.getFullYear() + 1);
  }

  return history.reverse(); // Newest first
};

export const PolicyDetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith('/super-admin') ? '/super-admin' : '/admin';

  const [policies] = useState(() => {
    const saved = localStorage.getItem('safeguard_policies');
    return saved ? JSON.parse(saved) : DEFAULT_POLICIES;
  });

  const policy = policies.find((p: any) => p.id === id) || policies[0];

  // Calculate status dynamically for the UI
  const getStatus = (expiryDate: string) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    if (exp < today) return 'EXPIRED';
    const thirtyDays = new Date();
    thirtyDays.setDate(today.getDate() + 30);
    if (exp <= thirtyDays) return 'RENEWAL DUE';
    return 'ACTIVE';
  };

  const status = getStatus(policy.expiry);
  const officialHistory = generateOfficialHistory(policy.startDate || '2023-01-01', policy.expiry, policy.premium);

  const handleExport = () => {
    // FIXED: Changed to .txt extension and text/plain MIME type to prevent "Failed to load PDF" error.
    // Real PDF generation requires a library like jsPDF.
    const filename = `Policy_Statement_${policy.id}.txt`;
    const content = `
SAFEGUARD ADVISOR - OFFICIAL POLICY STATEMENT
============================================

CUSTOMER INFORMATION
--------------------
Policy ID: ${policy.id}
Customer Name: ${policy.customer}
Email: ${policy.email}
Phone: ${policy.phone}

POLICY INFORMATION
------------------
Insurance Plan: ${policy.name}
Coverage Type: ${policy.type}
Status: ${status}
Issuance Date: ${policy.startDate}
Expiry Date: ${policy.expiry}
Base Premium: ${policy.premium}

COVERAGE DETAILS
----------------
${(policy.customCoverage || []).join(', ')}

PLAN BENEFITS
-------------
${(policy.customBenefits || []).join(', ')}

TRANSACTION LEDGER
------------------
${officialHistory.filter(h => h.type.includes('PAYMENT')).map(h => `- ${h.date}: ${h.amount} [${h.type}] - ${h.status} (ID: ${h.id || 'N/A'})`).join('\n')}

--------------------------------------------
Generated on: ${new Date().toLocaleString()}
SafeGuard Advisor Global Portfolio Management
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`${basePath}/policies`)} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-teal-600 transition-all shadow-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Policy Insights</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Servicing / {policy.id}</p>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-[#0F172A] rounded-[2rem] p-8 text-white flex items-center justify-between shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner">
            <Heart className="w-8 h-8 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-4 mb-1.5">
              <h2 className="text-2xl font-black tracking-tight">{policy.name}</h2>
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" :
                  status === 'RENEWAL DUE' ? "bg-orange-500/10 text-orange-400 border-orange-500/30" :
                    "bg-red-500/10 text-red-400 border-red-500/30"
              )}>
                {status}
              </span>
            </div>
            <p className="text-slate-400 font-bold text-xs flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> {policy.id} • Registered Portfolio
            </p>
          </div>
        </div>
        <button onClick={handleExport} className="relative z-10 flex items-center gap-3 px-8 py-3.5 bg-teal-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/30">
          <Download className="w-4 h-4" /> Export Policy Statement
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Main Content */}
        <div className="col-span-8 space-y-8">
          {/* Customer Card */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest">Customer Profile</h3>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</p>
                <p className="text-sm font-black text-slate-900">{policy.customer}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                <p className="text-sm font-bold text-slate-600 truncate">{policy.email}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Number</p>
                <p className="text-sm font-bold text-slate-600">{policy.phone}</p>
              </div>
              <div className="col-span-3 pt-6 border-t border-slate-50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-300 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Residential Address</p>
                    <p className="text-sm font-bold text-slate-600">Sector 42, Golf Course Road, Gurgaon, Haryana - 122001, India</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* History Sections */}
          <div className="grid grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-orange-600">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Payment History</h3>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase">Yearly Ledger</span>
              </div>
              <div className="space-y-3">
                {officialHistory.filter(h => h.type.includes('PAYMENT')).map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                    <div>
                      <p className="text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors">{h.amount}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{h.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-900 uppercase">{h.date}</p>
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">● {h.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-blue-600">
                  <History className="w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Renewal Logs</h3>
                </div>
                <TrendingUp className="w-4 h-4 text-slate-200" />
              </div>
              <div className="space-y-3">
                {officialHistory.filter(h => h.type === 'POLICY RENEWAL').length === 0 ? (
                  <div className="flex flex-col items-center py-10 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <AlertCircle className="w-8 h-8 text-slate-200 mb-2" />
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">No renewals yet</p>
                  </div>
                ) : (
                  officialHistory.filter(h => h.type === 'POLICY RENEWAL').map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-blue-50/30 rounded-2xl border border-blue-100">
                      <div>
                        <p className="text-[11px] font-black text-blue-900">RENEWAL COMPLETED</p>
                        <p className="text-[9px] font-bold text-blue-400 uppercase mt-0.5">Verified on {h.date}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Coverage & Benefits */}
          <div className="grid grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-teal-600 pb-4 border-b border-slate-50">
                <LayoutGrid className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-widest">Included Coverage</h3>
              </div>
              <div className="space-y-3">
                {(policy.customCoverage || ['Hospitalization']).map((c: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                    <CheckIcon className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span className="text-xs font-bold text-slate-600">{c}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-blue-600 pb-4 border-b border-slate-50">
                <Star className="w-5 h-5" />
                <h3 className="text-xs font-black uppercase tracking-widest">Plan Benefits</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(policy.customBenefits || ['Basic Plan']).map((b: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-blue-50/50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-tight border border-blue-100">
                    {b}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 space-y-8">
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 sticky top-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                <Calendar className="w-5 h-5 text-teal-600" />
                <h4 className="text-sm font-black uppercase tracking-[0.2em]">Policy Period</h4>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Issue Date', value: new Date(policy.startDate || '2023-01-01').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                  { label: 'Expiry Date', value: new Date(policy.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                  { label: 'Premium', value: policy.premium },
                  { label: 'Due Date', value: new Date(policy.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-teal-600 transition-colors">{row.label}</span>
                    <span className="text-xs font-black text-slate-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-teal-50/50 p-6 rounded-[1.5rem] border border-teal-100 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm font-black text-sm border border-teal-50">
                  {policy.nomineeName ? policy.nomineeName.split(' ').map((n: any) => n[0]).join('') : 'CU'}
                </div>
                <div>
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none mb-1.5">Policy Nominee</p>
                  <p className="text-sm font-black text-slate-900">{policy.nomineeName || 'Not Assigned'}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{policy.nomineeRelation || 'Beneficiary'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Policy Protection</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                This policy is active and secured under the SafeGuard Advisor global portfolio. All terms and conditions apply.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
