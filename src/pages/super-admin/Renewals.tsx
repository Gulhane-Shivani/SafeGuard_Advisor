import React, { useState, useEffect } from 'react';
import { Clock, Phone, Mail, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { cn } from '../../utils/helpers';

const AdminRenewals: React.FC = () => {
  const [policies, setPolicies] = useState<any[]>(() => {
    const saved = localStorage.getItem('safeguard_policies');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('safeguard_policies', JSON.stringify(policies));
  }, [policies]);

  const getAutoStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < today) return 'EXPIRED';
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    if (expiry <= thirtyDaysFromNow) return 'RENEWAL DUE';
    return 'ACTIVE';
  };

  const handleRenew = (id: string) => {
    const updatedPolicies = policies.map((p: any) => {
      if (p.id === id) {
        const currentExpiry = new Date(p.expiry);
        // Extend by 1 year from current expiry or today (whichever is later)
        const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
        const nextExpiry = new Date(baseDate);
        nextExpiry.setFullYear(nextExpiry.getFullYear() + 1);
        
        const nextExpiryStr = nextExpiry.toISOString().split('T')[0];
        return {
          ...p,
          expiry: nextExpiryStr,
          status: getAutoStatus(nextExpiryStr)
        };
      }
      return p;
    });
    setPolicies(updatedPolicies);
  };

  // Filter for policies that need renewal attention
  const renewalRequired = policies.filter((p: any) => p.status !== 'ACTIVE');

  const columns = [
    { 
      header: 'Customer', 
      accessor: 'customer',
      render: (val: string, row: any) => (
        <div>
          <p className="font-bold text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400">{row.email || 'no-email@example.com'}</p>
        </div>
      )
    },
    { header: 'Policy Name', accessor: 'name' },
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
          val === 'EXPIRED' ? "bg-red-50 text-red-600 border-red-100" :
          "bg-orange-50 text-orange-600 border-orange-100"
        )}>
          {val}
        </span>
      )
    },
    { header: 'Premium Amount', accessor: 'premium' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (_val: string, row: any) => (
        <div className="flex items-center gap-3">
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm" title="Send Reminder">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-all shadow-sm" title="Call Customer">
            <Phone className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleRenew(row.id)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl font-bold text-[10px] hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 uppercase tracking-widest"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Renew Now
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
          { label: 'Upcoming Renewals', count: policies.filter(p => p.status === 'RENEWAL DUE').length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Expired Policies', count: policies.filter(p => p.status === 'EXPIRED').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Active Coverage', count: policies.filter(p => p.status === 'ACTIVE').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <PlatformTable
        title="Pending Renewals"
        description="Customer policies expiring within the next 30 days or already expired requiring attention."
        columns={columns}
        data={renewalRequired}
      />
    </div>
  );
};

export default AdminRenewals;
