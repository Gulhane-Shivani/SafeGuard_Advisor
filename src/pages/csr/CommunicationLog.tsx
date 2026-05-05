
import React from 'react';
import { PhoneCall, Mail, MessageSquare, AlertCircle, Clock } from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';

const CommunicationLog: React.FC = () => {
  const { data } = usePlatform();

  // Mapping generic activity logs to communication logs for demo
  const commLogs = data.activityLogs.map(log => ({
    id: log.id,
    customer: log.action.split(': ')[1] || 'Unknown',
    type: log.action.includes('Called') ? 'Phone' : log.action.includes('Email') ? 'Email' : 'System',
    agent: log.user,
    time: log.time,
    notes: log.action
  }));

  const columns = [
    { 
      header: 'Communication Type', 
      accessor: 'type',
      render: (val: string) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            val === 'Phone' ? 'bg-blue-50 text-blue-600' : 
            val === 'Email' ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {val === 'Phone' ? <PhoneCall className="w-4 h-4" /> : 
             val === 'Email' ? <Mail className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          </div>
          <span className="font-bold text-slate-900 text-sm">{val}</span>
        </div>
      )
    },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Representative', accessor: 'agent' },
    { header: 'Notes', accessor: 'notes' },
    { 
      header: 'Time', 
      accessor: 'time',
      render: (val: string) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-300" /> {val}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Communication Logs" 
        description="Audit trail of all customer interactions across phone, email, and support tickets."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <PhoneCall className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Total Calls (Today)</p>
            <p className="text-4xl font-black">42</p>
         </div>
         <div className="bg-teal-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-teal-600/20">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <Mail className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-teal-200 uppercase tracking-widest mb-1">Emails Sent (Today)</p>
            <p className="text-4xl font-black">128</p>
         </div>
         <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
               <MessageSquare className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Response Time</p>
            <p className="text-4xl font-black">1.2h</p>
         </div>
      </div>

      <PlatformTable 
        title="Interaction History"
        columns={columns}
        data={commLogs}
        filterKey="type"
        filterOptions={['Phone', 'Email', 'System']}
      />
    </div>
  );
};

export default CommunicationLog;
