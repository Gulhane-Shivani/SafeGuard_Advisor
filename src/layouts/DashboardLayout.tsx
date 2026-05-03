
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, Users, FileText, Settings, 
  BarChart3, LogOut, Menu, X, Bell, 
  Search, IndianRupee, 
  TrendingUp, Layers, CheckSquare, MessageSquare,
  Clock, PhoneCall
} from 'lucide-react';
import { usePlatform } from '../store/PlatformContext';
import { PLATFORM_ROLES } from '../data/mockPlatformData';
import { cn } from '../utils/helpers';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, setRole } = usePlatform();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.startsWith('/super-admin') && role !== PLATFORM_ROLES.SUPER_ADMIN) {
      setRole(PLATFORM_ROLES.SUPER_ADMIN);
    } else if (location.pathname.startsWith('/admin') && role !== PLATFORM_ROLES.ADMIN) {
      setRole(PLATFORM_ROLES.ADMIN);
    } else if (location.pathname.startsWith('/agent') && role !== PLATFORM_ROLES.AGENT) {
      setRole(PLATFORM_ROLES.AGENT);
    } else if (location.pathname.startsWith('/csr') && role !== PLATFORM_ROLES.CSR) {
      setRole(PLATFORM_ROLES.CSR);
    }
  }, [location.pathname, role, setRole]);

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case PLATFORM_ROLES.SUPER_ADMIN:
        return [
          { id: 'sa-overview', label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin' },
          { id: 'sa-users', label: 'User Management', icon: Users, path: '/super-admin/users' },
          { id: 'sa-settings', label: 'Master Settings', icon: Settings, path: '/super-admin/settings' },
          { id: 'sa-reports', label: 'Reports', icon: BarChart3, path: '/super-admin/reports' },
          { id: 'sa-config', label: 'System Config', icon: Layers, path: '/super-admin/config' },
        ];
      case PLATFORM_ROLES.ADMIN:
        return [
          { id: 'adm-overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
          { id: 'adm-leads', label: 'Lead Management', icon: TrendingUp, path: '/admin/leads' },
          { id: 'adm-policies', label: 'Policy Management', icon: Shield, path: '/admin/policies' },
          { id: 'adm-team', label: 'Team Performance', icon: BarChart3, path: '/admin/team' },
          { id: 'adm-customers', label: 'Customer 360', icon: Users, path: '/admin/customers' },
          { id: 'adm-approvals', label: 'Approvals', icon: CheckSquare, path: '/admin/approvals' },
          { id: 'adm-commission', label: 'Commission', icon: IndianRupee, path: '/admin/commission' },
        ];
      case PLATFORM_ROLES.AGENT:
        return [
          { id: 'agt-overview', label: 'My Dashboard', icon: LayoutDashboard, path: '/agent' },
          { id: 'agt-leads', label: 'My Leads', icon: TrendingUp, path: '/agent/leads' },
          { id: 'agt-customers', label: 'My Customers', icon: Users, path: '/agent/customers' },
          { id: 'agt-quote', label: 'Quote Generator', icon: FileText, path: '/agent/quote' },
          { id: 'agt-tasks', label: 'Tasks & Calendar', icon: CheckSquare, path: '/agent/tasks' },
          { id: 'agt-commission', label: 'Commission', icon: IndianRupee, path: '/agent/commission' },
        ];
      case PLATFORM_ROLES.CSR:
        return [
          { id: 'csr-overview', label: 'Daily Tasks', icon: CheckSquare, path: '/csr' },
          { id: 'csr-search', label: 'Customer Lookup', icon: Search, path: '/csr/search' },
          { id: 'csr-claims', label: 'Claims Support', icon: FileText, path: '/csr/claims' },
          { id: 'csr-renewals', label: 'Renewals', icon: Clock, path: '/csr/renewals' },
          { id: 'csr-tickets', label: 'Ticket System', icon: MessageSquare, path: '/csr/tickets' },
          { id: 'csr-comm', label: 'Communication', icon: PhoneCall, path: '/csr/communication' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-slate-50 flex font-outfit">
      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-slate-950 text-white z-[110] transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 p-2 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">SafeGuard <span className="text-teal-500 font-medium">Advisor</span></span>
            </div>
            <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>



          <nav className="flex-grow p-4 space-y-1 overflow-y-auto mt-4">
            {navItems.map((item) => {
              // Base routes like '/agent' should only match exactly.
              // Nested routes like '/agent/leads' can match '/agent/leads/123'.
              const isBaseRoute = item.path.split('/').length === 2; // e.g., ['', 'agent']
              const isActive = location.pathname === item.path || 
                               (!isBaseRoute && location.pathname.startsWith(item.path + '/'));
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all",
                    isActive
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/5">
            <Link to="/auth" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold text-xs transition-all">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Global search..." className="bg-transparent border-none focus:outline-none text-xs w-48 font-medium" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-black text-slate-900 leading-none">System Status</span>
              <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest mt-1 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" /> Live & Protected
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <button className="relative p-2 text-slate-400 hover:text-slate-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-black text-slate-900 leading-none">User Profile</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{role.replace('_', ' ')}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                UA
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
