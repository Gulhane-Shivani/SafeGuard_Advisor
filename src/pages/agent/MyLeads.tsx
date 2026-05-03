
import React, { useState } from 'react';
import { 
  Phone, Mail, FileText, 
  Calendar, MessageSquare,
  AlertCircle
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const MyLeads: React.FC = () => {
  const { data, updateData } = usePlatform();
  const agentId = 2; // Assuming logged in as John Agent
  const myLeads = data.leads.filter(l => l.assignedTo === agentId);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [note, setNote] = useState('');

  const columns = [
    { 
      header: 'Prospect', 
      accessor: 'name',
      render: (val: string, row: any) => (
        <div>
          <p className="text-sm font-black text-slate-900">{val}</p>
          <div className="flex items-center gap-2 mt-0.5">
             <span className="text-[10px] text-slate-500 font-bold">{row.phone}</span>
             <span className="text-[10px] text-slate-300">&bull;</span>
             <span className="text-[10px] text-slate-500 font-bold">{row.email}</span>
          </div>
        </div>
      )
    },
    { header: 'Interest', accessor: 'type' },
    { header: 'Source', accessor: 'source' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Hot' ? "bg-orange-50 text-orange-600 border-orange-100" :
          val === 'Warm' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleUpdateStatus = (status: string) => {
    const updated = data.leads.map(l => l.id === selectedLead.id ? { ...l, status } : l);
    updateData('leads', updated);
    setSelectedLead({ ...selectedLead, status });
  };

  const handleAddNote = () => {
    if (!note) return;
    alert(`Note added: "${note}"`);
    setNote('');
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="My Leads Pipeline" 
        description="Manage your assigned prospects, update statuses, and log interactions to drive conversions."
        actions={
           <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Sync Calendar
           </button>
        }
      />

      <PlatformTable 
        title="Assigned Prospects"
        columns={columns}
        data={myLeads}
        onEdit={(lead) => setSelectedLead(lead)}
      />

      <PlatformModal 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        title="Lead Details & Actions"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-8">
             <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-grow space-y-6">
                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-slate-400 shadow-sm shrink-0 text-xl">
                         {selectedLead.name.charAt(0)}
                      </div>
                      <div className="w-full">
                         <div className="flex justify-between items-start">
                            <div>
                               <h3 className="text-xl font-black text-slate-900">{selectedLead.name}</h3>
                               <p className="text-xs font-bold text-slate-500 mt-1">{selectedLead.email} &middot; {selectedLead.phone}</p>
                            </div>
                            <span className={cn(
                               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                               selectedLead.status === 'Hot' ? "bg-orange-50 text-orange-600 border-orange-100" :
                               selectedLead.status === 'Warm' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
                            )}>
                               {selectedLead.status}
                            </span>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Interested In</p>
                               <p className="text-sm font-bold text-slate-900">{selectedLead.type}</p>
                            </div>
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Source</p>
                               <p className="text-sm font-bold text-slate-900">{selectedLead.source}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="text-sm font-bold text-slate-900">Change Status</h4>
                      <div className="flex flex-wrap gap-3">
                         {['Hot', 'Warm', 'Cold', 'Closed'].map(status => (
                            <button
                               key={status}
                               onClick={() => handleUpdateStatus(status)}
                               className={cn(
                                  "px-5 py-2 rounded-xl text-xs font-bold transition-all border",
                                  selectedLead.status === status 
                                    ? "bg-slate-900 text-white border-slate-900" 
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                               )}
                            >
                               {status}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                         <MessageSquare className="w-4 h-4 text-teal-600" /> Add Follow-up Note
                      </h4>
                      <textarea 
                         value={note}
                         onChange={(e) => setNote(e.target.value)}
                         placeholder="Log details from your call or meeting..."
                         className="w-full h-24 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 resize-none transition-all"
                      />
                      <div className="flex justify-end">
                         <button onClick={handleAddNote} className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20">
                            Save Note
                         </button>
                      </div>
                   </div>
                </div>

                <div className="md:w-64 shrink-0 space-y-4">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2">Quick Actions</h4>
                   {[
                      { label: 'Call Lead', icon: Phone, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
                      { label: 'Send Email', icon: Mail, color: 'text-teal-600 bg-teal-50 hover:bg-teal-100' },
                      { label: 'Generate Quote', icon: FileText, color: 'text-orange-600 bg-orange-50 hover:bg-orange-100' },
                      { label: 'Schedule Meeting', icon: Calendar, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
                   ].map(action => (
                      <button key={action.label} className={cn("w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-xs", action.color)}>
                         <action.icon className="w-4 h-4" /> {action.label}
                      </button>
                   ))}
                   
                   <div className="mt-8 p-4 bg-slate-900 text-white rounded-2xl flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-medium leading-relaxed">
                         Lead SLA: This lead was assigned {selectedLead.createdAt}. You have 24 hours to make first contact.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default MyLeads;
