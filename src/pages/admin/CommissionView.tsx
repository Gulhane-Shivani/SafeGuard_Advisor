import React from 'react';
import { IndianRupee, Download, CheckCircle2, Clock } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const CommissionView: React.FC = () => {
  const { data } = usePlatform();

  const columns = [
    { header: 'Agent Name', accessor: 'agentName' },
    { 
      header: 'Payout Amount', 
      accessor: 'amount',
      render: (val: string) => <span className="text-sm font-black text-slate-900">{val}</span>
    },
    { header: 'Processing Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleExportLedger = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('SafeGuard Advisor - Commission Payout Ledger', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = data.commissions.map(c => [
      c.agentName,
      c.amount,
      c.date,
      c.status
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Agent Name', 'Payout Amount', 'Processing Date', 'Status']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [20, 158, 136] },
      styles: { fontSize: 10 }
    });

    doc.save(`Commission_Ledger_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Commission Payouts" 
        description="Review and authorize commission payments for all active agents based on policy sales."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-teal-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-teal-600/20">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <IndianRupee className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-teal-200 uppercase tracking-widest mb-1">Total Paid (YTD)</p>
            <p className="text-3xl font-black">₹{
              data.commissions
                .filter(c => c.status === 'Paid')
                .reduce((sum, c) => sum + (parseInt(c.amount.replace(/[^0-9]/g, '')) || 0), 0)
                .toLocaleString('en-IN')
            }</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
               <Clock className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Approval</p>
            <p className="text-3xl font-black text-slate-900">₹{
               data.commissions
               .filter(c => c.status === 'Pending')
               .reduce((sum, c) => sum + (parseInt(c.amount.replace(/[^0-9]/g, '')) || 0), 0)
               .toLocaleString('en-IN')
            }</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Processing</p>
            <p className="text-xl font-black text-slate-900 mt-2">May 15, 2024</p>
         </div>
      </div>

      <PlatformTable 
        title="Payout History"
        columns={columns}
        data={data.commissions}
        filterKey="status"
        filterOptions={['Paid', 'Pending']}
        actions={
           <button 
            onClick={handleExportLedger}
            className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2"
          >
              <Download className="w-3.5 h-3.5" /> Export Ledger
           </button>
        }
      />
    </div>
  );
};

export default CommissionView;
