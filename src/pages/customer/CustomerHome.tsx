import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, CreditCard, FileText, Clock, AlertCircle,
  Download, Plus, HeartPulse, Car, Home, Landmark, PhoneCall
} from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { cn } from '../../utils/helpers';
import { PaymentGateway } from '../../components/PaymentGateway';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import API from '../../api/baseurl';

const CustomerHome: React.FC = () => {
  const { data, loading, error, refresh } = useCustomer();
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, amount: '', policyName: '' });

  if (loading || !data) return <LoadingSpinner />;

  if (error || !data) return (
    <CustomerLayout>
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">Oops! Something went wrong</h2>
        <p className="text-slate-500 mt-2">{error || 'Could not load dashboard'}</p>
      </div>
    </CustomerLayout>
  );

  const handlePayNow = (policy: any) => {
    setPaymentModal({
      isOpen: true,
      amount: policy.premium,
      policyName: policy.title
    });
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await API.post('/customer/payments', {
        policy: paymentModal.policyName,
        amount: paymentModal.amount,
        method: 'UPI / QR'
      });
      if (response.status === 200 || response.status === 201) {
        refresh();
      }
    } catch (err) {
      console.error('Failed to record payment:', err);
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {data.profile.name}! 👋</h1>
            <p className="text-slate-500 mt-1">Here's a summary of your insurance portfolio.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/compare"
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
            >
              <Plus className="w-4 h-4" /> New Policy
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Policies',    value: data.stats.totalPolicies,   icon: Shield,   color: 'bg-blue-50 text-blue-600'   },
            { label: 'Total Sum Assured', value: data.stats.totalSumAssured, icon: Landmark, color: 'bg-purple-50 text-purple-600' },
            { label: 'Monthly Premium',   value: data.stats.totalPremium,    icon: CreditCard, color: 'bg-teal-50 text-teal-600'  },
            { label: 'Pending Claims',    value: data.stats.pendingClaims,   icon: FileText, color: 'bg-orange-50 text-orange-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Active Policies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Active Policies</h2>
                <Link to="/customer/policies" className="text-teal-600 text-sm font-bold hover:underline">View All →</Link>
              </div>
              <div className="space-y-3">
                {data.policies.filter((p: any) => p.status === 'Active' || p.status === 'Renewal Due').slice(0, 3).map((policy: any) => (
                  <div key={policy.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-teal-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        policy.type.includes('Health') ? 'bg-red-50 text-red-600' :
                        policy.type.includes('Life')   ? 'bg-blue-50 text-blue-600' :
                        policy.type.includes('Motor')  ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                      )}>
                        {policy.type.includes('Health') ? <HeartPulse className="w-6 h-6" /> :
                         policy.type.includes('Life')   ? <Shield className="w-6 h-6" /> :
                         policy.type.includes('Motor')  ? <Car className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{policy.title}</h3>
                        <p className="text-xs text-slate-500">{policy.policy_number} • {policy.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{policy.premium}</p>
                      <span className={cn('text-[10px] font-bold uppercase',
                        policy.status === 'Renewal Due' ? 'text-orange-600' : 'text-teal-600'
                      )}>{policy.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Pay Premium', icon: CreditCard, to: '/customer/payments' },
                  { label: 'Download ID', icon: Download,   to: '/customer/vault'    },
                  { label: 'File Claim',  icon: FileText,   to: '/customer/claims'   },
                  { label: 'Support',     icon: PhoneCall,  to: '/customer/support'  },
                ].map((action) => (
                  <Link key={action.label} to={action.to} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-center">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Upcoming Renewals */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" /> Upcoming Renewals
              </h3>
              {data.policies.filter((p: any) => p.status === 'Renewal Due').length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No renewals due soon.</p>
              ) : data.policies.filter((p: any) => p.status === 'Renewal Due').map((policy: any) => (
                <div key={policy.id} className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{policy.title}</p>
                      <p className="text-xs text-orange-700 mt-1">Due: {policy.due_date}</p>
                    </div>
                    <p className="text-sm font-bold">{policy.premium}</p>
                  </div>
                  <button 
                    onClick={() => handlePayNow(policy)}
                    className="block w-full py-2 bg-orange-600 text-white rounded-xl text-xs font-bold text-center hover:bg-orange-700 transition-colors"
                  >
                    Pay Now
                  </button>
                </div>
              ))}
            </div>

            {/* Pending Claims */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" /> Pending Claims
              </h3>
              {data.claims.filter((c: any) => c.status !== 'Settled').map((claim: any) => (
                <div key={claim.id} className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{claim.claim_number}</span>
                    <span className="text-[10px] font-bold text-blue-600">{claim.status}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-2">{claim.policy_title}</p>
                  <p className="text-xs text-slate-500">{claim.hospital || claim.reason}</p>
                  <div className="mt-3 bg-blue-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PaymentGateway 
        isOpen={paymentModal.isOpen}
        amount={paymentModal.amount}
        policyName={paymentModal.policyName}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        onSuccess={handlePaymentSuccess}
      />
    </CustomerLayout>
  );
};

export default CustomerHome;
