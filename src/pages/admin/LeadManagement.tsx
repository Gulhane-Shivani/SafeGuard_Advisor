import React, { useState } from 'react';
import { 
  TrendingUp,  
  Phone, 
  AlertCircle, Zap,
  BarChart3, Activity,
  Users, ArrowUpRight, ArrowDownRight,
  Headphones, PlayCircle, Clock as ClockIcon
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const LeadManagement: React.FC = () => {
  const { data, updateData } = usePlatform();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isCallQueueOpen, setIsCallQueueOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const agents = data.users.filter(u => u.role === 'AGENT');

  const columns = [
    { 
      header: 'Lead Name', 
      accessor: 'name',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold">{row.email}</p>
        </div>
      )
    },
    { 
      header: 'Category', 
      accessor: 'type',
      render: (val: string) => (
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">{val}</span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Hot' ? "bg-orange-50 text-orange-600 border-orange-100" :
          val === 'Warm' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
        )}>
          {val}
        </span>
      )
    },
    { 
      header: 'Assigned To', 
      accessor: 'assignedTo',
      render: (val: number | null) => {
        const agent = agents.find(a => a.id === val);
        return agent ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-[10px] font-black">
              {agent.avatar}
            </div>
            <span className="text-xs font-bold text-slate-700">{agent.name}</span>
          </div>
        ) : (
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Unassigned</span>
        );
      }
    },
    { 
      header: 'Created On', 
      accessor: 'createdAt',
      render: (val: string) => <span className="text-xs font-bold text-slate-500">{val}</span>
    }
  ];

  const handleAssign = (agentId: number) => {
    const updatedLeads = data.leads.map(l => 
      l.id === selectedLead.id ? { ...l, assignedTo: agentId } : l
    );
    updateData('leads', updatedLeads);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Lead Ecosystem" 
        description="Monitor lead influx, optimize agent assignment, and track conversion funnel status across all sources."
        actions={
          <button 
            onClick={() => setIsAnalyticsOpen(true)}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" /> Lead Analytics
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Hot Leads', value: data.leads.filter(l => l.status === 'Hot').length, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Unassigned', value: data.leads.filter(l => !l.assignedTo).length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total MTD', value: data.leads.length + 120, color: 'text-teal-600', bg: 'bg-teal-50' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black", stat.bg, stat.color)}>
                  <Zap className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
               </div>
            </div>
         ))}
      </div>

      <PlatformTable 
        title="Prospect Pipeline"
        description="Manage all incoming leads and agent distribution"
        columns={columns}
        data={data.leads}
        onEdit={(lead) => {
          setSelectedLead(lead);
          setIsAssignModalOpen(true);
        }}
        actions={
           <button 
            onClick={() => setIsCallQueueOpen(true)}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
          >
              <Phone className="w-3.5 h-3.5" /> Call Queue
           </button>
        }
      />

      {/* Analytics Modal */}
      <PlatformModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        title="Lead Ecosystem Analytics"
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Conversion Rate', value: '24.8%', icon: Activity, color: 'teal', trend: '+2.4%', up: true },
              { label: 'Avg. Response', value: '1.2h', icon: ClockIcon, color: 'blue', trend: '-15m', up: true },
              { label: 'Agent Load', value: '85%', icon: Users, color: 'purple', trend: '+5%', up: false },
            ].map((stat) => (
              <div key={stat.label} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-600 flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className={cn("flex items-center gap-1 text-[10px] font-bold", stat.up ? "text-emerald-600" : "text-rose-600")}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-600" /> Source Distribution
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-[10px] font-bold text-slate-400">Direct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-400">Social</span>
                </div>
              </div>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden">
              <div className="h-full bg-teal-500" style={{ width: '65%' }} />
              <div className="h-full bg-blue-500" style={{ width: '25%' }} />
              <div className="h-full bg-slate-300" style={{ width: '10%' }} />
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden relative">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-2">Performance Insight</p>
                <h5 className="text-lg font-black leading-tight">Branch lead volume is <br /> up 32% this month.</h5>
              </div>
              <Activity className="w-12 h-12 text-teal-500/20" />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          </div>
        </div>
      </PlatformModal>

      {/* Call Queue Modal */}
      <PlatformModal
        isOpen={isCallQueueOpen}
        onClose={() => setIsCallQueueOpen(false)}
        title="Prioritized Call Queue"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-5 bg-teal-600 text-white rounded-3xl">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-100">Queue Active</p>
              <h5 className="text-lg font-black">4 Urgent Leads Pending</h5>
            </div>
          </div>

          <div className="space-y-3">
            {data.leads.slice(0, 4).map((lead, i) => (
              <div key={lead.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between hover:border-teal-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{lead.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{lead.type} &middot; {lead.status}</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all group">
                  <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">
            Start Call Session
          </button>
        </div>
      </PlatformModal>

      <PlatformModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        title="Assign Lead to Agent"
      >
        <div className="space-y-8">
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-teal-600">
                 <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm font-black text-slate-900">Assigning Prospect: {selectedLead?.name}</p>
                 <p className="text-xs text-slate-500 font-medium">{selectedLead?.type} &middot; {selectedLead?.status} Status</p>
              </div>
           </div>

           <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Available Agent</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {agents.map((agent) => (
                    <button 
                      key={agent.id}
                      onClick={() => handleAssign(agent.id)}
                      className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-teal-600 hover:bg-teal-50/30 transition-all group"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs group-hover:bg-teal-600 transition-all">
                             {agent.avatar}
                          </div>
                          <div className="text-left">
                             <p className="text-sm font-black text-slate-900">{agent.name}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase">{agent.branch}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-teal-600 opacity-0 group-hover:opacity-100 uppercase tracking-widest">Assign</span>
                    </button>
                 ))}
              </div>
           </div>
           
           <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                 Assigning a lead will notify the agent immediately via SMS and In-App notification. They will have 4 hours to acknowledge before system reallocation.
              </p>
           </div>
        </div>
      </PlatformModal>
    </div>
  );
};

export default LeadManagement;
