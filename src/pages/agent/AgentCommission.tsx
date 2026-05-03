
import React from 'react';
import { IndianRupee, TrendingUp, Download } from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const AgentCommission: React.FC = () => {
  const { data } = usePlatform();
  const agentName = 'John Agent';
  const myCommissions = data.commissions.filter(c => c.agentName === agentName);

  const columns = [
    { 
      header: 'Payout Amount', 
      accessor: 'amount',
      render: (val: string) => <span className="text-lg font-black text-slate-900">{val}</span>
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

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Commission Statement" 
        description="Track your earnings, view upcoming payouts, and download detailed statements for tax purposes."
        actions={
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Statement
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-teal-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-teal-600/20 relative overflow-hidden group">
            <div className="relative z-10">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <IndianRupee className="w-8 h-8" />
               </div>
               <p className="text-xs font-black text-teal-200 uppercase tracking-widest mb-1">Total Earnings (YTD)</p>
               <p className="text-5xl font-black">$4,250</p>
               <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl text-sm font-bold border border-white/10">
                  <TrendingUp className="w-4 h-4" /> +15% from last year
               </div>
            </div>
            <IndianRupee className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
         </div>

         <div className="grid grid-rows-2 gap-6">
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
               <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center shrink-0">
                  <Clock className="w-8 h-8" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Payout</p>
                  <p className="text-3xl font-black text-slate-900">$280</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">Expected on May 15, 2024</p>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
               <div>
                  <h3 className="font-bold text-slate-900">Current Tier: Gold</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">15% commission on base premium</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
                     $1,200 to Platinum
                  </p>
               </div>
            </div>
         </div>
      </div>

      <PlatformTable 
        title="Transaction Ledger"
        columns={columns}
        data={myCommissions}
      />
    </div>
  );
};

// Simple Clock icon component since it wasn't imported from lucide-react directly in the file start
const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default AgentCommission;
