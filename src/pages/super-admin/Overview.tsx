
import React from 'react';
import { 
  Users, Shield, IndianRupee, 
  Clock, AlertCircle, 
  ArrowUpRight, Globe, Zap
} from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, 
  Cell 
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const AGENT_PERFORMANCE = [
  { name: 'John A.', sales: 45 },
  { name: 'Sarah B.', sales: 38 },
  { name: 'Mike C.', sales: 52 },
  { name: 'Emma D.', sales: 31 },
  { name: 'Raj K.', sales: 48 },
  { name: 'Priya M.', sales: 42 },
  { name: 'Vikram S.', sales: 39 },
];

const SuperAdminOverview: React.FC = () => {
  const { data } = usePlatform();

  const handleDownloadLogs = () => {
    const doc = new jsPDF();
    doc.text('SafeGuard Advisor - System Activity Logs', 14, 15);
    
    const tableData = data.activityLogs.map(log => [
      log.time,
      log.user,
      log.action
    ]);

    autoTable(doc, {
      head: [['Time', 'User', 'Action']],
      body: tableData,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [13, 148, 136] } // teal-600
    });

    doc.save('system_activity_logs.pdf');
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Business Intelligence" 
        description="Monitor system-wide performance, revenue trends, and agent productivity across all branches."
        actions={
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
            <Zap className="w-4 h-4 text-teal-400" /> System Audit
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Total Revenue" value="$245,800" icon={IndianRupee} trend="12.5%" trendUp={true} color="teal" />
        <KPICard label="Active Customers" value={data.users.length * 120} icon={Users} trend="8.2%" trendUp={true} color="blue" />
        <KPICard label="Policies Issued" value={data.policies.length + 840} icon={Shield} trend="5.1%" trendUp={true} color="purple" />
        <KPICard label="Claims Pending" value={data.claims.filter(c => c.status === 'Pending').length} icon={AlertCircle} trend="2.4%" trendUp={false} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Revenue Growth</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">Last 6 Months</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <ArrowUpRight className="w-4 h-4" /> 18% Increase
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Top Performing Agents</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">Monthly Policy Issuance</p>
            </div>
            <button className="text-teal-600 text-xs font-bold hover:underline">View Leaderboard</button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGENT_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]} maxBarSize={32}>
                  {AGENT_PERFORMANCE.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#2dd4bf'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* System Logs */}
         <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" /> System Activity
            </h3>
            <div className="space-y-6">
              {data.activityLogs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{log.time} &middot; {log.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={handleDownloadLogs}
              className="w-full mt-8 py-3 border-2 border-slate-50 rounded-2xl text-xs font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Download Full Log
            </button>
         </div>

         {/* Distribution */}
         <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Policy Distribution</h3>
              <p className="text-slate-400 text-xs font-medium max-w-xs mb-8">Breakdown of active policies across different insurance categories.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Life', value: '45%', color: 'bg-teal-500' },
                  { label: 'Health', value: '30%', color: 'bg-blue-500' },
                  { label: 'Motor', value: '15%', color: 'bg-orange-500' },
                  { label: 'Investment', value: '10%', color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-black text-white">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Globe className="absolute -right-20 -bottom-20 w-80 h-80 text-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
         </div>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
