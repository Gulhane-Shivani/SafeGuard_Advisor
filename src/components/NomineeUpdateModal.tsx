import React, { useState } from 'react';
import { X, Heart, Users, Calendar, Save, ShieldCheck } from 'lucide-react';

interface NomineeUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: any) => void;
  currentData: any;
}

export const NomineeUpdateModal: React.FC<NomineeUpdateModalProps> = ({ isOpen, onClose, onSubmit, currentData }) => {
  const [formData, setFormData] = useState({
    name: currentData.name || '',
    relation: currentData.relation || '',
    dob: currentData.dob || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-purple-600 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Update Nominee Details</h2>
              <p className="text-purple-100 text-xs">Ensure your policy benefits reach your loved ones.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nominee Full Name</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Sneha Kumar"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Relation</label>
              <select
                value={formData.relation}
                onChange={e => setFormData({ ...formData, relation: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Select Relation</option>
                {['Spouse', 'Son', 'Daughter', 'Mother', 'Father', 'Brother', 'Sister'].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="DD Mon YYYY"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-2xl flex items-start gap-3 border border-purple-100">
            <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-purple-700 font-medium leading-relaxed">
              Nominee details are critical for claim settlements. Please verify that the name matches official government identification documents.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-sm hover:bg-purple-700 shadow-xl shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Nominee Details
          </button>
        </form>
      </div>
    </div>
  );
};
