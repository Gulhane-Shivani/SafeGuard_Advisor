
import React, { useState } from 'react';
import { Mail, AlertCircle, Shield, CheckCircle, Clock } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const Renewals: React.FC = () => {
  const { data, updateData } = usePlatform();
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkSent, setBulkSent] = useState(false);
  
  // Filter for policies that are due for renewal soon
  const renewalPolicies = data.policies.filter(p => p.status === 'Renewal Due' || p.status === 'Reminder Sent');

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
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Renewal Due' ? "bg-orange-50 text-orange-600 border-orange-100" :
          val === 'Reminder Sent' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleSendBulkReminders = () => {
    const updated = data.policies.map(p => 
      p.status === 'Renewal Due' ? { ...p, status: 'Reminder Sent' } : p
    );
    updateData('policies', updated);
    setBulkSent(true);
    setTimeout(() => {
      setIsBulkModalOpen(false);
      setBulkSent(false);
    }, 2000);
  };

  const handleUpdateStatus = (status: string) => {
    const updated = data.policies.map(p => p.id === selectedPolicy.id ? { ...p, status } : p);
    updateData('policies', updated);
    setSelectedPolicy({ ...selectedPolicy, status });
  };

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
               <h3 className="text-2xl font-black text-orange-900 mb-1">{renewalPolicies.filter(p => p.status === 'Renewal Due').length} Policies at Risk</h3>
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
           <button 
              onClick={() => setIsBulkModalOpen(true)}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
           >
              <Mail className="w-3.5 h-3.5" /> Send Bulk Reminders
           </button>
        }
        onEdit={(policy) => setSelectedPolicy(policy)}
        filterKey="status"
        filterOptions={['Renewal Due', 'Reminder Sent', 'Renewed', 'Lapsed']}
      />

      {/* Bulk Send Modal */}
      <PlatformModal
        isOpen={isBulkModalOpen}
        onClose={() => !bulkSent && setIsBulkModalOpen(false)}
        title="Send Bulk Reminders"
        size="md"
      >
        <div className="space-y-6">
          {!bulkSent ? (
            <>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-4">
                 <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <Mail className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-slate-900">Confirm Bulk Action</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      You are about to send automated renewal reminders to <strong>{renewalPolicies.filter(p => p.status === 'Renewal Due').length}</strong> customers.
                    </p>
                 </div>
              </div>
              <div className="flex justify-end gap-3">
                 <button 
                    onClick={() => setIsBulkModalOpen(false)}
                    className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:border-slate-400 transition-all"
                 >
                    Cancel
                 </button>
                 <button 
                    onClick={handleSendBulkReminders}
                    className="px-5 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2"
                 >
                    Confirm & Send
                 </button>
              </div>
            </>
          ) : (
            <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center gap-4 py-12">
               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-emerald-900">Reminders Sent!</h3>
               <p className="text-sm font-medium text-emerald-700">All pending customers have been notified successfully.</p>
            </div>
          )}
        </div>
      </PlatformModal>

      {/* Edit Policy Modal */}
      <PlatformModal
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title="Manage Policy Renewal"
        size="lg"
      >
        {selectedPolicy && (
          <div className="space-y-8">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                         "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                         selectedPolicy.status === 'Renewal Due' ? "bg-orange-100 text-orange-700 border-orange-200" :
                         selectedPolicy.status === 'Reminder Sent' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
                      )}>
                         {selectedPolicy.status}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Expiring: {selectedPolicy.endDate}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900">{selectedPolicy.policyNumber}</h3>
                   <p className="text-sm font-medium text-slate-600 mt-1">Customer: <strong className="text-slate-900">{selectedPolicy.customerName}</strong> &middot; Type: {selectedPolicy.type}</p>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Renewal Premium</p>
                   <p className="text-3xl font-black text-slate-900">{selectedPolicy.premium}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600" /> Action Required
                   </h4>
                   <div className="grid grid-cols-1 gap-3">
                      {['Renewal Due', 'Reminder Sent', 'Renewed', 'Lapsed'].map(status => (
                         <button
                            key={status}
                            onClick={() => handleUpdateStatus(status)}
                            className={cn(
                               "px-5 py-3 rounded-xl text-xs font-bold transition-all border text-left",
                               selectedPolicy.status === status 
                                 ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10" 
                                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                            )}
                         >
                            Mark as {status}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-teal-600" /> Communication Log
                   </h4>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                               <Mail className="w-4 h-4" />
                            </div>
                            <div>
                               <p className="text-xs font-bold text-slate-900">Initial Notice Sent</p>
                               <p className="text-[10px] text-slate-500 font-medium mt-0.5">Automated System Email</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">30 Days Ago</span>
                      </div>
                   </div>
                   <button 
                     onClick={() => {
                        handleUpdateStatus('Reminder Sent');
                        alert(`Manual reminder dispatched to ${selectedPolicy.customerName}`);
                     }}
                     className="w-full py-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                   >
                      <Mail className="w-4 h-4" /> Send Manual Reminder
                   </button>
                </div>
             </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default Renewals;
