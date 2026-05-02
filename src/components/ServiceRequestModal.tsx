import React, { useState } from 'react';
import { X, ClipboardList, FileText, Send, Info } from 'lucide-react';
import { cn } from '../utils/helpers';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requestData: any) => void;
  initialType?: string;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ isOpen, onClose, onSubmit, initialType }) => {
  const [formData, setFormData] = useState({
    type: initialType || 'Address Change',
    description: '',
    priority: 'Medium'
  });

  // Update type if initialType changes
  React.useEffect(() => {
    if (initialType) setFormData(prev => ({ ...prev, type: initialType }));
  }, [initialType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      ticket_id: `SR-${Math.floor(1000 + Math.random() * 9000)}`,
      type: formData.type,
      subject: formData.type, // UI uses subject or type
      description: formData.description,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'In Progress',
      priority: formData.priority
    });
    
    setFormData({
      type: initialType || 'Address Change',
      description: '',
      priority: 'Medium'
    });
    onClose();
  };

  const REQUEST_TYPES = [
    'Address Change', 'Nominee Change', 'Duplicate ID Card',
    'Bank Account Update', 'Policy Copy', 'Other',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-teal-600 p-8 text-white">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Raise a Request</h2>
              <p className="text-teal-100 text-sm">Submit a new service request for your policy.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Request Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
            >
              {REQUEST_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Priority Level</label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p })}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all",
                    formData.priority === p 
                      ? "bg-teal-50 border-teal-500 text-teal-700" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Request Details</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Describe your request in detail. For example: 'Moving to new apartment in Bangalore, please update address to...'"
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-2xl flex items-start gap-3 border border-teal-100">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-teal-700 font-medium leading-relaxed">
              Requests are usually processed within 24-48 working hours. You can track the status of your request in the 'My Requests' section.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};
