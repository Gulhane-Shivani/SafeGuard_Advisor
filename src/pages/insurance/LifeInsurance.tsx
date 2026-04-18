import React from 'react';
import { Shield, Target, TrendingUp, HelpCircle, CheckCircle2, ArrowRight, Star, Plus, Minus, CheckCircle, Mail, Briefcase, Users, Clock } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/insurance/PlanCard';


const PARTNERS = [
  { name: 'LIC of India', short: 'LIC', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/LIC_logo.png/200px-LIC_logo.png', bg: '#1e3a8a', color: '#fbbf24' },
  { name: 'HDFC Life', short: 'HDFC', url: 'https://logo.clearbit.com/hdfclife.com', bg: '#dc2626', color: '#ffffff' },
  { name: 'Star Health', short: '★ Star', url: 'https://logo.clearbit.com/starhealth.in', bg: '#1d4ed8', color: '#ffffff' },
  { name: 'ICICI Lombard', short: 'ICICI', url: 'https://logo.clearbit.com/icicilombard.com', bg: '#ea580c', color: '#ffffff' },
  { name: 'Bajaj Allianz', short: 'Bajaj', url: 'https://logo.clearbit.com/bajajallianz.com', bg: '#1e40af', color: '#ffffff' },
  { name: 'Max Life', short: 'Max', url: 'https://logo.clearbit.com/maxlifeinsurance.com', bg: '#0f172a', color: '#38bdf8' },
  { name: 'Niva Bupa', short: 'Niva', url: 'https://logo.clearbit.com/nivabupa.com', bg: '#0284c7', color: '#ffffff' },
  { name: 'TATA AIG', short: 'TATA', url: 'https://logo.clearbit.com/tataaig.com', bg: '#1e3a8a', color: '#ef4444' },
  { name: 'HDFC ERGO', short: 'ERGO', url: 'https://logo.clearbit.com/hdfcergo.com', bg: '#7c3aed', color: '#ffffff' },
];

const LifeInsurance: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const steps = [
    { title: 'Calculate Life Cover', desc: 'Use our calculators to find the sum assured based on your income and liabilities.' },
    { title: 'Choose Plan Type', desc: 'Select between pure term insurance or investment-linked (ULIP) plans.' },
    { title: 'Medical Checkup', desc: 'If required based on age/sum assured, a free medical test is scheduled at home.' },
    { title: 'Policy Approval', desc: 'Insurer reviews documents and issues your policy digitally.' }
  ];

  const plans = [
    {
      title: "LIC Tech Term",
      type: "life" as const,
      price: "1199",
      provider: "LIC of India",
      features: ['1 Crore Sum Assured', '80C Tax Benefit', 'Critical Illness Rider', 'Return of Premium Option']
    },
    {
      title: "HDFC Life Click 2 Protect",
      type: "life" as const,
      price: "1250",
      provider: "HDFC Life",
      features: ['Comprehensive Cover', 'Flexible Premium Payment', 'Life Stage Add-on', 'Income Benefit']
    },
    {
      title: "ICICI Pru iProtect Smart",
      type: "life" as const,
      price: "1100",
      provider: "ICICI Prudential",
      features: ['Accidental Death Cover', 'Terminal Illness Cover', 'Tax Benefits', 'Low Premium Rates']
    }
  ];

  const reviews = [
    {
      name: "Rajesh Kumar",
      text: "The documentation process was hassle-free. Got my policy issued within 3 days after the medical checkup.",
      rating: 5,
      role: "Policyholder since 2022"
    },
    {
      name: "Sneha Patel",
      text: "Best term plan options available. SafeGuard compared all the top players and saved me ₹2000 annually.",
      rating: 5,
      role: "Working Professional"
    }
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

        {/* Insurance Plans Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Term Plans</h2>
            <p className="text-slate-500">Secure your future with these top-rated life insurance plans</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <PlanCard key={i} {...plan} />
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-slate-500 font-medium">Get your life insurance in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-24 right-24 h-0.5 bg-slate-100 z-0" />

            {steps.map((step, i) => (
              <div key={i} className="relative z-10 group">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center h-full">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 font-black text-xl shadow-xl shadow-slate-900/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-4 text-lg">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section - Infinite Marquee */}
        <section className="py-24 -mx-6 bg-white overflow-hidden relative mb-24">
          <div className="container mx-auto px-6 relative z-10 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">What Our Customers Say</h2>
              <p className="text-slate-500 text-lg">Trusted by thousands for financial security and claims management.</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-slider hover:[animation-play-state:paused] gap-8 px-4 py-10">
              {[...reviews, ...reviews].map((review, i) => (
                <div key={i} className="w-[420px] p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2 transition-all duration-500 group/card relative overflow-hidden text-left">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={cn("w-4 h-4 fill-current", j < review.rating ? "text-amber-400" : "text-slate-200")} />
                      ))}
                    </div>

                    <p className="text-slate-700 font-medium leading-relaxed mb-10 italic text-lg tracking-tight">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                          <img src={`https://i.pravatar.cc/150?u=${review.name}`} alt={review.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-[0.15em]">Verified Owner</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Common questions about term life insurance and financial planning.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={cn("group border transition-all duration-300 rounded-[2rem]", openFaq === i ? "bg-white border-purple-100 shadow-xl shadow-purple-600/5" : "bg-white border-slate-100 hover:bg-white hover:border-slate-200 shadow-sm")}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 md:p-8 flex items-center justify-between text-left">
                  <h3 className="text-lg font-bold text-slate-900 pr-8">{faq.q}</h3>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm", openFaq === i ? "bg-purple-600 text-white rotate-180" : "bg-white text-slate-400")}>
                    {openFaq === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                </button>
                <div className={cn("grid transition-all duration-300 ease-in-out", openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">{faq.a}</div>
                  </div>
                </div>
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
