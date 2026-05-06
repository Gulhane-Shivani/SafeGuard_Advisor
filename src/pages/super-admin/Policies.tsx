import React, { useState, useEffect } from 'react';
import { Shield, Plus, Eye, Edit3, Clock, AlertCircle, Activity } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/helpers';

// Helper to determine status from expiry date
const getAutoStatus = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  if (expiry < today) return 'EXPIRED';

  // If expiry is within 30 days, it's Renewal Due
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  if (expiry <= thirtyDaysFromNow) return 'RENEWAL DUE';

  return 'ACTIVE';
};
const DEFAULT_POLICIES = [
  { id: 'SG-HLTH-002', name: 'Star Comprehensive Health', customer: 'Vijay Mehta', email: 'vijay.mehta@example.com', phone: '+91 98765 43210', type: 'HEALTH INSURANCE', premium: '₹80,000', expiry: '2027-05-02', startDate: '2022-05-02', nomineeName: 'Anita Mehta', nomineeRelation: 'Spouse', customCoverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment'], customBenefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup'] },
  { id: 'SG-MOTR-003', name: 'Bajaj Car Insurance', customer: 'Deepak Singh', email: 'deepak.s@example.com', phone: '+91 88776 55443', type: 'MOTOR INSURANCE', premium: '₹12,500', expiry: '2027-08-15', startDate: '2023-08-15', nomineeName: 'Karan Singh', nomineeRelation: 'Child', customCoverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire'], customBenefits: ['Zero Depreciation', 'Roadside Assistance'] },
  { id: 'SG-LIFE-001', name: 'LIC Tech Term', customer: 'Sneh Lata', email: 'sneh.lata@example.com', phone: '+91 77665 44332', type: 'LIFE INSURANCE', premium: '₹45,000', expiry: '2023-12-20', startDate: '2019-12-20', nomineeName: 'Madan Lal', nomineeRelation: 'Parent', customCoverage: ['Death Benefit', 'Critical Illness Cover', 'Terminal Illness'], customBenefits: ['Tax Savings U/S 80C', 'Accidental Death Rider'] },
  { id: 'SG-HLTH-005', name: 'HDFC Optima Restore', customer: 'Rahul Verma', email: 'rahul.v@example.com', phone: '+91 99887 77665', type: 'HEALTH INSURANCE', premium: '₹65,000', expiry: '2026-11-10', startDate: '2021-11-10', nomineeName: 'Seema Verma', nomineeRelation: 'Spouse', customCoverage: ['In-patient Hospitalization', 'Restore Sum Insured'], customBenefits: ['Free Health Checkup'] },
  { id: 'SG-MOTR-009', name: 'TATA AIG Motor', customer: 'Arun Jha', email: 'arun.jha@example.com', phone: '+91 66554 44332', type: 'MOTOR INSURANCE', premium: '₹18,000', expiry: '2024-01-15', startDate: '2020-01-15', nomineeName: 'Priya Jha', nomineeRelation: 'Spouse', customCoverage: ['Third Party Liability', 'Own Damage'], customBenefits: ['Roadside Assistance'] },
];

const AdminPolicies: React.FC = () => {
  const navigate = useNavigate();

  const [policies] = useState(() => {
    const saved = localStorage.getItem('safeguard_policies');
    const baseData = saved ? JSON.parse(saved) : DEFAULT_POLICIES;
    // Map with auto-calculated status
    return baseData.map((p: any) => ({
      ...p,
      status: getAutoStatus(p.expiry)
    }));
  });

  useEffect(() => {
    localStorage.setItem('safeguard_policies', JSON.stringify(policies));
  }, [policies]);

  const columns = [
    {
      header: 'POLICY DETAILS',
      accessor: 'id',
      render: (val: string, row: any) => (
        <div className="group cursor-pointer" onClick={() => navigate(`/super-admin/policies/${row.id}`)}>
          <p className="font-black text-slate-900 leading-none group-hover:text-teal-600 transition-colors">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{row.type}</p>
        </div>
      )
    },
    { header: 'CUSTOMER', accessor: 'customer' },
    { header: 'PREMIUM', accessor: 'premium' },
    {
      header: 'STATUS',
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
            val === 'RENEWAL DUE' ? "bg-orange-50 text-orange-600 border-orange-100" :
              "bg-red-50 text-red-600 border-red-100"
        )}>
          {val}
        </span>
      )
    },
    {
      header: 'EXPIRY DATE',
      accessor: 'expiry',
      render: (val: string) => (
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-300" /> {val}
        </div>
      )
    },
    {
      header: 'ACTIONS',
      accessor: 'id',
      render: (_: string, row: any) => (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/super-admin/policies/${row.id}`)} className="p-1.5 hover:bg-teal-50 rounded-lg text-slate-400 hover:text-teal-600 transition-all"><Eye className="w-4 h-4" /></button>
          <button onClick={() => navigate(`/super-admin/policies/${row.id}/edit`)} className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-all"><Edit3 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Policy Lifecycle Management"
        description="Monitor active policies, track upcoming renewals, and manage policy servicing operations for all customers."
        actions={
          <button
            onClick={() => navigate('/super-admin/policies/issue')}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Policy
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Policies', count: policies.filter((p: any) => p.status === 'ACTIVE').length, icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Renewals Pending', count: policies.filter((p: any) => p.status === 'RENEWAL DUE').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Expired Policies', count: policies.filter((p: any) => p.status === 'EXPIRED').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Retention Rate', count: '98.2%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-all group">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <PlatformTable
        title="Insurance Portfolio"
        description="Comprehensive list of all insurance plans currently managed on the platform."
        columns={columns}
        data={policies}
        filterKey="status"
        filterOptions={['ACTIVE', 'RENEWAL DUE', 'EXPIRED']}
      />
    </div>
  );
};

export default AdminPolicies;
