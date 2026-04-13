import React from 'react';
import { Car, ShieldCheck, Zap, HelpCircle, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/insurance/PlanCard';

const MotorInsurance: React.FC = () => {
  const steps = [
    { title: 'Enter Plate Number', desc: 'Starting with just your vehicle number pulls all technical details automatically.' },
    { title: 'Custome Add-ons', desc: 'Choose Zero Depreciation, Return to Invoice, or Roadside Assistance.' },
    { title: 'Old Policy Details', desc: 'Enter your previous policy expiry and NCB percentage for maximum discount.' },
    { title: 'Instant Download', desc: 'Pay and receive your digital policy PDF instantly in your dashboard.' }
  ];

  const plans = [
    {
      title: "Bajaj Allianz Motor",
      type: "car" as const,
      price: "499",
      provider: "Bajaj Allianz",
      features: ['Own Damage + Third Party', 'Zero Depreciation Cover', 'Roadside Assistance 24x7', 'No Claim Bonus up to 50%']
    },
    {
      title: "ICICI Lombard Motor",
      type: "car" as const,
      price: "550",
      provider: "ICICI Lombard",
      features: ['Instant Policy Issuance', '6000+ Cashless Garages', 'Engine Protect Add-on', 'Consumables Cover']
    },
    {
      title: "TATA AIG Auto",
      type: "car" as const,
      price: "520",
      provider: "TATA AIG",
      features: ['Depreciation Reimbursement', 'Key Replacement', 'Tyre Secure', 'Loss of Personal Belongings']
    }
  ];

  const reviews = [
    {
      name: "Vikram Singh",
      text: "My claim was settled in 24 hours without any paperwork. The cashless garage network is very extensive.",
      rating: 5,
      role: "Car Owner (SUV)"
    },
    {
      name: "Ananya Rao",
      text: "Great roadside assistance. They helped me with a flat tire at midnight in the middle of a highway.",
      rating: 5,
      role: "Frequent Traveller"
    }
  ];

  const faqs = [
    { q: 'What is Zero Depreciation?', a: 'It covers the full cost of replacing parts of your vehicle without considering wear and tear or age.' },
    { q: 'Is 24/7 Roadside Assistance included?', a: 'It is available as an add-on and covers towing, fuel delivery, and flat tire help.' },
    { q: 'What is NCB?', a: 'No Claim Bonus is a discount on premium for not making any claims in the previous year.' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-600/10">
            <Car className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Motor Insurance</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Protect your car or bike from accidents, theft, and natural disasters. Instant policy issuance with paperless process.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <ShieldCheck className="w-10 h-10 text-orange-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Comprehensive Cover</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Covers damages to your vehicle and third-party liabilities in a single policy.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <Zap className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-xl font-bold mb-4">Cashless Repairs</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Network of 5,000+ garages for cashless repairs with genuine spare parts.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <CheckCircle2 className="w-10 h-10 text-teal-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Personal Accident</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Mandatory ₹15 Lakh cover for the owner-driver in case of permanent disability or death.</p>
          </div>
        </div>

        {/* Insurance Plans Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hot Motor Deals</h2>
            <p className="text-slate-500">Compare and buy motor insurance in 2 minutes</p>
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
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
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
            <HelpCircle className="w-8 h-8 text-orange-600" /> FAQs
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
            to="/compare?category=car"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30"
          >
            Compare Motor Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MotorInsurance;
