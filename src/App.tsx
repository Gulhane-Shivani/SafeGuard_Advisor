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
import { CustomerProvider } from './store/CustomerContext';
import './styles/globals.css';

import { AppProvider } from './store';
import ScrollToTop from './utils/ScrollToTop';
import { Shield } from 'lucide-react';

// Platform Imports
import { PlatformProvider } from './store/PlatformContext';
import DashboardLayout from './layouts/DashboardLayout';
import SuperAdminOverview from './pages/super-admin/Overview';
import UserManagement from './pages/super-admin/UserManagement';
import MasterSettings from './pages/super-admin/Settings';
import Reports from './pages/super-admin/Reports';
import SystemConfig from './pages/super-admin/Config';
import AdminPolicies from './pages/super-admin/Policies';
import AdminRenewals from './pages/super-admin/Renewals';
import AdminPayments from './pages/super-admin/Payments';
import AdminNotifications from './pages/super-admin/Notifications';

import AdminOverview from './pages/admin/AdminOverview';
import LeadManagement from './pages/admin/LeadManagement';
import PolicyManagement from './pages/admin/PolicyManagement';
import TeamPerformance from './pages/admin/TeamPerformance';
import Customer360 from './pages/admin/Customer360';
import Approvals from './pages/admin/Approvals';
import CommissionView from './pages/admin/CommissionView';

import AgentOverview from './pages/agent/AgentOverview';
import MyLeads from './pages/agent/MyLeads';
import MyCustomers from './pages/agent/MyCustomers';
import QuoteGenerator from './pages/agent/QuoteGenerator';
import Tasks from './pages/agent/Tasks';
import AgentCommission from './pages/agent/AgentCommission';
import AgentProfile from './pages/agent/AgentProfile';

import CSROverview from './pages/csr/CSROverview';
import CustomerSearch from './pages/csr/CustomerSearch';
import ClaimsSupport from './pages/csr/ClaimsSupport';
import Renewals from './pages/csr/Renewals';
import TicketSystem from './pages/csr/TicketSystem';
import CommunicationLog from './pages/csr/CommunicationLog';

import ProtectedRoute from './components/auth/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const isPlatformPath = ['/super-admin', '/admin', '/agent', '/csr'].some(path => location.pathname.startsWith(path));
  const isAuthPath = location.pathname === '/auth';
  const isCustomerPath = location.pathname.startsWith('/customer');
  const hideLayout = isPlatformPath || isAuthPath || isCustomerPath;

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
          <Route path="/insurance/health" element={<HealthInsurance />} />
          <Route path="/insurance/life" element={<LifeInsurance />} />
          <Route path="/insurance/motor" element={<MotorInsurance />} />
          <Route path="/insurance/investment" element={<InvestmentInsurance />} />
          
          {/* Platform Routes */}
          <Route path="/super-admin/*" element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
              <PlatformProvider>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<SuperAdminOverview />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/settings" element={<MasterSettings />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/config" element={<SystemConfig />} />
                    <Route path="/policies" element={<AdminPolicies />} />
                    <Route path="/renewals" element={<AdminRenewals />} />
                    <Route path="/payments" element={<AdminPayments />} />
                    <Route path="/notifications" element={<AdminNotifications />} />
                  </Routes>
                </DashboardLayout>
              </PlatformProvider>
            </ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
              <PlatformProvider>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<AdminOverview />} />
                    <Route path="/leads" element={<LeadManagement />} />
                    <Route path="/policies" element={<PolicyManagement />} />
                    <Route path="/team" element={<TeamPerformance />} />
                    <Route path="/customers" element={<Customer360 />} />
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/commission" element={<CommissionView />} />
                  </Routes>
                </DashboardLayout>
              </PlatformProvider>
            </ProtectedRoute>
          } />

          <Route path="/agent/*" element={
            <ProtectedRoute allowedRoles={['AGENT']}>
              <PlatformProvider>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<AgentOverview />} />
                    <Route path="/leads" element={<MyLeads />} />
                    <Route path="/customers" element={<MyCustomers />} />
                    <Route path="/quote" element={<QuoteGenerator />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/commission" element={<AgentCommission />} />
                    <Route path="/profile" element={<AgentProfile />} />
                  </Routes>
                </DashboardLayout>
              </PlatformProvider>
            </ProtectedRoute>
          } />

          <Route path="/csr/*" element={
            <ProtectedRoute allowedRoles={['CSR']}>
              <PlatformProvider>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<CSROverview />} />
                    <Route path="/search" element={<CustomerSearch />} />
                    <Route path="/claims" element={<ClaimsSupport />} />
                    <Route path="/renewals" element={<Renewals />} />
                    <Route path="/tickets" element={<TicketSystem />} />
                    <Route path="/communication" element={<CommunicationLog />} />
                  </Routes>
                </DashboardLayout>
              </PlatformProvider>
            </ProtectedRoute>
          } />

          {/* Customer Portal Routes */}
          <Route path="/customer/*" element={
            <ProtectedRoute allowedRoles={['CUSTOMER']}>
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
            </ProtectedRoute>
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
