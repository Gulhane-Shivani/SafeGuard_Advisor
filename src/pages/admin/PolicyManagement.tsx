
import React, { useState } from 'react';
import { 
  Shield, Clock, 
  Download, AlertCircle,
  Activity
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const PolicyManagement: React.FC = () => {
  const { data } = usePlatform();
  const [filter, setFilter] = useState('All');

  const columns = [
    { 
      header: 'Policy Details', 
      accessor: 'policyNumber',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.type}</p>
        </div>
      )
    },
    { header: 'Customer', accessor: 'customerName' },
    { 
      header: 'Premium', 
      accessor: 'premium',
      render: (val: string) => <span className="text-sm font-black text-slate-900">{val}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
          val === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {val}
        </span>
      )
    },
    { 
      header: 'Expiry Date', 
      accessor: 'endDate',
      render: (val: string) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-300" /> {val}
        </div>
      )
    }
  ];

  const filteredPolicies = filter === 'All' ? data.policies : data.policies.filter(p => p.status === filter);

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Policy Lifecycle Management" 
        description="Monitor active policies, track upcoming renewals, and manage policy servicing operations for all branch customers."
        actions={
          <div className="flex items-center gap-3">
             <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                {['All', 'Active', 'Renewal Due'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setFilter(f)}
                     className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all",
                        filter === f ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"
                     )}
                   >
                     {f}
                   </button>
                ))}
             </div>
             <button className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2">
                <Shield className="w-4 h-4" /> New Policy
             </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
            { label: 'Active Policies', value: data.policies.filter(p => p.status === 'Active').length, icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'Renewals Pending', value: data.policies.filter(p => p.status === 'Renewal Due').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Lapsed Policies', value: '4', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Retention Rate', value: '94.2%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-inner", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
            </div>
         ))}
      </div>

      <PlatformTable 
        title="Insurance Portfolio"
        description={`Showing ${filter} policies for the current branch`}
        columns={columns}
        data={filteredPolicies}
        onEdit={(policy) => console.log('Edit Policy', policy)}
        actions={
           <button className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export
           </button>
        }
      />

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
               <h3 className="text-2xl font-black mb-4">Bulk Renewal Reminder</h3>
               <p className="text-slate-400 text-sm leading-relaxed">
                  Send automated renewal reminders to all <strong>{data.policies.filter(p => p.status === 'Renewal Due').length} customers</strong> whose policies are due for renewal this month. Reminders will be sent via Email, SMS, and WhatsApp.
               </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <button className="flex-grow md:flex-none px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all border border-white/10">
                  Preview Templates
               </button>
               <button className="flex-grow md:flex-none px-8 py-4 bg-teal-500 text-white rounded-2xl font-bold text-sm hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20">
                  Execute Reminders
               </button>
            </div>
         </div>
         <Clock className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none group-hover:scale-110 transition-all duration-1000" />
      </div>
    </div>
  );
};

export default PolicyManagement;
