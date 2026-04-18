import React from 'react';
import {
  Sparkles, ArrowRight, Zap, Target, LayoutDashboard,
  Shield, Star, Users, Briefcase, HeartPulse, Car, TrendingUp, CheckCircle, Plus, Minus
} from 'lucide-react';
import PlanCard from '../components/insurance/PlanCard';
import { Link } from 'react-router-dom';
import { cn } from '../utils/helpers';



const MOCK_REVIEWS = [
  {
    name: "Ananya Iyer",
    location: "Bangalore",
    text: "The AI Advisor helped me pick the right health plan for my parents in under 5 minutes. The tax saving calculation was spot on!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=ananya"
  },
  {
    name: "Vikram Mehta",
    location: "Mumbai",
    text: "Zero spam calls! That was the best part. I compared term plans from LIC and HDFC and bought the policy instantly.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    name: "Sandeep Singh",
    location: "Delhi",
    text: "Claims handling with SafeGuard was incredibly smooth. They supported me throughout the hospitalisation process.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sandeep"
  },
  {
    name: "Priya Sharma",
    location: "Pune",
    text: "I was confused between multiple motor insurance plans. The comparison tool made the differences very clear. Highly recommended!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Rahul Verma",
    location: "Hyderabad",
    text: "Best platform for term insurance. The LIC plan suggested by the advisor saved me nearly ₹3,000 on my annual premium.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Sneha Patil",
    location: "Ahmedabad",
    text: "Excellent support team. They helped me with my 80D tax certificates even during a holiday. Very impressed with the service.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sneha"
  }
];

const MOCK_FAQS = [
  {
    q: "How does the AI Advisor make recommendations?",
    a: "Our AI analysis tool evaluates your age, income, family profile, and risk appetite against 1,000+ data points from IRDAI-approved insurers to isolate the most cost-effective plans with the best claim ratios."
  },
  {
    q: "Do you charge any commission or fees?",
    a: "No. SafeGuard is a zero-commission platform. Our advice is 100% free, and we do not charge any additional fees over the premium set by the insurance company."
  },
  {
    q: "How do I claim tax benefits under Section 80D?",
    a: "After purchasing a health insurance policy, you will receive a tax certificate in your dashboard. You can use this to claim deductions up to ₹25,000 (standard) or ₹50,000 (senior citizens) on your annual income tax."
  },
  {
    q: "Can I manage policies from different insurers in one place?",
    a: "Yes! The SafeGuard Dashboard allows you to track and manage policies from LIC, HDFC, Star Health, Bajaj Allianz, and many more, all under one unified profile."
  },
  {
    q: "What happens if my claim is rejected?",
    a: "We provide dedicated claims assistance. If your claim is valid but rejected by an insurer, our experts will help you with the appeal process and interface with the insurer to resolve the issue."
  }
];

