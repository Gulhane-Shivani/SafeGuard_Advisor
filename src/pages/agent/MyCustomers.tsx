
import React from 'react';
import { 
  Users, 
  FileText
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const MyCustomers: React.FC = () => {
  const { data } = usePlatform();
  const agentId = 2; // Assuming logged in as John Agent
  const myPolicies = data.policies.filter(p => p.agentId === agentId);

  // Group policies by customer for this view
  const myCustomers = Array.from(new Set(myPolicies.map(p => p.customerName))).map(name => {
    const customerPolicies = myPolicies.filter(p => p.customerName === name);
    return {
      id: name, // Using name as ID for demo
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      phone: '+1 234-567-8900',
      totalPolicies: customerPolicies.length,
      status: customerPolicies.some(p => p.status === 'Renewal Due') ? 'Attention Needed' : 'Stable',
      policies: customerPolicies
    };
  });

  const columns = [
    { 
      header: 'Customer Details', 
      accessor: 'name',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center font-black text-teal-600">
            {val.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">{val}</p>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[10px] text-slate-500 font-bold">{row.phone}</span>
               <span className="text-[10px] text-slate-300">&bull;</span>
               <span className="text-[10px] text-slate-500 font-bold">{row.email}</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: 'Policies Held', 
      accessor: 'totalPolicies',
      render: (val: number) => <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{val} Active</span>
    },
    { 
      header: 'Account Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-max",
          val === 'Attention Needed' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
        )}>
          {val === 'Attention Needed' && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />}
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="My Client Portfolio" 
        description="Manage your active customer relationships, track policy renewals, and identify cross-selling opportunities."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Total Clients', value: myCustomers.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Policies Managed', value: myPolicies.length, color: 'text-teal-600', bg: 'bg-teal-50' },
            { label: 'Action Required', value: myCustomers.filter(c => c.status === 'Attention Needed').length, color: 'text-orange-600', bg: 'bg-orange-50' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black", stat.bg, stat.color)}>
                  <Users className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
               </div>
            </div>
         ))}
      </div>

      <PlatformTable 
        title="Client Roster"
        description="Showing all your active customers"
        columns={columns}
        data={myCustomers}
        onEdit={(customer) => console.log('View Customer', customer)}
      />

      {/* Cross-Sell Suggestions */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="max-w-md">
               <h3 className="text-2xl font-black mb-3">AI Cross-Sell Recommendations</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Based on current portfolio analysis, <strong>2 clients</strong> have high probability for Life Insurance upsells.
               </p>
               <button className="px-6 py-3 bg-teal-500 text-white rounded-xl font-bold text-sm hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 w-full sm:w-auto text-center">
                  View Target List
               </button>
            </div>
            <div className="flex-grow w-full space-y-4">
               {myCustomers.slice(0, 2).map((c, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-xs">
                           {c.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-sm">{c.name}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Recommended: Term Life</p>
                        </div>
                     </div>
                     <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-teal-500 transition-all">
                        <FileText className="w-4 h-4" />
                     </button>
                  </div>
               ))}
            </div>
         </div>
         <Users className="absolute -right-20 -top-20 w-80 h-80 text-white/5 pointer-events-none group-hover:scale-110 transition-all duration-1000" />
      </div>
    </div>
  );
};

export default MyCustomers;
