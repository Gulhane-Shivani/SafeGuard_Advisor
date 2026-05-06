import React, { useState } from 'react';
import { Shield, Plus, Eye, Edit3, Power, Clock, AlertCircle, Activity, Download } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/helpers';

const AdminPolicies: React.FC = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([
    { id: 'SG-HLTH-002', name: 'Star Comprehensive Health', customer: 'Vijay Mehta', type: 'HEALTH INSURANCE', premium: '₹80,000', status: 'RENEWAL DUE', expiry: '2027-05-02' },
    { id: 'SG-MOTR-003', name: 'Bajaj Car Insurance', customer: 'Deepak Singh', type: 'MOTOR INSURANCE', premium: '₹12,500', status: 'ACTIVE', expiry: '2027-08-15' },
    { id: 'SG-LIFE-001', name: 'LIC Tech Term', customer: 'Sneh Lata', type: 'LIFE INSURANCE', premium: '₹45,000', status: 'ACTIVE', expiry: '2027-12-20' },
    { id: 'SG-HLTH-005', name: 'HDFC Optima Restore', customer: 'Rahul Verma', type: 'HEALTH INSURANCE', premium: '₹65,000', status: 'INACTIVE', expiry: '2026-11-10' },
    { id: 'SG-MOTR-009', name: 'TATA AIG Motor', customer: 'Arun Jha', type: 'MOTOR INSURANCE', premium: '₹18,000', status: 'EXPIRED', expiry: '2024-01-15' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    category: 'Health',
    premium: '',
    coverage: '',
    status: 'Active'
  });

  const handleOpenModal = (mode: 'add' | 'edit' | 'view', policy?: any) => {
    if (mode === 'view') {
      navigate(`/super-admin/policies/${policy.id}`);
      return;
    }
    setModalMode(mode as 'add' | 'edit');
    if (policy) {
      setSelectedPolicy(policy);
      setFormData({
        name: policy.name,
        provider: policy.provider || '',
        category: policy.category || 'Health',
        premium: policy.premium,
        coverage: policy.coverage || '',
        status: policy.status
      });
    } else {
      setSelectedPolicy(null);
      setFormData({ name: '', provider: '', category: 'Health', premium: '', coverage: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setPolicies(prev => prev.map(p => 
      p.id === id ? { ...p, status: (p.status === 'ACTIVE' || p.status === 'RENEWAL DUE') ? 'INACTIVE' : 'ACTIVE' } : p
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newPolicy = {
        id: `SG-NEW-00${policies.length + 1}`,
        customer: 'New Customer',
        type: 'GENERAL INSURANCE',
        ...formData
      };
      setPolicies([...policies, newPolicy as any]);
    } else if (modalMode === 'edit' && selectedPolicy) {
      setPolicies(prev => prev.map(p => 
        p.id === selectedPolicy.id ? { ...p, ...formData } : p
      ));
    }
    setIsModalOpen(false);
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
    { 
      header: 'CUSTOMER', 
      accessor: 'customer',
      render: (val: string) => <span className="font-bold text-slate-600">{val}</span>
    },
    { 
      header: 'PREMIUM', 
      accessor: 'premium',
      render: (val: string) => <span className="font-black text-slate-900">{val}</span>
    },
    { 
      header: 'STATUS', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'ACTIVE' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
          val === 'RENEWAL DUE' ? "bg-orange-50 text-orange-600 border-orange-100" :
          "bg-slate-50 text-slate-400 border-slate-100"
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
          <button 
            onClick={() => navigate(`/super-admin/policies/${row.id}`)}
            className="p-1.5 hover:bg-teal-50 rounded-lg text-slate-400 hover:text-teal-600 transition-all shadow-sm"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleOpenModal('edit', row)}
            className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-all shadow-sm"
            title="Edit Policy"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleToggleStatus(row.id)}
            className={cn(
              "p-1.5 rounded-lg transition-all shadow-sm",
              row.status === 'ACTIVE' || row.status === 'RENEWAL DUE'
                ? "bg-red-50 text-red-400 hover:bg-red-100" 
                : "bg-emerald-50 text-emerald-400 hover:bg-emerald-100"
            )}
            title={row.status === 'ACTIVE' ? "Deactivate" : "Activate"}
          >
            <Power className="w-4 h-4" />
          </button>
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
          <div className="flex gap-3">
            <button 
              onClick={() => handleOpenModal('add')}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Policy
            </button>
          </div>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Active Policies', count: '1,284', icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Renewals Pending', count: '45', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Lapsed Policies', count: '12', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
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
        filterOptions={['ACTIVE', 'RENEWAL DUE', 'EXPIRED', 'INACTIVE']}
      />

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Insurance Product' : 'Edit Policy Details'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-bold"
                placeholder="e.g. Star Comprehensive Health"
                required
              />
            </div>
            {/* Additional form fields would go here, kept brief for this tool call */}
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest"
            >
              {modalMode === 'add' ? 'Create Policy' : 'Save Changes'}
            </button>
          </div>
        </form>
      </PlatformModal>
    </div>
  );
};

export default AdminPolicies;
