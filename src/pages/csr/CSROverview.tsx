
import React from 'react';
import { 
  CheckSquare, MessageSquare, AlertCircle, Clock, 
  Users, PhoneCall, Mail, Shield
} from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';

const CSROverview: React.FC = () => {
  const { data } = usePlatform();

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="CSR Workspace" 
        description="Manage daily tasks, resolve customer queries, and facilitate claims processing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Open Tickets" value={data.tickets.filter(t => t.status === 'Open').length} icon={MessageSquare} trend="-2" trendUp={true} color="blue" />
        <KPICard label="Pending Claims" value={data.claims.filter(c => c.status === 'Pending').length} icon={AlertCircle} trend="+1" trendUp={false} color="orange" />
        <KPICard label="Due Renewals" value={data.policies.filter(p => p.status === 'Renewal Due').length} icon={Clock} trend="0" trendUp={true} color="purple" />
        <KPICard label="Calls Today" value="24" icon={PhoneCall} trend="+5" trendUp={true} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                 <CheckSquare className="w-5 h-5 text-teal-600" /> Daily Priorities
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Required</span>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-4">
                 <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                 <div>
                    <p className="text-sm font-bold text-slate-900">High Priority Ticket: TKT-1001</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">Alice Johnson reported a missing policy document. SLA breach in 2 hours.</p>
                    <button className="text-orange-600 text-[10px] font-black uppercase tracking-widest mt-2 hover:underline">Resolve Now</button>
                 </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                 <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                 <div>
                    <p className="text-sm font-bold text-slate-900">Claim Verification: CLM-2024-001</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">Initial documents received. Awaiting CSR verification step 1.</p>
                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-2 hover:underline">Verify Docs</button>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6">
           <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg flex items-center gap-2">
                 <Users className="w-5 h-5 text-teal-400" /> Recent Interactions
              </h3>
           </div>
           
           <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/10">
              {[
                 { customer: 'David Jones', action: 'Called regarding premium payment', time: '10 mins ago', icon: PhoneCall },
                 { customer: 'Emma Wilson', action: 'Sent email with claim form', time: '1 hour ago', icon: Mail },
                 { customer: 'Robert Smith', action: 'Resolved support ticket', time: '3 hours ago', icon: MessageSquare },
              ].map((interaction, i) => (
                 <div key={i} className="relative flex items-center gap-4 group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border-4 border-slate-900 text-teal-400 z-10 shrink-0 shadow-sm">
                       <interaction.icon className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl w-full">
                       <p className="text-xs font-black text-teal-200 mb-1">{interaction.customer}</p>
                       <p className="text-sm font-medium">{interaction.action}</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{interaction.time}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CSROverview;
