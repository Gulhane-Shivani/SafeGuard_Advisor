import React, { useState } from 'react';
import { Shield, X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import API from '../../api/baseurl';
import { cn } from '../../utils/helpers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload: any = {};
      
      if (!isLogin) {
        if (!fullName) return setError('Full Name is required');
        payload.full_name = fullName;
      }
      
      if (usePhone) {
        if (!mobile) return setError('Mobile number is required');
        payload.mobile = mobile;
      } else {
        if (!email) return setError('Email is required');
        if (!password) return setError('Password is required');
        payload.email = email;
        payload.password = password;
      }

      await API.post(endpoint, payload);
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        name: fullName || mobile || email.split('@')[0], 
        email: email || mobile 
      }));
      
      onSuccess();
      onClose();
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* ModalContent */}
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-teal-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SafeGuard Advisor</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            {isLogin ? 'Sign in to access premium services.' : 'Join 50 Lakh+ users for expert advice.'}
          </p>

          {/* Toggle */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
            {[true, false].map(login => (
              <button
                key={String(login)}
                onClick={() => setIsLogin(login)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                  isLogin === login ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {login ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600/50 transition-all text-slate-900"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600/50 transition-all text-slate-900"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600/50 transition-all text-slate-900"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
