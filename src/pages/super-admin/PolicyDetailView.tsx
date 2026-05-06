import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, CheckCircle2, Download, CreditCard, 
  User, Calendar, Heart, LayoutGrid, Briefcase,
  ArrowLeft, Mail, Phone, MapPin, ExternalLink
} from 'lucide-react';
import { cn } from '../../utils/helpers';

export const PolicyDetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data fetching based on ID
  const policy = {
    id: id || 'SG-HLTH-002',
    name: 'Star Comprehensive Health',
    customer: 'Vijay Mehta',
    email: 'vijay.mehta@example.com',
    phone: '+91 98765 43210',
    address: 'Sector 42, Gurgaon, Haryana - 122001',
    type: 'HEALTH INSURANCE',
    premium: '₹80,000',
    status: 'RENEWAL DUE',
    expiry: '05 Aug 2024'
  };

  const isExpired = policy.status?.toUpperCase() === 'EXPIRED' || policy.status?.toUpperCase() === 'INACTIVE' || policy.status?.toUpperCase() === 'RENEWAL DUE';
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      {/* Compact Back Button & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/super-admin/policies')}
          className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-teal-600 hover:border-teal-100 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Policy Insights</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Portfolio / {policy.id}</p>
        </div>
      </div>

      {/* Slimmer Header Card */}
      <div className="bg-[#0F172A] rounded-[1.5rem] p-6 text-white flex items-center justify-between shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-black tracking-tight">{policy.name}</h2>
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                isExpired 
                  ? "bg-orange-500/10 text-orange-400 border-orange-500/30" 
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              )}>
                {policy.status}
              </span>
            </div>
            <p className="text-slate-400 font-bold text-xs">{policy.id} • Star Health Insurance</p>
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (Customer & Coverage) */}
        <div className="col-span-2 space-y-6">
          {/* Customer Details Card (New Section) */}
          <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#0F172A]">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black">Customer Information</h3>
              </div>
             
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                <p className="text-sm font-black text-slate-900">{policy.customer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-300" /> {policy.email}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-300" /> {policy.phone}
                </p>
              </div>
              <div className="col-span-3 pt-3 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered Address</p>
                <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" /> {policy.address}
                </p>
              </div>
            </div>
          </section>

          {/* Coverage Details (Smaller) */}
          <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-[#0F172A]">
              <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black">Coverage Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Hospitalization', 'Day Care Procedures', 'Pre/Post Hospitalization', 'Organ Donor Support'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-sm transition-all group">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits & History (Combined/Smaller) */}
          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0F172A]">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-black uppercase tracking-widest">Key Benefits</h3>
              </div>
              <ul className="space-y-3">
                {['Cashless treatment', 'No claim bonus', 'Restore benefit'].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0F172A]">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm font-black uppercase tracking-widest">Recent Payment</h3>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-sm font-black text-slate-900">₹80,000</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">05 Aug 2024 • UPI PAY</p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column (Sidebar Cards - Smaller) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-[0.2em]">Policy Period</h4>
            <div className="space-y-3">
              {[
                { label: 'Start Date', value: '05 Aug 2023' },
                { label: 'End Date', value: '05 Aug 2024' },
                { label: 'Premium', value: policy.premium },
                { label: 'Due Date', value: '05 Aug 2025' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.label}</span>
                  <span className="text-xs font-black text-[#0F172A]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F0FDFD] p-6 rounded-[1.5rem] border border-teal-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-teal-900">
              <User className="w-4 h-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Active Nominee</h4>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm font-black text-xs">SK</div>
              <div>
                <p className="text-sm font-black text-[#0F172A]">Sneha Kumar</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spouse</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};
