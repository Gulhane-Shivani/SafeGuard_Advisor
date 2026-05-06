import React from 'react';
import { 
  Users, Shield, IndianRupee, 
  Clock, AlertCircle, 
  ArrowUpRight, Globe, Zap,
  TrendingUp, FileText, CheckCircle2
} from 'lucide-react';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, 
  Cell, PieChart, Pie
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const REVENUE_DATA = [
  { name: 'Jan', value: 4000, growth: 3200 },
  { name: 'Feb', value: 3000, growth: 3800 },
  { name: 'Mar', value: 5000, growth: 4200 },
  { name: 'Apr', value: 4500, growth: 4900 },
  { name: 'May', value: 6000, growth: 5500 },
  { name: 'Jun', value: 5500, growth: 6100 },
];

const RENEWAL_SUCCESS_DATA = [
  { name: 'Successful', value: 85, color: '#0d9488' },
  { name: 'Pending', value: 10, color: '#f59e0b' },
  { name: 'Failed', value: 5, color: '#ef4444' },
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
      headStyles: { fillColor: [13, 148, 136] }
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

      {/* KPI Stats Grid - Updated to 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard label="Total Revenue" value="₹2,04,00,000" icon={IndianRupee} trend="12.5%" trendUp={true} color="teal" />
        <KPICard label="Total Customers" value="480" icon={Users} trend="8.2%" trendUp={true} color="blue" />
        <KPICard label="Active Policies" value="847" icon={Shield} trend="5.1%" trendUp={true} color="emerald" />
        <KPICard label="Renewal Due" value="42" icon={Clock} trend="15% high" trendUp={false} color="orange" />
        <KPICard label="Expired Policies" value="15" icon={AlertCircle} trend="2.4%" trendUp={false} color="red" />
        <KPICard label="Pending Requests" value={data.claims.filter(c => c.status === 'Pending').length + data.tickets.filter(t => t.status === 'Open').length} icon={FileText} trend="Normal" trendUp={true} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Graph */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Monthly Revenue</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">Financial Inflow Trends</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <ArrowUpRight className="w-4 h-4" /> 18% Increase
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                <Area type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Growth Graph */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Policy Growth</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">Acquisition rate last 6 months</p>
            </div>
            <TrendingUp className="w-5 h-5 text-teal-500" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
                <Area type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Renewal Success Rate */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-900 mb-2">Renewal Success Rate</h3>
            <p className="text-xs text-slate-400 font-bold uppercase mb-8">Current Quarter Performance</p>
            
            <div className="flex-grow flex items-center justify-center relative">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RENEWAL_SUCCESS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {RENEWAL_SUCCESS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900">85%</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase">Retention</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              {RENEWAL_SUCCESS_DATA.map(item => (
                <div key={item.name} className="text-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{item.name}</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-black text-slate-900">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
         </div>

         {/* System Activity & Distribution Area */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Policy Distribution</h3>
                    <p className="text-slate-400 text-xs font-medium">Global category breakdown</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                </div>
                
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

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">System Activity Logs</h4>
                  <p className="text-xs text-slate-400 font-medium">Last updated: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              <button 
                onClick={handleDownloadLogs}
                className="px-6 py-2.5 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all"
              >
                Download Audit PDF
              </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SuperAdminOverview;
