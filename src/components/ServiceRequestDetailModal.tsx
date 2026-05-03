import React from 'react';
import { X, ClipboardList, Info, Calendar, Tag, FileText } from 'lucide-react';


interface ServiceRequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
}

export const ServiceRequestDetailModal: React.FC<ServiceRequestDetailModalProps> = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-teal-600 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Request Details</h2>
              <p className="text-teal-100 text-xs">#{request.ticket_id || request.id}</p>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3" /> Type
              </p>
              <p className="text-sm font-bold text-slate-900">{request.type || request.subject}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 justify-end">
                <Calendar className="w-3 h-3" /> Submitted On
              </p>
              <p className="text-sm font-bold text-slate-900">{request.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-3 h-3" /> Description
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{request.description || 'No description provided.'}"
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</p>
            <div className="flex items-center justify-between p-4 bg-teal-50 rounded-2xl border border-teal-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span className="text-sm font-bold text-teal-700">{request.status}</span>
              </div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Processing</span>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl flex items-start gap-3 border border-orange-100">
            <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-orange-700 font-medium leading-relaxed">
              Your request is currently being assigned to a service officer. We will notify you via email once the status changes to 'Completed'.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
