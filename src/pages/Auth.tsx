import React, { useState } from 'react';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    // Mock login/signup logic
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ name: 'User', email: 'user@example.com' }));
    navigate('/dashboard');
    window.location.reload(); // Force navbar refresh
  };


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-teal-600 p-2.5 rounded-2xl shadow-lg shadow-teal-600/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SafeGuard AI</span>
        </Link>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          {/* Toggle */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-8 border border-white/10">
            {[true, false].map(login => (
              <button
                key={String(login)}
                onClick={() => setIsLogin(login)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  isLogin === login ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {login ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="space-y-5">

            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
              </div>
            )}

            {/* Login Method Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setUsePhone(false)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${!usePhone ? 'bg-white/10 border-white/20 text-white' : 'border-white/10 text-slate-500 hover:text-slate-300'}`}
              >
                Login with Email
              </button>
              <button
                onClick={() => setUsePhone(true)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${usePhone ? 'bg-white/10 border-white/20 text-white' : 'border-white/10 text-slate-500 hover:text-slate-300'}`}
              >
                Login with Mobile
              </button>
            </div>

            {usePhone ? (
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Phone className="w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <span className="text-xs font-bold text-slate-500 ml-1">+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="10-digit Mobile Number"
                  maxLength={10}
                  className="w-full pl-20 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
              </div>
            ) : (
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
              </div>
            )}

            {!usePhone && (
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {isLogin && !usePhone && (
              <div className="flex justify-end">
                <a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors">Forgot Password?</a>
              </div>
            )}

            <button 
              onClick={handleAuth}
              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              {usePhone ? 'Send OTP' : isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>


            <div className="relative flex items-center gap-4">
              <div className="flex-grow h-px bg-white/10" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">or</span>
              <div className="flex-grow h-px bg-white/10" />
            </div>

            <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
              {isLogin ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-slate-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Terms</a>
          {' '}&amp;{' '}
          <a href="#" className="text-slate-400 hover:text-white transition-colors font-medium">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
