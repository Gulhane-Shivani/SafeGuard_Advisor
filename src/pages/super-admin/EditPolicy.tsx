import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, Clock, Activity, Check, LayoutGrid, Heart, User, 
  ArrowLeft, IndianRupee, Save, X
} from 'lucide-react';
import { cn } from '../../utils/helpers';

const PLAN_CATALOG = [
  { id: 'p1', name: 'Star Comprehensive Health', type: 'HEALTH INSURANCE', provider: 'Star Health', premium: '₹80,000', coverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment', 'Pre-Post Hospitalization'], benefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup', 'Restore Sum Insured'] },
  { id: 'p2', name: 'LIC Tech Term', type: 'LIFE INSURANCE', provider: 'LIC of India', premium: '₹45,000', coverage: ['Death Benefit', 'Critical Illness Cover', 'Terminal Illness', 'Accidental Death'], benefits: ['Tax Savings U/S 80C', 'Accidental Death Rider', 'Flexible Payouts', 'Level Premium'] },
  { id: 'p3', name: 'Bajaj Car Insurance', type: 'MOTOR INSURANCE', provider: 'Bajaj Allianz', premium: '₹12,500', coverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire', 'Natural Calamities'], benefits: ['Zero Depreciation', 'Roadside Assistance', 'Engine Protector', 'Consumables Cover'] },
];

const getAutoStatus = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  if (expiry < today) return 'EXPIRED';
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  if (expiry <= thirtyDaysFromNow) return 'RENEWAL DUE';
  return 'ACTIVE';
};

export const EditPolicy: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [policies, setPolicies] = useState<any[]>(() => {
    const saved = localStorage.getItem('safeguard_policies');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const policy = policies.find((p: any) => p.id === id);
    if (policy) {
      setFormData({
        ...policy,
        endDate: policy.expiry || '',
        customCoverage: policy.customCoverage || [],
        customBenefits: policy.customBenefits || []
      });
    }
  }, [id, policies]);

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center animate-pulse">
          <Shield className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Policy Data...</p>
        </div>
      </div>
    );
  }

  const handleUpdatePolicy = () => {
    const updatedPolicies = policies.map((p: any) => 
      p.id === id ? { 
        ...formData, 
        expiry: formData.endDate,
        status: getAutoStatus(formData.endDate)
      } : p
    );
    localStorage.setItem('safeguard_policies', JSON.stringify(updatedPolicies));
    setPolicies(updatedPolicies);
    navigate(`/super-admin/policies/${id}`);
  };

  const toggleListItem = (item: string, field: 'customCoverage' | 'customBenefits') => {
    const current = formData[field] || [];
    if (current.includes(item)) {
      setFormData({ ...formData, [field]: current.filter((i: string) => i !== item) });
    } else {
      setFormData({ ...formData, [field]: [...current, item] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Policy Records</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modification Desk / {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Discard
          </button>
          <button 
            onClick={handleUpdatePolicy}
            className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          {/* Hero Identity */}
          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner">
                <Heart className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-1">{formData.name}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-teal-400 font-bold text-xs flex items-center gap-1.5 bg-teal-400/10 px-3 py-1 rounded-full border border-teal-400/20">
                    <Shield className="w-3.5 h-3.5" /> {formData.id}
                  </span>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{formData.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-slate-900 pb-4 border-b border-slate-100">
              <LayoutGrid className="w-5 h-5 text-teal-600" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Manage Coverage Scope</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {PLAN_CATALOG.find(p => p.type === formData.type)?.coverage.map(c => (
                <label 
                  key={c} 
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group",
                    formData.customCoverage.includes(c) 
                      ? "bg-teal-50/50 border-teal-200" 
                      : "bg-white border-slate-100 hover:border-teal-100"
                  )}
                >
                  <span className={cn(
                    "text-sm font-bold transition-colors",
                    formData.customCoverage.includes(c) ? "text-teal-900" : "text-slate-500"
                  )}>{c}</span>
                  <div className="relative">
                    <input 
                      type="checkbox"
                      checked={formData.customCoverage.includes(c)}
                      onChange={() => toggleListItem(c, 'customCoverage')}
                      className="w-6 h-6 appearance-none border-2 border-slate-200 rounded-lg checked:bg-teal-600 checked:border-teal-600 transition-all cursor-pointer shadow-sm"
                    />
                    {formData.customCoverage.includes(c) && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white stroke-[4]" />}
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 text-slate-900 pb-4 border-b border-slate-100">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Modify Plan Benefits</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {PLAN_CATALOG.find(p => p.type === formData.type)?.benefits.map(b => (
                <button 
                  key={b}
                  onClick={() => toggleListItem(b, 'customBenefits')}
                  className={cn(
                    "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-tight transition-all border",
                    formData.customBenefits.includes(b) 
                      ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20" 
                      : "bg-white border-slate-100 text-slate-400 hover:border-blue-200"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-8">
          {/* Financials & Dates Card */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 sticky top-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-orange-600 border-b border-slate-50 pb-4">
                <Clock className="w-5 h-5" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Policy Period & Premium</h4>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Premium Amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.premium}
                      onChange={e => setFormData({ ...formData, premium: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3.5 text-sm font-black text-teal-600 outline-none focus:border-orange-500 transition-all shadow-inner"
                      placeholder="₹00,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inception Date</p>
                    <p className="text-sm font-black text-slate-900">{formData.startDate}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modified Expiry Date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-orange-500 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Read-only Customer Info */}
            <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-5">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-teal-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Beneficiary Details</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]">Primary Customer</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{formData.customer}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em]">Nominee Linked</p>
                  <p className="text-xs font-black text-slate-700 mt-0.5">{formData.nomineeName} ({formData.nomineeRelation})</p>
                </div>
              </div>
            </div>

            {/* Auto Status Badge */}
            <div className="p-5 bg-slate-900 rounded-[2rem] flex items-center justify-between shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full animate-pulse",
                  getAutoStatus(formData.endDate) === 'ACTIVE' ? "bg-emerald-500" :
                  getAutoStatus(formData.endDate) === 'RENEWAL DUE' ? "bg-orange-500" : "bg-red-500"
                )} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Status</span>
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                getAutoStatus(formData.endDate) === 'ACTIVE' ? "text-emerald-400" :
                getAutoStatus(formData.endDate) === 'RENEWAL DUE' ? "text-orange-400" : "text-red-400"
              )}>
                {getAutoStatus(formData.endDate)}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
