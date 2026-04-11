import React from 'react';
import { Shield, Target, TrendingUp, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LifeInsurance: React.FC = () => {
  const steps = [
    { title: 'Calculate Life Cover', desc: 'Use our calculators to find the sum assured based on your income and liabilities.' },
    { title: 'Choose Plan Type', desc: 'Select between pure term insurance or investment-linked (ULIP) plans.' },
    { title: 'Medical Checkup', desc: 'If required based on age/sum assured, a free medical test is scheduled at home.' },
    { title: 'Policy Approval', desc: 'Insurer reviews documents and issues your policy digitally.' }
  ];

  const faqs = [
    { q: 'Is suicide covered in term insurance?', a: 'Most plans cover suicide after a period of 12 months from the policy start date.' },
    { q: 'What is "Return of Premium"?', a: 'It is an option where if the policyholder survives the term, all premiums paid are returned.' },
    { q: 'Can I add riders?', a: 'Yes, you can add Critical Illness, Accidental Death, or Waiver of Premium riders for extra protection.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-600/10">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Life / Term Insurance</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Ensure your loved ones are financially secure even when you're not around. High coverage at affordable premiums.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <Target className="w-10 h-10 text-purple-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Financial Security</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Provides a large sum assured to your family, helping them pay off debts and sustain their lifestyle.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <TrendingUp className="w-10 h-10 text-teal-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Affordable Protection</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Term insurance offers the highest coverage for the lowest premium, starting as low as ₹500/month.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <CheckCircle2 className="w-10 h-10 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Section 80C Benefits</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Premiums paid qualify for tax deduction up to ₹1.5 Lakh under Section 80C.</p>
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
            <HelpCircle className="w-8 h-8 text-purple-600" /> FAQs
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
            to="/compare?category=life"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30"
          >
            Compare Life Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LifeInsurance;
