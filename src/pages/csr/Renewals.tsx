
import React from 'react';
import { Mail, AlertCircle, Shield } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';

const Renewals: React.FC = () => {
  const { data } = usePlatform();
  
  // Filter for policies that are due for renewal soon
  const renewalPolicies = data.policies.filter(p => p.status === 'Renewal Due');

  const columns = [
    { 
      header: 'Customer', 
      accessor: 'customerName',
      render: (val: string) => <span className="text-sm font-black text-slate-900">{val}</span>
    },
    { 
      header: 'Policy Details', 
      accessor: 'policyNumber',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.type}</p>
        </div>
      )
    },
    { header: 'Expiry Date', accessor: 'endDate' },
    { 
      header: 'Renewal Premium', 
      accessor: 'premium',
      render: (val: string) => <span className="font-bold text-teal-600">{val}</span>
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Renewal Retention Desk" 
        description="Follow up with customers whose policies are expiring to ensure high retention rates."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
               <AlertCircle className="w-8 h-8" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-orange-900 mb-1">{renewalPolicies.length} Policies at Risk</h3>
               <p className="text-sm font-medium text-orange-800">Expiring within the next 30 days. Immediate follow-up required.</p>
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
               <Shield className="w-8 h-8" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 mb-1">84% Retention Rate</h3>
               <p className="text-sm font-medium text-slate-500">Current MTD retention performance. Target is 90%.</p>
            </div>
         </div>
      </div>

      <PlatformTable 
        title="Upcoming Renewals"
        columns={columns}
        data={renewalPolicies}
        actions={
           <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Send Bulk Reminders
           </button>
        }
        onEdit={(policy) => alert(`Initiating renewal call for ${policy.customerName}...`)}
      />
    </div>
  );
};

export default Renewals;
