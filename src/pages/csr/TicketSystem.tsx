
import React, { useState } from 'react';
import { 
   
  Reply, Paperclip
} from 'lucide-react';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { PlatformModal } from '../../components/platform/PlatformModal';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const TicketSystem: React.FC = () => {
  const { data, updateData } = usePlatform();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const columns = [
    { 
      header: 'Ticket ID', 
      accessor: 'ticketId',
      render: (val: string) => <span className="font-black text-slate-900">{val}</span>
    },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Subject', accessor: 'subject' },
    { 
      header: 'Priority', 
      accessor: 'priority',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-max",
          val === 'High' ? "bg-red-50 text-red-600 border-red-100" :
          val === 'Medium' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-blue-50 text-blue-600 border-blue-100"
        )}>
          {val === 'High' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
          {val}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          val === 'Open' ? "bg-blue-50 text-blue-600 border-blue-100" :
          val === 'In Progress' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
        )}>
          {val}
        </span>
      )
    }
  ];

  const handleUpdateStatus = (status: string) => {
    const updated = data.tickets.map(t => t.id === selectedTicket.id ? { ...t, status } : t);
    updateData('tickets', updated);
    setSelectedTicket({ ...selectedTicket, status });
  };

  const handleReply = () => {
    if (!replyText) return;
    alert(`Reply sent to ${selectedTicket.customerName}`);
    setReplyText('');
    if (selectedTicket.status === 'Open') handleUpdateStatus('In Progress');
  };

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="Support Ticket System" 
        description="Manage customer inquiries, resolve issues, and ensure SLAs are met for all support requests."
      />

      <PlatformTable 
        title="Support Inbox"
        columns={columns}
        data={data.tickets}
        onEdit={(ticket) => setSelectedTicket(ticket)}
        filterKey="status"
        filterOptions={['Open', 'In Progress', 'Resolved', 'Closed']}
      />

      <PlatformModal 
        isOpen={!!selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
        title={`Ticket ${selectedTicket?.ticketId}`}
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-6">
             <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h3 className="text-xl font-black text-slate-900">{selectedTicket.subject}</h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">From: {selectedTicket.customerName} &middot; {selectedTicket.date}</p>
                   </div>
                   <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                      selectedTicket.priority === 'High' ? "bg-red-50 text-red-600 border-red-100" :
                      selectedTicket.priority === 'Medium' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-blue-50 text-blue-600 border-blue-100"
                   )}>
                      {selectedTicket.priority} Priority
                   </span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                   <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      "Hello, I haven't received my physical policy document yet. It's been over two weeks since I paid the premium. Please look into this urgently."
                   </p>
                </div>
             </div>

             <div className="flex flex-wrap gap-3">
                <p className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Update Status</p>
                {['Open', 'In Progress', 'Resolved'].map(status => (
                   <button
                      key={status}
                      onClick={() => handleUpdateStatus(status)}
                      className={cn(
                         "px-5 py-2 rounded-xl text-xs font-bold transition-all border",
                         selectedTicket.status === status 
                           ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                           : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                      )}
                   >
                      {status}
                   </button>
                ))}
             </div>

             <div className="border-t border-slate-100 pt-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <Reply className="w-4 h-4 text-teal-600" /> Send Reply
                </h4>
                <div className="relative">
                   <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response to the customer..."
                      className="w-full h-32 bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 resize-none transition-all shadow-sm"
                   />
                   <button className="absolute bottom-4 left-4 p-2 text-slate-400 hover:text-teal-600 bg-slate-50 rounded-lg transition-all">
                      <Paperclip className="w-4 h-4" />
                   </button>
                   <button 
                      onClick={handleReply}
                      className="absolute bottom-4 right-4 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20"
                   >
                      Send Message
                   </button>
                </div>
             </div>
          </div>
        )}
      </PlatformModal>
    </div>
  );
};

export default TicketSystem;
