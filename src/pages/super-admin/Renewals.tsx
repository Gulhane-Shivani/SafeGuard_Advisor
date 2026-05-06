import React from 'react';
import { Clock, Phone, Mail, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { cn } from '../../utils/helpers';

const AdminRenewals: React.FC = () => {
  const renewals = [
    { id: 1, customer: 'Rahul Sharma', email: 'rahul@example.com', policy: 'Star Health Plan', expiry: '15 May 2026', status: 'Due Soon', premium: '₹7,999' },
    { id: 2, customer: 'Priya Patel', email: 'priya@example.com', policy: 'LIC Term Life', expiry: '10 May 2026', status: 'Action Required', premium: '₹12,499' },
    { id: 3, customer: 'Amit Kumar', email: 'amit@example.com', policy: 'Bajaj Car Insure', expiry: '20 May 2026', status: 'Payment Pending', premium: '₹4,599' },
    { id: 4, customer: 'Sneh Lata', email: 'sneh@example.com', policy: 'HDFC Health', expiry: '25 May 2026', status: 'Due Soon', premium: '₹11,000' },
  ];

  const columns = [
    { 
      header: 'Customer', 
      accessor: 'customer',
      render: (val: string, row: any) => (
        <div>
          <p className="font-bold text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400">{row.email}</p>
        </div>
      )
    },
    { header: 'Policy Name', accessor: 'policy' },
    { 
      header: 'Expiry Date', 
      accessor: 'expiry',
      render: (val: string) => (
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <Clock className="w-3.5 h-3.5 text-orange-500" /> {val}
        </div>
      )
    },
    { 
      header: 'Renewal Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Action Required' ? "bg-red-50 text-red-600 border-red-100" :
          val === 'Payment Pending' ? "bg-orange-50 text-orange-600 border-orange-100" :
          "bg-blue-50 text-blue-600 border-blue-100"
        )}>
          {val}
        </span>
      )
    },
    { header: 'Premium Amount', accessor: 'premium' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (val: number) => (
        <div className="flex items-center gap-3">
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm" title="Send Reminder">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm" title="Call Customer">
            <Phone className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg font-bold text-[10px] hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 uppercase tracking-widest">
            Renew Now
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Policy Renewals Tracking"
        description="Monitor upcoming policy expirations and manage customer renewal workflows."
      />

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Upcoming Renewals', count: '128', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Payment Pending', count: '45', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Completed Today', count: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <PlatformTable
        title="Pending Renewals"
        description="Customer policies expiring within the next 30 days requiring attention."
        columns={columns}
        data={renewals}
      />
    </div>
  );
};

export default AdminRenewals;
