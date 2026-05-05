import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Shield, TrendingUp,
  Edit2, Save, X, Award, Calendar, IndianRupee, CheckCircle, Camera
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { usePlatform } from '../../store/PlatformContext';
import { cn } from '../../utils/helpers';

const INITIAL_PROFILE = {
  name: 'Karan Agent',
  email: 'karan@safeguard.com',
  phone: '+91 98765-43200',
  dob: '1992-08-15',
  address: '42, MG Road, Andheri West',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400058',
  aadhaar: 'XXXX-XXXX-4321',
  pan: 'ABCDE1234F',
  licenseNumber: 'IRDAI-AG-2019-MH-004521',
  licenseExpiry: '2027-12-31',
  branch: 'Mumbai - Andheri',
  joiningDate: '2019-06-01',
  specialization: 'Life & Health Insurance',
  bio: 'Award-winning insurance advisor with 5+ years of experience helping individuals and families secure their financial future through comprehensive insurance planning.',
};

// Field component defined OUTSIDE to avoid re-creation on every render
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

const AgentProfile: React.FC = () => {
  const { data } = usePlatform();
  const agentId = 2;
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editProfile, setEditProfile] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const myPolicies = data.policies.filter(p => p.agentId === agentId);
  const myCommissions = data.commissions.filter(c => c.agentName === 'Karan Agent');
  const myLeads = data.leads.filter(l => l.assignedTo === agentId);
  const totalEarned = myCommissions.filter(c => c.status === 'Paid').length;

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
        title="My Profile"
        description="Manage your personal information, IRDAI credentials, and account preferences."
        actions={
          isEditing ? (
            <div className="flex items-center gap-3">
              <button onClick={handleCancel} className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 flex items-center gap-2">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-700 flex items-center gap-2 shadow-lg shadow-teal-600/20">
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 flex items-center gap-2">
              <Edit2 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          )
        }
      />

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-bold">
          <CheckCircle className="w-5 h-5 shrink-0" /> Profile updated successfully!
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Policies Managed', value: myPolicies.length, icon: Shield, color: 'bg-teal-50 text-teal-600' },
          { label: 'Active Leads', value: myLeads.length, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
          { label: 'Commissions Paid', value: totalEarned, icon: IndianRupee, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Years Active', value: '5+', icon: Award, color: 'bg-orange-50 text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 leading-none mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col items-center text-center space-y-4 relative overflow-hidden">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-5xl font-black border border-white/10">
              {profile.name.charAt(0)}
            </div>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center text-white hover:bg-teal-400 transition-all shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black">{profile.name}</h2>
            <p className="text-teal-400 font-bold text-sm mt-1">{profile.specialization}</p>
          </div>
          <div className="w-full space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-medium truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-medium">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-medium">{profile.branch}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-300 font-medium">Joined {profile.joiningDate}</span>
            </div>
          </div>
          <div className="w-full p-4 bg-teal-600/20 border border-teal-500/20 rounded-2xl text-left">
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-2">Commission Tier</p>
            <p className="font-black text-lg text-white">🥇 Gold Agent</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">15% base commission · ₹1L to Platinum</p>
          </div>
          <Shield className="absolute -right-16 -bottom-16 w-64 h-64 text-white/3 pointer-events-none" />
        </div>

        {/* Info Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 text-lg">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name" {...fieldProps('name')} />
              <Field label="Date of Birth" {...fieldProps('dob', 'date')} />
              <Field label="Email Address" {...fieldProps('email', 'email')} />
              <Field label="Mobile Number" {...fieldProps('phone')} />
              <div className="sm:col-span-2">
                <Field label="Address" {...fieldProps('address')} />
              </div>
              <Field label="City" {...fieldProps('city')} />
              <Field label="State" {...fieldProps('state')} />
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-black text-slate-900 text-lg">Professional & License Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="IRDAI License No." {...fieldProps('licenseNumber')} />
              <Field label="License Expiry" {...fieldProps('licenseExpiry', 'date')} />
              <Field label="PAN Number" {...fieldProps('pan')} />
              <Field label="Aadhaar (masked)" {...fieldProps('aadhaar')} />
              <Field label="Branch" {...fieldProps('branch')} />
              <Field label="Specialization" {...fieldProps('specialization')} />
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bio / Summary</label>
                {isEditing ? (
                  <textarea
                    value={editProfile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all text-sm font-medium text-slate-900 resize-none"
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
