import React, { useEffect, useState } from 'react';
import { 
  User, Mail, Phone, Calendar, Shield, LogOut, Settings, 
  Bell, CreditCard, ChevronRight, Camera, MapPin, 
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
    <div className="pt-20 pb-20 bg-slate-50/50 min-h-screen font-outfit">
      {/* Header Banner Section */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 via-blue-600/40 to-indigo-600/40 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <div className="relative -mt-32">
          {/* User Profile Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
            
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group shrink-0">
                <div className="w-40 h-40 rounded-[2.5rem] bg-slate-100 border-[6px] border-white shadow-xl overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <User className="w-16 h-16 text-slate-300" />
                </div>
                <button className="absolute bottom-2 right-2 p-3 bg-teal-600 text-white rounded-2xl shadow-lg hover:bg-teal-500 transition-all hover:scale-110 active:scale-95">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{userData.name}</h1>
                  <div className="flex justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase rounded-full border border-teal-100 tracking-widest">Verified</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full border border-blue-100 tracking-widest">Premium Member</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal-600" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Mumbai, MH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Member since April 2024</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 pb-4">
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center gap-2 group"
                >
                  <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navigation Tabs */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/30 sticky top-24">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveTab(item.label)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-[1.5rem] font-bold text-sm transition-all relative overflow-hidden group",
                        activeTab === item.label 
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.Icon className={cn("w-5 h-5", activeTab === item.label ? "text-teal-400" : "text-slate-400 group-hover:text-slate-900")} />
                      {item.label}
                      {activeTab === item.label && (
                        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-teal-400" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {activeTab === 'Personal Info' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                  {/* Account Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Active Policies', value: '03', Icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Upcoming Renewals', value: '01', Icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Wallet Balance', value: '₹2,450', Icon: Wallet, color: 'text-teal-600', bg: 'bg-teal-50' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                          <stat.Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Personal Details Form */}
                  <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Personal Details</h3>
                        <p className="text-slate-500 text-sm font-medium">Manage your contact information and identity details</p>
                      </div>
                      <button className="px-6 py-2 border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all text-sm">
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <DetailItem label="Full Name" value={userData.name} Icon={User} />
                      <DetailItem label="Email Address" value={userData.email} Icon={Mail} />
                      <DetailItem label="Phone Number" value="+91 98765 43210" Icon={Phone} />
                      <DetailItem label="Date of Birth" value="15 May 1995" Icon={Calendar} />
                      <DetailItem label="Permanent Address" value="23rd Floor, Ocean View Tower, Worli, Mumbai" Icon={MapPin} />
                      <DetailItem label="Account Status" value="Active / Premium" Icon={Activity} />
                    </div>

                    <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 p-4 bg-teal-50/50 rounded-2xl border border-teal-50 max-w-md">
                        <Shield className="w-8 h-8 text-teal-600 shrink-0" />
                        <p className="text-xs font-medium text-slate-600">
                          Your data is protected with 256-bit encryption and is only used for IRDAI compliance.
                        </p>
                      </div>
                      <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Security Banner */}
                  <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0">
                        <Lock className="w-10 h-10" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-2xl font-bold mb-2">Advance Security Shield</h4>
                        <p className="text-white/80 font-medium mb-0 max-w-lg">
                          Enable biometric authentication and Two-Factor security to prevent unauthorized access to your policies and claims.
                        </p>
                      </div>
                      <button className="px-8 py-4 bg-white text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-xl shadow-slate-900/20 whitespace-nowrap">
                        Activate Shield
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'Personal Info' && (
                <div className="bg-white rounded-[2.5rem] p-20 border border-slate-100 shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
                    <Activity className="w-10 h-10 text-slate-300 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Module Coming Soon</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
                    We're building a seamless {activeTab.toLowerCase()} experience for you. You'll be notified as soon as it's ready!
                  </p>
                  <button 
                    onClick={() => setActiveTab('Personal Info')}
                    className="px-8 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Back to Profile
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
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1 mb-3 block">{label}</label>
    <div className="flex items-center gap-4 p-4.5 bg-slate-50/50 rounded-[1.25rem] border border-slate-100 transition-all group-hover:bg-white group-hover:border-teal-200 group-hover:shadow-lg group-hover:shadow-teal-600/5">
      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-slate-900 font-bold tracking-tight">{value}</span>
    </div>
  </div>
);
