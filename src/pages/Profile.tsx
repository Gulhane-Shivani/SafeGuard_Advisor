import React, { useEffect } from 'react';
import { User, Mail, Phone, Calendar, Shield, LogOut, Settings, Bell, CreditCard, ChevronRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/helpers';
import { useAppStore } from '../store';

export const Profile: React.FC = () => {
  const { state, logout } = useAppStore();
  const userData = state.user || { name: 'User', email: 'user@example.com' };
  const navigate = useNavigate();

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

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-teal-600 to-blue-600" />
               <div className="relative pt-8">
                 <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-500 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                 </div>
                 <h2 className="text-xl font-bold text-slate-900">{userData.name}</h2>
                 <p className="text-slate-500 text-sm font-medium">{userData.email}</p>
                 <div className="mt-6 flex justify-center gap-2">
                   <div className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase rounded-full border border-teal-100">Verified User</div>
                   <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full border border-blue-100">Gold Member</div>
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-sm divide-y divide-slate-100">
              {[
                { label: 'Personal Info', Icon: User, active: true },
                { label: 'My Policies', Icon: Shield },
                { label: 'Saved Quotes', Icon: Shield },
                { label: 'Payments', Icon: CreditCard },
                { label: 'Notifications', Icon: Bell },
                { label: 'Settings', Icon: Settings },
              ].map((item, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                    item.active ? "bg-teal-50 text-teal-600" : "hover:bg-slate-50 text-slate-600"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.Icon className="w-5 h-5" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", item.active ? "text-teal-600" : "text-slate-300")} />
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">Log Out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
               <h3 className="text-2xl font-bold text-slate-900 mb-8">Personal Information</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 font-medium">
                     <User className="w-5 h-5 text-slate-400" />
                     {userData.name}
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 font-medium">
                     <Mail className="w-5 h-5 text-slate-400" />
                     {userData.email}
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Mobile Number</label>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 font-medium">
                     <Phone className="w-5 h-5 text-slate-400" />
                     +91 98765 43210
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Date of Birth</label>
                   <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 font-medium">
                     <Calendar className="w-5 h-5 text-slate-400" />
                     15 May 1995
                   </div>
                 </div>
               </div>

               <div className="mt-10 pt-8 border-t border-slate-100">
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                    Update Profile
                  </button>
               </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                 <h4 className="text-xl font-bold mb-2">Secure Your Account</h4>
                 <p className="text-blue-100 text-sm mb-6 max-w-md">Enable Two-Factor Authentication (2FA) for enhanced security on your insurance portal.</p>
                 <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg">
                   Enable 2FA
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
