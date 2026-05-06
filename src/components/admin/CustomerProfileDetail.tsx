import React from 'react';
import { User, Landmark, Shield, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface CustomerProfileDetailProps {
  user: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address?: string;
    dob?: string;
    status?: string;
  };
  nominee?: {
    name: string;
    relation: string;
    dob: string;
  };
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    ifsc: string;
  };
  showBankDetails?: boolean;
}

export const CustomerProfileDetail: React.FC<CustomerProfileDetailProps> = ({ 
  user, 
  nominee = { name: 'Karan Mehta', relation: 'Son', dob: '12 May 2005' },
  bankDetails = { bankName: 'HDFC Bank', accountNumber: 'XXXX XXXX 8922', accountName: 'Vijay Mehta', ifsc: 'HDFC0001234' },
  showBankDetails = true
}) => {
  return (
    <div className="space-y-8">
      {/* Profile Hero */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="w-20 h-20 rounded-2xl bg-teal-500 flex items-center justify-center text-3xl font-black shrink-0 shadow-lg shadow-teal-500/20">
          {user.avatar || user.name.split(' ').map((n: any) => n[0]).join('')}
        </div>
        <div className="relative z-10 text-center sm:text-left">
          <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <p className="text-slate-400 text-sm flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {user.email}</p>
            <p className="text-slate-400 text-sm flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {user.phone}</p>
          </div>
          <span className="inline-block mt-4 text-[9px] px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 font-black uppercase tracking-widest border border-teal-500/30">
            {user.status || 'Active'} Customer
          </span>
        </div>
      </div>

      <div className={cn("grid grid-cols-1 gap-8", showBankDetails ? "md:grid-cols-2" : "md:grid-cols-1")}>
        {/* Personal Info */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" /> Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Full Name', value: user.name, icon: User },
              { label: 'Date of Birth', value: user.dob || '15 Aug 1985', icon: Calendar },
              { label: 'Primary Contact', value: user.phone, icon: Phone },
              { label: 'Email Address', value: user.email, icon: Mail },
            ].map(row => (
              <div key={row.label} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                  <row.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{row.label}</p>
                  <p className="text-sm font-black text-slate-900">{row.value}</p>
                </div>
              </div>
            ))}
            <div className="sm:col-span-2 flex items-start gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-100 mt-1">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Residential Address</p>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">{user.address || 'Sector 42, Golf Course Road, Gurgaon, Haryana - 122001'}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          {/* Nominee */}
          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" /> Nominee Information
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <div>
                    <p className="text-sm font-black text-purple-900">{nominee.name}</p>
                    <p className="text-[10px] font-bold text-purple-400 uppercase">{nominee.relation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-purple-900 uppercase">DOB</p>
                    <p className="text-[10px] font-bold text-purple-400">{nominee.dob}</p>
                  </div>
               </div>
            </div>
          </section>

          {/* Bank Details - Conditional */}
          {showBankDetails && (
            <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                <Landmark className="w-4 h-4 text-blue-600" /> Banking Portfolio
              </h3>
              <div className="p-4 bg-slate-900 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Linked Savings Account</p>
                 <h4 className="text-lg font-black text-white mb-1 tracking-wider">{bankDetails.accountNumber}</h4>
                 <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Account Holder</p>
                      <p className="text-[10px] font-black text-white uppercase">{bankDetails.accountName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-teal-400 uppercase">{bankDetails.bankName}</p>
                      <p className="text-[9px] font-bold text-slate-500">{bankDetails.ifsc}</p>
                    </div>
                 </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
