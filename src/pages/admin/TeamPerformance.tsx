
import React from 'react';
import { 
  TrendingUp, Users, Target, 
  Award, Zap, Star } from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { usePlatform } from '../../store/PlatformContext';

const TEAM_SALES_DATA = [
  { day: 'Mon', sales: 12 },
  { day: 'Tue', sales: 18 },
  { day: 'Wed', sales: 15 },
  { day: 'Thu', sales: 22 },
  { day: 'Fri', sales: 30 },
  { day: 'Sat', sales: 25 },
  { day: 'Sun', sales: 10 },
];

const TeamPerformance: React.FC = () => {
  const { data } = usePlatform();
  const agents = data.users.filter(u => u.role === 'AGENT');

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Team Analytics & Leaderboard" 
        description="Monitor individual agent productivity, branch targets, and historical sales trends to optimize team performance."
        actions={
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" /> Set Monthly Targets
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Branch Revenue" value="$84,200" icon={TrendingUp} trend="18.2%" trendUp={true} color="blue" />
        <KPICard label="Policies Target" value="72/100" icon={Target} trend="72%" trendUp={true} color="orange" />
        <KPICard label="Active Agents" value={agents.length} icon={Users} trend="No Change" trendUp={true} color="teal" />
        <KPICard label="Conversion Rate" value="31.4%" icon={Zap} trend="2.1%" trendUp={true} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="font-bold text-slate-900 text-lg">Weekly Sales Velocity</h3>
                 <p className="text-xs text-slate-400 font-bold uppercase mt-1">Policies Issued Per Day</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Current Week</span>
                 </div>
              </div>
           </div>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={TEAM_SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                    <Tooltip 
                       cursor={{fill: '#f8fafc'}}
                       contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                    />
                    <Bar dataKey="sales" radius={[8, 8, 0, 0]} fill="#0d9488" />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Agent Leaderboard */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                 <Award className="w-5 h-5 text-orange-500" /> Leaderboard
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MTD Sales</span>
           </div>
           
           <div className="flex-grow space-y-4">
              {agents.map((agent, i) => (
                 <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs relative shrink-0">
                          {agent.avatar}
                          {i === 0 && <Star className="w-4 h-4 text-orange-400 fill-orange-400 absolute -top-2 -right-2 drop-shadow-sm" />}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{agent.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Active since {2022 + i}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-900">{45 - (i * 12)}</p>
                       <p className="text-[9px] font-black text-emerald-600 uppercase">↑ {12 - i}%</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <button className="w-full mt-8 py-3 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              View Detailed Metrics
           </button>
        </div>
      </div>

      {/* Target Tracking */}
      <div className="bg-teal-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-center lg:text-left">
               <h3 className="text-2xl font-black mb-4">Branch Target Progress</h3>
               <p className="text-teal-100 text-sm font-medium mb-6">Your branch is currently at <strong>72%</strong> of the monthly goal. Keep up the momentum to reach the Platinum tier!</p>
               <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                  <div className="text-center">
                     <p className="text-[9px] font-black text-teal-200 uppercase tracking-widest">Achieved</p>
                     <p className="text-xl font-black">$64.5K</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                     <p className="text-[9px] font-black text-teal-200 uppercase tracking-widest">Remaining</p>
                     <p className="text-xl font-black">$25.5K</p>
                  </div>
               </div>
            </div>
            
            <div className="flex-grow w-full space-y-6">
               {[
                  { label: 'Life Insurance', progress: 85, color: 'bg-emerald-400' },
                  { label: 'Health Insurance', progress: 62, color: 'bg-blue-400' },
                  { label: 'Motor Insurance', progress: 45, color: 'bg-orange-400' },
               ].map((target) => (
                  <div key={target.label}>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-teal-50">{target.label}</span>
                        <span className="text-xs font-black">{target.progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(255,255,255,0.3)]", target.color)} style={{ width: `${target.progress}%` }} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <Target className="absolute -left-20 -bottom-20 w-80 h-80 text-white/5 pointer-events-none group-hover:scale-110 transition-all duration-1000" />
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default TeamPerformance;
