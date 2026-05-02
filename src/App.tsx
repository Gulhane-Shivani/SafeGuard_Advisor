import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Advisor } from './pages/Advisor';
import { Compare } from './pages/Compare';
import { Claims } from './pages/Claims';
import CustomerHome from './pages/customer/CustomerHome';
import CustomerPolicies from './pages/customer/CustomerPolicies';
import CustomerPolicyDetail from './pages/customer/CustomerPolicyDetail';
import CustomerPayments from './pages/customer/CustomerPayments';
import CustomerClaims from './pages/customer/CustomerClaims';
import CustomerServiceRequests from './pages/customer/CustomerServiceRequests';
import CustomerDocumentVault from './pages/customer/CustomerDocumentVault';
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerPolicyLoan from './pages/customer/CustomerPolicyLoan';
import CustomerSupport from './pages/customer/CustomerSupport';
import { Auth } from './pages/Auth';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { ContactUs } from './pages/ContactUs';
import HealthInsurance from './pages/insurance/HealthInsurance';
import LifeInsurance from './pages/insurance/LifeInsurance';
import MotorInsurance from './pages/insurance/MotorInsurance';
import InvestmentInsurance from './pages/insurance/InvestmentInsurance';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CustomerProvider } from './store/CustomerContext';
import './styles/globals.css';

import { AppProvider } from './store';
import ScrollToTop from './utils/ScrollToTop';
import { Shield } from 'lucide-react';

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPath = location.pathname === '/auth';
  const isCustomerPath = location.pathname.startsWith('/customer');
  const hideLayout = isAdminPath || isAuthPath || isCustomerPath;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/insurance/health" element={<HealthInsurance />} />
          <Route path="/insurance/life" element={<LifeInsurance />} />
          <Route path="/insurance/motor" element={<MotorInsurance />} />
          <Route path="/insurance/investment" element={<InvestmentInsurance />} />
          {/* Customer Portal Routes */}
          <Route path="/customer/*" element={
            <CustomerProvider>
              <Routes>
                <Route path="/" element={<CustomerHome />} />
                <Route path="/policies" element={<CustomerPolicies />} />
                <Route path="/policies/:id" element={<CustomerPolicyDetail />} />
                <Route path="/payments" element={<CustomerPayments />} />
                <Route path="/claims" element={<CustomerClaims />} />
                <Route path="/requests" element={<CustomerServiceRequests />} />
                <Route path="/vault" element={<CustomerDocumentVault />} />
                <Route path="/profile" element={<CustomerProfile />} />
                <Route path="/loan" element={<CustomerPolicyLoan />} />
                <Route path="/support" element={<CustomerSupport />} />
              </Routes>
            </CustomerProvider>
          } />
        </Routes>
      </main>

      {!hideLayout && (
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-teal-600 p-2 rounded-xl text-white">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SafeGuard Advisor</span>
            </div>
            <p className="text-slate-400 text-sm mb-8">© 2024 SafeGuard Advisor. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-slate-400 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
