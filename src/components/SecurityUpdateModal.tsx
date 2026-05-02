import React, { useState } from 'react';
import { X, Shield, Lock, Smartphone, Key, Save, CheckCircle2 } from 'lucide-react';

interface SecurityUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'Change Password' | 'Set Security PIN' | 'Two-Factor Auth' | null;
}

export const SecurityUpdateModal: React.FC<SecurityUpdateModalProps> = ({ isOpen, onClose, type }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    pin: '',
    otp: ''
  });

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Success step
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2000);
  };

  const renderForm = () => {
    switch (type) {
      case 'Change Password':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Current Password</label>
              <input type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-slate-500/20 transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">New Password</label>
              <input type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-slate-500/20 transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Confirm New Password</label>
              <input type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-slate-500/20 transition-all" />
            </div>
          </div>
        );
      case 'Set Security PIN':
        return (
          <div className="space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed">Create a 6-digit PIN for quick access to your policy details and document vault.</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <input key={i} type="password" maxLength={1} className="w-12 h-12 text-center bg-slate-50 border border-slate-200 rounded-xl font-bold text-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20" />
              ))}
            </div>
          </div>
        );
      case 'Two-Factor Auth':
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-100">
              <Smartphone className="w-6 h-6 text-teal-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-teal-900">SMS Verification</p>
                <p className="text-xs text-teal-700">Receive a secure code on +91 ******3210 for every login.</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Enter OTP to Enable</label>
              <input type="text" placeholder="Enter 6-digit code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500/20 transition-all text-center tracking-widest" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              {type === 'Change Password' ? <Key className="w-6 h-6" /> : 
               type === 'Set Security PIN' ? <Lock className="w-6 h-6" /> : 
               <Smartphone className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">{type}</h2>
              <p className="text-slate-400 text-xs">Secure your account with multi-layered protection.</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderForm()}
              <button
                type="submit"
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Security Settings
              </button>
            </form>
          ) : (
            <div className="text-center py-10 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Security Updated</h3>
              <p className="text-slate-500 text-sm mt-2">Your {type} has been successfully configured.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
