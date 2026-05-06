import React from 'react';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, XCircle, Filter, Download } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { cn } from '../../utils/helpers';

const AdminPayments: React.FC = () => {
  const payments = [
    { id: 'TXN-90821', customer: 'Rahul Sharma', amount: '₹7,999', date: '05 May 2026, 14:30', method: 'UPI', status: 'Completed', type: 'Policy Renewal' },
    { id: 'TXN-90822', customer: 'Priya Patel', amount: '₹12,499', date: '04 May 2026, 11:20', method: 'Credit Card', status: 'Processing', type: 'New Policy' },
    { id: 'TXN-90823', customer: 'Amit Kumar', amount: '₹4,599', date: '04 May 2026, 09:15', method: 'Net Banking', status: 'Failed', type: 'Policy Renewal' },
    { id: 'TXN-90824', customer: 'Sneh Lata', amount: '₹11,000', date: '03 May 2026, 16:45', method: 'UPI', status: 'Completed', type: 'Policy Renewal' },
    { id: 'TXN-90825', customer: 'Vikram Singh', amount: '₹2,500', date: '03 May 2026, 12:00', method: 'Debit Card', status: 'Completed', type: 'Endorsement' },
  ];

  const columns = [
    { 
      header: 'Transaction ID', 
      accessor: 'id',
      render: (val: string) => <span className="font-mono text-xs font-bold text-slate-500">{val}</span>
    },
    { header: 'Customer', accessor: 'customer' },
    { 
      header: 'Amount', 
      accessor: 'amount',
      render: (val: string) => <span className="font-black text-slate-900">{val}</span>
    },
    { 
      header: 'Date & Time', 
      accessor: 'date',
      render: (val: string) => <span className="text-[11px] font-bold text-slate-400">{val}</span>
    },
    { 
      header: 'Method', 
      accessor: 'method',
      render: (val: string) => (
        <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
          {val}
        </span>
      )
    },
    { 
      header: 'Type', 
      accessor: 'type',
      render: (val: string) => (
        <span className="text-[11px] font-bold text-slate-600">{val}</span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "flex items-center gap-1.5 font-black text-[10px] uppercase tracking-wider",
          val === 'Completed' ? "text-emerald-600" :
          val === 'Failed' ? "text-red-600" :
          "text-orange-600"
        )}>
          {val === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
           val === 'Failed' ? <XCircle className="w-3.5 h-3.5" /> : 
           <ArrowDownLeft className="w-3.5 h-3.5 animate-pulse" />}
          {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Payment History & Transactions"
        description="View and manage all financial transactions across the platform."
        actions={
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter History
            </button>
          </div>
        }
      />

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <p className="text-teal-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Total Revenue (This Month)</p>
          <div className="flex items-end gap-4">
            <h2 className="text-5xl font-black tracking-tight">₹45,82,900</h2>
            <span className="mb-2 flex items-center gap-1 text-emerald-400 font-bold text-sm bg-emerald-400/10 px-3 py-1 rounded-full">
              <ArrowUpRight className="w-4 h-4" /> +12.5%
            </span>
          </div>
        </div>
      </div>

      <PlatformTable
        title="Recent Transactions"
        description="Live feed of all policy-related payments and renewals."
        columns={columns}
        data={payments}
      />
    </div>
  );
};

export default AdminPayments;
