import React from 'react';
import Navbar from './components/layout/Navbar';
import PlanCard from './components/insurance/PlanCard';
import { Sparkles, ArrowRight, Zap, Target, LayoutDashboard } from 'lucide-react';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-accent text-sm font-bold mb-6 animate-pulse border border-teal-100">
              <Sparkles className="w-4 h-4" />
              AI-Powered Insurance Analysis
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight mb-8">
              Insurance that <span className="text-accent">Thinks</span> Like You.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
              Get personalized insurance recommendations in minutes with our smart advisor. 
              We analyze thousands of plans to find the one that fits your life perfectly.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-2xl shadow-primary/30 hover:bg-slate-800 transition-all flex items-center gap-2">
                Talk to AI Advisor <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Compare Plans
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 border border-teal-100">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Instant Quotes</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connect your accounts and get real-time price comparisons without long forms.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">AI Personalization</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our smart advisor identifies gaps in your coverage based on your lifestyle patterns.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Unified Dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Manage all your policies from different providers in one beautiful, simple place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Insurance Plans</h2>
            <p className="text-slate-500">Curated choices that offer the best value for modern needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PlanCard 
              title="Essential Health"
              type="health"
              price="120"
              features={['24/7 Virtual Care', 'Dental Coverage', 'HSA Compatible', 'Low Deductible']}
            />
            <PlanCard 
              title="Family Guardian+"
              type="life"
              recommended={true}
              price="85"
              features={['Term Life Coverage', 'Estate Planning', 'Funeral Expenses', 'Guaranteed Renewal']}
            />
            <PlanCard 
              title="Urban Dwelling"
              type="home"
              price="45"
              features={['Personal Property', 'Liability Protection', 'Fire & Theft', 'Electronics Rider']}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-white/10 p-2 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">SafeGuard AI</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">© 2024 SafeGuard Advisor. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Re-import missing Shield icon for footer
import { Shield } from 'lucide-react';

export default App;
