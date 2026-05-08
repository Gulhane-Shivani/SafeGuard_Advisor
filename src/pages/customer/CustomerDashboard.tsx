import React, { useState } from 'react';
import { 
  LayoutDashboard, Shield, CreditCard, FileText, Settings, 
  HelpCircle, LogOut, ChevronRight, Download, Plus, 
  Clock, AlertCircle, CheckCircle2, Search, Bell, 
  User, Briefcase, IndianRupee, HeartPulse, Car, 
  Home, Landmark, PhoneCall, MessageSquare, Menu
} from 'lucide-react';
import { CUSTOMER_DATA } from '../../data/mockCustomerData';
import { useAppStore } from '../../store';
import { cn } from '../../utils/helpers';

// Sub-components for each section
const Overview = ({ data, setTab }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Welcome Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {data.profile.name}!</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your insurance portfolio today.</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
        <button onClick={() => setTab('policies')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
          <Plus className="w-4 h-4" /> New Policy
        </button>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Policies', value: data.stats.totalPolicies, icon: Shield, color: 'bg-blue-50 text-blue-600' },
        { label: 'Total Sum Assured', value: data.stats.totalSumAssured, icon: Landmark, color: 'bg-purple-50 text-purple-600' },
        { label: 'Monthly Premium', value: data.stats.totalPremium, icon: CreditCard, color: 'bg-teal-50 text-teal-600' },
        { label: 'Pending Claims', value: data.stats.pendingClaims, icon: FileText, color: 'bg-orange-50 text-orange-600' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Active Policies Preview */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Active Policies</h2>
          <button onClick={() => setTab('policies')} className="text-teal-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {data.policies.filter((p: any) => p.status === 'Active' || p.status === 'Renewal Due').slice(0, 3).map((policy: any) => (
            <div key={policy.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-all">
              <div className="flex items-center gap-4">
                <div className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {policy.status}
              </div>
              <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  policy.type.includes('Health') ? "bg-red-50 text-red-600" :
                  policy.type.includes('Life') ? "bg-blue-50 text-blue-600" :
                  policy.type.includes('Motor') ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-600"
                )}>
                  {policy.type.includes('Health') ? <HeartPulse className="w-6 h-6" /> :
                   policy.type.includes('Life') ? <Shield className="w-6 h-6" /> :
                   policy.type.includes('Motor') ? <Car className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{policy.title}</h3>
                  <p className="text-xs text-slate-500">{policy.id} • {policy.provider}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">{policy.premium}</div>
                <div className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {policy.status}
              </div>
              <div className={cn("text-[10px] font-bold uppercase", policy.status === 'Renewal Due' ? "text-orange-600" : "text-teal-600")}>
                  {policy.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white">
          <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Pay Premium', icon: CreditCard, action: () => setTab('payments') },
              { label: 'Download ID', icon: Download, action: () => {} },
              { label: 'File Claim', icon: FileText, action: () => setTab('claims') },
              { label: 'Support', icon: PhoneCall, action: () => setTab('support') },
            ].map((action, i) => (
              <button key={i} onClick={action.action} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Renewals & Claims */}
      <div className="space-y-8">
        {/* Upcoming Renewals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Upcoming Renewals
          </h3>
          <div className="space-y-4">
            {data.policies.filter((p: any) => p.status === 'Renewal Due').map((policy: any) => (
              <div key={policy.id} className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{policy.title}</div>
                    <div className="text-xs text-orange-700 mt-1">Due: {policy.dueDate}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{policy.premium}</div>
                </div>
                <button onClick={() => setTab('payments')} className="w-full mt-3 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">
                  Pay Now
                </button>
              </div>
            ))}
            {data.policies.filter((p: any) => p.status === 'Renewal Due').length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">No immediate renewals due.</p>
            )}
          </div>
        </div>

        {/* Pending Claims */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" /> Pending Claims
          </h3>
          <div className="space-y-4">
            {data.claims.filter((c: any) => c.status !== 'Settled').map((claim: any) => (
              <div key={claim.id} className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{claim.id}</span>
                  <span className="text-[10px] font-bold text-blue-600">{claim.status}</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{claim.policyName}</div>
                <div className="text-xs text-slate-500 mt-1">{claim.hospital || claim.reason}</div>
                <div className="mt-3 w-full bg-blue-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyPolicies = ({ data, onSelectPolicy }: any) => {
  const [policyFilter, setPolicyFilter] = useState('All');
  const statusFilters = ['All', 'Active', 'Pending', 'Renewal Due', 'Expired'];
  
  // Filtering logic will be added here later
  const filteredPolicies = data.policies; // Placeholder for now

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Your Insurance Portfolio</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 w-full"
            />
          </div>
        </div>
      </div>
    
      <div className="grid grid-cols-1 gap-4">
        {filteredPolicies.map((policy: any) => (
          <div key={policy.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                  policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                  policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                  policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                  "bg-slate-50 text-slate-400 border-slate-100"
                )}>
                  {policy.status}
                </div>
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                  policy.type.includes('Health') ? "bg-red-50 text-red-600" :
                  policy.type.includes('Life') ? "bg-blue-50 text-blue-600" :
                  policy.type.includes('Motor') ? "bg-orange-50 text-orange-600" : "bg-slate-50 text-slate-600"
                )}>
                  {policy.type.includes('Health') ? <HeartPulse className="w-8 h-8" /> :
                   policy.type.includes('Life') ? <Shield className="w-8 h-8" /> :
                   policy.type.includes('Motor') ? <Car className="w-8 h-8" /> : <Home className="w-8 h-8" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{policy.title}</h3>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold",
                      policy.status === 'Active' ? "bg-teal-50 text-teal-600" :
                      policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {policy.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{policy.id} • {policy.provider}</p>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="text-xs">
                      <span className="text-slate-400 font-medium">Sum Assured:</span>
                      <span className="text-slate-900 font-bold ml-1">{policy.sumAssured}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 font-medium">Premium:</span>
                      <span className="text-slate-900 font-bold ml-1">{policy.premium}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 font-medium">Due:</span>
                      <span className="text-slate-900 font-bold ml-1">{policy.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                <button onClick={() => onSelectPolicy(policy)} className="flex-grow lg:flex-none px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
                  View Details
                </button>
                <button className="p-2 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                {policy.status === 'Renewal Due' && (
                  <button className="flex-grow lg:flex-none px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">
                    Renew Now
                  </button>
                )}
                {policy.status === 'Active' && (
                  <button className="flex-grow lg:flex-none px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PolicyDetails = ({ policy, onBack }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm transition-colors">
      <ChevronRight className="w-4 h-4 rotate-180" /> Back to Policies
    </button>

    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-slate-900 p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              {policy.type.includes('Health') ? <HeartPulse className="w-10 h-10" /> :
               policy.type.includes('Life') ? <Shield className="w-10 h-10" /> :
               policy.type.includes('Motor') ? <Car className="w-10 h-10" /> : <Home className="w-10 h-10" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{policy.title}</h1>
              <p className="text-slate-400 font-medium">{policy.id} • {policy.provider}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
              Download PDF
            </button>
            <button className="px-6 py-2 bg-teal-500 rounded-xl font-bold text-sm hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20">
              Renew Policy
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Summary */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-teal-600" /> Coverage Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {policy.coverage?.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Benefits & Features
            </h2>
            <div className="space-y-4">
              {policy.benefits?.map((item: string, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Life Insurance specific */}
          {policy.type.includes('Life') && (
            <section className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <h2 className="text-lg font-bold text-blue-900 mb-6">Maturity & Loan Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Cash Value</div>
                  <div className="text-xl font-bold text-slate-900">{policy.cashValue}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Surrender Value</div>
                  <div className="text-xl font-bold text-slate-900">{policy.surrenderValue}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Loan Eligibility</div>
                  <div className="text-xl font-bold text-slate-900">{policy.loanEligibility}</div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Info Card */}
        <div className="space-y-8">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Policy Period</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Start Date</span>
                <span className="text-slate-900 font-bold">{policy.startDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">End Date</span>
                <span className="text-slate-900 font-bold">{policy.endDate}</span>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Premium Amount</span>
                  <span className="text-slate-900 font-bold">{policy.premium}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-slate-500">Frequency</span>
                  <span className="text-slate-900 font-bold">Monthly</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100">
            <h3 className="font-bold text-teal-900 mb-4">Nominee</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{policy.nominee || "Sneha Kumar"}</div>
                <div className="text-xs text-slate-500">Spouse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Payments = ({ data }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-900">Payments & Renewals</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Renewal List */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Upcoming Renewals</h3>
        <div className="space-y-4">
          {data.policies.filter((p: any) => p.status === 'Renewal Due' || p.status === 'Active').map((policy: any) => (
            <div key={policy.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">{policy.title}</div>
                <div className="text-xs text-slate-500 mt-1">Due: {policy.dueDate}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900">{policy.premium}</div>
                <button className="mt-2 px-4 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-all">
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Payment History</h3>
        <div className="space-y-4">
          {data.payments.map((payment: any) => (
            <div key={payment.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{payment.policy}</div>
                  <div className="text-[10px] text-slate-400">{payment.date} • {payment.method}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">{payment.amount}</div>
                <div className="text-[10px] font-bold text-teal-600 uppercase">Success</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Auto-debit Status */}
    <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
          <Settings className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Auto-Debit / ECS Status</h3>
          <p className="text-slate-400 text-sm mt-1">Your premium payments are automated via HDFC Bank Account.</p>
        </div>
      </div>
      <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
        Manage Auto-Debit
      </button>
    </div>
  </div>
);

const Claims = ({ data }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900">Claims Center</h2>
      <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
        <Plus className="w-4 h-4" /> File New Claim
      </button>
    </div>

    <div className="grid grid-cols-1 gap-6">
      {data.claims.map((claim: any) => (
        <div key={claim.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {policy.status}
              </div>
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                claim.status === 'Settled' ? "bg-teal-50 text-teal-600" : "bg-orange-50 text-orange-600"
              )}>
                {claim.status === 'Settled' ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{claim.policyName}</h3>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold",
                    claim.status === 'Settled' ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-700"
                  )}>
                    {claim.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">ID: {claim.id} • Submitted on {claim.date}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Amount</div>
                    <div className="text-sm font-bold text-slate-900">{claim.amount}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Type</div>
                    <div className="text-sm font-bold text-slate-900">{claim.type}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Facility / Reason</div>
                    <div className="text-sm font-bold text-slate-900">{claim.hospital || claim.reason}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                Track Status
              </button>
              <button className="px-6 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ServiceRequests = ({ data }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-900">Service Requests</h2>
      <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
        <Plus className="w-4 h-4" /> New Request
      </button>
    </div>

    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Request ID</th>
            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
            <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.serviceRequests.map((req: any) => (
            <tr key={req.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
              <td className="px-8 py-6 font-bold text-slate-900">{req.id}</td>
              <td className="px-8 py-6 text-sm text-slate-600">{req.type}</td>
              <td className="px-8 py-6 text-sm text-slate-500">{req.date}</td>
              <td className="px-8 py-6">
                <span className={cn(
                  "text-[10px] px-3 py-1 rounded-full font-bold",
                  req.status === 'Completed' ? "bg-teal-100 text-teal-700" : "bg-blue-100 text-blue-700"
                )}>
                  {req.status}
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Profile = ({ data }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-900">Profile & Settings</h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Personal Information */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" /> Personal Information
            </h3>
            <button className="text-teal-600 text-sm font-bold hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</div>
              <div className="text-sm font-bold text-slate-900">{data.name}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</div>
              <div className="text-sm font-bold text-slate-900">{data.email}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Number</div>
              <div className="text-sm font-bold text-slate-900">{data.phone}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date of Birth</div>
              <div className="text-sm font-bold text-slate-900">{data.dob}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Address</div>
              <div className="text-sm font-bold text-slate-900">{data.address}</div>
            </div>
          </div>
        </section>

        {/* Bank Details */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-600" /> Bank Account Details
            </h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">Change</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Bank Name</div>
              <div className="text-sm font-bold text-slate-900">{data.bankDetails.bankName}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Account Number</div>
              <div className="text-sm font-bold text-slate-900">{data.bankDetails.accountNumber}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Account Holder</div>
              <div className="text-sm font-bold text-slate-900">{data.bankDetails.accountName}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">IFSC Code</div>
              <div className="text-sm font-bold text-slate-900">{data.bankDetails.ifsc}</div>
            </div>
          </div>
        </section>
      </div>

      {/* Preferences & Security */}
      <div className="space-y-8">
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Security</h3>
          <div className="space-y-4">
            <button className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <span className="text-sm font-medium text-slate-700">Change Password</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <span className="text-sm font-medium text-slate-700">Set Security PIN</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Notifications</h3>
          <div className="space-y-4">
            {['Email', 'SMS', 'WhatsApp'].map(pref => (
              <div key={pref} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{pref} Updates</span>
                <div className="w-10 h-6 bg-teal-600 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

const PolicyLoan = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-900">Policy Loans</h2>

    <div className="bg-teal-600 rounded-3xl p-10 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-4">Check Loan Eligibility</h3>
        <p className="text-teal-100 max-w-md mb-8">You can get instant loans against your life insurance policies with minimal documentation and low interest rates.</p>
        <button className="px-8 py-3 bg-white text-teal-600 rounded-xl font-bold shadow-lg hover:bg-teal-50 transition-all">
          Apply Now
        </button>
      </div>
      <IndianRupee className="absolute -right-10 -bottom-10 w-64 h-64 text-teal-500/20" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Eligible Policies</h3>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
          <div>
            <div className="font-bold text-slate-900">LIC Tech Term Plan</div>
            <div className="text-xs text-slate-500 mt-1">Eligibility: ₹2,50,000</div>
          </div>
          <button className="text-teal-600 font-bold text-sm hover:underline">Apply</button>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Loan History</h3>
        <p className="text-slate-500 text-sm text-center py-10">No active or previous loans found.</p>
      </div>
    </div>
  </div>
);

const DocumentVault = ({ data }: any) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Document Vault</h2>
        <p className="text-slate-500 text-sm mt-1">All your policy documents in one secure place.</p>
      </div>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
        <Download className="w-4 h-4" /> Download All
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.policies.map((policy: any) => (
        <div key={policy.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">{policy.title}</h3>
          <p className="text-xs text-slate-400 mb-1">{policy.provider}</p>
          <p className="text-[10px] font-bold text-teal-600 uppercase mb-4">{policy.status}</p>
          <div className="space-y-2">
            {['Policy Certificate', 'Premium Receipt', 'ID Card'].map((doc) => (
              <button key={doc} className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                <span className="text-xs font-medium text-slate-700">{doc}</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Support = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-900">Help & Support</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Live Chat', desc: 'Chat with our experts', icon: MessageSquare, color: 'bg-teal-50 text-teal-600' },
        { title: 'WhatsApp', desc: 'Message us on WhatsApp', icon: PhoneCall, color: 'bg-green-50 text-green-600' },
        { title: 'Raise Ticket', desc: 'Tell us your issue', icon: FileText, color: 'bg-blue-50 text-blue-600' },
      ].map((item, i) => (
        <button key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
          <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <item.icon className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
          <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
        </button>
      ))}
    </div>

    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {[
          "How do I renew my policy?",
          "What documents are needed for a claim?",
          "Can I change my nominee online?",
          "How to download my policy certificate?"
        ].map((q, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-sm font-medium text-slate-700">{q}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CustomerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const { logout } = useAppStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = CUSTOMER_DATA.notifications.filter((n: any) => n.unread).length;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'policies', label: 'My Policies', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'claims', label: 'Claims', icon: FileText },
    { id: 'requests', label: 'Service Requests', icon: Settings },
    { id: 'vault', label: 'Document Vault', icon: Download },
    { id: 'loan', label: 'Policy Loan', icon: Landmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const handleSelectPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setActiveTab('policy-details');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview data={CUSTOMER_DATA} setTab={setActiveTab} />;
      case 'policies': return <MyPolicies data={CUSTOMER_DATA} onSelectPolicy={handleSelectPolicy} />;
      case 'policy-details': return <PolicyDetails policy={selectedPolicy} onBack={() => setActiveTab('policies')} />;
      case 'payments': return <Payments data={CUSTOMER_DATA} />;
      case 'claims': return <Claims data={CUSTOMER_DATA} />;
      case 'requests': return <ServiceRequests data={CUSTOMER_DATA} />;
      case 'vault': return <DocumentVault data={CUSTOMER_DATA} />;
      case 'profile': return <Profile data={CUSTOMER_DATA} />;
      case 'loan': return <PolicyLoan />;
      case 'support': return <Support />;
      default: return <Overview data={CUSTOMER_DATA} setTab={setActiveTab} />;
    }
  };

  return (
    <div className={cn("min-h-screen bg-slate-50 flex", isDarkMode && "dark bg-slate-950")}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transition-transform lg:translate-x-0 lg:static lg:inset-auto",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900">SafeGuard</span>
          </div>

          <nav className="space-y-1 flex-grow">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
                  activeTab === item.id || (activeTab === 'policy-details' && item.id === 'policies')
                    ? "bg-teal-50 text-teal-600" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-8 border-t border-slate-100">
            <button 
              onClick={() => setDarkMode(!isDarkMode)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                Theme
              </div>
              <div className="w-10 h-6 bg-slate-200 rounded-full relative p-1">
                <div className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {policy.status}
              </div>
              <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", isDarkMode && "translate-x-4")}></div>
              </div>
            </button>
            <button 
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="bg-transparent border-none focus:outline-none text-sm w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Notifications</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-teal-600 font-bold hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {CUSTOMER_DATA.notifications.map((n: any) => (
                      <div key={n.id} className={cn("p-4 hover:bg-slate-50 transition-colors", n.unread && "bg-orange-50/50")}>
                        <div className="flex gap-3">
                          <div className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                policy.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                policy.status === 'Pending' ? "bg-blue-50 text-blue-600 border-blue-100" :
                policy.status === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
                policy.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {policy.status}
              </div>
              <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0", n.unread ? "bg-orange-500" : "bg-transparent")} />
                          <div>
                            <div className="text-sm font-bold text-slate-900">{n.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{n.message}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-slate-100 text-center">
                    <button className="text-xs font-bold text-teal-600 hover:underline">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">{CUSTOMER_DATA.name}</div>
                <div className="text-[10px] font-bold text-teal-600 uppercase">Premium Member</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                PK
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};
