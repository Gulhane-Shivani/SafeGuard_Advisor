import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HeartPulse, Car, Home, Download, Search } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { cn } from '../../utils/helpers';
import { PaymentGateway } from '../../components/PaymentGateway';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { jsPDF } from 'jspdf';

const CustomerPolicies: React.FC = () => {
  const { data, loading, error } = useCustomer();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, amount: '', policyName: '' });
  const navigate = useNavigate();

  if (loading || !data) return <LoadingSpinner />;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  const handleExportPDF = (policy: any) => {
    const doc = new jsPDF();
    const fileName = `${policy.title.replace(/\s+/g, '_')}_Document.pdf`;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(20, 158, 136); // Teal
    doc.text('SAFEGUARD ADVISOR', 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59); // Slate
    doc.text('POLICY CERTIFICATE', 20, 45);

    // Separator
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 50, 190, 50);

    // Content
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105);
    doc.text(`Policy Title: ${policy.title}`, 20, 65);
    doc.text(`Policy Number: ${policy.policy_number || policy.id}`, 20, 75);
    doc.text(`Provider: ${policy.provider}`, 20, 85);
    doc.text(`Status: ${policy.status}`, 20, 95);
    doc.text(`Premium: ${policy.premium}`, 20, 105);
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 20, 115);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('This is a digitally generated document from SafeGuard Advisor Portal.', 20, 280);

    doc.save(fileName);
  };

  const handlePayNow = (policy: any) => {
    setPaymentModal({
      isOpen: true,
      amount: policy.premium,
      policyName: policy.title
    });
  };

  const filtered = data.policies.filter((p: any) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const policyIcon = (type: string) => {
    if (type.includes('Health')) return <HeartPulse className="w-8 h-8" />;
    if (type.includes('Life'))   return <Shield className="w-8 h-8" />;
    if (type.includes('Motor'))  return <Car className="w-8 h-8" />;
    return <Home className="w-8 h-8" />;
  };

  const policyColor = (type: string) => {
    if (type.includes('Health')) return 'bg-red-50 text-red-600';
    if (type.includes('Life'))   return 'bg-blue-50 text-blue-600';
    if (type.includes('Motor'))  return 'bg-orange-50 text-orange-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <CustomerLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Policies</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all your insurance policies in one place.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search policies..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 w-full"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['All', 'Active', 'Renewal Due', 'Expired'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                filter === f ? 'bg-teal-600 text-white shadow' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Policy Cards */}
        <div className="space-y-4">
          {filtered.map((policy: any) => (
            <div key={policy.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0', policyColor(policy.type))}>
                    {policyIcon(policy.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{policy.title}</h3>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-bold',
                        policy.status === 'Active'       ? 'bg-teal-50 text-teal-600' :
                        policy.status === 'Renewal Due'  ? 'bg-orange-50 text-orange-600' :
                                                           'bg-slate-100 text-slate-500'
                      )}>
                        {policy.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{policy.id} • {policy.provider}</p>
                    <div className="flex flex-wrap gap-6 mt-3 text-xs">
                      <div><span className="text-slate-400">Type:</span> <span className="font-bold text-slate-700 ml-1">{policy.type}</span></div>
                      <div><span className="text-slate-400">Sum Assured:</span> <span className="font-bold text-slate-700 ml-1">{policy.sum_assured}</span></div>
                      <div><span className="text-slate-400">Premium:</span> <span className="font-bold text-slate-700 ml-1">{policy.premium}/mo</span></div>
                      <div><span className="text-slate-400">Due:</span> <span className="font-bold text-slate-700 ml-1">{policy.due_date}</span></div>
                      <div><span className="text-slate-400">Start:</span> <span className="font-bold text-slate-700 ml-1">{policy.start_date}</span></div>
                      <div><span className="text-slate-400">End:</span> <span className="font-bold text-slate-700 ml-1">{policy.end_date}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:flex-col xl:flex-row shrink-0">
                  <button
                    onClick={() => navigate('/customer/policies/' + policy.id)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleExportPDF(policy)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" /> Export
                  </button>
                  {policy.status === 'Renewal Due' && (
                    <button 
                      onClick={() => handlePayNow(policy)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors"
                    >
                      Renew Now
                    </button>
                  )}
                  {policy.status === 'Active' && (
                    <button 
                      onClick={() => handlePayNow(policy)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No policies found.</p>
            </div>
          )}
        </div>
      </div>

      <PaymentGateway 
        isOpen={paymentModal.isOpen}
        amount={paymentModal.amount}
        policyName={paymentModal.policyName}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        onSuccess={() => {
          // Success handled in gateway, maybe trigger a toast or refresh here
        }}
      />
    </CustomerLayout>
  );
};

export default CustomerPolicies;
