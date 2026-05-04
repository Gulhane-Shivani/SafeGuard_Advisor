import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Clock, Shield, LogOut, Search, Filter, 
  Download, Trash2, CheckCircle, Menu, X, 
  FileText, Activity, Users, Bell, ExternalLink,
  Smartphone, BarChart3, Settings
} from 'lucide-react';
import API from '../../api/baseurl';
import { useAppStore } from '../../store';
import { cn } from '../../utils/helpers';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('Inquiries');
  const { logout } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await API.get('/admin/contacts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setContacts(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to fetch contacts');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('isAdmin');
          navigate('/auth');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await API.delete(`/admin/contacts/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
      setSuccess('Inquiry deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to delete inquiry');
    }
  };

  const handleToggleRead = async (id: number) => {
    try {
      const response = await API.patch(`/admin/contacts/${id}`, {});
      setContacts(prev => prev.map(c => c.id === id ? { ...c, is_read: response.data.is_read } : c));
    } catch (err: any) {
      setError(err.message || 'Failed to update inquiry status');
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = contacts.filter(c => !c.is_read).length;

  const menuItems = [
    { label: 'Overview', Icon: BarChart3 },
    { label: 'Inquiries', Icon: Mail, badge: unreadCount },
    { label: 'Users', Icon: Users },
    { label: 'Policies', Icon: Shield },
    { label: 'Settings', Icon: Settings },
  ];

  return (
    <div className="fixed inset-0 bg-slate-50 flex z-[60] overflow-hidden font-outfit">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[70] lg:hidden transition-all duration-500",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-slate-950 text-white fixed h-full z-[80] flex flex-col transition-all duration-500 ease-in-out border-r border-white/5",
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-xl shadow-xl shadow-teal-600/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none mb-1">SafeGuard</span>
              <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest leading-none">Console v2.0</span>
            </div>
          </div>
          <button className="lg:hidden p-2 text-white/40 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs transition-all group relative overflow-hidden",
                activeMenu === item.label
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <item.Icon className={cn("w-4 h-4", activeMenu === item.label ? "text-white" : "text-slate-500 group-hover:text-teal-400")} />
                {item.label}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-[9px] font-black relative z-10",
                  activeMenu === item.label ? "bg-white/20 text-white" : "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0">
               <Shield className="w-4 h-4" />
             </div>
             <div className="min-w-0">
               <p className="text-xs font-bold truncate">Admin One</p>
               <p className="text-[9px] text-teal-500 font-bold uppercase tracking-widest">Master Access</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-bold text-xs transition-all group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 bg-slate-50 min-h-screen overflow-y-auto">
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                System Live &middot; 24 Workers Active
              </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-500">
               <Smartphone className="w-3.5 h-3.5" />
               App Status: <span className="text-teal-600 uppercase ml-1">Normal</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition-all group"
            >
              Public View <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-teal-600 rounded-full" />
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inquiry Management</h1>
              </div>
              <p className="text-slate-500 font-medium text-sm max-w-2xl leading-relaxed">
                Review and process user inquiries from the contact portal. Total inquiries captured: <span className="text-slate-900 font-bold">{contacts.length}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all w-full text-xs shadow-sm font-medium"
                />
              </div>
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Filter className="w-4 h-4" />
              </button>
              <button className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-500 transition-all flex items-center gap-2 shadow-xl shadow-teal-600/10">
                <Download className="w-3.5 h-3.5" />
                Report
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Inquiries', value: contacts.length, Icon: Mail, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Unread Messages', value: unreadCount, Icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', highlight: true },
              { label: 'System Health', value: 'Optimal', Icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Avg Feedback', value: '4.8', Icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all relative overflow-hidden">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner", stat.bg, stat.color)}>
                  <stat.Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {(error || success) && (
            <div className={cn(
              "p-4 rounded-xl text-xs font-bold mb-6 animate-in slide-in-from-top-4 duration-300 flex items-center gap-3",
              error ? "bg-red-50 border border-red-100 text-red-600" : "bg-teal-50 border border-teal-100 text-teal-600"
            )}>
              {error ? <X className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
              {error || success}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-teal-600" />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">User</th>
                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject</th>
                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Message</th>
                    <th className="px-5 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4"><div className="h-10 w-40 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-5 py-4"><div className="h-5 w-24 bg-slate-100 rounded-full"></div></td>
                        <td className="px-5 py-4"><div className="h-5 w-full bg-slate-100 rounded-lg"></div></td>
                        <td className="px-5 py-4"><div className="h-5 w-20 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-6 py-4 text-right"><div className="h-8 w-16 bg-slate-100 rounded-lg ml-auto"></div></td>
                      </tr>
                    ))
                  ) : filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <FileText className="w-8 h-8 text-slate-200" />
                          </div>
                          <div>
                            <p className="text-slate-950 font-black text-xl mb-1">Queue Empty</p>
                            <p className="text-slate-500 font-medium text-xs">No matching inquiries found.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr 
                        key={contact.id} 
                        className={cn(
                          "transition-all duration-300 group/row",
                          !contact.is_read ? "bg-teal-50/10" : "hover:bg-slate-50/50"
                        )}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0",
                              !contact.is_read ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" : "bg-slate-100 text-slate-400"
                            )}>
                              {contact.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-slate-900 text-sm flex items-center gap-2">
                                {contact.name}
                                {!contact.is_read && <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />}
                              </p>
                              <p className="text-slate-500 text-[10px] font-bold leading-none">{contact.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            !contact.is_read ? "bg-teal-600 text-white border-teal-600" : "bg-slate-50 text-slate-500 border-slate-100"
                          )}>
                            {contact.subject}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-slate-600 text-xs font-medium line-clamp-1 max-w-[200px] leading-relaxed group-hover/row:text-slate-900 transition-colors">
                            {contact.message}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col text-[10px] font-bold whitespace-nowrap">
                            <span className="text-slate-900">{new Date(contact.created_at).toLocaleDateString()}</span>
                            <span className="text-slate-400 font-medium">{new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all">
                            <button 
                              onClick={() => handleToggleRead(contact.id)}
                              className={cn(
                                "p-2 rounded-lg transition-all",
                                contact.is_read 
                                  ? "text-teal-600 bg-teal-50 hover:bg-teal-100" 
                                  : "text-slate-400 bg-white border border-slate-100 hover:text-teal-600 hover:border-teal-200"
                              )}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(contact.id)}
                              className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {!contact.is_read && <div className="group-hover/row:hidden font-black text-[9px] text-teal-600 uppercase tracking-widest">Priority</div>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 {filteredContacts.length} Entries Found
               </div>
               <div className="flex gap-2">
                 <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400">Prev</button>
                 <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-teal-600 hover:text-white transition-all">Next</button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
