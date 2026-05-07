import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, CheckCircle2, User, 
  Heart, LayoutGrid, Briefcase, ArrowLeft, 
  Check,
  ChevronRight, Info
} from 'lucide-react';


const PLAN_CATALOG = [
  { id: 'p1', name: 'Star Comprehensive Health', type: 'HEALTH INSURANCE', provider: 'Star Health', premium: '₹80,000', coverage: ['In-patient Hospitalization', 'Day Care Procedures', 'AYUSH Treatment', 'Pre-Post Hospitalization'], benefits: ['Cashless Treatment', 'No Claim Bonus', 'Free Health Checkup', 'Restore Sum Insured'] },
  { id: 'p2', name: 'LIC Tech Term', type: 'LIFE INSURANCE', provider: 'LIC of India', premium: '₹45,000', coverage: ['Death Benefit', 'Critical Illness Cover', 'Terminal Illness', 'Accidental Death'], benefits: ['Tax Savings U/S 80C', 'Accidental Death Rider', 'Flexible Payouts', 'Level Premium'] },
  { id: 'p3', name: 'Bajaj Car Insurance', type: 'MOTOR INSURANCE', provider: 'Bajaj Allianz', premium: '₹12,500', coverage: ['Third Party Liability', 'Own Damage', 'Theft & Fire', 'Natural Calamities'], benefits: ['Zero Depreciation', 'Roadside Assistance', 'Engine Protector', 'Consumables Cover'] },
];

export const IssuePolicy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith('/super-admin') ? '/super-admin' : '/admin';
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    planId: '',
    type: '',
    provider: '',
    name: '',
    premium: '',
    nomineeName: '',
    nomineeRelation: '',
    status: 'ACTIVE'
  });

  const [selectedCoverage, setSelectedCoverage] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    if (formData.planId) {
      const plan = PLAN_CATALOG.find(p => p.id === formData.planId);
      if (plan) {
        setSelectedPlan(plan);
        setFormData(prev => ({
          ...prev,
          type: plan.type,
          provider: plan.provider,
          name: plan.name,
          premium: plan.premium
        }));
        setSelectedCoverage(plan.coverage);
        setSelectedBenefits(plan.benefits);
      }
    }
  }, [formData.planId]);

  const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const policies = JSON.parse(localStorage.getItem('safeguard_policies') || '[]');
    const newPolicy = {
      id: `SG-${formData.type.split(' ')[0]}-00${policies.length + 1}`,
      ...formData,
      expiry: formData.endDate,
      customCoverage: selectedCoverage,
      customBenefits: selectedBenefits
    };
    localStorage.setItem('safeguard_policies', JSON.stringify([...policies, newPolicy]));
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 animate-in fade-in duration-700">
      <div className="max-w-[1100px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate(`${basePath}/policies`)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Issue New Insurance Policy</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Global Portfolio</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Enrollment Form</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">System Online & Secure</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">
          {/* Main Form Area */}
          <div className="col-span-8 space-y-8">
            {/* Customer Information Card */}
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-teal-600 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Customer Information</h3>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Primary policy holder details</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
                  <input 
                    type="text" required
                    value={formData.customer}
                    onChange={e => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Enter customer name..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 outline-none transition-all placeholder:text-slate-300"
                      placeholder="customer@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                    <input 
                      type="text" required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 outline-none transition-all placeholder:text-slate-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Nominee Details Card */}
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-blue-600 shadow-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Nominee Information</h3>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Legal beneficiary for the policy</p>
                  </div>
                </div>
              </div>
              <div className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominee Name</label>
                  <input 
                    type="text" required
                    value={formData.nomineeName}
                    onChange={e => setFormData({ ...formData, nomineeName: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                    placeholder="Enter nominee name..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Relationship</label>
                  <select 
                    required
                    value={formData.nomineeRelation}
                    onChange={e => setFormData({ ...formData, nomineeRelation: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Customization Area (Coverage & Benefits) */}
            {selectedPlan && (
              <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-500">
                <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 text-teal-600">
                    <LayoutGrid className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Customize Coverage</h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedPlan.coverage.map((c: string) => (
                      <label key={c} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all cursor-pointer group">
                        <span className="text-xs font-bold text-slate-600 group-hover:text-teal-900 transition-colors">{c}</span>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            checked={selectedCoverage.includes(c)}
                            onChange={() => toggleItem(c, selectedCoverage, setSelectedCoverage)}
                            className="w-5 h-5 appearance-none border-2 border-slate-200 rounded-lg checked:bg-teal-500 checked:border-teal-500 transition-all cursor-pointer"
                          />
                          {selectedCoverage.includes(c) && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white stroke-[4]" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Plan Benefits</h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedPlan.benefits.map((b: string) => (
                      <label key={b} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group">
                        <span className="text-xs font-bold text-slate-600 group-hover:text-blue-900 transition-colors">{b}</span>
                        <div className="relative">
                          <input 
                            type="checkbox"
                            checked={selectedBenefits.includes(b)}
                            onChange={() => toggleItem(b, selectedBenefits, setSelectedBenefits)}
                            className="w-5 h-5 appearance-none border-2 border-slate-200 rounded-lg checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
                          />
                          {selectedBenefits.includes(b) && <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white stroke-[4]" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Sidebar / Configuration Area */}
          <div className="col-span-4 space-y-8">
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden sticky top-8">
              <div className="p-8 border-b border-slate-50 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Plan Selector</h3>
                </div>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Insurance Product</label>
                    <select 
                      required
                      value={formData.planId}
                      onChange={e => setFormData({ ...formData, planId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 outline-none transition-all appearance-none"
                    >
                      <option value="">Choose Catalog...</option>
                      {PLAN_CATALOG.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Policy Start Date</label>
                      <input 
                        type="date" required
                        value={formData.startDate}
                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                      <input 
                        type="date" required
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>

                {selectedPlan && (
                  <div className="space-y-6 pt-6 border-t border-slate-50 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Premium</span>
                      <span className="text-lg font-black text-slate-900">{selectedPlan.premium}</span>
                    </div>
                    <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl space-y-1">
                      <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Policy Provider</p>
                      <p className="text-sm font-black text-teal-900">{selectedPlan.provider}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button 
                        type="submit"
                        className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20"
                      >
                        Issue Policy
                      </button>
                      <button 
                        type="button"
                        onClick={() => navigate(`${basePath}/policies`)}
                        className="w-full py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </form>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-[2.5rem] p-12 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-emerald-100 relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem] animate-ping duration-[2000ms]" />
              <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Success!</h2>
            <p className="text-slate-500 font-bold mb-10">
              The insurance policy has been issued successfully and added to the global portfolio.
            </p>
            <button 
              onClick={() => navigate(`${basePath}/policies`)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
