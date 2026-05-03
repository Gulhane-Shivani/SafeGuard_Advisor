
import React, { useState } from 'react';
import { 
  Shield, 
  IndianRupee, ChevronRight, CheckCircle2,
  Download, Send
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const QuoteGenerator: React.FC = () => {
  const { data } = usePlatform();
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '', age: '', occupation: '', coverage: '500000'
  });

  const availableProducts = data.products.filter(p => p.category === 'Life');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Go directly to comparison/result
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <SectionHeader 
        title="Quote Generator" 
        description="Create customized insurance quotes for your prospects and compare plan benefits instantly."
      />

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-1 before:bg-slate-100 before:z-0">
         {['Client Details', 'Select Product', 'Generate Quote'].map((label, i) => (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2">
               <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all border-4",
                  step > i + 1 ? "bg-teal-600 border-teal-100 text-white" :
                  step === i + 1 ? "bg-white border-teal-600 text-teal-600 shadow-lg shadow-teal-600/20" : "bg-white border-slate-200 text-slate-300"
               )}>
                  {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
               </div>
               <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-full",
                  step >= i + 1 ? "text-slate-900" : "text-slate-400"
               )}>{label}</span>
            </div>
         ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         {step === 1 && (
            <form onSubmit={() => setStep(2)} className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-right-4">
               <div>
                  <h3 className="text-xl font-black text-slate-900">Prospect Information</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Enter basic details to calculate accurate premiums.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                     <input 
                        required
                        type="text" 
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                     <input 
                        required
                        type="number" 
                        value={customerDetails.age}
                        onChange={(e) => setCustomerDetails({...customerDetails, age: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Occupation</label>
                     <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all">
                        <option>Salaried</option>
                        <option>Self-Employed</option>
                        <option>Business Owner</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Desired Coverage</label>
                     <select 
                        value={customerDetails.coverage}
                        onChange={(e) => setCustomerDetails({...customerDetails, coverage: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                     >
                        <option value="500000">$500,000</option>
                        <option value="1000000">$1,000,000</option>
                        <option value="2000000">$2,000,000</option>
                     </select>
                  </div>
               </div>
               
               <div className="flex justify-end pt-4">
                  <button type="submit" className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 group">
                     Next Step <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </form>
         )}

         {step === 2 && (
            <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-right-4">
               <div>
                  <h3 className="text-xl font-black text-slate-900">Select Base Product</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Choose the primary insurance plan for {customerDetails.name}.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableProducts.map(p => (
                     <div 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={cn(
                           "p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col gap-4 relative",
                           selectedProduct?.id === p.id 
                             ? "border-teal-500 bg-teal-50/50" 
                             : "border-slate-100 hover:border-teal-200 bg-white"
                        )}
                     >
                        {selectedProduct?.id === p.id && (
                           <div className="absolute top-4 right-4 text-teal-600">
                              <CheckCircle2 className="w-6 h-6" />
                           </div>
                        )}
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-slate-100">
                           <Shield className="w-6 h-6" />
                        </div>
                        <div>
                           <h4 className="font-black text-slate-900 text-lg">{p.name}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{p.insurer}</p>
                        </div>
                        <div className="mt-2 pt-4 border-t border-slate-100/50">
                           <p className="text-sm font-medium text-slate-600">Base Premium: <strong className="text-slate-900">{p.premium}</strong></p>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="px-8 py-3.5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                     Back
                  </button>
                  <button 
                     disabled={!selectedProduct}
                     onClick={handleGenerate} 
                     className="px-8 py-3.5 bg-teal-600 text-white rounded-2xl font-bold text-sm hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 disabled:opacity-50 flex items-center gap-2"
                  >
                     Generate Quote
                  </button>
               </div>
            </div>
         )}

         {step === 3 && (
            <div className="p-8 md:p-12 space-y-8 animate-in zoom-in-95 duration-500">
               <div className="text-center max-w-lg mx-auto">
                  <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-100 shadow-inner">
                     <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Quote Generated Successfully</h3>
                  <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                     A customized quote for {selectedProduct?.name} has been generated for {customerDetails.name}.
                  </p>
               </div>

               <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Monthly Premium</p>
                        <p className="text-4xl font-black text-slate-900 flex items-center gap-1">
                           <IndianRupee className="w-8 h-8 text-teal-600" />
                           {(parseInt(customerDetails.coverage) / 100000) * parseInt(customerDetails.age || '30') * 0.5}
                        </p>
                        <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 w-max px-2 py-0.5 rounded-lg border border-emerald-100">
                           Includes Agent Discount
                        </p>
                     </div>
                     <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                        <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                           <Download className="w-4 h-4" /> Download PDF
                        </button>
                        <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-600/20">
                           <Send className="w-4 h-4" /> Send to Prospect
                        </button>
                     </div>
                  </div>
               </div>
               
               <div className="flex justify-center pt-4">
                  <button onClick={() => { setStep(1); setSelectedProduct(null); setCustomerDetails({name: '', age: '', occupation: '', coverage: '500000'}) }} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                     Create Another Quote
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
