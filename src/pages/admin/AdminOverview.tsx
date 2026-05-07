import React, { useState } from 'react';
import { 
  Shield, TrendingUp, BarChart3, 
  CheckCircle2, Clock, 
  Users, AlertCircle, FileCheck,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie
} from 'recharts';
import { KPICard } from '../../components/platform/KPICard';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';

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

const AdminOverview: React.FC = () => {
  const { data } = usePlatform();
  const [timeFilter, setTimeFilter] = useState('Weekly');

  // Simulated dynamic data based on filter
  const getFilteredStats = () => {
    const multipliers: Record<string, number> = {
      'Daily': 0.1,
      'Weekly': 0.5,
      'Monthly': 1.0
    };
    const m = multipliers[timeFilter] || 1;
    
    return {
      leads: Math.round(data.leads.length * m * 2.5),
      policies: Math.round(data.policies.length * m * 1.8),
      conversion: timeFilter === 'Daily' ? '24%' : timeFilter === 'Weekly' ? '28%' : '32%',
      pending: Math.round(12 * m),
      totalCustomers: new Set(data.policies.map(p => p.customerName)).size,
      pendingRenewals: data.policies.filter(p => p.status === 'Reminder Sent').length,
      expiredPolicies: 4,
      renewalDue: data.policies.filter(p => p.status === 'Renewal Due').length,
      pipeline: {
        new: Math.round(45 * m),
        contacted: Math.round(32 * m),
        quote: Math.round(18 * m),
        issued: Math.round(12 * m)
      }
    };
  };

  const stats = getFilteredStats();

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Admin Control Center" 
        description="Oversee branch operations, lead conversions, and team performance metrics in real-time."
        actions={
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
             {['Daily', 'Weekly', 'Monthly'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setTimeFilter(f)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all",
                    timeFilter === f 
                      ? "bg-slate-900 text-white shadow-lg" 
                      : "text-slate-400 hover:text-slate-900"
                  )}
                >
                  {f}
                </button>
             ))}
          </div>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard label="Total Leads" value={stats.leads} icon={TrendingUp} trend="+14" trendUp={true} color="blue" />
          <KPICard label="Policies" value={stats.policies} icon={Shield} trend="+5" trendUp={true} color="teal" />
          <KPICard label="Conversion" value={stats.conversion} icon={BarChart3} trend="+2.1%" trendUp={true} color="emerald" />
          <KPICard label="Pending Approvals" value={stats.pending} icon={CheckCircle2} trend="-3" trendUp={false} color="amber" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard label="Total Customers" value={stats.totalCustomers} icon={Users} trend="+12" trendUp={true} color="indigo" />
          <KPICard label="Pending Renewals" value={stats.pendingRenewals} icon={Clock} trend="+2" trendUp={true} color="orange" />
          <KPICard label="Expired Policies" value={stats.expiredPolicies} icon={AlertCircle} trend="+1" trendUp={false} color="red" />
          <KPICard label="Renewal Due" value={stats.renewalDue} icon={FileCheck} trend="+8" trendUp={true} color="blue" />
        </div>
      </div>

      {/* Charts Row - Revenue & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* Lead Pipeline (Existing) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="font-bold text-slate-900">Lead Conversion Pipeline</h3>
                 <p className="text-xs text-slate-400 font-bold uppercase mt-1">Lead Flow Status</p>
              </div>
           </div>
           
           <div className="flex-grow space-y-6 flex flex-col justify-center">
              {[
                 { label: 'New Leads', value: stats.pipeline.new, total: 100, color: 'bg-blue-500' },
                 { label: 'Contacted', value: stats.pipeline.contacted, total: 100, color: 'bg-indigo-500' },
                 { label: 'Quote Generated', value: stats.pipeline.quote, total: 100, color: 'bg-purple-500' },
                 { label: 'Closed/Policy Issued', value: stats.pipeline.issued, total: 100, color: 'bg-teal-500' },
              ].map((step) => (
                 <div key={step.label}>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-black text-slate-700">{step.label}</span>
                       <span className="text-xs font-black text-slate-900">{step.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                       <div className={cn("h-full rounded-full transition-all duration-1000", step.color)} style={{ width: `${(step.value / 60) * 100}%` }} />
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-10 pt-8 border-t border-slate-50 grid grid-cols-3 gap-4">
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Hot Leads</p>
                 <p className="text-lg font-black text-slate-900">{Math.round(12 * (data.leads.length / 3))}</p>
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

    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AdminOverview;
