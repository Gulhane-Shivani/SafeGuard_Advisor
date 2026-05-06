import React from 'react';
import { Bell, Shield, Users, Info, Clock, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../../components/platform/SectionHeader';
import { cn } from '../../utils/helpers';

const AdminNotifications: React.FC = () => {
  const notifications = [
    { id: 1, title: 'New Agent Application', message: 'A new agent request has been submitted by Rajesh V.', time: '2 mins ago', type: 'user', priority: 'high' },
    { id: 2, title: 'System Backup Successful', message: 'The nightly system backup was completed successfully.', time: '1 hour ago', type: 'system', priority: 'low' },
    { id: 3, title: 'Renewal Alert', message: '5 customer policies are expiring in the next 24 hours.', time: '3 hours ago', type: 'policy', priority: 'high' },
    { id: 4, title: 'Security Patch Available', message: 'A new security patch for the core API is ready for deployment.', time: '5 hours ago', type: 'system', priority: 'medium' },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Platform Notifications"
        description="Stay updated with the latest system alerts, policy updates, and administrative activities."
      />

      <div className="max-w-4xl space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6 hover:shadow-md transition-all">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
              notif.type === 'user' ? "bg-purple-50 text-purple-600" :
              notif.type === 'system' ? "bg-blue-50 text-blue-600" :
              "bg-teal-50 text-teal-600"
            )}>
              {notif.type === 'user' ? <Users className="w-6 h-6" /> :
               notif.type === 'system' ? <Shield className="w-6 h-6" /> :
               <Clock className="w-6 h-6" />}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-slate-900">{notif.title}</h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{notif.time}</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{notif.message}</p>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                  notif.priority === 'high' ? "bg-red-50 text-red-600" :
                  notif.priority === 'medium' ? "bg-orange-50 text-orange-600" :
                  "bg-slate-50 text-slate-400"
                )}>
                  {notif.priority} Priority
                </span>
                <button className="text-[10px] font-black text-teal-600 hover:text-teal-700 uppercase tracking-widest ml-auto">
                  Mark as Read
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
