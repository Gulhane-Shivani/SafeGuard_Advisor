import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, HeartPulse, Car, Home, ChevronRight, CheckCircle2, Briefcase, User, Download, LayoutDashboard } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { PaymentGateway } from '../../components/PaymentGateway';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { jsPDF } from 'jspdf';
import API from '../../api/baseurl';

const CustomerPolicyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refresh } = useCustomer();
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, amount: '', policyName: '' });

  if (loading || !data) return <LoadingSpinner />;
  
  if (error || !data) {
    return (
      <CustomerLayout>
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Unable to load policy</h2>
          <p className="text-slate-500 mt-2">{error || 'Session expired. Please login again.'}</p>
          <button onClick={() => navigate('/customer/policies')} className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700">
            Back to Policies
          </button>
        </div>
      </CustomerLayout>
    );
  }
  
  const policy = data.policies.find((p: any) => String(p.id) === String(id) || p.policy_number === id);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const fileName = `${policy.title.replace(/\s+/g, '_')}_Document.pdf`;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(20, 158, 136); // Teal
    doc.text('SAFEGUARD ADVISOR', 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59); // Slate
    doc.text('POLICY DETAILS', 20, 45);

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
    doc.text(`Period: ${policy.start_date} to ${policy.end_date}`, 20, 115);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('This is a digitally generated document from SafeGuard Advisor Portal.', 20, 280);

    doc.save(fileName);
  };

  const handlePayNow = () => {
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
        method: 'Net Banking'
      });
      if (response.status === 200 || response.status === 201) {
        refresh();
      }
    } catch (err) {
      console.error('Failed to record payment:', err);
    }
  };

  if (!policy) {
    return (
      <CustomerLayout>
        <div className="text-center py-20">
          <Shield className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-600">Policy not found</h2>
          <button onClick={() => navigate('/customer/policies')} className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700">
            Back to Policies
          </button>
        </div>
      </CustomerLayout>
    );
  }

  const policyIcon = () => {
    if (policy.type.includes('Health')) return <HeartPulse className="w-10 h-10" />;
    if (policy.type.includes('Life'))   return <Shield className="w-10 h-10" />;
    if (policy.type.includes('Motor'))  return <Car className="w-10 h-10" />;
    return <Home className="w-10 h-10" />;
  };

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Back */}
        <button
          onClick={() => navigate('/customer/policies')}
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Policies
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  {policyIcon()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{policy.title}</h1>
                  <p className="text-slate-400 mt-1">{policy.id} • {policy.provider}</p>
                  <span className="inline-block mt-2 text-[10px] px-3 py-1 rounded-full font-bold bg-teal-500/20 text-teal-300">
                    {policy.status}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <button 
                  onClick={handleExportPDF}
                  className="px-6 py-2 border border-white/30 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Policy
                </button>
                <button 
                  onClick={handlePayNow}
                  className="px-6 py-2 bg-teal-500 rounded-xl font-bold text-sm hover:bg-teal-600 transition-all"
                >
                  {policy.status === 'Renewal Due' ? 'Renew Policy' : 'Pay Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Coverage */}
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-teal-600" /> Coverage Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {policy.coverage?.map((item: string) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" /> Benefits & Features
                </h2>
                <div className="space-y-3">
                  {policy.benefits?.map((item: string) => (
                    <div key={item} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <p className="text-sm text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Life Insurance extras */}
              {policy.type.includes('Life') && (
                <section className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                  <h2 className="text-lg font-bold text-blue-900 mb-6">Maturity & Loan Details</h2>
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: 'Cash Value',        value: (policy as any).cashValue },
                      { label: 'Surrender Value',   value: (policy as any).surrenderValue },
                      { label: 'Loan Eligibility',  value: (policy as any).loanEligibility },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Payment History */}
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-5">Premium Payment History</h2>
                <div className="bg-slate-50 rounded-2xl overflow-hidden">
                  {(data.payments || [])
                    .filter((p: any) => p.policy === policy.title)
                    .map((pay: any) => (
                    <div key={pay.transaction_id || pay.id} className="flex items-center justify-between p-5 border-b border-white last:border-0">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{pay.date}</p>
                        <p className="text-xs text-slate-400">{pay.method} • {pay.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{pay.amount}</p>
                        <p className="text-[10px] font-bold text-teal-600 uppercase">{pay.status}</p>
                      </div>
                    </div>
                  ))}
                  {((data.payments || []).filter((p: any) => p.policy === policy.title).length === 0) && (
                    <p className="text-sm text-slate-400 text-center py-8">No payment history found.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5">Policy Period</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { label: 'Start Date',      value: policy.start_date },
                    { label: 'End Date',        value: policy.end_date },
                    { label: 'Premium',         value: `${policy.premium}/mo` },
                    { label: 'Due Date',        value: policy.due_date },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-slate-200 pb-3 last:border-0">
                      <span className="text-slate-500">{row.label}</span>
                      <span className="font-bold text-slate-900">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100">
                <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Nominee
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{(policy as any).nominee || 'Sneha Kumar'}</p>
                    <p className="text-xs text-slate-500">Spouse</p>
                  </div>
                </div>
              </div>

              {/* Policy Documents */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Policy Documents</h3>
                <div className="space-y-2">
                  {['Policy Certificate', 'Premium Receipt', 'ID Card'].map(doc => (
                    <button key={doc} className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <span className="text-xs font-medium text-slate-700">{doc}</span>
                      <Download className="w-4 h-4 text-teal-600" />
                    </button>
                  ))}
                </div>
              </div>
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

export default CustomerPolicyDetail;
