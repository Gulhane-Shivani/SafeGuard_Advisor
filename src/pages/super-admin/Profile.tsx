import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Shield, TrendingUp,
  Edit2, Save, X, Award, Calendar, IndianRupee, CheckCircle, Camera,
  Settings, Lock, Bell
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const INITIAL_PROFILE = {
  name: 'Amit kale',
  email: 'admin@safeguard.com',
  phone: '+91 99887-76655',
  dob: '1985-05-20',
  address: 'Level 10, BKC Hub, Bandra East',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400051',
  employeeId: 'EMP-SA-001',
  joiningDate: '2020-01-01',
  role: 'Super Administrator',
  department: 'Executive Management',
  bio: 'Strategic leader with over 15 years of experience in insurance technology and platform management. Overseeing global operations and system integrity for SafeGuard Advisor.',
};

interface FieldProps {
  label: string;
  value: string;
  field: keyof typeof INITIAL_PROFILE;
  type?: string;
  isEditing: boolean;
  editValue: string;
  onChange: (field: keyof typeof INITIAL_PROFILE, value: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, value, field, type = 'text', isEditing, editValue, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    {isEditing ? (
      <input
        type={type}
        value={editValue}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all text-sm font-bold text-slate-900"
      />
    ) : (
      <p className="text-sm font-bold text-slate-900 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">{value || '—'}</p>
    )}
  </div>
);

const SuperAdminProfile: React.FC = () => {
  const { data } = usePlatform();
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editProfile, setEditProfile] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (field: keyof typeof INITIAL_PROFILE, value: string) => {
    setEditProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const fieldProps = (field: keyof typeof INITIAL_PROFILE, type = 'text') => ({
    field,
    type,
    isEditing,
    value: profile[field],
    editValue: editProfile[field],
    onChange: handleChange,
  });

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Super Admin Profile"
        description="Manage your administrative credentials, personal details, and security settings."
        actions={
          isEditing ? (
            <div className="flex items-center gap-3">
              <button onClick={handleCancel} className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 flex items-center gap-2 transition-all">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 flex items-center gap-2 shadow-lg shadow-teal-600/20 transition-all">
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 flex items-center gap-2 transition-all shadow-xl shadow-slate-900/10">
              <Edit2 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          )
        }
      />

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 shrink-0" /> Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-teal-500/20 to-teal-500/5 text-teal-400 flex items-center justify-center text-5xl font-black border border-white/10 group-hover:scale-105 transition-transform duration-500">
                {profile.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-white hover:bg-teal-400 transition-all shadow-xl">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-black">{profile.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-500/10">
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="w-full space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-slate-300 font-medium truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-slate-300 font-medium">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-slate-300 font-medium">{profile.city}, {profile.state}</span>
              </div>
            </div>

            <div className="w-full p-5 bg-gradient-to-br from-teal-600/20 to-teal-900/20 border border-teal-500/20 rounded-3xl text-left relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">System Access</p>
                  <p className="font-black text-lg text-white">Full Privileges</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-teal-500/20 flex items-center justify-center text-[8px] font-black">
                          {i}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">Multi-factor enabled</p>
                  </div>
               </div>
               <Shield className="absolute -right-8 -bottom-8 w-24 h-24 text-teal-500/5 rotate-12" />
            </div>

            <Shield className="absolute -left-20 -top-20 w-64 h-64 text-white/[0.02] pointer-events-none rotate-45" />
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">System Responsibility</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Users', value: data.users.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Active Policies', value: data.policies.length, color: 'text-teal-600', bg: 'bg-teal-50' },
                { label: 'System Logs', value: '1.2k+', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                  <span className="text-xs font-bold text-slate-500">{stat.label}</span>
                  <span className={cn("text-sm font-black", stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tabs & Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Custom Tabs */}
          <div className="flex p-1.5 bg-white border border-slate-100 rounded-2xl w-fit shadow-sm">
            {[
              { id: 'personal', label: 'Personal Details', icon: User },
              { id: 'professional', label: 'Professional', icon: Award },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all",
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'personal' && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Personal Information</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Basic profile data</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Full Name" {...fieldProps('name')} />
                  <Field label="Date of Birth" {...fieldProps('dob', 'date')} />
                  <Field label="Email Address" {...fieldProps('email', 'email')} />
                  <Field label="Mobile Number" {...fieldProps('phone')} />
                  <div className="sm:col-span-2">
                    <Field label="Residential Address" {...fieldProps('address')} />
                  </div>
                  <Field label="City" {...fieldProps('city')} />
                  <Field label="State" {...fieldProps('state')} />
                  <Field label="Pincode" {...fieldProps('pincode')} />
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Work & Credentials</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Employment details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Employee ID" {...fieldProps('employeeId')} />
                  <Field label="Role Title" {...fieldProps('role')} />
                  <Field label="Department" {...fieldProps('department')} />
                  <Field label="Joining Date" {...fieldProps('joiningDate', 'date')} />
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative Bio</label>
                    {isEditing ? (
                      <textarea
                        value={editProfile.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all text-sm font-medium text-slate-900 resize-none"
                      />
                    ) : (
                      <p className="text-sm font-medium text-slate-700 bg-slate-50 px-5 py-4 rounded-[1.5rem] border border-slate-100 leading-relaxed italic">
                        "{profile.bio}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">System Security</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Manage access & protection</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Change Password', desc: 'Last changed 3 months ago', action: 'Update' },
                    { title: 'Two-Factor Authentication', desc: 'Active via Google Authenticator', action: 'Configure' },
                    { title: 'Login Sessions', desc: '3 active sessions across devices', action: 'Manage' },
                    { title: 'API Access Keys', desc: 'Used for system integrations', action: 'Generate' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all group">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{item.desc}</p>
                      </div>
                      <button className="px-4 py-2 bg-white text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Alert Preferences</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Stay updated on system activity</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'System Alerts', desc: 'Critical errors and system downtime notifications', enabled: true },
                    { title: 'New User Registration', desc: 'Alert when new staff or agents join', enabled: true },
                    { title: 'Daily Business Summary', desc: 'Consolidated report of daily performance', enabled: false },
                    { title: 'Security Notifications', desc: 'Alerts on suspicious login attempts', enabled: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{item.desc}</p>
                      </div>
                      <button 
                        className={cn(
                          "w-12 h-6 rounded-full relative transition-all duration-300",
                          item.enabled ? "bg-teal-600" : "bg-slate-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                          item.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile;
