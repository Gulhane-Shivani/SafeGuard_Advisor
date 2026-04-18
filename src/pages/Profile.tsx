import React, { useEffect, useState } from 'react';
import { 
  User, Mail, Phone, Calendar, Shield, LogOut, Settings, 
  Bell, CreditCard, Camera, MapPin, 
  FileText, Activity, Lock, Wallet, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { useAppStore } from '../store';

export const Profile: React.FC = () => {
  const { state, logout } = useAppStore();
  const userData = state.user || { name: 'User', email: 'user@example.com' };
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal Info');

  useEffect(() => {
    if (!state.user) {
      navigate('/auth');
      return;
    }
  }, [state.user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Personal Info', Icon: User },
    { label: 'My Policies', Icon: Shield },
    { label: 'Saved Quotes', Icon: FileText },
    { label: 'Payments', Icon: CreditCard },
    { label: 'Notifications', Icon: Bell },
    { label: 'Security', Icon: Lock },
    { label: 'Settings', Icon: Settings },
  ];

  return (
    <div className="pt-16 pb-16 bg-slate-50/50 min-h-screen font-outfit">
      {/* Header Banner Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 via-blue-600/40 to-indigo-600/40 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative -mt-24">
          {/* User Profile Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-50 rounded-full blur-3xl -mr-24 -mt-24 opacity-40 px-4 py-3" />
            
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group shrink-0">
                <div className="w-32 h-32 rounded-[1.5rem] bg-slate-50 border-[4px] border-white shadow-lg overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <User className="w-12 h-12 text-slate-300" />
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-teal-600 text-white rounded-xl shadow-md hover:bg-teal-500 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left pb-2">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">{userData.name}</h1>
                  <div className="flex justify-center md:justify-start gap-1.5">
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[9px] font-black uppercase rounded-full border border-teal-100 tracking-wider">Verified</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-full border border-blue-100 tracking-wider">Premium</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-5 text-slate-500 font-bold text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>Mumbai, MH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Joined April 2024</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 pb-2">
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all flex items-center gap-2 group"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Navigation Tabs */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-[2rem] p-3 border border-slate-100 shadow-lg shadow-slate-200/20 sticky top-24">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all group",
                        activeTab === item.label 
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/20" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.Icon className={cn("w-4 h-4", activeTab === item.label ? "text-teal-400" : "text-slate-400 group-hover:text-slate-900")} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {activeTab === 'Personal Info' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
                  {/* Account Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Active Policies', value: '03', Icon: Shield, color: 'text-teal-600', bg: 'bg-teal-50' },
                      { label: 'Renewals Due', value: '01', Icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Wallet', value: '₹2,450', Icon: Wallet, color: 'text-slate-600', bg: 'bg-slate-50' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                          <stat.Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                          <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Personal Details Form */}
                  <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Personal Details</h3>
                        <p className="text-slate-500 text-xs font-bold">Manage your profile information</p>
                      </div>
                      <button className="px-4 py-2 border border-slate-200 text-slate-900 rounded-lg font-bold hover:bg-slate-900 hover:text-white transition-all text-xs">
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <DetailItem label="Full Name" value={userData.name} Icon={User} />
                      <DetailItem label="Email Address" value={userData.email} Icon={Mail} />
                      <DetailItem label="Phone Number" value="+91 98765 43210" Icon={Phone} />
                      <DetailItem label="Date of Birth" value="15 May 1995" Icon={Calendar} />
                      <DetailItem label="Permanent Address" value="Worli, Mumbai" Icon={MapPin} />
                      <DetailItem label="Account Status" value="Active / Premium" Icon={Activity} />
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 p-3 bg-teal-50/30 rounded-xl border border-teal-50 max-w-sm">
                        <Shield className="w-6 h-6 text-teal-600 shrink-0" />
                        <p className="text-[10px] font-bold text-slate-600 leading-tight">
                          Your data is protected with 256-bit encryption for IRDAI compliance.
                        </p>
                      </div>
                      <button className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/10 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Security Banner */}
                  <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 rounded-[2rem] p-8 text-white relative overflow-hidden group text-left">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-1000 group-hover:scale-110" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <Lock className="w-8 h-8 text-teal-400" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-black mb-1">Security Shield</h4>
                        <p className="text-white/70 font-bold text-xs mb-0 max-w-sm">
                          Enable biometric authentication and 2FA to prevent unauthorized access.
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-xs hover:bg-teal-50 transition-all shadow-xl shadow-slate-900/20 whitespace-nowrap">
                        Activate Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'Personal Info' && (
                <div className="bg-white rounded-[2rem] p-16 border border-slate-100 shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <Activity className="w-8 h-8 text-slate-200 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Coming Soon</h3>
                  <p className="text-slate-500 font-bold text-xs max-w-xs mx-auto mb-8">
                    We're building a seamless {activeTab.toLowerCase()} experience for you.
                  </p>
                  <button 
                    onClick={() => setActiveTab('Personal Info')}
                    className="px-6 py-2 bg-slate-100 text-slate-900 rounded-lg font-bold text-xs hover:bg-slate-200 transition-all"
                  >
                    Return
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, Icon }: { label: string, value: string, Icon: any }) => (
  <div className="group">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">{label}</label>
    <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 transition-all group-hover:bg-white group-hover:border-teal-100 group-hover:shadow-sm">
      <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-teal-600 shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-slate-900 font-bold text-xs tracking-tight truncate">{value}</span>
    </div>
  </div>
);
