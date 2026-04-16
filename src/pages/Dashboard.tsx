import React from 'react';
import { LayoutDashboard, Shield, Clock, Download, ChevronRight, AlertTriangle, CreditCard, PieChart } from 'lucide-react';
import { cn } from '../utils/helpers';
import { useAppStore } from '../store';
  {
    id: 'POL-LIC-2023001',
    title: 'LIC Tech Term Plan',
    type: 'life',
    provider: 'LIC of India',
    renewalDate: '12 Dec 2024',
    premium: '1,199/mo',
    sumAssured: '1 Crore',
    status: 'Active',
  },
  {
    id: 'POL-BAJ-2024019',
    title: 'Bajaj Allianz Motor OD+TP',
    type: 'car',
    provider: 'Bajaj Allianz',
    renewalDate: '05 Nov 2024',
    premium: '499/mo',
    sumAssured: 'OD + Third Party',
    status: 'Renewal Due',
  },
  {
    id: 'POL-STR-2022087',
    title: 'Star Comprehensive Health',
    type: 'health',
    provider: 'Star Health Insurance',
    renewalDate: '20 Jan 2025',
    premium: '799/mo',
    sumAssured: '5 Lakh',
    status: 'Active',
  },
];

export const Dashboard: React.FC = () => {
  const { state } = useAppStore();
  const userName = state.user?.name || 'User';

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-1">Hello, {userName}!</h1>
            <p className="text-slate-500 font-medium">
              You have <b className="text-slate-900">3 active policies</b> and <b className="text-orange-600">1 renewal due</b> soon.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm text-xs">
              Download All Docs
            </button>
            <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 text-xs">
              Purchase New Plan
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Cover</div>
              <div className="text-2xl font-bold text-slate-900">1.05 Crore</div>
              <div className="text-xs text-slate-400 mt-0.5">Across 3 policies</div>
            </div>
          </div>
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Premium</div>
              <div className="text-2xl font-bold text-slate-900">&#8377;2,497</div>
              <div className="text-xs text-teal-600 font-semibold mt-0.5">80C/80D Tax Eligible</div>
            </div>
          </div>
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <PieChart className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Claims</div>
              <div className="text-2xl font-bold text-slate-900">01</div>
              <div className="text-xs text-slate-400 mt-0.5">CLM-20241024 &middot; In Review</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Policies + Quick Actions */}
          <div className="lg:col-span-2 space-y-8">

            {/* Policies */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-900">Your Active Policies</h2>
                <button className="text-teal-600 font-bold text-sm hover:underline">Manage All</button>
              </div>
              <div className="space-y-4">
                {POLICIES.map(policy => (
                  <div key={policy.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-teal-200 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                          policy.type === 'health' ? "bg-blue-50 text-blue-600" :
                          policy.type === 'car'    ? "bg-orange-50 text-orange-600" :
                                                     "bg-teal-50 text-teal-600"
                        )}>
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-0.5 text-sm">{policy.title}</h3>
                          <p className="text-xs text-slate-500 font-medium">{policy.id} &middot; {policy.provider}</p>
                          <p className="text-xs text-teal-600 font-semibold mt-0.5">Coverage: {policy.sumAssured}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 flex-wrap">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Renewal</div>
                          <div className={cn("text-sm font-bold", policy.status === 'Renewal Due' ? "text-orange-600" : "text-slate-900")}>
                            {policy.renewalDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Premium</div>
                          <div className="text-sm font-bold text-slate-900">&#8377;{policy.premium}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-teal-600 transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-teal-600 transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h2 className="text-lg font-bold mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Pay Premium',    Icon: CreditCard,      color: 'bg-teal-500/10 text-teal-500' },
                  { label: 'Update Nominee',  Icon: Shield,          color: 'bg-blue-500/10 text-blue-500' },
                  { label: 'Add Riders',      Icon: LayoutDashboard, color: 'bg-purple-500/10 text-purple-500' },
                  { label: 'Tax Certificate', Icon: Download,        color: 'bg-orange-500/10 text-orange-500' },
                ].map(({ label, Icon, color }, i) => (
                  <button key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reminders + Advisor */}
          <div className="space-y-8">

            {/* Reminders */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Clock className="w-5 h-5 text-teal-600" /> Key Reminders
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Renew Motor Policy</div>
                    <p className="text-xs text-slate-500 mt-1">Your Bajaj Allianz policy expires on 05 Nov. Renew now to avoid late fees.</p>
                    <button className="mt-2 text-xs font-bold text-orange-600 hover:underline">Renew Now</button>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-100">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Free Health Checkup</div>
                    <p className="text-xs text-slate-500 mt-1">An annual free checkup is available in your Star Health plan. Book at Apollo Diagnostics.</p>
                    <button className="mt-2 text-xs font-bold text-teal-600 hover:underline">Book My Slot</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Advisor */}
            <div className="bg-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-teal-600/20">
              <h3 className="text-xl font-bold mb-4">Your Dedicated Advisor</h3>
              <div className="flex items-center gap-4 mb-6">
                <img src="https://i.pravatar.cc/150?u=priya" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Advisor" />
                <div>
                  <div className="font-bold font-sm">Priya Sharma</div>
                  <div className="text-xs text-teal-100 font-medium">Available until 8:00 PM &middot; Mumbai</div>
                  <div className="text-xs text-teal-200 mt-0.5">&#9733; 4.9/5 &middot; 500+ clients</div>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all text-sm">
                Call Advisor
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
