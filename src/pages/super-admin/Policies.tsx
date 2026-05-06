import React, { useState, useEffect } from 'react';
import { Shield, Plus, Eye, Edit3, Clock, AlertCircle, Activity, Check, LayoutGrid, Heart, User } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
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


const PLAN_CATALOG = [
  { id: 'p1', name: 'Star Comprehensive Health', type: 'HEALTH INSURANCE', provider: 'Star Health', premium: '₹80,000', coverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment'], benefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup'] },
  { id: 'p2', name: 'LIC Tech Term', type: 'LIFE INSURANCE', provider: 'LIC of India', premium: '₹45,000', coverage: ['Death Benefit', 'Critical Illness Cover', 'Terminal Illness'], benefits: ['Tax Savings U/S 80C', 'Accidental Death Rider', 'Flexible Payouts'] },
  { id: 'p3', name: 'Bajaj Car Insurance', type: 'MOTOR INSURANCE', provider: 'Bajaj Allianz', premium: '₹12,500', coverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire'], benefits: ['Zero Depreciation', 'Roadside Assistance', 'Engine Protector'] },
];

const DEFAULT_POLICIES = [
  { id: 'SG-HLTH-002', name: 'Star Comprehensive Health', customer: 'Vijay Mehta', email: 'vijay.mehta@example.com', phone: '+91 98765 43210', type: 'HEALTH INSURANCE', premium: '₹80,000', expiry: '2027-05-02', startDate: '2022-05-02', nomineeName: 'Anita Mehta', nomineeRelation: 'Spouse', customCoverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment'], customBenefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup'] },
  { id: 'SG-MOTR-003', name: 'Bajaj Car Insurance', customer: 'Deepak Singh', email: 'deepak.s@example.com', phone: '+91 88776 55443', type: 'MOTOR INSURANCE', premium: '₹12,500', expiry: '2027-08-15', startDate: '2023-08-15', nomineeName: 'Karan Singh', nomineeRelation: 'Child', customCoverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire'], customBenefits: ['Zero Depreciation', 'Roadside Assistance'] },
  { id: 'SG-LIFE-001', name: 'LIC Tech Term', customer: 'Sneh Lata', email: 'sneh.lata@example.com', phone: '+91 77665 44332', type: 'LIFE INSURANCE', premium: '₹45,000', expiry: '2023-12-20', startDate: '2019-12-20', nomineeName: 'Madan Lal', nomineeRelation: 'Parent', customCoverage: ['Death Benefit', 'Critical Illness Cover', 'Terminal Illness'], customBenefits: ['Tax Savings U/S 80C', 'Accidental Death Rider'] },
  { id: 'SG-HLTH-005', name: 'HDFC Optima Restore', customer: 'Rahul Verma', email: 'rahul.v@example.com', phone: '+91 99887 77665', type: 'HEALTH INSURANCE', premium: '₹65,000', expiry: '2026-11-10', startDate: '2021-11-10', nomineeName: 'Seema Verma', nomineeRelation: 'Spouse', customCoverage: ['In-patient Hospitalization', 'Restore Sum Insured'], customBenefits: ['Free Health Checkup'] },
  { id: 'SG-MOTR-009', name: 'TATA AIG Motor', customer: 'Arun Jha', email: 'arun.jha@example.com', phone: '+91 66554 44332', type: 'MOTOR INSURANCE', premium: '₹18,000', expiry: '2024-01-15', startDate: '2020-01-15', nomineeName: 'Priya Jha', nomineeRelation: 'Spouse', customCoverage: ['Third Party Liability', 'Own Damage'], customBenefits: ['Roadside Assistance'] },
];

