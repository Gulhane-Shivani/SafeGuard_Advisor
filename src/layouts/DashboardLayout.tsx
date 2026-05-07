
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, Users, FileText, Settings, 
  BarChart3, LogOut, Menu, X, Bell, 
  Search, IndianRupee, 
  TrendingUp, Layers, CheckSquare, MessageSquare,
  Clock, PhoneCall, UserCircle2, ChevronDown
} from 'lucide-react';
import { usePlatform } from '../store/PlatformContext';
import { useAppStore } from '../store';
import { PLATFORM_ROLES } from '../data/mockPlatformData';
import { cn } from '../utils/helpers';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children?: { id: string; label: string; path: string; icon?: any }[];
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, setRole } = usePlatform();
  const { state, logout } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
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

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case PLATFORM_ROLES.SUPER_ADMIN:
        return [
          { id: 'sa-overview', label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin' },
          { 
            id: 'sa-users', 
            label: 'User Management', 
            icon: Users, 
            path: '/super-admin/users',
            children: [
              { id: 'sa-staff', label: 'Staff Members', path: '/super-admin/users?tab=staff', icon: Shield },
              { id: 'sa-customers', label: 'Customers', path: '/super-admin/users?tab=customers', icon: UserCircle2 },
            ]
          },
          { id: 'sa-policies', label: 'Policies', icon: Shield, path: '/super-admin/policies' },
          { id: 'sa-renewals', label: 'Renewals', icon: Clock, path: '/super-admin/renewals' },
          { id: 'sa-payments', label: 'Payments', icon: IndianRupee, path: '/super-admin/payments' },
          { id: 'sa-notifications', label: 'Notifications', icon: Bell, path: '/super-admin/notifications' },
          { id: 'sa-reports', label: 'Reports', icon: BarChart3, path: '/super-admin/reports' },

          { id: 'sa-settings', label: 'Master Settings', icon: Settings, path: '/super-admin/settings' },
          { id: 'sa-config', label: 'System Config', icon: Layers, path: '/super-admin/config' },
        ];
      case PLATFORM_ROLES.ADMIN:
        return [
          { id: 'adm-overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
          { id: 'adm-leads', label: 'Lead Management', icon: TrendingUp, path: '/admin/leads' },
          { id: 'adm-policies', label: 'Policy Management', icon: Shield, path: '/admin/policies' },
          { id: 'adm-renewals', label: 'Renewals', icon: Clock, path: '/admin/renewals' },
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
          { id: 'agt-profile', label: 'My Profile', icon: UserCircle2, path: '/agent/profile' },
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

  const navItems = React.useMemo(() => getNavItems(), [role]);

  React.useEffect(() => {
    navItems.forEach(item => {
      if (item.children) {
        const isChildActive = item.children.some(child => 
          location.pathname + location.search === child.path
        );
        if (isChildActive && !expandedMenus.includes(item.id)) {
          setExpandedMenus(prev => [...prev, item.id]);
        }
      }
    });
  }, [location.pathname, location.search, navItems]);


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
        "fixed inset-y-0 left-0 w-72 bg-slate-950 text-white z-[110] transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto",
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

          <nav className="flex-grow px-4 pb-4 space-y-2 overflow-y-auto mt-6 custom-scrollbar">
            {navItems.map((item) => {
              const isBaseRoute = item.path.split('/').length === 2;
              const isActive = location.pathname === item.path || 
                               (!isBaseRoute && location.pathname.startsWith(item.path + '/'));
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedMenus.includes(item.id);

              return (
                <div key={item.id} className="space-y-1">
                  {hasChildren ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                          isActive || isExpanded 
                            ? "text-white bg-white/10 shadow-sm" 
                            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn(
                            "w-4.5 h-4.5 transition-colors",
                            isActive ? "text-teal-400" : "text-slate-500"
                          )} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-slate-500 transition-transform duration-300 ease-out",
                          isExpanded ? "rotate-180 text-teal-400" : "rotate-0"
                        )} />
                      </button>

                      {isExpanded && (
                        <div className="ml-5 pl-4 border-l border-white/10 space-y-1.5 py-1 animate-in slide-in-from-top-2 fade-in duration-300">
                          {item.children?.map(child => {
                            const isChildActive = location.pathname + location.search === child.path;
                            return (
                              <Link
                                key={child.id}
                                to={child.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all relative group",
                                  isChildActive 
                                    ? "text-teal-400 bg-teal-400/10 shadow-inner" 
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                              >
                                {isChildActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-teal-500 rounded-full" />
                                )}
                                {child.icon && <child.icon className={cn("w-3.5 h-3.5", isChildActive ? "text-teal-400" : "text-slate-600 group-hover:text-slate-400")} />}
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 relative",
                        isActive
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      )}
                    >
                      <item.icon className={cn("w-4.5 h-4.5", isActive ? "text-white" : "text-slate-500")} />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/5">
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-medium text-sm transition-all text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
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
                <span className="text-xs font-black text-slate-900 leading-none">{state.user?.name || 'User Profile'}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{role.replace('_', ' ')}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm uppercase">
                {state.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'UA'}
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
