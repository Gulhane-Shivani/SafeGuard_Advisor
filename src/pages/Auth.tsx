import React, { useState, useEffect } from 'react';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone, ArrowLeft, Key } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../api/baseurl';
import { useAppStore } from '../store';

export const Auth: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  
  // Reset password states
  const [verificationCode, setVerificationCode] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        const role = userData.role?.toUpperCase();
        let redirectPath = '/customer';
        if (role === 'SUPER_ADMIN') redirectPath = '/super-admin';
        else if (role === 'ADMIN') redirectPath = '/admin';
        else if (role === 'AGENT') redirectPath = '/agent';
        else if (role === 'CSR') redirectPath = '/csr';
        navigate(redirectPath, { replace: true });
      }
    }
  }, [navigate]);

  const handleAuth = async () => {
    setError('');
    setSuccess('');

    if (view === 'forgot') {
      if (!email) return setError('Email is required');
      setIsLoading(true);
      setTimeout(() => {
        setSuccess('Verification code sent to your email.');
        setView('reset');
        setIsLoading(false);
      }, 1000);
      return;
    }

    if (view === 'reset') {
      if (!verificationCode) return setError('Verification code is required');
      if (!oldPassword) return setError('Old password is required');
      if (!newPassword) return setError('New password is required');
      if (newPassword !== confirmPassword) return setError('New passwords do not match');
      
      setIsLoading(true);
      setTimeout(() => {
        setSuccess('Password changed successfully! Please login with your new password.');
        setView('login');
        setVerificationCode('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = view === 'login' ? '/login' : '/register';
      const payload: any = {};

      if (view === 'register') {
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

      const response = await API.post(endpoint, payload);

      if (view === 'register') {
        setSuccess('Account created successfully! Please sign in.');
        setView('login');
        setPassword('');
        setIsLoading(false);
        return;
      }

      const { user: userRes, access_token } = response.data;

      if (!userRes) {
        throw new Error('Server did not return user details.');
      }

      const displayName = (userRes.full_name && userRes.full_name !== 'Anonymous') 
        ? userRes.full_name 
        : (userRes.mobile || userRes.email?.split('@')[0] || 'User');

      const userData = {
        name: displayName,
        email: userRes.email || userRes.mobile,
        role: (userRes.role || 'CUSTOMER').toUpperCase()
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      
      let from = location.state?.from;
      if (!from || from === '/customer' || from === '/auth') {
        const role = userData.role;
        if (role === 'SUPER_ADMIN') from = '/super-admin';
        else if (role === 'ADMIN') from = '/admin';
        else if (role === 'AGENT') from = '/agent';
        else if (role === 'CSR') from = '/csr';
        else from = '/customer';
      }
      
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.response?.data?.detail || err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-8 pb-20 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-white transition-all font-bold group z-10"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-600 group-hover:border-teal-600 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span>Back to Home</span>
      </button>

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-teal-600 p-2.5 rounded-2xl shadow-lg shadow-teal-600/30">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SafeGuard Advisor</span>
        </Link>

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          {(view === 'login' || view === 'register') && (
            <div className="flex bg-white/5 rounded-2xl p-1 mb-8 border border-white/10">
              <button
                onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${view === 'login' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setView('register'); setError(''); setSuccess(''); }}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${view === 'register' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                Create Account
              </button>
            </div>
          )}

          {view === 'forgot' && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
              <p className="text-slate-400 text-sm">Enter your email to receive a verification code.</p>
            </div>
          )}

          {view === 'reset' && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-slate-400 text-sm">Enter verification code and your new password.</p>
            </div>
          )}

          <div className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center font-medium animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/50 text-teal-400 text-sm text-center font-medium">
                {success}
              </div>
            )}

            {view === 'register' && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
              </div>
            )}

            {/* Login Method Toggle */}
            {(view === 'login' || view === 'register') && (
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
            )}

            {(view === 'login' || view === 'register') ? (
              <>
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
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-20 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                    />
                  </div>
                ) : (
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              </>
            ) : view === 'forgot' ? (
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                />
              </div>
            ) : view === 'reset' ? (
              <>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    type={showVerificationCode ? 'text' : 'password'}
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                  />
                  <button
                    onClick={() => setShowVerificationCode(!showVerificationCode)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showVerificationCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                  />
                  <button
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600/50 transition-all"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </>
            ) : null}

            {view === 'login' && !usePhone && (
              <div className="flex justify-end">
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setView('forgot'); 
                    setError(''); 
                    setSuccess(''); 
                  }} 
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              onClick={handleAuth}
              disabled={isLoading}
              className={`w-full py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {view === 'login' ? (usePhone ? 'Send OTP' : 'Sign In') : view === 'register' ? 'Create Account' : view === 'forgot' ? 'Send Verification Code' : 'Change Password'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>


            {(view === 'login' || view === 'register') && (
              <div className="relative flex items-center gap-4">
                <div className="flex-grow h-px bg-white/10" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">or</span>
                <div className="flex-grow h-px bg-white/10" />
              </div>
            )}


          </div>

            <p className="text-center text-xs text-slate-500 mt-8">
              {view === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button onClick={() => { setView('register'); setError(''); setSuccess(''); }} className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
                    Sign up free
                  </button>
                </>
              ) : view === 'register' ? (
                <>
                  Already have an account?{' '}
                  <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Remember your password?{' '}
                  <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-teal-400 font-bold hover:text-teal-300 transition-colors">
                    Back to login
                  </button>
                </>
              )}
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
