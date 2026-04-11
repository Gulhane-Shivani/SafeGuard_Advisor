import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Advisor } from './pages/Advisor';
import { Compare } from './pages/Compare';
import { Claims } from './pages/Claims';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { ContactUs } from './pages/ContactUs';
import HealthInsurance from './pages/insurance/HealthInsurance';
import LifeInsurance from './pages/insurance/LifeInsurance';
import MotorInsurance from './pages/insurance/MotorInsurance';
import InvestmentInsurance from './pages/insurance/InvestmentInsurance';
import './styles/globals.css';

import { AppProvider } from './store';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />


        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/insurance/health" element={<HealthInsurance />} />
            <Route path="/insurance/life" element={<LifeInsurance />} />
            <Route path="/insurance/motor" element={<MotorInsurance />} />
            <Route path="/insurance/investment" element={<InvestmentInsurance />} />
          </Routes>
        </main>


        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-teal-600 p-2 rounded-xl text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SafeGuard AI</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">Â© 2024 SafeGuard Advisor. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-slate-400 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
    </AppProvider>
  );
}


import { Shield } from 'lucide-react';

export default App;

