import React, { useState } from 'react';
import { FileText, Upload, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { cn } from '../utils/helpers';
import { AuthModal } from '../components/layout/AuthModal';

const CLAIMS = [
  { id: 'CLM-20241024', type: 'Health',  status: 'In Review', date: '24 Oct 2024', amount: '28,500',  provider: 'Apollo Hospitals, Mumbai',       insurer: 'Star Health Insurance' },
  { id: 'CLM-20240915', type: 'Motor',   status: 'Approved',  date: '15 Sep 2024', amount: '45,000',  provider: 'Bajaj Auto Works, Pune',         insurer: 'Bajaj Allianz'         },
  { id: 'CLM-20240802', type: 'Health',  status: 'Paid',      date: '02 Aug 2024', amount: '6,200',   provider: 'Fortis Hospital, Bangalore',     insurer: 'Niva Bupa'             },
];

const STATUS_STEPS = [
  { title: 'Claim Registered',   date: '24 Oct, 10:30 AM', status: 'done' },
  { title: 'Documents Verified', date: '24 Oct, 02:15 PM', status: 'done' },
  { title: 'Medical Review In-Progress', date: 'Processing...', status: 'loading' },
  { title: 'Final Approval',       date: 'Pending',           status: 'pending' },
];

export const Claims: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleServiceClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Claims Support</h1>
            <p className="text-slate-500">Track your active claims and upload necessary documents</p>
          </div>
          <button 
            onClick={handleServiceClick}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all text-sm"
          >
            <Upload className="w-5 h-5" /> File New Claim
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Claims List + Upload */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100">
                {['active', 'past'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-8 py-5 text-sm font-bold capitalize transition-all relative",
                      activeTab === tab ? "text-teal-600" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab === 'active' ? 'Active Claims' : 'Past Claims'}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-100">
                {CLAIMS.map(claim => (
                  <div key={claim.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                          claim.status === 'Approved' || claim.status === 'Paid'
                            ? "bg-teal-50 text-teal-600"
                            : "bg-blue-50 text-blue-600"
                        )}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{claim.id}</span>
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              claim.status === 'Approved' ? "bg-teal-100 text-teal-700" :
                              claim.status === 'Paid'     ? "bg-slate-100 text-slate-600" :
                                                            "bg-blue-100 text-blue-700"
                            )}>
                              {claim.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{claim.type} &middot; {claim.insurer}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{claim.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-8">
                        <div className="text-right">
                          <div className="font-bold text-slate-900">&#8377;{claim.amount}</div>
                          <div className="text-xs text-slate-400 font-medium">{claim.date}</div>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-teal-600 transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div 
              onClick={handleServiceClick}
              className="bg-teal-50 rounded-3xl border-2 border-dashed border-teal-200 p-10 text-center group hover:border-teal-400 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Your Documents</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                Drag and drop hospital bills, prescriptions, discharge summaries, FIR copies, or any other claim-related documents.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {['Hospital Bill', 'Prescription', 'Discharge Summary', 'FIR Copy', 'Repair Estimate'].map(d => (
                  <span key={d} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-teal-700 border border-teal-100">{d}</span>
                ))}
              </div>
              <button className="px-6 py-2.5 bg-white border border-teal-200 text-teal-600 rounded-xl font-bold text-sm hover:bg-teal-100 transition-all">
                Select Files
              </button>
            </div>
          </div>

          {/* Right — Timeline + Tip */}
          <div className="space-y-8">

            {/* Status Timeline */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Clock className="w-5 h-5 text-teal-600" /> Claim Status (CLM-20241024)
              </h3>
              <div className="relative space-y-7 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {STATUS_STEPS.map((step, i) => (
                  <div key={i} className="relative pl-10">
                    <div className={cn(
                      "absolute left-0 w-7 h-7 rounded-full border-4 border-white flex items-center justify-center shadow-sm shrink-0",
                      step.status === 'done'    ? "bg-teal-500 text-white" :
                      step.status === 'loading' ? "bg-blue-500 text-white animate-pulse" :
                                                  "bg-slate-200 text-slate-400"
                    )}>
                      {step.status === 'done'    ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                       step.status === 'loading' ? <Clock className="w-3.5 h-3.5" /> :
                                                   <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div className={cn("text-sm font-bold", step.status === 'pending' ? "text-slate-400" : "text-slate-800")}>{step.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{step.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20">
              <div className="flex items-center gap-2 text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-4">
                <AlertCircle className="w-4 h-4" /> Pro Tip
              </div>
              <h3 className="text-lg font-bold mb-3">Use Cashless Claims</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Cashless facilities at network hospitals process claims 40% faster. Remember to fill out the insurer's pre-authorisation form before admission.
              </p>
            </div>

            {/* IRDAI helpline */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">IRDAI Grievance Helpline</h4>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">If your insurer rejects a genuine claim, file a complaint with IRDAI:</p>
              <div className="flex flex-col gap-3 text-sm font-bold text-teal-700">
                <span className="flex items-center gap-2">&#128222; 155255 (Toll Free)</span>
                <span className="flex items-center gap-2">&#127760; igms.irda.gov.in</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};