const PARTNERS = [
  { name: 'HDFC ERGO', short: 'ERGO', url: 'https://upload.wikimedia.org/wikipedia/en/5/56/HDFC_ERGO_Logo_2025.png', bg: '#7c3aed', color: '#ffffff' },
  { name: 'ICICI Lombard', short: 'ICICI', url: 'https://upload.wikimedia.org/wikipedia/en/0/05/ICICI_Lombard.svg', bg: '#ea580c', color: '#ffffff' },
  { name: 'TATA AIG', short: 'TATA', url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/TATA_AIG_logo.png', bg: '#1e3a8a', color: '#ef4444' },
  { name: 'Bajaj Allianz', short: 'Bajaj', url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bajaj_Allianz_Insurance.svg', bg: '#1e40af', color: '#ffffff' },
  { name: 'Star Health', short: '★ Star', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Star_Health_and_Allied_Insurance.svg', bg: '#1d4ed8', color: '#ffffff' },
  { name: 'Niva Bupa', short: 'Niva', url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Niva_Bupa_Logo.jpg', bg: '#0284c7', color: '#ffffff' },
  { name: 'LIC of India', short: 'LIC', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Life_Insurance_Corporation_of_India.svg', bg: '#1e3a8a', color: '#fbbf24' },
  { name: 'HDFC Life', short: 'HDFC', url: 'https://upload.wikimedia.org/wikipedia/en/8/8f/HDFC_Life_Logo.svg', bg: '#dc2626', color: '#ffffff' },
  { name: 'Max Life', short: 'Max', url: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Max_Life_Insurance.svg', bg: '#0f172a', color: '#38bdf8' },
];



export const Home: React.FC = () => {

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);


  return (
    <div className="pt-20">


      {/* Hero */}
      <section className="pt-10 pb-0 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-bold mb-6 animate-pulse border border-teal-100">
              <Sparkles className="w-4 h-4" />
              IRDAI Approved &middot; AI-Powered Insurance Advisor
            </div>



            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              The Right Insurance.{' '}
              <span className="text-teal-600">The Right Price.</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-3">
              Compare 50+ plans from LIC, HDFC Life, Star Health, ICICI Lombard &amp; more.
              Get personalised recommendations in minutes &mdash; completely free.
            </p>
            <p className="text-sm font-semibold text-teal-600 mb-10">
              Tax Benefits Available Under Section 80C &amp; 80D
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/advisor"
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/30 hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                Find My Best Plan <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/compare"
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Compare Plans
              </Link>
            </div>
          </div>

          {/* Creative Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto px-6">
            {[
              {
                Icon: Star,
                label: '4.9 / 5 Rating',
                sub: '2 Lakh+ Reviews',
                color: 'from-amber-500/10 to-orange-500/10',
                iconColor: 'text-amber-500',
                border: 'border-amber-100/50'
              },
              {
                Icon: Users,
                label: '50 Lakh+ Users',
                sub: 'Across India',
                color: 'from-teal-500/10 to-emerald-500/10',
                iconColor: 'text-teal-600',
                border: 'border-teal-100/50'
              },
              {
                Icon: Briefcase,
                label: '50+ Insurers',
                sub: 'LIC, HDFC & more',
                color: 'from-blue-500/10 to-indigo-500/10',
                iconColor: 'text-blue-600',
                border: 'border-blue-100/50'
              },
            ].map(({ Icon, label, sub, color, iconColor, border }, i) => (
              <div
                key={i}
                className={cn(
                  "relative group overflow-hidden p-6 rounded-[2rem] bg-gradient-to-br border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 bg-white/40 backdrop-blur-md",
                  color,
                  border
                )}
              >
                <div className="flex items-center gap-6">
                  <div className={cn("w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500", iconColor)}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{label}</span>
                      <span className="text-sm font-bold text-slate-500 tracking-wide uppercase text-[10px]">{sub}</span>
                    </div>
                  </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            ))}
          </div>

          {/* Category Cards */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                What do you want to insure?
              </h2>
              <p className="text-slate-500 font-medium">
                Select a category to explore premium plans from India's top insurers
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Health', Icon: HeartPulse, desc: 'Coverage for medical emergencies', partners: 'Star Health, Niva Bupa, Care', iconBg: 'bg-blue-100/50 text-blue-600', hoverBg: 'hover:border-blue-200 hover:bg-blue-50/30', href: '/insurance/health' },
                { title: 'Life / Term', Icon: Shield, desc: 'Secure your family\'s future', partners: 'LIC, HDFC Life, Max Life', iconBg: 'bg-purple-100/50 text-purple-600', hoverBg: 'hover:border-purple-200 hover:bg-purple-50/30', href: '/insurance/life' },
                { title: 'Motor', Icon: Car, desc: 'Protect your vehicle instantly', partners: 'ICICI Lombard, Bajaj Allianz', iconBg: 'bg-orange-100/50 text-orange-600', hoverBg: 'hover:border-orange-200 hover:bg-orange-50/30', href: '/insurance/motor' },
                { title: 'Investment', Icon: TrendingUp, desc: 'Grow wealth with protection', partners: 'ULIP, SIP + Insurance', iconBg: 'bg-teal-100/50 text-teal-600', hoverBg: 'hover:border-teal-200 hover:bg-teal-50/30', href: '/insurance/investment' },
              ].map(({ title, Icon, desc, partners, iconBg, hoverBg, href }) => (
                <Link
                  key={title}
                  to={href}
                  className={cn(
                    "group p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2",
                    hoverBg
                  )}
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm", iconBg)}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">{desc}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{partners}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Slider */}
        <div className="mt-12 border-t border-slate-100/50 bg-white/30 backdrop-blur-sm pt-12 pb-8 overflow-hidden relative">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">
            INTEGRATED WITH 50+ IRDAI APPROVED INSURERS
          </p>

          <div className="flex relative w-full items-center">
            {/* Smooth transition gradients */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-slider hover:[animation-play-state:paused] items-center py-4">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div key={i} className="flex-shrink-0 w-48 h-20 mx-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center hover:shadow-md hover:border-teal-100 transition-all duration-500 group">
                  <img
                    src={partner.url}
                    alt={partner.name}
                    className="max-w-[70%] max-h-[60%] object-contain transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const txt = document.createElement('span');
                        txt.innerText = partner.short;
                        txt.className = "font-black text-slate-900 tracking-tighter opacity-70";
                        parent.appendChild(txt);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why SafeGuard */}
      <section className="pt-12 pb-20 px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">India's Smartest Insurance Platform</h2>
            <p className="text-slate-500 text-lg">
              Built with precision for the Indian market, trusted by millions for honest advice and zero commission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { Icon: Zap, title: 'Instant Quotes', desc: 'No agents, no spam calls. Real-time quotes from 50+ IRDAI-approved insurers in seconds.' },
              { Icon: Target, title: 'AI Personalisation', desc: 'Our AI considers your age, income, family size and health to recommend the perfect plan.' },
              { Icon: LayoutDashboard, title: 'One Place, All Plans', desc: 'LIC, HDFC Life, Star Health, Bajaj Allianz — manage all policies from one dashboard.' },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Plans */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Top Rated Insurance Plans</h2>
            <p className="text-slate-500 mb-8 font-medium">Selected by over 1 Million users for exceptional claim settlement and coverage benefits.</p>
            <Link to="/compare" className="group inline-flex items-center gap-3 text-teal-600 font-bold hover:text-teal-700 transition-all">
              View All Plans
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PlanCard
              title="Star Comprehensive Health"
              type="health"
              price="799"
              provider="Star Health Insurance"
              features={['5 Lakh Sum Insured', 'Cashless at 14,000+ Hospitals', 'No Room Rent Limit', 'AYUSH Cover Included']}
            />
            <PlanCard
              title="LIC Tech Term"
              type="life"
              price="1,199"
              provider="LIC of India"
              features={['1 Crore Sum Assured', '80C Tax Benefit', 'Critical Illness Rider', 'Return of Premium Option']}
              recommended={true}
            />
            <PlanCard
              title="Bajaj Allianz Motor"
              type="car"
              price="499"
              provider="Bajaj Allianz"
              features={['Own Damage + Third Party', 'Zero Depreciation Cover', 'Roadside Assistance 24x7', 'No Claim Bonus up to 50%']}
            />
          </div>

          {/* Tax Saving Banner */}
          <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl opacity-50" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4" /> Tax Saving Tip
              </div>
              <h3 className="text-3xl font-bold mb-3">
                Save up to &#8377;1.5 Lakh in Taxes
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Health Insurance premiums are deductible under Section 80D. Term Insurance qualifies under 80C. Compare plans and maximise your savings today!
              </p>
            </div>
            <Link
              to="/advisor"
              className="shrink-0 relative z-10 px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30 flex items-center gap-3 group"
            >
              Check My Savings
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Infinite Marquee */}
      <section className="py-24 bg-white overflow-hidden relative">
        {/* Decorative background gradients */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-slate-500 text-lg">Trusted by over 50 Lakh+ users across India for honest advice and seamless claims.</p>
          </div>
        </div>

        <div className="relative group">
          {/* Gradient masking for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Single Row: Moving Right to Left */}
          <div className="flex w-max animate-slider hover:[animation-play-state:paused] gap-8 px-4 py-10">
            {[...MOCK_REVIEWS, ...MOCK_REVIEWS].map((review, i) => (
              <div
                key={i}
                className="w-[420px] p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-teal-600/10 hover:-translate-y-2 transition-all duration-500 group/card relative overflow-hidden"
              >
                {/* Subtle card glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

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
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                      <p className="text-xs text-teal-600 font-bold uppercase tracking-[0.15em]">{review.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-16 text-center">
          <Link to="/advisor" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all inline-flex items-center gap-2">
            Share Your Story <ArrowRight className="w-5 h-5" />
          </Link>
        </div> */}

        <div className="container mx-auto px-6">
          {/* FAQ Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 font-medium">Everything you need to know about SafeGuard policies and effortless claims.</p>
            </div>

            <div className="space-y-4">
              {MOCK_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className={cn(
                    "group border transition-all duration-300 rounded-[1.5rem]",
                    openFaq === i
                      ? "bg-white border-teal-100 shadow-xl shadow-teal-600/5"
                      : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200"
                  )}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left"
                  >
                    <h3 className="text-base font-bold text-slate-900 pr-8">{faq.q}</h3>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
                      openFaq === i ? "bg-teal-600 text-white rotate-180" : "bg-white text-slate-400"
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



          {/* Quick Selling Points */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { Icon: CheckCircle, text: 'Zero Commission' },
              { Icon: CheckCircle, text: '100% Digital Process' },
              { Icon: CheckCircle, text: 'UPI / Net Banking' },
              { Icon: CheckCircle, text: 'Dedicated Support' },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center gap-4 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <span className="font-bold text-slate-800 text-sm tracking-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


