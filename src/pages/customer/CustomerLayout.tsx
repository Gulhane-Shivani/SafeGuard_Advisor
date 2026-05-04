import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Shield, CreditCard, FileText, Settings,
  HelpCircle, LogOut, Download, Bell, User, Landmark, Menu, X
} from 'lucide-react';
import { useCustomer } from '../../store/CustomerContext';
import { useAppStore } from '../../store';
import { cn } from '../../utils/helpers';

const menuItems = [
  { id: 'home',     label: 'Overview',          icon: LayoutDashboard, path: '/customer' },
  { id: 'policies', label: 'My Policies',        icon: Shield,          path: '/customer/policies' },
  { id: 'payments', label: 'Payments',           icon: CreditCard,      path: '/customer/payments' },
  { id: 'claims',   label: 'Claims',             icon: FileText,        path: '/customer/claims' },
  { id: 'requests', label: 'Service Requests',   icon: Settings,        path: '/customer/requests' },
  { id: 'vault',    label: 'Document Vault',     icon: Download,        path: '/customer/vault' },
  { id: 'loan',     label: 'Policy Loan',        icon: Landmark,        path: '/customer/loan' },
  { id: 'profile',  label: 'Profile',            icon: User,            path: '/customer/profile' },
  { id: 'support',  label: 'Support',            icon: HelpCircle,      path: '/customer/support' },
];

import { LoadingSpinner } from '../../components/LoadingSpinner';

const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { data, loading } = useCustomer();
  const { logout } = useAppStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (loading || !data) return <LoadingSpinner />;

  const unreadCount = data.notifications.filter((n: any) => n.unread).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300 flex flex-col',
        'lg:translate-x-0 lg:static lg:inset-auto',
        !isSidebarOpen && '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900">SafeGuard</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/customer' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all',
                  isActive
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-6 border-t border-slate-100 space-y-2 shrink-0">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none text-sm w-48" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-xs text-teal-600 font-bold hover:underline">
                      Close
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                    {data.notifications.map((n: any) => (
                      <div key={n.id} className={cn('p-4 hover:bg-slate-50 transition-colors', n.unread && 'bg-orange-50/50')}>
                        <div className="flex gap-3">
                          <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', n.unread ? 'bg-orange-500' : 'bg-slate-200')} />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 text-center">
                    <button className="text-xs font-bold text-teal-600 hover:underline">View All</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{data.profile.name}</p>
                <p className="text-[10px] font-bold text-teal-600 uppercase">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                {data.profile.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-grow overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
