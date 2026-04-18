import React from 'react';
import { HeartPulse, ShieldCheck, Zap, CheckCircle2, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import PlanCard from '../../components/insurance/PlanCard';




const HealthInsurance: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const steps = [
    { title: 'Check Coverage Needs', desc: 'Determine if you need a family floater or individual plan based on your family size.' },
    { title: 'Compare Plans', desc: 'Use our AI advisor to compare cashless networks and claim settlement ratios.' },
    { title: 'Instant KYC', desc: 'Complete your digital KYC with Aadhaar for instant policy issuance.' },
    { title: 'Payment & Policy', desc: 'Make a secure payment and get your policy document in your dashboard immediately.' }
  ];

  const plans = [
    {
      title: "Star Comprehensive Health",
      type: "health" as const,
      price: "799",
      provider: "Star Health Insurance",
      features: ['5 Lakh Sum Insured', 'Cashless at 14,000+ Hospitals', 'No Room Rent Limit', 'AYUSH Cover Included']
    },
    {
      title: "Niva Bupa ReAssure",
      type: "health" as const,
      price: "850",
      provider: "Niva Bupa",
      features: ['ReAssure Benefit (Unlimited Refills)', 'Safeguard Add-on', 'Modern Treatment Cover', 'Hospital Cash']
    },
    {
      title: "Care Supreme",
      type: "health" as const,
      price: "720",
      provider: "Care Health",
      features: ['Cumulative Bonus', 'Annual Health Check-ups', 'No Claim Bonus', 'E-Consultation']
    }
  ];

  const reviews = [
    {
      name: "Amit Sharma",
      location: "Mumbai",
      text: "The cashless process at Star Health was incredibly fast. I didn't have to pay a single penny for my surgery.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=amit"
    },
    {
      name: "Priya Gupta",
      location: "Delhi",
      text: "Excellent coverage for my parents. The Niva Bupa plan is worth every rupee for the peace of mind it provides.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      text: "Safeguard Advisor helped me transition from a corporate plan to an individual one seamlessly.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
      name: "Sneha Reddy",
      location: "Hyderabad",
      text: "The compare feature is a life saver. I could see the exact difference in cashless networks easily.",
      rating: 5,
      image: "https://i.pravatar.cc/150?u=sneha"
    }
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

        {/* Insurance Plans Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Rated Health Plans</h2>
            <p className="text-slate-500">Pick from our most popular health insurance products</p>
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
            <p className="text-slate-500 font-medium">Get your health insurance in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
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
              <p className="text-slate-500 text-lg">Trusted by thousands for effortless health claims and honest advice.</p>
            </div>
          </div>

          <div className="relative group">
            {/* Gradient masking for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-slider hover:[animation-play-state:paused] gap-8 px-4 py-10">
              {[...reviews, ...reviews].map((review, i) => (
                <div
                  key={i}
                  className="w-[420px] p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-2 transition-all duration-500 group/card relative overflow-hidden text-left"
                >
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
                          <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-[0.15em]">{review.location}</p>
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
            <p className="text-slate-500 font-medium">Everything you need to know about Health Insurance and effortless claims.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={cn(
                    "group border transition-all duration-300 rounded-[1.5rem]",
                    openFaq === i
                      ? "bg-white border-blue-100 shadow-xl shadow-blue-600/5"
                      : "bg-white border-slate-100 hover:bg-white hover:border-slate-200 shadow-sm"
                  )}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left"
                  >
                    <h3 className="text-base font-bold text-slate-900 pr-8">{faq.q}</h3>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                      openFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-white text-slate-400"
                    )}>
                      {openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  <div className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-slate-500 leading-relaxed font-medium text-sm">
                        {faq.a}
                      </div>
                    </div>
                  </div>
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
