import React, { useState } from 'react';
import { 
  CheckSquare, XCircle, CheckCircle2, 
  Clock, AlertCircle, IndianRupee
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { cn } from '../../utils/helpers';

const Approvals: React.FC = () => {
  const [approvals, setApprovals] = useState([
    { id: 1, type: 'Quote Discount', agent: 'John Agent', customer: 'Emma Wilson', amount: '₹1,20,000', reqDiscount: '15%', status: 'Pending', time: '2 hours ago', date: '2024-05-04' },
    { id: 2, type: 'High Value Policy', agent: 'Sarah Admin', customer: 'David Jones', amount: '₹15,00,000', reqDiscount: 'None', status: 'Pending', time: '5 hours ago', date: '2024-05-04' },
    { id: 3, type: 'Claim Exception', agent: 'Mike CSR', customer: 'Alice Johnson', amount: '₹5,00,000', reqDiscount: 'N/A', status: 'Pending', time: '1 day ago', date: '2024-05-03' },
  ]);

  const handleAction = (id: number, action: 'Approve' | 'Reject') => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: action + 'd' } : a));
  };

  const activeRequests = approvals.filter(a => a.status === 'Pending');
  const history = approvals.filter(a => a.status !== 'Pending');

  const historyColumns = [
    { header: 'Request Type', accessor: 'type', render: (val: string) => <span className="font-bold text-slate-700">{val}</span> },
    { header: 'Agent', accessor: 'agent' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount', render: (val: string) => <span className="font-black text-slate-900">{val}</span> },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {val}
        </span>
      )
    },
    { header: 'Processed On', accessor: 'date' }
  ];

  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Managerial Approvals" 
        description="Review and authorize special requests, exceptional discounts, and high-value policy issuances."
      />

      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
           <Clock className="w-4 h-4 text-orange-500" /> Active Requests ({activeRequests.length})
        </h3>
        {activeRequests.length === 0 ? (
          <div className="p-12 bg-white rounded-[2rem] border border-slate-100 text-center">
            <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No pending approvals at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activeRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between transition-all group hover:border-teal-200">
                <div className="flex items-start gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                      req.type.includes('Discount') ? "bg-orange-50 text-orange-600" :
                      req.type.includes('Claim') ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {req.type.includes('Discount') ? <IndianRupee className="w-6 h-6" /> :
                        req.type.includes('Claim') ? <AlertCircle className="w-6 h-6" /> : <CheckSquare className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                            {req.type}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {req.time}
                          </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-1">Request from {req.agent}</h3>
                      <p className="text-sm font-medium text-slate-500">Customer: {req.customer} &middot; Base Amount: {req.amount}</p>
                      {req.reqDiscount !== 'None' && req.reqDiscount !== 'N/A' && (
                          <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100 text-xs text-orange-800 font-bold">
                            Requested Special Discount: {req.reqDiscount}
                          </div>
                      )}
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                    <button 
                      onClick={() => handleAction(req.id, 'Reject')}
                      className="w-full sm:w-auto px-6 py-3 bg-white text-red-600 border border-red-100 rounded-xl font-bold text-xs hover:bg-red-50 transition-all flex justify-center items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button 
                      onClick={() => handleAction(req.id, 'Approve')}
                      className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all flex justify-center items-center gap-2 shadow-xl shadow-teal-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-100">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500" /> Approval History
           </h3>
           <PlatformTable 
             columns={historyColumns}
             data={history}
             filterKey="status"
             filterOptions={['Approved', 'Rejected']}
             searchPlaceholder="Search history by customer or agent..."
           />
        </div>
      )}
    </div>
  );
};

export default Approvals;