const AdminPolicies: React.FC = () => {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState(() => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    planId: '',
    type: '',
    provider: '',
    name: '',
    premium: '',
    nomineeName: '',
    nomineeRelation: '',
    status: 'ACTIVE',
    customCoverage: [] as string[],
    customBenefits: [] as string[]
  });

  const handleEdit = (policy: any) => {
    setSelectedPolicy(policy);
    setFormData({
      customer: policy.customer || '',
      email: policy.email || '',
      phone: policy.phone || '',
      startDate: policy.startDate || '',
      endDate: policy.expiry || '',
      planId: policy.planId || '',
      type: policy.type || '',
      provider: policy.provider || '',
      name: policy.name || '',
      premium: policy.premium || '',
      nomineeName: policy.nomineeName || '',
      nomineeRelation: policy.nomineeRelation || '',
      status: policy.status || 'ACTIVE',
      customCoverage: policy.customCoverage || [],
      customBenefits: policy.customBenefits || []
    });
    setIsModalOpen(true);
  };

  const handleUpdatePolicy = () => {
    const updatedPolicies = policies.map((p: any) => 
      p.id === selectedPolicy.id ? { 
        ...p, 
        expiry: formData.endDate,
        customCoverage: formData.customCoverage,
        customBenefits: formData.customBenefits
      } : p
    );
    setPolicies(updatedPolicies);
    setIsModalOpen(false);
  };

  const toggleListItem = (item: string, field: 'customCoverage' | 'customBenefits') => {
    const current = formData[field];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };



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
          <button onClick={() => handleEdit(row)} className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-all"><Edit3 className="w-4 h-4" /></button>
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

      {/* Edit Modal kept simple for now */}
      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Policy Records"
        size="lg"
      >
        <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* Policy Hero Section - View Style */}
          <div className="bg-[#0F172A] rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                <Heart className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">{selectedPolicy?.name}</h2>
                <p className="text-slate-400 font-bold text-[10px] flex items-center gap-2 uppercase tracking-widest mt-1">
                  <Shield className="w-3 h-3" /> {selectedPolicy?.id} • Global Servicing
                </p>
              </div>
            </div>
          </div>

          {/* Customer Profile - Read Only */}
          <section className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-teal-600" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Customer Profile</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                <p className="text-xs font-bold text-slate-700">{selectedPolicy?.customer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
                <p className="text-xs font-bold text-slate-700">{selectedPolicy?.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nominee</p>
                <p className="text-xs font-bold text-slate-700">{selectedPolicy?.nomineeName} ({selectedPolicy?.nomineeRelation})</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 space-y-8">
              {/* Coverage Editing */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-teal-600">
                  <LayoutGrid className="w-4 h-4" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Manage Coverage</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {PLAN_CATALOG.find(p => p.type === selectedPolicy?.type)?.coverage.map(c => (
                    <label key={c} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all cursor-pointer group">
                      <span className="text-xs font-bold text-slate-600 group-hover:text-teal-900 transition-colors">{c}</span>
                      <div className="relative">
                        <input 
                          type="checkbox"
                          checked={formData.customCoverage.includes(c)}
                          onChange={() => toggleListItem(c, 'customCoverage')}
                          className="w-5 h-5 appearance-none border-2 border-slate-200 rounded-lg checked:bg-teal-500 checked:border-teal-500 transition-all cursor-pointer"
                        />
                        {formData.customCoverage.includes(c) && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white stroke-[4]" />}
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Benefits Editing */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Activity className="w-4 h-4" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Plan Benefits</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PLAN_CATALOG.find(p => p.type === selectedPolicy?.type)?.benefits.map(b => (
                    <button 
                      key={b}
                      onClick={() => toggleListItem(b, 'customBenefits')}
                      className={cn(
                        "px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border",
                        formData.customBenefits.includes(b) 
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-blue-200"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="col-span-5 space-y-6">
              {/* Expiry Editing */}
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-orange-600 pb-3 border-b border-slate-50">
                  <Clock className="w-4 h-4" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Policy Period</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Start Date</span>
                    <span className="text-xs font-black text-slate-900">{selectedPolicy?.startDate}</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">New Expiry Date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-orange-500 transition-all shadow-inner"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Premium</span>
                    <span className="text-xs font-black text-teal-600">{selectedPolicy?.premium}</span>
                  </div>
                </div>
              </section>

              {/* Status Display */}
              <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Current Status</span>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-400">{selectedPolicy?.status}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex-grow py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdatePolicy}
              className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Updated Records
            </button>
          </div>
        </div>
      </PlatformModal>
    </div>
  );
};

export default AdminPolicies;
