import React, { useState } from 'react';
import { User, Landmark, ChevronRight } from 'lucide-react';
import CustomerLayout from './CustomerLayout';
import { useCustomer } from '../../store/CustomerContext';
import { useSearch } from '../../store/SearchContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';

import { ProfileUpdateModal } from '../../components/ProfileUpdateModal';
import { NomineeUpdateModal } from '../../components/NomineeUpdateModal';
import { BankUpdateModal } from '../../components/BankUpdateModal';
import { SecurityUpdateModal } from '../../components/SecurityUpdateModal';

const CustomerProfile: React.FC = () => {
  const { data, loading, updateProfile, updateNominee, updateBankDetails } = useCustomer();
  const { searchQuery } = useSearch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNomineeOpen, setIsNomineeOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [securityType, setSecurityType] = useState<'Change Password' | 'Set Security PIN' | 'Two-Factor Auth' | null>(null);

  const [notifications, setNotifications] = useState({ Email: true, SMS: true, WhatsApp: true });

  if (loading || !data) return <LoadingSpinner />;

  const handleUpdateSubmit = (updatedData: any) => {
    updateProfile(updatedData);
    setIsEditOpen(false);
  };



  const toggle = (key: keyof typeof notifications) =>
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSecurityAction = (action: string) => {
    setSecurityType(action as any);
    setIsSecurityOpen(true);
  };

  const user = data.profile;

  const q = searchQuery.toLowerCase();
  const matchSection = (texts: any[]) => {
    if (!q) return true;
    return texts.some(t => String(t).toLowerCase().includes(q));
  };

  const matchRow = (row: {label: string, value?: string}, sectionTitle: string) => {
    if (!q) return true;
    if (sectionTitle.toLowerCase().includes(q)) return true;
    return String(row.label).toLowerCase().includes(q) || (row.value && String(row.value).toLowerCase().includes(q));
  };

  const showPersonalInfo = matchSection(['personal information', user.name, user.dob, user.email, user.phone, user.address]);
  const showNominee = matchSection(['nominee details', data.nominee.name, data.nominee.relation, data.nominee.dob]);
  const showBank = matchSection(['bank account details', data.bankDetails.bankName, data.bankDetails.accountNumber, data.bankDetails.accountName, data.bankDetails.ifsc]);
  const showSecurity = matchSection(['security', 'change password', 'set security pin', 'two-factor auth']);
  const showNotifications = matchSection(['notification preferences', 'email', 'sms', 'whatsapp']);

  return (
    <CustomerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile & Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal details and preferences.</p>
        </div>

        {/* Profile Hero */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-teal-500 flex items-center justify-center text-3xl font-bold shrink-0">
            {user.name.split(' ').map((n: any) => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-400 mt-1">{user.email}</p>
            <p className="text-slate-400 text-sm">{user.phone}</p>
            <span className="inline-block mt-3 text-[10px] px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-bold uppercase tracking-widest">
              Premium Member
            </span>
          </div>
          <button 
            onClick={() => setIsEditOpen(true)}
            className="sm:ml-auto px-5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            {showPersonalInfo && (
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" /> Personal Information
                </h3>
                <button 
                  onClick={() => setIsEditOpen(true)}
                  className="text-teal-600 text-sm font-bold hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name',      value: user.name },
                  { label: 'Date of Birth',  value: user.dob },
                  { label: 'Email Address',  value: user.email },
                  { label: 'Mobile Number',  value: user.phone },
                ].filter(row => matchRow(row, 'personal information')).map(row => (
                  <div key={row.label}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                ))}
                {matchRow({ label: 'Address', value: user.address }, 'personal information') && (
                  <div className="sm:col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm font-bold text-slate-900">{user.address}</p>
                  </div>
                )}
              </div>
            </section>
            )}

            {/* Nominee */}
            {showNominee && (
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" /> Nominee Details
                </h3>
                <button 
                  onClick={() => setIsNomineeOpen(true)}
                  className="text-purple-600 text-sm font-bold hover:underline"
                >
                  Update
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Name',        value: data.nominee.name },
                  { label: 'Relation',    value: data.nominee.relation },
                  { label: 'Date of Birth', value: data.nominee.dob },
                ].filter(row => matchRow(row, 'nominee details')).map(row => (
                  <div key={row.label}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Bank Details */}
            {showBank && (
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-600" /> Bank Account Details
                </h3>
                <button 
                  onClick={() => setIsBankOpen(true)}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Bank Name',       value: data.bankDetails.bankName },
                  { label: 'Account Number',  value: data.bankDetails.accountNumber },
                  { label: 'Account Holder',  value: data.bankDetails.accountName },
                  { label: 'IFSC Code',       value: data.bankDetails.ifsc },
                ].filter(row => matchRow(row, 'bank account details')).map(row => (
                  <div key={row.label}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                ))}
              </div>
            </section>
            )}
          </div>

          {/* Right */}
          <div className="space-y-8">
            {/* Security */}
            {showSecurity && (
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5">Security</h3>
              <div className="space-y-3">
                {['Change Password', 'Set Security PIN', 'Two-Factor Auth']
                  .filter(item => matchRow({ label: item }, 'security'))
                  .map(item => (
                  <button 
                    key={item} 
                    onClick={() => handleSecurityAction(item)}
                    className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </section>
            )}

            {/* Notifications */}
            {showNotifications && (
            <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5">Notification Preferences</h3>
              <div className="space-y-5">
                {(Object.keys(notifications) as (keyof typeof notifications)[])
                  .filter(pref => matchRow({ label: pref, value: 'updates' }, 'notification preferences'))
                  .map(pref => (
                  <div key={pref} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">{pref} Updates</span>
                    <button
                      onClick={() => toggle(pref)}
                      className={`w-11 h-6 rounded-full relative transition-colors ${notifications[pref] ? 'bg-teal-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notifications[pref] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
            )}
          </div>
        </div>
      </div>

      <ProfileUpdateModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdateSubmit}
        currentData={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          dob: user.dob
        }}
      />

      <NomineeUpdateModal
        isOpen={isNomineeOpen}
        onClose={() => setIsNomineeOpen(false)}
        onSubmit={(updatedData) => {
          updateNominee(updatedData);
          setIsNomineeOpen(false);
        }}
        currentData={data.nominee}
      />

      <BankUpdateModal
        isOpen={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        onSubmit={(updatedData) => {
          updateBankDetails(updatedData);
          setIsBankOpen(false);
        }}
        currentData={data.bankDetails}
      />

      <SecurityUpdateModal
        isOpen={isSecurityOpen}
        onClose={() => {
          setIsSecurityOpen(false);
          setSecurityType(null);
        }}
        type={securityType}
      />
    </CustomerLayout>
  );
};

export default CustomerProfile;
