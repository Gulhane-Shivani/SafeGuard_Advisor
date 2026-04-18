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
    navigate('/auth');
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
        "w-72 bg-slate-950 text-white fixed h-full z-[80] flex flex-col transition-all duration-500 ease-in-out border-r border-white/5",
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-teal-600 p-2.5 rounded-2xl shadow-xl shadow-teal-600/20 rotate-3 group-hover:rotate-0 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight leading-none mb-1">SafeGuard</span>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-[0.2em] leading-none">Console v2.0</span>
            </div>
          </div>
          <button className="lg:hidden p-2 text-white/40 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-grow p-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-4 rounded-2xl font-bold text-sm transition-all group relative overflow-hidden",
                activeMenu === item.label
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.Icon className={cn("w-5 h-5", activeMenu === item.label ? "text-white" : "text-slate-500 group-hover:text-teal-400")} />
                {item.label}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-black relative z-10",
                  activeMenu === item.label ? "bg-white/20 text-white" : "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0">
               <Shield className="w-5 h-5" />
             </div>
             <div className="min-w-0">
               <p className="text-sm font-bold truncate">Admin One</p>
               <p className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">Master Access</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl font-bold text-sm transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 bg-slate-50 min-h-screen overflow-y-auto">
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Activity className="w-4 h-4 text-teal-600" />
                System Live &middot; 24 Workers Active
              </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-500">
               <Smartphone className="w-4 h-4" />
               App Status: <span className="text-teal-600 uppercase ml-1">Normal</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-ping" />
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all group"
            >
              Public View <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-10">
          <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-1.5 bg-teal-600 rounded-full" />
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inquiry Management</h1>
              </div>
              <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
                Review and process user inquiries from the contact portal. Total inquiries captured: <span className="text-slate-900 font-bold">{contacts.length}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group min-w-[320px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by name, subject or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-teal-600/5 focus:border-teal-600 transition-all w-full text-sm shadow-sm font-medium"
                />
              </div>
              <button className="p-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-teal-600 text-white rounded-[1.5rem] font-bold text-sm hover:bg-teal-500 transition-all flex items-center gap-3 shadow-xl shadow-teal-600/20">
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Inquiries', value: contacts.length, Icon: Mail, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Unread Messages', value: unreadCount, Icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50', highlight: true },
              { label: 'System Health', value: 'Optimal', Icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Avg Feedback', value: '4.8', Icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all relative overflow-hidden">
                {stat.highlight && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /></div>}
                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner", stat.bg, stat.color)}>
                  <stat.Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {(error || success) && (
            <div className={cn(
              "p-6 rounded-[1.5rem] text-sm font-bold mb-8 animate-in slide-in-from-top-4 duration-300 flex items-center gap-4",
              error ? "bg-red-50 border border-red-100 text-red-600" : "bg-teal-50 border border-teal-100 text-teal-600"
            )}>
              {error ? <X className="w-5 h-5 shrink-0" /> : <CheckCircle className="w-5 h-5 shrink-0" />}
              {error || success}
            </div>
          )}

          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-600" />
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Identity</th>
                    <th className="px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Objective</th>
                    <th className="px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Message Content</th>
                    <th className="px-8 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timestamp</th>
                    <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-10 py-8"><div className="h-12 w-48 bg-slate-100 rounded-xl"></div></td>
                        <td className="px-8 py-8"><div className="h-6 w-32 bg-slate-100 rounded-full"></div></td>
                        <td className="px-8 py-8"><div className="h-6 w-full bg-slate-100 rounded-xl"></div></td>
                        <td className="px-8 py-8"><div className="h-6 w-24 bg-slate-100 rounded-xl"></div></td>
                        <td className="px-10 py-8 text-right"><div className="h-10 w-20 bg-slate-100 rounded-xl ml-auto"></div></td>
                      </tr>
                    ))
                  ) : filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-10 py-32 text-center">
                        <div className="flex flex-col items-center gap-6">
                          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100">
                            <FileText className="w-12 h-12 text-slate-200" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-black text-2xl mb-2">Workspace Empty</p>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">
                              There are currently no inquiries matching your search or filters.
                            </p>
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
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className={cn(
                              "w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-lg font-black shrink-0 transition-transform group-hover/row:scale-110",
                              !contact.is_read ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" : "bg-slate-100 text-slate-400"
                            )}>
                              {contact.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-slate-900 text-base flex items-center gap-3">
                                {contact.name}
                                {!contact.is_read && <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />}
                              </p>
                              <p className="text-slate-500 text-xs font-bold leading-none mt-1">{contact.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                            !contact.is_read ? "bg-teal-600 text-white border-teal-600" : "bg-slate-50 text-slate-500 border-slate-100"
                          )}>
                            {contact.subject}
                          </span>
                        </td>
                        <td className="px-8 py-8">
                          <p className="text-slate-600 text-sm font-medium line-clamp-2 max-w-sm leading-relaxed group-hover/row:text-slate-900 transition-colors">
                            {contact.message}
                          </p>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex flex-col text-xs font-bold whitespace-nowrap">
                            <span className="text-slate-900">{new Date(contact.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            <span className="text-slate-400 font-medium">{new Date(contact.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                            <button 
                              onClick={() => handleToggleRead(contact.id)}
                              className={cn(
                                "p-3 rounded-xl transition-all shadow-sm",
                                contact.is_read 
                                  ? "text-teal-600 bg-teal-50 hover:bg-teal-100" 
                                  : "text-slate-400 bg-white border border-slate-100 hover:text-teal-600 hover:border-teal-200"
                              )}
                              title={contact.is_read ? "Mark as unread" : "Mark as read"}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(contact.id)}
                              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm shadow-red-500/10"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          {!contact.is_read && <div className="group-hover/row:hidden font-black text-[10px] text-teal-600 uppercase tracking-widest">New Priority</div>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                 Showing {filteredContacts.length} of {contacts.length} entries
               </div>
               <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">Next</button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
