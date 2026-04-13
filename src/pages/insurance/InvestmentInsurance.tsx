import React from 'react';
import { TrendingUp, BarChart3, Wallet, HelpCircle, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/insurance/PlanCard';

const InvestmentInsurance: React.FC = () => {
  const steps = [
    { title: 'Goal Setting', desc: 'Define your financial goals — wealth creation, child education, or retirement.' },
    { title: 'Risk Assessment', desc: 'Select fund types (Equity, Debt, or Balanced) based on your risk appetite.' },
    { title: 'Set SIP Amount', desc: 'Determine your monthly investment amount for long-term compounding.' },
    { title: 'Track Portfolio', desc: 'Monitor your investment growth and switch funds for free via our dashboard.' }
  ];

  const plans = [
    {
      title: "HDFC Life Sanchay Plus",
      type: "investment" as const,
      price: "2500",
      provider: "HDFC Life",
      features: ['Guaranteed Returns', 'Tax Free Maturity', 'Life Long Income Option', 'Flexible Term']
    },
    {
      title: "LIC SIIP",
      type: "investment" as const,
      price: "3000",
      provider: "LIC of India",
      features: ['Unit Linked Protection', 'Four Fund Options', 'Mortality Charge Refund', 'Tax Benefits']
    },
    {
      title: "ICICI Pru Signature",
      type: "investment" as const,
      price: "2000",
      provider: "ICICI Prudential",
      features: ['Whole Life Cover', 'Wealth Boosters', 'Systematic Withdrawal', 'Zero Processing Fee']
    }
  ];

  const reviews = [
    {
      name: "Manoj Shah",
      text: "Sanchay Plus has given me better returns than my fixed deposits, with the added benefit of life insurance.",
      rating: 5,
      role: "Investment Client"
    },
    {
      name: "Kavita Devi",
      text: "The perfect mix of protection and growth. I am saving for my daughter's higher education through this plan.",
      rating: 5,
      role: "Home Maker"
    }
  ];

  const faqs = [
    { q: 'What is a ULIP?', a: 'Unit Linked Insurance Plan is a product that provides both insurance cover and investment returns.' },
    { q: 'Is there a lock-in period?', a: 'Most tax-saving investment plans (like ULIPs) have a mandatory 5-year lock-in period.' },
    { q: 'Can I switch funds?', a: 'Yes, SafeGuard allows you to switch between equity and debt funds based on market performance.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-600/10">
            <TrendingUp className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Investment Plans</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Grow your wealth while keeping your family protected. Market-linked returns with the safety of life insurance.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <BarChart3 className="w-10 h-10 text-teal-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Market Returns</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Invest in diversified equity and debt funds managed by top IRDAI-approved fund managers.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <Wallet className="w-10 h-10 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Wealth Creation</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Systematic investment plans (SIP) help you build a large corpus for future milestones over 10-20 years.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <CheckCircle2 className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">Triple Tax Benefit</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Tax-free investment, tax-free growth, and tax-free maturity under Section 10(10D).</p>
          </div>
        </div>

        {/* Insurance Plans Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Growth & Protection Plans</h2>
            <p className="text-slate-500">Wealth creation products with guaranteed insurance cover</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <PlanCard key={i} {...plan} />
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
            <HelpCircle className="w-8 h-8 text-teal-600" /> FAQs
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
            to="/compare?category=investment"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30"
          >
            Compare Investment Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInsurance;
