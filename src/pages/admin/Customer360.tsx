
import React, { useState } from 'react';
import { 
  Shield, FileText, 
  PhoneCall, Mail, 
  AlertCircle
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const Customer360: React.FC = () => {
  const { data } = usePlatform();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('policies');

  const getCustomerDetails = (policy: any) => {
    // In a real app, we'd have a separate customers array. Here we derive from policies for demo.
    return {
      name: policy.customerName,
      email: `${policy.customerName.toLowerCase().replace(' ', '.')}@email.com`,
      phone: '+1 234-567-8900',
      address: '123 Main St, New York, NY 10001',
      dob: '1985-06-15',
      policies: data.policies.filter(p => p.customerName === policy.customerName),
      claims: data.claims.filter(c => c.customerName === policy.customerName) };
  };

  const columns = [
    { 
      header: 'Customer Name', 
      accessor: 'customerName',
      render: (val: string) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500">
            {val.charAt(0)}
          </div>
          <span className="font-black text-slate-900 text-sm">{val}</span>
        </div>
      )
    },
    { 
      header: 'Active Policies', 
      accessor: 'policies',
      render: (_val: any, row: any) => {
        const count = data.policies.filter(p => p.customerName === row.customerName).length;
        return <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{count}</span>;
      }
    },
    { 
      header: 'Total Value', 
      accessor: 'value',
      render: () => <span className="font-bold text-teal-600">$4,500</span>
    },
  ];

  // Get unique customers from policies
  const uniqueCustomers = Array.from(new Set(data.policies.map(p => p.customerName)))
    .map(name => data.policies.find(p => p.customerName === name));

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Customer 360° View" 
        description="Comprehensive customer profiles including policy history, claims, and interaction logs."
      />

      <PlatformTable 
        title="Customer Database"
        columns={columns}
        data={uniqueCustomers}
        onEdit={(row) => setSelectedCustomer(getCustomerDetails(row))}
        searchPlaceholder="Search by name, email, or policy..."
      />

      <PlatformModal 
        isOpen={!!selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
        title={`Customer Profile: ${selectedCustomer?.name}`}
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-8">
            {/* Header Info */}
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-3xl font-black border border-white/10">
                     {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                     <h2 className="text-2xl font-black mb-1">{selectedCustomer.name}</h2>
                     <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {selectedCustomer.email}</span>
                        <span className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5" /> {selectedCustomer.phone}</span>
                     </div>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10">
                     <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10">
                     <PhoneCall className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl w-fit">
               {[
                 { id: 'policies', label: 'Policies' },
                 { id: 'claims', label: 'Claims' },
                 { id: 'interactions', label: 'Interactions' }
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                     "px-6 py-2 rounded-xl text-xs font-bold transition-all",
                     activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                   )}
                 >
                   {tab.label}
                 </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {activeTab === 'policies' && (
                  <div className="space-y-4">
                     {selectedCustomer.policies.map((p: any) => (
                        <div key={p.id} className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-teal-200 transition-all">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                 <Shield className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="font-black text-slate-900">{p.policyNumber}</p>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase">{p.type}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-black text-slate-900">{p.premium}</p>
                              <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1", p.status === 'Active' ? 'text-emerald-600' : 'text-orange-600')}>{p.status}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               )}

               {activeTab === 'claims' && (
                  <div className="space-y-4">
                     {selectedCustomer.claims.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                           <Shield className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                           <p className="text-sm font-bold text-slate-500">No claims filed yet.</p>
                        </div>
                     ) : (
                        selectedCustomer.claims.map((c: any) => (
                           <div key={c.id} className="p-6 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <FileText className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-900">{c.claimNumber}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">{c.date}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-black text-slate-900">{c.amount}</p>
                                 <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">{c.status}</p>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               )}

               {activeTab === 'interactions' && (
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                     {[
                        { type: 'Call', desc: 'Discussed renewal options', date: '2 days ago', icon: PhoneCall, color: 'bg-blue-500' },
                        { type: 'Email', desc: 'Sent policy documents', date: '1 week ago', icon: Mail, color: 'bg-teal-500' },
                        { type: 'System', desc: 'Premium payment received', date: '1 month ago', icon: AlertCircle, color: 'bg-emerald-500' },
                     ].map((int, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                           <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                              <int.icon className="w-4 h-4" />
                           </div>
                           <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                              <div className="flex justify-between items-center mb-1">
                                 <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white", int.color)}>{int.type}</span>
                                 <span className="text-[10px] font-bold text-slate-400">{int.date}</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900 mt-2">{int.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default Customer360;
