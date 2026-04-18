import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Bell, User, LogOut, ChevronDown, HeartPulse, Car, TrendingUp, Scale, Calculator, PieChart, Receipt, ArrowRight, ChevronRight, Activity } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';

const Navbar: React.FC = () => {
  const { state, logout } = useAppStore();
  const { user } = state;
  const isLoggedIn = !!user;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Advisor', href: '/advisor' },
    { name: 'Claims', href: '/claims' },
  ];

  const insuranceCategories = [
    { name: 'Health', href: '/insurance/health', Icon: HeartPulse, details: ['Individual Health', 'Family Floater', 'Senior Citizen'] },
    { name: 'Life / Term', href: '/insurance/life', Icon: Shield, details: ['Term Life', 'Savings Plan', 'Retirement'] },
    { name: 'Motor', href: '/insurance/motor', Icon: Car, details: ['Car Insurance', 'Two Wheeler', 'Commercial'] },
    { name: 'Investment', href: '/insurance/investment', Icon: TrendingUp, details: ['ULIP Plans', 'Capital Guarantee', 'Guaranteed Income'] },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold transition-colors",
              isScrolled ? "text-slate-900" : "text-white md:text-slate-900"
            )}>
              SafeGuard Advisor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Insurance Plans Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsInsuranceOpen(true)}
              onMouseLeave={() => setIsInsuranceOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                  location.pathname === '/compare' || isInsuranceOpen
                    ? "text-teal-600 font-bold"
                    : isScrolled ? "text-slate-600 hover:text-teal-600" : "text-slate-600 hover:text-teal-600"
                )}
              >
                Insurance Plans
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isInsuranceOpen && "rotate-180")} />
              </button>

              {/* Mega Dropdown */}
              {isInsuranceOpen && (
                <div className="absolute top-full -left-64 w-[960px] pt-4 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="flex">
                      {/* Products Grid */}
                      <div className="flex-1 p-10 grid grid-cols-4 gap-12">
                        {insuranceCategories.map((cat) => (
                          <div key={cat.name} className="space-y-6">
                            <Link
                              to={cat.href}
                              className="flex items-center gap-3 group/header"
                              onClick={() => setIsInsuranceOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover/header:bg-teal-600 group-hover/header:text-white transition-all">
                                <cat.Icon className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{cat.name}</span>
                            </Link>

                            <ul className="space-y-4">
                              {cat.details.map(detail => (
                                <li key={detail}>
                                  <Link
                                    to={cat.href}
                                    className="text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors flex items-center justify-between group/item"
                                    onClick={() => setIsInsuranceOpen(false)}
                                  >
                                    {detail}
                                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Side Actions */}
                      <div className="w-64 bg-slate-50/50 p-10 border-l border-slate-100 space-y-8">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Calculators</p>
                          <Link
                            to="/advisor"
                            className="flex items-center gap-4 group/calc"
                            onClick={() => setIsInsuranceOpen(false)}
                          >
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover/calc:text-teal-600 group-hover/calc:border-teal-100 transition-all">
                              <Calculator className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover/calc:text-teal-600">Premium Calc</span>
                          </Link>
                        </div>

                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Actions</p>
                          <Link
                            to="/compare"
                            className="block p-5 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-950/20 hover:bg-teal-600 transition-all group/compare"
                            onClick={() => setIsInsuranceOpen(false)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Scale className="w-5 h-5 text-teal-400" />
                              <ChevronRight className="w-4 h-4 text-white/50 group-hover/compare:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-sm font-black uppercase tracking-tight">Compare Plans</p>
                            <p className="text-[10px] text-white/50 font-medium">Find the best value</p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="px-10 py-4 bg-white border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Shield className="w-3.5 h-3.5" /> Licensed Broker
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Activity className="w-3.5 h-3.5" /> 24x7 Support
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Platform Secure
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-teal-600 font-bold"
                    : isScrolled ? "text-slate-600 hover:text-teal-600" : "text-slate-600 hover:text-teal-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {isLoggedIn ? (
              <div className="relative group/profile">
                <button
                  className="flex items-center gap-2 pl-2 pr-4 py-2 bg-teal-50 rounded-full border border-teal-100 hover:bg-teal-100 transition-colors group"
                >
                  <div className="bg-white p-1 rounded-full shadow-sm text-teal-600 group-hover:scale-110 transition-transform">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-teal-700">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-teal-600 transition-transform group-hover/profile:rotate-180" />
                </button>

                {/* Profile Dropdown */}
                <div
                  className="absolute top-full right-0 mt-2 w-56 pt-2 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-200"
                >
                  <div className="bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 overflow-hidden pt-2">
                    <div className="px-5 py-3 border-b border-slate-50">
                      <p className="text-xs font-bold text-slate-400 capitalize">Account</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                    </div>

                    <div className="p-2 space-y-1">
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        >
                          <Shield className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 pl-2 pr-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <div className="bg-white p-1 rounded-full shadow-sm">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-semibold text-slate-700">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 right-0 py-4 px-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {/* Mobile Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className={cn(
                  "flex items-center justify-between text-base font-bold py-2 transition-colors",
                  isMobileDropdownOpen ? "text-teal-600" : "text-slate-900"
                )}
              >
                Insurance Plans
                <ChevronDown className={cn("w-5 h-5 transition-transform", isMobileDropdownOpen && "rotate-180")} />
              </button>

              {isMobileDropdownOpen && (
                <div className="pl-4 mt-2 space-y-4 animate-in slide-in-from-left duration-200">
                  {insuranceCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      className="flex items-center gap-3 py-1"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }}
                    >
                      <cat.Icon className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-600">{cat.name}</span>
                    </Link>
                  ))}

                  <Link
                    to="/advisor"
                    className="flex items-center gap-3 py-1"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }}
                  >
                    <Calculator className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">Calculators</span>
                  </Link>

                  <Link
                    to="/compare"
                    className="flex items-center gap-3 py-2 text-teal-600 font-bold"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileDropdownOpen(false); }}
                  >
                    <Scale className="w-5 h-5" />
                    <span className="text-sm">Compare All Plans</span>
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-base font-bold py-2 transition-colors",
                  location.pathname === link.href
                    ? "text-teal-600"
                    : "text-slate-900"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />

            {isLoggedIn ? (
              <>
                <div className="w-full py-3 bg-teal-50 text-teal-700 rounded-xl font-bold text-center border border-teal-100">
                  Logged in as {user?.name || 'User'}
                </div>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="w-full py-3 bg-amber-50 text-amber-600 rounded-xl font-bold text-center border border-amber-100 flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 text-center">
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
