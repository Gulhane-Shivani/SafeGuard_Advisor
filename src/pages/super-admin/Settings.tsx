
import React, { useState } from 'react';
import { Shield, Landmark, Plus, Percent, Mail, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const MasterSettings: React.FC = () => {
  const { data } = usePlatform();
  const [activeTab, setActiveTab] = useState('products');

  const productColumns = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'Insurer', accessor: 'insurer' },
    { header: 'Category', accessor: 'category' },
    { header: 'Base Premium', accessor: 'premium' },
    { 
      header: 'Commission', 
      accessor: 'commission',
      render: (val: string) => (
        <span className="flex items-center gap-1 text-teal-600 font-black">
          <Percent className="w-3 h-3" /> {val}
        </span>
      )
    }
  ];

  const insurerColumns = [
    { header: 'Insurer Name', accessor: 'name' },
    { header: 'Partner Since', accessor: 'since' },
    { header: 'Active Policies', accessor: 'policies' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
          {val}
        </span>
      )
    }
  ];

  const insurersData = [
    { name: 'SafeGuard Life', since: '2021', policies: 1240, status: 'Active' },
    { name: 'Global Health Corp', since: '2022', policies: 850, status: 'Active' },
    { name: 'Prime Motor Insure', since: '2023', policies: 420, status: 'Active' },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Master Configuration" 
        description="Configure insurance products, partner insurers, commission structures, and global system communication templates."
      />

      <div className="flex flex-wrap gap-4 p-2 bg-white border border-slate-100 rounded-3xl w-fit shadow-sm">
        {[
          { id: 'products', label: 'Insurance Products', icon: Shield },
          { id: 'insurers', label: 'Partner Insurers', icon: Landmark },
          { id: 'commission', label: 'Commission Matrix', icon: Percent },
          { id: 'templates', label: 'Comm. Templates', icon: Mail },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all",
              activeTab === tab.id
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'products' && (
          <PlatformTable 
            title="Product Catalogue"
            description="Manage available insurance plans and their base rates"
            columns={productColumns}
            data={data.products}
            onEdit={() => {}}
            actions={
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
            }
          />
        )}

        {activeTab === 'insurers' && (
          <PlatformTable 
            title="Insurance Partners"
            description="Manage relationships with underwriting companies"
            columns={insurerColumns}
            data={insurersData}
            onEdit={() => {}}
            actions={
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" /> Add Partner
              </button>
            }
          />
        )}

        {activeTab === 'commission' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
             <div>
                <h3 className="text-xl font-bold text-slate-900">Commission Structure Matrix</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Define payouts for agents and distributors across product lines.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {['Life Insurance', 'Health Insurance', 'Motor Insurance', 'General Insurance'].map((cat) => (
                   <div key={cat} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-sm font-black text-slate-900">{cat}</span>
                         <button className="text-teal-600 text-[10px] font-black uppercase tracking-widest hover:underline">Edit Matrix</button>
                      </div>
                      <div className="space-y-3">
                         {[
                            { role: 'Senior Agent', rate: '18%' },
                            { role: 'Junior Agent', rate: '12%' },
                            { role: 'Referral Partner', rate: '5%' },
                         ].map((row) => (
                            <div key={row.role} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                               <span className="text-xs font-bold text-slate-600">{row.role}</span>
                               <span className="text-xs font-black text-teal-600">{row.rate}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'templates' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                 { title: 'Welcome Email', channel: 'Email', icon: Mail },
                 { title: 'Renewal Reminder', channel: 'SMS', icon: MessageSquare },
                 { title: 'Policy Issued', channel: 'WhatsApp', icon: MessageSquare },
                 { title: 'Claim Status Update', channel: 'Email', icon: Mail },
              ].map((temp) => (
                 <div key={temp.title} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:border-teal-200 transition-all">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                          <temp.icon className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">{temp.channel}</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">{temp.title}</h4>
                       <p className="text-xs text-slate-500 font-medium mt-1">Automatic notification sent to customers upon trigger.</p>
                    </div>
                    <button className="mt-2 py-3 bg-slate-50 text-slate-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Edit Template Content</button>
                 </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default MasterSettings;
