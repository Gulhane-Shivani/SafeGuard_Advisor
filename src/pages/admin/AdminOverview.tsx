
import React from 'react';
import { 
  Shield, TrendingUp, BarChart3, 
  CheckCircle2, Clock, 
  IndianRupee, PieChart
} from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';

const AdminOverview: React.FC = () => {
  const { data } = usePlatform();

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Admin Control Center" 
        description="Oversee branch operations, lead conversions, and team performance metrics in real-time."
        actions={
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
             {['Daily', 'Weekly', 'Monthly'].map(f => (
                <button key={f} className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight text-slate-400 hover:text-slate-900 transition-colors">{f}</button>
             ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Leads" value={data.leads.length} icon={TrendingUp} trend="+14" trendUp={true} color="blue" />
        <KPICard label="Policies" value={data.policies.length} icon={Shield} trend="+5" trendUp={true} color="teal" />
        <KPICard label="Conversion" value="28%" icon={BarChart3} trend="+2.1%" trendUp={true} color="emerald" />
        <KPICard label="Pending Approvals" value="12" icon={CheckCircle2} trend="-3" trendUp={false} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
           <h3 className="font-black text-slate-900 text-lg">Quick Access</h3>
           <div className="grid grid-cols-1 gap-4">
              {[
                 { label: 'Review New Leads', icon: TrendingUp, path: '/admin/leads', color: 'bg-blue-50 text-blue-600' },
                 { label: 'Policy Renewals', icon: Clock, path: '/admin/policies', color: 'bg-orange-50 text-orange-600' },
                 { label: 'Team Leaderboard', icon: BarChart3, path: '/admin/team', color: 'bg-purple-50 text-purple-600' },
                 { label: 'Payout Approvals', icon: IndianRupee, path: '/admin/commission', color: 'bg-teal-50 text-teal-600' },
              ].map((action) => (
                 <button key={action.label} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl hover:border-teal-200 transition-all text-left shadow-sm group">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", action.color)}>
                       <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-900">{action.label}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Jump to Module →</p>
                    </div>
                 </button>
              ))}
           </div>
        </div>

        {/* Lead Pipeline */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="font-bold text-slate-900">Lead Conversion Pipeline</h3>
                 <p className="text-xs text-slate-400 font-bold uppercase mt-1">Lead Flow Status</p>
              </div>
              <PieChart className="w-5 h-5 text-slate-400" />
           </div>
           
           <div className="flex-grow space-y-6 flex flex-col justify-center">
              {[
                 { label: 'New Leads', value: 45, total: 100, color: 'bg-blue-500' },
                 { label: 'Contacted', value: 32, total: 100, color: 'bg-indigo-500' },
                 { label: 'Quote Generated', value: 18, total: 100, color: 'bg-purple-500' },
                 { label: 'Closed/Policy Issued', value: 12, total: 100, color: 'bg-teal-500' },
              ].map((step) => (
                 <div key={step.label}>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-black text-slate-700">{step.label}</span>
                       <span className="text-xs font-black text-slate-900">{step.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                       <div className={cn("h-full rounded-full transition-all duration-1000", step.color)} style={{ width: `${step.value}%` }} />
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-10 pt-8 border-t border-slate-50 grid grid-cols-3 gap-4">
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Hot Leads</p>
                 <p className="text-lg font-black text-slate-900">12</p>
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. TAT</p>
                 <p className="text-lg font-black text-slate-900">1.4 Days</p>
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Branch Rank</p>
                 <p className="text-lg font-black text-teal-600">#2</p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[3rem] text-white overflow-hidden relative">
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Urgent Alerts</span>
               </div>
               <h3 className="text-3xl font-black leading-tight">15 Policy Renewals <br /> Due This Week</h3>
               <p className="text-slate-400 text-sm max-w-sm">There are 15 high-value policies due for renewal in the next 7 days. Assign them to agents immediately to prevent lapse.</p>
               <button className="px-8 py-3 bg-teal-500 text-white rounded-xl font-bold text-sm hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20">
                  Manage Renewals
               </button>
            </div>
            <div className="hidden md:block">
               <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl space-y-6">
                  {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
                              {i}
                           </div>
                           <div>
                              <p className="text-sm font-bold">Policy Renewal #{1000 + i}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Customer: Alice Johnson</p>
                           </div>
                        </div>
                        <span className="text-xs font-black text-orange-400">₹1,20,000</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <PieChart className="absolute -left-20 -bottom-20 w-80 h-80 text-white/5 pointer-events-none" />
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AdminOverview;
