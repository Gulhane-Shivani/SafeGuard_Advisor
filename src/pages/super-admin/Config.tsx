
import React, { useState } from 'react';
import { 
  Bell, Lock, Database, Globe, 
  Cpu, Smartphone, Zap, CheckCircle2,
  RefreshCw, Save
} from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { cn } from '../../utils/helpers';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SECURITY_KEYS = ['mfa', 'ipWhitelist', 'forcePassword', 'sessionTimeout'] as const;

const SystemConfig: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    browser: true
  });

  const [security, setSecurity] = useState({
    mfa: true,
    ipWhitelist: false,
    forcePassword: true,
    sessionTimeout: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(15, 118, 110); // teal
      doc.text('SafeGuard Advisor', 14, 18);
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text('System Configuration Report', 14, 26);
      doc.setFontSize(9);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 33);

      autoTable(doc, {
        startY: 40,
        head: [['Security Setting', 'Status']],
        body: [
          ['Multi-Factor Authentication (MFA)', security.mfa ? 'Enabled' : 'Disabled'],
          ['IP Whitelisting', security.ipWhitelist ? 'Enabled' : 'Disabled'],
          ['Force Password Change', security.forcePassword ? 'Enabled' : 'Disabled'],
          ['Session Timeout', security.sessionTimeout ? 'Enabled' : 'Disabled'],
        ],
        headStyles: { fillColor: [15, 118, 110] },
        styles: { fontSize: 10 },
      });

      const afterSecurity = (doc as any).lastAutoTable.finalY + 10;

      autoTable(doc, {
        startY: afterSecurity,
        head: [['Notification Channel', 'Status']],
        body: [
          ['Email Notifications', notifications.email ? 'Active' : 'Inactive'],
          ['SMS Gateway', notifications.sms ? 'Active' : 'Inactive'],
          ['WhatsApp API', notifications.whatsapp ? 'Active' : 'Inactive'],
          ['In-App Alerts', notifications.browser ? 'Active' : 'Inactive'],
        ],
        headStyles: { fillColor: [15, 118, 110] },
        styles: { fontSize: 10 },
      });

      doc.save(`safeguard_config_${new Date().toISOString().split('T')[0]}.pdf`);
    }, 1200);
  };

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      const sqlContent = `-- SafeGuard Advisor Full Database Backup
-- Generated: ${new Date().toISOString()}
-- Version: 1.0.0

CREATE DATABASE IF NOT EXISTS safeguard_db;
USE safeguard_db;

-- Table structure for \`users\`
CREATE TABLE \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`role\` varchar(50) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table \`users\`
INSERT INTO \`users\` (\`name\`, \`role\`) VALUES ('Super Admin', 'SUPER_ADMIN');
INSERT INTO \`users\` (\`name\`, \`role\`) VALUES ('Shivani Gulhane', 'AGENT');

-- Backup completed successfully
`;
      const blob = new Blob([sqlContent], { type: 'application/sql' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safeguard_backup_${new Date().toISOString().split('T')[0]}.sql`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const securityItems = [
    { key: 'mfa' as const, label: 'Multi-Factor Authentication (MFA)', desc: 'Require code from authenticator app for staff login' },
    { key: 'ipWhitelist' as const, label: 'IP Whitelisting', desc: 'Restrict admin access to specific office network IPs' },
    { key: 'forcePassword' as const, label: 'Force Password Change', desc: 'Require users to change passwords every 90 days' },
    { key: 'sessionTimeout' as const, label: 'Session Timeout', desc: 'Automatically logout inactive users after 30 minutes' },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader 
        title="System Administration" 
        description="Global system settings, security protocols, notification preferences, and database management."
        actions={
          <button 
            onClick={handleSaveAll}
            disabled={isSaving}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 disabled:opacity-60",
              saveSuccess
                ? "bg-teal-500 text-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            {isSaving
              ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</>
              : saveSuccess
              ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
              : <><Save className="w-4 h-4" /> Save All Changes</>
            }
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Settings */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                 <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Security &amp; Authentication</h3>
           </div>
           
           <div className="space-y-4">
              {securityItems.map((s) => (
                 <div key={s.key} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                       <p className="text-sm font-bold text-slate-900">{s.label}</p>
                       <p className="text-[10px] text-slate-500 font-medium">{s.desc}</p>
                    </div>
                    <div 
                      onClick={() => setSecurity({...security, [s.key]: !security[s.key]})}
                      className={cn(
                        "w-12 h-6 rounded-full relative p-1 transition-all cursor-pointer",
                        security[s.key] ? "bg-teal-600" : "bg-slate-300"
                      )}
                    >
                       <div className={cn("w-4 h-4 bg-white rounded-full transition-all", security[s.key] ? "ml-auto" : "ml-0")} />
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                 <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">Global Notifications</h3>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                 { key: 'email', label: 'Email Notifications', icon: Globe },
                 { key: 'sms', label: 'SMS Gateway', icon: Smartphone },
                 { key: 'whatsapp', label: 'WhatsApp API', icon: Zap },
                 { key: 'browser', label: 'In-App Alerts', icon: Bell },
              ].map((n) => (
                 <div 
                   key={n.key}
                   onClick={() => setNotifications({...notifications, [n.key]: !notifications[n.key as keyof typeof notifications]})}
                   className={cn(
                      "p-6 rounded-3xl border transition-all cursor-pointer flex flex-col gap-4",
                      notifications[n.key as keyof typeof notifications] 
                        ? "bg-teal-50 border-teal-100 text-teal-600" 
                        : "bg-white border-slate-100 text-slate-400"
                   )}
                 >
                    <n.icon className={cn("w-6 h-6", notifications[n.key as keyof typeof notifications] ? "text-teal-600" : "text-slate-300")} />
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black uppercase tracking-widest">{n.label}</span>
                       {notifications[n.key as keyof typeof notifications] && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Database Management */}
         <div className="lg:col-span-2 bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
            <div className="shrink-0">
               <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-teal-400 border border-white/10">
                  <Database className="w-10 h-10" />
               </div>
            </div>
            <div className="relative z-10 space-y-6">
               <div>
                  <h3 className="text-xl font-bold">Database &amp; Storage Management</h3>
                  <p className="text-slate-400 text-sm mt-1">Last automated backup: Today at 04:00 AM. Total storage used: 1.4 TB / 5 TB.</p>
               </div>
               <div className="flex gap-3">
                  <button 
                    onClick={handleBackup}
                    disabled={isBackingUp}
                    className="px-6 py-2.5 bg-teal-500 text-white rounded-xl font-bold text-xs hover:bg-teal-600 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isBackingUp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    {isBackingUp ? 'Processing...' : 'Run Manual Backup'}
                  </button>
                  <button className="px-6 py-2.5 bg-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition-all border border-white/10">
                    Storage Audit
                  </button>
               </div>
            </div>
            <Cpu className="absolute -right-20 -top-20 w-80 h-80 text-white/5 pointer-events-none rotate-12" />
         </div>

         {/* System Health */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900">System Health</h3>
            <div className="space-y-4">
               {[
                  { label: 'Server Load', value: '14%', status: 'Normal' },
                  { label: 'Uptime', value: '99.98%', status: 'Normal' },
                  { label: 'Error Rate', value: '0.02%', status: 'Optimal' },
               ].map(h => (
                  <div key={h.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h.label}</span>
                        <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-2 py-0.5 rounded-full">{h.status}</span>
                     </div>
                     <div className="text-lg font-black text-slate-900">{h.value}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemConfig;
