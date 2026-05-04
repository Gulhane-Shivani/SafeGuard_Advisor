import React, { useState } from 'react';
import { 
  Shield, 
  IndianRupee, ChevronRight, CheckCircle2,
  Download, Send, FileText, Mail, History
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PlatformTable } from '../../components/platform/PlatformTable';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';
import { PlatformModal } from '../../components/platform/PlatformModal';

const QuoteGenerator: React.FC = () => {
  const { data } = usePlatform();
  const [step, setStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '', age: '', occupation: 'Salaried', coverage: '500000'
  });
  
  // Mock history state with Indian names
  const [quoteHistory, setQuoteHistory] = useState([
    { id: '1', name: 'Amit Sharma', age: '32', occupation: 'Salaried', coverage: '₹50,00,000', plan: 'Life Term Shield', premium: '₹1,250', date: '2024-05-02', status: 'Sent' },
    { id: '2', name: 'Priya Patel', age: '28', occupation: 'Self-Employed', coverage: '₹10,00,000', plan: 'Health Care Pro', premium: '₹2,100', date: '2024-05-01', status: 'Downloaded' },
    { id: '3', name: 'Rajesh Kumar', age: '45', occupation: 'Business Owner', coverage: '₹25,00,000', plan: 'Life Term Shield', premium: '₹3,400', date: '2024-04-30', status: 'Sent' }
  ]);

  const availableProducts = data.products.filter(p => p.category === 'Life');

  const calculatePremium = () => {
    if (!selectedProduct) return 0;
    
    // Extract numeric value from product premium (e.g., "₹1,200/mo" -> 1200)
    const baseRate = parseInt(selectedProduct.premium.replace(/[^0-9]/g, '')) || 1000;
    
    const ageFactor = parseInt(customerDetails.age || '30') / 30;
    const coverageFactor = parseInt(customerDetails.coverage) / 500000;
    
    let occupationMultiplier = 1;
    if (customerDetails.occupation === 'Self-Employed') occupationMultiplier = 1.25;
    if (customerDetails.occupation === 'Business Owner') occupationMultiplier = 1.4;
    
    return Math.round(baseRate * ageFactor * coverageFactor * occupationMultiplier);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const generatePDF = (details: any, product: any, premium: number) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(20, 158, 136);
    doc.text('SafeGuard Advisor - Insurance Quote', 14, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated for: ${details.name}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);

    autoTable(doc, {
      startY: 50,
      head: [['Parameter', 'Details']],
      body: [
        ['Customer Name', details.name],
        ['Age', details.age],
        ['Occupation', details.occupation],
        ['Selected Plan', product?.name],
        ['Insurer', product?.insurer],
        ['Sum Assured', `₹${parseInt(details.coverage).toLocaleString('en-IN')}`],
        ['Monthly Premium', `₹${premium.toLocaleString('en-IN')}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [20, 158, 136] }
    });

    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text('Important Note:', 14, (doc as any).lastAutoTable.finalY + 15);
    doc.setFontSize(9);
    doc.text('This is an indicative quote. Final premium is subject to medical examination and underwriting.', 14, (doc as any).lastAutoTable.finalY + 22);

    return doc;
  };

  const handleDownloadPDF = () => {
    const premium = calculatePremium();
    const doc = generatePDF(customerDetails, selectedProduct, premium);
    doc.save(`SafeGuard_Quote_${customerDetails.name.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSendToProspect = () => {
    const premium = calculatePremium();
    const newQuote = {
        id: Date.now().toString(),
        name: customerDetails.name,
        age: customerDetails.age,
        occupation: customerDetails.occupation,
        coverage: `₹${parseInt(customerDetails.coverage).toLocaleString('en-IN')}`,
        plan: selectedProduct?.name,
        premium: `₹${premium.toLocaleString('en-IN')}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Sent'
    };
    
    setQuoteHistory([newQuote, ...quoteHistory]);
    setIsSuccessModalOpen(true);
  };

  const historyColumns = [
    { header: 'Customer', accessor: 'name', render: (val: string) => <span className="font-bold text-slate-900">{val}</span> },
    { header: 'Age', accessor: 'age' },
    { header: 'Occupation', accessor: 'occupation' },
    { header: 'Coverage', accessor: 'coverage', render: (val: string) => <span className="font-bold text-slate-600">{val}</span> },
    { header: 'Plan Type', accessor: 'plan' },
    { header: 'Premium', accessor: 'premium', render: (val: string) => <span className="font-black text-teal-600">{val}</span> },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (val: string) => (
        <span className={cn(
            "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest",
            val === 'Sent' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
        )}>
            {val}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-20">
      <div className="space-y-10">
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
                        <select 
                            value={customerDetails.occupation}
                            onChange={(e) => setCustomerDetails({...customerDetails, occupation: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all"
                        >
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
                            <option value="500000">₹5,00,000</option>
                            <option value="1000000">₹10,00,000</option>
                            <option value="2500000">₹25,00,000</option>
                            <option value="5000000">₹50,00,000</option>
                            <option value="10000000">₹1 Crore</option>
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
                            {calculatePremium().toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 w-max px-2 py-0.5 rounded-lg border border-emerald-100">
                            Includes Agent Discount
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                            <button 
                            onClick={handleDownloadPDF}
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                            <Download className="w-4 h-4" /> Download PDF
                            </button>
                            <button 
                            onClick={handleSendToProspect}
                            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-600/20"
                            >
                            <Send className="w-4 h-4" /> Send to Prospect
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center pt-4">
                    <button onClick={() => { setStep(1); setSelectedProduct(null); setCustomerDetails({name: '', age: '', occupation: 'Salaried', coverage: '500000'}) }} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                        Create Another Quote
                    </button>
                </div>
                </div>
            )}
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 px-2">
            <History className="w-4 h-4 text-teal-600" /> Recent Quotes History
        </h3>
        <PlatformTable 
            columns={historyColumns}
            data={quoteHistory}
            searchPlaceholder="Search history by customer name..."
        />
      </div>

      <PlatformModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Quote Dispatched"
      >
        <div className="space-y-6 text-center py-4">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto text-teal-600 mb-4">
                <Mail className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Successfully Sent!</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
                The customized quote for <strong>{customerDetails.name}</strong> has been dispatched via Email and WhatsApp. 
                A record has been added to your lead interaction history.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-left">
                <FileText className="w-5 h-5 text-teal-600" />
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quote Reference</p>
                    <p className="text-xs font-bold text-slate-900">SQ-{Date.now().toString().slice(-6)}</p>
                </div>
            </div>
            <button 
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all mt-4"
            >
                Continue Workflow
            </button>
        </div>
      </PlatformModal>
    </div>
  );
};

export default QuoteGenerator;
