import React, { useState } from 'react';
import { Shield, CreditCard, Lock, CheckCircle2, X, Loader2 } from 'lucide-react';
import { cn } from '../utils/helpers';

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: string;
  policyName: string;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  policyName
}) => {
  const [step, setStep] = useState<'details' | 'pin' | 'processing' | 'success'>('details');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('pin');
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        // Reset for next time
        setStep('details');
        setCardData({ number: '', expiry: '', cvv: '' });
        setPin('');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-bold tracking-tight">SafeGuard SecurePay</span>
          </div>
          
          <div className="mt-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Premium Payment</p>
            <h2 className="text-2xl font-bold mt-1">{amount}</h2>
            <p className="text-sm text-slate-400 mt-1">{policyName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium"
                    value={cardData.number}
                    onChange={e => setCardData({ ...cardData, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Expiry Date</label>
                  <input
                    required
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-center"
                    value={cardData.expiry}
                    onChange={e => setCardData({ ...cardData, expiry: e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">CVV</label>
                  <input
                    required
                    type="password"
                    placeholder="***"
                    maxLength={3}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-center"
                    value={cardData.cvv}
                    onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 mt-4"
              >
                Proceed to Secure PIN
              </button>
            </form>
          )}

          {step === 'pin' && (
            <form onSubmit={handlePinSubmit} className="space-y-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Enter Card PIN</h3>
                <p className="text-sm text-slate-500 mt-1">Please enter your 4-digit secret PIN</p>
              </div>

              <input
                required
                autoFocus
                type="password"
                maxLength={4}
                placeholder="• • • •"
                className="w-32 mx-auto block text-2xl tracking-[1rem] text-center px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-bold"
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={pin.length < 4}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Pay {amount}
                </button>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-6">
              <Loader2 className="w-16 h-16 text-teal-600 animate-spin mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Processing Payment</h3>
                <p className="text-sm text-slate-500 mt-1">Verifying with your bank. Do not refresh.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Payment Successful!</h3>
                <p className="text-sm text-slate-500 mt-1">Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 mx-auto max-w-[280px]">
                <p className="text-xs text-teal-700 font-bold">Policy Renewal Initiated</p>
                <p className="text-[10px] text-teal-600 mt-1">Your policy status will be updated shortly.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PCI DSS Compliant • 256-bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
};
