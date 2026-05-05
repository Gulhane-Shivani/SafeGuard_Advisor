
import React from 'react';
import { 
  Shield, IndianRupee, Zap, 
  Clock, CheckCircle2, ChevronRight, Target
} from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { useNavigate } from 'react-router-dom';

const AgentOverview: React.FC = () => {
  const { data } = usePlatform();
  const navigate = useNavigate();
  const agentId = 2; // Assuming logged in as John Agent
  const myLeads = data.leads.filter(l => l.assignedTo === agentId);
  const myPolicies = data.policies.filter(p => p.agentId === agentId);

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Agent Workspace" 
        description="Track your daily sales pipeline, upcoming renewals, and commission earnings."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="My Policies" value={myPolicies.length} icon={Shield} trend="+2" trendUp={true} color="teal" />
        <KPICard label="Pending Renewals" value={myPolicies.filter(p => p.status === 'Renewal Due').length} icon={Clock} trend="-1" trendUp={true} color="orange" />
        <KPICard label="MTD Commission" value="₹60,000" icon={IndianRupee} trend="+15%" trendUp={true} color="emerald" />
        <KPICard label="Conversion Rate" value="42%" icon={Zap} trend="+4.5%" trendUp={true} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900 text-lg">Lead Pipeline</h3>
                  <button onClick={() => navigate('/agent/leads')} className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline">View All Leads</button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">New / Warm</p>
                     <p className="text-3xl font-black text-slate-900">{myLeads.filter(l => l.status === 'Warm').length}</p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 text-center">
                     <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Hot / Urgent</p>
                     <p className="text-3xl font-black text-orange-600">{myLeads.filter(l => l.status === 'Hot').length}</p>
                  </div>
                  <div className="p-6 bg-teal-50 rounded-3xl border border-teal-100 text-center">
                     <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">Quotes Sent</p>
                     <p className="text-3xl font-black text-teal-600">4</p>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-lg">Recent Activity</h3>
                  <Target className="w-5 h-5 text-teal-400" />
               </div>
               <div className="space-y-6">
                  {data.activityLogs.map((log, i) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                           <CheckCircle2 className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                           <p className="text-sm font-bold leading-tight">{log.action}</p>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-teal-400 font-black uppercase tracking-tight">{log.user}</span>
                              <span className="text-slate-600 text-[10px]">·</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{log.time}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center flex flex-col items-center relative overflow-hidden group">
               <div className="relative w-32 h-32 mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                     {/* Background Circle */}
                     <circle 
                        cx="50" cy="50" r="42" 
                        fill="transparent" 
                        stroke="#f1f5f9" 
                        strokeWidth="8" 
                     />
                     {/* Progress Circle with Gradient */}
                     <circle 
                        cx="50" cy="50" r="42" 
                        fill="transparent" 
                        stroke="url(#progressGradient)" 
                        strokeWidth="8" 
                        strokeDasharray="263.89" 
                        strokeDashoffset={263.89 * (1 - 0.65)} 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                     />
                     <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                           <stop offset="0%" stopColor="#0d9488" />
                           <stop offset="100%" stopColor="#2dd4bf" />
                        </linearGradient>
                     </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-2xl font-black text-slate-900 leading-none">65%</span>
                     <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest mt-1">Achieved</span>
                  </div>
               </div>
               
               <div className="space-y-1 mb-8">
                  <h3 className="font-black text-slate-900 text-lg">Monthly Target</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">13 of 20 Policies Sold</p>
               </div>

               <button className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-teal-600 transition-all shadow-lg shadow-slate-900/10 hover:shadow-teal-600/20">
                  View Commission Tier
               </button>
               
               {/* Decorative background element */}
               <Target className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" /> Up Next
               </h3>
               <div className="space-y-4">
                  {data.tasks.filter(t => t.agentId === agentId && !t.completed).map(task => (
                     <div key={task.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-teal-200">
                        <div>
                           <p className="text-xs font-black text-slate-900">{task.title}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{task.type} &middot; {task.date}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AgentOverview;

