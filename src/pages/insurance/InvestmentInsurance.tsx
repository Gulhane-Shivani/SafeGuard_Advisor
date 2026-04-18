import React from 'react';
import { TrendingUp, BarChart3, Wallet, CheckCircle2, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/insurance/PlanCard';




const InvestmentInsurance: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
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


        {/* Process Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-slate-500 font-medium">Build your wealth in 4 strategic steps</p>
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
              <p className="text-slate-500 text-lg">See how thousands are achieving their financial goals with SafeGuard.</p>
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
                    <p className="text-slate-700 font-medium leading-relaxed mb-10 italic text-lg tracking-tight">"{review.text}"</p>
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
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-[0.15em]">Verified Investor</p>
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
            <p className="text-slate-500 font-medium">Clear your doubts about wealth growth and policy security.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={cn("group border transition-all duration-300 rounded-[2rem]", openFaq === i ? "bg-white border-teal-100 shadow-xl shadow-teal-600/5" : "bg-white border-slate-100 hover:bg-white hover:border-slate-200 shadow-sm")}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 md:p-8 flex items-center justify-between text-left">
                  <h3 className="text-lg font-bold text-slate-900 pr-8">{faq.q}</h3>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm", openFaq === i ? "bg-teal-600 text-white rotate-180" : "bg-white text-slate-400")}>
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
