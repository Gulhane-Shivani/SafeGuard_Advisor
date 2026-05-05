
import React, { useState } from 'react';
import { 
  FileText, Shield, AlertCircle, 
  Upload, ExternalLink
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const ClaimsSupport: React.FC = () => {
  const { data, updateData } = usePlatform();
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  const columns = [
    { 
      header: 'Claim Details', 
      accessor: 'claimNumber',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.type}</p>
        </div>
      )
    },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Policy #', accessor: 'policyNumber' },
    { 
      header: 'Claim Amount', 
      accessor: 'amount',
      render: (val: string) => <span className="text-sm font-black text-slate-900">{val}</span>
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Pending' ? "bg-orange-50 text-orange-600 border-orange-100" :
          val === 'Under Review' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleUpdateStatus = (status: string) => {
    const updated = data.claims.map(c => c.id === selectedClaim.id ? { ...c, status } : c);
    updateData('claims', updated);
    setSelectedClaim({ ...selectedClaim, status });
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Claims Support Desk" 
        description="Process customer claims, verify documentation, and provide status updates to policyholders."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Pending Processing', value: data.claims.filter(c => c.status === 'Pending').length, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Under Review', value: data.claims.filter(c => c.status === 'Under Review').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Settled Today', value: '2', color: 'text-emerald-600', bg: 'bg-emerald-50' },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black", stat.bg, stat.color)}>
                  <FileText className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
               </div>
            </div>
         ))}
      </div>

      <PlatformTable 
        title="Active Claims Queue"
        columns={columns}
        data={data.claims.filter(c => c.status !== 'Settled')}
        onEdit={(claim) => setSelectedClaim(claim)}
        filterKey="status"
        filterOptions={['Pending', 'Under Review', 'Approved', 'Rejected']}
      />

      <PlatformModal 
        isOpen={!!selectedClaim} 
        onClose={() => setSelectedClaim(null)} 
        title="Claim Processing Workspace"
        size="lg"
      >
        {selectedClaim && (
          <div className="space-y-8">
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className={cn(
                         "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                         selectedClaim.status === 'Pending' ? "bg-orange-100 text-orange-700 border-orange-200" :
                         selectedClaim.status === 'Under Review' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"
                      )}>
                         {selectedClaim.status}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Filed: {selectedClaim.date}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900">{selectedClaim.claimNumber}</h3>
                   <p className="text-sm font-medium text-slate-600 mt-1">Customer: <strong className="text-slate-900">{selectedClaim.customerName}</strong> &middot; Policy: {selectedClaim.policyNumber}</p>
                </div>
                <div className="text-left md:text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Claim Amount</p>
                   <p className="text-3xl font-black text-slate-900">{selectedClaim.amount}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-600" /> Update Status
                   </h4>
                   <div className="grid grid-cols-1 gap-3">
                      {['Pending', 'Under Review', 'Approved', 'Rejected'].map(status => (
                         <button
                            key={status}
                            onClick={() => handleUpdateStatus(status)}
                            className={cn(
                               "px-5 py-3 rounded-xl text-xs font-bold transition-all border text-left",
                               selectedClaim.status === status 
                                 ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10" 
                                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                            )}
                         >
                            Mark as {status}
                         </button>
                      ))}
                   </div>
                   
                   <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3 mt-6">
                      <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
                         Changing status to 'Approved' or 'Rejected' will automatically send an email notification to the customer.
                      </p>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" /> Required Documents
                   </h4>
                   <div className="space-y-3">
                      {[
                         { name: 'Claim Form', status: 'Verified' },
                         { name: 'Medical Reports', status: 'Pending Review' },
                         { name: 'Identity Proof', status: 'Verified' },
                      ].map((doc, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-teal-200 transition-all group">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                               <FileText className="w-3.5 h-3.5 text-slate-400" /> {doc.name}
                            </span>
                            <div className="flex items-center gap-3">
                               <span className={cn(
                                  "text-[9px] font-black uppercase tracking-widest",
                                  doc.status === 'Verified' ? "text-emerald-600" : "text-orange-600"
                               )}>
                                  {doc.status}
                               </span>
                               <button className="text-teal-600 opacity-0 group-hover:opacity-100 transition-all">
                                  <ExternalLink className="w-3.5 h-3.5" />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                   
                   <button className="w-full py-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" /> Request Additional Document
                   </button>
                </div>
             </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default ClaimsSupport;
