
import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Shield, Clock } from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const Reports: React.FC = () => {
  const { data } = usePlatform();
  const [reportType, setReportType] = useState('sales');

  const salesColumns = [
    { header: 'Policy #', accessor: 'policyNumber' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Type', accessor: 'type' },
    { header: 'Premium', accessor: 'premium' },
    { header: 'Date', accessor: 'startDate' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const claimColumns = [
    { header: 'Claim #', accessor: 'claimNumber' },
    { header: 'Policy #', accessor: 'policyNumber' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Pending' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-blue-50 text-blue-600 border-blue-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleExport = () => {
    let exportData: any[] = [];
    if (reportType === 'sales') {
      exportData = data.policies;
    } else if (reportType === 'claims') {
      exportData = data.claims;
    } else if (reportType === 'renewals') {
      exportData = data.policies.filter((p: any) => p.status === 'Renewal Due');
    }

    if (exportData.length === 0) return;

    const headers = Object.keys(exportData[0]).join(',');
    const rows = exportData.map(row => 
      Object.values(row).map(val => `"${val}"`).join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safeguard_${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Enterprise Reporting" 
        description="Generate and export comprehensive data reports for audit, business analysis, and regulatory compliance."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { id: 'sales', title: 'Sales Performance', icon: TrendingUp, desc: 'Detailed breakdown of policies issued, premiums collected and trends.' },
          { id: 'renewals', title: 'Renewal Analytics', icon: Clock, desc: 'Track upcoming renewals, retention rates and lapse statistics.' },
          { id: 'claims', title: 'Claims Settlement', icon: Shield, desc: 'Monitor claim ratios, settlement times and outstanding liabilities.' },
        ].map((card) => (
          <button
            key={card.id}
            onClick={() => setReportType(card.id)}
            className={cn(
              "p-8 rounded-[2.5rem] border text-left transition-all relative overflow-hidden group",
              reportType === card.id 
                ? "bg-slate-900 text-white border-slate-900 shadow-2xl" 
                : "bg-white text-slate-900 border-slate-100 hover:border-teal-200"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
              reportType === card.id ? "bg-teal-500 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600"
            )}>
              <card.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">{card.title}</h3>
            <p className={cn("text-xs font-medium mt-1 leading-relaxed", reportType === card.id ? "text-slate-400" : "text-slate-500")}>{card.desc}</p>
            {reportType === card.id && (
              <div className="absolute top-8 right-8">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_#14b8a6]" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                 {['Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(f => (
                    <button key={f} className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight text-slate-400 hover:text-slate-900 transition-colors">{f}</button>
                 ))}
              </div>
           </div>
           <button 
             onClick={handleExport}
             className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all flex items-center gap-2 shadow-xl shadow-teal-600/20"
           >
             <Download className="w-4 h-4" /> Export to CSV
           </button>
        </div>

        {reportType === 'sales' && (
          <PlatformTable 
            title="Sales Transaction Report"
            columns={salesColumns}
            data={data.policies}
          />
        )}

        {reportType === 'claims' && (
          <PlatformTable 
            title="Claims Processing Report"
            columns={claimColumns}
            data={data.claims}
          />
        )}

        {reportType === 'renewals' && (
          <PlatformTable 
            title="Renewal Pipeline"
            columns={salesColumns}
            data={data.policies.filter(p => p.status === 'Renewal Due')}
          />
        )}
      </div>
    </div>
  );
};

// Need this for the icon mapping
const TrendingUp = ({ className }: { className?: string }) => <BarChart3 className={className} />;

export default Reports;
