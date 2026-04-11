import React from 'react';
import { HeartPulse, ShieldCheck, Zap, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HealthInsurance: React.FC = () => {
  const steps = [
    { title: 'Check Coverage Needs', desc: 'Determine if you need a family floater or individual plan based on your family size.' },
    { title: 'Compare Plans', desc: 'Use our AI advisor to compare cashless networks and claim settlement ratios.' },
    { title: 'Instant KYC', desc: 'Complete your digital KYC with Aadhaar for instant policy issuance.' },
    { title: 'Payment & Policy', desc: 'Make a secure payment and get your policy document in your dashboard immediately.' }
  ];

  const faqs = [
    { q: 'What is a Cashless Hospital Network?', a: 'It is a network of hospitals where the insurer scales the bills directly, so you do not have to pay from your pocket.' },
    { q: 'Are pre-existing diseases covered?', a: 'Yes, but usually after a waiting period of 2-4 years depending on the plan you choose.' },
    { q: 'Can I claim tax benefits?', a: 'Absolutely! You can save up to ₹25,000 (or ₹50,000 for seniors) under Section 80D.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/10">
            <HeartPulse className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Health Insurance</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Secure your family's future against rising medical costs. Get access to the best hospitals in India with 100% cashless treatment.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <ShieldCheck className="w-10 h-10 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Financial Protection</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Covers hospitalisation, surgery, and medication costs, preventing medical debt during emergencies.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <Zap className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">Cashless Treatment</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Direct billing with 14,000+ hospitals across India. No need to worry about arranging cash.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <CheckCircle2 className="w-10 h-10 text-teal-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Tax Benefits</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Save tax under Section 80D on premiums paid for yourself, family, and parents.</p>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-lg border-4 border-white">
                  {i + 1}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-600" /> FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/compare?category=health"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30"
          >
            Compare Health Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HealthInsurance;
