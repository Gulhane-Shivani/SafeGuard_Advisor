import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, CheckCircle2 } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { CUSTOMER_DATA } from '../../data/mockCustomerData';

const CustomerPayments: React.FC = () => {
  const data = CUSTOMER_DATA;

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments & Renewals</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your premiums and view payment history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Upcoming Renewals</h3>
            <div className="space-y-4">
              {data.policies.filter(p => p.status === 'Renewal Due' || p.status === 'Active').map(policy => (
                <div key={policy.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{policy.title}</p>
                    <p className="text-xs text-slate-500 mt-1">Due: {policy.dueDate}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{policy.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{policy.premium}</p>
                    <button className="mt-2 px-4 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-all">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Payment History</h3>
            <div className="space-y-2">
              {data.payments.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{payment.policy}</p>
                      <p className="text-[10px] text-slate-400">{payment.date} • {payment.method} • {payment.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{payment.amount}</p>
                    <p className="text-[10px] font-bold text-teal-600 uppercase">{payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Pay Premium</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['UPI / QR', 'Debit / Credit Card', 'Net Banking', 'Wallets'].map((method, i) => (
              <button key={i} className="p-4 rounded-2xl border-2 border-slate-100 hover:border-teal-400 hover:bg-teal-50 transition-all text-center font-bold text-sm text-slate-700 hover:text-teal-700">
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-Debit */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Auto-Debit / ECS Status</h3>
              <p className="text-slate-400 text-sm mt-1">Premiums auto-debited via HDFC Bank. Next debit: 12 Dec 2024.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shrink-0">
            Manage Auto-Debit
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerPayments;
