import React from 'react';
import {
  Sparkles, ArrowRight, Zap, Target, LayoutDashboard,
  Shield, Star, Users, Briefcase, HeartPulse, Car, TrendingUp, CheckCircle
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

export const Home: React.FC = () => {
  return (
    <div className="pt-20">


      {/* Hero */}
      <section className="pt-20 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
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

          {/* Category Cards */}
          <div className="mb-20">
            <h2 className="text-center text-2xl font-bold text-slate-800 mb-2">
              What Do You Want to Insure?
            </h2>
            <p className="text-center text-slate-400 text-sm mb-10">
              Choose your category to get started
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {[
                { title: 'Health',     Icon: HeartPulse,  desc: 'Star Health, Niva Bupa, Care', iconBg: 'bg-blue-100 text-blue-600',   href: '/compare?category=health' },
                { title: 'Life / Term',Icon: Shield,      desc: 'LIC, HDFC Life, Max Life',     iconBg: 'bg-purple-100 text-purple-600',href: '/compare?category=life' },
                { title: 'Motor',      Icon: Car,         desc: 'ICICI Lombard, Bajaj Allianz', iconBg: 'bg-orange-100 text-orange-600',href: '/compare?category=car' },
                { title: 'Investment', Icon: TrendingUp,  desc: 'ULIP, SIP + Insurance',        iconBg: 'bg-teal-100 text-teal-600',    href: '/compare?category=investment' },
              ].map(({ title, Icon, desc, iconBg, href }) => (
                <Link
                  key={title}
                  to={href}
                  className="group p-6 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-400 text-xs leading-snug">{desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-10 border-y border-slate-100">
            {[
              { Icon: Shield,    label: 'IRDAI Regulated',  sub: 'Fully Compliant' },
              { Icon: Star,      label: '4.9 / 5 Rating',   sub: '2 Lakh+ Reviews' },
              { Icon: Users,     label: '50 Lakh+ Users',   sub: 'Across India' },
              { Icon: Briefcase, label: '50+ Insurers',     sub: 'LIC, HDFC, Star & more' },
            ].map(({ Icon, label, sub }, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <Icon className="w-6 h-6 text-teal-600 mb-1" />
                <span className="font-bold text-slate-800 text-sm">{label}</span>
                <span className="text-slate-400 text-xs">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SafeGuard */}
      <section className="py-24 px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">India's Smartest Insurance Platform</h2>
            <p className="text-slate-500 text-lg">
              Built with precision for the Indian market, trusted by millions for honest advice and zero commission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { Icon: Zap,           title: 'Instant Quotes',      desc: 'No agents, no spam calls. Real-time quotes from 50+ IRDAI-approved insurers in seconds.' },
              { Icon: Target,        title: 'AI Personalisation',  desc: 'Our AI considers your age, income, family size and health to recommend the perfect plan.' },
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Most Popular Insurance Plans</h2>
            <p className="text-slate-500 mb-8">Top-rated plans from IRDAI-approved Indian insurers selected by thousands of users this month.</p>
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
              recommended={true}
              price="1,199"
              provider="LIC of India"
              features={['1 Crore Sum Assured', '80C Tax Benefit', 'Critical Illness Rider', 'Return of Premium Option']}
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

      {/* Customer Reviews Section - RECENTERED */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-slate-500 text-lg mb-8">Trusted by over 50 Lakh+ users across India for honest advice and seamless claims.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {MOCK_REVIEWS.map((review, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:bg-white transition-all duration-300 group">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={cn("w-4 h-4 fill-current", j < review.rating ? "text-amber-400" : "text-slate-200")} />
                  ))}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed mb-8 italic">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="group inline-flex items-center gap-3 text-slate-900 font-bold hover:text-teal-600 transition-all">
              View More Reviews
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
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


