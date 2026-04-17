import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Clock, Shield, LogOut, Search, Filter, Download, Trash2, CheckCircle, Menu, X } from 'lucide-react';
import API from '../../api/baseurl';
import { useAppStore } from '../../store';

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
  const { state, logout } = useAppStore();
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

  return (
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`w-64 bg-slate-900 text-white fixed h-full z-50 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-600/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Admin Panel</span>
          </div>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal-600/10 text-teal-400 rounded-xl font-bold">
            <Mail className="w-5 h-5" />
            Contact Inquiries
          </button>
          {/* Add more nav items here if needed */}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Contact Inquiries</h1>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {contacts.length} Total
                </span>
              </div>
              <p className="text-slate-500 font-medium tracking-wide">Manage and respond to user messages effectively.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group flex-grow md:flex-grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by name, email or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all w-full md:w-80 text-sm shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                >
                  Return to Site
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">{state.user?.name || 'Administrator'}</p>
                    <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Master Admin</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                    <Shield className="w-5 h-5 text-teal-400" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-teal-50 border border-teal-100 text-teal-600 rounded-2xl text-sm font-medium mb-4">
              {success}
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-8 py-6"><div className="h-10 w-40 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-8 py-6"><div className="h-4 w-32 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-8 py-6"><div className="h-4 w-60 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-8 py-6"><div className="h-4 w-24 bg-slate-100 rounded-lg"></div></td>
                        <td className="px-8 py-6 text-right"><div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto"></div></td>
                      </tr>
                    ))
                  ) : filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-slate-300" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-bold text-lg">No inquiries found</p>
                            <p className="text-slate-500">When users contact you, they'll appear here.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact.id} className={`hover:bg-slate-50/50 transition-colors ${!contact.is_read ? 'bg-teal-50/20' : ''}`}>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 font-bold">
                              {contact.name.charAt(0)}
                            </div>
                            <div>
                              <p className={`font-bold text-slate-900 text-sm flex items-center gap-2`}>
                                {contact.name}
                                {!contact.is_read && <span className="w-2 h-2 bg-teal-500 rounded-full"></span>}
                              </p>
                              <p className="text-slate-500 text-xs">{contact.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                            {contact.subject}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-slate-600 text-sm line-clamp-1 max-w-xs">{contact.message}</p>
                        </td>
                        <td className="px-8 py-6 text-slate-500 text-xs font-medium">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(contact.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleToggleRead(contact.id)}
                              className={`p-2 rounded-lg transition-all ${contact.is_read ? 'text-teal-600 bg-teal-50' : 'text-slate-400 hover:text-teal-600 hover:bg-teal-50'}`}
                              title={contact.is_read ? "Mark as unread" : "Mark as read"}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(contact.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
