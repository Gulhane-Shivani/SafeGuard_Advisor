import React from 'react';
import { Shield, Search, Filter, Download, Plus } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';

const AdminPolicies: React.FC = () => {
  const policies = [
    { id: 'POL-001', name: 'Star Comprehensive Health', provider: 'Star Health', category: 'Health', premium: '₹799/mo', coverage: '₹5,00,000', status: 'Active' },
    { id: 'POL-002', name: 'LIC Tech Term Plan', provider: 'LIC of India', category: 'Life', premium: '₹1,199/mo', coverage: '₹1,00,00,000', status: 'Active' },
    { id: 'POL-003', name: 'Bajaj Allianz Car Insurance', provider: 'Bajaj Allianz', category: 'Motor', premium: '₹499/mo', coverage: 'Market Value', status: 'Active' },
    { id: 'POL-004', name: 'HDFC ERGO Optima Restore', provider: 'HDFC ERGO', category: 'Health', premium: '₹1,250/mo', coverage: '₹10,00,000', status: 'Active' },
    { id: 'POL-005', name: 'ICICI Pru iProtect Smart', provider: 'ICICI Prudential', category: 'Life', premium: '₹999/mo', coverage: '₹50,00,000', status: 'Active' },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Policy Product', 
      accessor: 'name',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
            <Shield className="w-4 h-4 text-teal-600" />
          </div>
          <span className="font-bold text-slate-900">{val}</span>
        </div>
      )
    },
    { header: 'Provider', accessor: 'provider' },
    { 
      header: 'Category', 
      accessor: 'category',
      render: (val: string) => (
        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase tracking-wider">
          {val}
        </span>
      )
    },
    { header: 'Premium', accessor: 'premium' },
    { header: 'Max Coverage', accessor: 'coverage' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className="text-emerald-600 font-bold text-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Insurance Product Catalog"
        description="Manage and monitor all available insurance products listed on the platform."
        actions={
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Catalog
            </button>
            <button className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>
        }
      />

      <PlatformTable
        title="Active Policy Products"
        description="Comprehensive list of all insurance plans currently offered to customers."
        columns={columns}
        data={policies}
      />
    </div>
  );
};

export default AdminPolicies;
